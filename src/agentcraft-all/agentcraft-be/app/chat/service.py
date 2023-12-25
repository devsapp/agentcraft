"""Chat Service"""
# pylint: disable = no-member
from typing import Any
from time import time
import uuid
import json
import codecs
import requests
from app.common import utils
# from app.database.redis import redis_db
import app.database.chat as database
import app.database.agent as agent_database
import app.database.agent_dataset as agent_dataset_database
import app.database.model as model_database
# import app.database.redis as redis
from app.common.logger import logger
from app.chat.green_client import is_legal
from app.config import common as config

DONE = "[DONE]"

TOOL_DESC = """{name_for_model}: Call this tool to interact with the {name_for_human} API. What is the {name_for_human} API useful for? {description_for_model} Parameters: {parameters}"""

# ReAct prompting 的 instruction 模版，将包含插件的详细信息。
PROMPT_REACT = """Answer the following questions as best you can. You have access to the following APIs:

{tools_text}

Use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tools_name_text}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can be repeated zero or more times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

Begin!

Question: {query}"""


#
# 本示例代码的入口函数。
#
# 输入：
#   prompt: 用户的最新一个问题。
#   history: 用户与模型的对话历史，是一个 list，
#       list 中的每个元素为 {"user": "用户输入", "bot": "模型输出"} 的一轮对话。
#       最新的一轮对话放 list 末尾。不包含最新一个问题。
#   list_of_plugin_info: 候选插件列表，是一个 list，list 中的每个元素为一个插件的关键信息。
#       比如 list_of_plugin_info = [plugin_info_0, plugin_info_1, plugin_info_2]，
#       其中 plugin_info_0, plugin_info_1, plugin_info_2 这几个样例见本文档前文。
#
# 输出：
#   模型对用户最新一个问题的回答。
#
def llm_with_plugin(prompt: str, history, list_of_plugin_info=()):
    chat_history = [(x['user'], x['bot']) for x in history] + [(prompt, '')]

    # 需要让模型进行续写的初始文本
    planning_prompt = build_input_text(chat_history, list_of_plugin_info)

    text = ''
    while True:
        output = text_completion(planning_prompt + text, stop_words=['Observation:', 'Observation:\n'])
        action, action_input, output = parse_latest_plugin_call(output)
        if action:  # 需要调用插件
            # action、action_input 分别为需要调用的插件代号、输入参数
            # observation是插件返回的结果，为字符串
            observation = call_plugin(action, action_input)
            output += f'\nObservation: {observation}\nThought:'
            text += output
        else:  # 生成结束，并且不再需要调用插件
            text += output
            break

    new_history = []
    new_history.extend(history)
    new_history.append({'user': prompt, 'bot': text})
    return text, new_history


# 将对话历史、插件信息聚合成一段初始文本
def build_input_text(chat_history, list_of_plugin_info) -> str:
    # 候选插件的详细信息
    tools_text = []
    for plugin_info in list_of_plugin_info:
        tool = TOOL_DESC.format(
            name_for_model=plugin_info["name_for_model"],
            name_for_human=plugin_info["name_for_human"],
            description_for_model=plugin_info["description_for_model"],
            parameters=json.dumps(plugin_info["parameters"], ensure_ascii=False),
        )
        if plugin_info.get('args_format', 'json') == 'json':
            tool += " Format the arguments as a JSON object."
        elif plugin_info['args_format'] == 'code':
            tool += ' Enclose the code within triple backticks (`) at the beginning and end of the code.'
        else:
            raise NotImplementedError
        tools_text.append(tool)
    tools_text = '\n\n'.join(tools_text)

    # 候选插件的代号
    tools_name_text = ', '.join([plugin_info["name_for_model"] for plugin_info in list_of_plugin_info])

    im_start = '<|im_start|>'
    im_end = '<|im_end|>'
    prompt = f'{im_start}system\nYou are a helpful assistant.{im_end}'
    for i, (query, response) in enumerate(chat_history):
        if list_of_plugin_info:  # 如果有候选插件
            # 倒数第一轮或倒数第二轮对话填入详细的插件信息，但具体什么位置填可以自行判断
            if (len(chat_history) == 1) or (i == len(chat_history) - 2):
                query = PROMPT_REACT.format(
                    tools_text=tools_text,
                    tools_name_text=tools_name_text,
                    query=query,
                )
        query = query.lstrip('\n').rstrip()  # 重要！若不 strip 会与训练时数据的构造方式产生差异。
        response = response.lstrip('\n').rstrip()  # 重要！若不 strip 会与训练时数据的构造方式产生差异。
        # 使用续写模式（text completion）时，需要用如下格式区分用户和AI：
        prompt += f"\n{im_start}user\n{query}{im_end}"
        prompt += f"\n{im_start}assistant\n{response}{im_end}"

    assert prompt.endswith(f"\n{im_start}assistant\n{im_end}")
    prompt = prompt[: -len(f'{im_end}')]
    return prompt


