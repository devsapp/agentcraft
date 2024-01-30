"""App Router"""
from fastapi import APIRouter, Depends
from app.action_tools import service
from app.auth.schema import JWTData
from app.common.schema import BasicResponse, DictResponse, DictListResponse
from app.action_tools.schema import UpsertActionToolsRequest
from app.auth.security import validate_token
router = APIRouter()


@router.get("/list", response_model=DictListResponse)
async def list_action_tools(page: int, limit: int, token: JWTData = Depends(validate_token)):
    """获取action_tools列表"""
    data, total = service.list_action_tools(token.user_id, page, limit)
    return {
        "code": 200,
        "msg": "success",
        "data": data,
        "total": total,
    }


@router.post('/add', response_model=DictResponse)
async def add_action_tools(req: UpsertActionToolsRequest, token: JWTData = Depends(validate_token)):
    """添加action_tools"""
    id = service.add_action_tools(user_id=token.user_id, **vars(req))
    return {
        "code": 200,
        "msg": "success",
        "data": {
            "id": id
        }
    }


@router.delete('/{action_tools_id}', response_model=BasicResponse)
async def delete_action_tools(action_tools_id: int, token: JWTData = Depends(validate_token)):
    """删除action_tools"""
    service.delete_action_tools(action_tools_id, token.user_id)
    return {
        "code": 200,
        "msg": "success",
    }


@router.get("/{action_tools_id}", response_model=DictResponse)
async def get_action_tools(action_tools_id: int, token: JWTData = Depends(validate_token)):
    """获取action_tools信息"""
    return {
        "code": 200,
        "msg": "success",
        "data": service.get_action_tools(action_tools_id, token.user_id)
    }


@router.put("/{action_tools_id}", response_model=BasicResponse)
async def update_action_tools(action_tools_id: int, req: UpsertActionToolsRequest, token: JWTData = Depends(validate_token)):
    """更新action_tools信息"""
    service.update_action_tools(action_tools_id=action_tools_id, user_id=token.user_id, **vars(req))
    return {
        "code": 200,
        "msg": "success",
    }
