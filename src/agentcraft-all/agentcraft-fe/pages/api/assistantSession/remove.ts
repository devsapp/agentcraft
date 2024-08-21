import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  request.defaults.headers.common['Authorization'] = getTokenFromRequest(req);
  const result = await request.delete(`/assistant_session/${req.query.session_id}`);
  res.status(result.status).json(result.data)
}
