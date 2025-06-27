"""AgenticApp Schema"""
from pydantic import BaseModel
from typing import Optional

class AddAgenticAppRequest(BaseModel):
    """增加 AgenticApp 请求"""
    name: str
    project_name: str
    workspace_id: int
    description: Optional[str] = None
    template: Optional[str] = None
    domain: Optional[str] = None
    endpoint: Optional[str] = None
    icon: Optional[str] = None
    phase: Optional[str]
    config: Optional[dict] = None

class UpdateAgenticAppRequest(BaseModel):
    """修改 AgenticApp 请求"""
    name: str
    description: Optional[str] = None
    domain: Optional[str] = None


