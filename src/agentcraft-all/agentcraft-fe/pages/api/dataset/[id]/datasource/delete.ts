import type { NextApiRequest, NextApiResponse } from 'next';
import { DataSetType } from '@/types/dataset';
import request from 'utils/serverRequest';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  

    const dataSetType: any = req.query.dataSetType;
    const id = req.query.dataSourceId;
    let result: any = {};
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    if (dataSetType == DataSetType.QUESTION) {
        result = await request.delete(`/question/${id}`);
    } else {
        result = await request.delete(`/document/${id}`);
    }

    res.status(result.status).json(result.data)
}
