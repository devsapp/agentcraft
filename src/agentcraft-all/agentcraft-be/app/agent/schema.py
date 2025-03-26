"""Agent Schema"""
from typing import List, Optional
from pydantic import BaseModel, Field  # pylint: disable = no-name-in-module


class UpdateIsPublicRequest(BaseModel):
    is_public: int = Field(description="是否公开智能体")

class UpsertAgentRequest(BaseModel):
    """增改Agent请求"""
    name: str = Field(description="Agent名称")
    description: str = Field(description="Agent描述")
    prompt_template: str = Field(description="提示词模板，应该包含{query}和{context}两个占位符，用于生成提示词")
    app_id: int = Field(description="Agent的应用ID")
    exact_datasets: Optional[List[int]] = Field(description="精确匹配数据集ID列表")
    fuzzy_datasets: Optional[List[int]] = Field(description="模糊匹配数据集ID列表")
    exact_search_similarity: Optional[float] = Field(description="精确搜索的近似阈值")
    fuzzy_search_similarity: Optional[float] = Field(description="模糊搜索的近似阈值")
    # 详细说明请参考（https://platform.openai.com/docs/api-reference/chat/create）
    temperature: Optional[float] = Field(description="温度，用于控制模型的创造力")
    top_p: Optional[float] = Field(description="Top P")
    n_sequences: Optional[int] = Field(description="返回的choices数量")
    max_tokens: Optional[int] = Field(description="最大生成token的数量")
    stop: Optional[List[str]] = Field(description="停止词")
    presence_penalty: Optional[float] = Field(description="存在惩罚")
    frequency_penalty: Optional[float] = Field(description="频率惩罚")
    logit_bias: Optional[str] = Field(description="logit偏置，以JsonString字符串的形式存储")
    model_id: int = Field(description="模型ID")
    redis_ip_ex: Optional[int] = Field(description="Redis中IP的过期时间")
    redis_history_ex: Optional[int] = Field(description="Redis中历史记录的过期时间")
    model_ip_limit: Optional[int] = Field(description=" Redis中IP的计数上限")
    llm_history_len: Optional[int] = Field(description="Redis中缓存的上下文对话轮数")
    system_message: Optional[str] = Field(description="系统提示词")
    exact_search_limit: Optional[int] = Field(description="精确搜索返回的数量")
    fuzzy_search_limit: Optional[int] = Field(description="模糊搜索返回的数量")
