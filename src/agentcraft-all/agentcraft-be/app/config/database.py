"""Database Configuration"""
import os
from urllib.parse import quote_plus

REDIS_HOST = os.environ.get('REDIS_HOST', '')
REDIS_PORT = int(os.environ.get('REDIS_PORT', 6379))
REDIS_USER = quote_plus(os.environ.get('REDIS_USER', ''))
REDIS_PASSWORD = quote_plus(os.environ.get('REDIS_PASSWORD', ''))
REDIS_SOCKET_CONNECT_TIMEOUT = int(os.environ.get('REDIS_SOCKET_CONNECT_TIMEOUT', 5))
REDIS_SOCKET_TIMEOUT = int(os.environ.get('REDIS_SOCKET_TIMEOUT', 5))
POSTGRES_DATABASE = os.environ.get('POSTGRES_DATABASE', '')
POSTGRES_USER = quote_plus(os.environ.get('POSTGRES_USER', ''))
POSTGRES_PASSWORD = quote_plus(os.environ.get('POSTGRES_PASSWORD', ''))
POSTGRES_HOST = os.environ.get('POSTGRES_HOST', '')
POSTGRES_PORT = int(os.environ.get('POSTGRES_PORT', 5432))
POSTGRES_URL = f'postgresql+psycopg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DATABASE}'
