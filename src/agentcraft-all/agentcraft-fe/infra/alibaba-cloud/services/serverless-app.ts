
import { ServerlessBridgeFc, ServerlessBridgeServerlessDevs, ServerlessBridgeFcV3 } from '@/infra/alibaba-cloud/open-apis/fc';
import { ServerlessBridgeRam } from '@/infra/alibaba-cloud/open-apis/ram';
import { ServerlessBridgeSts } from '@/infra/alibaba-cloud/open-apis/sts';
import { ServerlessBridgeVpc } from '@/infra/alibaba-cloud/open-apis/vpc';
import { ServerlessBridgeEventbridge } from '@/infra/alibaba-cloud/open-apis/eventbridge';
import { ServerlessBridgeCap, IServiceCreateProjectRequestData, IServiceDeploymentRequestData } from '@/infra/alibaba-cloud/open-apis/cap';
import { FC_DEFAULT_ROLE_NAME, ASSUME_ROLE_POLICY_DOCUMENT, SERVERLESS_DEVS_POLICIES } from '@/constants/cloud-resources';
import { OpenApiConfig } from '@/infra/alibaba-cloud/open-apis//types';


export class ServerlessBridgeService {
  serverlessBridgeRam: ServerlessBridgeRam;
  serverlessBridgeSts: ServerlessBridgeSts;
  serverlessBridgeServerlessDevs: ServerlessBridgeServerlessDevs;
  serverlessBridgeFc: ServerlessBridgeFc;
  serverlessBridgeFcV3: ServerlessBridgeFcV3;
  serverlessBridgeVpc: ServerlessBridgeVpc;
  serverlessBridgeEb: ServerlessBridgeEventbridge;
  serverlessBridgeCap: ServerlessBridgeCap;
  config: OpenApiConfig | undefined;
  accountId: string | undefined;
  constructor(config?: OpenApiConfig, accountId?: string) {
    this.config = config;
    this.accountId = accountId;
    this.serverlessBridgeRam = new ServerlessBridgeRam(config);
    this.serverlessBridgeSts = new ServerlessBridgeSts(config);
    this.serverlessBridgeServerlessDevs = new ServerlessBridgeServerlessDevs(config);
    this.serverlessBridgeFc = new ServerlessBridgeFc(config, accountId);
    this.serverlessBridgeVpc = new ServerlessBridgeVpc(config);
    this.serverlessBridgeFcV3 = new ServerlessBridgeFcV3(config, accountId);
    this.serverlessBridgeEb = new ServerlessBridgeEventbridge(config);
    this.serverlessBridgeCap = new ServerlessBridgeCap(config, accountId);
  }

  getServerlessBridgeCap(): ServerlessBridgeCap {
    return this.serverlessBridgeCap;
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

  getServerlessBridgeFcV3(accountId: string, config?: OpenApiConfig): ServerlessBridgeFcV3 {
    return new ServerlessBridgeFcV3(config, accountId);
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
  * 查询函数列表V3版本
  * @param functionName
  * @returns 
  */

  async invokeFunctionV3(functionName: string, payload: any): Promise<any> {
    return await this.serverlessBridgeFcV3.invokeFunction(functionName, payload);
  }


  async listFunctionV3(prefix = '', nextToken = '', limit = 100): Promise<any> {

    return await this.serverlessBridgeFcV3.listFunction(prefix, nextToken, limit);
  }

  async getFunctionV3(functionName: string): Promise<any> {

    return await this.serverlessBridgeFcV3.getFunction(functionName);
  }

  async updateFunctionV3(functionName: string, body: any): Promise<any> {
    return await this.serverlessBridgeFcV3.updateFunction(functionName, body);
  }



  /**
  * 查询函数列表
  * @param payload 
  * @returns 
  */
  async getService(payload: any): Promise<any> {
    return await this.serverlessBridgeFc.getService(payload);
  }

  async updateService(serviceName: string, payload: any): Promise<any> {
    return await this.serverlessBridgeFc.updateService(serviceName, payload);
  }

  async describeVpcs(payload: any): Promise<any> {
    return await this.serverlessBridgeVpc.describeVpcs(payload);
  }

  async createVSwitch(payload: any): Promise<any> {
    return await this.serverlessBridgeVpc.createVSwitch(payload);
  }
  async createEventBus(params: any) {
    return await this.serverlessBridgeEb.createEventBus(params);
  }

  async getEventBus(busName?: string) {
    return await this.serverlessBridgeEb.getEventBus(busName);
  }
  async creatEventRule(eventruleData: any) {
    return await this.serverlessBridgeEb.creatEventRule(eventruleData);
  }

  async waitForServicesToFinish(projectName: string, envName: string = 'production') {
    while (true) {

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('')
        }, 1000);
      }); 

