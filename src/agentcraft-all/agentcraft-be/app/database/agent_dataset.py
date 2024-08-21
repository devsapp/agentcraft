"""Agent to Dataset Relationship Table"""
# pylint: disable=not-callable
from typing import Any
from sqlalchemy import Integer, TIMESTAMP, ForeignKey, text
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column, relationship
from app.database import postgresql
from app.database.dataset import Dataset
from app.common.logger import logger


class AgentDataset(postgresql.BaseModel):
    """Agent Dataset Relationship Model"""
    __tablename__ = "agent_dataset"

    id = mapped_column(Integer, primary_key=True, index=True)
    agent_id = mapped_column(ForeignKey("agent.id", ondelete='cascade'))
    dataset_id = mapped_column(ForeignKey("dataset.id", ondelete='cascade'))
    dataset_type = mapped_column(Integer, nullable=False) # 1 文档数据集    2 问答数据集
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)
    datasets = relationship("Dataset")


def list_datasets_by_agent_id(
        agent_id: int, page: int = 0, limit: int = 3000) -> list[Any]:
    """根据agent id获取数据集"""
    with Session(postgresql.postgres) as session:
        return session.query(
            AgentDataset, Dataset.name).filter(
            AgentDataset.agent_id == agent_id).join(
            AgentDataset.datasets).offset(page*limit).limit(limit).all()


def bulk_insert(agent_id: int, exact_datasets: list[int], fuzzy_datasets: list[int]):
    """批量插入"""
    with Session(postgresql.postgres) as session:
        agent_datasets = [
            AgentDataset(
                agent_id=agent_id, dataset_id=dataset_id, dataset_type=1)
            for dataset_id in exact_datasets]+[
            AgentDataset(
                agent_id=agent_id, dataset_id=dataset_id, dataset_type=2)
            for dataset_id in fuzzy_datasets
        ]
        session.add_all(agent_datasets)
        session.commit()


def insert_agent_datasets(agent_id: int, datasets: list[int]):
    """根据agent id插入数据集"""
    with Session(postgresql.postgres) as session:
        agent_datasets = [
            AgentDataset(agent_id=agent_id, dataset_id=dataset_id)
            for dataset_id in datasets]
        session.add_all(agent_datasets)
        session.commit()


def exact_seach(
        agent_id: int,
        embedding: list[float],
        exact_search_similarity: float,
        exact_search_limit: int) -> tuple[list, bool]:
    """向量知识库相似度搜索"""
    with Session(postgresql.postgres) as session:
        exact_datasets = session.query(AgentDataset.dataset_id).filter(
            AgentDataset.agent_id == agent_id, AgentDataset.dataset_type == 1).all()
        if exact_datasets:
            exact_similarity_search_sql = f'''
            SELECT doc_chunk, title, url, 1 - (embedding <=> '{embedding}') AS similarity 
            FROM question WHERE ({" OR ".join([f"tag={dataset.dataset_id}" for dataset in exact_datasets])}) AND 1 - (embedding <=> '{embedding}') >= {exact_search_similarity}
            ORDER BY similarity DESC LIMIT {exact_search_limit};
            '''
            exact_similarity_search_res = session.execute(text(exact_similarity_search_sql)).all()
            return exact_similarity_search_res or [], True
        return [], False


def similarity_search(
        agent_id: int,
        embedding: list[float],
        fuzzy_search_similarity: float,
        fuzzy_search_limit: int) -> tuple[list, bool]:
    """向量知识库相似度搜索"""
    with Session(postgresql.postgres) as session:
        fuzzy_datasets = session.query(AgentDataset.dataset_id).filter(
            AgentDataset.agent_id == agent_id, AgentDataset.dataset_type == 2).all()
        if fuzzy_datasets:
            fuzzy_similarity_search_sql = f'''
            SELECT title, url, doc_chunk, chunk_idx, 1 - (embedding <=> '{embedding}') AS similarity 
            FROM document WHERE ({" OR ".join([f"tag={dataset.dataset_id}" for dataset in fuzzy_datasets])}) AND 1 - (embedding <=> '{embedding}') > {fuzzy_search_similarity}
            ORDER BY similarity DESC LIMIT {fuzzy_search_limit};
            '''
            fuzzy_similarity_search_res = session.execute(text(fuzzy_similarity_search_sql)).all()
            if fuzzy_similarity_search_res:
                return fuzzy_similarity_search_res, True
        return [], False
