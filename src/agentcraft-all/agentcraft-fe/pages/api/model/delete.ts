import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    const result = await request.delete(`/model/${id}`);
    const { status, data } = result;
    res.status(status).json(data);
}
