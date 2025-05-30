"""AgenticApp Schema"""
from pydantic import BaseModel
from typing import Optional

class UpsertAgenticAppRequest(BaseModel):
    """增改 AgenticApp 请求"""
    name: str
    project_name: str
    description: Optional[str] = None
    template: Optional[str] = None
    domain: Optional[str] = None
    endpoint: Optional[str] = None
    icon: Optional[str] = None
    phase: Optional[str]
    config: Optional[dict] = None


