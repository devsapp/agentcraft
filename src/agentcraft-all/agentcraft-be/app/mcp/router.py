"""MCP Router"""
from fastapi import APIRouter, Depends
from app.mcp import service
from app.auth.schema import JWTData
from app.common.schema import BasicResponse, DictResponse, DictListResponse
from app.mcp.schema import UpsertMCPRequest
from app.auth.security import validate_token

router = APIRouter()


@router.get("/list", response_model=DictListResponse)
async def list_mcp(page: int, limit: int, token: JWTData = Depends(validate_token)):
    """获取当前用户的 MCP 列表"""
    data, total = service.list_mcp(token.user_id, page, limit)
    return {
        "code": 200,
        "msg": "success",
        "data": data,
        "total": total,
    }


@router.post("/add", response_model=DictResponse)
async def add_mcp(req: UpsertMCPRequest, token: JWTData = Depends(validate_token)):
    """新增 MCP"""
    mcp_id = service.add_mcp(user_id=token.user_id, **req.dict())
    return {
        "code": 200,
        "msg": "success",
        "data": {"id": mcp_id}
    }


@router.delete("/{mcp_id}", response_model=BasicResponse)
async def delete_mcp(mcp_id: int, token: JWTData = Depends(validate_token)):
    """删除指定的 MCP"""
    service.delete_mcp(mcp_id, token.user_id)
    return {
        "code": 200,
        "msg": "success"
    }


@router.get("/{mcp_id}", response_model=DictResponse)
async def get_mcp(mcp_id: int, token: JWTData = Depends(validate_token)):
    """获取指定的 MCP 信息"""
    data = service.get_mcp(mcp_id, token.user_id)
    return {
        "code": 200,
        "msg": "success",
        "data": data
    }


@router.put("/{mcp_id}", response_model=BasicResponse)
async def update_mcp(mcp_id: int, req: UpsertMCPRequest, token: JWTData = Depends(validate_token)):
    """更新指定的 MCP"""
    service.update_mcp(mcp_id, user_id=token.user_id, **req.dict())
    return {
        "code": 200,
        "msg": "success"
    }