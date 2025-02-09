"""Chat Service"""
# pylint: disable = no-member
from typing import Any
from time import time
import uuid
import json
import codecs
import requests
from app.common import utils
import app.database.chat as database
import app.database.agent as agent_database
import app.database.agent_session as agent_session_database
import app.database.agent_dataset as agent_dataset_database
import app.database.agent_session_chat as agent_session_chat_dataset_database
import app.database.model as model_database
from app.common.logger import logger
from app.common.constants import  YELLOW, RESET, RED
from app.config import common as config

DONE = "[DONE]"
class get_related():
    def __init__(self, agent_id, query, agent = None):
        if not agent:
            agent = agent_database.get_agent_lite(agent_id)
            if not agent:
                raise ValueError("agent does not exist")
            self.agent = agent

        self.agent_id = agent_id
        self.query = query
        self.embedding = utils.embed(query)[0]
    

    def check_user_has_agent(self, user_id: int):
        if not self.agent.user_id == user_id:
            raise ValueError("user does not have this agent")
    
    def qa(self, search_limit = 3):
        question = []
        search_similarity = self.agent.exact_search_similarity
        search_similarity_1 = search_similarity - 0.1 if search_similarity - 0.3 <= 0 else search_similarity - 0.3
        logger.info(f'exact_search_similarity soucre: {search_similarity}, to {search_similarity_1}')
        if search_similarity_1 <= 0:
            return question
        search_res, _use_exact = agent_dataset_database.exact_seach(self.agent_id, self.embedding, search_similarity_1, search_limit)
        for _i, (_chunk, title, _url, _similarity) in enumerate(search_res):
            question.append(title)
        return question
def get_reasoning_content(chunk):
    choices = chunk.get("choices")
    if isinstance(choices, list) and choices:
        delta = choices[0].get("delta", {})
        return delta.get("reasoning_content")
    return None
def get_chat_session_id(session_id: int, keyword: str, agent_id: int, **kv):
    if keyword is not None:
        data = agent_session_database.get_session_by_agent_id(agent_id, keyword=keyword)
        if data is not None:
            return data.get("id")
        add_args = {
            "title": keyword,
            "agent_id": agent_id,
            "keyword": keyword,
        }
        add_args.update(kv)
        logger.info(f"add agent session {add_args}")
        return create_agent_session(**add_args)
    elif session_id is not None:
        data = agent_session_database.get_session(session_id)
        if not data:
            raise ValueError(f"does not have this agent session {session_id}")
        return session_id


def create_agent_session(**add_args):
    if not agent_database.get_agent_lite(add_args.get('agent_id')):
        raise ValueError("agent does not exist")
    if len(add_args.get('title', '')) > 20:
        add_args["title"] = add_args.get('title')[:20:] + '...'
    return agent_session_database.add_session(**add_args)


def list_chats_id_by_session_id(agent_id: int, session_id: int, **kv):
    """根据 session_id 获取 agent_chats_id 的列表"""
    agent = agent_database.get_agent_lite(agent_id)
    if not agent:
        raise ValueError("agent does not exist")
    if not agent_database.check_user_has_agent(agent.user_id, agent_id):
        raise ValueError("user does not have this agent")
    limit = kv.get("limit") or agent.llm_history_len or 20
    page = kv.get("page") or 0
    data, total = agent_session_chat_dataset_database.list_chats_session_chat_id_by_session_id(session_id, page, limit)
    return data, total


def list_chats_history_by_session_id(agent_id: int, session_id: int, limit = None, page = None):
    """根据 session_id 列出问答历史记录"""
    data, total = list_chats_id_by_session_id(agent_id, session_id, limit = limit, page = page)
    history = []
    for item in data:
        agent_chat_data = database.get_chat_lite(item.get("chat_id"))
        if not agent_chat_data:
            logger.info(f'No information found for chat id({item.get("chat_id")})')
            continue
        history.append(agent_chat_data)
    return history[::-1], total


def list_chats(agent_id: int, user_id: int, page: int, limit: int):
    """列出问答历史记录"""
    if not agent_database.check_user_has_agent(user_id, agent_id):
        raise ValueError("user does not have this agent")
    data, total = database.list_chats(agent_id, 0, page, limit)
    data_dict = [vars(chat) for chat in data]
    return data_dict, total

def sanitize_text(text: str) -> str:
    """防止问题注入"""
    return text.replace("```", "")

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


