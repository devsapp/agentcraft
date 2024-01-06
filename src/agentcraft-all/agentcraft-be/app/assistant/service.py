"""Agent Service"""
from datetime import datetime, timedelta
import jwt
from app.assistant import jwt_config
from app.database import assistant as database, assistant_dataset as relation_database , assistant_action_tools as action_tools_database


def create_token(assistant_id: int, expires_delta: timedelta = timedelta(days=jwt_config.JWT_EXP)):
    """创建token"""
    exp = datetime.utcnow() + expires_delta
    jwt_data = {"sub": assistant_id, "exp": exp}
    return jwt.encode(jwt_data, jwt_config.JWT_SECRET, algorithm=jwt_config.JWT_ALG), exp


def decode_token(token: str):
    """解析token"""
    return jwt.decode(token, jwt_config.JWT_SECRET, algorithms=[jwt_config.JWT_ALG])


def list_assistants(app_id: int, user_id: int, page: int, limit: int) -> tuple[list[dict], int]:
    """获取assistant列表"""
    data, total = database.list_assistants(app_id, user_id, page, limit)
    data_dict = [vars(assistant) for assistant in data]
    return data_dict, total


def add_assistant(**kwargs):
    """添加assistant"""
    database.add_assistant(**kwargs)


def refresh_token(user_id: int, assistant_id: int):
    """更新token"""
    token, exp = create_token(assistant_id)
    database.update_token(assistant_id, token, user_id)
    return {"token": token, "exp": exp}


def delete_assistant(assistant_id: int, user_id: int):
    """删除assistant"""
    database.delete_assistant(assistant_id, user_id)


def get_assistant(_id: int, user_id: int):
    """获取assistant信息"""
    assistant, model_name = database.get_assistant(_id, user_id)
    relations = relation_database.list_datasets_by_assistant_id(_id)
    relations_at = action_tools_database.list_action_tools_by_assistant_id(_id)
    datasets_dict = [{**vars(relation),
                      "dataset_name": dataset_name}
                     for relation, dataset_name in relations]
    print(f"relations_at{relations_at}")
    action_tools_dict = [id for id in relations_at]
    exp = ""
    if assistant.token:
        exp = decode_token(assistant.token)["exp"]
    assistant_dict = {"exp": exp, "datasets": datasets_dict,"action_tools": action_tools_dict, "model_name": model_name, **vars(assistant), }
    return assistant_dict


def update_assistant(**kwargs):
    """更新assistant"""
    database.update_assistant(**kwargs)
