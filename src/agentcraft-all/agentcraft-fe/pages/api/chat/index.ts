import { Readable } from "stream";
import { NextApiRequest, NextApiResponse } from "next";
import { ChatOptions } from 'types/chat';

const baseUrl = process.env.baseUrl;
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const data: ChatOptions & { token: string } = req.body;
    const { version = 'v1' } = req.query;
    const { token, ...payload } = data;
    const { messages, config } = payload;
    const { ...chatData } = config;
    const response: any = await fetch(`${baseUrl}/${version}/chat/completions`, {
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
    res.setHeader('Cache-Control', 'no-cache');
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



