import type { NextApiRequest, NextApiResponse } from 'next'
import request from '@/util/request';
import { DataSetType } from '@/types/dataset';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const dataSetType: any = req.query.dataSetType;
    const payload = req.body;
    let result: any = {};
  
    if (dataSetType == DataSetType.QUESTION) {
        result = await request.post('/question/add', payload);
    } else {
        result = await request.post('/document/add', payload);
    }

    res.status(result.status).json(result.data)
}
