"""Assistant Session Service"""
import app.database.assistant as assistant_database
import app.database.assistant_session as assistant_session_database
import app.assistant_chat.service as assistant_chat_service

def list_assistant_session(assistant_id: int, user_id: int, page: int, limit: int):
  """列出问答助手列表"""
  if not assistant_database.check_user_has_assistant(user_id, assistant_id):
    raise ValueError("user does not have this assistant")
  return assistant_session_database.list_sessions(assistant_id, page, limit)

def get_assistant_histroy(assistant_id: int, assistant_session_id: int, status: int, limit):
  session_id = None
  if status == 0:
    data = assistant_session_database.get_test_session(assistant_id)
    if data:
      session_id = data.id
    else:
      raise ValueError("assistant_session_id does not exist")
  elif assistant_session_id is not None:
    session_id = assistant_session_id
  else:
    raise ValueError("assistant_session_id does not exist")

  return assistant_chat_service.list_assistant_chats_history_by_session_id(session_id, limit)