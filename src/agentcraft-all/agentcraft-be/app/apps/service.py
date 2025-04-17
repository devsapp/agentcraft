"""App Service"""
import app.database.app as database


def list_apps(user_id: int, page: int, limit: int):
    """获取应用列表"""
    data, total = database.list_apps(user_id, page, limit)
    return data, total


def add_app(**kwargs):
    """增加应用"""
    return database.add_app(**kwargs)


def delete_app(app_id: int, user_id: int):
    """删除应用"""
    database.delete_app(app_id, user_id)


def get_app(_id: int, user_id: int):
    """获取应用信息"""
    app = database.get_app(_id, user_id)
    return app


def update_app(**kwargs):
    """更新应用"""
    database.update_app(**kwargs)
