import type { NextApiRequest, NextApiResponse } from 'next'
import request from '@/util/request';
type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { page = 0, limit = 20 } = req.query;
    const result = await request.get('/app/list', { params: { page, limit } });
    const { status, data } = result;
    res.status(status).json(data)
}
