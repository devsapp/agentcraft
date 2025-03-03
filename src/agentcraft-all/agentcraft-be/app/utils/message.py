from fastapi import APIRouter, Request, Depends, HTTPException
from app.config import common as config


def validate_message_roles(messages: list):
    """验证消息角色交替合法性"""
    for i, msg in enumerate(messages):
        if i % 2 == 0 and msg.role != "user":
            raise HTTPException(
                status_code=400, detail=f"Message {i} should be user role")
        if i % 2 == 1 and msg.role != "assistant":
            raise HTTPException(
                status_code=400, detail=f"Message {i} should be assistant role")


def process_history(req_messages: list, db_history: list, limit: int = config.MAX_REQUEST_GROUPS):
    """合并处理请求消息与数据库历史

    Args:
        req_messages: 请求消息列表（最后一条为当前用户消息）
        db_history: 数据库查询的历史记录（格式：[{"user":str, "assistant":str}...]）
        limit: 请求历史最大保留组数（每组包含1问1答）
    """
    raw_request_history = req_messages[:-1]
    recent_history = raw_request_history[-limit*2:]  # 每组包含2条消息

    # 验证请求中的历史消息结构
    validate_message_roles(recent_history)

    req_history_dict = []
    for i in reversed(range(0, len(recent_history), 2)):
        if i+1 >= len(recent_history):
            continue  # 跳过不成对的最后一条
        req_history_dict.insert(0, {  # 保持时间正序
            "user": recent_history[i].content,
            "assistant": recent_history[i+1].content
        })

    # 合并策略（请求历史优先）
    seen_pairs = set()
    combined = []

    # 1. 优先处理请求中的历史（保留最新）
    for item in req_history_dict:
        key = (item["user"], item["assistant"])
        if key not in seen_pairs:
            seen_pairs.add(key)
            combined.append(item)

    # 2. 补充数据库历史（保留未被覆盖的）
    for item in reversed(db_history):  # 数据库历史本身是时间正序
        key = (item["user"], item["assistant"])
        if key not in seen_pairs:
            seen_pairs.add(key)
            combined.append(item)

    # 最终结果保持时间正序（旧→新）
    return combined
