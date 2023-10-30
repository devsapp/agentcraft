
import * as $OpenApi from '@alicloud/openapi-client';
import { CreateApplicationRequest, ListApplicationsRequest } from '@alicloud/serverless20210924';
import Util, * as $Util from '@alicloud/tea-util';
import { InvokeFunctionRequest, InvokeFunctionHeaders, ListFunctionsHeaders, ListFunctionsRequest } from '@alicloud/fc-open20210406';
import ServerlessDevsClient from "./serverlessDevsClient";
import FcClient from "./fcClient";
import { OpenApiConfig } from '../types';





export class ServerlessBridgeServerlessDevs {
    client: ServerlessDevsClient;
    constructor(config?: OpenApiConfig) {
        this.client = this.createServerlessDevsClient(config);
    }
    createServerlessDevsClient(config?: OpenApiConfig) {
        const credential = config ?? {
            accessKeyId: process.env.AK,
            accessKeySecret: process.env.SK,
        }
        credential.endpoint = `serverless-dualstack.ap-southeast-1.aliyuncs.com`
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
        return await this.client.getApplication(appName);
    }

    async listApplications() {
        const listApplicationData = new ListApplicationsRequest({});
        const data = await this.client.listApplications(listApplicationData);
        return data;
    }
}


export class ServerlessBridgeFc {
    client: FcClient;
    constructor(accountId: string, config?: OpenApiConfig) {
        this.client = this.createFcClient(accountId, config);
    }
    createFcClient(accountId: string, config?: OpenApiConfig) {
        const credential = config ?? {
            accessKeyId: process.env.AK,
            accessKeySecret: process.env.SK,
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
}


export async function invokeFunction(client: FcClient, fcInvokeData: any, payload: any) {

    const invokeFunctionHeaders = new InvokeFunctionHeaders({});

    const invokeFunctionRequest = new InvokeFunctionRequest({ body: Util.toBytes(JSON.stringify(payload)) });
    const runtime = new $Util.RuntimeOptions({});
    return await client.invokeFunctionWithOptions(fcInvokeData.serviceName, fcInvokeData.functionName, invokeFunctionRequest, invokeFunctionHeaders, runtime);
}


export async function listFunctions(client: FcClient, payload: any) {
    const listFunctionsHeaders = new ListFunctionsHeaders({});
    const listFunctionsRequest = new ListFunctionsRequest(payload);
    const runtime = new $Util.RuntimeOptions({});
    return await client.listFunctionsWithOptions("", listFunctionsRequest, listFunctionsHeaders, runtime);
}