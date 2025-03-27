"""Assistant Session Router"""
from typing import Any
from fastapi import APIRouter, Depends
from app.auth.schema import JWTData
from app.assistant_session import service
from typing import Union
from app.common.schema import BasicResponse, DictListResponse
from app.assistant_session.schema import RevertRequest, HistoryListResponse, SessionResponse
from app.auth.security import validate_token
from app.common.logger import logger

router = APIRouter()
def remove_sa_instance_state(obj: dict) -> dict:
    """移除 SQLAlchemy 的 _sa_instance_state 属性"""
    obj.pop("_sa_instance_state", None)
    return obj
@router.get("/list/{assistant_id}", response_model=DictListResponse)
async def list_assistant_session(assistant_id: int, page: int, limit: int, token: JWTData = Depends(validate_token)):
  """获取会话列表"""
  service.check_user_has_assistant(token.user_id, assistant_id)
  data, total = service.list_assistant_session(assistant_id, page, limit)
  data = [remove_sa_instance_state(item) for item in data]
  return {
    "code": 200,
    "msg": "success",
    "data": data,
    "total": total,
  }


@router.get("/detail", response_model=SessionResponse)
async def get_session_by_keyword(assistant_id: int, session_id: int, token: JWTData = Depends(validate_token)):
    """获取回答历史"""
    logger.info(f'get_session_id session_id: {session_id}')
    service.check_user_has_assistant(token.user_id, assistant_id)

    data = service.get_session_by_id(session_id)
    data = remove_sa_instance_state(data)
    return {
        "code": 200,
        "msg": "success",
        "data": data
    }

@router.get("/detail_by_keyword", response_model=SessionResponse)
async def get_session_by_keyword(assistant_id: int, keyword: str, token: JWTData = Depends(validate_token)):
    """获取回答历史"""
    logger.info(f'get_session_by_keyword assistant_id: {assistant_id}; keyword: {keyword}')
    service.check_user_has_assistant(token.user_id, assistant_id)
    data = service.get_session_by_assistant_id_and_keyword(assistant_id, keyword)
    data = remove_sa_instance_state(data)
    return {
        "code": 200,
        "msg": "success",
        "data": data
    }

@router.get("/history", response_model=HistoryListResponse)
async def list_chat(assistant_id: int, page: int = 0, limit: int = 20, session_id: int = None, keyword: str = None, token: JWTData = Depends(validate_token)):
    """获取回答历史"""
    logger.info(f'assistant_id: {assistant_id}; session_id: {session_id}; keyword: {keyword};')
    service.check_user_has_assistant(token.user_id, assistant_id)
    data, total, session_id = service.get_assistant_histroy(assistant_id, session_id, keyword, page, limit)
    data = [remove_sa_instance_state(item) for item in data]
    return {
        "code": 200,
        "msg": "success",
        "data": data,
        "total": total,
        "session_id": session_id,
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
    """撤销删除action_tools"""
    service.update_assistant_session_status(req.assistant_session_id, token.user_id, status=1, source_status = 2)
    return {
        "code": 200,
        "msg": "success",
    }