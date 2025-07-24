import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import multer from 'multer';
import { extname } from 'path';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import JSZip from 'jszip';
import { parseString } from 'xml2js';
import { promisify } from 'util';

const parseXMLString = promisify(parseString);
import XLSX from 'xlsx';
import { CharacterTextSplitter, RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import request from 'utils/serverRequest';
import { getTokenFromRequest } from 'utils/token';
import { PDFDocument } from 'pdf-lib';
// import pdfParse from 'pdf-parse';
import { fromBuffer } from 'pdf2pic';
import { OpenAI } from 'openai';
import { createCanvas } from 'canvas';
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
    url: string,
    contentTags?: string
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
async function processPptxBuffer(pptxBuffer: Buffer, chunkSize: number) {
    try {
        const zip = new JSZip();
        // @ts-ignore
        const zipContent = await zip.loadAsync(pptxBuffer);
        let totalContent = '';

        // 获取所有幻灯片文件
        const slideFiles = Object.keys(zipContent.files)
            .filter(filename => filename.match(/ppt\/slides\/slide[0-9]+\.xml/))
            .sort();

        // 创建图片文件映射
        const mediaFiles = Object.keys(zipContent.files)
            .filter(filename => filename.startsWith('ppt/media/'))
            .reduce(async (acc, filename) => {
                const mapping = await acc;
                const file = zipContent.files[filename];
                if (file) {
                    const buffer = await file.async('nodebuffer');
                    mapping[filename] = buffer;
                }
                return mapping;
            }, Promise.resolve({} as { [key: string]: Buffer }));

        // 处理幻灯片
        for (let i = 0; i < slideFiles.length; i++) {
            totalContent += await processSlide(
                zipContent,
                slideFiles[i],
                i + 1,
                await mediaFiles
            );
        }

        // 处理主题（如果存在）
        totalContent += await processThemes(zipContent);

        // 清理文本内容
        totalContent = cleanContent(totalContent);

        // 分割文本
        const splitter = new CharacterTextSplitter({
            chunkSize,
            chunkOverlap: 100,
            keepSeparator: false,
            separator: ""
        });
        return await splitter.createDocuments([totalContent]);

    } catch (error) {
        console.error('Error processing PPTX:', error);
        throw new Error('Failed to process PPTX file');
    }
}

async function processSlide(
    zipContent: JSZip,
    slideFile: string,
    slideNumber: number,
    mediaFiles: { [key: string]: Buffer }
) {
    let slideContent = `Slide ${slideNumber}:\n`;
    const slideXml = await zipContent.file(slideFile)?.async('text');
    if (!slideXml) return slideContent;

    const result: any = await parseXMLString(slideXml);
    if (!result['p:sld']?.['p:cSld']) return slideContent;

    const slide = result['p:sld']['p:cSld'][0];
    const spTree = slide['p:spTree'][0];

    // 处理形状（包含文本）
    if (spTree['p:sp']) {
        slideContent += await processShapes(spTree['p:sp']);
    }

    // 处理表格
    if (spTree['p:graphicFrame']) {
        slideContent += await processTables(spTree['p:graphicFrame']);
    }

    // 处理图片
    if (spTree['p:pic']) {
        slideContent += await processPictures(spTree['p:pic'], mediaFiles);
    }

    // 处理备注
    slideContent += await processNotes(zipContent, slideNumber);

    return slideContent + '\n---\n';
}

async function processShapes(shapes: any[]) {
    let content = '';
    for (const shape of shapes) {
        if (shape['p:txBody']) {
            const textElements = shape['p:txBody'][0]['a:p'] || [];
            for (const textElement of textElements) {
                // 处理文本运行
                if (textElement['a:r']) {
                    for (const run of textElement['a:r']) {
                        if (run['a:t']) {
                            content += run['a:t'][0] + ' ';
                        }
                    }
                }
                // 处理字段
                if (textElement['a:fld']) {
                    for (const field of textElement['a:fld']) {
                        if (field['a:t']) {
                            content += field['a:t'][0] + ' ';
                        }
                    }
                }
            }
            content += '\n';
        }
    }
    return content;
}

async function processTables(graphicFrames: any[]) {
    let content = '';
    for (const frame of graphicFrames) {
        const graphic = frame['a:graphic']?.[0];
        const graphicData = graphic?.['a:graphicData']?.[0];
        const table = graphicData?.['a:tbl']?.[0];

        if (table) {
            content += 'Table Content:\n';
            const rows = table['a:tr'] || [];
            for (const row of rows) {
                const cells = row['a:tc'] || [];
                for (const cell of cells) {
                    if (cell['a:txBody']) {
                        const text = cell['a:txBody'][0]['a:p'][0]['a:r'][0]['a:t'][0];
                        content += text + '\t';
                    }
                }
                content += '\n';
            }
        }
    }
    return content;
}

async function processPictures(pictures: any[], mediaFiles: { [key: string]: Buffer }) {
    let content = '';
    for (const pic of pictures) {
        try {
            const blipFill = pic['p:blipFill']?.[0];
            const blip = blipFill?.['a:blip']?.[0];
            if (blip?.$?.['r:embed']) {
                const relationshipId = blip.$['r:embed'];
                const mediaPath = `ppt/media/image${relationshipId}.png`; // 可能需要调整路径格式
                const imageBuffer = mediaFiles[mediaPath];
                if (imageBuffer) {
                    const base64Image = imageBuffer.toString('base64');
                    const imageDescription = await read(base64Image);
                    content += `Image Description: ${imageDescription}\n`;
                }
            }
        } catch (error) {
            console.error('Error processing picture:', error);
        }
    }
    return content;
}

async function processNotes(zipContent: JSZip, slideNumber: number) {
    let content = '';
    try {
        const notesFile = `ppt/notesSlides/notesSlide${slideNumber}.xml`;
        const notesXml = await zipContent.file(notesFile)?.async('text');
        if (notesXml) {
            const notesResult: any = await parseXMLString(notesXml);
            if (notesResult?.['p:notes']) {
                content += 'Notes:\n';
                const noteShapes = notesResult['p:notes']['p:cSld'][0]['p:spTree'][0]['p:sp'] || [];
                for (const shape of noteShapes) {
                    if (shape['p:txBody']) {
                        const textElements = shape['p:txBody'][0]['a:p'] || [];
                        for (const textElement of textElements) {
                            const runs = textElement['a:r'] || [];
                            for (const run of runs) {
                                if (run['a:t']) {
                                    content += run['a:t'][0] + ' ';
                                }
                            }
                        }
                        content += '\n';
                    }
                }
            }
        }
    } catch (error) {
        console.log('No notes found for slide', slideNumber);
    }
    return content;
}

async function processThemes(zipContent: JSZip) {
    let content = '';
    try {
        const themeFiles = Object.keys(zipContent.files)
            .filter(filename => filename.match(/ppt\/theme\/theme[0-9]+\.xml/));

        for (const themeFile of themeFiles) {
            const themeXml = await zipContent.file(themeFile)?.async('text');
            if (themeXml) {
                const themeResult: any = await parseXMLString(themeXml);
                if (themeResult?.['a:theme']?.['a:themeElements']) {
                    content += 'Theme Elements:\n';
                    // 这里可以添加更多主题相关的提取逻辑
                }
            }
        }
    } catch (error) {
        console.log('Error reading theme files:', error);
    }
    return content;
}

function cleanContent(content: string): string {
    return content
        .replace(/\s+/g, ' ')
        .replace(/[\r\n]+/g, '\n')
        .trim();
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
    const contentTags = bodyData.contentTags;
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
            chunkOverlap: 100,
            keepSeparator: false,
            separators: [""]
        });
        output = await splitter.createDocuments([file.buffer.toString()]);
    }

    if (extName === '.md') {
        const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
            chunkSize,
            chunkOverlap: 100,
            keepSeparator: false,
            separators: [""]
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
            convertImage: mammoth.images.imgElement(async function (image) {
                return image.read("base64").then(async function (imageBuffer) {
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
        output = await processPptxBuffer(file.buffer, chunkSize);
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
        let data = splitData.pageContent;
        if(contentTags) { // 注入同类标签
            data = contentTags + data;
        }
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
        // @ts-ignore
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        const pageCount = pdfDoc.getPageCount();
        const options = {
            density: 100,
            saveFilename: "untitled",
            savePath: "./images",
            format: "png",
            width: 600,
            height: 600
        };

        for (let i = 0; i < pageCount; i++) {
            const pageNumber = i + 1;
            console.log(`正在转换第 ${pageNumber} 页为 base64 图片...`);
            // const { base64 } = await convertPageToBase64(pdfBuffer, pageNumber, options);
            const base64 = await renderPdfPageToBase64(pdfBuffer, pageNumber)
            if (base64) {
                const textData = await read(base64 as string);
                totalContent += (textData + separator);
            }

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
        model: "qwen-vl-ocr",
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

async function renderPdfPageToBase64(pdfBuffer: Buffer, pageNumber: number): Promise<string> {
    const loadingTask = pdfjsLib.getDocument(new Uint8Array(pdfBuffer));
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(pageNumber);

    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');

    await page.render({
        // @ts-ignore
        canvasContext: context,
        viewport: viewport,
    }).promise;
    const dataUrl = canvas.toDataURL('image/png');
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    return base64Data// 返回 base64 格式的 PNG 图片
}

async function convertPageToBase64(pdfBuffer: Buffer, pageNumber: number, options: any) {
    const convert = fromBuffer(pdfBuffer, options);
    convert.setGMClass(true);
    const response = await convert(pageNumber, { responseType: "base64" });
    return response;
}

export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
    },
});