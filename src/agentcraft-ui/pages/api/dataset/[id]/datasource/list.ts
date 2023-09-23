import type { NextApiRequest, NextApiResponse } from 'next'
import request from '@/util/request';
type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { page = 0, limit = 200, datasetId } = req.query;
    const datasetType: any = req.query.datasetType;
    let result: any = {};
    if (datasetType === 1) {
        result = await request.get(`/question/list/${datasetId}`, { params: { page, limit } });
    } else {
        result = await request.get(`/document/list/${datasetId}`, { params: { page, limit } });
    }

    res.status(200).json(result.data.data)
}
