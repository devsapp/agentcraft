"""Chat Session Service"""
import app.database.agent as agent_database
import app.database.agent_session as agent_session_database
import app.chat.service as chat_service

def list_chat_session(agent_id: int, user_id: int, page: int, limit: int):
  """列出问答助手列表"""
  if not agent_database.check_user_has_agent(user_id, agent_id):
    raise ValueError("user does not have this chat")
  return agent_session_database.list_sessions(agent_id, page, limit)

def get_agent_histroy(agent_id: int, agent_session_id: int, status: int, limit):
  session_id = None
  if status == 0:
    data = agent_session_database.get_test_session(agent_id)
    if data:
      session_id = data.id
    else:
      raise ValueError("chat_session_id does not exist")
  elif agent_session_id is not None:
    session_id = agent_session_id
  else:
    raise ValueError("chat_session_id does not exist")

  return chat_service.list_chats_history_by_session_id(agent_id, session_id, limit)