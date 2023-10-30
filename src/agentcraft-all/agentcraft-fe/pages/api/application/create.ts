import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
   
    const { name, description } = req.body;
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    const result = await request.post('/app/add', { name, description });
    res.status(result.status).json(result.data);
}
