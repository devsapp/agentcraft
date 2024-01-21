import type { NextApiRequest, NextApiResponse } from 'next'
import { getAlibabaCloudServerlessBridge } from 'utils/cloudInfra';
import { DEFAULT_EMBEDDING_DIM } from 'constants/system-config';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const headers = req.headers;
    const env = req.body;
    const serverlessBridgeService = getAlibabaCloudServerlessBridge(headers);
    let status = 200;
    const data: any = {
        code: 200,
    }

    const functionName = process.env.beFunctionName || '';
    try {
        const result = await serverlessBridgeService.getFunctionV3(functionName);
        const functionInfo = result?.body || {};
        const environmentVariables = functionInfo.environmentVariables;
        const completeEnvs = Object.assign({}, environmentVariables, env, { SYSTEM_READY: 'true' });
        completeEnvs.EMBEDDING_DIM = `${DEFAULT_EMBEDDING_DIM}`;
        const updateResult = await serverlessBridgeService.updateFunctionV3(functionName, {
            environmentVariables: completeEnvs
        });
        data.data = updateResult.body;

    } catch (e: any) {
        console.log(e)
        status = 500;
        data.code = status;
        data.error = e.message
    }
    res.status(status).json(data);
}
