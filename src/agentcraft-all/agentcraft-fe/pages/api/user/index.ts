import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';
import {  HTTP_STATUS } from 'types/httpStatus';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = getTokenFromRequest(req);
    if(!token) {
        res.status(200).json({ code: HTTP_STATUS.UNAUTHORIZED});
        return;
    }
    request.defaults.headers.common['Authorization'] = token;
    const result = await request.get('/auth/info');
    const { status, data } = result;
    res.status(status).json(data);
}
