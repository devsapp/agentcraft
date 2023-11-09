
import { ServerlessBridgeFc, ServerlessBridgeServerlessDevs } from '@/infra/alibaba-cloud/open-apis/fc';
import { ServerlessBridgeRam } from '@/infra/alibaba-cloud/open-apis/ram';
import { ServerlessBridgeSts } from '@/infra/alibaba-cloud/open-apis/sts';
import { ServerlessBridgeVpc } from '@/infra/alibaba-cloud/open-apis/vpc';
import { FC_DEFAULT_ROLE_NAME, ASSUME_ROLE_POLICY_DOCUMENT, SERVERLESS_DEVS_POLICIES } from '@/constants/cloud-resources'
import { OpenApiConfig } from '@/infra/alibaba-cloud/open-apis//types';

export class ServerlessBridgeService {
  serverlessBridgeRam: ServerlessBridgeRam;
  serverlessBridgeSts: ServerlessBridgeSts;
  serverlessBridgeServerlessDevs: ServerlessBridgeServerlessDevs;
  serverlessBridgeFc: ServerlessBridgeFc;
  serverlessBridgeVpc: ServerlessBridgeVpc;
  config: OpenApiConfig | undefined;
  constructor(config?: OpenApiConfig, accountId?: string) {
    this.config = config;
    this.serverlessBridgeRam = new ServerlessBridgeRam(config);
    this.serverlessBridgeSts = new ServerlessBridgeSts(config);
    this.serverlessBridgeServerlessDevs = new ServerlessBridgeServerlessDevs(config);
    this.serverlessBridgeFc = new ServerlessBridgeFc(config, accountId);
    this.serverlessBridgeVpc = new ServerlessBridgeVpc(config);
  }
  getServerlessBridgeRam(): ServerlessBridgeRam {
    return this.serverlessBridgeRam;
  }

  getServerlessBridgeSts(): ServerlessBridgeSts {
    return this.serverlessBridgeSts;
  }

  getServerlessBridgeVpc(): ServerlessBridgeVpc {
    return this.serverlessBridgeVpc;
  }

  getServerlessBridgeFc(accountId: string, config?: OpenApiConfig): ServerlessBridgeFc {
    return new ServerlessBridgeFc(config, accountId);
  }

  getServerlessBridgeServerlessDevs(): ServerlessBridgeServerlessDevs {
    return this.serverlessBridgeServerlessDevs;
  }


  getServerlessSubBridgeServerlessDevs(config?: OpenApiConfig): ServerlessBridgeServerlessDevs {

    return new ServerlessBridgeServerlessDevs(config);
  }

