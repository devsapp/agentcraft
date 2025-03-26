"""Auth Router"""
from fastapi import APIRouter, Depends, HTTPException, status
from app.share import service
from app.common.schema import BasicResponse, DictResponse
from fastapi.security import OAuth2PasswordRequestForm
from app.auth.security import validate_token
from app.auth.schema import AuthUser, JWTData, LoginResponse, RegisterResponse

router = APIRouter()



@router.get('/refresh_share/{agent_id}', response_model=DictResponse)
async def refresh_share_token(agent_id: int, token: JWTData = Depends(validate_token)):
    """更新token"""
    token = service.create_share(token.user_id, agent_id)
    return {
        "code": 200,
        "msg": "success",
        "data": token
    }


