"""Agent Service"""
from datetime import datetime, timedelta
import jwt
from app.agent import jwt_config
from app.database import agent as database, agent_dataset as relation_database

def remove_sa_instance_state(obj: dict) -> dict:
    """移除 SQLAlchemy 的 _sa_instance_state 属性"""
    obj.pop("_sa_instance_state", None)
    return obj

def create_token(agent_id: int, expires_delta: timedelta = timedelta(days=jwt_config.JWT_EXP)):
    """创建token"""
    exp = datetime.utcnow() + expires_delta
    jwt_data = {"sub": str(agent_id), "exp": exp}
    return jwt.encode(jwt_data, jwt_config.JWT_SECRET, algorithm=jwt_config.JWT_ALG), exp


def decode_token(token: str):
    """解析token"""
    return jwt.decode(token, jwt_config.JWT_SECRET, algorithms=[jwt_config.JWT_ALG])


def list_agents(app_id: int, user_id: int, page: int, limit: int) -> tuple[list[dict], int]:
    """获取agent列表"""
    data, total = database.list_agents(app_id, user_id, page, limit)
    data_dict = [vars(agent) for agent in data]
    return data_dict, total


def add_agent(**kwargs):
    """添加agent"""
    return database.add_agent(**kwargs)


def refresh_token(user_id: int, agent_id: int):
    """更新token"""
    token, exp = create_token(agent_id)
    database.update_token(agent_id, token, user_id)
    return {"token": token, "exp": exp}


def delete_agent(agent_id: int, user_id: int):
    """删除agent"""
    database.delete_agent(agent_id, user_id)


def get_agent(_id: int, user_id: int):
    """获取agent信息"""
    agent, model_name = database.get_agent(_id, user_id)
    relations = relation_database.list_datasets_by_agent_id(_id)
    
    datasets_dict = [{**vars(relation),
                      "dataset_name": dataset_name}
                     for relation, dataset_name in relations]
    
    datasets_dict = [remove_sa_instance_state(item) for item in datasets_dict]
    print(vars(agent), '111')
    agent = remove_sa_instance_state(vars(agent))
    agent_dict = {"datasets": datasets_dict, "model_name": model_name, **(agent), }
    return agent_dict

def get_public_agent_streamline_info(_id: int):
    """获取agent精简信息"""
    agent, model_name = database.get_agent(_id, None)  # user_id 为 None 表示不检查用户身份
    if agent.is_public == 1:
        return {
            "max_tokens": agent.max_tokens,
            "token": agent.token,
            "name": agent.name,
            "id": _id
        }
    else:
        return None

def update_agent(**kwargs):
    """更新agent"""
    database.update_agent(**kwargs)
def update_agent_is_public(agent_id: int, user_id: int, is_public: int):
    database.update_is_public(agent_id, is_public, user_id)