def chat(agent_session_id: int, query: str, ip_addr: str, agent_id: int, history = []):
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
            "history": history,
            "search_choices": [],
            "ip_addr": ip_addr,
            "agent": agent,
            "chat_type": 0,
            "uid": uid,
            "created": created
        }
        return model_chat(agent_session_id, **chat_args)
    embedding = utils.embed(query)[0]
    # 精准问答
    similarity_search_res, use_exact = agent_dataset_database.exact_seach(agent.id, embedding, agent.exact_search_similarity, agent.exact_search_limit)
    # 匹配到精准问答
    if not similarity_search_res == []:
        logger.info(f'only use_exact: true')
        choices, answer = convert_exact_search_res_stream(
            similarity_search_res)
        add_args = {
            "query": query,
            "prompt": "",
            "answer": answer,
            "source": choices,
            "chat_type": 0,
            "ip_addr": ip_addr,
            "agent": agent,
            "usage": {},
            "uid": uid
        }
        chat_id = add_chat(**add_args)
        add_session_chat(agent_session_id, chat_id)
        return {
            "id": uid,
            "object": "chat.search.exact",
            "choices": choices,
            "created": created
        }

    # 如果精准问答没有匹配到，尝试使用了文档集
    if similarity_search_res == []:
        similarity_search_res, use_similarity = agent_dataset_database.similarity_search(agent.id, embedding, agent.fuzzy_search_similarity, agent.fuzzy_search_limit)
    logger.info(f'has similarity_search_res: {similarity_search_res != []}')

    # 没有匹配到问答
    if similarity_search_res == []:
        answer = agent.default_answer or "抱歉，没有匹配到相关问题。"
        add_args = {
            "query": query,
            "prompt": "",
            "answer": [answer],
            "source": [],
            "chat_type": 0,
            "ip_addr": ip_addr,
            "agent": agent,
            "usage": {},
            "uid": uid,
        } 
        model = model_database.get_model_by_id(agent.model_id)
        chat_id = add_chat(**add_args)
        add_session_chat(agent_session_id, chat_id)
     
        return {
            "id": uid,
            "object": "chat.illegal",
            "model": model.name,
            "choices": [{
              "index": 0,
              "message": {
                "content": answer,
                "role": "assistant"
              },
              "finish_reason": "null"
            }],
            "usage": {
                "prompt_tokens": 0,
                "completion_tokens": 0,
                "total_tokens": 0
            },
            "created": created
        }

    search_res = rank_search_res(similarity_search_res)
    search_choices = convert_fuzzy_search_res(search_res)
    prompt = generate_prompt(search_res, query, agent.prompt_template)
    
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

    logger.debug(f"chat_args: {chat_args}")
    return model_chat(agent_session_id, **chat_args)


def chat_stream(agent_session_id: int, query: str, ip_addr: str, agent_id: int, history = []):
    """Chat with agent."""
    agent = agent_database.get_agent_lite(agent_id)
    if not agent:
        raise ValueError("agent does not exist")
    created = int(time())
    uid = f"chatcompl-{uuid.uuid4()}"
    # 普通问答
    if not agent.prompt_template: 
        chat_args = {
            "query": query,
            "prompt": query,
            "history": history,
            "search_choices": [],
            "ip_addr": ip_addr,
            "agent": agent,
            "chat_type": 0,
            "uid": uid,
            "created": created
        }
        yield from model_chat_stream(agent_session_id, **chat_args)
        return
    # 知识库
    embedding = utils.embed(query)[0]

    # 精准问答
    similarity_search_res, use_exact = agent_dataset_database.exact_seach(agent.id, embedding, agent.exact_search_similarity, agent.exact_search_limit)
    # 匹配到精准问答
    if not similarity_search_res == []:
        logger.info('only use_exact: true')
        choices, answer = convert_exact_search_res_stream(
            similarity_search_res)
        yield json.dumps({
            "id": uid,
            "object": "chat.search.exact",
            "choices": choices,
            "created": created
        })
        add_args = {
            "query": query,
            "prompt": "",
            "answer": answer,
            "source": choices,
            "chat_type": 0,
            "ip_addr": ip_addr,
            "agent": agent,
            "usage": {},
            "uid": uid
        }
        chat_id = add_chat(**add_args)
        add_session_chat(agent_session_id, chat_id)
        yield DONE
        return

    # 如果精准问答没有匹配到，尝试使用了文档集
    if similarity_search_res == []:
        similarity_search_res, use_similarity = agent_dataset_database.similarity_search(agent.id, embedding, agent.fuzzy_search_similarity, agent.fuzzy_search_limit)

    logger.info(f'has similarity_search_res: {similarity_search_res != []}')
    # 没有匹配到问答
    if similarity_search_res == []:
        answer = agent.default_answer or "抱歉，没有匹配到相关问题。"

        yield json.dumps({
            "id": uid,
            "object": "chat.illegal",
            "message": [{
                "content": answer,
                "role": "assistant"
            }],
            "created": created
        })
        add_args = {
            "query": query,
            "prompt": "",
            "answer": [answer],
            "source": [],
            "chat_type": 0,
            "ip_addr": ip_addr,
            "agent": agent,
            "usage": {},
            "uid": uid,
        } 
        chat_id = add_chat(**add_args)
        add_session_chat(agent_session_id, chat_id)
        yield DONE
        return
    
    # 使用文档集问答
    search_res = rank_search_res(similarity_search_res)
    prompt = generate_prompt(search_res, query, agent.prompt_template)
    search_choices = convert_fuzzy_search_res(search_res)
    search_resp = {
        "id": uid,
        "object": "chat.search.fuzzy",
        "choices": search_choices,
        "created": created
    }
    yield json.dumps(search_resp)
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
    yield from model_chat_stream(agent_session_id, **chat_args)


