"""Main Entry"""
import os
import uvicorn
from app.db import create_tables
if os.environ.get("CREATE_TABLES", False):
    create_tables()
uvicorn.run("server:app",
            host="0.0.0.0",
            port=8000,
            forwarded_allow_ips="*",
            workers=int(os.environ.get("WORKERS", 1))) # More than 1 worker seems not supported
