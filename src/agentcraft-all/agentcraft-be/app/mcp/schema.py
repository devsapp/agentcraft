"""MCP Schema"""
from pydantic import BaseModel
from typing import Optional, Dict

class UpsertMCPRequest(BaseModel):
    """增改 MCP 请求"""
    name: str
    alias: Optional[str] = None
    overview: Optional[str] = None
    content: Optional[str] = None
    server_config: str
    icon: Optional[str] = None
    arn: Optional[str] = None
    type: int = 1  # 默认值：1: sse, 2: stdio
    tools: Optional[Dict] = None
    template: Optional[str] = None
