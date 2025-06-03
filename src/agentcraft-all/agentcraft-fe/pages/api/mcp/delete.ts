import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    const result = await request.delete(`/mcp/${id}`);
    const token = getTokenFromRequest(req);
    request.defaults.headers.common['Authorization'] = token;

    res.status(result.status).json(result.data)
}
