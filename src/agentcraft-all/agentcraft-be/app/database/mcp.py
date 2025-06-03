# mcp_service.py

from datetime import datetime, timedelta
from sqlalchemy import Integer, String, TIMESTAMP, ForeignKey, JSON 
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column
from app.database import postgresql



class MCP(postgresql.BaseModel):
    """MCP Model"""
    __tablename__ = "mcp"

    id = mapped_column(Integer, primary_key=True, index=True)
    name = mapped_column(String(255), nullable=False)
    project_name = mapped_column(String(255), nullable=True)
    description = mapped_column(String(255), nullable=True)  # 描述
    content = mapped_column(String(255), nullable=True)     # mcp 具体内容
    endpoint = mapped_column(String(255), nullable=False)   # mcp 服务地址
    icon = mapped_column(String(255), nullable=True)
    arn = mapped_column(String(255), nullable=True)        # mcp 云地址
    type = mapped_column(Integer, nullable=False, default=1)  # 1: sse, 2: stdio
    tools = mapped_column(JSON, nullable=True)
    template = mapped_column(String, nullable=True)
    user_id = mapped_column(ForeignKey("users.id", ondelete="cascade"))
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)



def add_mcp(**kwargs):
    """
    添加 MCP 记录
    :param kwargs: 字段参数
    :return: 新增记录的 ID
    """
    with Session(postgresql.postgres) as session:
        mcp = MCP(**kwargs)
        session.add(mcp)
        session.commit()
        return mcp.id


def get_mcp(mcp_id: int) -> dict:
    """
    获取单个 MCP 记录
    :param mcp_id: MCP ID
    :return: 字典格式的数据或 None
    """
    with Session(postgresql.postgres) as session:
        data = session.query(MCP).filter(MCP.id == mcp_id).first()
        return data.as_dict() if data else None


def list_mcp(user_id: int, page: int = 0, limit: int = 3000) -> tuple[list[dict], int]:
    """
    分页获取用户所有的 MCP 记录
    :param user_id: 用户 ID
    :param page: 当前页码
    :param limit: 每页数量
    :return: (记录列表, 总数)
    """
    with Session(postgresql.postgres) as session:
        query = session.query(MCP).filter(MCP.user_id == user_id)
        total = query.count()
        data = query.order_by(MCP.modified.desc()).offset(page * limit).limit(limit).all()
        return [item.as_dict() for item in data], total


def delete_mcp(mcp_id: int, user_id: int):
    """
    删除 MCP 记录
    :param mcp_id: MCP ID
    :param user_id: 用户 ID
    """
    with Session(postgresql.postgres) as session:
        session.query(MCP).filter(MCP.id == mcp_id, MCP.user_id == user_id).delete()
        session.commit()


def update_mcp(mcp_id: int, **kwargs):
    """
    更新 MCP 记录
    :param mcp_id: MCP ID
    :param kwargs: 要更新的字段和值
    """
    with Session(postgresql.postgres) as session:
        session.query(MCP).filter(MCP.id == mcp_id).update(kwargs)
        session.commit()