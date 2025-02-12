import type { NextApiRequest, NextApiResponse } from 'next';
import request from 'utils/serverRequest';
// import { ModelRequestPayload } from '@/types/model';
import { getTokenFromRequest } from 'utils/token';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const payload: any = req.body;
    const { agentId } = payload;
    const token = getTokenFromRequest(req);
    request.defaults.headers.common['Authorization'] = token;
    const result = await request.get(`/share/refresh_share/${agentId}`);
    const { status, data } = result;
    res.status(status).json(data);
}
