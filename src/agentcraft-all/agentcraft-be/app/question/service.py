"""Question Service"""
# It seems the error is false positive
# pylint: disable = no-member， no-name-in-module
import codecs
import csv
from datetime import datetime
from typing import BinaryIO
from app.common.utils import embed
from app.database import question as database
from app.common.logger import logger


def list_questions(dataset_id: int, user_id: int, page: int, limit: int):
    """获取问题列表"""
    data, total = database.list_questions(dataset_id, user_id, page, limit)
    data_dict = [
        {
            "id": question.id,
            "question": question.question,
            "doc_chunk": question.doc_chunk,
            "token_size": question.token_size,
            "created": question.created,
            "modified": question.modified,
            "tag": question.tag,
            "title": question.title,
            "url": question.url
        } for question in data
    ]
    return data_dict, total


def add_question(question: str, **kwargs):
    """添加问题"""
    question_vector = embed(question)[0]
    add_args = {
        "question": question,
        "embedding": question_vector,
        "token_size": len(question_vector),
    }
    database.insert_question(**add_args, **kwargs)


def delete_question(question_id: int, user_id: int):
    """删除问题"""
    database.delete_question(question_id, user_id)


def update_question(question: str, answer, **kwargs):
    """更新问题"""
    question_vector = embed(question)[0]
    update_args = {
        "question": question,
        "embedding": question_vector,
        "doc_chunk": answer,
        "token_size": len(question_vector),
    }
    database.update_question(**update_args, **kwargs)


def check_questions_csv_header(header: list[str]):
    """检查csv header是否正确"""
    if header[0] != 'question' or header[1] != 'answer' or header[2] != 'tag' or header[3] != 'title' or header[4] != 'url':
        raise RuntimeError("ERROR: csv header is not correct")


def clean(text: str) -> str:
    """清理文本"""
    return text.strip()


def upload_questions(file: BinaryIO, user_id: int):
    """批量更新question"""
    logger.info("start update embedding: {%s}", datetime.now())
    reader = codecs.getreader("utf-8")
    text = reader(file)
    csv_reader = csv.reader(text, delimiter=',', quotechar='"')
    checked = False
    questions = []
    docs = []
    for row in csv_reader:
        if not checked:
            check_questions_csv_header(row)
            checked = True
            continue
        question = clean(row[0])
        answer = clean(row[1])
        if not question or not answer:
            continue
        tag = int(row[2])
        questions.append(question)
        title = row[3].strip()
        url = row[4].strip()
        docs.append = (
            {"question": question,
             "doc_chunk": answer,
             "tag": tag,
             "title": title,
             "url": url,
             "user_id": user_id})
    logger.info("num of docs: %s", len(docs))
    embeddings = embed(questions)
    for embedding, doc in zip(embeddings, docs):
        doc["embedding"] = embedding
        doc["token_size"] = len(embedding)
    database.insert_questions(docs)
    logger.info("end update embedding: %s", datetime.now())
