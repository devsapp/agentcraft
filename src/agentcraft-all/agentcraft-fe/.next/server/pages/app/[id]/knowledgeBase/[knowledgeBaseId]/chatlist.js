"use strict";
(() => {
var exports = {};
exports.id = 8846;
exports.ids = [8846];
exports.modules = {

/***/ 2023:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": () => (/* binding */ ChatListPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_chat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2788);
/* harmony import */ var _utils_chat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8597);
/* harmony import */ var _components_FeatureDescription__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3658);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store_chat__WEBPACK_IMPORTED_MODULE_3__]);
_store_chat__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






function List({ knowledgeBaseId  }) {
    const chatList = (0,_store_chat__WEBPACK_IMPORTED_MODULE_3__/* .useChatStore */ .aK)().chatList;
    const loading = (0,_store_chat__WEBPACK_IMPORTED_MODULE_3__/* .useChatStore */ .aK)().loading;
    const setLoading = (0,_store_chat__WEBPACK_IMPORTED_MODULE_3__/* .useChatStore */ .aK)().setLoading;
    const setOpen = (0,_store_chat__WEBPACK_IMPORTED_MODULE_3__/* .useChatStore */ .aK)().setOpen;
    const getKnowledgeBaseChatList = async (knowledgeBaseId)=>{
        setLoading(true);
        await (0,_store_chat__WEBPACK_IMPORTED_MODULE_3__/* .getChatList */ .Ag)(knowledgeBaseId);
        setLoading(false);
    };
    const rows = chatList.map((element)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: element.id
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            width: 100,
                            wordWrap: "break-word"
                        },
                        children: element.question
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            width: 200,
                            wordWrap: "break-word"
                        },
                        children: (0,_utils_chat__WEBPACK_IMPORTED_MODULE_5__/* .unicodeDecode */ .pI)(element.answer)
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            width: 200,
                            wordWrap: "break-word"
                        },
                        children: element.prompt
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: element.ip
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            width: 200,
                            wordWrap: "break-word"
                        },
                        children: JSON.stringify((0,_utils_chat__WEBPACK_IMPORTED_MODULE_5__/* .unicodeDecode */ .pI)(element.source))
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: element.model_name
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: element.created
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        onClick: ()=>{
                            setOpen(true);
                        },
                        size: "xs",
                        children: "编辑"
                    })
                })
            ]
        }, element.id));
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getKnowledgeBaseChatList(knowledgeBaseId);
    }, [
        knowledgeBaseId
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Box, {
        pos: "relative",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.LoadingOverlay, {
                visible: loading,
                overlayOpacity: 0.3
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Table, {
                striped: true,
                withBorder: true,
                withColumnBorders: true,
                mt: 12,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("thead", {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "编号"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "问题"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "答案"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "完整提示词"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "访问IP"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "知识库结果"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "使用模型"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "问答创建时间"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "操作"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tbody", {
                        children: rows
                    })
                ]
            })
        ]
    });
}
function ChatListPage({ appId , knowledgeBaseId  }) {
    const loading = (0,_store_chat__WEBPACK_IMPORTED_MODULE_3__/* .useChatStore */ .aK)().loading;
    const items = [
        {
            title: "应用列表",
            href: "/app"
        },
        {
            title: "知识库",
            href: `/app/${appId}/knowledgeBase`
        },
        {
            title: "问答记录",
            href: `/app/${appId}/knowledgeBase/${knowledgeBaseId}/chatlist`
        }
    ].map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Anchor, {
            href: item.href,
            children: item.title
        }, index));
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Box, {
        pos: "relative",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.LoadingOverlay, {
                visible: loading,
                overlayOpacity: 0.3
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Breadcrumbs, {
                children: items
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_FeatureDescription__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                title: "问答记录",
                description: "您可以在此查看该知识库的问答历史记录"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(List, {
                knowledgeBaseId: knowledgeBaseId
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3870:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IndexPage),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var features_knowledgeBase_chatlist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2023);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([features_knowledgeBase_chatlist__WEBPACK_IMPORTED_MODULE_1__]);
features_knowledgeBase_chatlist__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function getServerSideProps(context) {
    const { params  } = context;
    const appId = params.id;
    const knowledgeBaseId = params.knowledgeBaseId;
    return {
        props: {
            appId,
            knowledgeBaseId
        }
    };
}
function IndexPage({ appId , knowledgeBaseId  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(features_knowledgeBase_chatlist__WEBPACK_IMPORTED_MODULE_1__/* .ChatListPage */ .f, {
        appId: appId,
        knowledgeBaseId: knowledgeBaseId
    });
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

/***/ 4827:
/***/ ((module) => {

module.exports = import("@fortaine/fetch-event-source");;

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
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [6766,3658,2788], () => (__webpack_exec__(3870)));
module.exports = __webpack_exports__;

})();