from sqlalchemy.orm import Session
from app.database.agent_session import AgentSession
from app.database.chat import Chat
from app.database.agent_session_chat import AgentSessionChat
from app.database.assistant_session import AssistantSession
from app.database.assistant_chat import AssistantChat
from app.database.assistant_session_chat import AssistantSessionChat
from app.database import postgresql  # 使用统一的数据库连接模块


class MultiAgentHistory:
    def __init__(self):
        self.db = Session(postgresql.postgres)  # 使用内置 Session
    def __enter__(self):
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.db.close()  # 确保关闭连接

    def search_agent_history_by_keyword(self, keyword: str):
       results = self.db.query(
            Chat.id,
            Chat.question,
            Chat.answer,
            Chat.created,
            Chat.modified,
            Chat.agent_id,
            Chat.model_name
        ).select_from(AgentSession)\
        .join(AgentSessionChat, AgentSession.id == AgentSessionChat.agent_session_id)\
        .join(Chat, Chat.id == AgentSessionChat.chat_id)\
        .filter(AgentSession.keyword == keyword)\
        .order_by(Chat.created.desc()).all()
       return [{
        "id": id,
        "question": question,
        "answer": answer,
        "created": created.isoformat() if created else None,
        "modified": modified.isoformat() if modified else None,
        "agent_id": agent_id,
        "model_name": model_name
    } for id, question, answer, created, modified, agent_id, model_name in results]
    def search_assistant_history_by_keyword(self, keyword: str):
        """
        根据 keyword 查询相关的 chat 历史记录

        Args:
            keyword (str): 要搜索的关键词

        Returns:
            List[Chat]: 匹配的聊天记录列表
        """
        results = self.db.query(
                AssistantChat.id,
                AssistantChat.question,
                AssistantChat.answer,
                AssistantChat.created,
                AssistantChat.modified,
                AssistantChat.assistant_id.label("agent_id"),  # 保持字段名一致
                AssistantChat.model_name
            ).select_from(AssistantSession)\
            .join(AssistantSessionChat, AssistantSession.id == AssistantSessionChat.assistant_session_id)\
            .join(AssistantChat, AssistantChat.id == AssistantSessionChat.chat_id)\
            .filter(AssistantSession.keyword == keyword)\
            .order_by(AssistantChat.created.desc()).all()

        return [{
            "id": id,
            "question": question,
            "answer": answer,
            "created": created.isoformat() if created else None,
            "modified": modified.isoformat() if modified else None,
            "agent_id": agent_id,
            "model_name": model_name
        } for id, question, answer, created, modified, agent_id, model_name in results]


# 对外暴露的函数接口（推荐使用方式）
def search_chat_history(keyword: str):
    """
    封装函数：初始化 MultiAgentHistory 并调用查询方法

    Args:
        keyword (str): 要搜索的关键词

    Returns:
        List[Chat]: 匹配的聊天记录列表
    """
    with MultiAgentHistory() as history:  # 自动管理连接生命周期
        agent_results = history.search_agent_history_by_keyword(keyword)
        assistant_results = history.search_assistant_history_by_keyword(keyword)
        all_results = agent_results + assistant_results
        return sorted(
            all_results,
            key=lambda x: x["created"] if x["created"] else ""
        )