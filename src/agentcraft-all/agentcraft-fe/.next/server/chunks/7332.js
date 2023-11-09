"use strict";
exports.id = 7332;
exports.ids = [7332];
exports.modules = {

/***/ 7332:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "G": () => (/* binding */ ServerlessBridgeService)
});

// EXTERNAL MODULE: external "@alicloud/openapi-client"
var openapi_client_ = __webpack_require__(3272);
// EXTERNAL MODULE: external "@alicloud/serverless20210924"
var serverless20210924_ = __webpack_require__(78);
var serverless20210924_default = /*#__PURE__*/__webpack_require__.n(serverless20210924_);
// EXTERNAL MODULE: external "@alicloud/tea-util"
var tea_util_ = __webpack_require__(2151);
var tea_util_default = /*#__PURE__*/__webpack_require__.n(tea_util_);
// EXTERNAL MODULE: external "@alicloud/fc-open20210406"
var fc_open20210406_ = __webpack_require__(8113);
var fc_open20210406_default = /*#__PURE__*/__webpack_require__.n(fc_open20210406_);
;// CONCATENATED MODULE: ./infra/alibaba-cloud/open-apis/fc/serverlessDevsClient.ts

class ServerlessDevsClient extends (serverless20210924_default()) {
    constructor(config){
        super(config);
    }
}

;// CONCATENATED MODULE: ./infra/alibaba-cloud/open-apis/fc/fcClient.ts

class FcClient extends (fc_open20210406_default()) {
    constructor(config){
        super(config);
    }
    async getOrCreateAppWorkSpace() {}
}

;// CONCATENATED MODULE: ./infra/alibaba-cloud/open-apis/fc/index.ts






class ServerlessBridgeServerlessDevs {
    constructor(config){
        this.client = this.createServerlessDevsClient(config);
    }
    createServerlessDevsClient(config) {
        const credential = config ?? {
            accessKeyId: process.env.AK,
            accessKeySecret: process.env.SK
        };
        credential.endpoint = `serverless-dualstack.cn-hangzhou.aliyuncs.com`;
        const _config = new openapi_client_.Config(credential);
        return new ServerlessDevsClient(_config);
    }
    async createApplication(payload) {
        const createAppData = new serverless20210924_.CreateApplicationRequest(payload);
        const data = await this.client.createApplication(createAppData);
        return data;
    }
    async deleteApplication(appName) {
        const data = await this.client.deleteApplication(appName);
        return data;
    }
    async getApplication(appName) {
        return await this.client.getApplication(appName);
    }
    async listApplications() {
        const listApplicationData = new serverless20210924_.ListApplicationsRequest({});
        const data = await this.client.listApplications(listApplicationData);
        return data;
    }
}
class ServerlessBridgeFc {
    constructor(config, accountId){
        this.client = this.createFcClient(config, accountId);
    }
    createFcClient(config, accountId) {
        const credential = config ?? {
            accessKeyId: process.env.AK,
            accessKeySecret: process.env.SK
        };
        credential.endpoint = `${accountId}.${process.env.Region}.fc.aliyuncs.com`;
        const _config = new openapi_client_.Config(credential);
        return new FcClient(_config);
    }
    async invokeFunction(fcInvokeData, payload) {
        const invokeFunctionHeaders = new fc_open20210406_.InvokeFunctionHeaders({});
        const invokeFunctionRequest = new fc_open20210406_.InvokeFunctionRequest({
            body: tea_util_default().toBytes(JSON.stringify(payload))
        });
        const runtime = new tea_util_.RuntimeOptions({});
        return await this.client.invokeFunctionWithOptions(fcInvokeData.serviceName, fcInvokeData.functionName, invokeFunctionRequest, invokeFunctionHeaders, runtime);
    }
    async listFunctions(payload) {
        const listFunctionsHeaders = new fc_open20210406_.ListFunctionsHeaders({});
        const listFunctionsRequest = new fc_open20210406_.ListFunctionsRequest(payload);
        const runtime = new tea_util_.RuntimeOptions({});
        return await this.client.listFunctionsWithOptions("", listFunctionsRequest, listFunctionsHeaders, runtime);
    }
    async updateFunction(payload) {
        const updateFunctionHeaders = new fc_open20210406_.UpdateFunctionHeaders({});
        const environmentVariables = payload.environmentVariables;
        const updateFunctionRequest = new fc_open20210406_.UpdateFunctionRequest({
            environmentVariables: environmentVariables
        });
        const runtime = new tea_util_.RuntimeOptions({});
        return await this.client.updateFunctionWithOptions(payload.serviceName, payload.functionName, updateFunctionRequest, updateFunctionHeaders, runtime);
    }
    async getService(payload) {
        let getServiceHeaders = new fc_open20210406_.GetServiceHeaders({});
        let getServiceRequest = new fc_open20210406_.GetServiceRequest({});
        const runtime = new tea_util_.RuntimeOptions({});
        return await this.client.getServiceWithOptions(payload.serviceName, getServiceRequest, getServiceHeaders, runtime);
    }
    async getFunction(payload) {
        const params = new openapi_client_.Params({
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
            bodyType: "json"
        });
        // runtime options
        const runtime = new tea_util_.RuntimeOptions({});
        const request = new openapi_client_.OpenApiRequest({});
        return await this.client.callApi(params, request, runtime);
    }
}

