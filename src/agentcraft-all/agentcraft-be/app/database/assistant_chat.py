"""
CREATE TABLE assistant_chat (
    id bigserial PRIMARY KEY,
    ip TEXT NOT NULL,
    question TEXT NOT NULL,
	  prompt TEXT NOT NULL,
    answer TEXT NOT NULL,
    type INT NOT NULL,
    created TIMESTAMP NOT NULL,
    modified TIMESTAMP NOT NULL,
    assistant_id bigint NOT NULL references assistant(id),
    model_id INT NOT NULL references model(id),
    model_name TEXT
)
"""
# pylint: disable=not-callable
from datetime import datetime, timedelta
from sqlalchemy import Integer, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column
from app.database import postgresql


class AssistantChat(postgresql.BaseModel):
    """AssistantAssistantChat Model"""
    __tablename__ = "assistant_chat"

    id = mapped_column(Integer, primary_key=True, index=True)
    ip = mapped_column(String, nullable=False)
    question = mapped_column(String, nullable=False)
    prompt = mapped_column(String, nullable=False)
    source = mapped_column(String, nullable=False)
    answer = mapped_column(String, nullable=False)
    # 0: not labeled, 1: positive, 2: negative
    type = mapped_column(Integer, default=0, nullable=False)
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now, nullable=False)
    assistant_id = mapped_column(ForeignKey("assistant.id", ondelete="setnull"), nullable=True)
    model_id = mapped_column(ForeignKey("model.id", ondelete="setnull"), nullable=True)
    model_name = mapped_column(String, nullable=True)
    uid = mapped_column(String, nullable=False)


def list_chats(assistant_id: int, day: int = 0,  page: int = 0, limit: int = 3000) -> tuple[list[AssistantChat], int]:
    """列出问答历史记录"""
    with Session(postgresql.postgres) as session:
        data = None
        total = None
        if day == 0:
            data = session.query(AssistantChat).filter(AssistantChat.assistant_id == assistant_id, AssistantChat.type < 3).order_by(
                AssistantChat.id.desc()).offset(
                page * limit).limit(limit).all()
            total = session.query(AssistantChat).filter(AssistantChat.assistant_id == assistant_id, AssistantChat.type < 3).count()
        else:
            data = session.query(AssistantChat).filter(AssistantChat.assistant_id == assistant_id, AssistantChat.type < 3, AssistantChat.created > (
                datetime.now() - timedelta(days=day))).order_by(AssistantChat.id.desc()).offset(page * limit).limit(limit).all()
            total = session.query(AssistantChat).filter(
                AssistantChat.assistant_id == assistant_id, AssistantChat.type < 3, AssistantChat.created >
                (datetime.now() - timedelta(days=day))).count()
        return data, total


def add_chat(**kwargs):
    """添加问答历史记录 """
    with Session(postgresql.postgres) as session:
        chat = AssistantChat(**kwargs)
        session.add(chat)
        session.commit()
        session.refresh(chat)
        return chat.id


def update_chat(uid: str, assistant_id: int, ip_addr: str, **kwargs):
    """更新问答历史记录 """
    with Session(postgresql.postgres) as session:
        session.query(AssistantChat).filter(AssistantChat.uid == uid, AssistantChat.assistant_id ==
                                   assistant_id, AssistantChat.ip == ip_addr).update(kwargs)
        session.commit()
