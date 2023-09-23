import type { NextApiRequest, NextApiResponse } from 'next'
import request from '@/util/request';
type Data = {
    postUrl: string,
    token: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { name, description } = req.body;
    const result = await request.post('/app/add', { body: { name, description } });
    res.status(200).json(result.data.data)
}
