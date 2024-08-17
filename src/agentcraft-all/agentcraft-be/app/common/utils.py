"""Utils Model"""
import requests
from app.config.common import EMBEDDING_URL, EMBEDDING_TOKEN, EMBEDDING_TIMEOUT, RERANK_URL


embedding_session = requests.Session()
embedding_session.headers = {
    "Authorization": f"Token {EMBEDDING_TOKEN}"
}
rerank_session = requests.Session()


def embed(sentences: list[str]) -> list[list[float]]:
    """计算embedding"""
    data = embedding_session.post(EMBEDDING_URL,
                                  json={"input": sentences},
                                  timeout=EMBEDDING_TIMEOUT)
    if data.status_code != 200:
        raise RuntimeError(f"ERROR: {data.text}")
    embeddings = [item["embedding"] for item in data.json()["data"]]
    return embeddings


def rerank(sentences: list[str], query: str) -> list[list[float]]:
    """对结果进行重排序"""
    if RERANK_URL is None or RERANK_URL == '':
        return sentences
    data = rerank_session.post(RERANK_URL,
                               json={"query": query, "compare_to": sentences},
                               timeout=EMBEDDING_TIMEOUT)
    if data.status_code != 200:
        raise RuntimeError(f"ERROR: {data.text}")
    rerank_sentences = data.json()["data"]
    return rerank_sentences
