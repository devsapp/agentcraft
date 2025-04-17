"""
CREATE TABLE assistant_chat (
    id BIGSERIAL PRIMARY KEY,
    ip VARCHAR(255) ,
    question TEXT NOT NULL,
    prompt TEXT,
    source TEXT,
    answer TEXT NOT NULL,
    answer_type INTEGER DEFAULT 1,
    reasoning_log TEXT,
    type INTEGER NOT NULL DEFAULT 1,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    modified TIMESTAMP NOT NULL DEFAULT NOW(),
    assistant_id BIGINT REFERENCES assistant(id) ON DELETE SET NULL,
    run_id BIGINT,
    model_id BIGINT REFERENCES model(id) ON DELETE SET NULL,
    model_name VARCHAR(255),
    uid VARCHAR(255) NOT NULL UNIQUE
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
    ip = mapped_column(String, nullable=True)
    question = mapped_column(String, nullable=False)
    prompt = mapped_column(String, nullable=True)
    source = mapped_column(String, nullable=True)
    answer = mapped_column(String, nullable=False)
    answer_type = mapped_column(Integer, default=0, nullable=False) # 1 assistant 2 function_call
    type = mapped_column(Integer, default=0, nullable=False)  # 0: not labeled, 1: positive, 2: negative
    reasoning_log = mapped_column(String, nullable=True) #推理日志
    assistant_id = mapped_column(ForeignKey("assistant.id", ondelete="setnull"), nullable=True)
    model_id = mapped_column(ForeignKey("model.id", ondelete="setnull"), nullable=True)
    run_id = mapped_column(Integer, nullable=True) #执行进程的id
    model_name = mapped_column(String, nullable=True)
    uid = mapped_column(String, nullable=False)
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now, nullable=False)
    prompt_tokens = mapped_column(Integer, nullable=True) # 入参使用的token
    completion_tokens = mapped_column(Integer, nullable=True) # 出参使用的token
    total_tokens = mapped_column(Integer, nullable=True) # token总量 


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
        data_dict = [item.as_dict() for item in data]
        return data_dict, total


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

def get_assistant_chat_lite(assistant_id: int) -> AssistantChat:
    """获取assistant_chat表信息"""
    with Session(postgresql.postgres) as session:
        data = session.query(AssistantChat).filter(AssistantChat.id == assistant_id).first()
        return data.as_dict()
