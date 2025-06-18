"""PostgreSQL Model Config"""
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase
from app.config import database as config  # pylint: disable=no-name-in-module

postgres = create_engine(
        config.POSTGRES_URL,pool_size=10, 
        max_overflow=20,    
        pool_timeout=30     
    )


class BaseModel(DeclarativeBase):
    """Base Model"""
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}