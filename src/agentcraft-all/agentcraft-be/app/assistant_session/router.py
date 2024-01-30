"""Assistant Session Router"""
from typing import Any
from fastapi import APIRouter, Depends
from app.auth.schema import JWTData
from app.assistant_session import service
from typing import Union
from app.common.schema import BasicResponse, DictResponse, DictListResponse
from app.assistant_session.schema import ListHistoryResponse, RevertRequest
from app.auth.security import validate_token

router = APIRouter()

@router.get("/list/{assistant_id}", response_model=DictListResponse)
async def list_assistant_session(assistant_id: int, page: int, limit: int, token: JWTData = Depends(validate_token)):
  """获取会话列表"""
  data, total = service.list_assistant_session(assistant_id, token.user_id, page, limit)
  return {
    "code": 200,
    "msg": "success",
    "data": data,
    "total": total,
  }

@router.get("/history/{assistant_id}", response_model=ListHistoryResponse)
async def get_assistant_chat_history_by_session_id(assistant_id: int, assistant_session_id: int = None, status: Union[int, None] = 1, limit: int = 20, token: JWTData = Depends(validate_token)):
  """获取回答历史"""

  data = service.get_assistant_histroy(assistant_id, assistant_session_id, status, limit)
  return {
    "code": 200,
    "msg": "success",
    "data": data,
  }

@router.delete('/{session_id}', response_model=BasicResponse)
async def delete_assistant_session(session_id: int, token: JWTData = Depends(validate_token)):
    """删除action_tools"""
    service.update_assistant_session_status(session_id, token.user_id, status=2)
    return {
        "code": 200,
        "msg": "success",
    }

@router.post('/revert', response_model=BasicResponse)
async def revert_assistant_session(req: RevertRequest, token: JWTData = Depends(validate_token)):
    """删除action_tools"""
    service.update_assistant_session_status(req.assistant_session_id, token.user_id, status=req.status, source_status = 2)
    return {
        "code": 200,
        "msg": "success",
    }