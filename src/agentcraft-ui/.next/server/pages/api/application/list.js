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
exports.id = "pages/api/application/list";
exports.ids = ["pages/api/application/list"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ "(api)/./pages/api/application/list.ts":
/*!***************************************!*\
  !*** ./pages/api/application/list.ts ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _util_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/util/request */ \"(api)/./util/request.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_util_request__WEBPACK_IMPORTED_MODULE_0__]);\n_util_request__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nasync function handler(req, res) {\n    const { page =0 , limit =20  } = req.query;\n    const result = await _util_request__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"/app/list\", {\n        params: {\n            page,\n            limit\n        }\n    });\n    res.status(200).json(result.data.data);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXBwbGljYXRpb24vbGlzdC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNxQztBQUt0QixlQUFlQyxRQUMxQkMsR0FBbUIsRUFDbkJDLEdBQTBCLEVBQzVCO0lBRUUsTUFBTSxFQUFFQyxNQUFPLEVBQUMsRUFBRUMsT0FBUSxHQUFFLEVBQUUsR0FBR0gsSUFBSUksS0FBSztJQUMxQyxNQUFNQyxTQUFTLE1BQU1QLHlEQUFXLENBQUMsYUFBYTtRQUFFUyxRQUFRO1lBQUVMO1lBQU1DO1FBQU07SUFBRTtJQUN4RUYsSUFBSU8sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQ0osT0FBT0ssSUFBSSxDQUFDQSxJQUFJO0FBQ3pDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW50aW5lLW1pbmltYWwtbmV4dC10ZW1wbGF0ZS8uL3BhZ2VzL2FwaS9hcHBsaWNhdGlvbi9saXN0LnRzPzVmYjkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCdcbmltcG9ydCByZXF1ZXN0IGZyb20gJ0AvdXRpbC9yZXF1ZXN0JztcbnR5cGUgRGF0YSA9IHtcbiAgICBuYW1lOiBzdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihcbiAgICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICAgIHJlczogTmV4dEFwaVJlc3BvbnNlPERhdGE+XG4pIHtcbiAgIFxuICAgIGNvbnN0IHsgcGFnZSA9IDAsIGxpbWl0ID0gMjAgfSA9IHJlcS5xdWVyeTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXF1ZXN0LmdldCgnL2FwcC9saXN0JywgeyBwYXJhbXM6IHsgcGFnZSwgbGltaXQgfSB9KTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQuZGF0YS5kYXRhKVxufVxuIl0sIm5hbWVzIjpbInJlcXVlc3QiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwicGFnZSIsImxpbWl0IiwicXVlcnkiLCJyZXN1bHQiLCJnZXQiLCJwYXJhbXMiLCJzdGF0dXMiLCJqc29uIiwiZGF0YSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/application/list.ts\n");

/***/ }),

/***/ "(api)/./util/request.ts":
/*!*************************!*\
  !*** ./util/request.ts ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst request = axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create({\n    baseURL: process.env.baseUrl || \"\",\n    headers: {\n        \"Authorization\": `Bearer ${process.env.token || \"\"}`,\n        \"Content-Type\": \"application/json\"\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlsL3JlcXVlc3QudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMEI7QUFFMUIsTUFBTUMsVUFBVUQsb0RBQVksQ0FBQztJQUN6QkcsU0FBU0MsUUFBUUMsR0FBRyxDQUFDQyxPQUFPLElBQUk7SUFDaENDLFNBQVM7UUFDTCxpQkFBaUIsQ0FBQyxPQUFPLEVBQUVILFFBQVFDLEdBQUcsQ0FBQ0csS0FBSyxJQUFJLEdBQUcsQ0FBQztRQUNwRCxnQkFBZ0I7SUFDcEI7QUFDSjtBQUVBLGlFQUFlUCxPQUFPQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFudGluZS1taW5pbWFsLW5leHQtdGVtcGxhdGUvLi91dGlsL3JlcXVlc3QudHM/M2I0ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5jb25zdCByZXF1ZXN0ID0gYXhpb3MuY3JlYXRlKHtcbiAgICBiYXNlVVJMOiBwcm9jZXNzLmVudi5iYXNlVXJsIHx8ICcnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7cHJvY2Vzcy5lbnYudG9rZW4gfHwgJyd9YCxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcmVxdWVzdDsiXSwibmFtZXMiOlsiYXhpb3MiLCJyZXF1ZXN0IiwiY3JlYXRlIiwiYmFzZVVSTCIsInByb2Nlc3MiLCJlbnYiLCJiYXNlVXJsIiwiaGVhZGVycyIsInRva2VuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./util/request.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/application/list.ts"));
module.exports = __webpack_exports__;

})();