"""Chat Session Router"""
from typing import Any
from fastapi import APIRouter, Depends
from app.auth.schema import JWTData
from app.chat_session import service
from typing import Union
from app.common.schema import BasicResponse, DictResponse, DictListResponse
from app.chat_session.schema import ListHistoryResponse
from app.auth.security import validate_token

router = APIRouter()

@router.get("/list/{agent_id}", response_model=DictListResponse)
async def list_chat_session(agent_id: int, page: int, limit: int, token: JWTData = Depends(validate_token)):
  """获取会话列表"""
  data, total = service.list_chat_session(agent_id, token.user_id, page, limit)
  return {
    "code": 200,
    "msg": "success",
    "data": data,
    "total": total,
  }

@router.get("/history/{agent_id}", response_model=ListHistoryResponse)
async def get_agent_chat_history_by_session_id(agent_id: int, agent_session_id = None, status: Union[int, None] = 1, limit: int = 20, token: JWTData = Depends(validate_token)):
  """获取回答历史"""

  data = service.get_agent_histroy(agent_id, agent_session_id, status, limit)
  return {
    "code": 200,
    "msg": "success",
    "data": data,
  }