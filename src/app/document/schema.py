"""Document Schema"""
from pydantic import BaseModel, validator, Field  # pylint: disable = no-name-in-module


class UpsertDocumentRequest(BaseModel):
    """增改文件请求"""
    title: str = Field(description="文件标题")
    url: str = Field(description="文件URL")
    tag: int = Field(description="数据集ID")
    ext: str = Field(description="文件格式")
    content: str = Field(description="文件内容")
    chunk_size: int = Field(description="分块大小")

    @validator('ext')
    def ext_validator(cls, v: str):  # pylint: disable=no-self-argument, invalid-name
        """检查支持的文件格式"""
        if v not in ('txt', 'md', 'html, pdf'):
            raise ValueError('extension not valid')
        return v

    @validator('content')
    def content_validator(cls, v: str):  # pylint: disable=no-self-argument, invalid-name
        """内容不能饿为空"""
        v = v.strip()
        if len(v) == 0:
            raise ValueError('content must not be empty')
        return v
