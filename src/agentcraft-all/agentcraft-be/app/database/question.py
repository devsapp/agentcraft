"""Question Table"""
# pylint: disable=not-callable
from sqlalchemy import Integer, String, TIMESTAMP, ARRAY, Float, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column
from app.database import postgresql


class Question(postgresql.BaseModel):
    """Question Model"""
    __tablename__ = "question"

    id = mapped_column(Integer, primary_key=True, index=True)
    question = mapped_column(String, nullable=False)
    doc_chunk = mapped_column(String, nullable=False) # content
    token_size = mapped_column(Integer, nullable=False)
    embedding = mapped_column(ARRAY(Float, dimensions=1), nullable=False)
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)
    tag = mapped_column(ForeignKey("dataset.id", ondelete="cascade"))
    title = mapped_column(String, nullable=False)
    url = mapped_column(String, nullable=False)
    user_id = mapped_column(ForeignKey("users.id", ondelete='cascade'))


def list_questions(dataset_id: int, user_id: int, page: int = 0, limit: int = 3000) -> tuple[list[Question], int]:
    """获取问题列表"""
    with Session(postgresql.postgres) as session:
        data = session.query(
            Question.id, Question.question, Question.doc_chunk, Question.token_size, Question.
            created, Question.modified, Question.tag, Question.title, Question.url).filter(
            Question.tag == dataset_id, Question.user_id == user_id).order_by(
            Question.id.desc()).offset(
            page * limit).limit(limit).all()
        total = session.query(
            Question).filter(
            Question.tag == dataset_id, Question.user_id == user_id).count()
        return data, total


def insert_question(**kwargs):
    """插入问题"""
    with Session(postgresql.postgres) as session:
        question = Question(**kwargs)
        session.add(question)
        session.commit()


def update_question(question_id: int, user_id: int, **kwargs):
    """更新问题"""
    with Session(postgresql.postgres) as session:
        session.query(Question).filter(
            Question.id == question_id, Question.user_id == user_id).update(kwargs)
        session.commit()


def delete_question(question_id: int, user_id: int):
    """删除问题"""
    with Session(postgresql.postgres) as session:
        session.query(Question).filter(Question.id == question_id,
                                       Question.user_id == user_id).delete()
        session.commit()


def insert_questions(questions: list[dict]):
    """批量插入问题"""
    with Session(postgresql.postgres) as session:
        session.bulk_insert_mappings(Question, questions)
        session.commit()
