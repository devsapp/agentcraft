"""Database Table"""
# pylint: disable=not-callable
from enum import Enum
from sqlalchemy import Integer, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column
from app.database import postgresql


class DatasetType(Enum):
    """Dataset Type"""
    EXACT_SEARCH = 1
    FUZZY_SEARCH = 2


class Dataset(postgresql.BaseModel):
    """Dataset Model"""
    __tablename__ = "dataset"

    id = mapped_column(Integer, primary_key=True, index=True)
    name = mapped_column(String, nullable=False)
    description = mapped_column(String, nullable=False)
    dataset_type = mapped_column(Integer, nullable=False)
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)
    user_id = mapped_column(ForeignKey("users.id"))


def list_datasets(user_id: int, page: int = 0, limit: int = 3000, dataset_type: int = None) -> tuple[list[dict], int]:
    """获取数据集列表，并转换为字典"""
    with Session(postgresql.postgres) as session:
        query = session.query(Dataset)
        total_query = None
        if dataset_type is None:
            total_query = query.filter(Dataset.user_id == user_id)
            query = query.filter(Dataset.user_id == user_id)
        else:
            total_query = query.filter(
                Dataset.user_id == user_id, Dataset.dataset_type == dataset_type)
            query = query.filter(Dataset.user_id == user_id, Dataset.dataset_type == dataset_type)
        
        data = query.order_by(Dataset.modified.desc()).offset(page * limit).limit(limit).all()
        total = total_query.count()
        
        # 将 Dataset 对象列表转换为字典列表
        data_dict = [dataset.as_dict() for dataset in data]
        return data_dict, total


def delete_dataset(dataset_id: int, user_id: int):
    """删除数据集"""
    with Session(postgresql.postgres) as session:
        session.query(Dataset).filter(Dataset.id == dataset_id, Dataset.user_id == user_id).delete()
        session.commit()


def add_dataset(**kwargs):
    """添加数据集"""
    with Session(postgresql.postgres) as session:
        dataset = Dataset(**kwargs)
        session.add(dataset)
        session.commit()
        return dataset.id


def update_dataset(dataset_id: int, user_id: int, **kwargs):
    """更新数据集"""
    with Session(postgresql.postgres) as session:
        session.query(Dataset).filter(
            Dataset.id == dataset_id, Dataset.user_id == user_id).update(
            kwargs)
        session.commit()


def get_dataset(_id: int, user_id: int) -> Dataset:
    """获取数据集"""
    with Session(postgresql.postgres) as session:
        data = session.query(Dataset).filter(
            Dataset.id == _id, Dataset.user_id == user_id).first()
        return data.as_dict()
