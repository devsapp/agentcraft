
import * as $OpenApi from '@alicloud/openapi-client';
import { CreateApplicationRequest, ListApplicationsRequest, } from '@alicloud/serverless20210924';
import FC20230330, * as $FC20230330 from '@alicloud/fc20230330';
import Util, * as $Util from '@alicloud/tea-util';
import { InvokeFunctionRequest, InvokeFunctionHeaders, ListFunctionsHeaders, ListFunctionsRequest, UpdateFunctionHeaders, UpdateFunctionRequest, GetServiceHeaders, GetServiceRequest, UpdateServiceHeaders, TracingConfig, UpdateServiceRequest, VPCConfig } from '@alicloud/fc-open20210406';
import ServerlessDevsClient from "./serverlessDevsClient";
import FcClient from "./fcClient";
import FcClientV3 from "./fcClientV3";
import { OpenApiConfig, FC3AsyncInvokeConfig } from '../types';





export class ServerlessBridgeServerlessDevs {
    client: ServerlessDevsClient;
    constructor(config?: OpenApiConfig) {
        this.client = this.createServerlessDevsClient(config);
    }
    createServerlessDevsClient(config?: OpenApiConfig) {
        const credential = config ?? {
            accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
            accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
        }
        credential.endpoint = `serverless-dualstack.cn-hangzhou.aliyuncs.com`
        const _config = new $OpenApi.Config(credential);
        return new ServerlessDevsClient(_config);
    }

    async createApplication(payload: any) {
        const createAppData = new CreateApplicationRequest(payload);
        const data = await this.client.createApplication(createAppData);
        return data;
    }

    async deleteApplication(appName: string) {

        const data = await this.client.deleteApplication(appName)
        return data;
    }

    async getApplication(appName: string) {
        const runtimeObject = new $Util.RuntimeOptions({ ReadTimeout: 60000 });
        const headers: { [key: string]: string } = {};
        return await this.client.getApplicationWithOptions(appName, headers, runtimeObject);
    }

    async listApplications() {
        const listApplicationData = new ListApplicationsRequest({});
        const data = await this.client.listApplications(listApplicationData);
        return data;
    }
}
interface UpdateFunctionConfigProps {
    serviceName: string,
    functionName: string,
    environmentVariables?: any
}

export class ServerlessBridgeFc {
    client: FcClient;
    constructor(config?: OpenApiConfig, accountId?: string) {
        this.client = this.createFcClient(config, accountId);
    }
    createFcClient(config?: OpenApiConfig, accountId?: string) {
        const credential = config ?? {
            accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
            accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
        }
        credential.endpoint = `${accountId}.${process.env.Region}.fc.aliyuncs.com`
        const _config = new $OpenApi.Config(credential);
        return new FcClient(_config);
    }

    async invokeFunction(fcInvokeData: any, payload: any) {

        const invokeFunctionHeaders = new InvokeFunctionHeaders({});
        const invokeFunctionRequest = new InvokeFunctionRequest({ body: Util.toBytes(JSON.stringify(payload)) });
        const runtime = new $Util.RuntimeOptions({});
        return await this.client.invokeFunctionWithOptions(fcInvokeData.serviceName, fcInvokeData.functionName, invokeFunctionRequest, invokeFunctionHeaders, runtime);
    }

    async listFunctions(payload: any) {
        const listFunctionsHeaders = new ListFunctionsHeaders({});
        const listFunctionsRequest = new ListFunctionsRequest(payload);
        const runtime = new $Util.RuntimeOptions({});
        return await this.client.listFunctionsWithOptions("", listFunctionsRequest, listFunctionsHeaders, runtime);
    }
    async updateFunction(payload: UpdateFunctionConfigProps) {
        const updateFunctionHeaders = new UpdateFunctionHeaders({});
        const environmentVariables = payload.environmentVariables;
        const updateFunctionRequest = new UpdateFunctionRequest({
            environmentVariables: environmentVariables,
        });
        const runtime = new $Util.RuntimeOptions({});
        return await this.client.updateFunctionWithOptions(payload.serviceName, payload.functionName, updateFunctionRequest, updateFunctionHeaders, runtime);
    }