// EXTERNAL MODULE: external "@alicloud/ram20150501"
var ram20150501_ = __webpack_require__(487);
var ram20150501_default = /*#__PURE__*/__webpack_require__.n(ram20150501_);
;// CONCATENATED MODULE: ./infra/alibaba-cloud/open-apis/ram/ramClient.ts

class RamClient extends (ram20150501_default()) {
    constructor(config){
        super(config);
    }
}

;// CONCATENATED MODULE: ./infra/alibaba-cloud/open-apis/ram/index.ts




class ServerlessBridgeRam {
    constructor(config){
        this.client = this.createRameClient(config);
    }
    createRameClient(config) {
        const credential = config ?? {
            accessKeyId: process.env.AK,
            accessKeySecret: process.env.SK
        };
        credential.endpoint = `ram.aliyuncs.com`;
        const _config = new openapi_client_.Config(credential);
        return new RamClient(_config);
    }
    async createUser(payload) {
        const createUserRequest = new ram20150501_.CreateUserRequest(payload);
        const result = await this.client.createUser(createUserRequest);
    }
    async getRole(roleName) {
        const getRoleRequest = new ram20150501_.GetRoleRequest({
            roleName
        });
        const runtime = new tea_util_.RuntimeOptions({});
        const result = await this.client.getRoleWithOptions(getRoleRequest, runtime);
        return result.body;
    }
    async getUser(userName) {
        try {
            const getUserRequest = new ram20150501_.GetUserRequest({
                userName
            });
            const runtime = new tea_util_.RuntimeOptions({});
            const result = await this.client.getUserWithOptions(getUserRequest, runtime);
            return result.body;
        } catch (e) {
            return {
                error: e
            };
        }
    }
    async deleteAccessKey(userName, userAccessKeyId) {
        const deleteAccessKeyRequest = new ram20150501_.DeleteAccessKeyRequest({
            userAccessKeyId,
            userName
        });
        const runtime = new tea_util_.RuntimeOptions({});
        const result = await this.client.deleteAccessKeyWithOptions(deleteAccessKeyRequest, runtime);
        return result.body;
    }
    async createAccessKey(userName) {
        const createAccessKeyRequest = new ram20150501_.CreateAccessKeyRequest({
            userName
        });
        const result = await this.client.createAccessKey(createAccessKeyRequest);
        return result.body;
    }
    async listAccessKeys(userName) {
        try {
            const listAccessKeysRequest = new ram20150501_.ListAccessKeysRequest({
                userName
            });
            const runtime = new tea_util_.RuntimeOptions({});
            const result = await this.client.listAccessKeysWithOptions(listAccessKeysRequest, runtime); //sdk 定义的是大驼峰，然而实际返回的是小驼峰
            return result.body?.accessKeys.accessKey;
        } catch (e) {
            return [];
        }
    }
    async createRole(payload) {
        const createRoleRequest = new ram20150501_.CreateRoleRequest(payload);
        const runtime = new tea_util_.RuntimeOptions({});
        const result = await this.client.createRoleWithOptions(createRoleRequest, runtime);
        return result.body;
    }
    async attactRolePolicy(payload) {
        const attachPolicyToRoleRequest = new ram20150501_.AttachPolicyToRoleRequest(payload);
        const runtime = new tea_util_.RuntimeOptions;
        const result = await this.client.attachPolicyToRoleWithOptions(attachPolicyToRoleRequest, runtime);
        return result.body;
    }
    async attachPolicyToUser(payload) {
        try {
            const attachPolicyToUserRequest = new ram20150501_.AttachPolicyToUserRequest(payload);
            const runtime = new tea_util_.RuntimeOptions({});
            const result = await this.client.attachPolicyToUserWithOptions(attachPolicyToUserRequest, runtime);
            return result.body;
        } catch (e) {
            return {
                error: e
            };
        }
    }
    async detachPolicyFromUser(payload) {
        try {
            const detachPolicyFromUserRequest = new ram20150501_.DetachPolicyFromUserRequest(payload);
            const runtime = new tea_util_.RuntimeOptions({});
            const result = await this.client.detachPolicyFromUserWithOptions(detachPolicyFromUserRequest, runtime);
            return result.body;
        } catch (e) {
            return {
                error: e
            };
        }
    }
    async createPolicy(payload) {
        try {
            const createPolicyRequest = new ram20150501_.CreatePolicyRequest(payload);
            const runtime = new tea_util_.RuntimeOptions({});
            return await this.client.createPolicyWithOptions(createPolicyRequest, runtime);
        } catch (e) {
            return {
                error: e
            };
        }
    }
}

