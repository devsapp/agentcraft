"""ActionTools Service"""
import app.database.multiagent as database


def list_multiagent_history(keyword: str):
    """获取multiagent对话历史数据列表"""
    data = database.search_chat_history(keyword)
    return data