    async getService(payload: any) {
        const getServiceHeaders = new GetServiceHeaders({});
        const getServiceRequest = new GetServiceRequest({});
        const runtime = new $Util.RuntimeOptions({});
        return await this.client.getServiceWithOptions(payload.serviceName, getServiceRequest, getServiceHeaders, runtime);
    }
    async updateService(serviceName: string, payload: any) {
        const updateServiceHeaders = new UpdateServiceHeaders({});
        const vpcConfig = new VPCConfig(payload.vpcConfig);
        const tracingConfig = new TracingConfig(payload.tracingConfig);
        const updateServiceRequest = new UpdateServiceRequest({
            tracingConfig,
            vpcConfig,
        });
        const runtime = new $Util.RuntimeOptions({});
        return await this.client.updateServiceWithOptions(serviceName, updateServiceRequest, updateServiceHeaders, runtime);
    }

    async getFunction(payload: UpdateFunctionConfigProps) {
        const params = new $OpenApi.Params({
            // 接口名称
            action: "GetFunction",
            // 接口版本
            version: "2021-04-06",
            // 接口协议
            protocol: "HTTPS",
            // 接口 HTTP 方法
            method: "GET",
            authType: "AK",
            style: "FC",
            // 接口 PATH
            pathname: `/2021-04-06/services/${payload.serviceName}/functions/${payload.functionName}`,
            // 接口请求体内容格式
            reqBodyType: "json",
            // 接口响应体内容格式
            bodyType: "json",
        });
        // runtime options
        const runtime = new $Util.RuntimeOptions({});
        const request = new $OpenApi.OpenApiRequest({});
        return await this.client.callApi(params, request, runtime);
    }


}


export class ServerlessBridgeFcV3 {
    client: FcClientV3;
    constructor(config?: OpenApiConfig, accountId?: string) {
        this.client = this.createFcClient(config, accountId);
    }
    createFcClient(config?: OpenApiConfig, accountId?: string) {
        const credential = config ?? {
            accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
            accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
        }
        credential.endpoint = `${accountId}.${process.env.Region}.fc.aliyuncs.com`
        const _config = new $OpenApi.Config(credential);
        return new FcClientV3(_config);
    }



    async getFunction(functionName: string) {
        const getFunctionRequest = new $FC20230330.GetFunctionRequest({});
        const runtime = new $Util.RuntimeOptions({});
        const headers: { [key: string]: string } = {};
        return await this.client.getFunctionWithOptions(functionName, getFunctionRequest, headers, runtime);
    }


    async listFunction(prefix = '', nextToken = '', limit = 10) {
        const listFunctionsRequest = new $FC20230330.ListFunctionsRequest({
            limit,
            prefix,
            nextToken
        });
        const runtime = new $Util.RuntimeOptions({});
        const headers: { [key: string]: string } = {};
        return await this.client.listFunctionsWithOptions(listFunctionsRequest, headers, runtime);
    }

    async updateFunction(functionName: string, body: any) {
        const updateFunctionInput = new $FC20230330.UpdateFunctionInput(body);
        const updateFunctionRequest = new $FC20230330.UpdateFunctionRequest({
            body: updateFunctionInput,
        });
        const runtime = new $Util.RuntimeOptions({});
        const headers: { [key: string]: string } = {};
        return await this.client.updateFunctionWithOptions(functionName, updateFunctionRequest, headers, runtime);
    }
    async putAsyncInvokeConfig(functionName: string, config: FC3AsyncInvokeConfig) {
        const putAsyncInvokeConfigRequest = new $FC20230330.PutAsyncInvokeConfigRequest({
            body: config,
        });
        const runtime = new $Util.RuntimeOptions({});
        const headers: { [key: string]: string } = {};

        return await this.client.putAsyncInvokeConfigWithOptions(functionName, putAsyncInvokeConfigRequest, headers, runtime);
    }

    async invokeFunction(functionName: string, payload: any) {
        const invokeFunctionHeaders = new $FC20230330.InvokeFunctionHeaders({});
        const invokeFunctionRequest = new $FC20230330.InvokeFunctionRequest({
            body: payload
        });
        const runtime = new $Util.RuntimeOptions({
            readTimeout: 60000,  // 设置读取响应的超时时间为60秒
            connectTimeout: 10000  // 设置建立连接的超时时间为10秒
        });

        return await this.client.invokeFunctionWithOptions(functionName, invokeFunctionRequest, invokeFunctionHeaders, runtime);
    }
}