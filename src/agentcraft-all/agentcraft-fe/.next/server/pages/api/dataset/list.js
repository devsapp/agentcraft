"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/dataset/list";
exports.ids = ["pages/api/dataset/list"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ "(api)/./pages/api/dataset/list.ts":
/*!***********************************!*\
  !*** ./pages/api/dataset/list.ts ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var utils_serverRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/serverRequest */ \"(api)/./utils/serverRequest.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([utils_serverRequest__WEBPACK_IMPORTED_MODULE_0__]);\nutils_serverRequest__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nasync function handler(req, res) {\n    const { page =0 , limit =20 , dataset_type  } = req.query;\n    utils_serverRequest__WEBPACK_IMPORTED_MODULE_0__[\"default\"].defaults.headers.common.Authorization = req.headers.authorization;\n    const result = await utils_serverRequest__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"/dataset/list\", {\n        params: {\n            page,\n            limit,\n            dataset_type\n        }\n    });\n    const { status , data  } = result;\n    res.status(status).json(data);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZGF0YXNldC9saXN0LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQzBDO0FBRzNCLGVBQWVDLFFBQzFCQyxHQUFtQixFQUNuQkMsR0FBb0IsRUFDdEI7SUFFRSxNQUFNLEVBQUVDLE1BQU8sRUFBQyxFQUFFQyxPQUFRLEdBQUUsRUFBRUMsYUFBWSxFQUFFLEdBQUdKLElBQUlLLEtBQUs7SUFDeERQLGlHQUFnRCxHQUFHRSxJQUFJTyxPQUFPLENBQUNFLGFBQWE7SUFDNUUsTUFBTUMsU0FBUyxNQUFNWiwrREFBVyxDQUFDLGlCQUFpQjtRQUFFYyxRQUFRO1lBQUVWO1lBQU1DO1lBQU9DO1FBQWE7SUFBRTtJQUUxRixNQUFNLEVBQUVTLE9BQU0sRUFBRUMsS0FBSSxFQUFFLEdBQUdKO0lBQ3pCVCxJQUFJWSxNQUFNLENBQUNBLFFBQVFFLElBQUksQ0FBQ0Q7QUFDNUIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FnZW50Y3JhZnQtdWkvLi9wYWdlcy9hcGkvZGF0YXNldC9saXN0LnRzP2FlYjEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCdcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3NlcnZlclJlcXVlc3QnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoXG4gICAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcbiAgICByZXM6IE5leHRBcGlSZXNwb25zZVxuKSB7XG5cbiAgICBjb25zdCB7IHBhZ2UgPSAwLCBsaW1pdCA9IDIwLCBkYXRhc2V0X3R5cGUgfSA9IHJlcS5xdWVyeTtcbiAgICByZXF1ZXN0LmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydBdXRob3JpemF0aW9uJ10gPSByZXEuaGVhZGVycy5hdXRob3JpemF0aW9uO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcXVlc3QuZ2V0KCcvZGF0YXNldC9saXN0JywgeyBwYXJhbXM6IHsgcGFnZSwgbGltaXQsIGRhdGFzZXRfdHlwZSB9IH0pO1xuXG4gICAgY29uc3QgeyBzdGF0dXMsIGRhdGEgfSA9IHJlc3VsdDtcbiAgICByZXMuc3RhdHVzKHN0YXR1cykuanNvbihkYXRhKTtcbn1cbiJdLCJuYW1lcyI6WyJyZXF1ZXN0IiwiaGFuZGxlciIsInJlcSIsInJlcyIsInBhZ2UiLCJsaW1pdCIsImRhdGFzZXRfdHlwZSIsInF1ZXJ5IiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiY29tbW9uIiwiYXV0aG9yaXphdGlvbiIsInJlc3VsdCIsImdldCIsInBhcmFtcyIsInN0YXR1cyIsImRhdGEiLCJqc29uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/dataset/list.ts\n");

/***/ }),

