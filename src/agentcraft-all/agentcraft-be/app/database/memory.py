"""Memory Table"""
# pylint: disable=not-callable
from sqlalchemy import Integer, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column
from app.database import postgresql


class Memory(postgresql.BaseModel):
    """Memory Model"""
    __tablename__ = "memory"

    id = mapped_column(String, primary_key=True)
    name = mapped_column(String, nullable=False)
    description = mapped_column(String, nullable=False)
    content = mapped_column(String, nullable=False)
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)
    agent_id = mapped_column(ForeignKey("agent.id", ondelete="cascade"))


def list_memorys(agent_id: int, page: int = 0, limit: int = 3000) -> tuple[list[Memory], int]:
    """获取memory列表"""
    with Session(postgresql.postgres) as session:
        data = session.query(Memory).filter(
            Memory.agent_id == agent_id).order_by(
            Memory.modified.desc()).offset(
            page * limit).limit(limit).all()
        total = session.query(Memory).filter(Memory.agent_id == agent_id).count()
        data_dict = [item.as_dict() for item in data]
        return data_dict, total


def delete_memory(memory_id: int, user_id: int):
    """删除memory"""
    with Session(postgresql.postgres) as session:
        session.query(Memory).filter(Memory.id == memory_id, Memory.user_id == user_id).delete()
        session.commit()


def add_memory(**kwargs):
    """添加memory"""
    with Session(postgresql.postgres) as session:
        memory = Memory(**kwargs)
        session.add(memory)
        session.commit()
        return memory.id


def get_memory(memory_id: int) -> Memory:
    """获取memory信息"""
    with Session(postgresql.postgres) as session:
        data = session.query(Memory).filter(
            Memory.id == memory_id).order_by(Memory.modified.desc()).first()
        return data.as_dict()


def update_memory(memory_id: int, **kwargs):
    """更新memory信息"""
    with Session(postgresql.postgres) as session:
        session.query(Memory).filter(
            Memory.id == memory_id).update(kwargs)
        session.commit()
