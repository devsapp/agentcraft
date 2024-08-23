import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  request.defaults.headers.common['Authorization'] = getTokenFromRequest(req);
  const result = await request.get(`/assistant_session/detail_by_keyword`, { params: req.query });
  res.status(result.status).json(result.data)
}
