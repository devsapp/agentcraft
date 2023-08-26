"""Dataset Schema"""
from pydantic import BaseModel, Field # pylint: disable = no-name-in-module


class UpsertDatasetRequest(BaseModel):
    """增改数据集"""
    name: str=Field(description="数据集名称")
    description: str=Field(description="数据集描述")
    dataset_type: int=Field(description="数据集类型, 1是精确搜索数据集，2是模糊查询数据集")
