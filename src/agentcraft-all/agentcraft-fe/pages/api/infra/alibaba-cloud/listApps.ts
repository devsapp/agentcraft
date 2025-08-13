import type { NextApiRequest, NextApiResponse } from 'next';
import { getAlibabaCloudServerlessBridge } from 'infra/utils/cloudInfra';
// import { ServerlessBridgeService } from '@/infra/alibaba-cloud/services/serverless-app';




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const headers = req.headers;
    const { appFilter } = req.query;

    // const accessKeyId: any = process.env.ALIBABA_CLOUD_ACCESS_KEY_ID || headers['x-fc-access-key-id'];
    // const accessKeySecret: any = process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET || headers['x-fc-access-key-secret'];
    // const securityToken: any = process.env.ALIBABA_CLOUD_SECURITY_TOKEN || headers['x-fc-security-token'];
    // let credential = undefined;
    // if (accessKeyId) {
    //     credential = {
    //         accessKeyId,
    //         accessKeySecret,
    //         securityToken
    //     }
    // }
    // const serverlessBridgeService = new ServerlessBridgeService(credential);
    const serverlessBridgeService = getAlibabaCloudServerlessBridge(headers);
    let status = 200;
    let data: any = {
        code: 200,
    }
    
    try {
        const result = await serverlessBridgeService.listApplications();
        data.code = result.statusCode;
        const agentCraftAppList = result.body.result;
        data.data = agentCraftAppList.filter((item: any) => item.name.indexOf(appFilter) === 0 || (item.name.indexOf('AgentCraftApp') === 0 && appFilter === 'AgentCraft_FM')); //兼容最开始的FM命名
    } catch (e: any) {
        status = 500;
        data.code = status;
        data.error = e.message;
    }
    res.status(status).json(data);
}
