"""Assistant to Dataset Relationship Table"""
# pylint: disable=not-callable
from typing import Any
from sqlalchemy import Integer, TIMESTAMP, ForeignKey, text
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column, relationship
from app.database import postgresql
from app.database.chat import Chat


class AssistantSessionChat(postgresql.BaseModel):
    """AssistantSession Chat Relationship Model"""
    __tablename__ = "assistant_session_chat"

    id = mapped_column(Integer, primary_key=True, index=True)
    assistant_session_id = mapped_column(ForeignKey("assistant_session.id", ondelete='cascade'))
    chat_id = mapped_column(ForeignKey("chat.id", ondelete='cascade'))
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)
    chat = relationship("Chat")


def list_assistant_session_chat_id_by_session_id(
        assistant_session_id: int, page: int = 0, limit: int = 20) -> list[Any]:
    """根据assistant id获取数据集"""
    with Session(postgresql.postgres) as session:
        data = session.query(AssistantSessionChat).filter(
            AssistantSessionChat.assistant_session_id == assistant_session_id).order_by(
                AssistantSessionChat.id.desc()
            ).offset(page*limit).limit(limit).all()
        total = session.query(AssistantSessionChat).filter(
            AssistantSessionChat.assistant_session_id == assistant_session_id).count()
        sorted_data = sorted([vars(chat) for chat in data], key=lambda x: x['id'], reverse=True)
        return sorted_data, total


def bulk_insert(assistant_session_id: int, exact_chats: list[int], fuzzy_chats: list[int]):
    """批量插入"""
    with Session(postgresql.postgres) as session:
        assistant_chats = [
            AssistantSessionChat(
                assistant_session_id=assistant_session_id, chat_id=chat_id, dataset_type=1)
            for chat_id in exact_chats]+[
            AssistantSessionChat(
                assistant_session_id=assistant_session_id, chat_id=chat_id, dataset_type=2)
            for chat_id in fuzzy_chats
        ]
        session.add_all(assistant_chats)
        session.commit()


def insert_assistant_session_chats(assistant_session_id: int, chats: list[int]):
    """根据assistant sessionid插入chat"""
    with Session(postgresql.postgres) as session:
        assistant_session_chats = [
            AssistantSessionChat(assistant_session_id=assistant_session_id, chat_id=chat_id)
            for chat_id in chats]
        session.add_all(assistant_session_chats)
        session.commit()


