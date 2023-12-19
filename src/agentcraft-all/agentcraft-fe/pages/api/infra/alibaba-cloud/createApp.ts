import type { NextApiRequest, NextApiResponse } from 'next';

import { ServerlessBridgeService } from '@/infra/alibaba-cloud/services/serverless-app';

interface ServerlessAppRequestBody {
    name: string,
    description: string,
    roleArn: string,
    template: string,
    parameters: any,
    autoDeploy: boolean
}

interface ServerlessAppResoponseBody {
    name: string,
    description: string,
    roleArn: string,
    template: string,
    parameters: any,
    repoSource: object,
    createdTime: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const template: any = req.query.template;
    const body: any = req.body;
    const headers = req.headers;
    const mainAccountId = process.env.FC_ACCOUNT_ID || headers['x-fc-account-id'];
    const accessKeyId: any = process.env.ALIBABA_CLOUD_ACCESS_KEY_ID || headers['x-fc-access-key-id'];
    const accessKeySecret: any = process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET || headers['x-fc-access-key-secret'];
    const securityToken: any = process.env.ALIBABA_CLOUD_SECURITY_TOKEN || headers['x-fc-security-token'];
    let credential = undefined;
    if (accessKeyId) {
        credential = {
            accessKeyId,
            accessKeySecret,
            securityToken
        }
    }
    const serverlessBridgeService = new ServerlessBridgeService(credential);

    const { description = '', name = '', ...parameters } = body;
    //    region: process.env.Region || 'cn-hangzhou',
    const appName = name;
    const appData: ServerlessAppRequestBody = {
        name: appName,
        description: description || '由AgentCraft创建，谨慎删除',
        template,
        parameters,
        roleArn: `acs:ram::${mainAccountId}:role/aliyunfcserverlessdevsrole`,
        autoDeploy: true,
    }
    // await serverlessBridgeService.getMainOrCreateAccountRole();
    let status = 200;
    const data: any = {
        code: 200,
    }
    try {
        const result = await serverlessBridgeService.createMainAccountApplication(appData);
        data.data = result.body;

    } catch (e: any) {
        status = 500;
        data.code = status;
        data.error = e.message
    }
    res.status(status).json(data);
}
