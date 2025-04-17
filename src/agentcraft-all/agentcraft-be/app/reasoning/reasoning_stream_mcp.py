"""Chat Service"""

import asyncio
from contextlib import AsyncExitStack
import os
import json
from typing import Optional
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
from app.common.constants import YELLOW, RESET, RED, CYAN

from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client
from mcp.client.sse import sse_client


DONE = "[DONE]"
DEFAULT_INSTRUCTION = "You are a helpful assistant."

RETRIEVAL_ARGUMRNTED = """已知【{local_datasets}】是本地的知识库数据集，当你没有问题的答案或者被提问{local_datasets}相关问题的时候可以使用[data_retrieval]这个API工具"""


def correct_json_string(illegal_json_str):
    corrected_json_str = illegal_json_str.replace("'", '"')
    corrected_json_str = corrected_json_str.replace("True", "true")
    corrected_json_str = corrected_json_str.replace("False", "false")
    corrected_json_str = re.sub(r"(\w+):", r'"\1":', corrected_json_str)
    corrected_json_str = re.sub(r",\s*}", "}", corrected_json_str)
    try:
        json_obj = json.loads(corrected_json_str)
        return json.dumps(
            json_obj, ensure_ascii=False, indent=4
        )  # 返回格式化的 JSON 字符串
    except json.JSONDecodeError as e:
        logger.error(f"Failed to decode JSON: {e}")
        return corrected_json_str  # 如果解析失败，返回修复后的字符串


def convert_input_schema_to_function_params(data_str):
    data_str = correct_json_string(data_str)
    parsed_data = json.loads(data_str)
    data = {"parameters": {"type": "object", "properties": {}, "required": []}}
    for item in parsed_data:
        name = item.get("name")
        description = item.get("description")
        required = item.get("required", False)
        schema_type = item.get("schema", {}).get("type")
        data["parameters"]["properties"][name] = {
            "type": schema_type,
            "description": description,
        }
        if required:
            data["parameters"]["required"].append(name)
    return data["parameters"]


