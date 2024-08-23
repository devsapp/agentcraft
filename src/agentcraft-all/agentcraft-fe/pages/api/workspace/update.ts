import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  request.defaults.headers.common['Authorization'] = getTokenFromRequest(req);
  const result = await request.put(`/app/${req.query.id}`, req.body);
  const { status, data } = result;
  res.status(status).json(data);
}
