import type { NextApiRequest, NextApiResponse } from 'next'
import request from '@/util/request';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
  
    const result = await request.get(`/model/${id}`);
    res.status(result.status).json(result.data);
}
