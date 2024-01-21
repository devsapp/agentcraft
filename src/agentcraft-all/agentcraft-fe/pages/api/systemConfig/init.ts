import type { NextApiRequest, NextApiResponse } from 'next';
import { getAlibabaCloudServerlessBridge, addVswitchIdV3 } from 'utils/cloudInfra';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const headers = req.headers;
    const regionId = process.env.Region || 'cn-hangzhou';

    const DEFAULT_VWISTH_CONFIG = {
        regionId,
        zoneId: `${regionId}-j`,
        cidrBlock: "10.2.0.0/24",
        vpcId: "",
        vSwitchName: "agentcraft-vpc",
        description: "由AgentCraft创建，配置RDS PostgreSql数据库使用，请谨慎删除",
    }

    const serverlessBridgeService = getAlibabaCloudServerlessBridge(headers);

    let status = 200;
    const data: any = {
        code: 200,
        data: {
            regionId,
            system_ready: '',
            vpcInfo:
            {
                vpcName: '',
                vpcId: ''
            }
        }
    }
    const functionName = process.env.beFunctionName || '';
    try {
        const result = await serverlessBridgeService.getFunctionV3(functionName);
        const functionInfo = result?.body || {};
        const embedding_url = functionInfo.environmentVariables?.EMBEDDING_URL;
        const system_ready = functionInfo.environmentVariables?.SYSTEM_READY;
        const vpcConfig = functionInfo.vpcConfig || {};
        let _vpcName = ''

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

        data.data = { regionId, systemReady: embedding_url || system_ready , vpcInfo: { vpcName: _vpcName, vpcId: vpcConfig.vpcId } }
    } catch (e: any) {
        status = 500;
        data.code = status;
        data.error = `Code: ${e.data.Code},Message: ${e.data.Message}`;
    }
    data.data.systemReady = process.env.NODE_ENV === 'development' ? true: data.data.systemReady;
    res.status(status).json(data);
}
