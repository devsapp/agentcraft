import { list } from 'server/workspace';
import { init } from 'server/system';

export async function initPageConfig(context: any) {
    const { req } = context;
    const { cookies } = req;
    const workspaceResult = await list(req);
    // const systemResult = await init(req);
    // const systemInfo = systemResult?.data || {};
    const workspaceList = workspaceResult?.data || []
    let workspaceId = cookies['workspaceId'] || '';
    workspaceId = workspaceId ? workspaceId : workspaceList?.[0]?.id || '';
    return {
        showSystemConfig: false,
        workspaceId,
        workspaceList
    }
}
