import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
  
    const result = await request.delete(`/action_tools/${id}`);
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    res.status(result.status).json(result.data)
}
