# agentic_app_service.py

# pylint: disable=not-callable
from datetime import datetime, timedelta
from sqlalchemy import Integer, String, TIMESTAMP, ForeignKey, JSON 
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column
from app.database import postgresql


# 定义模型
class AgenticApp(postgresql.BaseModel):
    """AgenticApp Model"""
    __tablename__ = "agentic_app"

    id = mapped_column(Integer, primary_key=True, index=True)
    name = mapped_column(String(255), nullable=False)
    project_name = mapped_column(String(255), nullable=False)
    description = mapped_column(String, nullable=True)
    template = mapped_column(String(255), nullable=True)  # COMMENT '创建模板'
    domain = mapped_column(String(255), nullable=True)     # COMMENT '访问域名'
    endpoint = mapped_column(String(255), nullable=True)   # COMMENT '访问服务端点'
    icon = mapped_column(String(255), nullable=True)
    phase = mapped_column(String(255), nullable=False)  # COMMENT '应用状态'
    config = mapped_column(JSON, nullable=True)            # COMMENT '应用配置'
    user_id = mapped_column(ForeignKey("users.id", ondelete="cascade"))
    workspace_id = mapped_column(ForeignKey("app.id", ondelete="cascade"))
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)



# 添加记录
def add_agentic_app(**kwargs):
    """
    添加一个新的 AgenticApp 记录
    :param kwargs: 模型字段参数
    :return: 新增记录的 ID
    """
    print(kwargs,'kwargs')
    with Session(postgresql.postgres) as session:
        app = AgenticApp(**kwargs)
        session.add(app)
        session.commit()
        return app.id


# 获取单条记录
def get_agentic_app(app_id: int) -> dict:
    """
    根据 ID 获取 AgenticApp 记录
    :param app_id: 应用 ID
    :return: 字典格式的记录数据或 None
    """
    with Session(postgresql.postgres) as session:
        data = session.query(AgenticApp).filter(AgenticApp.id == app_id).one()
        return data.as_dict()


# 分页查询列表
def list_agentic_apps(user_id: int, page: int = 0, limit: int = 3000) -> tuple[list[dict], int]:
    """
    分页获取用户的所有 AgenticApp 记录
    :param user_id: 用户 ID
    :param page: 当前页码
    :param limit: 每页数量
    :return: (记录列表, 总数)
    """
    with Session(postgresql.postgres) as session:
        query = session.query(AgenticApp).filter(AgenticApp.user_id == user_id)
        total = query.count()
        apps = query.order_by(AgenticApp.modified.desc()).offset(page * limit).limit(limit).all()
        return [app.as_dict() for app in apps], total


# 删除记录
def delete_agentic_app(app_id: int, user_id: int):
    """
    根据 ID 和 用户ID 删除 AgenticApp 记录
    :param app_id: 应用 ID
    :param user_id: 用户 ID
    """
    with Session(postgresql.postgres) as session:
        session.query(AgenticApp).filter(
            AgenticApp.id == app_id,
            AgenticApp.user_id == user_id
        ).delete()
        session.commit()


# 更新记录
def update_agentic_app(app_id: int, **kwargs):
    """
    更新 AgenticApp 记录
    :param app_id: 应用 ID
    :param kwargs: 要更新的字段和值
    """
    with Session(postgresql.postgres) as session:
        session.query(AgenticApp).filter(AgenticApp.id == app_id).update(kwargs)
        session.commit()