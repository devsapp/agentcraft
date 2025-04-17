"""Assistant to Dataset Relationship Table"""
# pylint: disable=not-callable
from typing import Any
from sqlalchemy import Integer, TIMESTAMP, ForeignKey, text
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column, relationship
from app.database import postgresql
from app.database.dataset import Dataset


class AssistantDataset(postgresql.BaseModel):
    """Assistant Dataset Relationship Model"""
    __tablename__ = "assistant_dataset"

    id = mapped_column(Integer, primary_key=True, index=True)
    assistant_id = mapped_column(ForeignKey("assistant.id", ondelete='cascade'))
    dataset_id = mapped_column(ForeignKey("dataset.id", ondelete='cascade'))
    dataset_type = mapped_column(Integer, nullable=False)
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)
    datasets = relationship("Dataset")


def list_datasets_by_assistant_id(
        assistant_id: int, page: int = 0, limit: int = 3000) -> list[Any]:
    """根据assistant id获取数据集"""
    with Session(postgresql.postgres) as session:
        data = session.query(
            AssistantDataset, Dataset.name).filter(
            AssistantDataset.assistant_id == assistant_id).join(
            AssistantDataset.datasets).offset(page*limit).limit(limit).all()
        data_dict = [item.as_dict() for item in data]
        return data_dict


def bulk_insert(assistant_id: int, exact_datasets: list[int], fuzzy_datasets: list[int]):
    """批量插入"""
    with Session(postgresql.postgres) as session:
        assistant_datasets = [
            AssistantDataset(
                assistant_id=assistant_id, dataset_id=dataset_id, dataset_type=1)
            for dataset_id in exact_datasets]+[
            AssistantDataset(
                assistant_id=assistant_id, dataset_id=dataset_id, dataset_type=2)
            for dataset_id in fuzzy_datasets
        ]
        session.add_all(assistant_datasets)
        session.commit()


def insert_assistant_datasets(assistant_id: int, datasets: list[int]):
    """根据assistant id插入数据集"""
    with Session(postgresql.postgres) as session:
        assistant_datasets = [
            AssistantDataset(assistant_id=assistant_id, dataset_id=dataset_id)
            for dataset_id in datasets]
        session.add_all(assistant_datasets)
        session.commit()


def similarity_search(
        assistant_id: int, embedding: list[float],
        exact_search_similarity: float, fuzzy_search_similarity: float, exact_search_limit: int,
        fuzzy_search_limit: int) -> tuple[list, bool]:
    """相似度搜索"""
    with Session(postgresql.postgres) as session:
        exact_datasets = session.query(AssistantDataset.dataset_id).filter(
            AssistantDataset.assistant_id == assistant_id, AssistantDataset.dataset_type == 1).all()
        if exact_datasets:
            exact_similarity_search_sql = f'''
            SELECT doc_chunk, title, url, 1 - (embedding <=> '{embedding}') AS similarity 
            FROM question WHERE ({" OR ".join([f"tag={dataset.dataset_id}" for dataset in exact_datasets])}) AND 1 - (embedding <=> '{embedding}') >= {exact_search_similarity}
            ORDER BY similarity DESC LIMIT {exact_search_limit};
            '''
            exact_similarity_search_res = session.execute(text(exact_similarity_search_sql)).all()
            if exact_similarity_search_res:
                return exact_similarity_search_res, False
        fuzzy_datasets = session.query(AssistantDataset.dataset_id).filter(
            AssistantDataset.assistant_id == assistant_id, AssistantDataset.dataset_type == 2).all()
        if fuzzy_datasets:
            fuzzy_similarity_search_sql = f'''
            SELECT title, url, doc_chunk, chunk_idx, 1 - (embedding <=> '{embedding}') AS similarity 
            FROM document WHERE ({" OR ".join([f"tag={dataset.dataset_id}" for dataset in fuzzy_datasets])}) AND 1 - (embedding <=> '{embedding}') > {fuzzy_search_similarity}
            ORDER BY similarity DESC LIMIT {fuzzy_search_limit};
            '''
            fuzzy_similarity_search_res = session.execute(text(fuzzy_similarity_search_sql)).all()
            if fuzzy_similarity_search_res:
                return fuzzy_similarity_search_res, True
        return [], True