// EXTERNAL MODULE: external "@alicloud/sts20150401"
var sts20150401_ = __webpack_require__(319);
var sts20150401_default = /*#__PURE__*/__webpack_require__.n(sts20150401_);
;// CONCATENATED MODULE: ./infra/alibaba-cloud/open-apis/sts/stsClient.ts

class StsClient extends (sts20150401_default()) {
    constructor(config){
        super(config);
    }
}

;// CONCATENATED MODULE: ./infra/alibaba-cloud/open-apis/sts/index.ts



class ServerlessBridgeSts {
    constructor(config){
        this.client = this.createStsClient(config);
    }
    createStsClient(config) {
        const credential = config ?? {
            accessKeyId: process.env.AK,
            accessKeySecret: process.env.SK
        };
        credential.endpoint = `sts.${process.env.Region}.aliyuncs.com`;
        const _config = new openapi_client_.Config(credential);
        return new StsClient(_config);
    }
    async assumeRole(payload) {
        payload.roleArn = ""; //`acs:ram::${FC_CONSOLE_ACCOUNTID}:role/${process.env.FcConsoleAssumeRoleName}`;
        const assumeRoleRequest = new sts20150401_.AssumeRoleRequest(payload);
        const result = await this.client.assumeRole(assumeRoleRequest);
        return result.body;
    }
    async getCallerIdentity() {
        return await this.client.getCallerIdentity();
    }
    async assumeRoleWithSAML() {}
}

// EXTERNAL MODULE: external "@alicloud/vpc20160428"
var vpc20160428_ = __webpack_require__(2807);
var vpc20160428_default = /*#__PURE__*/__webpack_require__.n(vpc20160428_);
;// CONCATENATED MODULE: ./infra/alibaba-cloud/open-apis/vpc/vpcClient.ts

class VpcClient extends (vpc20160428_default()) {
    constructor(config){
        super(config);
    }
}

