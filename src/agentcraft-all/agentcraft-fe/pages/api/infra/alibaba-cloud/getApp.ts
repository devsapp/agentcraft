import type { NextApiRequest, NextApiResponse } from 'next'

import { ServerlessBridgeService } from '@/infra/alibaba-cloud/services/serverless-app';




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const appName: any = req.query.appName;

    const serverlessBridgeService = new ServerlessBridgeService();

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
        data.error = e.message
    }
    res.status(status).json(data);
}
