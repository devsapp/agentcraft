"""Chat Service"""
# pylint: disable = no-member
import json
import json5
import requests
import app.database.model as model_database
# import app.database.redis as redis
from app.common.logger import logger


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


def llm_with_plugin(prompt: str,list_of_plugin_info=(), **kwargs):
    history = []
    chat_history = [(x['user'], x['bot']) for x in history] + [(prompt, '')]

    # 需要让模型进行续写的初始文本
    planning_prompt = build_input_text(chat_history, list_of_plugin_info)
    text = ''
    while True:
        output = text_completion(
            planning_prompt + text, **kwargs)
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
            parameters=json.dumps(
                plugin_info["parameters"], ensure_ascii=False),
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
    tools_name_text = ', '.join(
        [plugin_info["name_for_model"] for plugin_info in list_of_plugin_info])

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
        # 重要！若不 strip 会与训练时数据的构造方式产生差异。
        response = response.lstrip('\n').rstrip()
        # 使用续写模式（text completion）时，需要用如下格式区分用户和AI：
        prompt += f"\n{im_start}user\n{query}{im_end}"
        prompt += f"\n{im_start}assistant\n{response}{im_end}"

    assert prompt.endswith(f"\n{im_start}assistant\n{im_end}")
    prompt = prompt[: -len(f'{im_end}')]
    return prompt


def text_completion(input_text: str, **kwargs) -> str:  # 作为一个文本续写模型来使用

    stop_words = kwargs['stop_words'].split(',')
    im_end = '<|im_end|>'
    if im_end not in stop_words:
        stop_words = stop_words + [im_end]
    messages = []
    messages.append({
        "role": "user",
        "content": input_text
    })
    logger.info(messages)
  
    headers = {
        "Authorization": f"Bearer {kwargs['token']}",
        "Content-Type": "application/json"
    }
    request_data = json.dumps({
        "model": kwargs['model'],
        "messages": messages,
        "temperature": kwargs['temperature'],
        "top_p": kwargs['top_p'],
        "n": kwargs['n'],
        "max_tokens": kwargs['max_tokens'],
        "stop": stop_words,
        "presence_penalty": kwargs['presence_penalty'],
        "frequency_penalty": kwargs['frequency_penalty'],
        "logit_bias":  {}
    })
    resp = requests.post(kwargs['url'], headers=headers,
                         data=request_data, timeout=kwargs['timeout'])
    if resp.status_code != 200:
        logger.error(resp.text)
        raise ValueError("model request failed")
    resp_data = resp.json()
    if isinstance(resp_data, str):
        resp_data = json.loads(resp_data)
    answer = [ans["message"]["content"]
              for ans in resp_data["choices"] if ans["message"]["role"] == "assistant"]
    print(f"answer {answer}")
    output = answer[0]
    return output  

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
        plugin_name = text[i + len('\nAction:'): j].strip()
        plugin_args = text[j + len('\nAction Input:'): k].strip()
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

    if plugin_name == 'google_search':

        return '周杰伦的老婆是昆凌'
        # 使用 SerpAPI 需要在这里填入您的 SERPAPI_API_KEY！
        # os.environ["SERPAPI_API_KEY"] = os.getenv(
        #     "SERPAPI_API_KEY", default='')
        # from langchain import SerpAPIWrapper

        # return SerpAPIWrapper().run(json5.loads(plugin_args)['search_query'])
    elif plugin_name == 'image_gen':
        import urllib.parse

        prompt = json5.loads(plugin_args)["prompt"]
        prompt = urllib.parse.quote(prompt)
        return json.dumps({'image_url': f'https://image.pollinations.ai/prompt/{prompt}'}, ensure_ascii=False)
    else:
        raise NotImplementedError


def call_agent(text_input: str, agent):

    # 根据 agent_id 查询绑定的工具
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
    resp = {
        "id": "chatcompl-ce85791a-b94c-4732-b914-78b7145e0bfc",
        "object": "chat.completion",
        "created": 1703581720,
        "model": "闭源千问Qwen-Plus版本",
        "choices": [
            {
                "index": 0,
                "message": {
                 "role": "assistant",
                    "content": ""},
                "finish_reason": "stop"
            }
        ],
        "usage": {
            "aa": 5
        }
    }
    model = model_database.get_model_by_id(agent.model_id)

    llm_plugin_args = {
        "temperature": agent.temperature,
        "top_p": agent.top_p,
        "n": agent.n_sequences,
        "max_tokens": agent.max_tokens,
        "stop_words": agent.stop if agent.stop else 'Observation:, Observation:\n',
        "presence_penalty": agent.presence_penalty,
        "frequency_penalty": agent.frequency_penalty,
        "logit_bias": agent.logit_bias,
        "model_id": model.id if model else None,
        "token": model.token if model else None,
        "timeout": model.timeout if model else None,
        "model": model.name,
        "model_name": model.name_alias if model else None,
        "url": model.url if model else None,
    }
    content = ''
    print(f"User's Query:\n{text_input}\n")
    response, history = llm_with_plugin(
        prompt=text_input, list_of_plugin_info=tools, **llm_plugin_args)
    content += response
    print(f"Qwen's Response:\n{response}\n")

    resp["choices"][0]['message']['content'] = content
    return resp
