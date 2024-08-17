"""Chat Session Schema"""
# pylint: disable = too-few-public-methods, no-self-argument
from typing import List
from pydantic import BaseModel, Field  # pylint: disable = no-name-in-module


class BasicResponse(BaseModel):
    """Basic Response"""
    code: int
    msg: str


class StringResponse(BasicResponse):
    """Response with String Data"""
    data: str


class DictResponse(BasicResponse):
    """Response with Dict Data"""
    data: dict


class StringListResponse(BasicResponse):
    """Response with List of String Data"""
    # name: str = Field(description="ActionTool名称")
    # description: str = Field(description="ActionTool描述")
    # alias: str = Field(description="ActionTool别名")
    # input_schema: str = Field(description="ActionTool输入Schema")
    # output_schema: str= Field(description="ActionTool输入Schema")
    # type: int = Field(description="ActionTool类型 1 函数 2 http")
    # proxy_url: str =  Field(description="ActionTool代理地址")
    # author: str =  Field(description="作者")
    # status: int = Field(description="工具状态 1 准备中 2 已上线 3 已下线")


class ListHistoryResponse(BasicResponse):
    """Response with List of Dict Data"""
    data: List[dict]
