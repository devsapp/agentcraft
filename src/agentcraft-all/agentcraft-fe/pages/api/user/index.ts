import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    const result = await request.get('/auth/info');
    const { status, data } = result;
    res.status(status).json(data);
}
