"""ActionTools Service"""
import app.database.action_tools as database


def list_action_tools(user_id: int, page: int, limit: int):
    """获取action_tools列表"""
    data, total = database.list_action_tools(user_id, page, limit)
    return data, total


def add_action_tools(**kwargs):
    """增加action_tools"""
    return database.add_action_tools(**kwargs)


def delete_action_tools(action_tools_id: int, user_id: int):
    """删除action_tools"""
    database.delete_action_tools(action_tools_id, user_id)


def get_action_tools(_id: int, user_id: int):
    """获取action_tools信息"""
    action_tools = database.get_action_tools(_id, user_id)
    return vars(action_tools)


def update_action_tools(**kwargs):
    """更新action_tools"""
    database.update_action_tools(**kwargs)
