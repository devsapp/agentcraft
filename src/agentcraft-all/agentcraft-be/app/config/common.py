"""Common Config"""
import os

WORK_DIR = os.path.dirname(os.path.dirname(__file__))
UPLOAD_ROOT_DIR = os.path.join(WORK_DIR, "upload")
TEMP_ROOT_DIR = os.path.join(WORK_DIR, "temp")
EMBEDDING_URL=os.environ.get('EMBEDDING_URL', '')
RERANK_URL=os.environ.get('RERANK_URL', '')
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
