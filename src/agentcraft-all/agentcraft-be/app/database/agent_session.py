"""Session Table"""
# pylint: disable=not-callable
from sqlalchemy import Integer, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column
from app.database import postgresql


class AgentSession(postgresql.BaseModel):
    """AgentSession Model"""
    __tablename__ = "agent_session"

    id = mapped_column(Integer, primary_key=True)
    title = mapped_column(String, nullable=False)
    agent_id = mapped_column(ForeignKey("agent.id", ondelete="cascade"))
    share_id= mapped_column(String, nullable=True)
    status= mapped_column(Integer, default=0, nullable=False)  # 1: normal, 2: testing, 3: deleted  default 1
    fingerprint_id = mapped_column(String, nullable=False)
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)


def list_sessions(agent_id: int, page: int = 0, limit: int = 3000) -> tuple[list[Session], int]:
    """获取sessions列表"""
    with Session(postgresql.postgres) as session:
        data = session.query(AgentSession).filter(
            AgentSession.agent_id == agent_id).order_by(
            AgentSession.modified.desc()).offset(
            page * limit).limit(limit).all()
        total = session.query(AgentSession).filter(AgentSession.agent_id == agent_id).count()
        return [vars(session) for session in data], total

def get_test_session(agent_id: int) -> Session:
    """获取assistant 的测试 session"""
    with Session(postgresql.postgres) as session:
        return session.query(AgentSession).filter(
            AgentSession.agent_id == agent_id,
            AgentSession.status == 0).first()

def delete_session(sessions_id: int, user_id: int):
    """删除sessions"""
    with Session(postgresql.postgres) as session:
        session.query(AgentSession).filter(AgentSession.id == sessions_id, AgentSession.user_id == user_id).delete()
        session.commit()


def add_session(**kwargs):
    """添加sessions"""
    with Session(postgresql.postgres) as session:
        sessions = AgentSession(**kwargs)
        session.add(sessions)
        session.commit()
        return sessions.id


def get_session(sessions_id: int) -> Session:
    """获取sessions信息"""
    with Session(postgresql.postgres) as session:
        return session.query(AgentSession).filter(
            AgentSession.id == sessions_id).order_by(AgentSession.modified.desc()).first()


def update_session(sessions_id: int, **kwargs):
    """更新sessions信息"""
    with Session(postgresql.postgres) as session:
        session.query(AgentSession).filter(
            AgentSession.id == sessions_id).update(kwargs)
        session.commit()
