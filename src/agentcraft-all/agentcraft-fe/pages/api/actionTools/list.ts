import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { page = 0, limit = 200 } = req.query;
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    const result = await request.get('/action_tools/list?page=${page}&limit=${limit}', { params: { page, limit } });
    const { status, data } = result;
    res.status(status).json(data)
}
