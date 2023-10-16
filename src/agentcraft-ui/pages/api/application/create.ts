import type { NextApiRequest, NextApiResponse } from 'next'
import request from '@/util/request';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
   
    const { name, description } = req.body;
    const result = await request.post('/app/add', { name, description });
    res.status(result.status).json(result.data);
}
