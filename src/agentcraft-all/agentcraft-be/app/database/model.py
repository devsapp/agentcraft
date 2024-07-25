"""Model Table"""
# pylint: disable=not-callable
from sqlalchemy import Integer, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column
from app.database import postgresql


class Model(postgresql.BaseModel):
    """Model Model"""
    __tablename__ = "model"

    id = mapped_column(Integer, primary_key=True, index=True)
    name = mapped_column(String, nullable=False)  # Used for request
    name_alias = mapped_column(String, nullable=False)  # Used for display
    description = mapped_column(String, nullable=False)
    # Should be a complete url address, for example, https://openai.com/v1/chat/completions
    url = mapped_column(String, nullable=False)
    # Bearer token, will be used in the authorization header upon request
    token = mapped_column(String, nullable=False)
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)
    user_id = mapped_column(ForeignKey("users.id", ondelete="cascade"))
    timeout = mapped_column(Integer, default=600, nullable=False)  # seconds


def list_models(user_id: int, page: int = 0, limit: int = 3000) -> tuple[list[Model], int]:
    """获取模型列表"""
    with Session(postgresql.postgres) as session:
        data = session.query(Model).filter(Model.user_id == user_id).order_by(
            Model.modified.desc()).offset(
            page * limit).limit(limit).all()
        total = session.query(Model).filter(Model.user_id == user_id).count()
        return data, total


def delete_model(model_id: int, user_id: int):
    """删除模型"""
    with Session(postgresql.postgres) as session:
        session.query(Model).filter(Model.id == model_id, Model.user_id == user_id).delete()
        session.commit()


def add_model(**kwargs):
    """增加模型信息"""
    with Session(postgresql.postgres) as session:
        model = Model(**kwargs)
        session.add(model)
        session.commit()
        return model.id


def get_model(model_id: int, user_id: int) -> Model:
    """获取模型信息"""
    with Session(postgresql.postgres) as session:
        return session.query(Model).filter(
            Model.id == model_id, Model.user_id == user_id).order_by(Model.modified.desc()).first()


def get_model_by_id(model_id: int) -> Model:
    """通过ID获取模型"""
    with Session(postgresql.postgres) as session:
        return session.query(Model).filter(
            Model.id == model_id).order_by(Model.modified.desc()).first()


def update_model(model_id: int, user_id: int,**kwargs):
    """更新模型信息"""
    with Session(postgresql.postgres) as session:
        model1 = session.query(Model).filter(Model.id == model_id, Model.user_id == user_id).first()
        session.query(Model).filter(
            Model.id == model_id, Model.user_id == user_id).update(kwargs)
        session.commit()
