import { Readable } from "stream";
import { NextApiRequest, NextApiResponse } from "next";

import { ChatOptions } from '@/types/chat';

const baseUrl = process.env.baseUrl;
export default async function (req: NextApiRequest, res: NextApiResponse) {

    const data: ChatOptions & { token: string } = req.body;
    const { token, ...payload } = data;
    const { messages, config } = payload;
    const { ...chatData } = config;
    const response = await fetch(`${baseUrl}/v1/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(Object.assign({}, chatData, { messages })),
    });

    // @ts-ignore
    const reader = response.body.getReader();
    const readableStream = new Readable({
        read(_size) { },
    });

    // 获取原始响应的 content-type 并设置到你的响应中
    const contentType = response.headers.get('content-type');
    if (contentType) {
        res.setHeader('Content-Type', contentType);
    }

    readableStream.pipe(res);
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            readableStream.push(null);
            break;
        }
        readableStream.push(value);
    }
}
