"""Assistant Session Service"""
import app.database.assistant as assistant_database
import app.database.assistant_session as assistant_session_database
import app.assistant_chat.service as assistant_chat_service
from app.common.logger import logger

def list_assistant_session(assistant_id: int, user_id: int, page: int, limit: int):
  """列出问答助手列表"""
  if not assistant_database.check_user_has_assistant(user_id, assistant_id):
    raise ValueError("user does not have this assistant")
  return assistant_session_database.list_sessions(assistant_id, page, limit)

def get_assistant_histroy(assistant_id: int, assistant_session_id: int, status: int, limit):
  session_id = None
  if status == 0:
    data = assistant_session_database.get_session_by_assistant_id(assistant_id, status=0)
    if data:
      session_id = data.id
    else:
      raise ValueError("assistant_session_id does not exist")
  elif assistant_session_id is not None:
    session_id = assistant_session_id
  else:
    raise ValueError("assistant_session_id does not exist")

  return assistant_chat_service.list_assistant_chats_history_by_session_id(session_id, limit)

def update_assistant_session_status(assistant_session_id: int, user_id: int, status: int, source_status: int = 1):
  data = assistant_session_database.get_session(assistant_session_id, source_status)
  if not data:
    raise ValueError("user does not have this assistant session")
  if not assistant_database.check_user_has_assistant(user_id, data.assistant_id):
    logger.error(f'No data found for user_id={user_id}, assistant_id={data.assistant_id}')
    raise ValueError("No permission")
  if status == 0 and assistant_session_database.get_session_by_assistant_id(data.assistant_id, status=0):
    raise ValueError("Test session already exists, please verify parameters")
  assistant_session_database.update_session(assistant_session_id, status = status)
