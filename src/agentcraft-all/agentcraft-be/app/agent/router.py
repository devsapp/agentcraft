"""Agent Router"""
from fastapi import APIRouter, Depends
from app.agent import service
from app.auth.schema import JWTData
from app.common.schema import BasicResponse, DictResponse, DictListResponse
from app.agent.schema import UpsertAgentRequest, UpdateIsPublicRequest
from app.auth.security import validate_token
router = APIRouter()

# 公开agent 后无需进行登录验证
@router.get("/public/{agent_id}", response_model=DictResponse)
async def get_public_agent_streamline_info(agent_id: int):
    """获取agent信息"""
    return {
        "code": 200,
        "msg": "success",
        "data": service.get_public_agent_streamline_info(agent_id)
    }


@router.get("/list/{app_id}", response_model=DictListResponse)
async def list_agents(app_id: int, page: int, limit: int, token: JWTData = Depends(validate_token)):
    """获取agent列表"""
    data, total = service.list_agents(app_id, token.user_id, page, limit)
    return {
        "code": 200,
        "msg": "success",
        "data": data,
        "total": total,
    }


@router.post('/add', response_model=DictResponse)
async def add_agent(req: UpsertAgentRequest, token: JWTData = Depends(validate_token)):
    """添加agent"""
    id = service.add_agent(user_id=token.user_id, **vars(req))
    return {
        "code": 201,
        "data": {
            "id": id
        },
        "msg": "success",
    }


@router.get('/refresh/{agent_id}', response_model=DictResponse)
async def refresh_token(agent_id: int, token: JWTData = Depends(validate_token)):
    """更新token"""
    token = service.refresh_token(token.user_id, agent_id)
    return {
        "code": 200,
        "msg": "success",
        "data": token
    }


@router.get("/{agent_id}", response_model=DictResponse)
async def get_agent(agent_id: int, token: JWTData = Depends(validate_token)):
    """获取agent信息"""
    return {
        "code": 200,
        "msg": "success",
        "data": service.get_agent(agent_id, token.user_id)
    }

@router.put("/{agent_id}", response_model=BasicResponse)
async def update_agent(agent_id: int, req: UpsertAgentRequest, token: JWTData = Depends(validate_token)):
    """更新agent信息"""
    service.update_agent(agent_id=agent_id, user_id=token.user_id, **vars(req))
    return {
        "code": 200,
        "msg": "success",
    }

@router.put("/public/{agent_id}", response_model=BasicResponse)
async def update_agent_is_public(agent_id: int, req: UpdateIsPublicRequest, token: JWTData = Depends(validate_token)):
    """更新agent信息"""
    service.update_agent_is_public(agent_id=agent_id, user_id=token.user_id, **vars(req))
    return {
        "code": 200,
        "msg": "success",
    }

@router.delete("/{agent_id}", response_model=BasicResponse)
async def delete_agent(agent_id: int, token: JWTData = Depends(validate_token)):
    """删除agent"""
    service.delete_agent(agent_id, token.user_id)
    return {
        "code": 200,
        "msg": "success",
    }
