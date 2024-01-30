import os
from io import BytesIO
from alibabacloud_tea_openapi.client import Client as OpenApiClient
from alibabacloud_tea_openapi import models as open_api_models
from alibabacloud_tea_util import models as util_models


class ToolsActionClient:
    def __init__(self, credential_dict):
        self.credential_dict = credential_dict

    def create_client(
        self,
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
        account_id = self.credential_dict["account_id"] if self.credential_dict["account_id"] else os.environ['ACCOUNT_ID']
        if self.credential_dict["account_id"]:
            config = open_api_models.Config(
                access_key_id=self.credential_dict["access_key_id"],
                access_key_secret=self.credential_dict["access_key_secret"],
                security_token=self.credential_dict["security_token"],
            )
        else:
            config = open_api_models.Config(
                access_key_id=access_key_id,
                access_key_secret=access_key_secret
            )
        region = os.environ['REGION']
        config.endpoint = f'{account_id}.{region}.fc.aliyuncs.com'
        return OpenApiClient(config)

    def create_api_info(
        self,
        function_name: str,
    ) -> open_api_models.Params:
        """
        API 相关
        @param path: params
        @return: OpenApi.Params
        """
        params = open_api_models.Params(
            action='InvokeFunction',
            version='2023-03-30',
            protocol='HTTPS',
            method='POST',
            auth_type='AK',
            style='FC',
            pathname=f'/2023-03-30/functions/{function_name}/invocations',
            req_body_type='json',
            body_type='binary'
        )
        return params

    def invoke(
        self,
        function_name: str,
        function_param: str
    ) -> None:
        client = self.create_client(
            os.environ['ALIBABA_CLOUD_ACCESS_KEY_ID'], os.environ['ALIBABA_CLOUD_ACCESS_KEY_SECRET'])
        params = self.create_api_info(function_name)
        body = BytesIO(function_param.encode('utf-8'))
        runtime = util_models.RuntimeOptions(read_timeout=60000,
                                             connect_timeout=60000)
        request = open_api_models.OpenApiRequest(stream=body)
        result = client.call_api(params, request, runtime)
        return result

    def invoke_async(
        self,
        function_name: str,
        function_param: str
    ) -> None:

        client = self.create_client(
            os.environ['ALIBABA_CLOUD_ACCESS_KEY_ID'], os.environ['ALIBABA_CLOUD_ACCESS_KEY_SECRET'])
        params = self.create_api_info(function_name)
        runtime = util_models.RuntimeOptions()
        request = open_api_models.OpenApiRequest()

        return client.call_api_async(params, request, runtime)