;// CONCATENATED MODULE: ./infra/alibaba-cloud/open-apis/vpc/index.ts




class ServerlessBridgeVpc {
    constructor(config){
        this.client = this.createVpcClient(config);
    }
    createVpcClient(config) {
        const credential = config ?? {
            accessKeyId: process.env.AK,
            accessKeySecret: process.env.SK
        };
        credential.endpoint = `vpc.aliyuncs.com`;
        const _config = new openapi_client_.Config(credential);
        return new VpcClient(_config);
    }
    describeVpcs({ vpcId , regionId  }) {
        const describeVpcsRequest = new vpc20160428_.DescribeVpcsRequest({
            regionId,
            vpcId
        });
        const runtime = new tea_util_.RuntimeOptions({});
        return this.client.describeVpcsWithOptions(describeVpcsRequest, runtime);
    }
    async createVSwitch(payload) {
        const createVSwitchRequest = new vpc20160428_.CreateVSwitchRequest(payload);
        const runtime = new tea_util_.RuntimeOptions({});
        return await this.client.createVSwitchWithOptions(createVSwitchRequest, runtime);
    }
}

;// CONCATENATED MODULE: ./constants/cloud-resources.ts
const FC_CONSOLE_ACCOUNTID = ""; // fc-console 账号id
const FC_CONSOLE_WEBIDE_SERVICENAME = "fc-webide-service"; // fc-console webide service
const FC_CONSOLE_WEBIDE_FUNCTIONNAME = "GetOrCreateAppWorkSpace"; // fc-console 创建或者查询webide
const FC_CONSOLE_UPDATECODE_FUNCTIONNAME = "DeployUserFunctionCode"; // fc-console 更新代码
const ASSUME_ROLE_FOR_FC_CONSOLE = process.env.FcConsoleAssumeRoleName; // 授权的账号名
const FC_DEFAULT_ROLE_NAME = "AliyunFCServerlessDevsRole"; // serverless devs 检查角色
const DEVS_API_ENDPOINT = "serverless-dualstack.ap-southeast-1.aliyuncs.com";
const DEFAULT_REGION = "cn-hangzhou";
const INVOKE_GET_WEBIDE_DATA = {
    serviceName: FC_CONSOLE_WEBIDE_SERVICENAME,
    functionName: FC_CONSOLE_WEBIDE_FUNCTIONNAME
};
const INVOKE_UPDATE_CODE_DATA = {
    serviceName: FC_CONSOLE_WEBIDE_SERVICENAME,
    functionName: FC_CONSOLE_UPDATECODE_FUNCTIONNAME
};
const STS_ASSUME_ROLE_PAYLOAD = {
    roleArn: `acs:ram::${FC_CONSOLE_ACCOUNTID}:role/${ASSUME_ROLE_FOR_FC_CONSOLE}`,
    roleSessionName: ASSUME_ROLE_FOR_FC_CONSOLE // 这个角色是需要fc-console授权
};
const ASSUME_ROLE_POLICY_DOCUMENT = {
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Effect": "Allow",
            "Principal": {
                "Service": [
                    "fc.aliyuncs.com"
                ]
            }
        }
    ],
    "Version": "1"
};
const SERVERLESS_DEVS_POLICIES = [
    "AliyunFCServerlessDevsRolePolicy",
    "AliyunFCDefaultRolePolicy",
    "AliyunFCFullAccess",
    "AliyunNASFullAccess",
    "AliyunVPCFullAccess"
];

;// CONCATENATED MODULE: ./infra/alibaba-cloud/services/serverless-app.ts





