import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';

import { DataSetRequestPayload } from 'types/dataset';
import { getTokenFromRequest } from 'utils/token';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const data: DataSetRequestPayload = req.body;
    const token = getTokenFromRequest(req);
    request.defaults.headers.common['Authorization'] = token;
    const result = await request.post('/dataset/add', data);
    res.status(result.status).json(result.data);
}