      const result = await this.serverlessBridgeCap.getEnvironment(projectName, envName);
      const serviceInstances = result.body.status.servicesInstances;
      const latestDeployments = Object.keys(serviceInstances).map((key: string) => {
        return serviceInstances[key].latestDeployment;
      });

      const unfinishedDeplyment = latestDeployments.filter((deployment: any) => {
        return deployment.phase !== 'Finished';
      });
      if (unfinishedDeplyment.length === 0) {
        break;
      }
    }
  }
  async createCapApp(data: IServiceCreateProjectRequestData) {
    const { projectName, description, templateName, envName, templateParameters = {}, serviceNameChanges = {} } = data;
    const envRoleArn = this.serverlessBridgeCap.getEnvRoleArn();
    let needLock = false;
    try {
      await this.serverlessBridgeCap.createProject(projectName, description as string); // 一个uid 有500个项目的限额
    } catch (e) {
      needLock = true;
    }

    const currentEnvironment = await this.serverlessBridgeCap.getEnvironment(projectName, envName);
    const currentServices = currentEnvironment?.body?.spec?.stagedConfigs?.services;
    const currentVariables = currentEnvironment?.body?.spec?.stagedConfigs?.variables;
    const serviceResult = await this.serverlessBridgeCap.renderServicesByTemplate(projectName, serviceNameChanges, templateName, templateParameters);

    const serviceData: any = serviceResult.body;
    const allServices = Object.assign({}, currentServices, serviceData.services);
    const allVariables = Object.assign({}, currentVariables, serviceData.variables);
    // if (needLock) { // 如果有锁，则等待
    //   await this.waitForServicesToFinish(projectName, envName);
    // } 
    await this.serverlessBridgeCap.updateEnvironment(projectName, envName, {
      name: envName,
      spec: {
        stagedConfigs: {
          services: allServices,
          variables: allVariables
        },
        roleArn: envRoleArn
      }
    });
    let deployedServiceName = '';
    try {
      deployedServiceName = Object.keys(serviceData.services)[0];
    } catch (e) { }
    await this.serverlessBridgeCap.deployEnvironment(projectName, envName); // 需要返回serviceName

    return { deployedServiceName };

  }
  async deleteCapApp(projectName: string, envName: string = 'production', services?: any) {
    const envRoleArn = this.serverlessBridgeCap.getEnvRoleArn();
    const envResult = await this.serverlessBridgeCap.updateEnvironment(projectName, envName, {
      name: envName,
      spec: {
        stagedConfigs: {
          services: {},
          variables: {}
        },
        roleArn: envRoleArn
      }
    });

    const deploymentResult = await this.serverlessBridgeCap.deployEnvironment(projectName, envName, { deleteProject: true, services });
    return deploymentResult;
  }
  async getCapApp(data: IServiceDeploymentRequestData) {
    const { projectName, envName = 'production', serviceName, pageNumber = 1, pageSize = 10 } = data;
    await this.serverlessBridgeCap.listServiceDeployments({
      projectName,
      envName,
      serviceName,
      pageNumber,
      pageSize
    });
    return await this.serverlessBridgeCap.getEnvironment(projectName, envName);
  }
}


