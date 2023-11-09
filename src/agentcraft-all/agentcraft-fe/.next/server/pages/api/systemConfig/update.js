"use strict";
(() => {
var exports = {};
exports.id = 3170;
exports.ids = [3170];
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

/***/ 2807:
/***/ ((module) => {

module.exports = require("@alicloud/vpc20160428");

/***/ }),

/***/ 8349:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _infra_alibaba_cloud_services_serverless_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7332);

async function handler(req, res) {
    const headers = req.headers;
    const mainAccountId = headers["x-fc-account-id"] || process.env.MAIN_ACCOUNT_ID;
    const accessKeyId = headers["x-fc-access-key-id"];
    const accessKeySecret = headers["x-fc-access-key-secret"];
    const securityToken = headers["x-fc-security-token"];
    const env = req.body;
    let credential = undefined;
    if (accessKeyId) {
        credential = {
            accessKeyId,
            accessKeySecret,
            securityToken
        };
    }
    const serverlessBridgeService = new _infra_alibaba_cloud_services_serverless_app__WEBPACK_IMPORTED_MODULE_0__/* .ServerlessBridgeService */ .G(credential, mainAccountId);
    // await serverlessBridgeService.getMainOrCreateAccountRole();
    let status = 200;
    const data = {
        code: 200
    };
    const serviceName = process.env.beServiceName;
    const functionName = process.env.beFunctionName;
    try {
        const functionInfo = await serverlessBridgeService.getFunction({
            serviceName,
            functionName,
            qualifier: "LATEST"
        });
        const environmentVariables = functionInfo?.body?.environmentVariables;
        const completeEnvs = Object.assign({}, environmentVariables, env);
        completeEnvs.EMBEDDING_DIM = "1024";
        const result = await serverlessBridgeService.updateFunction({
            serviceName,
            functionName,
            environmentVariables: completeEnvs
        });
        data.data = result.body;
    } catch (e) {
        status = 500;
        data.code = status;
        data.error = e.message;
    }
    console.log(data);
    res.status(status).json(data);
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [7332], () => (__webpack_exec__(8349)));
module.exports = __webpack_exports__;

})();