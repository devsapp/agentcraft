"""Document Router"""
from fastapi import APIRouter, Depends, UploadFile, File, Form
from app.auth.schema import JWTData
from app.common.schema import BasicResponse
from app.document import service
from app.auth.security import validate_token
from app.common.schema import DictListResponse
from app.document.schema import UpsertDocumentRequest
router = APIRouter()


@router.get("/list/{dataset_id}", response_model=DictListResponse)
async def list_documents(dataset_id: int, page: int, limit: int, token: JWTData = Depends(validate_token)):
    """获取文档列表"""
    data, total = service.list_documents(dataset_id, token.user_id, page, limit)
    return {"code": 200, "msg": "success", "data": data, "total": total}


@router.post("/add", response_model=BasicResponse)
async def insert_document(req: UpsertDocumentRequest, token: JWTData = Depends(validate_token)):
    """新增文档"""
    service.add_document(user_id=token.user_id, **vars(req))
    return {"code": 201, "msg": "success"}


@router.delete('/{document_id}', response_model=BasicResponse)
async def delete_document(document_id: int, token: JWTData = Depends(validate_token)):
    """删除文档"""
    service.delete_document(document_id, token.user_id)
    return {"code": 200, "msg": "success"}


@router.post("/upload", response_model=BasicResponse)
async def upload_document(title: str = Form(), url: str = Form(), tag: int = Form(), file: UploadFile = File(), chunk_size: int = Form(), token: JWTData = Depends(validate_token)):
    """上传文档"""
    upload_args = {
        "title": title,
        "url": url,
        "tag": tag,
        "ext": file.filename.split('.')[-1],
        "file": file.file,
        "user_id": token.user_id,
        "chunk_size": chunk_size
    }
    service.upload_document(**upload_args)
    return {"code": 201, "msg": "success"}


@router.post("/upload/csv", response_model=BasicResponse)
async def add_documents_csv(file: UploadFile = File(), chunk_size: int = Form(), token: JWTData = Depends(validate_token)):
    """批量更新文档"""
    if file.filename.endswith(".csv"):
        service.add_documents(file.file, token.user_id, chunk_size)
        return {"code": 201, "msg": "success"}
    return {"code": 500, "msg": "文件格式错误, 请上传csv文件"}
