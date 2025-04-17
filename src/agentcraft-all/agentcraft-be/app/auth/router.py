"""Auth Router"""
import json
from fastapi import APIRouter, Depends, HTTPException, status
from app.auth import service
from app.common.schema import BasicResponse, DictResponse
from fastapi.security import OAuth2PasswordRequestForm
from app.auth.security import validate_token
from app.auth.schema import AuthUser, JWTData, LoginResponse, RegisterResponse

router = APIRouter()



@router.post("/login", status_code=status.HTTP_200_OK, response_model=LoginResponse)
async def login(
    auth_data: OAuth2PasswordRequestForm = Depends(),
) -> dict[str, str]:
    """登录"""
    token = service.login(auth_data.username, auth_data.password)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"access_token": token, "token_type": "bearer"}


@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=RegisterResponse)
async def register(
    auth_data: AuthUser,
) -> dict[str, str]:
    """注册"""
    create_success = service.create_user(auth_data)
    if(create_success):
        token = service.login(auth_data.username, auth_data.password)
        return {"access_token": token, "token_type": "bearer"}
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists",
        )


@router.get("/info", response_model=DictResponse)
async def get_user_info(
    token: JWTData = Depends(validate_token),
) -> dict[str, str]:
    """获取用户信息"""
    data = service.get_user_info(token.user_id)
    return {"code": 200, "msg": "success", "data": data}
