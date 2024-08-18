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
    const { access_token } = data;
    res.setHeader('Set-Cookie', `token=${access_token}; Path=/; HttpOnly;`);
    res.status(status).json({ success: status === 201 ? true : false });
}
