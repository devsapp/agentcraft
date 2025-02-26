import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';
import jwt from 'jsonwebtoken';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id, shareToken } = req.query;
    if (shareToken) {
        const decoded: any = jwt.verify(shareToken as string, process.env.JWT_SECRET! || 'agentcraft');
        const { sub, at } = decoded;  // at 为agentId sub 为临时授权登录token
        try {
            if (at === parseInt(id as string)) {
                request.defaults.headers.common['Authorization'] = `Bearer ${sub}`;
                const result = await request.get(`/agent/${id}`);
                const response_data  = result.data;
                const { name, token, max_tokens } = response_data.data;
                response_data.data = { name, token, max_tokens };
                res.status(result.status).json(response_data);
            }
        } catch (error) {
            res.status(500).json({ message: '授权获取失败，请重新生成token' });
        }
    } else {
        const token = getTokenFromRequest(req);
        request.defaults.headers.common['Authorization'] = token;
        const result = await request.get(`/agent/${id}`);
        res.status(result.status).json(result.data)
    }

}
