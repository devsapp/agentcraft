import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    
    const data: any = {
        code: 200,
    };
   
    res.status(200).json(data);
}
