import type { NextApiRequest, NextApiResponse } from 'next';
import { getAlibabaCloudServerlessBridge } from 'utils/cloudInfra';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const projectName: any = req.query.projectName;
    const { services = [], envName = 'production' } = req.body;
    const serverlessBridgeService = getAlibabaCloudServerlessBridge(req.headers);
    let status = 200;
    const data: any = {
        code: 200,
    };
    try {
        const result: any = await serverlessBridgeService.deleteCapApp(projectName, envName, services);
        const { name, uid } = result.body;
        data.data = { name, uid };
    } catch (e: any) {
        data.code = e.statusCode;
        data.error = e.message;
    }
    res.status(status).json(data);
}