class ServerlessBridgeService {
    constructor(config, accountId){
        this.config = config;
        this.serverlessBridgeRam = new ServerlessBridgeRam(config);
        this.serverlessBridgeSts = new ServerlessBridgeSts(config);
        this.serverlessBridgeServerlessDevs = new ServerlessBridgeServerlessDevs(config);
        this.serverlessBridgeFc = new ServerlessBridgeFc(config, accountId);
        this.serverlessBridgeVpc = new ServerlessBridgeVpc(config);
    }
    getServerlessBridgeRam() {
        return this.serverlessBridgeRam;
    }
    getServerlessBridgeSts() {
        return this.serverlessBridgeSts;
    }
    getServerlessBridgeVpc() {
        return this.serverlessBridgeVpc;
    }
    getServerlessBridgeFc(accountId, config) {
        return new ServerlessBridgeFc(config, accountId);
    }
    getServerlessBridgeServerlessDevs() {
        return this.serverlessBridgeServerlessDevs;
    }
    getServerlessSubBridgeServerlessDevs(config) {
        return new ServerlessBridgeServerlessDevs(config);
    }
    /**
   * 获取当前主账号角色
   * @returns 
   */ async getMainOrCreateAccountRole() {
        try {
            const serverlessBridgeRam = this.getServerlessBridgeRam();
            const roleInfo = await serverlessBridgeRam.getRole(FC_DEFAULT_ROLE_NAME);
            return roleInfo;
        } catch (e) {
            await this.createServerlessDevsRoleAndAttactPolicy();
        }
    }
    /**
   * 创建serverlessdevs 默认角色 AliyunFCServerlessDevsRole, 然后给这个角色授予权限
   */ async createServerlessDevsRoleAndAttactPolicy() {
        const serverlessBridgeRam = this.getServerlessBridgeRam();
        await serverlessBridgeRam.createRole({
            roleName: FC_DEFAULT_ROLE_NAME,
            description: "created by serverless bridge",
            assumeRolePolicyDocument: ASSUME_ROLE_POLICY_DOCUMENT
        });
        for (const policyName of SERVERLESS_DEVS_POLICIES){
            await serverlessBridgeRam.attactRolePolicy({
                policyType: "System",
                policyName,
                roleName: FC_DEFAULT_ROLE_NAME
            });
        }
    }
    /**
   * 授权子账号需要的Serverless 权限策略
   * @param userName 
   */ async attachServerlessDevsPolicyToUser(userName) {
        try {
            const serverlessBridgeRam = this.getServerlessBridgeRam();
            const roleAttachResult = {};
            roleAttachResult["AliyunRAMFullAccess"] = await serverlessBridgeRam.attachPolicyToUser({
                policyType: "System",
                policyName: "AliyunRAMFullAccess",
                userName
            });
            roleAttachResult["AliyunSTSAssumeRoleAccess"] = await serverlessBridgeRam.attachPolicyToUser({
                policyType: "System",
                policyName: "AliyunSTSAssumeRoleAccess",
                userName
            });
            roleAttachResult["AliyunFCDefaultRolePolicy"] = await serverlessBridgeRam.attachPolicyToUser({
                policyType: "System",
                policyName: "AliyunFCDefaultRolePolicy",
                userName
            });
            roleAttachResult["AliyunFCServerlessDevsRolePolicy"] = await serverlessBridgeRam.attachPolicyToUser({
                policyType: "System",
                policyName: "AliyunFCServerlessDevsRolePolicy",
                userName
            });
            roleAttachResult["AliyunFCFullAccess"] = await serverlessBridgeRam.attachPolicyToUser({
                policyType: "System",
                policyName: "AliyunFCFullAccess",
                userName
            });
            roleAttachResult["AliyunVPCFullAccess"] = await serverlessBridgeRam.attachPolicyToUser({
                policyType: "System",
                policyName: "AliyunVPCFullAccess",
                userName
            });
            roleAttachResult["AliyunNASFullAccess"] = await serverlessBridgeRam.attachPolicyToUser({
                policyType: "System",
                policyName: "AliyunNASFullAccess",
                userName
            });
            // for (const policyName of SERVERLESS_DEVS_POLICIES) {
            //   roleAttachResult[policyName] = await serverlessBridgeRam.attachPolicyToUser({ policyType: 'System', policyName, userName });
            // }
            return roleAttachResult;
        } catch (e) {
            throw e;
        }
    }
    async reAttachSubAccountPolicy(userName, region) {
        const policyDocument = `{
      "Version": "1",
      "Statement": [
        {
          "Action": "ram:ListPoliciesForUser",
          "Effect": "Allow",
          "Resource": "*"
        },
        {
          "Action": [
            "fc:GetService",
            "fc:ListServices",
            "fc:GetResourceTags"
          ],
          "Effect": "Allow",
          "Resource": "acs:fc:${region}:*:services/${userName}-service*"
        },
        {
          "Action": "fc:ListFunctions",
          "Effect": "Allow",
          "Resource": "acs:fc:${region}:*:services/${userName}-service*/functions/*"
        },
        {
          "Action": [
            "fc:ListInstances",
            "fc:UpdateFunction",
            "fc:GetFunction",
            "fc:GetFunctionCode",
            "fc:ListFunctions",
            "fc:InvokeFunction",
            "fc:GrantTempCodeBucketPermission"
          ],
          "Effect": "Allow",
          "Resource": "acs:fc:${region}:*:services/${userName}-service*/functions/*"
        }
      ]
    }`;
        const policyName = `${userName}-customer-policy`;
        await this.serverlessBridgeRam.createPolicy({
            policyName: `${userName}-customer-policy`,
            description: "created by serverless-bridge dont remove",
            policyDocument
        });
        return await this.serverlessBridgeRam.attachPolicyToUser({
            policyType: "Custom",
            policyName,
            userName
        }); // 将专属策略attach到该子账号
    }
    /**
   * 移除子账号的权限策略，防止子账号操作函数
   * @param userName 
   */ async detachServerlessDevsPolicyFromUser(userName) {
        const serverlessBridgeRam = this.getServerlessBridgeRam();
        await serverlessBridgeRam.detachPolicyFromUser({
            policyType: "System",
            policyName: "AliyunRAMFullAccess",
            userName
        });
        await serverlessBridgeRam.detachPolicyFromUser({
            policyType: "System",
            policyName: "AliyunSTSAssumeRoleAccess",
            userName
        });
        await serverlessBridgeRam.detachPolicyFromUser({
            policyType: "System",
            policyName: "AliyunFCDefaultRolePolicy",
            userName
        });
        await serverlessBridgeRam.detachPolicyFromUser({
            policyType: "System",
            policyName: "AliyunFCServerlessDevsRolePolicy",
            userName
        });
        await serverlessBridgeRam.detachPolicyFromUser({
            policyType: "System",
            policyName: "AliyunFCFullAccess",
            userName
        });
        await serverlessBridgeRam.detachPolicyFromUser({
            policyType: "System",
            policyName: "AliyunVPCFullAccess",
            userName
        });
        await serverlessBridgeRam.detachPolicyFromUser({
            policyType: "System",
            policyName: "AliyunNASFullAccess",
            userName
        });
    // for (const policyName of SERVERLESS_DEVS_POLICIES) {
    //   await serverlessBridgeRam.detachPolicyFromUser({ policyType: 'System', policyName, userName });
    // }
    }
    /**
   * 删除子账号的ak, sk, 现在子账号的ak,sk 上限是2个
   * @param userAccessKeyId 
   */ async deleteSubAccountAccessKey(userName, userAccessKeyId) {
        try {
            const serverlessBridgeRam = this.getServerlessBridgeRam();
            const deleteSubAccountAkInfo = await serverlessBridgeRam.deleteAccessKey(userName, userAccessKeyId);
            return deleteSubAccountAkInfo;
        } catch (e) {
            throw e;
        }
    }
    /**
   * 创建子账号的 ak,sk
   * @param userName 
   * @returns 
   */ async createSubAccountAccessKey(userName) {
        try {
            const serverlessBridgeRam = this.getServerlessBridgeRam();
            const currentAks = await serverlessBridgeRam.listAccessKeys(userName);
            if (currentAks.length === 2) {
                const currentAccessKeyId = currentAks[0].accessKeyId;
                await serverlessBridgeRam.deleteAccessKey(userName, currentAccessKeyId);
            }
            const subAccountCredential = await serverlessBridgeRam.createAccessKey(userName);
            return subAccountCredential;
        } catch (e) {
            throw e;
        }
    }
    /**
   * 查询以及创建子账号
   * @param userName 
   * @returns 
   */ async getOrCreateSubAccount(userName) {
        try {
            const serverlessBridgeRam = this.getServerlessBridgeRam();
            let accountInfo = await serverlessBridgeRam.getUser(userName);
            if (accountInfo.error) {
                accountInfo = await serverlessBridgeRam.createUser({
                    userName
                });
            }
            return accountInfo;
        } catch (e) {
            throw e;
        }
    }
    /**
   * 子账号创建应用
   * @param accessKeyId 
   * @param accessKeySecret 
   * @param appPayload 
   * @returns 
   */ async createSubAccountApplication(accessKeyId, accessKeySecret, appPayload) {
        try {
            const serverlessDevsClient = this.getServerlessSubBridgeServerlessDevs({
                accessKeyId,
                accessKeySecret
            });
            const createAppResult = await serverlessDevsClient.createApplication(appPayload);
            return createAppResult;
        } catch (e) {
            throw e;
        }
    }
    /**
   * 删除应用
   * @param appName 
   * @returns 
   */ async deleteApplication(appName) {
        const serverlessDevsClient = this.getServerlessBridgeServerlessDevs();
        return await serverlessDevsClient.deleteApplication(appName);
    }
    async createMainAccountApplication(payload) {
        const serverlessDevsClient = this.getServerlessBridgeServerlessDevs();
        return await serverlessDevsClient.createApplication(payload);
    }
    /**
   * 查询应用信息
   * @param appName 
   * @returns 
   */ async getApplication(appName) {
        const serverlessDevsClient = this.getServerlessBridgeServerlessDevs();
        return await serverlessDevsClient.getApplication(appName);
    }
    /**
   * 查询所有应用信息
   * @param appName 
   * @returns 
   */ async listApplications() {
        const serverlessDevsClient = this.getServerlessBridgeServerlessDevs();
        return await serverlessDevsClient.listApplications();
    }
    /**
   * 子账号授信fc-console权限
   * @param payload 
   * @param credentials 
   * @returns 
   */ async subAccountAssumeRole(payload) {
        const stsClient = this.getServerlessBridgeSts();
        return await stsClient.assumeRole(payload);
    }
    /**
   * 
   * @param accountId 函数执行主账号id
   * @param stsConfig assumeRole后的credential 
   * @param fcInvokeData 执行函数的数据包括服务和函数
   * @param payload 执行函数的请求数据
   * @returns 
   */ async invokeFunction(fcInvokeData, payload) {
        return await this.serverlessBridgeFc.invokeFunction(fcInvokeData, payload);
    }
    /**
   * 查询函数列表
   * @param stsConfig 
   * @param payload 
   * @returns 
   */ async listFunctions(payload) {
        return await this.serverlessBridgeFc.listFunctions(payload);
    }
    /**
   * 查询函数列表
   * @param stsConfig 
   * @param payload 
   * @returns 
   */ async updateFunction(payload) {
        return await this.serverlessBridgeFc.updateFunction(payload);
    }
    /**
  * 查询函数列表
  * @param payload 
  * @returns 
  */ async getFunction(payload) {
        return await this.serverlessBridgeFc.getFunction(payload);
    }
    /**
  * 查询函数列表
  * @param payload 
  * @returns 
  */ async getService(payload) {
        return await this.serverlessBridgeFc.getService(payload);
    }
    async describeVpcs(payload) {
        return await this.serverlessBridgeVpc.describeVpcs(payload);
    }
    async createVSwitch(payload) {
        return await this.serverlessBridgeVpc.createVSwitch(payload);
    }
}


/***/ })

};
;