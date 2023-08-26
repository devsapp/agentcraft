"""App Router"""
from fastapi import APIRouter, Depends
from app.apps import service
from app.auth.schema import JWTData
from app.common.schema import BasicResponse, DictResponse, DictListResponse
from app.apps.schema import UpsertAppRequest
from app.auth.security import validate_token
router = APIRouter()


@router.get("/list", response_model=DictListResponse)
async def list_apps(page: int, limit: int, token: JWTData = Depends(validate_token)):
    """获取应用列表"""
    data, total = service.list_apps(token.user_id, page, limit)
    return {
        "code": 200,
        "msg": "success",
        "data": data,
        "total": total,
    }


@router.post('/add', response_model=BasicResponse)
async def add_app(req: UpsertAppRequest, token: JWTData = Depends(validate_token)):
    """添加应用"""
    service.add_app(user_id=token.user_id, **vars(req))
    return {
        "code": 201,
        "msg": "success",
    }


@router.delete('/{app_id}', response_model=BasicResponse)
async def delete_app(app_id: int, token: JWTData = Depends(validate_token)):
    """删除应用"""
    service.delete_app(app_id, token.user_id)
    return {
        "code": 200,
        "msg": "success",
    }


@router.get("/{app_id}", response_model=DictResponse)
async def get_app(app_id: int, token: JWTData = Depends(validate_token)):
    """获取应用信息"""
    return {
        "code": 200,
        "msg": "success",
        "data": service.get_app(app_id, token.user_id)
    }


@router.put("/{app_id}", response_model=BasicResponse)
async def update_app(app_id: int, req: UpsertAppRequest, token: JWTData = Depends(validate_token)):
    """更新应用信息"""
    service.update_app(app_id=app_id, user_id=token.user_id, **vars(req))
    return {
        "code": 200,
        "msg": "success",
    }
