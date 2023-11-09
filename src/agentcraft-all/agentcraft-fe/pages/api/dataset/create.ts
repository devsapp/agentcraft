import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';

import { DataSetRequestPayload } from '@/types/dataset';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const data: DataSetRequestPayload = req.body;
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    const result = await request.post('/dataset/add', data);
    res.status(result.status).json(result.data);
}