def text_completion(input_text: str, stop_words) -> str:  # 作为一个文本续写模型来使用
    im_end = '<|im_end|>'
    if im_end not in stop_words:
        stop_words = stop_words + [im_end]
    stop_words_ids = [tokenizer.encode(w) for w in stop_words]

    # TODO: 增加流式输出的样例实现
    input_ids = torch.tensor([tokenizer.encode(input_text)]).to(model.device)
    output = model.generate(input_ids, stop_words_ids=stop_words_ids)
    output = output.tolist()[0]
    output = tokenizer.decode(output, errors="ignore")
    assert output.startswith(input_text)
    output = output[len(input_text) :].replace('<|endoftext|>', '').replace(im_end, '')

    for stop_str in stop_words:
        idx = output.find(stop_str)
        if idx != -1:
            output = output[: idx + len(stop_str)]
    return output  # 续写 input_text 的结果，不包含 input_text 的内容


def parse_latest_plugin_call(text):
    plugin_name, plugin_args = '', ''
    i = text.rfind('\nAction:')
    j = text.rfind('\nAction Input:')
    k = text.rfind('\nObservation:')
    if 0 <= i < j:  # If the text has `Action` and `Action input`,
        if k < j:  # but does not contain `Observation`,
            # then it is likely that `Observation` is ommited by the LLM,
            # because the output text may have discarded the stop word.
            text = text.rstrip() + '\nObservation:'  # Add it back.
        k = text.rfind('\nObservation:')
        plugin_name = text[i + len('\nAction:') : j].strip()
        plugin_args = text[j + len('\nAction Input:') : k].strip()
        text = text[:k]
    return plugin_name, plugin_args, text



#
# 输入：
#   plugin_name: 需要调用的插件代号，对应 name_for_model。
#   plugin_args：插件的输入参数，是一个 dict，dict 的 key、value 分别为参数名、参数值。
# 输出：
#   插件的返回结果，需要是字符串。
#   即使原本是 JSON 输出，也请 json.dumps(..., ensure_ascii=False) 成字符串。
#
def call_plugin(plugin_name: str, plugin_args: str) -> str:
    #
    # 请开发者自行完善这部分内容。这里的参考实现仅是 demo 用途，非生产用途。
    #
    if plugin_name == 'google_search':
        # 使用 SerpAPI 需要在这里填入您的 SERPAPI_API_KEY！
        os.environ["SERPAPI_API_KEY"] = os.getenv("SERPAPI_API_KEY", default='')
        from langchain import SerpAPIWrapper

        return SerpAPIWrapper().run(json5.loads(plugin_args)['search_query'])
    elif plugin_name == 'image_gen':
        import urllib.parse

        prompt = json5.loads(plugin_args)["prompt"]
        prompt = urllib.parse.quote(prompt)
        return json.dumps({'image_url': f'https://image.pollinations.ai/prompt/{prompt}'}, ensure_ascii=False)
    else:
        raise NotImplementedError
