"""App Schema"""
from pydantic import BaseModel # pylint: disable = no-name-in-module

class UpsertAppRequest(BaseModel):
    """增改应用请求"""
    name: str
    description: str
