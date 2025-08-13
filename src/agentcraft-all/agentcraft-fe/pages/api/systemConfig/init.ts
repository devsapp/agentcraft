import type { NextApiRequest, NextApiResponse } from 'next';
import { getAlibabaCloudServerlessBridge, addVswitchIdV3 } from 'infra/utils/cloudInfra';
import THEME from 'constants/theme';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const headers = req.headers;
    const regionId = process.env.Region || 'cn-hangzhou';
    let projectTheme = process.env.PROJECT_THEME || '';
    try {
        projectTheme = JSON.parse(projectTheme);
    } catch (e) {
        projectTheme = THEME;
    }
    let status = 200;
    // 项目配置
    const projectConfig = {
        projectTheme,
        projectFavicon: process.env.PROJECT_FAVICON || '/favicon.ico',
        projectName: process.env.PROJECT_NAME || 'AgentCraft',
        projectLogo: process.env.PROJECT_LOGO || '',
        chatBotIcon: process.env.CHAT_BOT_ICON || '//img.alicdn.com/imgextra/i1/O1CN01Ag2hWp1uz3fbGtWqB_!!6000000006107-2-tps-1024-1024.png',
    }
    const data: any = {
        code: 200,
        data: {
            ...projectConfig,
            regionId,
            system_ready: '',
            vpcInfo:
            {
                vpcName: '',
                vpcId: ''
            }
        }
    }
    // 如果是开发环境，或者私有化部署，直接忽略系统配置
    if (process.env.NODE_ENV === 'development' || process.env.DEPLOY_TYPE === 'private') {
        data.data.systemReady = true;
        res.status(status).json(data);
        return;
    }

    const DEFAULT_VWISTH_CONFIG = {
        regionId,
        zoneId: `${regionId}-j`,
        cidrBlock: "10.2.0.0/24",
        vpcId: "",
        vSwitchName: "agentcraft-vpc",
        description: "由AgentCraft创建，配置RDS PostgreSql数据库使用，请谨慎删除",
    }

    const serverlessBridgeService = getAlibabaCloudServerlessBridge(headers);
    const functionName = process.env.beFunctionName || '';
    try {
        const result = await serverlessBridgeService.getFunctionV3(functionName);
        const functionInfo = result?.body || {};
        const embedding_url = functionInfo.environmentVariables?.EMBEDDING_URL;
        const system_ready = functionInfo.environmentVariables?.SYSTEM_READY;
        const vpcConfig = functionInfo.vpcConfig || {};
        let _vpcName = ''

        // const vpcResult = await serverlessBridgeService.describeVpcs({
        //     vpcId: vpcConfig.vpcId,
        //     regionId
        // });
        // const vpcInfo = vpcResult?.body?.vpcs?.vpc[0] || {};
        // const { vpcName, vpcId } = vpcInfo;
        // _vpcName = vpcName;
        // const vswitchPayload = DEFAULT_VWISTH_CONFIG;
        // vswitchPayload.vpcId = vpcId;
        // vswitchPayload.regionId = regionId;
        // try {
        //     await serverlessBridgeService.createVSwitch(vswitchPayload); //兼容数据库的可用区创建一个vswitch
        // } catch (e: any) {
        // }
        // const latestVpcResult = await serverlessBridgeService.describeVpcs({
        //     vpcId: vpcConfig.vpcId,
        //     regionId
        // });
        // const latestVpcInfo = latestVpcResult?.body?.vpcs?.vpc[0] || {};
        // const vSwitchId = latestVpcInfo?.vSwitchIds?.vSwitchId || [];
        // if (vSwitchId && vSwitchId.length > 0) {
        //     await addVswitchIdV3(serverlessBridgeService, functionInfo, vSwitchId);
        // }

        data.data = Object.assign(data.data, {
            regionId,
            systemReady: embedding_url || system_ready,
            vpcInfo: { vpcName: _vpcName, vpcId: vpcConfig.vpcId }
        });
        
    } catch (e: any) {
        status = 500;
        data.code = status;
        data.error = `Code: ${e.data.Code},Message: ${e.data.Message}`;
    }
    res.status(status).json(data);
}
