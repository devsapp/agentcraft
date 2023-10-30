import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { ModelRequestPayload } from '@/types/model';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;


    const payload: ModelRequestPayload = req.body;
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    const result = await request.put(`/model/${id}`, payload);
    const { status, data } = result;
    res.status(status).json(data);
}