  /**
   * 获取当前主账号角色
   * @returns 
   */
  async getMainOrCreateAccountRole(): Promise<any> {
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
   */
  async createServerlessDevsRoleAndAttactPolicy() {
    const serverlessBridgeRam = this.getServerlessBridgeRam();
    await serverlessBridgeRam.createRole({
      roleName: FC_DEFAULT_ROLE_NAME,
      description: 'created by serverless bridge',
      assumeRolePolicyDocument: ASSUME_ROLE_POLICY_DOCUMENT

    });
    for (const policyName of SERVERLESS_DEVS_POLICIES) {
      await serverlessBridgeRam.attactRolePolicy({ policyType: 'System', policyName, roleName: FC_DEFAULT_ROLE_NAME });
    }

  }

  /**
   * 授权子账号需要的Serverless 权限策略
   * @param userName 
   */

  async attachServerlessDevsPolicyToUser(userName: string) {
    try {
      const serverlessBridgeRam = this.getServerlessBridgeRam();
      const roleAttachResult: any = {};
      roleAttachResult['AliyunRAMFullAccess'] = await serverlessBridgeRam.attachPolicyToUser({ policyType: 'System', policyName: 'AliyunRAMFullAccess', userName });
      roleAttachResult['AliyunSTSAssumeRoleAccess'] = await serverlessBridgeRam.attachPolicyToUser({ policyType: 'System', policyName: 'AliyunSTSAssumeRoleAccess', userName });
      roleAttachResult['AliyunFCDefaultRolePolicy'] = await serverlessBridgeRam.attachPolicyToUser({ policyType: 'System', policyName: 'AliyunFCDefaultRolePolicy', userName });
      roleAttachResult['AliyunFCServerlessDevsRolePolicy'] = await serverlessBridgeRam.attachPolicyToUser({ policyType: 'System', policyName: 'AliyunFCServerlessDevsRolePolicy', userName });
      roleAttachResult['AliyunFCFullAccess'] = await serverlessBridgeRam.attachPolicyToUser({ policyType: 'System', policyName: 'AliyunFCFullAccess', userName });
      roleAttachResult['AliyunVPCFullAccess'] = await serverlessBridgeRam.attachPolicyToUser({ policyType: 'System', policyName: 'AliyunVPCFullAccess', userName });
      roleAttachResult['AliyunNASFullAccess'] = await serverlessBridgeRam.attachPolicyToUser({ policyType: 'System', policyName: 'AliyunNASFullAccess', userName });

      // for (const policyName of SERVERLESS_DEVS_POLICIES) {
      //   roleAttachResult[policyName] = await serverlessBridgeRam.attachPolicyToUser({ policyType: 'System', policyName, userName });
      // }

      return roleAttachResult;
    } catch (e) {

      throw e;
    }

  }

  async reAttachSubAccountPolicy(userName: string, region: string) {
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
    }`
    const policyName = `${userName}-customer-policy`;
    await this.serverlessBridgeRam.createPolicy({  // 查询并创建当前子账号的专属策略
      policyName: `${userName}-customer-policy`,
      description: 'created by serverless-bridge dont remove',
      policyDocument
    });


    return await this.serverlessBridgeRam.attachPolicyToUser({ policyType: 'Custom', policyName, userName });   // 将专属策略attach到该子账号


  }

  /**
   * 移除子账号的权限策略，防止子账号操作函数
   * @param userName 
   */
  async detachServerlessDevsPolicyFromUser(userName: string) {
    const serverlessBridgeRam = this.getServerlessBridgeRam();
    await serverlessBridgeRam.detachPolicyFromUser({ policyType: 'System', policyName: 'AliyunRAMFullAccess', userName });
    await serverlessBridgeRam.detachPolicyFromUser({ policyType: 'System', policyName: 'AliyunSTSAssumeRoleAccess', userName });
    await serverlessBridgeRam.detachPolicyFromUser({ policyType: 'System', policyName: 'AliyunFCDefaultRolePolicy', userName });
    await serverlessBridgeRam.detachPolicyFromUser({ policyType: 'System', policyName: 'AliyunFCServerlessDevsRolePolicy', userName });
    await serverlessBridgeRam.detachPolicyFromUser({ policyType: 'System', policyName: 'AliyunFCFullAccess', userName });
    await serverlessBridgeRam.detachPolicyFromUser({ policyType: 'System', policyName: 'AliyunVPCFullAccess', userName });
    await serverlessBridgeRam.detachPolicyFromUser({ policyType: 'System', policyName: 'AliyunNASFullAccess', userName });
    // for (const policyName of SERVERLESS_DEVS_POLICIES) {
    //   await serverlessBridgeRam.detachPolicyFromUser({ policyType: 'System', policyName, userName });
    // }
  }

  /**
   * 删除子账号的ak, sk, 现在子账号的ak,sk 上限是2个
   * @param userAccessKeyId 
   */
  async deleteSubAccountAccessKey(userName: string, userAccessKeyId: string) {
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
   */
  async createSubAccountAccessKey(userName: string) {

    try {
      const serverlessBridgeRam = this.getServerlessBridgeRam();
      const currentAks: any = await serverlessBridgeRam.listAccessKeys(userName);
      if (currentAks.length === 2) {
        const currentAccessKeyId = currentAks[0].accessKeyId;
        await serverlessBridgeRam.deleteAccessKey(userName, currentAccessKeyId);
      }
      const subAccountCredential = await serverlessBridgeRam.createAccessKey(userName);
      return subAccountCredential
    } catch (e) {
      throw e;
    }

  }

  /**
   * 查询以及创建子账号
   * @param userName 
   * @returns 
   */
  async getOrCreateSubAccount(userName: string) {
    try {
      const serverlessBridgeRam = this.getServerlessBridgeRam();
      let accountInfo = await serverlessBridgeRam.getUser(userName);
      if (accountInfo.error) {
        accountInfo = await serverlessBridgeRam.createUser({ userName });
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
   */
  async createSubAccountApplication(accessKeyId: string, accessKeySecret: string, appPayload: any) {
    try {
      const serverlessDevsClient = this.getServerlessSubBridgeServerlessDevs({
        accessKeyId,
        accessKeySecret,
      })
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
   */
  async deleteApplication(appName: string) {
    const serverlessDevsClient = this.getServerlessBridgeServerlessDevs()
    return await serverlessDevsClient.deleteApplication(appName);
  }

  async createMainAccountApplication(payload: any): Promise<any> {
    const serverlessDevsClient = this.getServerlessBridgeServerlessDevs();
    return await serverlessDevsClient.createApplication(payload);
  }

  /**
   * 查询应用信息
   * @param appName 
   * @returns 
   */
  async getApplication(appName: string): Promise<any> {
    const serverlessDevsClient = this.getServerlessBridgeServerlessDevs();
    return await serverlessDevsClient.getApplication(appName);
  }

  /**
   * 查询所有应用信息
   * @param appName 
   * @returns 
   */
  async listApplications(): Promise<any> {
    const serverlessDevsClient = this.getServerlessBridgeServerlessDevs();
    return await serverlessDevsClient.listApplications();
  }
  /**
   * 子账号授信fc-console权限
   * @param payload 
   * @param credentials 
   * @returns 
   */
  async subAccountAssumeRole(payload: any): Promise<any> {
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
   */
  async invokeFunction(fcInvokeData: any, payload: any): Promise<any> {

    return await this.serverlessBridgeFc.invokeFunction(fcInvokeData, payload);
  }

  /**
   * 查询函数列表
   * @param stsConfig 
   * @param payload 
   * @returns 
   */
  async listFunctions(payload: any): Promise<any> {


    return await this.serverlessBridgeFc.listFunctions(payload);
  }
  /**
   * 查询函数列表
   * @param stsConfig 
   * @param payload 
   * @returns 
   */
  async updateFunction(payload: any): Promise<any> {

    return await this.serverlessBridgeFc.updateFunction(payload);
  }

  /**
  * 查询函数列表
  * @param payload 
  * @returns 
  */
  async getFunction(payload: any): Promise<any> {

    return await this.serverlessBridgeFc.getFunction(payload);
  }

  /**
  * 查询函数列表
  * @param payload 
  * @returns 
  */
  async getService(payload: any): Promise<any> {
    return await this.serverlessBridgeFc.getService(payload);
  }

  async describeVpcs(payload: any): Promise<any> {
    return await this.serverlessBridgeVpc.describeVpcs(payload);
  }
  
  async createVSwitch(payload: any): Promise<any> {
    return await this.serverlessBridgeVpc.createVSwitch(payload);
  }
}


