import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = getTokenFromRequest(req);
  request.defaults.headers.common['Authorization'] = token;
  const params = {
    ...req.query,
    assistant_id: Number(req.query.assistant_id), 
    page: Number(req.query.page),
    limit: Number(req.query.limit),
  }
  const result = await request.get('/assistant/history', { params });
  res.status(result.status).json(result.data)
}
