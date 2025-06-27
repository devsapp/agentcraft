"""AgenticApp Router"""
from fastapi import APIRouter, Depends
from app.agentic_app import service
from app.auth.schema import JWTData
from app.common.schema import BasicResponse, DictResponse, DictListResponse
from app.agentic_app.schema import UpdateAgenticAppRequest, AddAgenticAppRequest
from app.auth.security import validate_token

router = APIRouter()


@router.get("/list", response_model=DictListResponse)
async def list_agentic_apps(page: int, limit: int, token: JWTData = Depends(validate_token)):
    """获取当前用户的 AgenticApp 列表"""
    data, total = service.list_agentic_apps(token.user_id, page, limit)
    return {
        "code": 200,
        "msg": "success",
        "data": data,
        "total": total,
    }


@router.post("/add", response_model=DictResponse)
async def add_agentic_app(req: AddAgenticAppRequest, token: JWTData = Depends(validate_token)):
    """新增 AgenticApp"""
    app_id = service.add_agentic_app(user_id=token.user_id, **req.dict())
    return {
        "code": 200,
        "msg": "success",
        "data": {"id": app_id}
    }


@router.delete("/{app_id}", response_model=BasicResponse)
async def delete_agentic_app(app_id: int, token: JWTData = Depends(validate_token)):
    """删除指定的 AgenticApp"""
    service.delete_agentic_app(app_id, token.user_id)
    return {
        "code": 200,
        "msg": "success"
    }


@router.get("/{app_id}", response_model=DictResponse)
async def get_agentic_app(app_id: int, token: JWTData = Depends(validate_token)):
    """获取指定的 AgenticApp 信息"""
    data = service.get_agentic_app(app_id, token.user_id)
    return {
        "code": 200,
        "msg": "success",
        "data": data
    }


@router.put("/{app_id}", response_model=BasicResponse)
async def update_agentic_app(app_id: int, req: UpdateAgenticAppRequest, token: JWTData = Depends(validate_token)):
    """更新指定的 AgenticApp"""
    service.update_agentic_app(app_id, user_id=token.user_id, **req.dict())
    return {
        "code": 200,
        "msg": "success"
    }