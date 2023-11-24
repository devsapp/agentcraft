import type { NextApiRequest, NextApiResponse } from 'next'
import { ServerlessBridgeService } from '@/infra/alibaba-cloud/services/serverless-app';
import { AGENTCRAFT_APP } from 'constants/index';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const headers = req.headers;
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

    let status = 200;
    let data: any = {
        code: 200,
    }
    try {
        const result = await serverlessBridgeService.listApplications();
        data.code = result.statusCode;
        const agentCraftAppList = result.body.result;
        data.data = agentCraftAppList.filter((item: any) => item.name.indexOf(AGENTCRAFT_APP) === 0);
    } catch (e: any) {
        status = 500;
        data.code = status;
        data.error = e.message;
    }
    res.status(status).json(data);
}
