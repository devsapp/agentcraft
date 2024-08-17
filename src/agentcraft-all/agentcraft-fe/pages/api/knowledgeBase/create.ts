import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { KnowledgeBaseRequestPayload } from '@/types/knowledgeBase';
import { getTokenFromRequest } from 'utils/token';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const data: KnowledgeBaseRequestPayload = req.body;
    const token = getTokenFromRequest(req);
    request.defaults.headers.common['Authorization'] = token;
    const result = await request.post('/agent/add', data);
    res.status(result.status).json(result.data)
}
