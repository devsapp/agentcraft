import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';
import jwt from 'jsonwebtoken';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { shareToken } = req.query;
  if (shareToken) {
    const decoded: any = jwt.verify(shareToken as string, process.env.JWT_SECRET! || 'agentcraft');
    const { sub } = decoded;  // at 为agentId sub 为临时授权登录token
    try {
      request.defaults.headers.common['Authorization'] = `Bearer ${sub}`;
      delete req.query.shareToken;
      const result = await request.get(`/agent_session/detail_by_keyword`, { params: req.query });
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(500).json({ message: '授权获取失败，请重新生成token' });
    }
  } else {
    request.defaults.headers.common['Authorization'] = getTokenFromRequest(req);
    const result = await request.get(`/agent_session/detail_by_keyword`, { params: req.query });
    res.status(result.status).json(result.data);
  }
  
}
