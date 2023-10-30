import type { NextApiRequest, NextApiResponse } from 'next'

import { ServerlessBridgeService } from '@/infra/alibaba-cloud/services/serverless-app';


const AGENT_CRAFT = 'AgentCraft';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {


    const serverlessBridgeService = new ServerlessBridgeService();
  
    let status = 200;
    let data: any = {
        code: 200,
    }
    try {
        const result = await serverlessBridgeService.listApplications();
        data.code = result.statusCode;
        const agentCraftAppList = result.body.result;
        data.data = agentCraftAppList.filter((item: any) => item.name.indexOf(AGENT_CRAFT) === 0);
    } catch (e: any) {
        status = 500;
        data.error = e.message;
    }
    res.status(status).json(data);
}