def build_messages(prompt: str, history: list, system_message: str) -> list:
    """构建消息"""
    messages = [
        {
            "role": "system",
            "content": system_message
        }
    ] if system_message else []
    for item in history:
        messages.append({
            "role": "user",
            "content": item['user']
        })
        messages.append({
            "role": "assistant",
            "content": item['assistant']
        })
    messages.append({
        "role": "user",
        "content": prompt
    })
    return messages


def model_chat(agent_session_id,
        query: str, prompt: str, history: list[str],
        search_choices: list, ip_addr: str, agent, chat_type: int, uid: str, created: int):
    """获取大模型的回答"""
    messages = build_messages(prompt, history, agent.system_message)
    model = model_database.get_model_by_id(agent.model_id)
    if not model:
        raise ValueError("model does not exist")
    headers = {
        "Authorization": f"Bearer {model.token}",
        "Content-Type": "application/json"
    }
    llm_request_options = {
        "model": model.name,
        "messages": messages,
        "temperature": agent.temperature,
        "top_p": agent.top_p,
        "n": agent.n_sequences,
        "max_tokens": agent.max_tokens,
        "presence_penalty": agent.presence_penalty,
        # "frequency_penalty": agent.frequency_penalty,
        "logit_bias": json.loads(agent.logit_bias) if agent.logit_bias else {}
        
    }
    if(agent.stop != []):
        llm_request_options['stop'] = agent.stop
    request_data = json.dumps(llm_request_options) # 不转码存在服务器的特殊情况
    request_data_for_log = json.dumps(llm_request_options,ensure_ascii=False)
    logger.info(f"{YELLOW}Request Data:{request_data_for_log}{RESET}")
    resp = requests.post(model.url, headers=headers,
                         data=request_data, timeout=model.timeout)
    if resp.status_code != 200:
        logger.error(f"{RED}{resp.text}{RESET}")
        raise ValueError(resp.text)
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
        "chat_type": chat_type,
        "ip_addr": ip_addr,
        "agent": agent,
        "model": model,
        "uid": uid,
        "usage": resp_data.get('usage', {})
    }
    chat_id = add_chat(**add_args)
    add_session_chat(agent_session_id, chat_id)
    return resp_data


