import type { NextApiRequest, NextApiResponse } from 'next';
import { getAlibabaCloudServerlessBridge } from 'utils/cloudInfra';

export interface IServiceCreateProjectRequestData {
    projectName: string,  // cap 项目名
    templateName: string, // cap 模版名 ，有智能应用，mcp应用等
    templateParameters: any, // cap 模版参数 每一个模版都有自己的参数
    description?: string, // cap项目描述 
    serviceNameChanges: any, // 
    variableValues: any,
    envName: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const body: IServiceCreateProjectRequestData = req.body;
    const headers = req.headers;
    const serverlessBridgeService = getAlibabaCloudServerlessBridge(headers);
    const mainAccountId = process.env.MAIN_ACCOUNT_ID || headers['x-fc-account-id'];
    let status = 200;
    const data: any = {
        code: 200,
    }
    try {

        const AGENT_APP_DEFAULT_PARAMETERS = {
            "region": process.env.Region,
            "baseAgentServerUrl": process.env.openApiUrl,
            "fcRole": `acs:ram::${mainAccountId}:role/aliyunfcdefaultrole`
        }
    
        const agentAppRequest = {
            "projectName": body.projectName,
            "templateName": body.templateName,
            "templateParameters": Object.assign({}, body.templateParameters, AGENT_APP_DEFAULT_PARAMETERS),
            "description": body.description,
            "envName": "production",
            "variableValues": {},
            "serviceNameChanges": {}
        }

        const result = await serverlessBridgeService.createCapApp(agentAppRequest);
        data.data = result;

    } catch (e: any) {
        status = 500;
        data.code = status;
        data.error = e.message
    }
    res.status(status).json(data);
}
