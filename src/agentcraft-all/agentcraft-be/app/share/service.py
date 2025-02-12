"""Share Service"""
from datetime import datetime, timedelta
import jwt
from app.agent import jwt_config
from app.auth.security import create_share_token
import app.database.user as database
from app.common.logger import logger
from app.database import agent as database


def get_user_info(user_id: int) -> dict[str, str]:
    """获取用户信息"""
    user = database.get_user_info(user_id)
    return {"username": user.username, "created": user.created}


def create_share(user_id: int, agent_id: int) -> dict[str, str]:
    """创建分享token"""
    token, exp = create_share_token(user_id, agent_id)
    return {"token": token, "exp": exp}



