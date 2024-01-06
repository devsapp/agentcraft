"""Assistant Table"""
# pylint: disable=not-callable
from sqlalchemy import Integer, FLOAT, String, TIMESTAMP, ForeignKey, ARRAY
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column, relationship
from app.database import postgresql
from app.database.assistant_dataset import AssistantDataset
from app.database.assistant_action_tools import AssistantActionTools
from app.database.dataset import DatasetType
from app.database.model import Model


class Assistant(postgresql.BaseModel):
    """Assistant Model"""
    __tablename__ = "assistant"

    id = mapped_column(Integer, primary_key=True, index=True)
    name = mapped_column(String, nullable=False)
    description = mapped_column(String, nullable=False)
    retrieval_prompt_template = mapped_column(String, nullable=False) # should contain {query} and {context} for replacement
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)
    user_id = mapped_column(ForeignKey("users.id", ondelete="cascade"))
    app_id = mapped_column(ForeignKey("app.id", ondelete="cascade"))
    token = mapped_column(String, nullable=True) # assistant token, different from user token
    app = relationship("App")
    exact_search_similarity = mapped_column(FLOAT, default=0.9, nullable=False)
    fuzzy_search_similarity = mapped_column(FLOAT, default=0.6, nullable=False)
    temperature = mapped_column(FLOAT, default=1.0, nullable=False)
    top_p = mapped_column(FLOAT, default=1, nullable=False)
    n_sequences = mapped_column(Integer, default=1, nullable=False)
    max_tokens = mapped_column(Integer, default=2048, nullable=False)
    stop = mapped_column(ARRAY(String, dimensions=1), default=[], nullable=False)
    presence_penalty = mapped_column(FLOAT, default=0, nullable=False)
    frequency_penalty = mapped_column(FLOAT, default=0, nullable=False)
    logit_bias = mapped_column(String, default="", nullable=False)  # Store as Json String
    model_id = mapped_column(ForeignKey("model.id", ondelete="setnull"), nullable=True)
    instruction = mapped_column(String, nullable=False) # system instruction
    system_message = mapped_column(String, nullable=False) # system meta message
    llm_history_len = mapped_column(Integer, default=3, nullable=False) # maximum round of history
    redis_ip_ex = mapped_column(Integer, default=86400, nullable=False)  # seconds
    redis_history_ex = mapped_column(Integer, default=86400, nullable=False)  # seconds
    model_ip_limit = mapped_column(Integer, default=50, nullable=False)
    exact_search_limit = mapped_column(Integer, default=1, nullable=False)
    fuzzy_search_limit = mapped_column(Integer, default=3, nullable=False)
    model = relationship("Model")


def list_assistants(app_id: int, user_id: int, page: int = 0, limit: int = 3000) -> tuple[list[Assistant], int]:
    """获取assistant列表"""
    print(f"appid:{app_id},user_id:{user_id}")
    with Session(postgresql.postgres) as session:
        data = session.query(Assistant).filter(
            Assistant.app_id == app_id, Assistant.user_id == user_id).order_by(
            Assistant.modified.desc()).offset(
            page * limit).limit(limit).all()
        total = session.query(Assistant).filter(
            Assistant.app_id == app_id, Assistant.user_id == user_id).count()
        return data, total


def delete_assistant(assistant_id: int, user_id: int):
    """删除assistant"""
    with Session(postgresql.postgres) as session:
        session.query(Assistant).filter(Assistant.id == assistant_id, Assistant.user_id == user_id).delete()
        session.commit()


def _bulk_insert_dataset(
        session: Session, assistant_id: int, datasets: list[int],
        dataset_type: int):
    """批量增加数据集关系"""
    print(f"dd{datasets}")
    session.bulk_insert_mappings(AssistantDataset,
                                 [{"assistant_id": assistant_id,
                                   "dataset_id": dataset_id,
                                   "dataset_type": dataset_type}
                                  for dataset_id in datasets])
    session.commit()


def _bulk_insert_action_tools(
        session: Session, assistant_id: int, action_tools: list[int]):
    """批量增加数据集关系"""
    session.bulk_insert_mappings(AssistantActionTools,
                                 [{"assistant_id": assistant_id,
                                   "action_tools_id": action_tools_id}
                                  for action_tools_id in action_tools])
    session.commit()


def add_assistant(exact_datasets: list[int], fuzzy_datasets: list[int], action_tools: list[int], **kwargs):
    """增加assistant"""
    with Session(postgresql.postgres) as session:
        assistant = Assistant(**kwargs)
        session.add(assistant)
        session.commit()
        session.refresh(assistant)
        if exact_datasets:
            _bulk_insert_dataset(session, assistant.id, exact_datasets, DatasetType.EXACT_SEARCH.value)
        if action_tools:
            _bulk_insert_action_tools(session, assistant.id, action_tools)
        if fuzzy_datasets:
            _bulk_insert_dataset(session, assistant.id, fuzzy_datasets, DatasetType.FUZZY_SEARCH.value)



def check_user_has_assistant(user_id: int, assistant_id: int):
    """检查用户是否有这个assistant"""
    with Session(postgresql.postgres) as session:
        return session.query(Assistant).filter(
            Assistant.id == assistant_id, Assistant.user_id == user_id).count() > 0


def update_token(assistant_id: int, token: str, user_id: int):
    """更新token"""
    with Session(postgresql.postgres) as session:
        session.query(Assistant).filter(
            Assistant.id == assistant_id, Assistant.user_id == user_id).update(
            {Assistant.token: token})
        session.commit()


def get_assistant(assistant_id: int, user_id: int):
    """联表获取assistant"""
    with Session(postgresql.postgres) as session:
        return session.query(Assistant, Model.name.label("model_name")).filter(
            Assistant.id == assistant_id, Assistant.user_id == user_id).join(Assistant.model).first()


def update_assistant(
        assistant_id: int, user_id: int, exact_datasets: list[int],
        fuzzy_datasets: list[int],
        action_tools: list[int],
        **kwargs):
    """更新assistant"""
    with Session(postgresql.postgres) as session:
        session.query(Assistant).filter(
            Assistant.id == assistant_id, Assistant.user_id == user_id).update(kwargs)
        session.query(AssistantDataset).filter(AssistantDataset.assistant_id == assistant_id).delete()
        session.query(AssistantActionTools).filter(AssistantActionTools.assistant_id == assistant_id).delete()
        if exact_datasets:
            _bulk_insert_dataset(session, assistant_id, exact_datasets, DatasetType.EXACT_SEARCH.value)
        if action_tools:
            _bulk_insert_action_tools(session, assistant_id, action_tools)
        if fuzzy_datasets:
            _bulk_insert_dataset(session, assistant_id, fuzzy_datasets, DatasetType.FUZZY_SEARCH.value)
        session.commit()


def get_assistant_lite(assistant_id: int) -> Assistant:
    """获取assistant"""
    with Session(postgresql.postgres) as session:
        return session.query(Assistant).filter(Assistant.id == assistant_id).first()
