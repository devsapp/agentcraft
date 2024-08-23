// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';


import { ServerlessBridgeService } from '@/infra/alibaba-cloud/services/serverless-app';
import { AGENTCRAFT_BUS_NAME } from 'constants/client-access';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { headers, body } = req;
    const { region = 'cn-hangzhou', functionName, webhook, token } = body;
    const accessKeyId: any = headers['x-fc-access-key-id'] || '';
    const accessKeySecret: any = headers['x-fc-access-key-secret'] || '';
    const securityToken: any = headers['x-fc-security-token'];
    const mainAccountId: any = headers['x-fc-account-id'] || process.env.MAIN_ACCOUNT_ID;
    let credential = undefined;
    if (accessKeyId) {
        credential = {
            accessKeyId,
            accessKeySecret,
            securityToken
        }
    }
    const serverlessBridgeService = new ServerlessBridgeService(credential, mainAccountId);
    const ebDefaultPolicy = { policyType: "System", policyName: "AliyunEventBridgeFullAccess", roleName: "AliyunFCDefaultRole" };
    try {
        await serverlessBridgeService.serverlessBridgeRam.attactRolePolicy(ebDefaultPolicy);
    } catch (e: any) { }
    const eventBus = await serverlessBridgeService.getEventBus(AGENTCRAFT_BUS_NAME);


    if (eventBus && !eventBus?.body?.data?.eventBusName) {
        await serverlessBridgeService.createEventBus({ EventBusName: AGENTCRAFT_BUS_NAME, Description: "【勿删】AGENTCRAFT桥接钉钉机器人服务" });
    }
    const result: any = await serverlessBridgeService.creatEventRule({ webhook, token, region, functionName, uid: mainAccountId });

    await serverlessBridgeService.serverlessBridgeFcV3.putAsyncInvokeConfig(functionName, {
        destinationConfig: {
            onSuccess: {
                destination: `acs:eventbridge:${region}:${mainAccountId}:eventbus/${AGENTCRAFT_BUS_NAME}`,
            },
            onFailure: {
                destination: ''
            }
        }
    })
    res.status(200).json({ Code: result?.body?.code })
}
