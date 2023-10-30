import type { NextApiRequest, NextApiResponse } from 'next'
import { nanoid } from 'nanoid'
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
    const parameters = req.body;
    const mainAccountId = req.headers['x-fc-account-id'] || process.env.MAIN_ACCOUNT_ID;
    const serverlessBridgeService = new ServerlessBridgeService();
    const appName = `AgentCraft_${nanoid()}`;
    const appData: ServerlessAppRequestBody = {
        name: appName,
        description: '由AgentCraft创建，谨慎删除',
        template,
        parameters,
        roleArn: `acs:ram::${mainAccountId}:role/aliyunfcserverlessdevsrole`,
        autoDeploy: true,

    }
    await serverlessBridgeService.getMainOrCreateAccountRole();
    let status = 200;
    let data: any = {
        code: 200,
    }
    try {
        const result = await serverlessBridgeService.createMainAccountApplication(appData);
        console.log(result)
        data.data = result.body;
        
    } catch (e: any) {
        status = 500;
        data.error = e.message
    }
    res.status(status).json(data);
}
