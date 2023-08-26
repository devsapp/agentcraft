"""App Table"""
# pylint: disable=not-callable
from sqlalchemy import Integer, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column
from app.database import postgresql


class App(postgresql.BaseModel):
    """App Model"""
    __tablename__ = "app"

    id = mapped_column(Integer, primary_key=True, index=True)
    name = mapped_column(String, nullable=False)
    description = mapped_column(String, nullable=False)
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)
    user_id = mapped_column(ForeignKey("users.id", ondelete="cascade"))


def list_apps(user_id: int, page: int = 0, limit: int = 3000) -> tuple[list[App], int]:
    """获取应用列表"""
    with Session(postgresql.postgres) as session:
        data = session.query(App).filter(
            App.user_id == user_id).order_by(
            App.modified.desc()).offset(
            page * limit).limit(limit).all()
        total = session.query(App).filter(App.user_id == user_id).count()
        return data, total


def delete_app(app_id: int, user_id: int):
    """删除应用"""
    with Session(postgresql.postgres) as session:
        session.query(App).filter(App.id == app_id, App.user_id == user_id).delete()
        session.commit()


def add_app(**kwargs):
    """添加应用"""
    with Session(postgresql.postgres) as session:
        app = App(**kwargs)
        session.add(app)
        session.commit()


def get_app(app_id: int, user_id: int) -> App:
    """获取应用信息"""
    with Session(postgresql.postgres) as session:
        return session.query(App).filter(
            App.id == app_id, App.user_id == user_id).order_by(App.modified.desc()).first()


def update_app(app_id: int, user_id: int, **kwargs):
    """更新应用信息"""
    with Session(postgresql.postgres) as session:
        session.query(App).filter(
            App.id == app_id, App.user_id == user_id).update(**kwargs)
        session.commit()
