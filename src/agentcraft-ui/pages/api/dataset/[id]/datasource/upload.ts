import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter} from 'next-connect';
import multer from 'multer';
const adapter = (middleware: any) => {
    return (req: any, res: any, next: any) =>
        middleware(req, res, (result: any) => {
            if (result instanceof Error) {
                return next(result)
            }
            return next()
        })
}

interface NextApiRequestWithFormData extends NextApiRequest {
    file: any;
}

// 配置 multer 以使用内存存储
const upload = multer({ storage: multer.memoryStorage() });

const router = createRouter<NextApiRequestWithFormData, NextApiResponse>();

router.use(adapter(upload.single('file')));

router.post((req: any, res: any) => {
    // 在这里，你可以访问 req.file，这是一个包含了文件信息的对象
    // 你可以在这里处理文件，例如转发到另一台服务器，或者进行一些处理
    // 注意，由于我们使用了内存存储，文件将在请求结束后被清除

    // 打印出文件信息
    console.log(req.file);
    console.log(req.body);
    // 返回一个响应
    res.json({ status: 'ok' });
});

export default router.handler({
    onError: (err:any, req, res) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
      },
});
