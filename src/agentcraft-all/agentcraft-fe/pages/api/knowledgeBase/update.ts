import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { KnowledgeBaseRequestPayload } from '@/types/knowledgeBase';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    const data: KnowledgeBaseRequestPayload = req.body;
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    const result = await request.put(`/agent/${id}`, data);
    res.status(result.status).json(result.data)
}
