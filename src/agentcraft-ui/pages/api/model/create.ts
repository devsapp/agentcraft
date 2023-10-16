import type { NextApiRequest, NextApiResponse } from 'next'
import request from '@/util/request';
import { ModelRequestPayload } from '@/types/model';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const data: ModelRequestPayload = req.body;
    const result = await request.post('/model/add', data);
    res.status(result.status).json(result.data)
}
