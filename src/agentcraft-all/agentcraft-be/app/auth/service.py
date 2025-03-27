"""Auth Service"""
from app.auth.schema import AuthUser
from app.auth.security import check_password, hash_password, create_access_token
import app.database.user as database
from app.common.logger import logger


def login(username: str, password: str) -> str | None:
    """登录"""
    user = database.login_user(username)
    if not user:
        logger.info('User not found')
        return None
    if not check_password(password, user.password):
        logger.info('Password not match')
        return None
    return create_access_token(user.id)


def create_user(user: AuthUser) -> bool:
    """创建用户"""
    database.create_user(user.username, hash_password(user.password))
    return True


def get_user_info(user_id: int) -> dict[str, str]:
    """获取用户信息"""
    user = database.get_user_info(user_id)
    return {"username": user.username, "created": int(user.created.timestamp())}
