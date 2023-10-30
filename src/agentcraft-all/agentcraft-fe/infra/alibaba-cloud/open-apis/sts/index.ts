
import * as $OpenApi from '@alicloud/openapi-client';
import { AssumeRoleRequest } from '@alicloud/sts20150401';

import StsClient from "./stsClient";

import { OpenApiConfig } from '../types';



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

export class ServerlessBridgeSts {
    client;
    constructor(config?: OpenApiConfig) {
        this.client = this.createStsClient(config);
    }
    createStsClient(config?: OpenApiConfig) {
        const credential = config ?? {
            accessKeyId: process.env.AK,
            accessKeySecret: process.env.SK,
        }
        credential.endpoint = `sts.${process.env.Region}.aliyuncs.com`;
        const _config = new $OpenApi.Config(credential);
        return new StsClient(_config);
    }
    async assumeRole(payload: AssumeRoleRequestPayload) {
        payload.roleArn = '';//`acs:ram::${FC_CONSOLE_ACCOUNTID}:role/${process.env.FcConsoleAssumeRoleName}`;
        const assumeRoleRequest = new AssumeRoleRequest(payload);
        const result =  await this.client.assumeRole(assumeRoleRequest);
        return result.body;

    }
    async getCallerIdentity() {
        return await this.client.getCallerIdentity();
    }
    async assumeRoleWithSAML() {

    }
}

