"""Chat Service"""
import os
import json
import requests
import codecs
from time import time
import re
import uuid
from app.common.logger import logger
import app.database.assistant_action_tools as assistant_action_tools_database
from app.reasoning.retrieval import data_retrieval, llm_retrieval_instruction_stream
from app.common.logger import logger
from app.reasoning.tools_client import ToolsActionClient
from app.common.constants import  YELLOW, RESET, RED, CYAN
DONE = "[DONE]"
DEFAULT_INSTRUCTION = "You are a helpful assistant."

RETRIEVAL_ARGUMRNTED = """已知【{local_datasets}】是本地的知识库数据集，当你没有问题的答案或者被提问{local_datasets}相关问题的时候可以使用[data_retrieval]这个API工具"""


def correct_json_string(illegal_json_str):
    corrected_json_str = illegal_json_str.replace("'", '"')
    corrected_json_str = corrected_json_str.replace('True', 'true')
    corrected_json_str = corrected_json_str.replace('False', 'false')
    corrected_json_str = re.sub(r'(\w+):', r'"\1":', corrected_json_str)
    corrected_json_str = re.sub(r',\s*}', '}', corrected_json_str)
    try:
        json_obj = json.loads(corrected_json_str)
        return json.dumps(json_obj, ensure_ascii=False, indent=4)  # 返回格式化的 JSON 字符串
    except json.JSONDecodeError as e:
        logger.error(f"Failed to decode JSON: {e}")
        return corrected_json_str  # 如果解析失败，返回修复后的字符串

def convert_input_schema_to_function_params(data_str):
    data_str = correct_json_string(data_str)
    parsed_data = json.loads(data_str)
    data = {
        "parameters": {
            "type": "object",
            "properties": {},
            "required": []
        }
    }
    for item in parsed_data:
        name = item.get('name')
        description = item.get('description')
        required = item.get('required', False)
        schema_type = item.get('schema', {}).get('type')
        data["parameters"]["properties"][name] = {
            "type": schema_type,
            "description": description
        }
        if required:
            data["parameters"]["required"].append(name)
    return data["parameters"]

