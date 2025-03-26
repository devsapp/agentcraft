"""Agent Table"""
# pylint: disable=not-callable
from sqlalchemy import Integer, FLOAT, String, TIMESTAMP, ForeignKey, ARRAY
from sqlalchemy import or_ , and_
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, mapped_column, relationship
from app.database import postgresql
from app.database.agent_dataset import AgentDataset
from app.database.dataset import DatasetType
from app.database.model import Model


class Agent(postgresql.BaseModel):
    """Agent Model"""
    __tablename__ = "agent"

    id = mapped_column(Integer, primary_key=True, index=True)
    name = mapped_column(String, nullable=False)
    description = mapped_column(String, nullable=False)
    prompt_template = mapped_column(String, nullable=False) # should contain {query} and {context} for replacement
    created = mapped_column(TIMESTAMP, default=func.now(), nullable=False)
    modified = mapped_column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)
    user_id = mapped_column(ForeignKey("users.id", ondelete="cascade"))
    app_id = mapped_column(ForeignKey("app.id", ondelete="cascade"))
    token = mapped_column(String, nullable=True) # agent token, different from user token
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
    system_message = mapped_column(String, nullable=False) # system meta message
    llm_history_len = mapped_column(Integer, default=3, nullable=False) # maximum round of history
    redis_ip_ex = mapped_column(Integer, default=86400, nullable=False)  # seconds
    redis_history_ex = mapped_column(Integer, default=86400, nullable=False)  # seconds
    model_ip_limit = mapped_column(Integer, default=50, nullable=False)
    exact_search_limit = mapped_column(Integer, default=1, nullable=False)
    fuzzy_search_limit = mapped_column(Integer, default=3, nullable=False)
    is_public=mapped_column(Integer, default=0, nullable=True)
    default_answer = mapped_column(String, nullable=True)
    model = relationship("Model")


def list_agents(app_id: int, user_id: int, page: int = 0, limit: int = 3000) -> tuple[list[Agent], int]:
    """获取agent列表"""
    with Session(postgresql.postgres) as session:
        data = session.query(Agent).filter(
            or_(
                and_(Agent.app_id == app_id, Agent.user_id == user_id),
                # Agent.is_public == 1
            )).order_by(
                Agent.modified.desc()).offset(
                page * limit).limit(limit).all()
        total = session.query(Agent).filter(or_(
            and_(Agent.app_id == app_id, 
            Agent.user_id == user_id),
            Agent.is_public == 1
        )).count() 
        return data, total

def list_public_agents(page: int = 0, limit: int = 3000) -> tuple[list[Agent], int]:
    """获取公共agent列表"""
    with Session(postgresql.postgres) as session:
        data = session.query(Agent).filter(
            Agent.is_public == 1).order_by(
            Agent.modified.desc()).offset(
            page * limit).limit(limit).all()
        total = session.query(Agent).filter(
            Agent.is_public == 1).count()
        return data, total


def delete_agent(agent_id: int, user_id: int):
    """删除agent"""
    with Session(postgresql.postgres) as session:
        session.query(Agent).filter(Agent.id == agent_id, Agent.user_id == user_id).delete()
        session.commit()


def _bulk_insert_dataset(
        session: Session, agent_id: int, datasets: list[int],
        dataset_type: int):
    """批量增加数据集关系"""
    session.bulk_insert_mappings(AgentDataset,
                                 [{"agent_id": agent_id,
                                   "dataset_id": dataset_id,
                                   "dataset_type": dataset_type}
                                  for dataset_id in datasets])
    session.commit()


def add_agent(exact_datasets: list[int], fuzzy_datasets: list[int], **kwargs):
    """增加agent"""
    with Session(postgresql.postgres) as session:
        agent = Agent(**kwargs)
        session.add(agent)
        session.commit()
        session.refresh(agent)
        if exact_datasets:
            _bulk_insert_dataset(session, agent.id, exact_datasets, DatasetType.EXACT_SEARCH.value)
        if fuzzy_datasets:
            _bulk_insert_dataset(session, agent.id, fuzzy_datasets, DatasetType.FUZZY_SEARCH.value)
        return agent.id


def check_user_has_agent(user_id: int, agent_id: int):
    """检查用户是否有这个agent"""
    with Session(postgresql.postgres) as session:
        return session.query(Agent).filter(
            Agent.id == agent_id, Agent.user_id == user_id).count() > 0


def update_token(agent_id: int, token: str, user_id: int):
    """更新token"""
    with Session(postgresql.postgres) as session:
        session.query(Agent).filter(
            Agent.id == agent_id, Agent.user_id == user_id).update(
            {Agent.token: token})
        session.commit()
        
def update_is_public(agent_id: int, is_public: str, user_id: int):
    """更新token"""
    with Session(postgresql.postgres) as session:
        session.query(Agent).filter(
            Agent.id == agent_id, Agent.user_id == user_id).update(
            {Agent.is_public: is_public})
        session.commit()


def get_agent(agent_id: int, user_id: int):
    """联表获取agent"""
    with Session(postgresql.postgres) as session:
        return session.query(Agent, Model.name.label("model_name")).filter(
            or_(and_(Agent.id == agent_id, Agent.user_id == user_id),and_(Agent.is_public == 1,Agent.id == agent_id))).join(Agent.model).first()


def update_agent(
        agent_id: int, user_id: int, exact_datasets: list[int],
        fuzzy_datasets: list[int],
        **kwargs):
    """更新agent"""
    with Session(postgresql.postgres) as session:
        session.query(Agent).filter(
            Agent.id == agent_id, Agent.user_id == user_id).update(kwargs)
        session.query(AgentDataset).filter(AgentDataset.agent_id == agent_id).delete()
        if exact_datasets:
            _bulk_insert_dataset(session, agent_id, exact_datasets, DatasetType.EXACT_SEARCH.value)
        if fuzzy_datasets:
            _bulk_insert_dataset(session, agent_id, fuzzy_datasets, DatasetType.FUZZY_SEARCH.value)
        session.commit()


def get_agent_lite(agent_id: int) -> Agent:
    """获取agent"""
    with Session(postgresql.postgres) as session:
        return session.query(Agent).filter(Agent.id == agent_id).first()
