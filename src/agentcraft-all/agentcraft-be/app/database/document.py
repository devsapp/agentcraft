"""Document Table"""
# pylint: disable=not-callable
from sqlalchemy import Integer, String, TIMESTAMP, ARRAY, Float, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column
from app.database import postgresql


class Document(postgresql.BaseModel):
    """Document Model"""
    __tablename__ = "document"

    id = mapped_column(Integer, primary_key=True, index=True)
    title = mapped_column(String, nullable=False)
    url = mapped_column(String, nullable=False)
    tag = mapped_column(ForeignKey("dataset.id", ondelete="cascade")) # dataset_id
    doc_chunk = mapped_column(String, nullable=False)
    chunk_idx = mapped_column(Integer, nullable=False) # chunk index
    token_size = mapped_column(Integer, nullable=False)
    embedding = mapped_column(ARRAY(Float, dimensions=1), nullable=False)
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)
    user_id = mapped_column(ForeignKey("users.id", ondelete="cascade"))


def list_documents(dataset_id: int, user_id: int, page: int = 0, limit: int = 3000) -> tuple[list[Document], int]:
    """获取文档列表"""
    with Session(postgresql.postgres) as session:
        data = session.query(
            Document.id, Document.title, Document.url, Document.tag, Document.doc_chunk, Document.
            chunk_idx, Document.token_size, Document.created, Document.modified).filter(
            Document.tag == dataset_id, Document.user_id == user_id).order_by(
            Document.id.desc()).offset(
            page * limit).limit(limit).all()
        total = session.query(
            Document).filter(
            Document.tag == dataset_id, Document.user_id == user_id).count()
        return data, total


def delete_document(document_id: int, user_id: int):
    """删除文档"""
    with Session(postgresql.postgres) as session:
        session.query(Document).filter(Document.id == document_id,
                                       Document.user_id == user_id).delete()
        session.commit()


def insert_documents(documents: list[tuple], user_id: int):
    """批量插入文档"""
    with Session(postgresql.postgres) as session:
        session.bulk_insert_mappings(
            Document,
            [{"title": title,
              "url": url,
              "tag": tag,
              "doc_chunk": doc_chunk,
              "chunk_idx": chunk_idx,
              "token_size": token_size,
              "embedding": embedding,
              "user_id": user_id}
             for (
                 title, url, tag, doc_chunk, chunk_idx, token_size, embedding) in
             documents])
        session.commit()

def update_document(id: int, user_id: int, **kwargs):
    """更新文档"""
    with Session(postgresql.postgres) as session:
        session.query(Document).filter(
            Document.id == id, Document.user_id == user_id).update(kwargs)
        session.commit()