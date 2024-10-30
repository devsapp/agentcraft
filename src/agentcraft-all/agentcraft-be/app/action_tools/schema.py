"""ActionTools Schema"""
from typing import List, Optional
from pydantic import BaseModel, Field  # pylint: disable = no-name-in-module
  

class UpsertActionToolsRequest(BaseModel):
    """增改ActionTools请求"""
    name: str = Field(description="ActionTool名称")
    description: str = Field(description="ActionTool描述")
    alias: str = Field(description="ActionTool别名")
    input_schema: str = Field(description="ActionTool输入Schema")
    output_schema: str= Field(description="ActionTool输出Schema")
    type: int = Field(description="ActionTool类型 1 函数 2 http")
    need_llm_call: int = Field(description="ActionTool是否需要被LLM继续推理 1 是 2 否")
    proxy_url: str =  Field(description="ActionTool代理地址")
    author: str =  Field(description="作者")
    status: int = Field(description="工具状态 1 准备中 2 已上线 3 已下线")

