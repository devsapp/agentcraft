import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { DataSetType } from '@/types/dataset';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const dataSetType: any = req.query.dataSetType;
    const payload = req.body;
    let result: any = {};
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    if (dataSetType == DataSetType.QUESTION) {
        result = await request.post('/question/add', payload);
    } else {
        result = await request.post('/document/add', payload);
    }

    res.status(result.status).json(result.data)
}
