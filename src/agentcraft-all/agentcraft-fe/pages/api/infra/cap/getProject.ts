import type { NextApiRequest, NextApiResponse } from 'next';
import { getAlibabaCloudServerlessBridge } from 'utils/cloudInfra';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { envName = 'production' as string, serviceName = '', pageNumber = 1, pageSize = 10, projectName = '' } = req.query;
    const headers = req.headers;
    const serverlessBridgeService = getAlibabaCloudServerlessBridge(headers);
    let status = 200;
    const data: any = {
        code: 200,
    }
    try {
        const result: any = await serverlessBridgeService.getCapApp(
            {
                projectName: projectName as string,
                envName: envName as string,
                serviceName: serviceName as string,
                pageNumber: pageNumber as number,
                pageSize: pageSize as number
            });

        const deploymentsData = result.body;

        let latestEnvironmentDeploymentName = '';
        let system_url = '';
        let custom_domain = ''
        let latestDeploymentName = '';
        let phase = '';
        try {
            const servicesInstances = deploymentsData?.status?.servicesInstances;
            latestEnvironmentDeploymentName = deploymentsData?.status?.latestEnvironmentDeploymentName;
            const serviceData = servicesInstances[`${serviceName}`];
            system_url = serviceData?.outputs?.url?.system_url;
            custom_domain = serviceData?.outputs?.url?.custom_domain;
            latestDeploymentName = serviceData?.latestDeployment?.name;
            phase = serviceData?.latestDeployment?.phase;
        } catch (e) {

        }
        data.data = {
            system_url,
            custom_domain,
            phase,
            latestDeploymentName,
            latestEnvironmentDeploymentName
        };
    } catch (e: any) {
        data.code = e.statusCode;
        data.error = e.message;
    }
    res.status(status).json(data);
}
