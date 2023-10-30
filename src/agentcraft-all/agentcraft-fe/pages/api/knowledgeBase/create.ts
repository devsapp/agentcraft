import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { KnowledgeBaseRequestPayload } from '@/types/knowledgeBase';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const data: KnowledgeBaseRequestPayload = req.body;
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    const result = await request.post('/agent/add', data);
    res.status(result.status).json(result.data)
}
