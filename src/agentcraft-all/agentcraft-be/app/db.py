"""Database Init Module"""
import os
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.database.postgresql import postgres
EMBEDDING_DIM = os.environ.get('EMBEDDING_DIM', 1024)

CREATE_VECTOR_EXTENSION = text("CREATE EXTENSION IF NOT EXISTS vector")
CREATE_USER_TABLE = text(
    """CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password BYTEA NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    modified TIMESTAMP NOT NULL DEFAULT NOW()
    );"""
)
CREATE_APP_TABLE = text(
    """CREATE TABLE IF NOT EXISTS app (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    modified TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE
    );"""
)
CREATE_DATASET_TABLE = text(
    """CREATE TABLE IF NOT EXISTS dataset (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    dataset_type INTEGER NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    modified TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id BIGINT REFERENCES users(id)
    );"""
)
CREATE_MODEL_TABLE = text(
    """CREATE TABLE IF NOT EXISTS model (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_alias VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    modified TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    timeout INTEGER NOT NULL DEFAULT 600
    );"""
)
CREATE_AGENT_TABLE = text(
    """CREATE TABLE IF NOT EXISTS agent (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    prompt_template TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    modified TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    app_id BIGINT REFERENCES app(id) ON DELETE CASCADE,
    token VARCHAR(255),
    exact_search_similarity FLOAT NOT NULL DEFAULT 0.9,
    fuzzy_search_similarity FLOAT NOT NULL DEFAULT 0.6,
    temperature FLOAT NOT NULL DEFAULT 1.0,
    top_p FLOAT NOT NULL DEFAULT 1,
    n_sequences INTEGER NOT NULL DEFAULT 5,
    max_tokens INTEGER NOT NULL DEFAULT 2048,
    stop TEXT[] NOT NULL DEFAULT '{}',
    presence_penalty FLOAT NOT NULL DEFAULT 0,
    frequency_penalty FLOAT NOT NULL DEFAULT 0,
    logit_bias TEXT NOT NULL DEFAULT '',
    model_id BIGINT REFERENCES model(id) ON DELETE SET NULL,
    system_message TEXT NOT NULL,
    llm_history_len INTEGER NOT NULL DEFAULT 3,
    redis_ip_ex INTEGER NOT NULL DEFAULT 86400,
    redis_history_ex INTEGER NOT NULL DEFAULT 86400,
    model_ip_limit INTEGER NOT NULL DEFAULT 50,
    exact_search_limit INTEGER NOT NULL DEFAULT 1,
    fuzzy_search_limit INTEGER NOT NULL DEFAULT 3
    );"""
)
CREATE_AGENT_DATASET_TABLE = text(
    """CREATE TABLE IF NOT EXISTS agent_dataset (
    id BIGSERIAL PRIMARY KEY,
    agent_id BIGINT REFERENCES agent(id) ON DELETE CASCADE,
    dataset_id BIGINT REFERENCES dataset(id) ON DELETE CASCADE,
    dataset_type INTEGER NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    modified TIMESTAMP NOT NULL DEFAULT NOW()
    );"""
)

# CREATE_MEMORY_TABLE = text(
#     """CREATE TABLE IF NOT EXISTS memory (
#     id VARCHAR(255) PRIMARY KEY,
#     name VARCHAR(255) NOT NULL,
#     description VARCHAR(255) NOT NULL,
#     content VARCHAR(255) NOT NULL,
#     created TIMESTAMP NOT NULL DEFAULT NOW(),
#     modified TIMESTAMP NOT NULL DEFAULT NOW(),
#     agent_id BIGINT REFERENCES agent(id) ON DELETE CASCADE
#     );"""
# )

CREATE_CHAT_TABLE = text(
    """CREATE TABLE IF NOT EXISTS chat (
    id BIGSERIAL PRIMARY KEY,
    ip VARCHAR(255) NOT NULL,
    question TEXT NOT NULL,
    prompt TEXT NOT NULL,
    source TEXT NOT NULL,
    answer TEXT NOT NULL,
    type INTEGER NOT NULL DEFAULT 0,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    modified TIMESTAMP NOT NULL DEFAULT NOW(),
    agent_id BIGINT REFERENCES agent(id) ON DELETE SET NULL,
    model_id BIGINT REFERENCES model(id) ON DELETE SET NULL,
    model_name VARCHAR(255),
    uid VARCHAR(255) NOT NULL UNIQUE
    );"""
)
CREATE_DOCUMENT_TABLE = text(
    f"""CREATE TABLE IF NOT EXISTS document (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    tag BIGINT REFERENCES dataset(id) ON DELETE CASCADE,
    doc_chunk TEXT NOT NULL,
    chunk_idx INTEGER NOT NULL,
    token_size INTEGER NOT NULL,
    embedding VECTOR({EMBEDDING_DIM}) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    modified TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    );"""
)
CREATE_QUESTION_TABLE = text(
    f"""CREATE TABLE IF NOT EXISTS question (
    id BIGSERIAL PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    doc_chunk TEXT NOT NULL,
    token_size INTEGER NOT NULL,
    embedding VECTOR({EMBEDDING_DIM}) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    modified TIMESTAMP NOT NULL DEFAULT NOW(),
    tag BIGINT REFERENCES dataset(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE
    );"""
)
CREATE_DOCUMENT_INDEX = text(
    """CREATE INDEX IF NOT EXISTS embedding_idx ON document USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);"""
)
CREATE_QUESTION_INDEX = text(
    """CREATE INDEX IF NOT EXISTS embedding_idx ON question USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);"""
)


def create_tables():
    """CREATE TABLES IF NOT EXISTS"""
    with Session(postgres) as session:
        session.execute(CREATE_VECTOR_EXTENSION)
        session.execute(CREATE_USER_TABLE)
        session.execute(CREATE_APP_TABLE)
        session.execute(CREATE_DATASET_TABLE)
        session.execute(CREATE_MODEL_TABLE)
        session.execute(CREATE_AGENT_TABLE)
        session.execute(CREATE_AGENT_DATASET_TABLE)
        session.execute(CREATE_CHAT_TABLE)
        session.execute(CREATE_DOCUMENT_TABLE)
        session.execute(CREATE_QUESTION_TABLE)
        session.execute(CREATE_DOCUMENT_INDEX)
        session.execute(CREATE_QUESTION_INDEX)
        session.commit()
