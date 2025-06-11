"""Common Config"""
import os

WORK_DIR = os.path.dirname(os.path.dirname(__file__))
UPLOAD_ROOT_DIR = os.path.join(WORK_DIR, "upload")
TEMP_ROOT_DIR = os.path.join(WORK_DIR, "temp")
EMBEDDING_URL=os.environ.get('EMBEDDING_URL', '')
RERANK_URL=os.environ.get('RERANK_URL', '')
EMBEDDING_MODEL=os.environ.get('EMBEDDING_MODEL', 'text-embedding-v3')
EMBEDDING_TOKEN=os.environ.get('EMBEDDING_TOKEN', '')
EMBEDDING_TIMEOUT=int(os.environ.get('EMBEDDING_TIMEOUT', 600))

# Green Client Config
USE_GREEN_CLIENT = os.environ.get("USE_GREEN_CLIENT", False)
ACCESS_KEY_ID = os.environ.get('AK', '')
ACCESS_KEY_SECRET = os.environ.get('SK', '')
CONNECT_TIMEOUT = 3000
READ_TIMEOUT = 6000
REGION_ID = 'cn-shanghai'
ENDPOINT = 'green-cip.cn-shanghai.aliyuncs.com'



# History Settings
MAX_REQUEST_GROUPS = 10  # 请求历史最大保留对话组数
MAX_DATABASE_GROUPS = 10  # 数据库最大保留对话组数
MAX_TOTAL_GROUPS = 100   # 合并后总组数上限（按需添加）