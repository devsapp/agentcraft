import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { AssistantRequestPayload } from 'types/assistant';
import { getTokenFromRequest } from 'utils/token';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const data: AssistantRequestPayload = req.body;
    const token = getTokenFromRequest(req);
    request.defaults.headers.common['Authorization'] = token;
    const result = await request.post('/assistant/add', data);
    res.status(result.status).json(result.data)
}
