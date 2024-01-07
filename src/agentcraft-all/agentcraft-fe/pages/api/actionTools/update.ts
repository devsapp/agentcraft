import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
   
    const { id } = req.query;
    const payload = req.body;
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    const result = await request.put(`/action_tools/${id}`, payload);
    const { status, data } = result;
    res.status(status).json(data);
}
