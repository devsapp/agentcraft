"""Chat Service"""

import json
import requests
import codecs
from time import time
import re

import uuid
import app.database.model as model_database

# import app.database.assistant as assistant_database
# import app.database.assistant_dataset as assistant_dataset_database
import app.database.assistant_action_tools as assistant_action_tools_database
from app.reasoning.retrieval import data_retrieval

from app.common.logger import logger
from app.reasoning.tools_client import ToolsActionClient

DONE = "[DONE]"
DEFAULT_INSTRUCTION = "You are a helpful assistant."

TOOL_DESC = """{name_for_model}: Call this tool to interact with the {name_for_human} API. What is the {name_for_human} API useful for? {description_for_model} Parameters: {parameters}"""

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


class ReasoningStream:
    def __init__(self, query, assistant):
        self.assistant = assistant
        self.query = query

    def final_result(self, resp_data: str):
        match = re.search(r'Final Answer: (.+)', resp_data)
        if match:
            # 提取匹配的文本
            final_answer = match.group(1)
            return final_answer
        else:
            return ''

    def generator_text_completion(self, input_text: str, **kwargs):
        result = yield from self.text_completion(
            input_text, **kwargs)
        return result

    def llm_with_plugin(self, prompt: str, list_of_plugin_info=(), **kwargs):
        created = kwargs['created']
        uid = kwargs['uid']
        model = kwargs['model']
        history = []
        chat_history = [(x['user'], x['bot'])
                        for x in history] + [(prompt, '')]
        stream_response = {}
        stream_response["id"] = uid
        stream_response["created"] = created
        stream_response["model"] = model
        planning_prompt = self.build_input_text(
            chat_history, list_of_plugin_info, kwargs['instruction'])
        logger.info(f"the planning_prompt is:\n {planning_prompt}")
        text = ''
        while True:
            output = yield from self.text_completion(
                planning_prompt + text, **kwargs)
            action, action_input, output = self.parse_latest_plugin_call(
                output)
            if action:  # 需要调用插件
                stream_response = {"choices": []}
                stream_response["choices"].append({"index": 0,
                                                   "delta": {"role": "assistant",
                                                             "content": f'工具函数【{action}】 \n'},
                                                   "finish_reason": "null"})
                yield json.dumps(stream_response)
                observation = self.call_plugin(action, action_input)
                output += f'\nObservation: {observation}\nThought:'
                text += output
            else:  # 生成结束，并且不再需要调用插件
                text += output
                break
        # stream_response = {"choices":[]}
        # stream_response["choices"].append({"index": 0,
        #                                     "delta": {"role": "assistant",
        #                                                 "content": final_result(text)},
        #                                     "finish_reason": "null"})
        # yield json.dumps(stream_response)
        yield DONE
        new_history = []
        new_history.extend(history)
        new_history.append({'user': prompt, 'bot': text})

    def build_input_text(self, chat_history, list_of_plugin_info, system_instruction) -> str:
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
        retrieval_data = ''
        if(self.assistant.retrieval_prompt_template):
            retrieval_data = '\n有一些已知信息：'+ data_retrieval(self.query, self.assistant) + '请按照已知信息进行回答，问题，如果没有答案，请不要乱说'
        prompt = f'{im_start}system\n{system_instruction}{retrieval_data}{im_end}'
        for i, (query, response) in enumerate(chat_history):
            if list_of_plugin_info:  # 如果有候选插件
                # 倒数第一轮或倒数第二轮对话填入详细的插件信息，但具体什么位置填可以自行判断
                if (len(chat_history) == 1) or (i == len(chat_history) - 2):
                    query = PROMPT_REACT.format(
                        tools_text=tools_text,
                        tools_name_text=tools_name_text,
                        query=query,
                    )
            # 重要！若不 strip 会与训练时数据的构造方式产生差异。
            query = query.lstrip('\n').rstrip()
            # 重要！若不 strip 会与训练时数据的构造方式产生差异。
            response = response.lstrip('\n').rstrip()
            # 使用续写模式（text completion）时，需要用如下格式区分用户和AI：
            prompt += f"\n{im_start}user\n{query}{im_end}"
            prompt += f"\n{im_start}assistant\n{response}{im_end}"

        assert prompt.endswith(f"\n{im_start}assistant\n{im_end}")
        prompt = prompt[: -len(f'{im_end}')]
        return prompt

    def text_completion(self, input_text: str, **kwargs) -> str:  # 作为一个文本续写模型来使用
        created = kwargs['created']
        uid = kwargs['uid']
        model = kwargs['model']
        stop_words = kwargs['stop_words'].split(',')
        im_end = '<|im_end|>'
        if im_end not in stop_words:
            stop_words = stop_words + [im_end]
        messages = []
        messages.append({
            "role": "user",
            "content": input_text
        })
        # logger.info(messages)

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
            "stream": True,
            "max_tokens": kwargs['max_tokens'],
            "stop": stop_words,
            "presence_penalty": kwargs['presence_penalty'],
            "frequency_penalty": kwargs['frequency_penalty'],
            "logit_bias":  {}
        })
        resp = requests.post(kwargs['url'], headers=headers,
                             data=request_data, timeout=kwargs['timeout'])
        know_anwser = False
        answer = [""]
        for line in resp.iter_lines():
            if line:
                line = codecs.decode(line)
                if line.startswith("data:"):
                    line = line[5:].strip()
                    try:
                        chunk = json.loads(line)
                        chunk["id"] = uid
                        chunk["created"] = created
                        chunk["model"] = model

                        if "choices" in chunk and len(
                                chunk["choices"]) > 0 and "delta" in chunk["choices"][0] and "content" in chunk["choices"][0]["delta"]:
                            content = chunk["choices"][0]["delta"]["content"]

                            answer[chunk["choices"][0]["index"]
                                   ] += content
                            if(know_anwser):
                                yield json.dumps(chunk)
                            final_content = self.final_result(
                                answer[chunk["choices"][0]["index"]])
                            if(know_anwser == False and final_content != ''):
                                chunk["choices"][0]["delta"]["content"] = final_content
                                yield json.dumps(chunk)
                                know_anwser = True

                    except json.JSONDecodeError as err:
                        logger.info(err)

        output = answer[0]
        logger.info(f"输出结果：{output}")
        return output

    def parse_latest_plugin_call(self, text):
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

    def call_plugin(self, plugin_name: str, plugin_args: str) -> str:
        tools_client = ToolsActionClient()
        invoke_result = tools_client.invoke(plugin_name, plugin_args)
        return invoke_result

    def call_assistant_stream(self, text_input: str):
        action_tools = []
        assistant = self.assistant
        try:
            action_tools = assistant_action_tools_database.list_action_tools_by_assistant_id(
                assistant.id)
            action_tools = [
                {
                    'name_for_human': item.alias,
                    'name_for_model': item.name,
                    'description_for_model': item.description,
                    'parameters': item.input_schema,
                }
                for item in action_tools
            ]
          
        except Exception as e:
            logger.error(e)

        history = []

        model = model_database.get_model_by_id(assistant.model_id)

        llm_plugin_args = {
            "created": int(time()),
            "uid": f"assistant-compl-{uuid.uuid4()}",
            "temperature": assistant.temperature,
            "top_p": assistant.top_p,
            "n": assistant.n_sequences,
            "max_tokens": assistant.max_tokens,
            "stop_words": assistant.stop if assistant.stop else 'Observation:, Observation:\n',
            "presence_penalty": assistant.presence_penalty,
            "frequency_penalty": assistant.frequency_penalty,
            "logit_bias": assistant.logit_bias,
            "model_id": model.id if model else None,
            "token": model.token if model else None,
            "timeout": model.timeout if model else None,
            "model": model.name,
            "instruction": assistant.instruction if assistant.instruction else DEFAULT_INSTRUCTION,
            "model_name": model.name_alias if model else None,
            "url": model.url if model else None,
        }

        yield from self.llm_with_plugin(
            prompt=text_input, list_of_plugin_info=action_tools, **llm_plugin_args)

        return

