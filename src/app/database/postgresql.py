"""PostgreSQL Model Config"""
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase
from app.config import database as config  # pylint: disable=no-name-in-module

postgres = create_engine(config.POSTGRES_URL)


class BaseModel(DeclarativeBase):
    """Base Model"""
