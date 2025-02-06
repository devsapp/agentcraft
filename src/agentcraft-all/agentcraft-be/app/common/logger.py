"""Logger Module"""
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)
logging.basicConfig(format="%(levelname) -5s %(asctime)s: %(message)s",datefmt="%Y-%m-%d %H:%M:%S")
