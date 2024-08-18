"""Data Retrieval"""
import json
from typing import Any
from time import time
from app.common import utils
import requests
import codecs
from time import time

import app.database.assistant_dataset as assistant_dataset_database

DONE = "[DONE]"
RETRIEVAL_PROMPT_TEMPLATE = """已知信息：【{context}】。你需要积极，简洁和专业地来回答```中的问题。如果问题和已知信息没有关系，或者问题存在争议性，请说 “抱歉，无法回答该问题”，不允许编造。问题是：```{query}```"""

RETRIEVAL_INSTRUCTION_TEMPLATE = """你是领域有文档的专家，能够将文档内容更有价值的展示给用户，在你输出文档的时候尽量以富内容的形式展示，比如
你的内容是图片url，你应该输出![image](图片url);
你的内容是视频url，你的输出应当是<video width="320" height="240" controls src="视频url"/>;
如果你的信息中包含像 <标签名 /> 这类内容，直接输出就好。"""


def sanitize_text(text: str) -> str:
    """防止问题注入"""
    return text.replace("```", "")


def llm_retrieval_instruction(query: str, retrieval_data: str, **kwargs):
    if(kwargs['retrieval_prompt_template']):
        query = kwargs['retrieval_prompt_template'].replace(
            '{context}', sanitize_text(retrieval_data)).replace(
            '{query}', sanitize_text(query))
    stop_words = kwargs['stop_words'].split(',')
    im_end = '<|im_end|>'
    if im_end not in stop_words:
        stop_words = stop_words + [im_end]
    messages = [{
        "role": "system",
        "content": RETRIEVAL_INSTRUCTION_TEMPLATE
    }]
    messages.append({
        "role": "user",
        "content": query
    })
    # logger.info(messages)
    headers = {
        "Authorization": f"Bearer {kwargs['token']}",
        "Content-Type": "application/json"
    }
    request_data = json.dumps({
        "model": kwargs['model'],
        "messages": messages,
        "temperature": kwargs['temperature'],
        "top_p": kwargs['top_p'],
        "n": kwargs['n'],
        "max_tokens": kwargs['max_tokens'],
        "stop": stop_words,
        "presence_penalty": kwargs['presence_penalty'],
        "frequency_penalty": kwargs['frequency_penalty'],
        "logit_bias":  {}
    })
    resp = requests.post(kwargs['url'], headers=headers,
                         data=request_data, timeout=kwargs['timeout'])
    if resp.status_code != 200:
        raise ValueError("model request failed")
    resp_data = resp.json()
    if isinstance(resp_data, str):
        resp_data = json.loads(resp_data)
    answer = [ans["message"]["content"]
              for ans in resp_data["choices"] if ans["message"]["role"] == "kwargs"]

    output = answer[0]
    return output


def llm_retrieval_instruction_stream(query: str, retrieval_data: str, **kwargs):
    if(kwargs['retrieval_prompt_template']):
        query = kwargs['retrieval_prompt_template'].replace(
            '{context}', sanitize_text(retrieval_data)).replace(
            '{query}', sanitize_text(query))

    created = int(time())
    uid = kwargs['uid']
    model = kwargs['model']
    messages = [{
        "role": "system",
        "content": RETRIEVAL_INSTRUCTION_TEMPLATE
    }]
    messages.append({
        "role": "user",
        "content": query
    })

    headers = {
        "Authorization": f"Bearer {kwargs['token']}",
        "Content-Type": "application/json"
    }
    request_data = json.dumps({
        "model": model,
        "messages": messages,
        "temperature": kwargs['temperature'],
        "top_p": kwargs['top_p'],
        "n": kwargs['n'],
        "stream": True,
        "max_tokens": kwargs['max_tokens'],
        "stop": '',
        "presence_penalty": kwargs['presence_penalty'],
        "frequency_penalty": kwargs['frequency_penalty'],
        "logit_bias":  {}
    })
    resp = requests.post(kwargs['url'], headers=headers, stream=True,
                         data=request_data, timeout=kwargs['timeout'])                    

    answer = [""]
    for line in resp.iter_lines():
        if line:
            line = codecs.decode(line)
            if line.startswith("data:"):
                line = line[5:].strip()
                try:
                    chunk = json.loads(line)
                    chunk["id"] = uid
                    chunk["created"] = created
                    chunk["model"] = model
                    yield json.dumps(chunk)
                    if "choices" in chunk and len(
                            chunk["choices"]) > 0 and "delta" in chunk["choices"][0] and "content" in chunk["choices"][0]["delta"]:
                        content = chunk["choices"][0]["delta"]["content"]
                        if(chunk["choices"][0]["index"] >= len(answer)):
                            answer.append("")
                        answer[chunk["choices"][0]["index"]
                               ] += content

                except json.JSONDecodeError as err:
                    print(err)
    return answer[0]


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
