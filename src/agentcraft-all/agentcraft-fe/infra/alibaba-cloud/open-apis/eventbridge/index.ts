
import * as $OpenApi from '@alicloud/openapi-client';
import { nanoid } from "nanoid";
import { CreateRuleRequestEventTargetsParamList, CreateRuleRequestEventTargets, CreateRuleRequest, CreateEventBusRequest, GetEventBusRequest } from '@alicloud/eventbridge20200401';
import { AGENTCRAFT_BUS_NAME } from 'constants/client-access';
import * as $Util from '@alicloud/tea-util';
import EventbridgeClient from "./eventbridgeClient";
import { OpenApiConfig } from '../types';



type CreateEventBusParams = {
    EventBusName: string;
    Description: string
}

type CreateEventRuleParams = {
    webhook: string;
    token: string;
    region: string,
    serviceName: string,
    functionName: string,
    uid: string
}

type PutFunctionAsyncInvokeConfigParams = {
    serviceName: string,
    functionName: string,
    uid: string,
    region: string
}
type AttachPolicyToRole = {
    policyType: string,
    policyName: string,
    roleName: string
}

export interface AssumeRoleRequestPayload {
    durationSeconds?: number,
    policy?: string,
    roleArn: string,
    roleSessionName: string,
    externalId?: string

}


export interface AssumeRoleResponse {
    DurationSeconds?: number,
    Policy?: string,
    RoleArn: string,
    RoleSessionName: string,
    ExternalId?: string

}

export class ServerlessBridgeEventbridge {
    client: EventbridgeClient;
    constructor(config?: OpenApiConfig) {
        this.client = this.createEventbridgeClient(config);
    }
    createEventbridgeClient(config?: OpenApiConfig) {
        const credential = config ?? {
            accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
            accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
        }
        credential.endpoint = `eventbridge-console.${process.env.Region}.aliyuncs.com`;
        const _config = new $OpenApi.Config(credential);
        return new EventbridgeClient(_config);
    }

    async creatEventRule(eventruleData: CreateEventRuleParams) {
        const { webhook, token, region, functionName, uid } = eventruleData;
        const title = process.env.title || '智能体回答';

        let result = {};
        const eventTargets0ParamList0 = new CreateRuleRequestEventTargetsParamList({
            "resourceKey": "URL",
            "value": webhook,
            "form": "CONSTANT"
        });
        const eventTargets0ParamList1 = new CreateRuleRequestEventTargetsParamList({
            "resourceKey": "SecretKey",
            "value": token,
            "form": "CONSTANT"
        });
        const eventTargets0ParamList2 = new CreateRuleRequestEventTargetsParamList({
            "resourceKey": "Body",
            "value": "{\n \"text\":\"$.data.responsePayload\"\n}",
            "form": "TEMPLATE",
            template: "{\n   \"msgtype\": \"markdown\",\n    \"markdown\": {\n      \"title\": \"" + title + "\",\n      \"text\": \"${jsonEscape(text)}\"\n    }\n}"
        });


        const eventTargets0 = new CreateRuleRequestEventTargets({
            "id": nanoid(),
            "type": "acs.dingtalk",
            "endpoint": webhook,
            "pushRetryStrategy": "BACKOFF_RETRY",
            "paramList": [
                eventTargets0ParamList0,
                eventTargets0ParamList1,
                eventTargets0ParamList2
            ]
        });
   
        const createRuleRequest = new CreateRuleRequest({
            eventBusName: AGENTCRAFT_BUS_NAME,
            description: "【勿删】AIGC服务跟钉钉融合",
            ruleName: `aigc_${nanoid()}`,
            filterPattern: `{
                \"data\": {
                  \"requestContext\": {
                    \"functionArn\": [\"acs:fc:${region}:${uid}:functions/${functionName}\"]
                  }
                }
              }`,
            // filterPattern: `{\n    \n    \"subject\": [\"acs:fc:${region}:${uid}:services/${serviceName}.LATEST/fun\"]\n   \n}`,
            eventTargets: [
                eventTargets0
            ],
        });
        const runtime = new $Util.RuntimeOptions({});
        try {
            result = await this.client.createRuleWithOptions(createRuleRequest, runtime);
        } catch (error) {
            console.log(error)
        }
        return result;
    }

    async createEventBus(params: CreateEventBusParams = { EventBusName: AGENTCRAFT_BUS_NAME, Description: "【勿删】AIGC服务" }) {
        const createEventBusRequest = new CreateEventBusRequest({ eventBusName: params.EventBusName, descrption: params.Description });
        const runtime = new $Util.RuntimeOptions({});
        return await this.client.createEventBusWithOptions(createEventBusRequest, runtime);
    }

    async getEventBus(eventBusName: string = AGENTCRAFT_BUS_NAME) {
        let result: any = {};
        const getEventBusRequest = new GetEventBusRequest({
            eventBusName,
        });
        const runtime = new $Util.RuntimeOptions({});
        try {

            result = await this.client.getEventBusWithOptions(getEventBusRequest, runtime);
        } catch (error) {
            console.log(error)
        }
        return result
    }
}

