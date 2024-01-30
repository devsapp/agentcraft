
import { ServerlessBridgeService } from 'infra/alibaba-cloud/services/serverless-app';

export function getAlibabaCloudCredential(credentialMap: any) {
    const mainAccountId: any = process.env.FC_ACCOUNT_ID || credentialMap['x-fc-account-id'];
    const accessKeyId: any = process.env.ALIBABA_CLOUD_ACCESS_KEY_ID || credentialMap['x-fc-access-key-id'];
    const accessKeySecret: any = process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET || credentialMap['x-fc-access-key-secret'];
    const securityToken: any = process.env.ALIBABA_CLOUD_SECURITY_TOKEN || credentialMap['x-fc-security-token'];
    let credential = undefined;
    if (accessKeyId) {
        credential = {
            accessKeyId,
            accessKeySecret,
            securityToken
        }
    }
    return { mainAccountId, credential }
}

export async function addVswitchIdV3(serverlessBridgeService: ServerlessBridgeService, functionInfo: any, vswitchIds: string) {
    try {
        const vpcConfig = functionInfo?.vpcConfig || {}
        vpcConfig.vSwitchIds = vswitchIds;
        functionInfo.vpcConfig = vpcConfig;
        const updateFunctionConfig = {
            environmentVariables: functionInfo?.environmentVariables,
            vpcConfig: functionInfo.vpcConfig
        }
        const updateResult = await serverlessBridgeService.updateFunctionV3(functionInfo.functionName, updateFunctionConfig);
        return updateResult;
    } catch (e) {
        
    }
}

export function getAlibabaCloudServerlessBridge(credentialMap: any) {
    const { credential, mainAccountId } = getAlibabaCloudCredential(credentialMap);
    const serverlessBridgeService = new ServerlessBridgeService(credential, mainAccountId);
    return serverlessBridgeService;
}