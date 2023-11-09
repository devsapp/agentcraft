"use strict";
(() => {
var exports = {};
exports.id = 9223;
exports.ids = [9223];
exports.modules = {

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 8680:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _types_dataset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1085);
/* harmony import */ var utils_serverRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3671);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([utils_serverRequest__WEBPACK_IMPORTED_MODULE_1__]);
utils_serverRequest__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


async function handler(req, res) {
    const dataSetType = req.query.dataSetType;
    const id = req.query.dataSourceId;
    const payload = req.body;
    let result = {};
    utils_serverRequest__WEBPACK_IMPORTED_MODULE_1__/* ["default"].defaults.headers.common.Authorization */ .Z.defaults.headers.common.Authorization = req.headers.authorization;
    if (dataSetType == _types_dataset__WEBPACK_IMPORTED_MODULE_0__/* .DataSetType.QUESTION */ .I.QUESTION) {
        result = await utils_serverRequest__WEBPACK_IMPORTED_MODULE_1__/* ["default"].put */ .Z.put(`/question/${id}`, payload);
    } else {
        result = await utils_serverRequest__WEBPACK_IMPORTED_MODULE_1__/* ["default"].put */ .Z.put(`/document/${id}`, payload);
    }
    res.status(result.status).json(result.data);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1085:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ DataSetType)
/* harmony export */ });
var DataSetType;
(function(DataSetType) {
    DataSetType[DataSetType["QUESTION"] = 1] = "QUESTION";
    DataSetType[DataSetType["DOCUMENT"] = 2] = "DOCUMENT";
})(DataSetType || (DataSetType = {}));


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
var __webpack_exports__ = (__webpack_exec__(8680));
module.exports = __webpack_exports__;

})();