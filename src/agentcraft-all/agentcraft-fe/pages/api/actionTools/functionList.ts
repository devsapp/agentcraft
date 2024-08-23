import type { NextApiRequest, NextApiResponse } from 'next'
// import { ServerlessBridgeService } from 'infra/alibaba-cloud/services/serverless-app';
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';
import { getAlibabaCloudServerlessBridge } from 'utils/cloudInfra';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const headers = req.headers;
    const token = getTokenFromRequest(req);
    request.defaults.headers.common['Authorization'] = token;
    const userResponse = await request.get('/auth/info');
    const userInfo = userResponse.data;
    if (userInfo.msg !== 'success') {
        res.status(500).json({});
        return;
    }
    // const mainAccountId: any = process.env.MAIN_ACCOUNT_ID || headers['x-fc-account-id'];
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

    // const serverlessBridgeService = new ServerlessBridgeService(credential, mainAccountId);
    const serverlessBridgeService = getAlibabaCloudServerlessBridge(headers);
    let status = 200;
    const data: any = {
        code: 200,
    }
    try {
        const result = await serverlessBridgeService.listFunctionV3();
        const functions = result?.body?.functions || [];
        data.data = functions.map((item: any) => {
            return {
                label: item.functionName,
                value: item.functionName
            };
        })
    } catch (e: any) {
        data.code = 500;
        data.error = `Code: ${e?.data?.Code},Message: ${e?.data?.Message}`;
    }
    res.status(status).json(data);
}
