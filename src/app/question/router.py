"""Question Router"""
from fastapi import APIRouter, Depends, UploadFile, File
from app.auth.schema import JWTData
from app.common.schema import BasicResponse
from app.question import service
from app.auth.security import validate_token
from app.common.schema import DictListResponse
from app.question.schema import UpsertQuestionRequest
router = APIRouter()


@router.get("/list/{dataset_id}", response_model=DictListResponse)
async def list_questions(dataset_id: int, page: int, limit: int, token: JWTData = Depends(validate_token)):
    """获取问题列表"""
    data, total = service.list_questions(dataset_id, token.user_id, page, limit)
    return {"code": 200, "msg": "success", "data": data, "total": total}


@router.post('/add', response_model=BasicResponse)
async def add_question(req: UpsertQuestionRequest, token: JWTData = Depends(validate_token)):
    """添加问题"""
    service.add_question(user_id=token.user_id, **vars(req))
    return {"code": 201, "msg": "success"}


@router.put('/{question_id}', response_model=BasicResponse)
async def update_question(question_id: int, req: UpsertQuestionRequest, token: JWTData = Depends(validate_token)):
    """更新问题"""
    service.update_question(question_id=question_id, user_id=token.user_id, **vars(req))
    return {"code": 200, "msg": "success"}


@router.delete('/{question_id}', response_model=BasicResponse)
async def delete_question(question_id: int, token: JWTData = Depends(validate_token)):
    """删除问题"""
    service.delete_question(question_id, token.user_id)
    return {"code": 200, "msg": "success"}


@router.post("/upload", response_model=BasicResponse)
async def upload_question(file: UploadFile = File(), token: JWTData = Depends(validate_token)):
    """批量更新问题"""
    service.upload_questions(file.file, token.user_id)
    return {"code": 200, "msg": "success"}
