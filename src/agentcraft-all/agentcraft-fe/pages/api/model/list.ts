import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
   
    const { page = 0, limit = 20 } = req.query;
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    const result = await request.get('/model/list', { params: { page, limit } });
    const { status, data } = result;
    res.status(status).json(data);
}
