"""App Router"""
from fastapi import APIRouter, Depends
from app.multiagent import service
from app.auth.schema import JWTData
from app.common.schema import  ListResponse

from app.auth.security import validate_token
router = APIRouter()


@router.get("/search", response_model=ListResponse)
async def list_multiagent_history(keyword):
    """获取多智能体的历史对话数据"""
    data = service.list_multiagent_history(keyword)
    return {
        "code": 200,
        "msg": "success",
        "data": data,
    }



