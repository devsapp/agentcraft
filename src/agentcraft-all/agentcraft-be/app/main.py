"""Main Entry"""
import os
try:
    from dotenv import load_dotenv
    load_dotenv()  # take environment variables from .env.
except ModuleNotFoundError:
    print("dotenv module not installed. Skipping loading .env file.")
from app.db import create_tables
# from traceloop.sdk import Traceloop
if os.environ.get("CREATE_TABLES", False):
    create_tables()
# Traceloop.init(app_name="agentcraft", disable_batch=True)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app",
                host="0.0.0.0",
                port=8000,
                forwarded_allow_ips="*",
                workers=int(os.environ.get("WORKERS", 1)),
                reload=os.environ.get('ENVIRONMENT') == 'development')  # More than 1 worker seems not supported
