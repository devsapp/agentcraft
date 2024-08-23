"""Chat Session Service"""
from fastapi import HTTPException
import app.database.agent as agent_database
import app.database.agent_session as agent_session_database
import app.chat.service as chat_service
from app.common.logger import logger


def check_user_has_agent(user_id, agent_id):
  if not agent_database.check_user_has_agent(user_id, agent_id):
    raise HTTPException(status_code=400, detail="user does not have this agent")
  

def get_session_by_assistant_id_and_keyword(agent_id, keyword):
  """获取session"""
  return agent_session_database.get_session_by_agent_id(agent_id, keyword)


def list_chat_session(agent_id: int, user_id: int, page: int, limit: int):
  """列出问答助手列表"""
  if not agent_database.check_user_has_agent(user_id, agent_id):
    raise ValueError("user does not have this chat")
  return agent_session_database.list_sessions(agent_id, page, limit)


def get_agent_histroy(agent_id: int, agent_session_id: int = None, keyword: str =None, page = 0, limit = 200):
  session_id = None
  if keyword is not None:
    data = agent_session_database.get_session_by_agent_id(agent_id, keyword = keyword)
    if data is None:
      return [], 0, None
    session_id = data.get('id')
  elif session_id is not None:
    session_id = agent_session_id
  else:
    raise HTTPException(status_code=422, detail="agent_session_id does not exist")
  data, total = chat_service.list_chats_history_by_session_id(agent_id, session_id, limit = limit, page = page)
  return data, total, session_id



def update_session_status(agent_session_id: int, user_id: int, status: int, source_status: int = 1):
  data = agent_session_database.get_session(agent_session_id, source_status)
  if not data:
    raise HTTPException(status_code=403, detail="user does not have this assistant session")
  agent_id = data.get('agent_id')
  logger.error(f'agent_id={agent_id}')
  check_user_has_agent(user_id, agent_id)
  agent_session_database.update_session(agent_session_id, status = status)
