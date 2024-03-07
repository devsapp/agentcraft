import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { page = 0, limit = 200 } = req.query;
    const token = getTokenFromRequest(req);
    request.defaults.headers.common['Authorization'] = token;
    const result = await request.get('/action_tools/list?page=${page}&limit=${limit}', { params: { page, limit } });
    const { status, data } = result;
    res.status(status).json(data)
}