def test():
    tools = [
        {
            'name_for_human': '谷歌搜索',
            'name_for_model': 'google_search',
            'description_for_model': '谷歌搜索是一个通用搜索引擎，可用于访问互联网、查询百科知识、了解时事新闻等。',
            'parameters': [
                {
                    'name': 'search_query',
                    'description': '搜索关键词或短语',
                    'required': True,
                    'schema': {'type': 'string'},
                }
            ],
        },
        {
            'name_for_human': '文生图',
            'name_for_model': 'image_gen',
            'description_for_model': '文生图是一个AI绘画（图像生成）服务，输入文本描述，返回根据文本作画得到的图片的URL',
            'parameters': [
                {
                    'name': 'prompt',
                    'description': '英文关键词，描述了希望图像具有什么内容',
                    'required': True,
                    'schema': {'type': 'string'},
                }
            ],
        },
    ]
    history = []
    for query in ['你好', '搜索一下谁是周杰伦', '再搜下他老婆是谁', '给我画个可爱的小猫吧，最好是黑猫']:
        print(f"User's Query:\n{query}\n")
        response, history = llm_with_plugin(prompt=query, history=history, list_of_plugin_info=tools)
        print(f"Qwen's Response:\n{response}\n")

def list_chats(agent_id: int, user_id: int, page: int, limit: int):
    """列出问答历史记录"""
    if not agent_database.check_user_has_agent(user_id, agent_id):
        raise ValueError("user does not have this agent")
    data, total = database.list_chats(agent_id, 0, page, limit)
    data_dict = [vars(chat) for chat in data]
    return data_dict, total


def update_chat(uid: str, agent_id: int, **kwargs):
    """更新问答历史记录"""
    database.update_chat(uid, agent_id, **kwargs)


def sanitize_text(text: str) -> str:
    """防止问题注入"""
    return text.replace("```", "")


# def get_history(ip_addr: str):
#     """获取历史回答"""
#     history_key = f"history:{ip_addr}"
#     if redis_db.exists(history_key):
#         return json.loads(redis_db.get(history_key))
#     return None


def generate_prompt(search_res: list, query: str, prompt_template: str) -> str:
    """生成提示词"""
    if not prompt_template:
        return query
    context = "\n".join([doc[3] for doc in search_res])
    return prompt_template.replace(
        '{context}', sanitize_text(context)).replace(
        '{query}', sanitize_text(query))


def get_prompt_key(prompt: str, agent, history: list[str] = None):
    """获取prompt的key"""
    to_hash = f"[{agent.id}]{history[::2] if history else ''}#{prompt}".lower()
    return f"prompt:{hash(to_hash)}"


def format_document(title: str, url: str, cnt: int, similarity: float, chunk: str = None) -> str:
    """格式化文档"""
    return f"""相关 {cnt+1}: [{title}](<{url}>) {f"{chunk} " if chunk else ''}(相似度: {similarity})\n\n"""


def rank_search_res(search_res: list) -> list[tuple[str, str, str, float]]:
    """对搜索结果进行排序"""
    if not search_res:
        return []
    results_filter = {}
    results = []
    for chunk in search_res:  # concat by url
        title, url, doc_chunk, chunk_idx, similarity = chunk.title, chunk.url, chunk.doc_chunk, chunk.chunk_idx, chunk.similarity
        if url in results_filter:
            results_filter[url].append(
                (title, doc_chunk, chunk_idx, similarity))
        else:
            results_filter[url] = [(title, doc_chunk, chunk_idx, similarity)]
    for url, value in results_filter.items():
        value.sort(key=lambda x: x[2])  # chunk_idx
        title, doc_chunk, _,  similarity = value[0]
        for i in range(1, len(value)):
            if value[i-1][2]+1 == value[i][2]:
                doc_chunk += value[i][1]
            else:
                doc_chunk += f"\n\n{value[i][1]}"
            similarity = max(similarity, value[i][3])
        results.append((title, url, similarity, doc_chunk))
    # FIXME: may not be necessary
    results.sort(key=lambda x: x[2], reverse=True)
    return results


