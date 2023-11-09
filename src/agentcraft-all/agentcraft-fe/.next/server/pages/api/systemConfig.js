"use strict";
(() => {
var exports = {};
exports.id = 8478;
exports.ids = [8478];
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

/***/ 5680:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _infra_alibaba_cloud_services_serverless_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7332);

const DEFAULT_VWISTH_CONFIG = {
    regionId: "cn-hangzhou",
    zoneId: "cn-hangzhou-k",
    cidrBlock: "10.0.0.0/24",
    vpcId: "",
    vSwitchName: "agentcraft-vpc",
    description: "由AgentCraft创建，配置数据库使用，请谨慎删除"
};
async function handler(req, res) {
    const headers = req.headers;
    const mainAccountId = headers["x-fc-account-id"] || process.env.MAIN_ACCOUNT_ID;
    const accessKeyId = headers["x-fc-access-key-id"];
    const accessKeySecret = headers["x-fc-access-key-secret"];
    const securityToken = headers["x-fc-security-token"];
    const region = process.env.Region || "cn-hangzhou";
    let credential = undefined;
    if (accessKeyId) {
        credential = {
            accessKeyId,
            accessKeySecret,
            securityToken
        };
    }
    // else {
    //     res.status(200).json({ data: { 'EMBEDDING_URL': 'http://localhost:8000' } });
    //     return;
    // }
    const serverlessBridgeService = new _infra_alibaba_cloud_services_serverless_app__WEBPACK_IMPORTED_MODULE_0__/* .ServerlessBridgeService */ .G(credential, mainAccountId);
    let status = 200;
    const data = {
        code: 200
    };
    const serviceName = process.env.beServiceName;
    const functionName = process.env.beFunctionName;
    try {
        const result = await serverlessBridgeService.getFunction({
            serviceName,
            functionName,
            qualifier: "LATEST"
        });
        const embedding_url = result?.body?.environmentVariables?.EMBEDDING_URL;
        const serviceInfo = await serverlessBridgeService.getService({
            serviceName
        });
        const vpcConfig = serviceInfo?.body?.vpcConfig || {};
        const vpcResult = await serverlessBridgeService.describeVpcs({
            vpcId: vpcConfig.vpcId,
            regionId: region
        });
        const vpcInfo = vpcResult?.body?.vpcs?.vpc[0] || {};
        const { vpcName , vpcId  } = vpcInfo;
        const vswitchPayload = DEFAULT_VWISTH_CONFIG;
        vswitchPayload.vpcId = vpcId;
        vswitchPayload.regionId = region;
        try {
            await serverlessBridgeService.createVSwitch(vswitchPayload); //兼容数据库的可用区创建一个vswitch
        } catch (e) {}
        data.data = {
            EMBEDDING_URL: embedding_url,
            vpcInfo: {
                vpcName,
                vpcId
            }
        };
    } catch (e) {
        status = 500;
        data.code = status;
        data.error = e.message;
    }
    res.status(status).json(data);
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [7332], () => (__webpack_exec__(5680)));
module.exports = __webpack_exports__;

})();