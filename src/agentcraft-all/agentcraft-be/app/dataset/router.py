"""Dataset Router"""
from fastapi import APIRouter, Depends
from app.auth.schema import JWTData
from app.dataset import service
from app.common.schema import BasicResponse, DictResponse, DictListResponse
from app.dataset.schema import UpsertDatasetRequest
from app.auth.security import validate_token
router = APIRouter()


@router.get("/list", response_model=DictListResponse)
async def list_datasets(page: int, limit: int, dataset_type: int | None = None, token: JWTData = Depends(validate_token)):
    """获取数据集列表"""
    data, total = service.list_datasets(token.user_id, page, limit, dataset_type)
    return {
        "code": 200,
        "msg": "success",
        "data": data,
        "total": total,
    }


@router.post('/add', response_model=DictResponse)
async def add_dataset(req: UpsertDatasetRequest, token: JWTData = Depends(validate_token)):
    """添加数据集"""
    id = service.add_dataset(user_id=token.user_id, **vars(req))
    return {
        "code": 200,
        "msg": "success",
        "data": {"id":id}
    }


@router.get("/{dataset_id}", response_model=DictResponse)
async def get_dataset(dataset_id: int, token: JWTData = Depends(validate_token)):
    """获取数据集信息"""
    return {
        "code": 200,
        "msg": "success",
        "data": service.get_dataset(dataset_id, token.user_id)
    }


@router.put("/{dataset_id}", response_model=BasicResponse)
async def update_dataset(dataset_id: int, req: UpsertDatasetRequest, token: JWTData = Depends(validate_token)):
    """更新数据集"""
    service.update_dataset(dataset_id=dataset_id, user_id=token.user_id, **vars(req))
    return {
        "code": 200,
        "msg": "success",
    }

@router.delete('/{dataset_id}', response_model=BasicResponse)
async def delete_dataset(dataset_id: int, token: JWTData = Depends(validate_token)):
    """删除数据集"""
    service.delete_dataset(dataset_id, token.user_id)
    return {
        "code": 200,
        "msg": "success",
    }