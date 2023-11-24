import type { NextApiRequest, NextApiResponse } from 'next'
import { ServerlessBridgeService } from '@/infra/alibaba-cloud/services/serverless-app';

const DEFAULT_VWISTH_CONFIG = {
    regionId: "cn-hangzhou",
    zoneId: "cn-hangzhou-j",
    cidrBlock: "10.2.0.0/24",
    vpcId: "",
    vSwitchName: "agentcraft-vpc",
    description: "由AgentCraft创建，配置数据库使用，请谨慎删除",
}

async function addVswitchId(serverlessBridgeService: ServerlessBridgeService, serviceInfo: any, vswitchId: string) {
    try {
        const vpcConfig = serviceInfo?.body?.vpcConfig || {}
        vpcConfig.vSwitchIds.push(vswitchId);
        const serviceName = serviceInfo?.serviceName;
        const tracingConfig = serviceInfo?.tracingConfig || {};

        return await serverlessBridgeService.updateService(serviceName, { vpcConfig, tracingConfig })
    } catch (e) {

    }
}

async function addVswitchIdV3(serverlessBridgeService: ServerlessBridgeService, functionInfo: any, vswitchIds: string) {
    try {
        const vpcConfig = functionInfo?.vpcConfig || {}
        console.log(vpcConfig);
        vpcConfig.vSwitchIds = vswitchIds;
        functionInfo.vpcConfig = vpcConfig;
        const updateFunctionConfig = {
            environmentVariables: functionInfo?.environmentVariables,
            vpcConfig: functionInfo.vpcConfig
        }
        return await serverlessBridgeService.updateFunctionV3(functionInfo.functionName, updateFunctionConfig)
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
    const region = process.env.Region || 'cn-hangzhou';
    let credential = undefined;
    if (accessKeyId) {
        credential = {
            accessKeyId,
            accessKeySecret,
            securityToken
        }
    }
    // else {
    //     res.status(200).json({ data: { 'EMBEDDING_URL': 'http://localhost:8000' } });
    //     return;
    // }
    const serverlessBridgeService = new ServerlessBridgeService(credential, mainAccountId);

    let status = 200;
    const data: any = {
        code: 200,
    }
    // const serviceName = process.env.beServiceName || '';
    const functionName = process.env.beFunctionName || '';
    try {
        // const result = await serverlessBridgeService.getFunction({
        //     serviceName,
        //     functionName,
        //     qualifier: 'LATEST'
        // });
        const result = await serverlessBridgeService.getFunctionV3(functionName);
        const functionInfo = result?.body || {};
        const embedding_url = functionInfo.environmentVariables?.EMBEDDING_URL;
        // const serviceInfo = await serverlessBridgeService.getService({
        //     serviceName
        // });
        // const vpcConfig = serviceInfo?.body?.vpcConfig || {}
        const vpcConfig = functionInfo.vpcConfig || {};
        let _vpcName = ''

        try {
            const vpcResult = await serverlessBridgeService.describeVpcs({
                vpcId: vpcConfig.vpcId,
                regionId: region
            });
            const vpcInfo = vpcResult?.body?.vpcs?.vpc[0] || {};
            const { vpcName, vpcId } = vpcInfo;
            _vpcName = vpcName;
            const vswitchPayload = DEFAULT_VWISTH_CONFIG;
            vswitchPayload.vpcId = vpcId;
            vswitchPayload.regionId = region;
            try {
                await serverlessBridgeService.createVSwitch(vswitchPayload); //兼容数据库的可用区创建一个vswitch
            } catch (e: any) {
            }
            const latestVpcResult = await serverlessBridgeService.describeVpcs({
                vpcId: vpcConfig.vpcId,
                regionId: region
            });
            const latestVpcInfo = latestVpcResult?.body?.vpcs?.vpc[0] || {};
            console.log('latestVpcResult', latestVpcResult);
            const vSwitchId = latestVpcInfo?.vSwitchIds?.vSwitchId || [];
            if (vSwitchId && vSwitchId.length > 0) {
                await addVswitchIdV3(serverlessBridgeService, functionInfo, vSwitchId);
            }
            // await addVswitchId(serverlessBridgeService, serviceInfo, vSwitchResult?.body?.vSwitchId); //函数计算增加 i可用区的vswitch
        } catch (e) {
            console.log('error:', e);
        }
        data.data = { EMBEDDING_URL: embedding_url, vpcInfo: { vpcName: _vpcName, vpcId: vpcConfig.vpcId } }
    } catch (e: any) {
        status = 500;
        data.code = status;
        data.error = e.message
    }
    res.status(status).json(data);
}
