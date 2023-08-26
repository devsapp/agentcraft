"""Auth Config"""
import os
from pydantic import BaseSettings

class AuthConfig(BaseSettings):
    """Auth Config Class"""
    JWT_ALG: str = "HS256"
    JWT_SECRET: str =  os.environ.get('JWT_SECRET', '')
    JWT_EXP: int = 1  # days
    SECURE_COOKIES: bool = True


auth_config = AuthConfig()
