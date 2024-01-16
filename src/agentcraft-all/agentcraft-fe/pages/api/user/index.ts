import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = getTokenFromRequest(req);
    request.defaults.headers.common['Authorization'] = token;
    const result = await request.get('/auth/info');
    const { status, data } = result;
    res.status(status).json(data);
}
