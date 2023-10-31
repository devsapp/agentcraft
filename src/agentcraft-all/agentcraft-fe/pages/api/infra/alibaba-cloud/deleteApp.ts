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
    const  appName:any = req.query.appName;
    const headers = req.headers;
    const accessKeyId: any = headers['x-fc-access-key-id'];
    const accessKeySecret: any = headers['x-fc-access-key-secret'];
    const securityToken: any = headers['x-fc-security-token'];
    let credential = undefined;
    if (accessKeyId) {
        credential = {
            accessKeyId,
            accessKeySecret,
            securityToken
        }
    }
    const serverlessBridgeService = new ServerlessBridgeService(credential);
  
    let status = 200;
    let data: any = {
        code: 200,
    }
    try {
        const result = await serverlessBridgeService.deleteApplication(appName);
        data.code = result.statusCode;
        data.data = result;
    } catch (e: any) {
        status = 500;
        data.error = e.message
    }
    res.status(status).json(data);
}
