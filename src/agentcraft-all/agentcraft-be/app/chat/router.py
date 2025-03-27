"""Chat Router"""
from typing import Any
from fastapi import APIRouter, Request, Depends, HTTPException
from sse_starlette.sse import EventSourceResponse
from app.common.logger import logger
from app.auth.schema import AgentJWTData, JWTData
from app.chat import service
from app.chat.schema import ChatRequest, UpdateChatRequest, ChatCompletionResponse
from app.common.schema import DictListResponse
from app.auth.security import validate_token, validate_agent_token
from app.utils.message import process_history
router = APIRouter()


@router.get("/list/{agent_id}", response_model=DictListResponse)
async def list_chat(agent_id: int, page: int, limit: int, token: JWTData = Depends(validate_token)):
    """获取回答历史"""
    data, total = service.list_chats(agent_id, token.user_id, page, limit)
    return {
        "code": 200,
        "msg": "success",
        "data": data,
        "total": total,
    }


@router.post("/completions")
async def chat(req: ChatRequest, request: Request, token: AgentJWTData = Depends(validate_agent_token)):
    """
    Chat Function, validates agent token.
    If you are using swagger, you need to explicitly change to the agent token
    """
    if req.messages[-1].role != "user":
        raise HTTPException(status_code=400, detail="The last message must be from the user.")
    
    agent_id = token.agent_id

    keyword = req.keyword
    model_name = req.model_name
    agent_session_id = req.session_id
    logger.info(f'agent_session_id: {agent_session_id}; keyword: {keyword};')

    query = req.messages[-1].content
    agent_session_id = service.get_chat_session_id(agent_session_id, keyword, agent_id, title = query)
    logger.info(f'agent_session_id: {agent_session_id}')

    # history = []
    # if agent_session_id is not None:
    #     history, _total = service.list_chats_history_by_session_id(agent_id, agent_session_id)

    # history_dict = [{"user": d["question"], "assistant": d["answer"]} for d in history]
    # logger.info(f"history: {history_dict}")

    context_carry_enabled = req.context_carry_enabled
    history_dict = []
    if agent_session_id is not None:
        # 获取数据库历史
        db_history, _total = service.list_chats_history_by_session_id(agent_id, agent_session_id)
        history_dict = [{"user": d["question"], "assistant": d["answer"]} for d in db_history]
        # 合并处理历史
        if context_carry_enabled:
            history_dict = process_history(req.messages, history_dict)
    logger.info(f"Combined history: {history_dict}")

    if req.stream:
        return EventSourceResponse(
            await service.chat_stream(
                request, agent_session_id, query,  agent_id, history_dict, model_name),
            media_type="text/event-stream")
    else:
        resp: dict[str, Any] = service.chat(
            agent_session_id, query, request.client.host, agent_id, history_dict)
        return ChatCompletionResponse(**resp)


@router.put("/{uid}")
async def update_chat(uid: str, req: UpdateChatRequest, request: Request, token: AgentJWTData = Depends(validate_agent_token)):
    """更新问答历史记录 """
    update_args = {
        "ip_addr": request.client.host,
        "type": req.chat_type
    }
    service.update_chat(uid=uid, agent_id=token.agent_id, **update_args)
    return {
        "code": 200,
        "msg": "success",
    }
