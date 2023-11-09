import type { NextApiRequest, NextApiResponse } from 'next'

import { ServerlessBridgeService } from '@/infra/alibaba-cloud/services/serverless-app';




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const appName: any = req.query.appName;

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
        const result = await serverlessBridgeService.getApplication(appName);
        data.code = result.statusCode;
        data.data = result.body;
    } catch (e: any) {
        status = 500;
        data.code = status;
        data.error = e.message
    }
    res.status(status).json(data);
}
