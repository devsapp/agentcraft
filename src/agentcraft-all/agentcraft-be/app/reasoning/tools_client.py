import os
from io import BytesIO
from alibabacloud_tea_openapi.client import Client as OpenApiClient
from alibabacloud_tea_openapi import models as open_api_models
from alibabacloud_tea_util import models as util_models

class ToolsActionClient:
    def __init__(self):
        pass

    @staticmethod
    def create_client(
        access_key_id: str,
        access_key_secret: str,
    ) -> OpenApiClient:
        """
        使用AK&SK初始化账号Client
        @param access_key_id:
        @param access_key_secret:
        @return: Client
        @throws Exception
        """
        config = open_api_models.Config(

            access_key_id=access_key_id,
            access_key_secret=access_key_secret
        )
        account_id = os.environ['ACCOUNT_ID']
        region = os.environ['REGION']
        config.endpoint = f'{account_id}.{region}.fc.aliyuncs.com'
        return OpenApiClient(config)

    @staticmethod
    def create_api_info(
        function_name: str,
    ) -> open_api_models.Params:
        """
        API 相关
        @param path: params
        @return: OpenApi.Params
        """
        params = open_api_models.Params(
            # 接口名称,
            action='InvokeFunction',
            # 接口版本,
            version='2023-03-30',
            # 接口协议,
            protocol='HTTPS',
            # 接口 HTTP 方法,
            method='POST',
            auth_type='AK',
            style='FC',
            # 接口 PATH,
            pathname=f'/2023-03-30/functions/{function_name}/invocations',
            # 接口请求体内容格式,
            req_body_type='json',
            # 接口响应体内容格式,
            body_type='binary'
        )
        return params
    @staticmethod
    def invoke(
        function_name: str,
        function_param: str
    ) -> None:
        client = ToolsActionClient.create_client(os.environ['ALIBABA_CLOUD_ACCESS_KEY_ID'], os.environ['ALIBABA_CLOUD_ACCESS_KEY_SECRET'])
        params = ToolsActionClient.create_api_info(function_name)
        body = BytesIO(function_param.encode('utf-8'))
        runtime = util_models.RuntimeOptions()
        request = open_api_models.OpenApiRequest(stream=body)
        result = client.call_api(params, request, runtime)
        return result
    
    @staticmethod
    def invoke_async(
        function_name: str,
        function_param: str
    ) -> None:

        client = ToolsActionClient.create_client(os.environ['ALIBABA_CLOUD_ACCESS_KEY_ID'], os.environ['ALIBABA_CLOUD_ACCESS_KEY_SECRET'])
        params = ToolsActionClient.create_api_info(function_name)
        
        runtime = util_models.RuntimeOptions()
        request = open_api_models.OpenApiRequest()
   
        return client.call_api_async(params, request, runtime)






