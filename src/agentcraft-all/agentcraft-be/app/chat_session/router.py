"""Chat Session Router"""
from typing import Any
from fastapi import APIRouter, Depends
from app.auth.schema import JWTData
from app.chat_session import service
from app.agent import service as agent_service
from typing import Union
from app.common.schema import BasicResponse, DictListResponse
from app.chat_session.schema import SessionResponse, HistoryListResponse
from app.auth.security import validate_token
from app.common.logger import logger

router = APIRouter()


@router.get("/public/history", response_model=HistoryListResponse)
async def list_public_chat(agent_id: int, page: int = 0, limit: int = 20, session_id: int = None, keyword: str = None):
    """公开获取回答历史列表"""
    logger.info(f'agent_id: {agent_id}; session_id: {session_id}; keyword: {keyword};')
    agentInfo = agent_service.get_public_agent_streamline_info(agent_id)
    if agentInfo is None:
        return {
            "code": 400,
            "msg": "agent is not public",
        }
    data, total, session_id = service.get_agent_histroy(agent_id, session_id, keyword, page, limit)
    return {
        "code": 200,
        "msg": "success",
        "data": data,
        "total": total,
        "session_id": session_id,
    }

@router.delete('/public/{agent_id}/{session_id}', response_model=BasicResponse)
async def public_delete_session(agent_id: int, session_id: int):
    """公开删除会话"""
    agentInfo = agent_service.get_public_agent_streamline_info(agent_id)
    if agentInfo is None:
        return {
            "code": 400,
            "msg": "agent is not public",
        }
    service.public_update_session_status(session_id, status=2)
    return {
        "code": 200,
        "msg": "success",
    }

@router.get("/public/detail_by_keyword", response_model=SessionResponse)
async def get_session_by_keyword(agent_id: int, keyword: str):
    """公开根据对话关键词获取历史"""
    logger.info(f'get_session_by_keyword agent_id: {agent_id}; keyword: {keyword}')
    agentInfo = agent_service.get_public_agent_streamline_info(agent_id)
    if agentInfo is None:
        return {
            "code": 400,
            "msg": "agent is not public",
        }
    data = service.get_session_by_assistant_id_and_keyword(agent_id, keyword)
    return {
        "code": 200,
        "msg": "success",
        "data": data
    }


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


@router.get("/history", response_model=HistoryListResponse)
async def list_chat(agent_id: int, page: int = 0, limit: int = 20, session_id: int = None, keyword: str = None, token: JWTData = Depends(validate_token)):
    """获取回答历史"""
    logger.info(f'agent_id: {agent_id}; session_id: {session_id}; keyword: {keyword};')
    service.check_user_has_agent(token.user_id, agent_id)

    data, total, session_id = service.get_agent_histroy(agent_id, session_id, keyword, page, limit)
    return {
        "code": 200,
        "msg": "success",
        "data": data,
        "total": total,
        "session_id": session_id,
    }



@router.get("/detail_by_keyword", response_model=SessionResponse)
async def get_session_by_keyword(agent_id: int, keyword: str, token: JWTData = Depends(validate_token)):
    """获取回答历史"""
    logger.info(f'get_session_by_keyword agent_id: {agent_id}; keyword: {keyword}')
    service.check_user_has_agent(token.user_id, agent_id)
  
    data = service.get_session_by_assistant_id_and_keyword(agent_id, keyword)
    return {
        "code": 200,
        "msg": "success",
        "data": data
    }



@router.delete('/{session_id}', response_model=BasicResponse)
async def delete_session(session_id: int, token: JWTData = Depends(validate_token)):
    """删除会话"""
    service.update_session_status(session_id, token.user_id, status=2)
    return {
        "code": 200,
        "msg": "success",
    }


