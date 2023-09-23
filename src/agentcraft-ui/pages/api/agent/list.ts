import type { NextApiRequest, NextApiResponse } from 'next'
import request from '@/util/request';
type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { page = 0, limit = 20, appId } = req.query;
    const result = await request.get(`/agent/list/${appId}`, { params: { page, limit } });
    res.status(200).json(result.data.data)
}