# def final_result(resp_data: str):
#     match = re.search(r'Final Answer: (.+)', resp_data)
#     if match:
#         # 提取匹配的文本
#         final_answer = match.group(1)
#         return final_answer
#     else:
#         return ''
# def generator_text_completion(input_text: str, **kwargs):
#     result =  yield from text_completion(
#             input_text, **kwargs)
#     return result


# def llm_with_plugin(prompt: str, list_of_plugin_info=(), **kwargs):
#     created = kwargs['created']
#     uid = kwargs['uid']
#     model = kwargs['model']
#     history = []
#     chat_history = [(x['user'], x['bot']) for x in history] + [(prompt, '')]
#     stream_response = {}
#     stream_response["id"] = uid
#     stream_response["created"] = created
#     stream_response["model"] = model
#     planning_prompt = build_input_text(chat_history, list_of_plugin_info, kwargs['instruction'])
#     logger.info(f"the planning_prompt is:\n {planning_prompt}")
#     text = ''
#     while True:
#         output = yield from text_completion(
#             planning_prompt + text, **kwargs)
#         action, action_input, output = parse_latest_plugin_call(output)
#         if action:  # 需要调用插件
#             stream_response = {"choices":[]}
#             stream_response["choices"].append({"index": 0,
#                                         "delta": {"role": "assistant",
#                                                     "content": f'工具函数【{action}】 \n'},
#                                         "finish_reason": "null"})
#             yield json.dumps(stream_response)
#             observation = call_plugin(action, action_input)
#             output += f'\nObservation: {observation}\nThought:'
#             text += output
#         else:  # 生成结束，并且不再需要调用插件
#             text += output
#             break
#     # stream_response = {"choices":[]}
#     # stream_response["choices"].append({"index": 0,
#     #                                     "delta": {"role": "assistant",
#     #                                                 "content": final_result(text)},
#     #                                     "finish_reason": "null"})
#     # yield json.dumps(stream_response)
#     yield DONE
#     new_history = []
#     new_history.extend(history)
#     new_history.append({'user': prompt, 'bot': text})


