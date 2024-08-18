import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  postUrl: string,
  token: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const postUrl = (process.env.postUrl || '') + '/chat' ;
  const token = process.env.token || '';
  res.status(200).json({ postUrl,token })
}
