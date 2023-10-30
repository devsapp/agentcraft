import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import querystring from 'querystring';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { username, password } = req.body;
    const result = await request.post('/auth/login', querystring.stringify({
        username,
        password,
        scope: '',
        client_id: '',
        client_secret: ''
    }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    const { status, data } = result;
    res.status(status).json(data);
}
