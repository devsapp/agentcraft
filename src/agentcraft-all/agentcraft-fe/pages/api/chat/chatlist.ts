import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id, page = 0, limit = 200 } = req.query;
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    const result = await request.get(`/v1/chat/list/${id}`, { params: { page, limit } });
    res.status(result.status).json(result.data)
}