class ReasoningStreamMcp:
    def __init__(
        self, query, assistant, model, datasets, credential_dict, history, **business
    ):
        self.assistant = assistant
        self.query = query
        self.datasets = datasets
        self.credential_dict = credential_dict
        self.time = time()
        self.tool_name_dict = {}
        self.mcp_tools = []
        self.mcp_session = None
        self.mcp_tool_result = None
        self.history = history
        self.model = model
        self.result = None
        self.business = business
        self.usage = (0, 0, 0)
        self.answer = ""
        self.llm_output = []
        self.session: Optional[ClientSession] = None
        self.exit_stack = AsyncExitStack()

    async def connect_to_server(self):
        """Connect to an MCP server
        Args:
        server_script_path: Path to the server script (.py or .js)
        """

        if not self.assistant.mcp_server:
            return
        async with sse_client(
            self.assistant.mcp_server, {"Accept": "text/event-stream"}, 60 * 5, 60 * 5
        ) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()
                response = await session.list_tools()
                self.mcp_tools = response.tools
                self.mcp_session = session
                logger.info(f"{CYAN}\nConnected to server with tools: {[tool.name for tool in response.tools]}{RESET}")
    def final_result(self, resp_data: str):
        return self.extract_final_answer(resp_data)

    def wrapperUiRenderdPreview(self, title, content):
        return f"""<ChatUIPreview title='{title}' component='{content}' />"""

    def extract_json_content(self, text):
        start_index = text.find("{")
        end_index = text.rfind("}")
        if start_index != -1 and end_index != -1:
            json_content = text[start_index : end_index + 1]
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
                    logger.error(f"Failed to decode fixed JSON: {e}")
                    return "{}"
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
            return "{}"

    def get_dataset_names(self, datasets):
        names = [dataset["dataset_name"] for dataset in datasets]
        return ", ".join(names)

    def get_input_content_from_messages(self, messages) -> str:
        input_messages = ""
        for message in messages:
            input_messages += f"{message['role']}\n:{message['content']}"
        return input_messages

    def build_input_messages(self, chat_history) -> str:
        messages = []
        for query, response in chat_history:
            query = query.lstrip("\n").rstrip()
            response = response.lstrip("\n").rstrip()
            if query != "":
                messages.append({"role": "user", "content": query})
            if response != "":
                messages.append({"role": "assistant", "content": response})
        return messages

    async def text_completion(self, messages, **kwargs) -> str:
        """获取大模型的回答"""
        created = kwargs["created"]
        uid = kwargs["uid"]
        model = kwargs["model"]
        tool_call = True
        answer = ""
        llm_outputs = []
        usage = {}
        tool_use = [{"name": "", "arguments": ""}]
        headers = {
            "Authorization": f"Bearer {kwargs['token']}",
            "Content-Type": "application/json",
        }
        try:
            # messages.append({"role": "user", "content": "请确保输出内容足够的详细，请确保按照系统提示词的结构进行输出"})
            llm_request_options = {
                "model": kwargs["model"],
                "messages": messages,
                "temperature": kwargs["temperature"],
                "top_p": kwargs["top_p"],
                "n": kwargs["n"],
                "stream": True,
                "max_tokens": kwargs["max_tokens"],
                "presence_penalty": kwargs["presence_penalty"],
                # "frequency_penalty": kwargs['frequency_penalty'],
                "logit_bias": {},
                "stream_options": {"include_usage": True},
            }
            if len(kwargs["tools"]) > 0:
                llm_request_options["tools"] = kwargs["tools"]
            else:
                tool_call = False
            request_data = json.dumps(llm_request_options)
            request_data_for_log = json.dumps(llm_request_options, ensure_ascii=False)
            logger.info(f"{YELLOW}Request Data:{request_data_for_log}{RESET}")
            resp = requests.post(
                kwargs["url"],
                headers=headers,
                stream=True,
                data=request_data,
                timeout=kwargs["timeout"],
            )
            for index, line in enumerate(resp.iter_lines()):
                if line:
                    line = codecs.decode(line)
                  
                    if line.startswith("data:") and line != "data: [DONE]":
                        line = line[5:].strip()
                        try:
                            chunk = json.loads(line)
                            yield json.dumps(chunk)
                            usage = chunk.get("usage", {})
                            chunk["id"] = uid
                            chunk["created"] = created
                            chunk["model"] = model
                            chunk["session_id"] = self.business.get("session_id", None)
                            if (
                                len(chunk["choices"]) > 0
                                and "delta" in chunk["choices"][0]
                            ):
                                assistant_output = chunk["choices"][0]["delta"]
                            if index == 0:
                                try:
                                    # 使用 get 方法避免 KeyError
                                    tool_calls = assistant_output.get("tool_calls", [])
                                    if (
                                        not tool_calls
                                    ):  # 如果模型判断无需调用工具，则将assistant的回复直接打印出来，无需进行模型的第二轮调用
                                        tool_call = False
                                except KeyError:
                                    tool_call = False
                            if (
                                "choices" in chunk
                                and len(chunk["choices"]) > 0
                                and "delta" in chunk["choices"][0]
                                and "content" in chunk["choices"][0]["delta"]
                            ):
                                llm_outputs.append(chunk)
                                content = chunk["choices"][0]["delta"]["content"]
                                if content is not None:
                                    answer += content
                                if tool_call == False:
                                    pass
                                    # yield json.dumps(chunk)
                                else:
                                    # yield json.dumps(chunk)
                                    # 调用工具的返回，除了最后一个useage结果是'', 其余的content皆为None
                                    if content == None:
                                        tool_calls = assistant_output.get(
                                            "tool_calls", []
                                        )
                                        function_name = (
                                            tool_calls[0]
                                            .get("function", {})
                                            .get("name", "")
                                        )
                                        function_arguments = (
                                            tool_calls[0]
                                            .get("function", {})
                                            .get("arguments", "")
                                        )
                                        tool_use[0]["name"] += function_name
                                        tool_use[0]["arguments"] += function_arguments
                                        # tool_use[0]["name"]+=chunk["choices"][0]["delta"]["tool_calls"][0]["function"]["name"]
                                        # tool_use[0]["arguments"]+=chunk["choices"][0]["delta"]["tool_calls"][0]["function"]["arguments"]
                            else:
                                if "usage" in chunk and chunk["usage"] is not None:
                                    pass
                                    # yield json.dumps(chunk)
                        except Exception as err:
                            logger.error(
                                f"{RED}Unexpected error:{err} , original chunk line is: {line}{RESET}"
                            )
                            # logger.info(f"{YELLOW}Unconverted chunk {line}{RESET}")
            self.usage = (
                self.usage[0] + usage.get("prompt_tokens", 0),
                self.usage[1] + usage.get("completion_tokens", 0),
                self.usage[2] + usage.get("total_tokens", 0),
            )
            if tool_call == True and len(llm_outputs) > 0 and llm_outputs[0] != None:
                logger.info(f"{YELLOW}Tool Use: {tool_use}{RESET}")
                llm_outputs[0]["choices"][0]["delta"]["tool_calls"][0]["function"][
                    "name"
                ] = tool_use[0]["name"]
                llm_outputs[0]["choices"][0]["delta"]["tool_calls"][0]["function"][
                    "arguments"
                ] = tool_use[0]["arguments"]
            # return answer, llm_outputs
        except Exception as e:
            logger.error(
                f"{RED}Unexpected error in model_chat_stream: {e}{RESET}", exc_info=True
            )
            yield json.dumps(
                {
                    "id": uid,
                    "object": "chat.error",
                    "message": [
                        {"content": f"An error occurred: {str(e)}", "role": "assistant"}
                    ],
                    "created": created,
                }
            )
            yield DONE
            # return answer, llm_outputs

    async def call_plugin(self, plugin_name: str, plugin_args: str) -> str:
        plugin_args = self.extract_json_content(plugin_args)
        if plugin_name == "data_retrieval":
            plugin_args = json.loads(plugin_args)
            user_question = plugin_args["user_question"]
            return data_retrieval(user_question, self.assistant)
        elif any(tool.name == plugin_name for tool in self.mcp_tools):
            plugin_args = json.loads(plugin_args)
            logger.info(f"{CYAN}\nStart to call mcp tool: {plugin_name} {plugin_args} {RESET}")
            try:
                # TODO: 后续优化为将 sse_client 全局持久化，先暂时按重新创建链接的方式解决
                async with sse_client(
                    self.assistant.mcp_server, {"Accept": "text/event-stream"}, 9999
                ) as (read, write):
                    async with ClientSession(read, write) as session:
                        await session.initialize()
                        result = await session.call_tool(
                            plugin_name, arguments=plugin_args
                        )
                        self.mcp_tool_result = result
                        return result.content[0].text
            except Exception as e:
                logger.error(e)
                return ""
        else:
            try:
                tools_client = ToolsActionClient(self.credential_dict)
                invoke_result = tools_client.invoke(plugin_name, plugin_args)
                invoke_result = invoke_result["body"].decode("utf-8")
                return invoke_result
            except Exception as e:
                logger.error(e)
                return ""

    def handleChunkResult(self, chunk, tool_call_id):
        content = ""
        name = ""
        argument = ""
        if (
            "choices" in chunk
            and len(chunk["choices"]) > 0
            and "delta" in chunk["choices"][0]
            and "content" in chunk["choices"][0]["delta"]
        ):
            content += chunk["choices"][0]["delta"]["content"] or ""
        if (
            "choices" in chunk
            and len(chunk["choices"]) > 0
            and "delta" in chunk["choices"][0]
            and "tool_calls" in chunk["choices"][0]["delta"]
            and len(chunk["choices"][0]["delta"]["tool_calls"]) > 0
        ):
            # 当前仅处理一个工具调用 tool_calls[0]
            if "name" in chunk["choices"][0]["delta"]["tool_calls"][0]["function"]:
                name += (
                    chunk["choices"][0]["delta"]["tool_calls"][0]["function"]["name"]
                    or ""
                )
            if "arguments" in chunk["choices"][0]["delta"]["tool_calls"][0]["function"]:
                argument += (
                    chunk["choices"][0]["delta"]["tool_calls"][0]["function"][
                        "arguments"
                    ]
                    or ""
                )
            if "id" in chunk["choices"][0]["delta"]["tool_calls"][0]:
                tool_call_id = chunk["choices"][0]["delta"]["tool_calls"][0]["id"]
        return content, name, argument, tool_call_id

    async def call_assistant_stream(self):
        self.time = time()
        text_input = self.query
        action_tools = []
        action_tools_function_call = []
        tools_function_call = []
        assistant = self.assistant
        model = self.model
        await self.connect_to_server()
        try:
            action_tools = (
                assistant_action_tools_database.list_action_tools_by_assistant_id(
                    assistant.id
                )
            )
            mcp_tools_function_call = [
                {
                    "type": "function",
                    "function": {
                        "name": item.name,
                        "description": f"{item.name},{item.description}",
                        "parameters": item.inputSchema,
                    },
                }
                for item in self.mcp_tools
            ]
            action_tools_function_call = [
                {
                    "type": "function",
                    "function": {
                        "name": item.name,
                        "description": f"{item.name},{item.description}",
                        "parameters": convert_input_schema_to_function_params(
                            item.input_schema
                        ),
                    },
                }
                for item in action_tools
            ]
            tools_function_call = [
                *action_tools_function_call,
                *mcp_tools_function_call,
            ]
            if self.datasets:
                tools_function_call.append(
                    {
                        "type": "function",
                        "function": {
                            "name": "data_retrieval",
                            "description": "搜索本地数据集.经常在联网的搜索工具使用之前使用",
                            "parameters": {
                                "type": "object",
                                "properties": {
                                    "user_question": {
                                        "type": "string",
                                        "description": "The extracted user questions should be prioritized in vector retrieval",
                                    }
                                },
                            },
                            "required": ["user_question"],
                        },
                    }
                )
            logger.info(f"Action Tools: {tools_function_call}")
        except Exception as e:
            logger.error(e)
        # self.tool_name_dict = {
        #     tool.name: {
        #         "name": tool.function.name,
        #         "output": tool.function.parameters,
        #         # "need_llm_call": tool.need_llm_call,
        #     }
        #     for tool in tools_function_call
        # }
        llm_token = (
            model.token if model.token else os.environ.get("DASHSCOPE_API_KEY", "")
        )
        prompt = text_input
        kwargs = {
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
            "instruction": (
                assistant.instruction if assistant.instruction else DEFAULT_INSTRUCTION
            ),
            "model_name": model.name_alias if model else None,
            "url": model.url if model else None,
            "tools": tools_function_call,
        }
        reasoning_log = ""  # 推理过程
        final_answer = ""  # 最终答案
        created = kwargs["created"]
        uid = kwargs["uid"]
        model = kwargs["model"]
        history = self.history
        session_id = self.business.get("session_id", None)
        chat_history = [(x["user"], x["assistant"]) for x in history] + [(prompt, "")]
        stream_response = {}
        stream_response["session_id"] = session_id
        stream_response["id"] = uid
        stream_response["created"] = created
        stream_response["model"] = model
        input_messages = self.build_input_messages(chat_history)
        messages = [{"role": "system", "content": kwargs["instruction"]}]
        messages.extend(input_messages)

        # 第一次询问，不涉及工具调用
        final_answer = ""
        final_function_name = ""
        final_function_arguments = ""
        final_chunks = []
        tool_call_id = ""
        # 处理 text_completion 异步生成器返回的大模型输出
        async for _chunk in self.text_completion(messages, **kwargs):
            yield _chunk
            final_chunks.append(_chunk)
            chunk = json.loads(_chunk)
            tmp_content, tmp_name, tmp_arguments , call_id = self.handleChunkResult(chunk, tool_call_id)
            tool_call_id = call_id
            final_answer += tmp_content
            final_function_name += tmp_name
            final_function_arguments += tmp_arguments
        # 第一次询问后的结果构造
        assistant_output = json.loads(final_chunks[0])["choices"][0]["delta"]
        assistant_output["role"] = "assistant"
        assistant_output["content"] = final_answer

        # 构造需要的工具调用
        if final_function_name and final_function_arguments:
            assistant_output["tool_calls"] = [
                {
                    "type": "function",
                    "id": tool_call_id,
                    "function": {
                        "name": final_function_name,
                        "arguments": final_function_arguments,
                    },
                }
            ]
        messages.append(assistant_output)

        try:
            # 如果模型输出结果包含工具调用，则循环调用工具
            while final_function_name and final_function_arguments:
                action = final_function_name
                action_input = final_function_arguments

                logger.info(f"Action: {final_function_name}")
                logger.info(f"Action Input: {final_function_arguments}")
                reasoning_log += f"Action: {action} Action Input: {action_input}\n"

                plugin_output = await self.call_plugin(action, action_input)
                logger.info(f"{CYAN}Tool Output: {plugin_output}{RESET}")
                reasoning_log += f"Tool Output: {plugin_output}\n"
                # function_tool 执行完毕后的结构构造, mcp tool 塞入返回结果, 否则是 MDX 字符串
                tool_result_content = (
                    plugin_output
                    if any(tool.name == action for tool in self.mcp_tools)
                    else self.wrapperUiRenderdPreview(action, plugin_output)
                )
                tool_info = {
                    "name": action,
                    "role": "tool",
                    "tool_call_id": tool_call_id,
                    "content": tool_result_content,
                }

                # 将工具返回的结果放回 sse stream
                # output_chunk = json.loads(final_chunks[0])
                # output_chunk["choices"][0]["delta"]["content"] = tool_result_content
                # yield json.dumps(output_chunk)
                # output_chunk["choices"][0]["delta"]["content"] = "[break]"
                # yield json.dumps(output_chunk)

                # 将工具返回的结果进行上下文的拼接
                messages.append(tool_info)

                # 重置变量
                final_answer = ""
                final_function_name = ""
                final_function_arguments = ""

                # 处理最终的结果 Review
                # 删除messages[5]
                async for _chunk in self.text_completion(messages, **kwargs):
                    yield _chunk
                    final_chunks.append(_chunk)
                    chunk = json.loads(_chunk)
                    tmp_content, tmp_name, tmp_arguments ,call_id = self.handleChunkResult(chunk, tool_call_id)
                    tool_call_id = call_id
                    final_answer += tmp_content
                    final_function_name += tmp_name
                    final_function_arguments += tmp_arguments
        except KeyError:
            pass
        input_messages = self.get_input_content_from_messages(messages)
        self.result = (reasoning_log, final_answer, input_messages)
        yield DONE
        return
