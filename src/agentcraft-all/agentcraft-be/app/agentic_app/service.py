"""AgenticApp Service"""
import app.database.agentic_app as database


def list_agentic_apps(user_id: int, page: int, limit: int):
    """获取用户的所有 AgenticApp 列表"""
    return database.list_agentic_apps(user_id, page, limit)


def add_agentic_app(**kwargs):
    """新增 AgenticApp"""
    return database.add_agentic_app(**kwargs)


def delete_agentic_app(app_id: int, user_id: int):
    """删除指定的 AgenticApp"""
    return database.delete_agentic_app(app_id, user_id)


def get_agentic_app(app_id: int, user_id: int):
    """获取指定的 AgenticApp 信息"""
    data = database.get_agentic_app(app_id)
    if data and data["user_id"] == user_id:
        return data
    return None


def update_agentic_app(app_id: int, **kwargs):
    """更新指定的 AgenticApp"""
    return database.update_agentic_app(app_id, **kwargs)
