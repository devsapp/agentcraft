import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { AssistantRequestPayload } from 'types/assistant';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    const data: AssistantRequestPayload = req.body;
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    const result = await request.put(`/assistant/${id}`, data);
    res.status(result.status).json(result.data)
}
