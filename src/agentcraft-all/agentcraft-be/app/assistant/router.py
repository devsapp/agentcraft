"""Assistant Router"""
from fastapi import APIRouter, Depends
from app.assistant import service
from app.auth.schema import JWTData
from app.common.schema import BasicResponse, DictResponse, DictListResponse
from app.assistant.schema import UpsertAssistantRequest
from app.auth.security import validate_token
router = APIRouter()

def remove_sa_instance_state(obj: dict) -> dict:
    """移除 SQLAlchemy 的 _sa_instance_state 属性"""
    obj.pop("_sa_instance_state", None)
    return obj


@router.get("/list/{app_id}", response_model=DictListResponse)
async def list_assistants(app_id: int, page: int, limit: int, token: JWTData = Depends(validate_token)):
    """获取assistant列表"""
    data, total = service.list_assistants(app_id, token.user_id, page, limit)
    data = [remove_sa_instance_state(obj) for obj in data]
    return {
        "code": 200,
        "msg": "success",
        "data": data,
        "total": total,
    }


@router.post('/add', response_model=DictResponse)
async def add_assistant(req: UpsertAssistantRequest, token: JWTData = Depends(validate_token)):
    """添加assistant"""
    id = service.add_assistant(user_id=token.user_id, **vars(req))
    return {
        "code": 201,
        "data": {
            "id": id
        },
        "msg": "success",
    }


@router.get('/refresh/{assistant_id}', response_model=DictResponse)
async def refresh_token(assistant_id: int, token: JWTData = Depends(validate_token)):
    """更新token"""
    token = service.refresh_token(token.user_id, assistant_id)
    return {
        "code": 200,
        "msg": "success",
        "data": token
    }


@router.get("/{assistant_id}", response_model=DictResponse)
async def get_assistant(assistant_id: int, token: JWTData = Depends(validate_token)):
    """获取assistant信息"""
    return {
        "code": 200,
        "msg": "success",
        "data": remove_sa_instance_state(service.get_assistant(assistant_id, token.user_id))
    }


@router.put("/{assistant_id}", response_model=BasicResponse)
async def update_assistant(assistant_id: int, req: UpsertAssistantRequest, token: JWTData = Depends(validate_token)):
    """更新assistant信息"""
    service.update_assistant(assistant_id=assistant_id,
                             user_id=token.user_id, **vars(req))
    return {
        "code": 200,
        "msg": "success",
    }


@router.delete("/{assistant_id}", response_model=BasicResponse)
async def delete_assistant(assistant_id: int, token: JWTData = Depends(validate_token)):
    """删除assistant"""
    service.delete_assistant(assistant_id, token.user_id)
    return {
        "code": 200,
        "msg": "success",
    }
