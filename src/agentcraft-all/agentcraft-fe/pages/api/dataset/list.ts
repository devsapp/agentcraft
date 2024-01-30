import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { page = 0, limit = 20, dataset_type } = req.query;
    const token = getTokenFromRequest(req);
    request.defaults.headers.common['Authorization'] = token;
    const result = await request.get('/dataset/list', { params: { page, limit, dataset_type } });

    const { status, data } = result;
    res.status(status).json(data);
}
