import type { NextApiRequest, NextApiResponse } from 'next'
import { ServerlessBridgeService } from '@/infra/alibaba-cloud/services/serverless-app';

async function addVswitchIdV3(serverlessBridgeService: ServerlessBridgeService, functionInfo: any, vswitchIds: string) {
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
        console.log(e);
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const headers = req.headers;
    const mainAccountId: any = process.env.FC_ACCOUNT_ID || headers['x-fc-account-id'];
    const accessKeyId: any = process.env.ALIBABA_CLOUD_ACCESS_KEY_ID || headers['x-fc-access-key-id'];
    const accessKeySecret: any = process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET || headers['x-fc-access-key-secret'];
    const securityToken: any = process.env.ALIBABA_CLOUD_SECURITY_TOKEN || headers['x-fc-security-token'];
    const regionId = process.env.Region || 'cn-hangzhou';
    let credential = undefined;
    if (accessKeyId) {
        credential = {
            accessKeyId,
            accessKeySecret,
            securityToken
        }
    }
    const DEFAULT_VWISTH_CONFIG = {
        regionId,
        zoneId: `${regionId}-j`,
        cidrBlock: "10.2.0.0/24",
        vpcId: "",
        vSwitchName: "agentcraft-vpc",
        description: "由AgentCraft创建，配置RDS PostgreSql数据库使用，请谨慎删除",
    }
    const serverlessBridgeService = new ServerlessBridgeService(credential, mainAccountId);

    let status = 200;
    const data: any = {
        code: 200,
    }
    const functionName = process.env.beFunctionName || '';
    try {
        const result = await serverlessBridgeService.getFunctionV3(functionName);
        const functionInfo = result?.body || {};
        const embedding_url = functionInfo.environmentVariables?.EMBEDDING_URL;
        const vpcConfig = functionInfo.vpcConfig || {};
        let _vpcName = ''

        try {
            const vpcResult = await serverlessBridgeService.describeVpcs({
                vpcId: vpcConfig.vpcId,
                regionId
            });
            const vpcInfo = vpcResult?.body?.vpcs?.vpc[0] || {};
            const { vpcName, vpcId } = vpcInfo;
            _vpcName = vpcName;
            const vswitchPayload = DEFAULT_VWISTH_CONFIG;
            vswitchPayload.vpcId = vpcId;
            vswitchPayload.regionId = regionId;
            try {
                await serverlessBridgeService.createVSwitch(vswitchPayload); //兼容数据库的可用区创建一个vswitch
            } catch (e: any) {
            }
            const latestVpcResult = await serverlessBridgeService.describeVpcs({
                vpcId: vpcConfig.vpcId,
                regionId
            });
            const latestVpcInfo = latestVpcResult?.body?.vpcs?.vpc[0] || {};
            const vSwitchId = latestVpcInfo?.vSwitchIds?.vSwitchId || [];
            if (vSwitchId && vSwitchId.length > 0) {
                await addVswitchIdV3(serverlessBridgeService, functionInfo, vSwitchId);
            }
        } catch (e) {
            console.log('error:', e);
        }
        data.data = { regionId, EMBEDDING_URL: embedding_url, vpcInfo: { vpcName: _vpcName, vpcId: vpcConfig.vpcId } }
    } catch (e: any) {
        status = 500;
        data.code = status;
        data.error = `Code: ${e.data.Code},Message: ${e.data.Message}`;
    }
    res.status(status).json(data);
}
