import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { DataSetType } from '@/types/dataset';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { page = 0, limit = 2000, id } = req.query;
    const dataSetType:any = req.query.dataSetType;

    let result: any = {};
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    if (dataSetType == DataSetType.QUESTION) {
        result = await request.get(`/question/list/${id}`, { params: { page, limit } });
    } else {
        result = await request.get(`/document/list/${id}`, { params: { page, limit } });
    }

    res.status(result.status).json(result.data)
}
