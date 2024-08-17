import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { DataSetType } from '@/types/dataset';
import { getTokenFromRequest } from 'utils/token';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const dataSetType: any = req.query.dataSetType;
    const payload = req.body;
    let result: any = {};
    const token = getTokenFromRequest(req);
    request.defaults.headers.common['Authorization'] = token;
    if (dataSetType == DataSetType.QUESTION) {
        result = await request.post('/question/add', payload);
    } else {
        result = await request.post('/document/add', payload);
    }

    res.status(result.status).json(result.data)
}
