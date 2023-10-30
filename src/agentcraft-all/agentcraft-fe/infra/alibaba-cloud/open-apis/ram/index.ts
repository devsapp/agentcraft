
import * as $OpenApi from '@alicloud/openapi-client';
import * as $Util from '@alicloud/tea-util';
import { CreateUserRequest, CreatePolicyRequest, CreateAccessKeyRequest, CreateRoleRequest, AttachPolicyToUserRequest, GetUserRequest, DeleteAccessKeyRequest, GetRoleRequest, AttachPolicyToRoleRequest, DetachPolicyFromUserRequest, ListAccessKeysRequest } from '@alicloud/ram20150501';



import RamClient from "./ramClient";

import { OpenApiConfig } from '../types';


export interface CreateUserPayload {
    userName: string,
    displayName?: string,
    mobilePhone?: string,
    email?: string,
    comments?: string
}

export interface CreateRolePayload {
    roleName: string,
    description?: string,
    assumeRolePolicyDocument: any,
    masSessionDuration?: number
}


export class ServerlessBridgeRam {
    client: RamClient;
    constructor(config?: OpenApiConfig) {
        this.client = this.createRameClient(config);
    }
    createRameClient(config?: OpenApiConfig) {
        const credential = config ?? {
            accessKeyId: process.env.AK,
            accessKeySecret: process.env.SK,
        }
        credential.endpoint = `ram.aliyuncs.com`;
        const _config = new $OpenApi.Config(credential);
        return new RamClient(_config);
    }
    async createUser(payload: CreateUserPayload) {

        const createUserRequest = new CreateUserRequest(payload);
        const result = await this.client.createUser(createUserRequest);
    }

    async getRole(roleName: string) {
        const getRoleRequest = new GetRoleRequest({
            roleName
        });
        const runtime = new $Util.RuntimeOptions({});
        const result = await this.client.getRoleWithOptions(getRoleRequest, runtime);
        return result.body;
    }

    async getUser(userName: string): Promise<any> {
        try {
            const getUserRequest = new GetUserRequest({
                userName
            });
            const runtime = new $Util.RuntimeOptions({});
            const result = await this.client.getUserWithOptions(getUserRequest, runtime);
            return result.body;
        } catch (e) {
            return { error: e };
        }

    }

    async deleteAccessKey(userName: string, userAccessKeyId: string) {
        const deleteAccessKeyRequest = new DeleteAccessKeyRequest({
            userAccessKeyId,
            userName
        });
        const runtime = new $Util.RuntimeOptions({});
        const result = await this.client.deleteAccessKeyWithOptions(deleteAccessKeyRequest, runtime);
        return result.body;
    }

    async createAccessKey(userName: string) {
        const createAccessKeyRequest = new CreateAccessKeyRequest({
            userName
        });
        const result = await this.client.createAccessKey(createAccessKeyRequest);
        return result.body;

    }

    async listAccessKeys(userName: string): Promise<[]> {
        try {
            const listAccessKeysRequest = new ListAccessKeysRequest({
                userName
            });
            const runtime = new $Util.RuntimeOptions({});
            const result: any = await this.client.listAccessKeysWithOptions(listAccessKeysRequest, runtime); //sdk 定义的是大驼峰，然而实际返回的是小驼峰
            return result.body?.accessKeys.accessKey;
        } catch (e) {
            return [];
        }

    }

    async createRole(payload: CreateRolePayload) {
        const createRoleRequest = new CreateRoleRequest(payload);
        const runtime = new $Util.RuntimeOptions({});
        const result = await this.client.createRoleWithOptions(createRoleRequest, runtime);
        return result.body;
    }


    async attactRolePolicy(payload: any) {
        const attachPolicyToRoleRequest = new AttachPolicyToRoleRequest(payload);
        const runtime = new $Util.RuntimeOptions;
        const result = await this.client.attachPolicyToRoleWithOptions(attachPolicyToRoleRequest, runtime);
        return result.body;
    }

    async attachPolicyToUser(payload: any) {
        try {
            const attachPolicyToUserRequest = new AttachPolicyToUserRequest(payload);
            const runtime = new $Util.RuntimeOptions({});
            const result = await this.client.attachPolicyToUserWithOptions(attachPolicyToUserRequest, runtime);
            return result.body;
        } catch (e) {
            return { error: e };
        }

    }

    async detachPolicyFromUser(payload:any) {
        try {
            const detachPolicyFromUserRequest = new DetachPolicyFromUserRequest(payload);
            const runtime = new $Util.RuntimeOptions({});
            const result = await this.client.detachPolicyFromUserWithOptions(detachPolicyFromUserRequest, runtime);
            return result.body;
        } catch (e) {
            return { error: e };
        }

    }

    async createPolicy(payload:any): Promise<any> {
        try {
            const createPolicyRequest = new CreatePolicyRequest(payload);
            const runtime = new $Util.RuntimeOptions({});
            return await this.client.createPolicyWithOptions(createPolicyRequest, runtime);
        } catch (e) {
            return {
                error: e
            };
        }
    }

}
