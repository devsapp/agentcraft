"""Model Schema"""
from pydantic import BaseModel, Field  # pylint: disable = no-name-in-module


class UpsertModelRequest(BaseModel):
    """增改模型请求"""
    name: str = Field(description="向模型服务请求时使用的参数")
    name_alias: str = Field(description="模型别名")
    description: str=Field(description="模型描述")
    url: str = Field(description="完成的请求URL，例如https://openai.com/v1/chat/completions")
    token: str = Field(description="模型服务的JWT，会被添加在请求的Authorization头部")
    timeout: int = Field(description="模型请求的超时时间，单位是秒")
