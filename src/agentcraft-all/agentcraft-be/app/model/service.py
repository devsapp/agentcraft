"""Model Service"""
import app.database.model as database


def list_models(user_id: int, page: int, limit: int):
    """列出所有模型"""
    data, total = database.list_models(user_id, page, limit)
    data_dict = [vars(model) for model in data]
    return data_dict, total


def add_model(**kwargs):
    """添加模型"""
    return database.add_model(**kwargs)


def delete_model(model_id: int, user_id: int):
    """删除模型"""
    database.delete_model(model_id, user_id)


def get_model(model_id: int, user_id: int):
    """获取模型信息"""
    model = database.get_model(model_id, user_id)
    return vars(model)


def update_model(**kwargs):
    """更新模型信息"""
    database.update_model(**kwargs)
