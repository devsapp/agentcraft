import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { KnowledgeBaseRequestPayload } from '@/types/knowledgeBase';
import { getTokenFromRequest } from 'utils/token';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    const data: KnowledgeBaseRequestPayload = req.body;
    const token = getTokenFromRequest(req);
    request.defaults.headers.common['Authorization'] = token;
    const result = await request.put(`/agent/${id}`, data);
    res.status(result.status).json(result.data)
}
