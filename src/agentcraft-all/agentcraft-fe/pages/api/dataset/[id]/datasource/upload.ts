import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import multer from 'multer';
import { extname } from 'path';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
//@ts-ignore
import officegen from 'officegen';
import XLSX from 'xlsx';
import { CharacterTextSplitter, RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';
import { PDFDocument } from 'pdf-lib';
// import pdfParse from 'pdf-parse';
import { fromBuffer } from 'pdf2pic';
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.DASHSCOPE_API_KEY,
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
});

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
    const chunkSize = parseInt(bodyData.chunk_size);
    const token = getTokenFromRequest(req);
    request.defaults.headers.common['Authorization'] = token;
    let output: any = [];

    if (extName === '.txt') {
        const splitter = new CharacterTextSplitter({
            chunkSize,
            chunkOverlap: 100,
            keepSeparator: false,
            separator: ""
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

    if (extName === '.md') {
        const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
            chunkSize,
            chunkOverlap: 100
        });
        output = await splitter.createDocuments([file.buffer.toString()]);
    }

    if (extName === '.pdf') {
        output = await processPdfBuffer(file.buffer, chunkSize);
    }

    if (['.jpg', '.jpeg', '.png'].includes(extName)) {
        output = await processImageBuffer(file.buffer, chunkSize);
    }

    if (extName === '.docx') {
        const options = {
            convertImage: mammoth.images.imgElement(async function(image) {
                return image.read("base64").then(async function(imageBuffer) {
                    const textData = await read(imageBuffer);
                    return {
                        src: "data:" + textData
                    };
                });
            })
        };
        const result = await mammoth.convertToHtml({ buffer: file.buffer }, options);
        const markdownContent = result.value;
   

        // Process images using OpenAI model
        let totalContent = markdownContent;
        

        const splitter = new CharacterTextSplitter({
            chunkSize,
            chunkOverlap: 100,
            keepSeparator: false,
            separator: ""
        });
        output = await splitter.createDocuments([totalContent]);
    }


    if (extName === '.pptx') {
        const pptx = officegen('pptx');
        pptx.load(file.buffer);
        let totalContent = '';
        pptx.on('finalize', function (written: any) {
            console.log('PPTX created with ' + written + ' bytes');
        });
        pptx.on('error', function (err: any) {
            console.error(err);
        });
        // 遍历幻灯片并提取文本
        pptx.getSlides().forEach((slide: any) => {
            slide.getTextObjects().forEach((textObject: any) => {
                totalContent += textObject.text + '\n';
            });
        });

        const splitter = new CharacterTextSplitter({
            chunkSize,
            chunkOverlap: 100,
            keepSeparator: false,
            separator: ""
        });
        output = await splitter.createDocuments([totalContent]);
    }

    if (extName === '.xlsx') {
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        let totalContent = '';
        workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            json.forEach((row: any) => {
                totalContent += row.join(', ') + '\n';
            });
        });

        const splitter = new CharacterTextSplitter({
            chunkSize,
            chunkOverlap: 100,
            keepSeparator: false,
            separator: ""
        });
        output = await splitter.createDocuments([totalContent]);
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

async function processPdfBuffer(pdfBuffer: Buffer, chunkSize: number) {
    const loadingTask = pdfjsLib.getDocument(new Uint8Array(pdfBuffer));
    let separator = ""
    const pdf = await loadingTask.promise;
    let totalContent = '';
    const totalPages = pdf._pdfInfo.numPages;

    for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const pageContent: any = await page.getTextContent();
        totalContent += pageContent.items.map((item: any) => item.str).join('');
    }

    if (!totalContent.trim()) {
        separator = "**_**";
        console.log("PDF 文本内容为空，开始读取 PDF 页数和每页尺寸...");
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        const pageCount = pdfDoc.getPageCount();
        const options = {
            density: 100,
            saveFilename: "page",
            savePath: "./images",
            format: "png",
            width: 600,
            height: 600
        };

        for (let i = 0; i < pageCount; i++) {
            const pageNumber = i + 1;
            console.log(`正在转换第 ${pageNumber} 页为 base64 图片...`);
            const { base64 } = await convertPageToBase64(pdfBuffer, pageNumber, options);
            const textData = await read(base64 as string);
            totalContent += (textData + separator);
        }
    }

    const splitter = new CharacterTextSplitter({
        chunkSize,
        chunkOverlap: 300,
        keepSeparator: false,
        separator
    });

    return await splitter.createDocuments([totalContent.trim()]);
}

async function processImageBuffer(imageBuffer: Buffer, chunkSize: number) {
    const base64Image = imageBuffer.toString('base64');
    const textData = await read(base64Image);
    const splitter = new CharacterTextSplitter({
        chunkSize,
        chunkOverlap: 100,
        keepSeparator: false,
        separator: ""
    });
    return await splitter.createDocuments([textData as string]);
}
async function read(base64Image: string) {
    const completion = await openai.chat.completions.create({
        model: "qwen-vl-max-latest",
        messages: [
            {
                "role": "system",
                "content": [{ "type": "text", "text": "You are a helpful assistant." }]
            },
            {
                "role": "user",
                "content": [{
                    "type": "image_url",
                    "image_url": { "url": `data:image/png;base64,${base64Image}` },
                },
                { "type": "text", "text": "图中描绘的是什么?" }]
            }]
    });
    return completion.choices[0].message.content;
}

function convertPageToBase64(pdfBuffer: Buffer, pageNumber: number, options: any) {
    const convert = fromBuffer(pdfBuffer, options);
    return convert(pageNumber, { responseType: "base64" })
        .then((resolve) => {
            return resolve;
        });
}

export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
    },
});