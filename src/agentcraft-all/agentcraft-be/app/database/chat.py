"""
CREATE TABLE chat (
    id bigserial PRIMARY KEY,
    ip TEXT NOT NULL,
    question TEXT NOT NULL,
	  prompt TEXT NOT NULL,
    answer TEXT NOT NULL,
    type INT NOT NULL,
    created TIMESTAMP NOT NULL,
    modified TIMESTAMP NOT NULL,
    agent_id bigint NOT NULL references agent(id),
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


class Chat(postgresql.BaseModel):
    """Chat Model"""
    __tablename__ = "chat"

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
    agent_id = mapped_column(ForeignKey("agent.id", ondelete="setnull"), nullable=True)
    model_id = mapped_column(ForeignKey("model.id", ondelete="setnull"), nullable=True)
    model_name = mapped_column(String, nullable=True)
    uid = mapped_column(String, nullable=False)
    prompt_tokens = mapped_column(Integer, nullable=True) # 入参使用的token
    completion_tokens = mapped_column(Integer, nullable=True) # 出参使用的token
    total_tokens = mapped_column(Integer, nullable=True) # token总量 


def list_chats(agent_id: int, day: int = 0,  page: int = 0, limit: int = 3000) -> tuple[list[Chat], int]:
    """列出问答历史记录"""
    with Session(postgresql.postgres) as session:
        data = None
        total = None
        if day == 0:
            data = session.query(Chat).filter(Chat.agent_id == agent_id, Chat.type < 3).order_by(
                Chat.id.desc()).offset(
                page * limit).limit(limit).all()
            total = session.query(Chat).filter(Chat.agent_id == agent_id, Chat.type < 3).count()
        else:
            data = session.query(Chat).filter(Chat.agent_id == agent_id, Chat.type < 3, Chat.created > (
                datetime.now() - timedelta(days=day))).order_by(Chat.id.desc()).offset(page * limit).limit(limit).all()
            total = session.query(Chat).filter(
                Chat.agent_id == agent_id, Chat.type < 3, Chat.created >
                (datetime.now() - timedelta(days=day))).count()
        data_dict = [item.as_dict() for item in data]
        return data_dict, total


def add_chat(**kwargs):
    """添加问答历史记录 """
    with Session(postgresql.postgres) as session:
        chat = Chat(**kwargs)
        session.add(chat)
        session.commit()
        session.refresh(chat)
        return chat.id


def update_chat(uid: str, agent_id: int, ip_addr: str, **kwargs):
    """更新问答历史记录 """
    with Session(postgresql.postgres) as session:
        session.query(Chat).filter(Chat.uid == uid, Chat.agent_id ==
                                   agent_id, Chat.ip == ip_addr).update(kwargs)
        session.commit()

def get_chat_lite(agent_id: int) -> Chat:
    """获取chat表信息"""
    with Session(postgresql.postgres) as session:
        data = session.query(Chat).filter(Chat.id == agent_id).first()
        return data.as_dict()
