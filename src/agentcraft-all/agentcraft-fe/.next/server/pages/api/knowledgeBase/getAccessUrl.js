"use strict";
(() => {
var exports = {};
exports.id = 9289;
exports.ids = [9289];
exports.modules = {

/***/ 2954:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
function handler(req, res) {
    const openApiUrl = process.env.openApiUrl; // 外部网络访问的url
    const innerApiUrl = process.env.baseUrl; // 内网可访问的url
    res.status(200).json({
        success: true,
        data: {
            openApiUrl,
            innerApiUrl
        }
    });
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2954));
module.exports = __webpack_exports__;

})();