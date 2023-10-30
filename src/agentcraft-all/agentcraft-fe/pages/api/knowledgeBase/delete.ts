import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { agentId } = req.query;
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    const result = await request.delete(`/agent/${agentId}`);
    res.status(result.status).json(result.data);
}
