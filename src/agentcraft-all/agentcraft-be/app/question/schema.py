"""Question Schema"""
# pylint: disable=no-self-argument, invalid-name
from typing import Optional
from pydantic import BaseModel, Field, validator  # pylint: disable = no-name-in-module


class UpsertQuestionRequest(BaseModel):
    """增改单条问题"""
    question: str=Field(description="问题")
    tag: int=Field(description="数据集ID")
    doc_chunk: str = Field(alias="answer", description="回答")
    title: Optional[str]=Field(description="标题")
    url: Optional[str]=Field(description="URL")

    @validator('question')
    def question_validator(cls, v: str):
        """问题不能为空"""
        v = v.strip()
        if len(v) == 0:
            raise ValueError('question must not be empty')
        return v

    @validator('doc_chunk')
    def answer_validator(cls, v: str):
        """回答不能为空"""
        v = v.strip()
        if len(v) == 0:
            raise ValueError('answer must not be empty')
        return v
