"""Agent JWT Configuration"""
import os
JWT_EXP = 365
JWT_SECRET = os.environ.get("JWT_SECRET", "")
JWT_ALG: str = "HS256"
