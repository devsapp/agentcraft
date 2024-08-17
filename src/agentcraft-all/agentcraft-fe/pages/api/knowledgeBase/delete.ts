import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { agentId } = req.query;
    const token = getTokenFromRequest(req);
    request.defaults.headers.common['Authorization'] = token;
    const result = await request.delete(`/agent/${agentId}`);
    res.status(result.status).json(result.data);
}
