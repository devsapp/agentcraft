import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { username, password } = req.body;
    const result = await request.post('/auth/register', {
        username,
        password
    });
    const { status, data } = result;
    res.status(status).json(data);
}
