"""Module providingFunction printing python version."""
# It seems the error is false positive
# pylint: disable = no-member
import os
import re
import codecs
import csv
from datetime import datetime
from typing import BinaryIO
import markdown
from bs4 import BeautifulSoup
import pypdf
from app.common.utils import embed
from app.database import document as database
from app.common.logger import logger


def list_documents(dataset_id: int, user_id: int, page: int, limit: int):
    """获取文档列表"""
    data, total = database.list_documents(dataset_id, user_id, page, limit)
    data_dict = [
        {
            "id": document.id,
            "title": document.title,
            "url": document.url,
            "tag": document.tag,
            "doc_chunk": document.doc_chunk,
            "chunk_idx": document.chunk_idx,
            "token_size": document.token_size,
            "created": document.created,
            "modified": document.modified
        } for document in data
    ]
    return data_dict, total


def clean(text: str) -> str:
    """清理文本"""
    lb = re.compile(r'\n\s*\n')
    bs = re.compile(r' +')
    tb = re.compile(r'\|\n* *-+ *\n*\|')
    text = lb.sub('\n', text)
    text = bs.sub(' ', text)
    while tb.search(text):
        text = tb.sub('', text)
    return text


def process_text(text: str, max_length: int) -> list[tuple]:
    """处理文本"""
    idx = 0
    cur = ""
    processed = []
    for line in text.split("\n"):
        line = clean(line)
        line += '\n'
        if len(cur)+len(line) <= max_length:
            cur += line
        else:
            processed.append((cur, idx))
            idx += 1
            cur = line
            while len(cur) > max_length:
                s_idx = cur.rfind("。", 0, max_length)+1
                if s_idx == 0:
                    s_idx = max_length
                processed.append((cur[:s_idx], idx))
                idx += 1
                cur = cur[s_idx:]
    if cur:
        processed.append((cur, idx))
    return processed


def extract_structured_text(text: str, ext: str):
    """解析文本"""
    if ext == "md":
        text = BeautifulSoup(markdown.markdown(text), "html.parser").text
    elif ext == "html":
        text = BeautifulSoup(text, "html.parser").text
    return text.strip()


def extract_text(file: BinaryIO, ext: str) -> str:
    """从bytes中提取文字"""
    text = ""
    if ext == "pdf":
        reader = pypdf.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text()
        text = text.strip()
    else:
        reader = codecs.getreader("utf-8")
        text = reader(file).read()
        # text = extract_structured_text(text, ext)
    return text


def embed_chunks(title: str, url: str, tag: int, chunks: list[tuple]):
    """批量embed chunks"""
    docs = []
    sentences = [chunk for (chunk, _) in chunks]
    embeddings = embed(sentences)
    for (embedding, (chunk, idx)) in zip(embeddings, chunks):
        docs.append((title, url, tag, chunk, idx, len(embedding), embedding))
    logger.info(f"title: {title}, index: {idx}\n")
    return docs


def add_document(title: str, url: str, tag: int, ext: str, content: str, user_id: int,
                 chunk_size: int):
    """更新文档embedding"""
    text = content #extract_structured_text(content, ext)
    if not text:
        raise RuntimeError("ERROR: text is empty or cannot be parsed")
    lines = process_text(text, chunk_size)
    docs = embed_chunks(title, url, tag, lines)
    database.insert_documents(docs, user_id)


def upload_document(
        title: str, url: str, tag: int, ext: str, file: BinaryIO, user_id: int, chunk_size: int):
    """更新文档embedding"""
    logger.info(f"start update embedding: {datetime.now()}\n")
    text = extract_text(file, ext)
    if not text:
        raise RuntimeError("ERROR: text is empty or cannot be parsed")
    lines = process_text(text, chunk_size)
    docs = embed_chunks(title, url, tag, lines)
    logger.info(f"num of docs: {len(docs)}\n")
    database.insert_documents(docs, user_id)
    logger.info(f"end update embedding: {datetime.now()}\n")


def delete_document(document_id: int, user_id: int):
    """删除文档"""
    database.delete_document(document_id, user_id)


def check_document_csv_header(header: list[str]):
    """检查csv header是否正确"""
    if header[0] != 'title' or header[1] != 'url' or header[2] != 'content' and header[3] != 'tag':
        raise RuntimeError("ERROR: csv header is not correct")


def add_documents(file: BinaryIO, user_id: int, chunk_size: int):
    """更新文档embedding"""
    reader = codecs.getreader("utf-8")
    text = reader(file)
    csv_reader = csv.reader(text, delimiter=',', quotechar='"')
    docs = []
    checked = False
    for row in csv_reader:
        if not checked:
            check_document_csv_header(row)
            checked = True
            continue
        title = row[0].strip()
        url = row[1].strip()
        content = row[2].strip()
        if not content:
            continue
        docs += embed_chunks(title, url, int(row[3]),process_text(content, chunk_size))
    logger.info(f"num of docs: {len(docs)}\n")
    database.insert_documents(docs, user_id)
