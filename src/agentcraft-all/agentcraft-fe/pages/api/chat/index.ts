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
            throw new Error(`Request failed with status ${response.status}`);
        }

        const reader = response.body.getReader();
        if (!reader) {
            throw new Error('No reader available');
        }

        // 使用文本输出方案开始
        res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache, no-transform');
        while (!controller.signal.aborted) {
            const { done, value } = await reader.read();
            if (done) {
                res.end();
                break;
            }
            const text = new TextDecoder().decode(value);
            res.write(text);
        }
        // 使用文本输出方案结束
        


        // 使用二进制输出方案开始
        // res.setHeader("Content-Type", "application/octet-stream");
        // res.setHeader('Cache-Control', 'no-cache');
        // const readableStream = new Readable({
        //     read(_size) { },
        // });
        // readableStream.pipe(res);
        // while (!controller.signal.aborted) {
        //     const { done, value } = await reader.read();
        //     if (done) {
        //         await readableStream.push(null);
        //         break;
        //     }
        //     await readableStream.push(value);
        // }
        // 使用二进制输出方案结束
    } catch (e: any) {
        if (e.name === 'AbortError') {
            console.log('cancel from user');
        } else {
            res.status(500).json({ error: e.message });
        }
    } finally {
        req.off('close', handleAbort);
        req.off('aborted', handleAbort);
    }
}



