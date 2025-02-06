"""Chat Service"""

import json
import requests
import codecs
from time import time
import uuid
import app.database.assistant_action_tools as assistant_action_tools_database
from app.reasoning.retrieval import data_retrieval, llm_retrieval_instruction_stream
from app.common.logger import logger
from app.reasoning.tools_client import ToolsActionClient
from app.common.constants import  YELLOW, RESET, RED
DONE = "[DONE]"
DEFAULT_INSTRUCTION = "You are a helpful assistant."

TOOL_DESC = """{name_for_model}: Call this tool to interact with the {name_for_human} API. What is the {name_for_human} API useful for? {description_for_model} Parameters: {parameters}"""

RETRIEVAL_ARGUMRNTED = """已知【{local_datasets}】是本地的知识库数据集，当你没有问题的答案或者被提问{local_datasets}相关问题的时候可以使用[data_retrieval]这个API工具"""


PROMPT_REACT = """Answer the following questions as best you can. You have access to the following APIs: 

{tools_text}

We must pay attention to only making practical discussions on the results of calling the tool. If it is, it means it is there, and if it is not, it is not. Do not make excessive interpretations.

Strictly use the following format. For example, to find the final answer,"Final Answer” cannot be omitted:

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
    def __init__(self, query, assistant,model, datasets, credential_dict, history, **business):
        self.assistant = assistant
        self.query = query
        self.datasets = datasets
        self.credential_dict = credential_dict
        self.time = time()
        self.tool_name_dict = {}
        self.history = history
        self.model = model
        self.result = None
        self.business = business
        self.usage = (0, 0, 0)

    def extract_final_answer(self, text):
        if not isinstance(text, str):
            raise ValueError("Input must be a string")
        keyword = "Final Answer:"
        keyword_index = text.find(keyword)
        if keyword_index != -1:
            return text[keyword_index + len(keyword):].strip()
        return ''

    def check_action_tool(self, resp_data: str):
        keyword = "Action:"
        keyword_index = resp_data.find(keyword)
        if keyword_index != -1:
            return True
        return False

    def final_result(self, resp_data: str):
        return self.extract_final_answer(resp_data)

    def wrapperUiRenderdPreview(self, title, content):
        return f"""<ChatUIPreview title='{title}' component='{content}' />"""

    def extract_json_content(self, text):
        start_index = text.find('{')
        end_index = text.rfind('}')
        if start_index != -1 and end_index != -1:
            json_content = text[start_index:end_index+1]
            return json_content
        else:
            return '{}'

    def generator_text_completion(self, input_text: str, **kwargs):
        result = yield from self.text_completion(
            input_text, **kwargs)
        return result

    def llm_with_plugin(self, prompt: str, list_of_plugin_info=(), **kwargs):
        created = kwargs['created']
        uid = kwargs['uid']
        model = kwargs['model']
        history = self.history
        session_id = self.business.get('session_id', None)
        chat_history = [(x['user'], x['assistant'])
                        for x in history] + [(prompt, '')]
        stream_response = {}
        stream_response["session_id"] = session_id
        stream_response["id"] = uid
        stream_response["created"] = created
        stream_response["model"] = model
        planning_prompt = self.build_input_text(
            chat_history, list_of_plugin_info, kwargs['instruction'])
        kwargs['need_react'] = True if len(
            list_of_plugin_info) > 0 else False  
        agent_final_text = ''
        while True:
            llm_output = yield from self.text_completion(
                planning_prompt + agent_final_text, **kwargs)
            action, action_input, output = self.parse_latest_plugin_call(
                llm_output)

            logger.info(f"AI工具：{action}, 工具入参：{action_input}")
            if action:
                tool_name = ''
                try:
                    tool_detail = self.tool_name_dict[action]
                    tool_name = tool_detail['name']
                    need_llm_call = tool_detail['need_llm_call']
                    # TODO: 判断条件应该用其他的变量
                    if need_llm_call == 2:
                        logger.info(f"工具执行结果：{llm_output}")
                        agent_process_answer = self.final_result(llm_output)
                        observation = self.call_plugin(action, action_input)
                        logger.info(f"Action_input：{action_input}")
                        logger.info(f"Execution {action} 结果：{observation}")
                        stream_response = {"choices": []}
                        final_result_preview = self.wrapperUiRenderdPreview(tool_name, observation)
                        stream_response["choices"].append({"index": 0,
                                                           "delta": {"role": "assistant",
                                                                     "content": f'{agent_process_answer}\n {final_result_preview} \n'},
                                                           "finish_reason": "null"})
                        stream_response["session_id"] = session_id
                        yield json.dumps(stream_response)
                        break
                    else:
                        stream_response = {"choices": []}
                        stream_response["session_id"] = session_id
                        stream_response["choices"].append({"index": 0,
                                                           "delta": {"role": "assistant",
                                                                     "content": f'使用🔨：【{tool_name}】\n '},
                                                           "finish_reason": "null"})
                        yield json.dumps(stream_response)
                        observation = self.call_plugin(action, action_input)
                        logger.info(f"{action}工具调用结果：{observation}")
                        output += f'\nObservation: {observation}\nThought:'
                        agent_final_text += output
                        if(action == 'data_retrieval'):  # 知识库召回特殊处理
                            plugin_args = json.loads(action_input)
                            user_question = plugin_args["user_question"]
                            kwargs['retrieval_prompt_template'] = self.assistant.retrieval_prompt_template
                            yield from llm_retrieval_instruction_stream(user_question, observation, **kwargs)
                            break
                except KeyError:
                    names_for_model_list = [plugin['name_for_model']
                                            for plugin in list_of_plugin_info]
                    names_for_model_str = ','.join(names_for_model_list)
                    agent_final_text += f"The action '{action}' is not found in the tool name dictionary. please find them in 【{names_for_model_str}】"
                    logger.error(
                        f"Error: The action '{action}' is not found in the tool name dictionary. please find them in {names_for_model_str}")
            else:
                agent_final_text += output
                break
        yield DONE
        agent_final_answer = self.final_result(agent_final_text)
        if not agent_final_answer:  # 检查 final_answer 是否为空值，包括 None、空字符串或其他可Falsy对象
            agent_final_answer = agent_final_text
        self.result = (agent_final_text, agent_final_answer, planning_prompt)
        return

    def get_dataset_names(self, datasets):
        names = [dataset['dataset_name'] for dataset in datasets]
        return ', '.join(names)

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
        tools_name_text = ', '.join(
            [plugin_info["name_for_model"] for plugin_info in list_of_plugin_info])

        im_start = '<|im_start|>'
        im_end = '<|im_end|>'
        retrieval_information = ''
        if(self.datasets):
            local_datasets = self.get_dataset_names(self.datasets)
            retrieval_information = '\n' + \
                RETRIEVAL_ARGUMRNTED.format(
                    local_datasets=local_datasets) + '\n'
        prompt = f'{im_start}system\n{system_instruction}{retrieval_information}{im_end}'
        for i, (query, response) in enumerate(chat_history):
            if list_of_plugin_info:
                if (len(chat_history) == 1) or (i == len(chat_history) - 2):
                    query = PROMPT_REACT.format(
                        tools_text=tools_text,
                        tools_name_text=tools_name_text,
                        query=query,
                    )
            query = query.lstrip('\n').rstrip()
            response = response.lstrip('\n').rstrip()
            prompt += f"\n{im_start}user\n{query}{im_end}"
            prompt += f"\n{im_start}assistant\n{response}{im_end}"

        assert prompt.endswith(f"\n{im_start}assistant\n{im_end}")
        prompt = prompt[: -len(f'{im_end}')]
        return prompt
    def text_completion(self, input_text: str, **kwargs) -> str:
        """获取大模型的回答"""
        created = kwargs['created']
        uid = kwargs['uid']
        model = kwargs['model']
        need_react = kwargs['need_react']
        stop_words = kwargs['stop_words'].split(',')
        im_end = '<|im_end|>'
        if im_end not in stop_words:
            stop_words = stop_words + [im_end]
        messages = []
        messages.append({
            "role": "user",
            "content": input_text
        })
        headers = {
            "Authorization": f"Bearer {kwargs['token']}",
            "Content-Type": "application/json"
        }
        know_anwser = False
        answer = [""]
        output = ''
        reveal_all = ''
        usage = {}
        try:
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
                # "frequency_penalty": kwargs['frequency_penalty'],
                "logit_bias":  {},
                "stream_options": {
                    "include_usage": True
                }
            },ensure_ascii=False)
            logger.info(f"{YELLOW}request options:{request_data}{RESET}")
            resp = requests.post(kwargs['url'], headers=headers, stream=True,
                                data=request_data, timeout=kwargs['timeout'])
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
            for line in resp.iter_lines():
                if line:
                    line = codecs.decode(line)
                    if line.startswith("data:"):
                        line = line[5:].strip()
                        try:
                            chunk = json.loads(line)
                            usage = chunk.get('usage', {})
                            chunk["id"] = uid
                            chunk["created"] = created
                            chunk["model"] = model
                            chunk["session_id"] = self.business.get(
                                'session_id', None)
                            reveal_all = chunk
                            if "choices" in chunk and len(
                                    chunk["choices"]) > 0 and "delta" in chunk["choices"][0] and "content" in chunk["choices"][0]["delta"]:
                                content = chunk["choices"][0]["delta"]["content"]
                                if(content != None):
                                    answer[chunk["choices"][0]["index"]
                                        ] += content
                                if need_react == True:
                                    if(know_anwser):
                                        yield json.dumps(chunk)
                                    final_content = self.final_result(  # 从每次结果中查找最终答案
                                        answer[chunk["choices"][0]["index"]])
                                    use_action = self.check_action_tool(answer[0])
                                    # 如果找到带有 “Final Answer”标识，并且没有Action存在的情况下，代表结束
                                    if(know_anwser == False and final_content != '' and use_action != True):
                                        chunk["choices"][0]["delta"]["content"] = final_content
                                        yield json.dumps(chunk)
                                        know_anwser = True
                                else:
                                    yield json.dumps(chunk)
                            # 如果检测到chunk 中包含usage ，不为None ， 则输出
                            else:
                                if 'usage' in chunk and chunk['usage'] is not None:
                                    yield json.dumps(chunk)
                        except json.JSONDecodeError as err:
                            logger.info(f"{YELLOW}Unconverted chunk {line}{RESET}")

            self.usage = (
                self.usage[0] + usage.get("prompt_tokens", 0),
                self.usage[1] + usage.get("completion_tokens", 0),
                self.usage[2] + usage.get("total_tokens", 0),
            )
            output = answer[0]
            action, action_input, output_inner = self.parse_latest_plugin_call(
                output)
            if(action == '' and know_anwser == False and reveal_all != ''):  # 无法触发 Final Answer 但又确实推理出结果的时候
                if reveal_all["choices"] != None:
                    if len(reveal_all["choices"]) == 0:
                        reveal_all["choices"].append({"delta": {"content": ""}})
                    reveal_all["choices"][0]["delta"]["content"] = output_inner
                    yield json.dumps(reveal_all)
            return output
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
            return output

    def parse_latest_plugin_call(self, text):
        plugin_name, plugin_args = '', ''
        i = text.rfind('\nAction:')
        j = text.rfind('\nAction Input:')
        k = text.rfind('\nObservation:')
        if 0 <= i < j:
            if k < j:
                text = text.rstrip() + '\nObservation:'
            k = text.rfind('\nObservation:')
            plugin_name = text[i + len('\nAction:'): j].strip()
            plugin_args = text[j + len('\nAction Input:'): k].strip()
            text = text[:k]
        return plugin_name, plugin_args, text

    def call_plugin(self, plugin_name: str, plugin_args: str) -> str:
        plugin_args = self.extract_json_content(plugin_args)
        if(plugin_name == 'data_retrieval'):
            plugin_args = json.loads(plugin_args)
            user_question = plugin_args["user_question"]
            return data_retrieval(user_question, self.assistant)
        else:
            try:
                tools_client = ToolsActionClient(self.credential_dict)
                invoke_result = tools_client.invoke(plugin_name, plugin_args)
                invoke_result = invoke_result['body'].decode('utf-8')
                return invoke_result
            except Exception as e:
                logger.error(e)
                return ''

    def call_assistant_stream(self):
        self.time = time()
        text_input = self.query
        action_tools = []
        assistant = self.assistant
        model = self.model
        try:
            action_tools = assistant_action_tools_database.list_action_tools_by_assistant_id(
                assistant.id)
            action_tools = [
                {
                    'name_for_human': item.alias,
                    'name_for_model': item.name,
                    'description_for_model': item.description,
                    'parameters': item.input_schema,
                    'output': item.output_schema,
                    'need_llm_call': item.need_llm_call
                }
                for item in action_tools
            ]
            if(self.datasets):
                action_tools.append({
                    'name_for_human': '本地数据集搜索',
                    'name_for_model': 'data_retrieval',
                    'description_for_model': '搜索本地数据集.经常在联网的搜索工具使用之前使用',
                    'parameters': "[ { 'name': 'user_question', 'description': 'The extracted user questions should be prioritized in vector retrieval.', 'required': True, 'schema': {'type': 'string'}, } ]",
                    'output': '',
                    'need_llm_call': True
                })
        except Exception as e:
            logger.error(e)
        self.tool_name_dict = {
            tool['name_for_model']: {'name': tool['name_for_human'], 'output': tool['output'], 'need_llm_call': tool['need_llm_call']} for tool in action_tools}
        
        llm_plugin_args = {
            "created": int(time()),
            "uid": f"assistant-compl-{uuid.uuid4()}",
            "temperature": assistant.temperature,
            "top_p": assistant.top_p,
            "n": assistant.n_sequences,
            "max_tokens": assistant.max_tokens,
            "stop_words": assistant.stop if assistant.stop else 'Observation:, Observation:\n',
            "presence_penalty": assistant.presence_penalty,
            # "frequency_penalty": assistant.frequency_penalty,
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
