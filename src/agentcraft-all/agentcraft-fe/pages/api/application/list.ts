import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';
type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { page = 0, limit = 200 } = req.query;
    const token = getTokenFromRequest(req);
    request.defaults.headers.common['Authorization'] = token;
    const result = await request.get('/app/list?page=${page}&limit=${limit}', { params: { page, limit } });
    const { status, data } = result;
    res.status(status).json(data)
}
