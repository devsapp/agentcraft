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
            uid: process.env.MAIN_ACCOUNT_ID || '',
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


    const serverlessBridgeService = getAlibabaCloudServerlessBridge(headers);
    const functionName = process.env.beFunctionName || '';
    try {
        const result = await serverlessBridgeService.getFunctionV3(functionName);
        const functionInfo = result?.body || {};
        const embedding_url = functionInfo.environmentVariables?.EMBEDDING_URL;
        const system_ready = functionInfo.environmentVariables?.SYSTEM_READY;
        const vpcConfig = functionInfo.vpcConfig || {};
        let _vpcName = ''

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