def convert_exact_search_res_stream(search_res: list):
    """转换精确搜索结果以流式响应"""
    choices = []
    answer = []
    for i, (chunk, title, url, similarity) in enumerate(search_res):
        choice = {"index": i,
                  "delta": {
                      "content": chunk,
                      "role": "assistant",
                      "title": title,
                      "url": url,
                      "similarity": similarity,
                      "finish_reason": "stop"
                  }}
        choices.append(choice)
        answer.append(chunk)
    return choices, answer


def convert_exact_search_res(search_res: list):
    """转换精确搜索结果"""
    choices = []
    answer = []
    for i, (chunk, title, url, similarity) in enumerate(search_res):
        choice = {"index": i,
                  "message": {
                      "content": chunk,
                      "role": "assistant",
                      "title": title,
                      "url": url,
                      "similarity": similarity
                  }}
        choices.append(choice)
        answer.append(chunk)
    return choices, answer


def convert_fuzzy_search_res(search_res: list):
    """转换模糊搜索结果"""
    choices = []
    for cnt, (title, url, similarity, chunk) in enumerate(search_res):
        choice = {"index": cnt,
                  "message": {
                      "content": chunk,
                      "role": "assistant",
                      "title": title,
                      "url": url,
                      "similarity": similarity
                  }}
        choices.append(choice)
    return choices


def chat(query: str, ip_addr: str, agent_id: int):
    """Chat with agent."""
    agent = agent_database.get_agent_lite(agent_id)
    created = int(time())
    if not agent:
        raise ValueError("agent does not exist")
    uid = f"chatcompl-{uuid.uuid4()}"
    if not agent.prompt_template:  # 无提示词模版直接进行模型问答
        chat_args = {
            "query": query,
            "prompt": query,
            "history": [],
            "search_choices": [],
            "ip_addr": ip_addr,
            "agent": agent,
            "chat_type": 0,
            "uid": uid,
            "created": created
        }
        return model_chat(**chat_args)
    embedding = utils.embed(query)[0]
    search_args = {
        "agent_id": agent.id,
        "embedding": embedding,
        "exact_search_similarity": agent.exact_search_similarity,
        "fuzzy_search_similarity": agent.fuzzy_search_similarity,
        "exact_search_limit": agent.exact_search_limit,
        "fuzzy_search_limit": agent.fuzzy_search_limit
    }
    similarity_search_res, use_model = agent_dataset_database.similarity_search(
        **search_args)
    history = []  # get_history(ip_addr)
    if not use_model:
        choices, answer = convert_exact_search_res(similarity_search_res)
        resp = {
            "id": uid,
            "object": "chat.search.exact",
            "choices": choices,
            "created": created
        }
        add_args = {
            "query": query,
            "prompt": "",
            "answer": answer,
            "history": history,
            "source": choices,
            "chat_type": 0,
            "ip_addr": ip_addr,
            "agent": agent,
            "uid": uid
        }
        add_chat(**add_args)
        return resp
    search_res = rank_search_res(similarity_search_res)
    search_choices = convert_fuzzy_search_res(search_res)
    prompt = generate_prompt(search_res, query, agent.prompt_template)
    # ip_key = f"ip:{ip_addr}"
    # if redis_db.exists(ip_key):
    #     redis_db.incr(ip_key)
    # else:
    #     redis_db.set(ip_key, 1, ex=agent.redis_ip_ex)
    # if int(redis_db.get(ip_key)) > agent.model_ip_limit:
    #     answer = "您的提问过于频繁，可以先看看相关资料，稍后再试。"
    #     resp_obj = "chat.limit.exceeded"
    #     add_args = {
    #         "query": query,
    #         "prompt": prompt,
    #         "answer": [answer],
    #         "history": history,
    #         "source": search_choices,
    #         "chat_type": 0,
    #         "ip_addr": ip_addr,
    #         "agent": agent,
    #         "uid": uid
    #     }
    #     add_chat(**add_args)
    #     return {
    #         "id": uid,
    #         "object": resp_obj,
    #         "message": [{
    #             "content": answer,
    #             "role": "assistant"
    #         }]+choices,
    #         "created": created
    #     }
    if config.USE_GREEN_CLIENT and not is_legal(query):
        answer = "抱歉，根据已知信息无法回答该问题。"
        resp_obj = "chat.illegal"
        add_args = {
            "query": query,
            "prompt": prompt,
            "answer": [answer],
            "history": history,
            "source": search_choices,
            "chat_type": 0,
            "ip_addr": ip_addr,
            "agent": agent,
            "uid": uid,
        }
        add_chat(**add_args)
        return {
            "id": uid,
            "object": resp_obj,
            "message": [{
                "content": answer,
                "role": "assistant"
            }]+choices,
            "created": created
        }
    chat_args = {
        "query": query,
        "prompt": prompt,
        "history": history,
        "search_choices": search_choices,
        "ip_addr": ip_addr,
        "agent": agent,
        "chat_type": 0,
        "uid": uid,
        "created": created
    }

    print(f"chat_args: {chat_args}")
    return model_chat(**chat_args)


