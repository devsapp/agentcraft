"""Agent to Dataset Relationship Table"""
# pylint: disable=not-callable
from typing import Any
from sqlalchemy import Integer, TIMESTAMP, ForeignKey, text
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column, relationship
from app.database import postgresql
from app.database.chat import Chat


class AgentSessionChat(postgresql.BaseModel):
    """AgentSession Chat Relationship Model"""
    __tablename__ = "agent_session_chat"

    id = mapped_column(Integer, primary_key=True, index=True)
    agent_session_id = mapped_column(ForeignKey("agent_session.id", ondelete='cascade'))
    chat_id = mapped_column(ForeignKey("chat.id", ondelete='cascade'))
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)
    chat = relationship("Chat")



def list_chats_by_session_id(
        agent_session_id: int, page: int = 0, limit: int = 3000) -> list[Any]:
    """根据agent id获取数据集"""
    with Session(postgresql.postgres) as session:
        return session.query(
            AgentSessionChat, Chat.prompt).filter(
            AgentSessionChat.agent_session_id == agent_session_id).join(
            AgentSessionChat.chat).offset(page*limit).limit(limit).all()


def bulk_insert(agent_session_id: int, exact_chats: list[int], fuzzy_chats: list[int]):
    """批量插入"""
    with Session(postgresql.postgres) as session:
        agent_chats = [
            AgentSessionChat(
                agent_session_id=agent_session_id, chat_id=chat_id, dataset_type=1)
            for chat_id in exact_chats]+[
            AgentSessionChat(
                agent_session_id=agent_session_id, chat_id=chat_id, dataset_type=2)
            for chat_id in fuzzy_chats
        ]
        session.add_all(agent_chats)
        session.commit()


def insert_agent_session_chats(agent_session_id: int, chats: list[int]):
    """根据agent sessionid插入chat"""
    with Session(postgresql.postgres) as session:
        agent_session_chats = [
            AgentSessionChat(agent_session_id=agent_session_id, chat_id=chat_id)
            for chat_id in chats]
        session.add_all(agent_session_chats)
        session.commit()


