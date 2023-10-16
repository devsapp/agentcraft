import type { NextApiRequest, NextApiResponse } from 'next'
import request from '@/util/request';
import { KnowledgeBaseRequestPayload } from '@/types/knowledgeBase';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const data: KnowledgeBaseRequestPayload = req.body;
    const result = await request.post('/agent/add', data);
    res.status(result.status).json(result.data)
}
