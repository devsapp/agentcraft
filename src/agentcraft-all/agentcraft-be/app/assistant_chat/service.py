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
import app.database.assistant as assistant_database
import app.database.assistant_dataset as assistant_dataset_database
import app.database.model as model_database
# import app.database.redis as redis
from app.common.logger import logger
from app.chat.green_client import is_legal

from app.reasoning.reasoning import Reasoning
from app.reasoning.reasoning_stream import ReasoningStream
DONE = "[DONE]"



def list_chats(assistant_id: int, user_id: int, page: int, limit: int):
    """列出问答历史记录"""
    if not assistant_database.check_user_has_assistant(user_id, assistant_id):
        raise ValueError("user does not have this assistant")
    data, total = database.list_chats(assistant_id, 0, page, limit)
    data_dict = [vars(chat) for chat in data]
    return data_dict, total


def update_chat(uid: str, assistant_id: int, **kwargs):
    """更新问答历史记录"""
    database.update_chat(uid, assistant_id, **kwargs)


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


def get_prompt_key(prompt: str, assistant, history: list[str] = None):
    """获取prompt的key"""
    to_hash = f"[{assistant.id}]{history[::2] if history else ''}#{prompt}".lower()
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





def chat(query: str, ip_addr: str, assistant_id: int):
    """Chat with assistant."""
    assistant = assistant_database.get_assistant_lite(assistant_id)
    
    if not assistant:
        raise ValueError("assistant does not exist")
    
    reason = Reasoning(query, assistant)

    return reason.call_assistant()
    


def chat_stream(query: str, ip_addr: str, assistant_id: int):
    """Chat with assistant."""
    assistant = assistant_database.get_assistant_lite(assistant_id)
    if not assistant:
        raise ValueError("assistant does not exist")
    reason_stream = ReasoningStream(query, assistant)
    yield from reason_stream.call_assistant_stream()
    return
    

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
        search_choices: list, ip_addr: str, assistant, chat_type: int, uid: str, created: int):
    """获取大模型的回答"""
    messages = build_messages(prompt, history, assistant.system_message)
    logger.info(messages)
    model = model_database.get_model_by_id(assistant.model_id)
    if not model:
        raise ValueError("model does not exist")
    headers = {
        "Authorization": f"Bearer {model.token}",
        "Content-Type": "application/json"
    }
    request_data = json.dumps({
        "model": model.name,
        "messages": messages,
        "temperature": assistant.temperature,
        "top_p": assistant.top_p,
        "n": assistant.n_sequences,
        "max_tokens": assistant.max_tokens,
        "stop": assistant.stop,
        "presence_penalty": assistant.presence_penalty,
        "frequency_penalty": assistant.frequency_penalty,
        "logit_bias": json.loads(assistant.logit_bias) if assistant.logit_bias else {}
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
        "assistant": assistant,
        "model": model,
        "uid": uid,
    }
    add_chat(**add_args)
    return resp_data


def model_chat_stream(
        query: str, prompt: str, history: list[str],
        search_choices: list, ip_addr: str, assistant, chat_type: int, uid: str, created: int):
    """获取大模型的回答"""
    messages = build_messages(prompt, history, assistant.system_message)
    logger.info(messages)
    model = model_database.get_model_by_id(assistant.model_id)
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
        "temperature": assistant.temperature,
        "top_p": assistant.top_p,
        "n": assistant.n_sequences,
        "max_tokens": assistant.max_tokens,
        "stop": assistant.stop,
        "presence_penalty": assistant.presence_penalty,
        "frequency_penalty": assistant.frequency_penalty,
        "logit_bias": json.loads(assistant.logit_bias) if assistant.logit_bias else {}
    })
    logger.info(request_data)
    req = requests.post(model.url, headers=headers, data=request_data,
                        stream=True, timeout=model.timeout)
    answer = [""]*assistant.n_sequences
    for line in req.iter_lines():
        if line:
            line = codecs.decode(line)
            if line.startswith("data:"):
                line = line[5:].strip()
                # logger.info(line)
                try:
                    chunk = json.loads(line)
                    chunk["id"] = uid
                    chunk["created"] = created
                    chunk["model"] = model.name_alias
                    yield json.dumps(chunk)
                    if "choices" in chunk and len(
                            chunk["choices"]) > 0 and "delta" in chunk["choices"][0] and "content" in chunk["choices"][0]["delta"]:
                        answer[chunk["choices"][0]["index"]
                               ] += chunk["choices"][0]["delta"]["content"]
                except json.JSONDecodeError as err:
                    logger.info(err)

    """添加检索来源信息"""
    if len(search_choices) > 0:
        result_text = "\n\n参考资料\n"
        for index, item in enumerate(search_choices):
            if item['message']['url']:
                markdown_text = f"\[{index+1}\] [{item['message']['title']}]({item['message']['url']})\n"
                result_text += markdown_text
        search_info = {"choices":[]}
        search_info["id"] = uid
        search_info["created"] = created
        search_info["model"] = model.name_alias
        search_info["choices"].append({"index": 0,
                                    "delta": {"role": "assistant",
                                                "content": result_text},
                                    "finish_reason": "null"})
        yield json.dumps(search_info)

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
        "assistant": assistant,
        "model": model,
        "uid": uid,
    }
    add_chat(**add_args)


def add_chat(
        query: str, prompt: str, answer: list, source: list, history: list[str],
        chat_type: int, ip_addr: str, assistant, uid: str, model=None):
    """添加到数据库"""
    history_key = f"history:{ip_addr}"
    if not history:
        history = [query, answer]
    else:
        if len(history) >= assistant.llm_history_len*2:
            history = history[:-(assistant.llm_history_len-1)*2]
        history.append(query)
        history.append(answer)
    # redis_db.set(history_key, json.dumps(history), ex=assistant.redis_history_ex)
    add_args = {
        "question": query,
        "prompt": prompt,
        "answer": json.dumps(answer),
        "source": json.dumps(source),
        "type": chat_type,
        "ip": ip_addr,
        "assistant_id": assistant.id,
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
