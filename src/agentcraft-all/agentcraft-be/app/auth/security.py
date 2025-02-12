"""Auth Security"""
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException
from starlette.status import HTTP_401_UNAUTHORIZED
from fastapi.security import OAuth2PasswordBearer
import jwt
import bcrypt
from app.auth.config import auth_config
from app.agent import jwt_config
from app.auth.schema import JWTData, AgentJWTData
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


class JWTException(HTTPException):
    def __init__(self, detail: str):
        super().__init__(status_code=HTTP_401_UNAUTHORIZED, detail=detail)


def hash_password(password: str) -> bytes:
    """Hash Password"""
    return bcrypt.hashpw(bytes(password, "utf-8"), bcrypt.gensalt())


def check_password(password: str, password_in_db: bytes) -> bool:
    """Check Password"""
    password_bytes = bytes(password, "utf-8")
    return bcrypt.checkpw(password_bytes, password_in_db)


def create_access_token(
    user_id: int,
    expires_delta: timedelta = timedelta(days=auth_config.JWT_EXP),
) -> str:
    """Create Access Token"""
    jwt_data = {"sub": user_id, "exp": datetime.utcnow() + expires_delta}
    return jwt.encode(jwt_data, auth_config.JWT_SECRET, algorithm=auth_config.JWT_ALG)


def create_share_token(
    user_id: int,
    agent_id: str,
    expires_delta: timedelta = timedelta(days=jwt_config.JWT_EXP),
) -> str:
    """Create Share Token"""
    author_token = create_access_token(user_id,timedelta(days=jwt_config.JWT_EXP))
    jwt_data = {"at": agent_id, "sub": author_token,
                "exp": datetime.utcnow() + expires_delta}
    return jwt.encode(jwt_data, auth_config.JWT_SECRET, algorithm=auth_config.JWT_ALG),expires_delta


async def validate_token(
    token: str = Depends(oauth2_scheme),
) -> JWTData | None:
    """Validate Token with User ID"""
    if not token:
        return None
    try:
        payload = jwt.decode(token, auth_config.JWT_SECRET,
                             algorithms=[auth_config.JWT_ALG])
    except jwt.DecodeError as jwt_error:
        raise JWTException(detail="Invalid token") from jwt_error
    except jwt.ExpiredSignatureError as jwt_error:
        raise JWTException(detail="Token expired") from jwt_error
    return JWTData(**payload)


async def validate_agent_token(
    token: str = Depends(oauth2_scheme),
) -> JWTData | None:
    """Validate Token with Agent ID"""
    if not token:
        return None
    try:
        payload = jwt.decode(token, auth_config.JWT_SECRET,
                             algorithms=[auth_config.JWT_ALG])
    except jwt.DecodeError as jwt_error:
        raise JWTException(detail="Invalid token") from jwt_error
    except jwt.ExpiredSignatureError as jwt_error:
        raise JWTException(detail="Token expired") from jwt_error
    return AgentJWTData(**payload)
