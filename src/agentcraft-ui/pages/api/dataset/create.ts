import type { NextApiRequest, NextApiResponse } from 'next'
import request from '@/util/request';

import { DataSetRequestPayload } from '@/types/dataset';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const data: DataSetRequestPayload = req.body;
    const result = await request.post('/dataset/add', data);
    res.status(result.status).json(result.data)
}