class ReasoningStreamFc:
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


    def final_result(self, resp_data: str):
        return self.extract_final_answer(resp_data)

    def wrapperUiRenderdPreview(self, title, content):
        return f"""<ChatUIPreview title='{title}' component='{content}' />"""

    def extract_json_content(self, text):
        start_index = text.find('{')
        end_index = text.rfind('}')
        if start_index != -1 and end_index != -1:
            json_content = text[start_index:end_index+1]
            try:
                # 尝试解析JSON
                json.loads(json_content)
                return json_content
            except json.JSONDecodeError as e:
                # 如果解析失败，尝试修复JSON
                logger.error(f"Failed to decode JSON: {e}")
                fixed_json_content = json_content
                logger.info(f"Fixed JSON: {fixed_json_content}")
                try:
                    json.loads(fixed_json_content)
                    return fixed_json_content
                except json.JSONDecodeError as e:
                    print(f"Failed to decode fixed JSON: {e}")
                    return '{}'
        elif start_index != -1:
            # 如果找到了开始的 '{' 但没有找到结束的 '}'
            json_content = text[start_index:]
            if not json_content.endswith('"}'):
                json_content += '"}'
            try:
                json.loads(json_content)
                return json_content
            except json.JSONDecodeError as e:
                logger.error(f"Failed to decode JSON after appending '': {e}")
                return json_content
        else:
            return '{}'

    def llm_with_plugin(self, prompt: str, **kwargs):
        reasoning_log = '' # 推理过程
        final_answer = '' # 最终答案
        need_function_call = True  # 是否需要调用工具
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

        input_messages = self.build_input_messages(
            chat_history)
        messages = [{
            "role": "system",
            "content": kwargs['instruction']
        }]
        messages.extend(input_messages)

        # 进行第一次的调用
        answer, llm_outputs = yield from self.text_completion(
                messages, **kwargs)
        final_answer += answer
        # 提出chunk的首次输出
        assistant_output = llm_outputs[0]['choices'][0]['delta'] 
        if  assistant_output['content'] is None:
            assistant_output['content'] = ""
        messages.append(assistant_output)
        try:
            if assistant_output['tool_calls'] == None:  # 如果模型判断无需调用工具，则将assistant的回复直接打印出来，无需进行模型的第二轮调用
                need_function_call = False
        except KeyError:
            need_function_call = False
        if(need_function_call == True):
            try:
                while assistant_output['tool_calls'] != None:
                    action =  assistant_output['tool_calls'][0]['function']['name']
                    action_input = assistant_output['tool_calls'][0]['function']['arguments']
                    logger.info(f'Action: {action}')
                    logger.info(f'Action Input: {action_input}')
                    reasoning_log += f'Action: {action} Action Input: {action_input}\n'
                    tool_info = {"name": action, "role":"tool"}
                    plugin_output = self.call_plugin(action, action_input)
                    logger.info(f'{CYAN}Tool Output: {plugin_output}{RESET}')
                    reasoning_log += f'Tool Output: {plugin_output}\n'
                    tool_detail = self.tool_name_dict[action]
                    tool_name = tool_detail['name']
                    need_llm_call = tool_detail['need_llm_call']
                    if need_llm_call == 2: # 如果工具设置为直接返回
                        final_result_preview = self.wrapperUiRenderdPreview(tool_name, plugin_output)
                        output_chunk = llm_outputs[0]
                        output_chunk['choices'][0]['delta']['content'] = final_result_preview 
                        assistant_output = llm_outputs[0]['choices'][0]['delta']
                        yield json.dumps(output_chunk)
                        tool_info['content'] = plugin_output
                        #将工具返回的结果进行上下文的拼接
                        messages.append(tool_info)
                        answer, llm_outputs = yield from self.text_completion(
                            messages, **kwargs)
                        logger.info(f"{YELLOW}Answer: {answer}{RESET}")
                        break
                    tool_info['content'] = plugin_output
                    #将工具返回的结果进行上下文的拼接
                    messages.append(tool_info)
                    answer, llm_outputs = yield from self.text_completion(
                        messages, **kwargs)
                    final_answer += answer
                    assistant_output = llm_outputs[0]['choices'][0]['delta']
                    if  assistant_output['content'] is None:
                        assistant_output['content'] = ""
                    messages.append(assistant_output)
            except KeyError:
                pass
        input_messages = self.get_input_content_from_messages(messages)
        self.result = (reasoning_log, final_answer, input_messages)
        yield DONE
        return

    def get_dataset_names(self, datasets):
        names = [dataset['dataset_name'] for dataset in datasets]
        return ', '.join(names)

    def get_input_content_from_messages(self,messages) -> str:
        input_messages = ""
        for message in messages:
            input_messages += f"{message['role']}\n:{message['content']}"
        return input_messages
    def build_input_messages(self, chat_history) -> str:
        messages = []
        for (query, response) in chat_history:
            query = query.lstrip('\n').rstrip()
            response = response.lstrip('\n').rstrip()
            if query != '':
                messages.append({"role": "user", "content": query})
            if response != '':
                messages.append({"role": "assistant", "content": response})
        return messages

    def text_completion(self, messages, **kwargs) -> str:
        """获取大模型的回答"""
        created = kwargs['created']
        uid = kwargs['uid']
        model = kwargs['model']
        tool_call = True
        answer = ""
        llm_outputs = []
        usage = {}
        tool_use = [{"name":"","arguments":""}]
        headers = {
            "Authorization": f"Bearer {kwargs['token']}",
            "Content-Type": "application/json"
        }
        try:
            llm_request_options = {
                "model": kwargs['model'],
                "messages": messages,
                "temperature": kwargs['temperature'],
                "top_p": kwargs['top_p'],
                "n": kwargs['n'],
                "stream": True,
                "max_tokens": kwargs['max_tokens'],
                "presence_penalty": kwargs['presence_penalty'],
                # "frequency_penalty": kwargs['frequency_penalty'],
                "logit_bias":  {},
                "stream_options": {
                    "include_usage": True
                }
            }
            if(len(kwargs['tools'])>0):
                llm_request_options["tools"] = kwargs['tools']
            else:
                tool_call = False
            request_data = json.dumps(llm_request_options)
            request_data_for_log = json.dumps(llm_request_options,ensure_ascii=False)
            logger.info(f"{YELLOW}Request Data:{request_data_for_log}{RESET}")
            resp = requests.post(kwargs['url'], headers=headers, stream=True,
                                data=request_data, timeout=kwargs['timeout'])
            for index, line in enumerate(resp.iter_lines()):
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
                            # logger.info(f"{RED}chunk:{chunk}{RESET}")
                            assistant_output = chunk['choices'][0]['delta']
                            if(index == 0):
                                try:
                                    # 使用 get 方法避免 KeyError
                                    tool_calls = assistant_output.get('tool_calls', [])
                                    if not tool_calls:  # 如果模型判断无需调用工具，则将assistant的回复直接打印出来，无需进行模型的第二轮调用
                                        tool_call = False
                                except KeyError:
                                    tool_call = False
                            if "choices" in chunk and len(
                                    chunk["choices"]) > 0 and "delta" in chunk["choices"][0] and "content" in chunk["choices"][0]["delta"]:
                                llm_outputs.append(chunk)
                                content = chunk["choices"][0]["delta"]["content"]
                                if content is not None:
                                    answer += content
                                if(tool_call == False):
                                    yield json.dumps(chunk)
                                else:
                                    # 调用工具的返回，除了最后一个useage结果是'', 其余的content皆为None
                                    if(content == None):
                                        tool_calls = assistant_output.get('tool_calls', [])
                                        logger.info(f"{YELLOW}Tool Use: {chunk}{RESET}")
                                        function_name = tool_calls[0].get('function', {}).get('name', '')
                                        function_arguments = tool_calls[0].get('function', {}).get('arguments', '')
                                        tool_use[0]["name"] += function_name
                                        tool_use[0]["arguments"] += function_arguments
                                        # tool_use[0]["name"]+=chunk["choices"][0]["delta"]["tool_calls"][0]["function"]["name"]
                                        # tool_use[0]["arguments"]+=chunk["choices"][0]["delta"]["tool_calls"][0]["function"]["arguments"]
                            else:
                                if 'usage' in chunk and chunk['usage'] is not None:
                                    yield json.dumps(chunk)
                        except Exception as err:
                            logger.error(f"{RED}Unexpected error:{err} , original chunk line is: {line}{RESET}")
                            # logger.info(f"{YELLOW}Unconverted chunk {line}{RESET}")
            
            self.usage = (
                self.usage[0] + usage.get("prompt_tokens", 0),
                self.usage[1] + usage.get("completion_tokens", 0),
                self.usage[2] + usage.get("total_tokens", 0),
            )
            if(tool_call == True and llm_outputs[0] != None):
                llm_outputs[0]['choices'][0]['delta']['tool_calls'][0]['function']['name']=tool_use[0]["name"]
                llm_outputs[0]['choices'][0]['delta']['tool_calls'][0]['function']['arguments']=tool_use[0]["arguments"]
            return answer,llm_outputs
        except Exception as e:
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
                return answer,llm_outputs


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
        action_tools_function_call = []
        assistant = self.assistant
        model = self.model
        try:
            action_tools = assistant_action_tools_database.list_action_tools_by_assistant_id(
                assistant.id)
            action_tools_function_call = [
                {
                    'type': 'function',
                    'function': {
                        'name': item.name,
                        'description': f"{item.name},{item.description}",
                        'parameters': convert_input_schema_to_function_params(item.input_schema)
                    }
                }
                for item in action_tools
            ]
            # logger.info(f'Action Tools: {action_tools}')
            if(self.datasets):
                action_tools.append({
                    'type': 'function',
                    'function': {
                        'name': 'data_retrieval',
                        'description': '搜索本地数据集.经常在联网的搜索工具使用之前使用',
                        'parameters': {
                            'type': 'object',
                            'properties': {
                                'user_question': {
                                    'type': 'string',
                                    'description': 'The extracted user questions should be prioritized in vector retrieval'
                                }
                            }
                        },
                        'required': ['user_question']
                    }
                })
        except Exception as e:
            logger.error(e)
        self.tool_name_dict = {
            tool.name: {'name': tool.alias, 'output': tool.output_schema, 'need_llm_call': tool.need_llm_call} for tool in action_tools}
        llm_token = model.token if model.token else os.environ.get("DASHSCOPE_API_KEY", "")
        llm_plugin_args = {
            "created": int(time()),
            "uid": f"assistant-compl-{uuid.uuid4()}",
            "temperature": assistant.temperature,
            "top_p": assistant.top_p,
            "n": assistant.n_sequences,
            "max_tokens": assistant.max_tokens,
            "presence_penalty": assistant.presence_penalty,
            # "frequency_penalty": assistant.frequency_penalty,
            "logit_bias": assistant.logit_bias,
            "model_id": model.id if model else None,
            "token": llm_token,
            "timeout": model.timeout if model else None,
            "model": model.name,
            "instruction": assistant.instruction if assistant.instruction else DEFAULT_INSTRUCTION,
            "model_name": model.name_alias if model else None,
            "url": model.url if model else None,
            "tools": action_tools_function_call
        }
        yield from self.llm_with_plugin(
            prompt=text_input,  **llm_plugin_args)

        return
