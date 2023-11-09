"use strict";
(() => {
var exports = {};
exports.id = 3772;
exports.ids = [3772];
exports.modules = {

/***/ 4483:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ chat)
});

;// CONCATENATED MODULE: external "stream"
const external_stream_namespaceObject = require("stream");
;// CONCATENATED MODULE: ./pages/api/chat/index.ts

const baseUrl = process.env.baseUrl;
/* harmony default export */ async function chat(req, res) {
    const data = req.body;
    const { token , ...payload } = data;
    const { messages , config  } = payload;
    const { ...chatData } = config;
    const response = await fetch(`${baseUrl}/v1/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(Object.assign({}, chatData, {
            messages
        }))
    });
    // @ts-ignore
    const reader = response.body.getReader();
    const readableStream = new external_stream_namespaceObject.Readable({
        read (_size) {}
    });
    // 获取原始响应的 content-type 并设置到你的响应中
    const contentType = response.headers.get("content-type");
    if (contentType) {
        res.setHeader("Content-Type", contentType);
    }
    readableStream.pipe(res);
    while(true){
        const { done , value  } = await reader.read();
        if (done) {
            readableStream.push(null);
            break;
        }
        readableStream.push(value);
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4483));
module.exports = __webpack_exports__;

})();