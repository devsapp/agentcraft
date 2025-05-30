"""MCP Service"""
import app.database.mcp as database


def list_mcp(user_id: int, page: int, limit: int):
    """获取用户的 MCP 列表"""
    return database.list_mcp(user_id, page, limit)


def add_mcp(**kwargs):
    """新增 MCP"""
    return database.add_mcp(**kwargs)


def delete_mcp(mcp_id: int, user_id: int):
    """删除指定的 MCP"""
    return database.delete_mcp(mcp_id, user_id)


def get_mcp(mcp_id: int, user_id: int):
    """获取指定的 MCP 信息"""
    data = database.get_mcp(mcp_id)
    if data and data["user_id"] == user_id:
        return data
    return None


def update_mcp(mcp_id: int, **kwargs):
    """更新指定的 MCP"""
    return database.update_mcp(mcp_id, **kwargs)
