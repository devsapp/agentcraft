"""Assistant Session Service"""
import app.database.assistant as assistant_database
import app.database.assistant_session as assistant_session_database
import app.assistant_chat.service as assistant_chat_service
from app.common.logger import logger
from fastapi import HTTPException

def check_user_has_assistant(user_id, assistant_id):
  if not assistant_database.check_user_has_assistant(user_id, assistant_id):
    raise HTTPException(status_code=400, detail="user does not have this assistant")

def list_assistant_session(assistant_id: int, page: int, limit: int):
  """获取session列表"""
  return assistant_session_database.list_sessions(assistant_id, page, limit)

def get_session_by_id(id):
  """获取session"""
  data = assistant_session_database.get_session(id)
  if data is None:
    raise HTTPException(status_code=400, detail="assistant_session_id does not exist")
  return data


def get_session_by_assistant_id_and_keyword(assistant_id, keyword):
  """获取session"""
  return assistant_session_database.get_session_by_assistant_id_and_keyword(assistant_id, keyword)


def get_assistant_histroy(assistant_id: int, assistant_session_id: int = None, keyword: str = None, page = 0, limit = 200):
  """获取历史记录"""
  session_id = None
  if keyword is not None:
    data = get_session_by_assistant_id_and_keyword(assistant_id, keyword)
    if data is None:
      return [], 0, None
    session_id = data.get('id')
  elif assistant_session_id is not None:
    session_id = assistant_session_id
  else:
    raise HTTPException(status_code=422, detail="assistant_session_id does not exist")
  data, total = assistant_chat_service.list_assistant_chats_history_by_session_id(session_id, page, limit)
  return data, total, session_id


def update_assistant_session_status(assistant_session_id: int, user_id: int, status: int, source_status: int = 1):
  data = assistant_session_database.get_session(assistant_session_id, source_status)
  if not data:
    raise HTTPException(status_code=403, detail="user does not have this assistant session")
  assistant_id = data.get('assistant_id')
  if not assistant_database.check_user_has_assistant(user_id, assistant_id):
    logger.error(f'No data found for user_id={user_id}, assistant_id={assistant_id}')
    raise HTTPException(status_code=403, detail="No permission")
  assistant_session_database.update_session(assistant_session_id, status = status)
