"""Model Router"""
from fastapi import APIRouter, Depends
from app.model import service
from app.auth.schema import JWTData
from app.common.schema import BasicResponse, DictResponse, DictListResponse
from app.model.schema import UpsertModelRequest
from app.auth.security import validate_token
router = APIRouter()


@router.get("/list", response_model=DictListResponse)
async def list_models(page: int, limit: int, token: JWTData = Depends(validate_token)):
    """列出所有模型"""
    data, total = service.list_models(token.user_id, page, limit)
    return {
        "code": 200,
        "msg": "success",
        "data": data,
        "total": total,
    }


@router.post('/add', response_model=DictResponse)
async def add_model(req: UpsertModelRequest, token: JWTData = Depends(validate_token)):
    """添加模型"""
    id = service.add_model(user_id=token.user_id, **vars(req))
    return {
        "code": 201,
        "msg": "success",
        "data": {
            "id": id
        }
    }


@router.delete('/{model_id}', response_model=BasicResponse)
async def delete_model(model_id: int, token: JWTData = Depends(validate_token)):
    """删除模型"""
    service.delete_model(model_id, token.user_id)
    return {
        "code": 200,
        "msg": "success",
    }


@router.get("/{model_id}", response_model=DictResponse)
async def get_model(model_id: int, token: JWTData = Depends(validate_token)):
    """获取模型信息"""
    return {
        "code": 200,
        "msg": "success",
        "data": service.get_model(model_id, token.user_id)
    }


@router.put("/{model_id}", response_model=BasicResponse)
async def update_model(model_id: int, req: UpsertModelRequest, token: JWTData = Depends(validate_token)):
    """更新模型信息"""
    service.update_model(model_id=model_id, user_id=token.user_id, **vars(req))
    return {
        "code": 200,
        "msg": "success",
    }
