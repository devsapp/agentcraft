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
  const token = process.env.token || 'a66e78e6dadf45e689d11de2621e458a';
  res.status(200).json({ postUrl,token })
}
