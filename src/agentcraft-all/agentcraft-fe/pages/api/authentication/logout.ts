import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    res.setHeader('Set-Cookie', `token=; Path=/; HttpOnly;`);
    res.status(200).json({ success: true });
}
