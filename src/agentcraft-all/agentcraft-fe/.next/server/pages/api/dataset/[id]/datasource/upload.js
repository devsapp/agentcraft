"use strict";
(() => {
var exports = {};
exports.id = 7671;
exports.ids = [7671];
exports.modules = {

/***/ 1738:
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ 7284:
/***/ ((module) => {

module.exports = require("pdfjs-dist");

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 9170:
/***/ ((module) => {

module.exports = import("langchain/text_splitter");;

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 1363:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1738);
/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(multer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var pdfjs_dist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7284);
/* harmony import */ var pdfjs_dist__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(pdfjs_dist__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var langchain_text_splitter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9170);
/* harmony import */ var utils_serverRequest__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3671);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__, langchain_text_splitter__WEBPACK_IMPORTED_MODULE_4__, utils_serverRequest__WEBPACK_IMPORTED_MODULE_5__]);
([next_connect__WEBPACK_IMPORTED_MODULE_0__, langchain_text_splitter__WEBPACK_IMPORTED_MODULE_4__, utils_serverRequest__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const config = {
    api: {
        bodyParser: false
    }
};
function getFileExtension(filename) {
    return (0,path__WEBPACK_IMPORTED_MODULE_2__.extname)(filename);
}
// 配置 multer 以使用内存存储
const upload = multer__WEBPACK_IMPORTED_MODULE_1___default()({
    storage: multer__WEBPACK_IMPORTED_MODULE_1___default().memoryStorage()
});
const router = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__.createRouter)();
router.use(upload.single("file"));
router.post(async (req, res)=>{
    const id = req.query.id;
    const file = req.file;
    const bodyData = req.body;
    const extName = getFileExtension(file.originalname);
    const chunkSize = parseInt(bodyData.chunk_size);
    utils_serverRequest__WEBPACK_IMPORTED_MODULE_5__/* ["default"].defaults.headers.common.Authorization */ .Z.defaults.headers.common.Authorization = req.headers.authorization;
    let output = [];
    if (extName === ".txt") {
        const splitter = new langchain_text_splitter__WEBPACK_IMPORTED_MODULE_4__.CharacterTextSplitter({
            chunkSize,
            chunkOverlap: 100
        });
        output = await splitter.createDocuments([
            file.buffer.toString()
        ]);
    }
    if (extName === ".md") {
        const splitter = langchain_text_splitter__WEBPACK_IMPORTED_MODULE_4__.RecursiveCharacterTextSplitter.fromLanguage("markdown", {
            chunkSize,
            chunkOverlap: 100
        });
        output = await splitter.createDocuments([
            file.buffer.toString()
        ]);
    }
    if (extName === ".html") {
        const splitter = langchain_text_splitter__WEBPACK_IMPORTED_MODULE_4__.RecursiveCharacterTextSplitter.fromLanguage("html", {
            chunkSize,
            chunkOverlap: 100
        });
        output = await splitter.createDocuments([
            file.buffer.toString()
        ]);
    }
    if (extName === ".pdf") {
        const loadingTask = pdfjs_dist__WEBPACK_IMPORTED_MODULE_3__.getDocument(new Uint8Array(file.buffer));
        const pdf = await loadingTask.promise;
        let totalContent = "";
        const totalPages = pdf._pdfInfo.numPages;
        for(let i = 1; i <= totalPages; i++){
            const page = await pdf.getPage(i);
            const pageContent = await page.getTextContent();
            totalContent += pageContent.items.map((item)=>item.str).join("");
        }
        const splitter = new langchain_text_splitter__WEBPACK_IMPORTED_MODULE_4__.CharacterTextSplitter({
            chunkSize,
            chunkOverlap: 0,
            keepSeparator: false,
            separator: ""
        });
        output = await splitter.createDocuments([
            totalContent.trim()
        ]);
    }
    for (const splitData of output){
        const data = splitData.pageContent;
        const documentData = {
            title: bodyData.title,
            url: bodyData.url,
            tag: id,
            ext: extName.replace(".", ""),
            content: data,
            chunk_size: chunkSize
        };
        await utils_serverRequest__WEBPACK_IMPORTED_MODULE_5__/* ["default"].post */ .Z.post("/document/add", documentData);
    }
    res.json({
        status: "success"
    });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router.handler({
    onError: (err, req, res)=>{
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
    }
}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3671:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const request = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
    baseURL: process.env.baseUrl || "",
    headers: {
        // 'Authorization': `Bearer ${process.env.token || ''}`,
        "Content-Type": "application/json"
    }
});
// 响应拦截器, 处理服务端的异常
request.interceptors.response.use((response)=>{
    return Promise.resolve(response);
}, (error)=>{
    if (error.response.status) {
        const { status , data  } = error.response;
        return Promise.resolve({
            status,
            data: {
                code: status,
                message: data.detail
            }
        });
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1363));
module.exports = __webpack_exports__;

})();