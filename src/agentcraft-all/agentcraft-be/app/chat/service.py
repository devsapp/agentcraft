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
