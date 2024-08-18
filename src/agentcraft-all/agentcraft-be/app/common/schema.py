"""Common Schema"""
# pylint: disable = too-few-public-methods, no-self-argument
from typing import List
from pydantic import BaseModel  # pylint: disable = no-name-in-module


class BasicResponse(BaseModel):
    """Basic Response"""
    code: int
    msg: str


class StringResponse(BasicResponse):
    """Response with String Data"""
    data: str


class DictResponse(BasicResponse):
    """Response with Dict Data"""
    data: dict


class StringListResponse(BasicResponse):
    """Response with List of String Data"""
    data: List[str]


class DictListResponse(BasicResponse):
    """Response with List of Dict Data"""
    data: List[dict]
    total: int
