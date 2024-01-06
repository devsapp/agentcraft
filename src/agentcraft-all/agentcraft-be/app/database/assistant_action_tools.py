"""Assistant to ActionTools Relationship Table"""
# pylint: disable=not-callable
from typing import Any
from sqlalchemy import Integer, TIMESTAMP, ForeignKey, text
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column, relationship
from app.database import postgresql
from app.database.action_tools import ActionTools


class AssistantActionTools(postgresql.BaseModel):
    """Assistant ActionTools Relationship Model"""
    __tablename__ = "assistant_action_tools"

    id = mapped_column(Integer, primary_key=True, index=True)
    assistant_id = mapped_column(ForeignKey("assistant.id", ondelete='cascade'))
    action_tools_id = mapped_column(ForeignKey("action_tools.id", ondelete='cascade'))
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)
    action_tools = relationship("ActionTools")


def list_action_tools_by_assistant_id(
        assistant_id: int, page: int = 0, limit: int = 3000) -> list[Any]:
    """根据assistant id获取 action_tools"""
    with Session(postgresql.postgres) as session:
        return session.query(
            ActionTools).filter(
            AssistantActionTools.assistant_id == assistant_id).join(
            AssistantActionTools.action_tools).offset(page*limit).limit(limit).all()


def bulk_insert(assistant_id: int, action_tools: list[int]):
    """批量插入"""
    with Session(postgresql.postgres) as session:
        assistant_action_tools = [
            AssistantActionTools(
                assistant_id=assistant_id, action_tools_id=action_tools_id)
            for action_tools_id in action_tools]
        session.add_all(assistant_action_tools)
        session.commit()


def insert_assistant_action_tools(assistant_id: int, action_tools: list[int]):
    """根据assistant id插入action_tool"""
    with Session(postgresql.postgres) as session:
        assistant_action_tools = [
            AssistantActionTools(assistant_id=assistant_id, action_tools_id=action_tools_id)
            for action_tools_id in action_tools]
        session.add_all(assistant_action_tools)
        session.commit()