def chat_stream(query: str, ip_addr: str, agent_id: int):
    """Chat with agent."""
    agent = agent_database.get_agent_lite(agent_id)
    if not agent:
        raise ValueError("agent does not exist")
    created = int(time())
    uid = f"chatcompl-{uuid.uuid4()}"
    if not agent.prompt_template:  # 无提示词模版直接进行模型问答
        chat_args = {
            "query": query,
            "prompt": query,
            "history": [],
            "search_choices": [],
            "ip_addr": ip_addr,
            "agent": agent,
            "chat_type": 0,
            "uid": uid,
            "created": created
        }
        yield from model_chat_stream(**chat_args)
        return
    
    embedding = utils.embed(query)[0]
    search_args = {
        "agent_id": agent.id,
        "embedding": embedding,
        "exact_search_similarity": agent.exact_search_similarity,
        "fuzzy_search_similarity": agent.fuzzy_search_similarity,
        "exact_search_limit": agent.exact_search_limit,
        "fuzzy_search_limit": agent.fuzzy_search_limit
    }

    similarity_search_res, use_model = agent_dataset_database.similarity_search(
        **search_args)
    history = []  # get_history(ip_addr)
    if not use_model:
        choices, answer = convert_exact_search_res_stream(
            similarity_search_res)
        resp = {
            "id": uid,
            "object": "chat.search.exact",
            "choices": choices,
            "created": created
        }
        yield json.dumps(resp)
        add_args = {
            "query": query,
            "prompt": "",
            "answer": answer,
            "history": history,
            "source": choices,
            "chat_type": 0,
            "ip_addr": ip_addr,
            "agent": agent,
            "uid": uid
        }
        add_chat(**add_args)
        yield DONE
        return
    search_res = rank_search_res(similarity_search_res)
    search_choices = convert_fuzzy_search_res(search_res)
    search_resp = {
        "id": uid,
        "object": "chat.search.fuzzy",
        "choices": search_choices,
        "created": created
    }
    yield json.dumps(search_resp)
    prompt = generate_prompt(search_res, query, agent.prompt_template)
    # ip_key = f"ip:{ip_addr}"
    # if redis_db.exists(ip_key):
    #     redis_db.incr(ip_key)
    # else:
    #     redis_db.set(ip_key, 1, ex=agent.redis_ip_ex)
    # if int(redis_db.get(ip_key)) > agent.model_ip_limit:
    #     answer = "您的提问过于频繁，可以先看看相关资料，稍后再试。"
    #     resp_obj = "chat.limit.exceeded"
    #     yield json.dumps({
    #         "id": uid,
    #         "object": resp_obj,
    #         "message": [{
    #             "content": answer,
    #             "role": "assistant"
    #         }],
    #         "created": created
    #     })
    #     add_args = {
    #         "query": query,
    #         "prompt": prompt,
    #         "answer": [answer],
    #         "history": history,
    #         "source": search_choices,
    #         "chat_type": 0,
    #         "ip_addr": ip_addr,
    #         "agent": agent,
    #         "uid": uid
    #     }
    #     add_chat(**add_args)
    #     yield DONE
    #     return
    if config.USE_GREEN_CLIENT and not is_legal(query):
        answer = "抱歉，根据已知信息无法回答该问题。"
        resp_obj = "chat.illegal"
        yield json.dumps({
            "id": uid,
            "object": resp_obj,
            "message": [{
                "content": answer,
                "role": "assistant"
            }],
            "created": created
        })
        add_args = {
            "query": query,
            "prompt": prompt,
            "answer": [answer],
            "history": history,
            "source": search_choices,
            "chat_type": 0,
            "ip_addr": ip_addr,
            "agent": agent,
            "uid": uid,
        }
        add_chat(**add_args)
        yield DONE
        return
    chat_args = {
        "query": query,
        "prompt": prompt,
        "history": history,
        "search_choices": search_choices,
        "ip_addr": ip_addr,
        "agent": agent,
        "chat_type": 0,
        "uid": uid,
        "created": created
    }
    yield from model_chat_stream(**chat_args)


