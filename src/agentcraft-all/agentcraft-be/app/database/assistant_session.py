"""Session Table"""
# pylint: disable=not-callable
from sqlalchemy import Integer, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column
from app.database import postgresql


class AssistantSession(postgresql.BaseModel):
    """AssistantSession Model"""
    __tablename__ = "assistant_session"

    id = mapped_column(Integer, primary_key=True)
    title = mapped_column(String, nullable=False)
    keyword= mapped_column(String, nullable=False)
    assistant_id = mapped_column(ForeignKey("assistant.id", ondelete="cascade"))
    share_id= mapped_column(String, nullable=True)
    status= mapped_column(Integer, default=1, nullable=False)  # 1: normal, 2: deleted  default 1
    fingerprint_id = mapped_column(String, nullable=False)
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)



def list_sessions(assistant_id: int, page: int = 0, limit: int = 3000) -> tuple[list[Session], int]:
    """获取sessions列表"""
    with Session(postgresql.postgres) as session:
        data = session.query(AssistantSession).filter(
            AssistantSession.assistant_id == assistant_id,
            AssistantSession.status == 1).order_by(
            AssistantSession.modified.desc()).offset(
            page * limit).limit(limit).all()
        total = session.query(AssistantSession).filter(AssistantSession.assistant_id == assistant_id).count()
        return [vars(session) for session in data], total


def get_session_by_assistant_id_and_keyword(assistant_id: int, keyword: str, status: int = 1) -> Session:
    """获取assistant 的测试 session"""
    with Session(postgresql.postgres) as session:
        data = session.query(AssistantSession).filter(
            AssistantSession.assistant_id == assistant_id,
            AssistantSession.status == status,
            AssistantSession.keyword == keyword).first()
        if data is not None:
            return vars(data)
        return data


def delete_session(sessions_id: int, user_id: int):
    """删除sessions"""
    with Session(postgresql.postgres) as session:
        session.query(AssistantSession).filter(AssistantSession.id == sessions_id, AssistantSession.user_id == user_id).delete()
        session.commit()


def add_session(**kwargs):
    """添加sessions"""
    with Session(postgresql.postgres) as session:
        sessions = AssistantSession(**kwargs)
        session.add(sessions)
        session.commit()
        return sessions.id


def get_session(sessions_id: int, status: int = 1) -> Session:
    """获取sessions信息"""
    with Session(postgresql.postgres) as session:
        data = session.query(AssistantSession).filter(
            AssistantSession.id == sessions_id,
            AssistantSession.status == status).order_by(AssistantSession.modified.desc()).first()
        if data is not None:
            return vars(data)
        return data


def update_session(sessions_id: int, **kwargs):
    """更新sessions信息"""
    with Session(postgresql.postgres) as session:
        session.query(AssistantSession).filter(
            AssistantSession.id == sessions_id).update(kwargs)
        session.commit()
