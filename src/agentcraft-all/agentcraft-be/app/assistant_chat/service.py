"""Chat Service"""
# pylint: disable = no-member
from typing import Any
# from app.database.redis import redis_db
import app.database.assistant_chat as assistant_chat_database
import app.database.assistant as assistant_database
import app.database.assistant_dataset as assistant_dataset_database
import app.database.assistant_session_chat as assistant_session_chat_database
import app.database.assistant_session as assistant_session_database

from app.reasoning.reasoning import Reasoning
from app.reasoning.reasoning_stream import ReasoningStream
DONE = "[DONE]"

def get_assistant_session_id(status: int, assistant_id: int, **kv):
    if status == 0:
       data = assistant_session_database.get_test_session(assistant_id)
       if data:
           return data.id
    return create_assistant_session(
        title='测试会话', assistant_id=assistant_id, status=status, **kv
    )

def create_assistant_session(**add_args):
    if not assistant_database.get_assistant_lite(add_args.get('assistant_id')):
        raise ValueError("assistant does not exist")
    return assistant_session_database.add_session(**add_args)

def list_assistant_chats_id_by_session_id(assistant_id: int, session_id: int, **kv):
    """根据 session_id 获取 assistant_chats_id 的列表"""
    assistant = assistant_database.get_assistant_lite(assistant_id)
    if not assistant:
        raise ValueError("assistant does not exist")
    if not assistant_database.check_user_has_assistant(assistant.user_id, assistant_id):
        raise ValueError("user does not have this assistant")
    limit = kv.get("limit") or assistant.llm_history_len or 20
    data, total = assistant_session_chat_database.list_assistant_session_chat_id_by_session_id(session_id, 0, limit)
    return data, total

def list_assistant_chats_history_by_session_id(assistant_id: int, session_id: int, limit = None):
    """根据 session_id 列出问答历史记录"""
    data, total = list_assistant_chats_id_by_session_id(assistant_id, session_id, limit = limit)
    history = []
    for item in data:
        # pdb.set_trace()
        assistant_chat_data = assistant_chat_database.get_assistant_lite(item.get("chat_id"))
        if not assistant_chat_data:
            print(f'No information found for assistant_chat id({item.get("chat_id")})')
            continue
        history.append(assistant_chat_data)
    return history

def list_chats(assistant_id: int, user_id: int, page: int, limit: int):
    """列出问答历史记录"""
    if not assistant_database.check_user_has_assistant(user_id, assistant_id):
        raise ValueError("user does not have this assistant")
    data, total = assistant_chat_database.list_chats(assistant_id, 0, page, limit)
    data_dict = [vars(chat) for chat in data]
    return data_dict, total


def update_chat(uid: str, assistant_id: int, **kwargs):
    """更新问答历史记录"""
    assistant_chat_database.update_chat(uid, assistant_id, **kwargs)


def chat(assistant_session_id: int,query: str, ip_addr: str, assistant_id: int, credential_dict, history):
    """Chat with assistant."""
    assistant = assistant_database.get_assistant_lite(assistant_id)

    if not assistant:
        raise ValueError("assistant does not exist")
    relations = assistant_dataset_database.list_datasets_by_assistant_id(
        assistant_id)
    datasets = [{**vars(relation),
                 "dataset_name": dataset_name}
                for relation, dataset_name in relations]
    reason = Reasoning(query, assistant, datasets, credential_dict, history)
    res = reason.call_assistant()

    reasoning_log, answer, prompt = reason.result
    chat_id = add_assistant_chat(query, prompt, answer, reasoning_log,
                                 ip_addr, assistant.user_id, assistant_id, model_id=reason.model.id, model_name=reason.model.name)
    add_assistant_session_chat(assistant_session_id, chat_id)
    return res


def chat_stream(assistant_session_id: int, query: str, ip_addr: str, assistant_id: int, credential_dict, history):
    """Chat with assistant."""
    assistant = assistant_database.get_assistant_lite(assistant_id)
    if not assistant:
        raise ValueError("assistant does not exist")
    relations = assistant_dataset_database.list_datasets_by_assistant_id(
        assistant_id)
    datasets = [{**vars(relation),
                 "dataset_name": dataset_name}
                for relation, dataset_name in relations]

    reason_stream = ReasoningStream(
        query, assistant, datasets, credential_dict, history)

    yield from reason_stream.call_assistant_stream()

    # reasoning_log: 完整的推理日志
    # answer: 展示用户的答案
    reasoning_log, answer, prompt = reason_stream.result
    chat_id = add_assistant_chat(query, prompt, answer, reasoning_log,
                                 ip_addr, assistant.user_id, assistant_id, model_id=reason_stream.model.id, model_name=reason_stream.model.name)
    add_assistant_session_chat(assistant_session_id, chat_id)
    return

def add_assistant_chat(
        query: str, prompt: str, answer: str, reasoning_log: str,
        ip_addr: str, uid, assistant_id, chat_type: int = 1, model_id = None, model_name = None):
    """添加到assistant_chat数据库"""

    add_args = {
        "question": query,
        "prompt": prompt,
        "answer": answer,
        "reasoning_log": reasoning_log,
        "type": chat_type,
        "ip": ip_addr,
        "assistant_id": assistant_id,
        "model_id": model_id,
        "model_name": model_name,
        "uid": uid,
    }

    chat_id = assistant_chat_database.add_chat(**add_args)
    return chat_id

def add_assistant_session_chat(assistant_session_id: int, chat_id: int):
    """添加到assistant_session_chat数据库"""
    assistant_session_chat_database.insert_assistant_session_chats(assistant_session_id, [chat_id])
