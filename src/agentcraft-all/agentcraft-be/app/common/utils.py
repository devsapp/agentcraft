"""Utils Model"""
import requests
import os
from app.config.common import EMBEDDING_URL, EMBEDDING_MODEL, EMBEDDING_TOKEN, EMBEDDING_TIMEOUT, RERANK_URL


embedding_session = requests.Session()
embedding_session.headers = {
    "Authorization": f"Token {EMBEDDING_TOKEN}"
}
rerank_session = requests.Session()


def embed(sentences: list[str]) -> list[list[float]]:
    """计算embedding"""
    if not EMBEDDING_URL:
        # 使用备用的URL和请求头
        url = 'https://dashscope.aliyuncs.com/compatible-mode/v1/embeddings'
        headers = {
            "Authorization": f"""Bearer {os.environ.get("DASHSCOPE_API_KEY", '')}""",
            "Content-Type": "application/json"
        }
        data = {
            "model": EMBEDDING_MODEL,
            "input": sentences,
            "dimension": "1024",
            "encoding_format": "float"
        }
        response = requests.post(url, headers=headers, json=data, timeout=EMBEDDING_TIMEOUT)
    else:
        # 使用默认的URL和请求头
        response = embedding_session.post(EMBEDDING_URL,
                                          json={"input": sentences},
                                          timeout=EMBEDDING_TIMEOUT)
    
    if response.status_code != 200:
        raise RuntimeError(f"ERROR: {response.text}")
    
    embeddings = [item["embedding"] for item in response.json().get("data", [])]
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
