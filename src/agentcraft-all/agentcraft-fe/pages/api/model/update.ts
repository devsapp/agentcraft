import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { ModelRequestPayload } from '@/types/model';
import { getTokenFromRequest } from 'utils/token';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;


    const payload: ModelRequestPayload = req.body;
    const token = getTokenFromRequest(req);
    request.defaults.headers.common['Authorization'] = token;
    const result = await request.put(`/model/${id}`, payload);
    const { status, data } = result;
    res.status(status).json(data);
}
