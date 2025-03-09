import { Readable } from "stream";
import { NextApiRequest, NextApiResponse } from "next";
import { ChatOptions } from 'types/chat';

const baseUrl = process.env.baseUrl;
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const controller = new AbortController();
    const handleAbort = () => {
        controller.abort();
    };
    req.on('close', handleAbort);
    req.on('aborted', handleAbort);
    res.on('close', () => {
        if (!res.writableEnded) handleAbort()
    });
    const data: ChatOptions & { token: string } = req.body;
    const { version = 'v1' } = req.query;
    const { token, ...payload } = data;
    const { messages, config } = payload;
    const { ...chatData } = config;
   
    try {
       
        const response: any = await fetch(`${baseUrl}/${version}/chat/completions`, {
            method: "POST",
            signal: controller.signal, // 透传信号
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,

            },
            body: JSON.stringify(Object.assign({}, chatData, { messages })),
        });
        if (!response.ok) {
            // 如果状态码不是200，抛出错误
            throw new Error(`Request failed with status ${response.status}`);
        }
        const reader = response.body.getReader();
        if (!reader) {
            throw new Error('No reader available');
        }
        const readableStream = new Readable({
            read(_size) { },
        });
        res.setHeader("Content-Type", "application/octet-stream")
        res.setHeader('Cache-Control', 'no-cache');
        readableStream.pipe(res);
        while (!controller.signal.aborted) {
            const { done, value } = await reader.read();
            if (done) {
                await readableStream.push(null);
                break;
            }
            await readableStream.push(value);
        }
    } catch (e: any) {
        if (e.name === 'AbortError') {
            console.log('前端取消请求');
        } else {
            res.status(500).json({ error: e.message });
        }
    } finally {
        req.off('close', handleAbort);
        req.off('aborted', handleAbort);
    }
}



