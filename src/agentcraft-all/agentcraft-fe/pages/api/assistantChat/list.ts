import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, page = 0, limit = 200 } = req.query;
  const token = getTokenFromRequest(req);
  request.defaults.headers.common['Authorization'] = token;
  const result = await request.get(`/v2/chat/list/${id}`, { params: { page, limit } });
  res.status(result.status).json(result.data)
}
