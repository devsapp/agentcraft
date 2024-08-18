import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
   
    const { name, description } = req.body;
    const token = getTokenFromRequest(req);
    console.log(token,'token');
    request.defaults.headers.common['Authorization'] = token;
    const result = await request.post('/app/add', { name, description });
    res.status(result.status).json(result.data);
}
