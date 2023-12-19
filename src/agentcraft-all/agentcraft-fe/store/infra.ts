

import { request } from '@/utils/clientRequest';

export function checkAppStatus(appName: string): Promise<any> {

    return new Promise((resolve, reject) => {

        const timmer = setInterval(async () => {
            try {
                const result: any = await request(`/api/infra/alibaba-cloud/getApp?appName=${appName}`);
                const release = result.data.lastRelease;
                if (release.status === 'published') {
                    clearInterval(timmer);
                    resolve(release);
                }
            } catch (e) {
                // 忽略超时 
                // reject(e);
            }

        }, 4000);

    })


}

export async function createServerlessApp(templateName: string, payload: any) {
   
    const res = await request(`/api/infra/alibaba-cloud/createApp?template=${templateName}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res?.data?.name || '';

}
