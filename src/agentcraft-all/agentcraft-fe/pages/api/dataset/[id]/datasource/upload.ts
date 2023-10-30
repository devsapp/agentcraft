import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import multer from 'multer';
import { extname } from 'path';
import * as pdfjsLib from 'pdfjs-dist';
import { Document } from "langchain/document";
import { CharacterTextSplitter, RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import request from 'utils/serverRequest';

interface NextApiRequestWithFormData extends NextApiRequest {
    file: any;
}
interface DocProperty {
    title: string,
    chunk_size: string,
    url: string
}
interface FileProperty {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    buffer: Buffer
}
interface RequestDocumentData {
    title: string;
    url: string;
    tag: number;
    ext: string;
    content: string;
    chunk_size: number;
}
export const config = {
    api: {
        bodyParser: false,
    }
}

function getFileExtension(filename: string): string {
    return extname(filename);
}
// 配置 multer 以使用内存存储
const upload: any = multer({ storage: multer.memoryStorage() });

const router = createRouter<NextApiRequestWithFormData, NextApiResponse>();

router.use(upload.single('file'));

router.post(async (req: any, res: any) => {
    const id = req.query.id;
    const file: FileProperty = req.file;
    const bodyData: DocProperty = req.body;
    const extName = getFileExtension(file.originalname);
    const chunkSize = parseInt(bodyData.chunk_size)
    request.defaults.headers.common['Authorization'] = req.headers.authorization;
    let output: any = [];
    if (extName === '.txt') {
        const splitter = new CharacterTextSplitter({
            chunkSize,
            chunkOverlap: 100
        });
        output = await splitter.createDocuments([file.buffer.toString()]);
    }
    if (extName === '.md') {
        const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
            chunkSize,
            chunkOverlap: 100
        });
        output = await splitter.createDocuments([file.buffer.toString()]);
    }
    if (extName === '.html') {
        const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
            chunkSize,
            chunkOverlap: 100
        });
        output = await splitter.createDocuments([file.buffer.toString()]);
    }
    if (extName === '.pdf') {
        const loadingTask = pdfjsLib.getDocument(new Uint8Array(file.buffer));
        const pdf = await loadingTask.promise;
        let totalContent = '';
        const totalPages = pdf._pdfInfo.numPages;
        for (let i = 1; i <= totalPages; i++) {
            const page = await pdf.getPage(i);
            const pageContent: any = await page.getTextContent();
            totalContent += pageContent.items.map((item: any) => item.str).join('');
        }
        const splitter = new CharacterTextSplitter({
            chunkSize,
            chunkOverlap: 0,
            keepSeparator: false,
            separator: ""
        });
        output = await splitter.createDocuments([totalContent.trim()]);


    }
    for (const splitData of output) {
        const data = splitData.pageContent;
        const documentData: RequestDocumentData = {
            title: bodyData.title,
            url: bodyData.url,
            tag: id,
            ext: extName.replace('\.', ''),
            content: data,
            chunk_size: chunkSize
        }
        await request.post('/document/add', documentData);

    }

    res.json({ status: 'success' });
});

export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
    },
});

