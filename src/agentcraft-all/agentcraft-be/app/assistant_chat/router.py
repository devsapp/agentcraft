"""Chat Router"""
from typing import Any
from fastapi import APIRouter, Request, Depends, HTTPException
from sse_starlette.sse import EventSourceResponse
from app.auth.schema import AgentJWTData, JWTData
from app.assistant_chat import service
from app.assistant_chat.schema import ChatRequest, UpdateChatRequest, ChatCompletionResponse
from app.common.schema import DictListResponse
from app.auth.security import validate_token, validate_agent_token
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
    account_id = request.headers.get('x-fc-account-id')
    access_key_id = request.headers.get('x-fc-access-key-id')
    access_key_secret = request.headers.get('x-fc-access-key-secret')
    security_token = request.headers.get('x-fc-security-token')
    credential_dict = {
        "account_id": account_id,
        "access_key_id": access_key_id,
        "access_key_secret": access_key_secret,
        "security_token": security_token

    }
    if req.messages[-1].role != "user":
        raise HTTPException(
            status_code=400, detail="The last message must be from the user.")
    assistant_session_id = req.assistant_session_id
    assistant_id = token.agent_id
    query = req.messages[-1].content

    history = []
    if assistant_session_id is None:
        assistant_session_id = service.get_assistant_session_id(req.status, assistant_id)
    print(f'assistant_session_id: {assistant_session_id}')
    history = service.list_assistant_chats_history_by_session_id(assistant_id, assistant_session_id)
    # history_dict = [{"user": d["question"], "assistant": d["reasoning_log"]} for d in history]
    history_dict = [{"user": d["question"], "assistant": d["answer"]} for d in history]
    # return {}
    if req.stream:
        return EventSourceResponse(
            service.chat_stream(
                assistant_session_id, query, request.client.host, assistant_id, credential_dict, history_dict),
            media_type="text/event-stream")
    else:
        resp: dict[str, Any] = service.chat(
            assistant_session_id, query, request.client.host, assistant_id, credential_dict, history_dict)
        print(f"resp: {resp}")
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
