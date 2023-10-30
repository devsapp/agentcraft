"""Utils Model"""
import os
import requests
from app.config.common import EMBEDDING_URL, EMBEDDING_TOKEN, EMBEDDING_TIMEOUT


embedding_session = requests.Session()
embedding_session.headers = {
    "Authorization": f"Token {EMBEDDING_TOKEN}"
}


def embed(sentences: list[str]) -> list[list[float]]:
    """计算embedding"""
    data = embedding_session.post(EMBEDDING_URL,
                                  json={"input": sentences},
                                  timeout=EMBEDDING_TIMEOUT)
    if data.status_code != 200:
        raise RuntimeError(f"ERROR: {data.text}")
    embeddings = [item["embedding"] for item in data.json()["data"]]
    return embeddings