# def build_input_text(chat_history, list_of_plugin_info,system_instruction) -> str:
#     tools_text = []
#     for plugin_info in list_of_plugin_info:
#         tool = TOOL_DESC.format(
#             name_for_model=plugin_info["name_for_model"],
#             name_for_human=plugin_info["name_for_human"],
#             description_for_model=plugin_info["description_for_model"],
#             parameters=json.dumps(
#                 plugin_info["parameters"], ensure_ascii=False),
#         )
#         if plugin_info.get('args_format', 'json') == 'json':
#             tool += " Format the arguments as a JSON object."
#         elif plugin_info['args_format'] == 'code':
#             tool += ' Enclose the code within triple backticks (`) at the beginning and end of the code.'
#         else:
#             raise NotImplementedError
#         tools_text.append(tool)
#     tools_text = '\n\n'.join(tools_text)

#     # 候选插件的代号
#     tools_name_text = ', '.join(
#         [plugin_info["name_for_model"] for plugin_info in list_of_plugin_info])

#     im_start = '<|im_start|>'
#     im_end = '<|im_end|>'
#     prompt = f'{im_start}system\n{system_instruction}{im_end}'
#     for i, (query, response) in enumerate(chat_history):
#         if list_of_plugin_info:  # 如果有候选插件
#             # 倒数第一轮或倒数第二轮对话填入详细的插件信息，但具体什么位置填可以自行判断
#             if (len(chat_history) == 1) or (i == len(chat_history) - 2):
#                 query = PROMPT_REACT.format(
#                     tools_text=tools_text,
#                     tools_name_text=tools_name_text,
#                     query=query,
#                 )
#         query = query.lstrip('\n').rstrip()  # 重要！若不 strip 会与训练时数据的构造方式产生差异。
#         # 重要！若不 strip 会与训练时数据的构造方式产生差异。
#         response = response.lstrip('\n').rstrip()
#         # 使用续写模式（text completion）时，需要用如下格式区分用户和AI：
#         prompt += f"\n{im_start}user\n{query}{im_end}"
#         prompt += f"\n{im_start}assistant\n{response}{im_end}"

#     assert prompt.endswith(f"\n{im_start}assistant\n{im_end}")
#     prompt = prompt[: -len(f'{im_end}')]
#     return prompt


# def text_completion(input_text: str, **kwargs) -> str:  # 作为一个文本续写模型来使用
#     created = kwargs['created']
#     uid = kwargs['uid']
#     model = kwargs['model']
#     stop_words = kwargs['stop_words'].split(',')
#     im_end = '<|im_end|>'
#     if im_end not in stop_words:
#         stop_words = stop_words + [im_end]
#     messages = []
#     messages.append({
#         "role": "user",
#         "content": input_text
#     })
#     # logger.info(messages)

#     headers = {
#         "Authorization": f"Bearer {kwargs['token']}",
#         "Content-Type": "application/json"
#     }
#     request_data = json.dumps({
#         "model": kwargs['model'],
#         "messages": messages,
#         "temperature": kwargs['temperature'],
#         "top_p": kwargs['top_p'],
#         "n": kwargs['n'],
#         "stream": True,
#         "max_tokens": kwargs['max_tokens'],
#         "stop": stop_words,
#         "presence_penalty": kwargs['presence_penalty'],
#         "frequency_penalty": kwargs['frequency_penalty'],
#         "logit_bias":  {}
#     })
#     resp = requests.post(kwargs['url'], headers=headers,
#                          data=request_data, timeout=kwargs['timeout'])
#     know_anwser = False
#     answer = [""]
#     for line in resp.iter_lines():
#         if line:
#             line = codecs.decode(line)
#             if line.startswith("data:"):
#                 line = line[5:].strip()
#                 try:
#                     chunk = json.loads(line)
#                     chunk["id"] = uid
#                     chunk["created"] = created
#                     chunk["model"] = model