/***/ "(api)/./utils/serverRequest.ts":
/*!********************************!*\
  !*** ./utils/serverRequest.ts ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst request = axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create({\n    baseURL: process.env.baseUrl || \"\",\n    headers: {\n        // 'Authorization': `Bearer ${process.env.token || ''}`,\n        \"Content-Type\": \"application/json\"\n    }\n});\n// 响应拦截器, 处理服务端的异常\nrequest.interceptors.response.use((response)=>{\n    return Promise.resolve(response);\n}, (error)=>{\n    if (error.response.status) {\n        const { status , data  } = error.response;\n        return Promise.resolve({\n            status,\n            data: {\n                code: status,\n                message: data.detail\n            }\n        });\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9zZXJ2ZXJSZXF1ZXN0LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQTBCO0FBRTFCLE1BQU1DLFVBQVVELG9EQUFZLENBQUM7SUFDekJHLFNBQVNDLFFBQVFDLEdBQUcsQ0FBQ0MsT0FBTyxJQUFJO0lBQ2hDQyxTQUFTO1FBQ0wsd0RBQXdEO1FBQ3hELGdCQUFnQjtJQUNwQjtBQUNKO0FBQ0Esa0JBQWtCO0FBQ2xCTixRQUFRTyxZQUFZLENBQUNDLFFBQVEsQ0FBQ0MsR0FBRyxDQUM3QkQsQ0FBQUEsV0FBWTtJQUNSLE9BQU9FLFFBQVFDLE9BQU8sQ0FBQ0g7QUFDM0IsR0FDQUksQ0FBQUEsUUFBUztJQUNMLElBQUlBLE1BQU1KLFFBQVEsQ0FBQ0ssTUFBTSxFQUFFO1FBQ3ZCLE1BQU0sRUFBRUEsT0FBTSxFQUFFQyxLQUFJLEVBQUUsR0FBR0YsTUFBTUosUUFBUTtRQUN2QyxPQUFPRSxRQUFRQyxPQUFPLENBQUM7WUFBRUU7WUFBUUMsTUFBTTtnQkFBRUMsTUFBTUY7Z0JBQVFHLFNBQVNGLEtBQUtHLE1BQU07WUFBQztRQUFFO0lBQ2xGLENBQUM7QUFDTDtBQUVKLGlFQUFlakIsT0FBT0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FnZW50Y3JhZnQtdWkvLi91dGlscy9zZXJ2ZXJSZXF1ZXN0LnRzPzVjMmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuY29uc3QgcmVxdWVzdCA9IGF4aW9zLmNyZWF0ZSh7XG4gICAgYmFzZVVSTDogcHJvY2Vzcy5lbnYuYmFzZVVybCB8fCAnJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIC8vICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3Byb2Nlc3MuZW52LnRva2VuIHx8ICcnfWAsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICB9XG59KTtcbi8vIOWTjeW6lOaLpuaIquWZqCwg5aSE55CG5pyN5Yqh56uv55qE5byC5bi4XG5yZXF1ZXN0LmludGVyY2VwdG9ycy5yZXNwb25zZS51c2UoXG4gICAgcmVzcG9uc2UgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9LFxuICAgIGVycm9yID0+IHtcbiAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlLnN0YXR1cykge1xuICAgICAgICAgICAgY29uc3QgeyBzdGF0dXMsIGRhdGEgfSA9IGVycm9yLnJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHN0YXR1cywgZGF0YTogeyBjb2RlOiBzdGF0dXMsIG1lc3NhZ2U6IGRhdGEuZGV0YWlsIH0gfSk7XG4gICAgICAgIH1cbiAgICB9XG4pO1xuZXhwb3J0IGRlZmF1bHQgcmVxdWVzdDsiXSwibmFtZXMiOlsiYXhpb3MiLCJyZXF1ZXN0IiwiY3JlYXRlIiwiYmFzZVVSTCIsInByb2Nlc3MiLCJlbnYiLCJiYXNlVXJsIiwiaGVhZGVycyIsImludGVyY2VwdG9ycyIsInJlc3BvbnNlIiwidXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJlcnJvciIsInN0YXR1cyIsImRhdGEiLCJjb2RlIiwibWVzc2FnZSIsImRldGFpbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./utils/serverRequest.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/dataset/list.ts"));
module.exports = __webpack_exports__;

})();