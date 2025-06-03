"""MCP Schema"""
from pydantic import BaseModel
from typing import Optional, Dict

class UpsertMCPRequest(BaseModel):
    """增改 MCP 请求"""
    name: str
    project_name: str = None
    description: Optional[str] = None
    content: Optional[str] = None
    endpoint: str
    icon: Optional[str] = None
    arn: Optional[str] = None
    type: int = 1  # 默认值：1: sse, 2: stdio
    tools: Optional[Dict] = None
    template: str
