"""Redis数据库"""
import redis
from app.config import database as config
# Redis Connection Pool
# connection_pool = redis.ConnectionPool(
#     host=config.REDIS_HOST, 
#     port=config.REDIS_PORT, 
#     username=config.REDIS_USER,
#     password=config.REDIS_PASSWORD, 
#     db=0)
# Redis Database
# redis_db = redis.Redis(connection_pool=connection_pool, 
#                        decode_responses=True,
#                        socket_connect_timeout=config.REDIS_SOCKET_CONNECT_TIMEOUT,
#                        socket_timeout=config.REDIS_SOCKET_TIMEOUT)
