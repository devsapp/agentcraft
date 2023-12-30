# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
import os
import sys

from typing import List

from alibabacloud_fc20230330.client import Client as FC20230330Client
from alibabacloud_tea_openapi import models as open_api_models
from alibabacloud_fc20230330 import models as fc20230330_models
from alibabacloud_tea_util import models as util_models
from alibabacloud_tea_util.client import Client as UtilClient


class FC:
    def __init__(self):
        pass

    @staticmethod
    def create_client(
        access_key_id: str,
        access_key_secret: str,
    ) -> FC20230330Client:
        """
        使用AK&SK初始化账号Client
        @param access_key_id:
        @param access_key_secret:
        @return: Client
        @throws Exception
        """
        config = open_api_models.Config(
            # 必填，您的 AccessKey ID,
            access_key_id=access_key_id,
            # 必填，您的 AccessKey Secret,
            access_key_secret=access_key_secret
        )
        # Endpoint 请参考 https://api.aliyun.com/product/FC
        config.endpoint = f'1767215449378635.cn-hangzhou.fc.aliyuncs.com'
        return FC20230330Client(config)

    @staticmethod
    async def invoke_fun(
        fun_name: str,
        fun_params: str
    ) -> None:

        client = Sample.create_client(os.environ['ALIBABA_CLOUD_ACCESS_KEY_ID'], os.environ['ALIBABA_CLOUD_ACCESS_KEY_SECRET'])
        invoke_function_headers = fc20230330_models.InvokeFunctionHeaders()
        invoke_function_request = fc20230330_models.InvokeFunctionRequest()
        runtime = util_models.RuntimeOptions()
        return await client.invoke_function_with_options_async(fun_name, invoke_function_request, invoke_function_headers, runtime)
          


