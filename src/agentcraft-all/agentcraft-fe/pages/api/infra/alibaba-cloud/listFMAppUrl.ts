import type { NextApiRequest, NextApiResponse } from 'next';
import { getAlibabaCloudServerlessBridge } from 'infra/utils/cloudInfra';
function getServerlessDevsAppSystemUrl(data: any) {
    let system_intranet_url;
    let app_template;
    let system_internet_url;
    try {
        app_template = data?.template;
        system_intranet_url = data?.lastRelease?.output?.deploy?.apiServer?.url?.system_intranet_url;
        system_internet_url = data?.lastRelease?.output?.deploy?.apiServer?.url?.system_url;
    } catch (e) {

    }
    return { system_intranet_url, system_internet_url, app_template };

}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const headers = req.headers;
    const { appFilter } = req.query;

    const serverlessBridgeService = getAlibabaCloudServerlessBridge(headers);
    let status = 200;
    let data: any = {
        code: 200,
    }

    try {
        const result = await serverlessBridgeService.listApplications();
        data.code = result.statusCode;
        const agentCraftAppList = result.body.result;
        const fmList = agentCraftAppList.filter((item: any) => item.name.indexOf(appFilter) === 0 || (item.name.indexOf('AgentCraftApp') === 0 && appFilter === 'AgentCraft_FM')); //兼容最开始的FM命名
        const fmUrlList = [];
        for (const item of fmList) {
            const result = await serverlessBridgeService.getApplication(item.name);
            const fmData = result.body;
            fmUrlList.push(getServerlessDevsAppSystemUrl(result.body));
        }
        data.data = fmUrlList;
    } catch (e: any) {
        status = 500;
        data.code = status;
        data.error = e.message;
    }
    res.status(status).json(data);
}
