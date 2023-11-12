import { Readable } from "stream";
import { NextApiRequest, NextApiResponse } from "next";

import { ChatOptions } from '@/types/chat';

const baseUrl = process.env.baseUrl;
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const data: ChatOptions & { token: string } = req.body;
    const { token, ...payload } = data;
    const { messages, config } = payload;
    const { ...chatData } = config;
    const response: any = await fetch(`${baseUrl}/v1/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(Object.assign({}, chatData, { messages })),
    });


    const reader = response.body.getReader();
    const readableStream = new Readable({
        read(_size) { },
    });
    res.setHeader("Content-Type", "application/octet-stream")
    // res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');

    
    // 获取原始响应的 content-type 并设置到你的响应中
    // const contentType = response.headers.get('content-type');
    // if (contentType) {
    //     res.setHeader("Content-Type", "application/octet-stream")
    //     // res.setHeader('Content-Type', 'text/event-stream');
    //     res.setHeader('Cache-Control', 'no-cache');
    // }

    readableStream.pipe(res);
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            await readableStream.push(null);
            break;
        }
        await readableStream.push(value);
    }
}



