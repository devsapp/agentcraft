"""Green Client"""
# pylint: disable=invalid-name
import json
import uuid
from alibabacloud_green20220302.client import Client as GreenClient
from alibabacloud_green20220302 import models as green_models
from alibabacloud_tea_util.client import Client as GreenUtilClient
from alibabacloud_tea_util import models as green_util_models
from alibabacloud_tea_openapi.models import Config as OpenApiConfig
from app.config import common as config
from app.common.logger import logger
RUNTIME_TIMEOUT = 10000
# 阿里云绿网客户端配置
green_client_config = OpenApiConfig(
    access_key_id=config.ACCESS_KEY_ID,
    access_key_secret=config.ACCESS_KEY_SECRET,
    connect_timeout=config.CONNECT_TIMEOUT,
    read_timeout=config.READ_TIMEOUT,
    region_id=config.REGION_ID,
    endpoint=config.ENDPOINT)
green_client = None  # 绿网，注意，此处实例化的client请尽可能重复使用，避免重复建立连接，提升检测性能


def is_legal(question: str) -> bool:
    """判断问题是否合法"""
    text_moderation_request = green_models.TextModerationRequest(
        service='ai_art_detection',
        service_parameters=json.dumps({
            'content': question,
            'dataId': str(uuid.uuid1())
        })
    )
    runtime = green_util_models.RuntimeOptions(
        read_timeout=RUNTIME_TIMEOUT, connect_timeout=RUNTIME_TIMEOUT)
    try:
        global green_client  # pylint: disable = global-statement
        if not green_client:
            green_client = GreenClient(green_client_config)
        response = green_client.text_moderation_with_options(
            text_moderation_request, runtime)  # pylint: disable = used-before-assignment
        if GreenUtilClient.equal_number(500, response.status_code) or not response or not response.body or 200 != response.body.code:
            green_client_config.region_id = 'cn-beijing'  # 服务端错误，区域切换到cn-beijing
            green_client_config.endpoint = 'green-cip.cn-beijing.aliyuncs.com'
            green_client = GreenClient(
                green_client_config)  # pylint: disable = redefined-outer-name
            response = green_client.text_moderation_with_options(
                text_moderation_request, runtime)
        if response.status_code == 200:
            result = response.body
            if result.code == 200:
                result_data = result.data
                if result_data.labels:
                    logger.info('labels: %s, reason: %s',
                                result_data.labels, result_data.reason)
                else:
                    return True
        else:
            logger.info("response not success. status: %s ,result: %s",
                        response.status_code, response)
    except Exception as err:  # pylint: disable = broad-except
        logger.info(err)
    return False