def build_messages(prompt: str, history: list[list], system_message: str) -> list:
    """构建消息"""
    messages = [
        {
            "role": "system",
            "content": system_message
        }
    ] if system_message else []
    if history and len(history) % 2 == 0:
        for i in range(0, len(history), 2):
            messages.append({
                "role": "user",
                "content": history[i]
            })
            messages.append({
                "role": "assistant",
                "content": str(history[i+1])
            })
    messages.append({
        "role": "user",
        "content": prompt
    })
    return messages


def model_chat(
        query: str, prompt: str, history: list[str],
        search_choices: list, ip_addr: str, agent, chat_type: int, uid: str, created: int):
    """获取大模型的回答"""
    messages = build_messages(prompt, history, agent.system_message)
    logger.info(messages)
    model = model_database.get_model_by_id(agent.model_id)
    if not model:
        raise ValueError("model does not exist")
    headers = {
        "Authorization": f"Bearer {model.token}",
        "Content-Type": "application/json"
    }
    request_data = json.dumps({
        "model": model.name,
        "messages": messages,
        "temperature": agent.temperature,
        "top_p": agent.top_p,
        "n": agent.n_sequences,
        "max_tokens": agent.max_tokens,
        "stop": agent.stop,
        "presence_penalty": agent.presence_penalty,
        "frequency_penalty": agent.frequency_penalty,
        "logit_bias": json.loads(agent.logit_bias) if agent.logit_bias else {}
    })
    logger.info(request_data)
    resp = requests.post(model.url, headers=headers,
                         data=request_data, timeout=model.timeout)
    if resp.status_code != 200:
        logger.error(resp.text)
        raise ValueError("model request failed")
    resp_data = resp.json()
    if isinstance(resp_data, str):
        resp_data = json.loads(resp_data)
    logger.info(resp_data)
    answer = [ans["message"]["content"]
              for ans in resp_data["choices"] if ans["message"]["role"] == "assistant"]
    resp_data["id"] = uid
    resp_data["created"] = created
    resp_data["choices"] += search_choices
    resp_data["model"] = model.name_alias
    add_args = {
        "query": query,
        "prompt": prompt,
        "answer": answer,
        "source": search_choices,
        "history": history,
        "chat_type": chat_type,
        "ip_addr": ip_addr,
        "agent": agent,
        "model": model,
        "uid": uid,
    }
    add_chat(**add_args)
    return resp_data


