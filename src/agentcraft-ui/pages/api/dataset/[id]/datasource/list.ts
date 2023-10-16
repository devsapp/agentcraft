import type { NextApiRequest, NextApiResponse } from 'next'
import request from '@/util/request';
import { DataSetType } from '@/types/dataset';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { page = 0, limit = 200, id } = req.query;
    const dataSetType:any = req.query.dataSetType;

    let result: any = {};
    if (dataSetType == DataSetType.QUESTION) {
        result = await request.get(`/question/list/${id}`, { params: { page, limit } });
    } else {
        result = await request.get(`/document/list/${id}`, { params: { page, limit } });
    }

    res.status(result.status).json(result.data)
}
