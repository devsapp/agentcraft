import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { ModelRequestPayload } from '@/types/model';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const payload: ModelRequestPayload = req.body;
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    const result = await request.post('/model/add', payload);
    const { status, data } = result;
    res.status(status).json(data);
}
