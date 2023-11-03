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
exports.id = "pages/api/user";
exports.ids = ["pages/api/user"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ "(api)/./pages/api/user/index.ts":
/*!*********************************!*\
  !*** ./pages/api/user/index.ts ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var utils_serverRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/serverRequest */ \"(api)/./utils/serverRequest.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([utils_serverRequest__WEBPACK_IMPORTED_MODULE_0__]);\nutils_serverRequest__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nasync function handler(req, res) {\n    utils_serverRequest__WEBPACK_IMPORTED_MODULE_0__[\"default\"].defaults.headers.common.Authorization = req.headers.authorization;\n    const result = await utils_serverRequest__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"/auth/info\");\n    const { status , data  } = result;\n    res.status(status).json(data);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvdXNlci9pbmRleC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUMwQztBQUczQixlQUFlQyxRQUMxQkMsR0FBbUIsRUFDbkJDLEdBQW9CLEVBQ3RCO0lBQ0VILGlHQUFnRCxHQUFHRSxJQUFJRyxPQUFPLENBQUNFLGFBQWE7SUFDNUUsTUFBTUMsU0FBUyxNQUFNUiwrREFBVyxDQUFDO0lBQ2pDLE1BQU0sRUFBRVUsT0FBTSxFQUFFQyxLQUFJLEVBQUUsR0FBR0g7SUFDekJMLElBQUlPLE1BQU0sQ0FBQ0EsUUFBUUUsSUFBSSxDQUFDRDtBQUM1QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWdlbnRjcmFmdC11aS8uL3BhZ2VzL2FwaS91c2VyL2luZGV4LnRzP2UxODIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCdcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3NlcnZlclJlcXVlc3QnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoXG4gICAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcbiAgICByZXM6IE5leHRBcGlSZXNwb25zZVxuKSB7XG4gICAgcmVxdWVzdC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddID0gcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbjtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXF1ZXN0LmdldCgnL2F1dGgvaW5mbycpO1xuICAgIGNvbnN0IHsgc3RhdHVzLCBkYXRhIH0gPSByZXN1bHQ7XG4gICAgcmVzLnN0YXR1cyhzdGF0dXMpLmpzb24oZGF0YSk7XG59XG4iXSwibmFtZXMiOlsicmVxdWVzdCIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJkZWZhdWx0cyIsImhlYWRlcnMiLCJjb21tb24iLCJhdXRob3JpemF0aW9uIiwicmVzdWx0IiwiZ2V0Iiwic3RhdHVzIiwiZGF0YSIsImpzb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/user/index.ts\n");

/***/ }),

/***/ "(api)/./utils/serverRequest.ts":
/*!********************************!*\
  !*** ./utils/serverRequest.ts ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst request = axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create({\n    baseURL: process.env.baseUrl || \"\",\n    headers: {\n        // 'Authorization': `Bearer ${process.env.token || ''}`,\n        \"Content-Type\": \"application/json\"\n    }\n});\n// 响应拦截器, 处理服务端的异常\nrequest.interceptors.response.use((response)=>{\n    console.log(response);\n    return Promise.resolve(response);\n}, (error)=>{\n    console.log(error);\n    if (error.response.status) {\n        const { status , data  } = error.response;\n        return Promise.resolve({\n            status,\n            data: {\n                code: status,\n                message: data.detail\n            }\n        });\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9zZXJ2ZXJSZXF1ZXN0LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQTBCO0FBRTFCLE1BQU1DLFVBQVVELG9EQUFZLENBQUM7SUFDekJHLFNBQVNDLFFBQVFDLEdBQUcsQ0FBQ0MsT0FBTyxJQUFJO0lBQ2hDQyxTQUFTO1FBQ0wsd0RBQXdEO1FBQ3hELGdCQUFnQjtJQUNwQjtBQUNKO0FBQ0Esa0JBQWtCO0FBQ2xCTixRQUFRTyxZQUFZLENBQUNDLFFBQVEsQ0FBQ0MsR0FBRyxDQUM3QkQsQ0FBQUEsV0FBWTtJQUNSRSxRQUFRQyxHQUFHLENBQUNIO0lBQ1osT0FBT0ksUUFBUUMsT0FBTyxDQUFDTDtBQUMzQixHQUNBTSxDQUFBQSxRQUFTO0lBQ0xKLFFBQVFDLEdBQUcsQ0FBQ0c7SUFDWixJQUFJQSxNQUFNTixRQUFRLENBQUNPLE1BQU0sRUFBRTtRQUN2QixNQUFNLEVBQUVBLE9BQU0sRUFBRUMsS0FBSSxFQUFFLEdBQUdGLE1BQU1OLFFBQVE7UUFDdkMsT0FBT0ksUUFBUUMsT0FBTyxDQUFDO1lBQUVFO1lBQVFDLE1BQU07Z0JBQUVDLE1BQU1GO2dCQUFRRyxTQUFTRixLQUFLRyxNQUFNO1lBQUM7UUFBRTtJQUNsRixDQUFDO0FBQ0w7QUFFSixpRUFBZW5CLE9BQU9BLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZ2VudGNyYWZ0LXVpLy4vdXRpbHMvc2VydmVyUmVxdWVzdC50cz81YzJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbmNvbnN0IHJlcXVlc3QgPSBheGlvcy5jcmVhdGUoe1xuICAgIGJhc2VVUkw6IHByb2Nlc3MuZW52LmJhc2VVcmwgfHwgJycsXG4gICAgaGVhZGVyczoge1xuICAgICAgICAvLyAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtwcm9jZXNzLmVudi50b2tlbiB8fCAnJ31gLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgfVxufSk7XG4vLyDlk43lupTmi6bmiKrlmagsIOWkhOeQhuacjeWKoeerr+eahOW8guW4uFxucmVxdWVzdC5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKFxuICAgIHJlc3BvbnNlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH0sXG4gICAgZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlLnN0YXR1cykge1xuICAgICAgICAgICAgY29uc3QgeyBzdGF0dXMsIGRhdGEgfSA9IGVycm9yLnJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHN0YXR1cywgZGF0YTogeyBjb2RlOiBzdGF0dXMsIG1lc3NhZ2U6IGRhdGEuZGV0YWlsIH0gfSk7XG4gICAgICAgIH1cbiAgICB9XG4pO1xuZXhwb3J0IGRlZmF1bHQgcmVxdWVzdDsiXSwibmFtZXMiOlsiYXhpb3MiLCJyZXF1ZXN0IiwiY3JlYXRlIiwiYmFzZVVSTCIsInByb2Nlc3MiLCJlbnYiLCJiYXNlVXJsIiwiaGVhZGVycyIsImludGVyY2VwdG9ycyIsInJlc3BvbnNlIiwidXNlIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZXJyb3IiLCJzdGF0dXMiLCJkYXRhIiwiY29kZSIsIm1lc3NhZ2UiLCJkZXRhaWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./utils/serverRequest.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/user/index.ts"));
module.exports = __webpack_exports__;

})();