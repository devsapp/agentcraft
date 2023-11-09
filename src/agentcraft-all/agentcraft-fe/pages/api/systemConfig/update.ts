import type { NextApiRequest, NextApiResponse } from 'next'
import { nanoid } from 'nanoid'
import { ServerlessBridgeService } from '@/infra/alibaba-cloud/services/serverless-app';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const headers = req.headers;
    const mainAccountId:any = headers['x-fc-account-id'] || process.env.MAIN_ACCOUNT_ID;
    const accessKeyId: any = headers['x-fc-access-key-id'];
    const accessKeySecret: any = headers['x-fc-access-key-secret'];
    const securityToken: any = headers['x-fc-security-token'];
    const env = req.body;
    let credential = undefined;
    if (accessKeyId) {
        credential = {
            accessKeyId,
            accessKeySecret,
            securityToken
        }
    }
    const serverlessBridgeService = new ServerlessBridgeService(credential, mainAccountId);

    // await serverlessBridgeService.getMainOrCreateAccountRole();
    let status = 200;
    const data: any = {
        code: 200,
    }
    const serviceName = process.env.beServiceName;
    const functionName = process.env.beFunctionName; 
    try {
        const functionInfo = await serverlessBridgeService.getFunction({
            serviceName,
            functionName,
            qualifier: 'LATEST'
        });
        const environmentVariables = functionInfo?.body?.environmentVariables;
        const completeEnvs = Object.assign({},environmentVariables,env);
        completeEnvs.EMBEDDING_DIM = '1024';
        const result = await serverlessBridgeService.updateFunction({
            serviceName,
            functionName,
            environmentVariables: completeEnvs
        });
        data.data = result.body;

    } catch (e: any) {
        status = 500;
        data.code = status;
        data.error = e.message
    }
    console.log(data);
    res.status(status).json(data);
}
