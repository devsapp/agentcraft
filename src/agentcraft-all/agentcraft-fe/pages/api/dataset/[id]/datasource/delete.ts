import type { NextApiRequest, NextApiResponse } from 'next';
import { DataSetType } from '@/types/dataset';
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  

    const dataSetType: any = req.query.dataSetType;
    const id = req.query.dataSourceId;
    let result: any = {};
    const token = getTokenFromRequest(req);
    request.defaults.headers.common['Authorization'] = token;
    if (dataSetType == DataSetType.QUESTION) {
        result = await request.delete(`/question/${id}`);
    } else {
        result = await request.delete(`/document/${id}`);
    }

    res.status(result.status).json(result.data)
}
