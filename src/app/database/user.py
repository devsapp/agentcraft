"""User Table"""
# pylint: disable=not-callable
from sqlalchemy import Integer, String, BINARY, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column
from app.database import postgresql


class User(postgresql.BaseModel):
    """User Model"""
    __tablename__ = "users"

    id = mapped_column(Integer, primary_key=True, index=True)
    username = mapped_column(String, unique=True, index=True)
    password = mapped_column(BINARY, nullable=False)
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)


def create_user(username: str, password: bytes) -> User:
    """创建用户"""
    user = User(username=username, password=password)
    with Session(postgresql.postgres) as session:
        session.add(user)
        session.commit()
    return user


def login_user(username: str) -> User:
    """用户登录"""
    with Session(postgresql.postgres) as session:
        return session.query(User).filter(User.username == username).first()


def get_user_info(user_id: int) -> User:
    """获取用户信息"""
    with Session(postgresql.postgres) as session:
        user = session.query(User.username, User.created).filter(User.id == user_id).first()
        return user
