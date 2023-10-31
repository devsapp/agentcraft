"use strict";
(() => {
var exports = {};
exports.id = 1222;
exports.ids = [1222];
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

/***/ 5611:
/***/ ((module) => {

module.exports = import("nanoid");;

/***/ }),

/***/ 9885:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5611);
/* harmony import */ var _infra_alibaba_cloud_services_serverless_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1426);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([nanoid__WEBPACK_IMPORTED_MODULE_0__]);
nanoid__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


async function handler(req, res) {
    const template = req.query.template;
    const parameters = req.body;
    const headers = req.headers;
    const mainAccountId = headers["x-fc-account-id"] || process.env.MAIN_ACCOUNT_ID;
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
    const serverlessBridgeService = new _infra_alibaba_cloud_services_serverless_app__WEBPACK_IMPORTED_MODULE_1__/* .ServerlessBridgeService */ .G(credential);
    const appName = `AgentCraft_${(0,nanoid__WEBPACK_IMPORTED_MODULE_0__.nanoid)()}`;
    const appData = {
        name: appName,
        description: "由AgentCraft创建，谨慎删除",
        template,
        parameters,
        roleArn: `acs:ram::${mainAccountId}:role/aliyunfcserverlessdevsrole`,
        autoDeploy: true
    };
    // await serverlessBridgeService.getMainOrCreateAccountRole();
    let status = 200;
    let data = {
        code: 200
    };
    try {
        const result = await serverlessBridgeService.createMainAccountApplication(appData);
        data.data = result.body;
    } catch (e) {
        status = 500;
        data.error = e.message;
    }
    res.status(status).json(data);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1426], () => (__webpack_exec__(9885)));
module.exports = __webpack_exports__;

})();