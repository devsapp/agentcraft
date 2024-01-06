import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { page = 0, limit = 200, appId } = req.query;
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    const result = await request.get(`/assistant/list/${appId}`, { params: { page, limit } });
    res.status(result.status).json(result.data)
}
