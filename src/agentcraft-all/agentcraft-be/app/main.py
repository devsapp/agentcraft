"""Main Entry"""
import os
try:
    from dotenv import load_dotenv
    load_dotenv()  # take environment variables from .env.
except ModuleNotFoundError:
    print("dotenv module not installed. Skipping loading .env file.")
from app.db import create_tables
if os.environ.get("CREATE_TABLES", False):
    create_tables()

if __name__ == "__main__":
    import uvicorn
    # TODO: reload 需要判断一下环境信息，如果是生产环境则需要将之设置成False
    uvicorn.run("server:app",
                host="0.0.0.0",
                port=8000,
                forwarded_allow_ips="*",
                workers=int(os.environ.get("WORKERS", 1)),
                reload=True) # More than 1 worker seems not supported