def model_chat_stream(
        query: str, prompt: str, history: list[str],
        search_choices: list, ip_addr: str, agent, chat_type: int, uid: str, created: int):
    """获取大模型的回答"""
    messages = build_messages(prompt, history, agent.system_message)
    logger.info(messages)
    model = model_database.get_model_by_id(agent.model_id)
    if not model:
        raise ValueError("model does not exist")
    headers = {
        "Authorization": f"Bearer {model.token}",
        "Content-Type": "application/json"
    }
    request_data = json.dumps({
        "model": model.name,
        "messages": messages,
        "stream": True,
        "temperature": agent.temperature,
        "top_p": agent.top_p,
        "n": agent.n_sequences,
        "max_tokens": agent.max_tokens,
        "stop": agent.stop,
        "presence_penalty": agent.presence_penalty,
        "frequency_penalty": agent.frequency_penalty,
        "logit_bias": json.loads(agent.logit_bias) if agent.logit_bias else {}
    })
    logger.info(request_data)
    req = requests.post(model.url, headers=headers, data=request_data,
                        stream=True, timeout=model.timeout)
    answer = [""]*agent.n_sequences
    for line in req.iter_lines():
        if line:
            line = codecs.decode(line)
            if line.startswith("data:"):
                line = line[5:].strip()
                logger.info(line)
                try:
                    chunk = json.loads(line)
                    chunk["id"] = uid
                    chunk["created"] = created
                    chunk["model"] = model.name_alias
                    print(f"hello{json.dumps(chunk)}")
                    yield json.dumps(chunk)
                    if "choices" in chunk and len(
                            chunk["choices"]) > 0 and "delta" in chunk["choices"][0] and "content" in chunk["choices"][0]["delta"]:
                        answer[chunk["choices"][0]["index"]
                               ] += chunk["choices"][0]["delta"]["content"]
                except json.JSONDecodeError as err:
                    logger.info(err)
    yield DONE
    logger.info(answer)
    add_args = {
        "query": query,
        "prompt": prompt,
        "answer": answer,
        "source": search_choices,
        "history": history,
        "chat_type": chat_type,
        "ip_addr": ip_addr,
        "agent": agent,
        "model": model,
        "uid": uid,
    }
    add_chat(**add_args)


def add_chat(
        query: str, prompt: str, answer: list, source: list, history: list[str],
        chat_type: int, ip_addr: str, agent, uid: str, model=None):
    """添加到数据库"""
    history_key = f"history:{ip_addr}"
    if not history:
        history = [query, answer]
    else:
        if len(history) >= agent.llm_history_len*2:
            history = history[:-(agent.llm_history_len-1)*2]
        history.append(query)
        history.append(answer)
    # redis_db.set(history_key, json.dumps(history), ex=agent.redis_history_ex)
    add_args = {
        "question": query,
        "prompt": prompt,
        "answer": json.dumps(answer),
        "source": json.dumps(source),
        "type": chat_type,
        "ip": ip_addr,
        "agent_id": agent.id,
        "model_id": model.id if model else None,
        "model_name": model.name_alias if model else None,
        "uid": uid,
    }
    chat_id = database.add_chat(**add_args)
    return chat_id


def zero_out_sensitive(fields: int, description: dict[str, Any]) -> int:
    """bitwise, enforce sensitive bits to be 0"""
    length = description['length']-len(description['sensitive'])
    for i in description['sensitive']:
        fields = ((fields & ((1 << length)-(1 << (length-i))))
                  << 1) | (fields & ((1 << (length-i))-1))
        length += 1
    return fields


# def get_redis_ip() -> tuple[list[str], list[int]]:
#     """获取redis中的ip和访问次数"""
#     _, ip_addrs = redis.redis_db.scan(0, "ip:*")
#     counts = redis.redis_db.mget(ip_addrs)
#     return ip_addrs, counts
