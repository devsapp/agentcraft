"""Data Retrieval"""

from typing import Any
from time import time
from app.common import utils

import app.database.assistant_dataset as assistant_dataset_database




def data_retrieval(query: str, assistant):
    embedding = utils.embed(query)[0]
    search_args = {
        "assistant_id": assistant.id,
        "embedding": embedding,
        "exact_search_similarity": assistant.exact_search_similarity,
        "fuzzy_search_similarity": assistant.fuzzy_search_similarity,
        "exact_search_limit": assistant.exact_search_limit,
        "fuzzy_search_limit": assistant.fuzzy_search_limit
    }
    similarity_search_res, use_model = assistant_dataset_database.similarity_search(
        **search_args)
    answer = ''
    if(use_model == True):
        for item in similarity_search_res:
            title = item[0]
            link = item[1]
            chunck = item[2]
            answer += chunck
    else:
        for item in similarity_search_res:
            chunk = item[0]
            answer += chunk
    return answer