def model_chat_stream(agent_session_id, 
        query: str, prompt: str, history: list,
        search_choices: list, ip_addr: str, agent, chat_type: int, uid: str, created: int):
    """获取大模型的回答"""
    try:
        messages = build_messages(prompt, history, agent.system_message)
        model = model_database.get_model_by_id(agent.model_id)
        if not model:
            raise ValueError("model does not exist")
        headers = {
            "Authorization": f"Bearer {model.token}",
            "Content-Type": "application/json"
        }
        llm_request_options = {
            "model": model.name,
            "messages": messages,
            "stream": True,
            "temperature": agent.temperature,
            "top_p": agent.top_p,
            # "top_k": 50, # OpenAI 不支持该参数
            "n": agent.n_sequences,
            "max_tokens": agent.max_tokens,
            "presence_penalty": agent.presence_penalty,
            # "frequency_penalty": agent.frequency_penalty, # OpenAI 不支持该参数
            "logit_bias": json.loads(agent.logit_bias) if agent.logit_bias else {},
            "stream_options": {
                "include_usage": True
            }
        }
        if(agent.stop != []):
            llm_request_options['stop'] = agent.stop
        request_data = json.dumps(llm_request_options)
        request_data_for_log = json.dumps(llm_request_options,ensure_ascii=False)
        logger.info(f"{YELLOW}Request Data:{request_data_for_log}{RESET}")
        resp = requests.post(model.url, headers=headers, data=request_data,
                            stream=True, timeout=model.timeout)
        answer = [""]*agent.n_sequences
        if(resp.status_code != 200):
            logger.error(f"{RED}{resp.text}{RESET}")
            yield json.dumps({
                "id": uid,
                "object": "chat.error",
                "message": [{
                    "content": f"An unexpected error occurred: {str(resp.text)}",
                    "role": "assistant"
                }],
                "created": created
            })
            yield DONE
            return
        usage = {}
        reason_prefix = '\n<think>\n'
        reason_suffix = '\n</think>\n'
        start_reasoning = False
        start_real_content = False
        for line in resp.iter_lines():
            if line:
                line = codecs.decode(line)
                if line.startswith("data:"):
                    line = line[5:].strip()
                    try:
                        chunk = json.loads(line)
                        chunk["id"] = uid
                        chunk["created"] = created
                        chunk["model"] = model.name_alias
                        usage = chunk.get('usage', {})
                        
                        if "choices" in chunk and len(
                                chunk["choices"]) > 0 and "delta" in chunk["choices"][0] and "content" in chunk["choices"][0]["delta"]:
                            content = chunk["choices"][0]["delta"]["content"]
                            logger.info(f"{RED}chunk:{chunk}{RESET}")
                            reasoning_content = get_reasoning_content(chunk)
                            if(reasoning_content != None):
                                if(start_reasoning == False):
                                    start_reasoning = True
                                    reasoning_content = reason_prefix + reasoning_content
                                    chunk["choices"][0]["delta"]["content"] = reasoning_content
                                else:
                                    chunk["choices"][0]["delta"]["content"] = reasoning_content
                                answer[chunk["choices"][0]["index"]
                                    ] += reasoning_content
                                yield json.dumps(chunk)
    
                            if(content != None):
                                if(start_real_content == False and start_reasoning == True):
                                    start_real_content = True
                                    content = reason_suffix + content
                                    chunk["choices"][0]["delta"]["content"] = reason_suffix + content
                                answer[chunk["choices"][0]["index"]
                                    ] += content
                                yield json.dumps(chunk)
                        else:
                            if 'usage' in chunk and chunk['usage'] is not None:
                                yield json.dumps(chunk)
                    except json.JSONDecodeError as err:
                        logger.info(f"{YELLOW}Unconverted chunk {line}{RESET}")
        # """添加检索来源信息"""
        # if len(search_choices) > 0:
        #     result_text = "\n\n相关链接\n"
        #     for index, item in enumerate(search_choices):
        #         if item['message']['url']:
        #             markdown_text = f"\[{index+1}\] [{item['message']['title']}]({item['message']['url']})\n"
        #             result_text += markdown_text
        #     search_info = {"choices":[]}
        #     search_info["id"] = uid
        #     search_info["created"] = created
        #     search_info["model"] = model.name_alias
        #     search_info["choices"].append({"index": 0,
        #                                 "delta": {"role": "assistant",
        #                                             "content": result_text},
        #                                 "finish_reason": "null"})
        #     yield json.dumps(search_info)

        yield DONE
        add_args = {
            "query": query,
            "prompt": prompt,
            "answer": answer,
            "source": search_choices,
            "chat_type": chat_type,
            "ip_addr": ip_addr,
            "agent": agent,
            "model": model,
            "uid": uid,
            "usage": usage,
        }
        chat_id = add_chat(**add_args)
        add_session_chat(agent_session_id, chat_id)

    except Exception as e:
        logger.info(f'{YELLOW}original response:{resp.text}{RESET}')
        logger.error(f"{RED}Unexpected error in model_chat_stream: {e}{RESET}", exc_info=True)
        yield json.dumps({
            "id": uid,
            "object": "chat.error",
            "message": [{
                "content": f"An error occurred: {str(e)}",
                "role": "assistant"
            }],
            "created": created
        })
        yield DONE
        return

def add_chat(
        query: str, prompt: str, answer: list, source: list,
        chat_type: int, ip_addr: str, agent, uid: str,
        usage: dict, model=None):
    """添加到数据库"""
    add_args = {
        "question": query,
        "prompt": prompt,
        "answer": answer[0],
        "source": json.dumps(source),
        "type": chat_type,
        "ip": ip_addr,
        "agent_id": agent.id,
        "model_id": model.id if model else None,
        "model_name": model.name_alias if model else None,
        "uid": uid,
        "prompt_tokens": usage.get('prompt_tokens', 0),
        "completion_tokens": usage.get('completion_tokens', 0),
        "total_tokens": usage.get('total_tokens', 0),
    }
    chat_id = database.add_chat(**add_args)
    return chat_id
def add_session_chat(session_id: int, chat_id: int):
    """添加到session_chat数据库"""
    agent_session_chat_dataset_database.insert_agent_session_chats(session_id, [chat_id])
