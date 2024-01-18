"""Chat Service"""

import json
import requests
from time import time
import re

import uuid
import app.database.model as model_database

import app.database.assistant as assistant_database
import app.database.assistant_dataset as assistant_dataset_database
import app.database.assistant_action_tools as assistant_action_tools_database
# import app.database.redis as redis

from app.common.logger import logger
from app.reasoning.retrieval import data_retrieval, llm_retrieval_instruction
from app.reasoning.tools_client import ToolsActionClient

DONE = "[DONE]"
DEFAULT_INSTRUCTION = "You are a helpful assistant."

RETRIEVAL_ARGUMRNTED = """已知【{local_datasets}】是本地的知识库数据集，当你没有问题的答案或者被提问{local_datasets}相关问题的时候可以使用[data_retrieval]这个API工具"""

TOOL_DESC = """{name_for_model}: Call this tool to interact with the {name_for_human} API. What is the {name_for_human} API useful for? {description_for_model} Parameters: {parameters}"""

PROMPT_REACT = """Answer the following questions as best you can. You have access to the following APIs:

{tools_text}

We must pay attention to only making practical discussions on the results of calling the tool. If it is, it means it is there, and if it is not, it is not. Do not make excessive interpretations.

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


class Reasoning:
    def __init__(self, query, assistant, datasets, credential_dict):
        self.assistant = assistant
        self.query = query
        self.credential_dict = credential_dict
        self.datasets = datasets
        self.tool_name_dict = {}

    def final_result(self, resp_data: str):
        match = re.search(r'Final Answer: (.+)', resp_data)
        if match:
            final_answer = match.group(1)
            return final_answer
        else:
            return ''
        
    def extract_json_content(self, text):
        start_index = text.find('{')
        end_index = text.rfind('}')
        if start_index != -1 and end_index != -1:
            json_content = text[start_index:end_index+1]
            return json_content
        else:
            return '{}'
        
    def generator_text_completion(self, input_text: str, **kwargs):
        result = self.text_completion(
            input_text, **kwargs)
        return result

    def llm_with_plugin(self, prompt: str, list_of_plugin_info=(), **kwargs):
        created = kwargs['created']
        uid = kwargs['uid']
        model = kwargs['model']
        history = []
        chat_history = [(x['user'], x['bot'])
                        for x in history] + [(prompt, '')]

        planning_prompt = self.build_input_text(
            chat_history, list_of_plugin_info, kwargs['instruction'])
        logger.info(f"the planning_prompt is:\n {planning_prompt}")
        kwargs['need_react'] = True if len(list_of_plugin_info) > 0 else False #补充
        text = ''
        while True:
            output = self.text_completion(
                planning_prompt + text, **kwargs)
            action, action_input, output = self.parse_latest_plugin_call(
                output)
            if action: 
                logger.info(f"调用工具【{self.tool_name_dict[action]}】 \n'")
                observation = self.call_plugin(action, action_input)
                output += f'\nObservation: {observation}\nThought:'

                logger.info(f"{action}工具调用结果：{observation}")

                text += output
                if(action == 'data_retrieval'):  # 知识库召回特殊处理
                    plugin_args = json.loads(action_input)
                    user_question = plugin_args["user_question"]
                    kwargs['retrieval_prompt_template'] = self.assistant.retrieval_prompt_template
                    text = 'Final Answer:' + llm_retrieval_instruction(user_question, observation, **kwargs)
                    break
            else: 
                text += output
                break

        new_history = []
        new_history.extend(history)
        new_history.append({'user': prompt, 'bot': text})
        content = self.final_result(text) if kwargs['need_react'] == True else text
        resp_data = {}
        resp_data["id"] = uid
        resp_data["created"] = created
        resp_data["choices"] = [{
            "index": 0,
            "message": {"role": "assistant", "content": content},
            "finish_reason": 'null'
        }]
        resp_data["object"] = "chat.completion"
        resp_data["model"] = model
        return resp_data
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
            retrieval_information = '\n' + RETRIEVAL_ARGUMRNTED.format(local_datasets=local_datasets) +'\n'
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
        prompt = prompt[: -len(f'{im_end}')]
        return prompt

    def text_completion(self, input_text: str, **kwargs) -> str:  # 作为一个文本续写模型来使用
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

        output = answer[0]
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
        plugin_args = self.extract_json_content(plugin_args)
        if(plugin_name == 'data_retrieval'):
            plugin_args = json.loads(plugin_args)
            user_question = plugin_args["user_question"]
            return data_retrieval(user_question, self.assistant)
        else:
            try:
                tools_client = ToolsActionClient(self.credential_dict)
                invoke_result = tools_client.invoke(plugin_name, plugin_args)
                return invoke_result['body']
            except Exception as e:
                logger.error(e)
                return ''

    def call_assistant(self):
        self.time = time()
        text_input = self.query
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
            if(self.datasets):
                action_tools.append({
                    'name_for_human': 'local search',
                    'name_for_model': 'data_retrieval',
                    'description_for_model': 'For information that has been stored locally, local search (data_retrieval) is a more effective knowledge search tool.',
                    'parameters': "[ { 'name': 'user_question', 'description': 'User input issues', 'required': True, 'schema': {'type': 'string'}, } ]",
                })
        except Exception as e:
            logger.error(e)

        self.tool_name_dict = {tool['name_for_model']: tool['name_for_human'] for tool in action_tools}

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

        logger.info(f"LLM Plugin Args: {llm_plugin_args}")

        return self.llm_with_plugin(
            prompt=text_input, list_of_plugin_info=action_tools, **llm_plugin_args)
