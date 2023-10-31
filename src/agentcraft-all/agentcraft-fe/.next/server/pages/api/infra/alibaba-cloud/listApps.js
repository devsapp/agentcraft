"use strict";
(() => {
var exports = {};
exports.id = 8086;
exports.ids = [8086];
exports.modules = {

/***/ 8113:
/***/ ((module) => {

module.exports = require("@alicloud/fc-open20210406");

/***/ }),

/***/ 3272:
/***/ ((module) => {

module.exports = require("@alicloud/openapi-client");

/***/ }),

/***/ 487:
/***/ ((module) => {

module.exports = require("@alicloud/ram20150501");

/***/ }),

/***/ 78:
/***/ ((module) => {

module.exports = require("@alicloud/serverless20210924");

/***/ }),

/***/ 319:
/***/ ((module) => {

module.exports = require("@alicloud/sts20150401");

/***/ }),

/***/ 2151:
/***/ ((module) => {

module.exports = require("@alicloud/tea-util");

/***/ }),

/***/ 7473:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _infra_alibaba_cloud_services_serverless_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1426);

const AGENT_CRAFT = "AgentCraft";
async function handler(req, res) {
    const headers = req.headers;
    const accessKeyId = headers["x-fc-access-key-id"];
    const accessKeySecret = headers["x-fc-access-key-secret"];
    const securityToken = headers["x-fc-security-token"];
    let credential = undefined;
    if (accessKeyId) {
        credential = {
            accessKeyId,
            accessKeySecret,
            securityToken
        };
    }
    const serverlessBridgeService = new _infra_alibaba_cloud_services_serverless_app__WEBPACK_IMPORTED_MODULE_0__/* .ServerlessBridgeService */ .G(credential);
    let status = 200;
    let data = {
        code: 200
    };
    try {
        const result = await serverlessBridgeService.listApplications();
        data.code = result.statusCode;
        const agentCraftAppList = result.body.result;
        data.data = agentCraftAppList.filter((item)=>item.name.indexOf(AGENT_CRAFT) === 0);
    } catch (e) {
        status = 500;
        data.error = e.message;
    }
    res.status(status).json(data);
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1426], () => (__webpack_exec__(7473)));
module.exports = __webpack_exports__;

})();