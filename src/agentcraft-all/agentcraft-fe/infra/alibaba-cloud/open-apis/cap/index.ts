
import * as $Devs20230714 from '@alicloud/devs20230714';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import OpenApiUtil from '@alicloud/openapi-util';
import * as $Util from '@alicloud/tea-util';
import { OpenApiConfig } from '../types';

import CapClient from "./capClient";

export interface IServiceDeploymentRequestData {
    pageNumber?: number;
    pageSize?: number;
    projectName: string,
    envName?: string,
    serviceName?: string,
}

export interface IServiceCreateProjectRequestData {
    projectName: string,  // cap 项目名
    templateName: string, // cap 模版名 ，有智能应用，mcp应用等
    templateParameters: any, // cap 模版参数 每一个模版都有自己的参数
    description?: string, // cap项目描述 
    serviceNameChanges: any, // 
    variableValues: any,
    envName: string
}

export class ServerlessBridgeCap {
    client: CapClient;
    clientOpenApi: any;
    accountId: any;
    constructor(config?: OpenApiConfig, accountId?: string) {
        this.accountId = accountId;
        this.client = this.createCapClient(config, accountId);
        this.clientOpenApi = this.createOpenApiClient(config, accountId);
    }
    createCapClient(config?: OpenApiConfig, accountId?: string) {
        const credential = config ?? {
            accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
            accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
        };
        const _config = new $OpenApi.Config(credential);
        _config.endpoint = `devs.${process.env.REGION || process.env.Region}.aliyuncs.com`;
        return new CapClient(_config);
    }

    createOpenApiClient(config?: OpenApiConfig, accountId?: string) {
        const credential = config ?? {
            accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
            accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
        };
        const _config = new $OpenApi.Config(credential);
        _config.endpoint = `devs.${process.env.REGION || process.env.Region}.aliyuncs.com`;

        return new OpenApi(_config);
    }

    async createProject(name: string, description: string) {
        const project = new $Devs20230714.Project({
            name,
            description,
        });
        const createProjectRequest = new $Devs20230714.CreateProjectRequest({
            body: project,
        });
        const runtime = new $Util.RuntimeOptions({});
        const headers: { [key: string]: string } = {};
        return await this.client.createProjectWithOptions(createProjectRequest, headers, runtime);
    }
    getDeployRoleArn() {
        return `acs:ram::${this.accountId}:role/aliyunfcdefaultrole`;
    }
    getEnvRoleArn() {
        return `acs:ram::${this.accountId}:role/aliyundevscustomrole`;
    }

    async renderServicesByTemplate(projectName: string, serviceNameChanges: any, templateName: string, templateParameters: any) {

        // const params = new $OpenApi.Params({
        //     // 接口名称
        //     action: "RenderServicesByTemplate",
        //     // 接口版本
        //     version: "2023-07-14",
        //     // 接口协议
        //     protocol: "HTTPS",
        //     // 接口 HTTP 方法
        //     method: "POST",
        //     authType: "AK",
        //     style: "ROA",
        //     // 接口 PATH
        //     pathname: `/2023-07-14/templates/action/renderServices`,
        //     // 接口请求体内容格式
        //     reqBodyType: "json",
        //     // 接口响应体内容格式
        //     bodyType: "json",
        // });
        // let body: { [key: string]: any } = {
        //     templateName,
        //     parameters,
        // };
        // // runtime options
        // let runtime = new $Util.RuntimeOptions({});
        // let request = new $OpenApi.OpenApiRequest({
        //     body: body,
        // });

        // await this.clientOpenApi.callApi(params, request, runtime);

        let renderServicesByTemplateRequest = new $Devs20230714.RenderServicesByTemplateRequest({
            parameters: templateParameters,
            templateName,
            serviceNameChanges,
            projectName
        });
        let runtime = new $Util.RuntimeOptions({});
        let headers: { [key: string]: string } = {};

        return await this.client.renderServicesByTemplateWithOptions(renderServicesByTemplateRequest, headers, runtime);
    }

    async updateEnvironment(projectName: string, envName: string, body: any) {
        const params = new $OpenApi.Params({
            action: "UpdateEnvironment",
            version: "2023-07-14",
            protocol: "HTTPS",
            method: "PUT",
            authType: "AK",
            style: "ROA",
            pathname: `/2023-07-14/projects/${projectName}/environments/${envName}`,
            reqBodyType: "json",
            bodyType: "json"
        });
        let runtime = new $Util.RuntimeOptions({});
        let request = new $OpenApi.OpenApiRequest({
            body: body,
        });
        return await this.clientOpenApi.callApi(params, request, runtime);
    }
    async deployEnvironment(projectName: string, envName: string, body?: any) {
        const params = new $OpenApi.Params({
            action: "DeployEnvironment",
            version: "2023-07-14",
            protocol: "HTTPS",
            method: "PATCH",
            authType: "AK",
            style: "ROA",
            pathname: `/2023-07-14/projects/${projectName}/environments/${envName}/deploy`,
            reqBodyType: "json",
            bodyType: "json"
        });
        let requestData: any = {};
        if (body) {
            requestData['body'] = body;
        }
        let runtime = new $Util.RuntimeOptions({});
        let request = new $OpenApi.OpenApiRequest(requestData);
        return await this.clientOpenApi.callApi(params, request, runtime);
    }

    async listServiceDeployments(data: IServiceDeploymentRequestData) {
        const { pageNumber, pageSize, projectName, envName, serviceName } = data;
        const params = new $OpenApi.Params({
            // 接口名称
            action: "ListServiceDeployments",
            // 接口版本
            version: "2023-07-14",
            // 接口协议
            protocol: "HTTPS",
            // 接口 HTTP 方法
            method: "GET",
            authType: "AK",
            style: "ROA",
            // 接口 PATH
            pathname: `/2023-07-14/servicedeployments`,
            // 接口请求体内容格式
            reqBodyType: "json",
            // 接口响应体内容格式
            bodyType: "json",
        });
        let queries: { [key: string]: any } = {};
        const queryParams = [
            `projectName=${projectName}`,
            `envName=${envName}`
        ]
        if (serviceName) {
            queryParams.push(`serviceName=${serviceName}`);
        }
        queries["labelSelector"] = OpenApiUtil.arrayToStringWithSpecifiedStyle(queryParams, "labelSelector", "simple");
        queries["pageNumber"] = pageNumber
        queries["pageSize"] = pageSize;
        let runtime = new $Util.RuntimeOptions({});
        let request = new $OpenApi.OpenApiRequest({
            query: OpenApiUtil.query(queries),
        });
        return await this.clientOpenApi.callApi(params, request, runtime);
    }

    async getEnvironment(projectName: string, envName: string) {
        const params = new $OpenApi.Params({
            action: "GetEnvironment",
            version: "2023-07-14",
            protocol: "HTTPS",
            method: "GET",
            authType: "AK",
            style: "ROA",
            pathname: `/2023-07-14/projects/${projectName}/environments/${envName}`,
            reqBodyType: "json",
            bodyType: "json"
        });
        let runtime = new $Util.RuntimeOptions({});
        let request = new $OpenApi.OpenApiRequest({});
        return await this.clientOpenApi.callApi(params, request, runtime);

    }

}