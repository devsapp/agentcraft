import type { NextApiRequest, NextApiResponse } from 'next';
import { DataSetType } from '@/types/dataset';
import request from 'utils/serverRequest';
import { DocumentRequestPayload, QuestionRequestPayload } from '@/types/datasource';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const dataSetType: any = req.query.dataSetType;
    const id = req.query.dataSourceId;
    const payload: DocumentRequestPayload | QuestionRequestPayload = req.body;
    let result: any = {};
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    if (dataSetType == DataSetType.QUESTION) {
        result = await request.put(`/question/${id}`, payload);
    } else {
        result = await request.put(`/document/${id}`, payload);
    }

    res.status(result.status).json(result.data)
}
