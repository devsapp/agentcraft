"use strict";
(() => {
var exports = {};
exports.id = 1805;
exports.ids = [1805];
exports.modules = {

/***/ 445:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O": () => (/* binding */ FoundationModelDetail)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_FeatureDescription__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3658);
/* harmony import */ var _store_foundationModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9911);
/* harmony import */ var _components_CopyToClipboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(372);
/* harmony import */ var constants_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1407);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store_foundationModel__WEBPACK_IMPORTED_MODULE_5__]);
_store_foundationModel__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];








// import styles from './index.module.scss';
const FM_TEMPLATE_ACCESS_API_FUNCTION_MAP = {
    "fc-qwen": "client",
    "fc-llm-api": "llm-server"
};
const FM_APP_STATUS = {
    "published": {
        color: "green",
        text: "已发布"
    },
    "deploying": {
        color: "yellow",
        text: "部署中"
    }
};
function getLLMServiceUrl(currentFoundationModel) {
    try {
        const output = currentFoundationModel.output;
        const deploy = output?.deploy;
        const allFunctions = Object.keys(deploy).filter((key)=>FM_TEMPLATE_ACCESS_API_FUNCTION_MAP[currentFoundationModel.appConfig.template] === key);
        const apiServiceConfig = deploy[allFunctions[0]];
        if (apiServiceConfig) {
            return apiServiceConfig.customDomains[0].domainName;
        }
    } catch (e) {
        console.log(e);
    }
    return "";
}
function FoundationModelView({ fmId  }) {
    const currentFoundationModel = (0,_store_foundationModel__WEBPACK_IMPORTED_MODULE_5__/* .useFoundationModelStore */ .bQ)().currentFoundationModel;
    const setCurrentFoundationModel = (0,_store_foundationModel__WEBPACK_IMPORTED_MODULE_5__/* .useFoundationModelStore */ .bQ)().setCurrentFoundationModel;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        (async ()=>{
            const result = await (0,_store_foundationModel__WEBPACK_IMPORTED_MODULE_5__/* .getFoundationModel */ .Yo)(fmId);
            const _currentFoundationModel = result?.lastRelease;
            setCurrentFoundationModel(_currentFoundationModel);
        })();
    }, [
        fmId
    ]);
    const servcieURL = getLLMServiceUrl(currentFoundationModel);
    const deployStatus = FM_APP_STATUS[currentFoundationModel?.status] || {
        color: "grey",
        text: "初始化"
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Title, {
                    order: 4,
                    mb: 8,
                    children: "基础模型服务信息"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Paper, {
                    shadow: "xs",
                    p: "md",
                    withBorder: true,
                    mb: 12,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Title, {
                            order: 5,
                            size: "h5",
                            children: "应用信息"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                            maw: constants_index__WEBPACK_IMPORTED_MODULE_7__/* .FORM_WIDTH_1280 */ .cy,
                            pl: 4,
                            pr: 4,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                                    align: "center",
                                    children: [
                                        "应用访问状态：",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Text, {
                                            color: deployStatus.color,
                                            children: deployStatus.text
                                        })
                                    ]
                                })
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Title, {
                    order: 4,
                    mb: 8,
                    children: "访问接入"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Paper, {
                    shadow: "xs",
                    p: "md",
                    withBorder: true,
                    mb: 12,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Title, {
                            order: 5,
                            size: "h5",
                            children: "基础模型服务访问信息"
                        }),
                        servcieURL ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                            maw: constants_index__WEBPACK_IMPORTED_MODULE_7__/* .FORM_WIDTH_1280 */ .cy,
                            pl: 4,
                            pr: 4,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                                        align: "center",
                                        children: [
                                            "API访问地址：",
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CopyToClipboard__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                                width: 800,
                                                content: `http://${servcieURL}/v1/chat/completions`,
                                                value: `http://${servcieURL}/v1/chat/completions`
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            "API访问文档：",
                                            `http://${servcieURL}/docs`
                                        ]
                                    })
                                })
                            ]
                        }) : null
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Title, {
                    order: 4,
                    mb: 8,
                    children: "云资源信息"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Paper, {
                    shadow: "xs",
                    p: "md",
                    withBorder: true,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Title, {
                            order: 5,
                            size: "h5",
                            children: "函数计算应用信息"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                            maw: constants_index__WEBPACK_IMPORTED_MODULE_7__/* .FORM_WIDTH_1280 */ .cy,
                            pl: 4,
                            pr: 4,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    children: [
                                        "应用名：",
                                        `${currentFoundationModel?.appName}`
                                    ]
                                })
                            })
                        })
                    ]
                })
            ]
        })
    });
}
function FoundationModelDetail() {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { query  } = router;
    const fmId = query.fmId;
    const items = [
        {
            title: "AgentCraft",
            href: "/"
        },
        {
            title: "基础模型",
            href: "/foundationModel"
        },
        {
            title: "模型详情",
            href: `/foundationModel/${fmId}/detail`
        }
    ].map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Anchor, {
            href: item.href,
            children: item.title
        }, index));
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Breadcrumbs, {
                children: items
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_FeatureDescription__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                title: `${fmId}详情`,
                description: "依托阿里云Serverless的丰富应用模版以及完整的工具链，AgentCraft可以创建丰富多样的基础模型服务"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                mt: 12,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(FoundationModelView, {
                    fmId: fmId
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7876:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IndexPage),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var features_foundationModel_detail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(445);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([features_foundationModel_detail__WEBPACK_IMPORTED_MODULE_1__]);
features_foundationModel_detail__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function getServerSideProps(context) {
    const { params  } = context;
    const fmId = params.fmId;
    return {
        props: {
            fmId
        }
    };
}
function IndexPage() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(features_foundationModel_detail__WEBPACK_IMPORTED_MODULE_1__/* .FoundationModelDetail */ .O, {});
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2247:
/***/ ((module) => {

module.exports = require("@mantine/core");

/***/ }),

/***/ 32:
/***/ ((module) => {

module.exports = require("@mantine/hooks");

/***/ }),

/***/ 2236:
/***/ ((module) => {

module.exports = require("@tabler/icons-react");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 6912:
/***/ ((module) => {

module.exports = import("zustand");;

/***/ }),

/***/ 3602:
/***/ ((module) => {

module.exports = import("zustand/middleware");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [6766,3658,372,9911], () => (__webpack_exec__(7876)));
module.exports = __webpack_exports__;

})();