#                     if "choices" in chunk and len(
#                             chunk["choices"]) > 0 and "delta" in chunk["choices"][0] and "content" in chunk["choices"][0]["delta"]:
#                         content = chunk["choices"][0]["delta"]["content"]

#                         answer[chunk["choices"][0]["index"]
#                                ] += content
#                         if(know_anwser):
#                             yield json.dumps(chunk)
#                         final_content = final_result(answer[chunk["choices"][0]["index"]])
#                         if(know_anwser == False and final_content != ''):
#                             chunk["choices"][0]["delta"]["content"] = final_content
#                             yield json.dumps(chunk)
#                             know_anwser = True

#                 except json.JSONDecodeError as err:
#                     logger.info(err)

#     output = answer[0]
#     logger.info(f"输出结果：{output}")
#     return output


# def parse_latest_plugin_call(text):
#     plugin_name, plugin_args = '', ''
#     i = text.rfind('\nAction:')
#     j = text.rfind('\nAction Input:')
#     k = text.rfind('\nObservation:')
#     if 0 <= i < j:  # If the text has `Action` and `Action input`,
#         if k < j:  # but does not contain `Observation`,
#             # then it is likely that `Observation` is ommited by the LLM,
#             # because the output text may have discarded the stop word.
#             text = text.rstrip() + '\nObservation:'  # Add it back.
#         k = text.rfind('\nObservation:')
#         plugin_name = text[i + len('\nAction:'): j].strip()
#         plugin_args = text[j + len('\nAction Input:'): k].strip()
#         text = text[:k]
#     return plugin_name, plugin_args, text


# def call_plugin(plugin_name: str, plugin_args: str) -> str:
#     if(plugin_name == 'data_retrieval'):
#         return data_retrieval(plugin_args, g_assistant)
#     else:
#         tools_client = ToolsActionClient()
#         invoke_result = tools_client.invoke(plugin_name, plugin_args)
#         return invoke_result

# def call_assistant_stream(text_input: str, assistant):
#     action_tools = []
#     g_assistant = assistant
#     # retrieval_data = data_retrieval(text_input, assistant)
#     try:
#         action_tools = assistant_action_tools_database.list_action_tools_by_assistant_id(
#             assistant.id)
#         action_tools = [
#             {
#                 'name_for_human': item.alias,
#                 'name_for_model': item.name,
#                 'description_for_model': item.description,
#                 'parameters': item.input_schema,
#             }
#             for item in action_tools
#         ]
#         action_tools.append({
#             'name_for_human': '知识召回',
#             'name_for_model': 'data_retrieval',
#             'description_for_model': '知识检索工具，用来检索领域相关的知识,优先于搜索引擎使用',
#             'parameters': '[{"name": "input","description": "用户输入的问题","required": True,"schema": {"type": "string"}}]',
#         })
#     except Exception as e:
#         logger.error(e)

#     history = []

#     model = model_database.get_model_by_id(assistant.model_id)

#     llm_plugin_args = {
#         "created": int(time()),
#         "uid" : f"assistant-compl-{uuid.uuid4()}",
#         "temperature": assistant.temperature,
#         "top_p": assistant.top_p,
#         "n": assistant.n_sequences,
#         "max_tokens": assistant.max_tokens,
#         "stop_words": assistant.stop if assistant.stop else 'Observation:, Observation:\n',
#         "presence_penalty": assistant.presence_penalty,
#         "frequency_penalty": assistant.frequency_penalty,
#         "logit_bias": assistant.logit_bias,
#         "model_id": model.id if model else None,
#         "token": model.token if model else None,
#         "timeout": model.timeout if model else None,
#         "model": model.name,
#         "instruction": assistant.instruction if assistant.instruction else DEFAULT_INSTRUCTION,
#         "model_name": model.name_alias if model else None,
#         "url": model.url if model else None,
#     }

#     yield from llm_with_plugin(
#         prompt=text_input, list_of_plugin_info=action_tools, **llm_plugin_args)

#     return
