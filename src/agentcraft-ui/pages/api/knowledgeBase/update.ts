import type { NextApiRequest, NextApiResponse } from 'next'
import request from '@/util/request';
import { KnowledgeBaseRequestPayload } from '@/types/knowledgeBase';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    const data: KnowledgeBaseRequestPayload = req.body;
    const result = await request.put(`/agent/${id}`, data);
    res.status(result.status).json(result.data)
}
