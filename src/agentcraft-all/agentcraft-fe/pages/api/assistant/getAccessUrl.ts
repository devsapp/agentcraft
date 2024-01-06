import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    
    const openApiUrl = `http://${process.env.openApiUrl}`; // 外部网络访问的url
    const innerApiUrl = process.env.baseUrl; // 内网可访问的url
 
    res.status(200).json({
        success: true,
        data: {
            openApiUrl,
            innerApiUrl
        }
    })
}
