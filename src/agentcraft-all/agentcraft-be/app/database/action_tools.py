"""ActionTools Table"""
# pylint: disable=not-callable
from sqlalchemy import Integer, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column
from app.database import postgresql


class ActionTools(postgresql.BaseModel):
    """ActionTools Model"""
    __tablename__ = "action_tools"

    id = mapped_column(Integer, primary_key=True, index=True)
    name = mapped_column(String, nullable=False)
    alias= mapped_column(String, nullable=True)
    description = mapped_column(String, nullable=False)
    input_schema = mapped_column(String, nullable=False)
    output_schema = mapped_column(String, nullable=True)
    type =  mapped_column(Integer, nullable=False)
    proxy_url = mapped_column(String, nullable=True)
    author = mapped_column(String, nullable=True)
    status = mapped_column(Integer, nullable=False)
    user_id = mapped_column(ForeignKey("users.id", ondelete="cascade"))
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)
   


def list_action_tools(user_id: int, page: int = 0, limit: int = 3000) -> tuple[list[ActionTools], int]:
    """获取action_tools列表"""
    with Session(postgresql.postgres) as session:
        data = session.query(ActionTools).filter(
            ActionTools.user_id == user_id).order_by(
            ActionTools.modified.desc()).offset(
            page * limit).limit(limit).all()
        total = session.query(ActionTools).filter(ActionTools.user_id == user_id).count()
        return data, total


def delete_action_tools(action_tools_id: int, user_id: int):
    """删除action_tools"""
    with Session(postgresql.postgres) as session:
        session.query(ActionTools).filter(ActionTools.id == action_tools_id, ActionTools.user_id == user_id).delete()
        session.commit()


def add_action_tools(**kwargs):
    """添加action_tools"""
    with Session(postgresql.postgres) as session:
        print(f"kwargs{kwargs}")
        action_tools = ActionTools(**kwargs)
        session.add(action_tools)
        session.commit()
        return action_tools.id


def get_action_tools(action_tools_id: int) -> ActionTools:
    """获取action_tools信息"""
    with Session(postgresql.postgres) as session:
        return session.query(ActionTools).filter(
            ActionTools.id == action_tools_id).order_by(ActionTools.modified.desc()).first()


def update_action_tools(action_tools_id: int, **kwargs):
    """更新action_tools信息"""
    with Session(postgresql.postgres) as session:
        session.query(ActionTools).filter(
            ActionTools.id == action_tools_id).update(kwargs)
        session.commit()
