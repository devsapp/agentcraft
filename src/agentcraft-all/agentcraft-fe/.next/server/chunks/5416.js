"use strict";
exports.id = 5416;
exports.ids = [5416];
exports.modules = {

/***/ 5416:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L": () => (/* binding */ ApplicationPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mantine_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9445);
/* harmony import */ var _mantine_form__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mantine_form__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mantine_modals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1280);
/* harmony import */ var _mantine_modals__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mantine_modals__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _store_application__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7359);
/* harmony import */ var _components_FeatureDescription__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3658);
/* harmony import */ var utils_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8847);
/* harmony import */ var constants_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1407);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store_application__WEBPACK_IMPORTED_MODULE_6__]);
_store_application__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];










function List() {
    const appList = (0,_store_application__WEBPACK_IMPORTED_MODULE_6__/* .useGlobalStore */ .s6)().appList;
    const loading = (0,_store_application__WEBPACK_IMPORTED_MODULE_6__/* .useGlobalStore */ .s6)().loading;
    const setLoading = (0,_store_application__WEBPACK_IMPORTED_MODULE_6__/* .useGlobalStore */ .s6)().setLoading;
    const removeApplication = (app)=>{
        const { id , name  } = app;
        const deleteContent = `确定删除 ${name}?`;
        _mantine_modals__WEBPACK_IMPORTED_MODULE_5__.modals.openConfirmModal({
            title: "删除应用",
            centered: true,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Text, {
                size: "sm",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Highlight, {
                    highlight: name,
                    children: deleteContent
                })
            }),
            labels: {
                confirm: "确定",
                cancel: "取消"
            },
            onCancel: ()=>console.log("Cancel"),
            confirmProps: {
                color: "red"
            },
            onConfirm: async ()=>{
                setLoading(true);
                await (0,_store_application__WEBPACK_IMPORTED_MODULE_6__/* .deleteApplication */ .rw)(id);
                await (0,_store_application__WEBPACK_IMPORTED_MODULE_6__/* .getApplications */ .RV)();
                setLoading(false);
            }
        });
    };
    const getApp = async ()=>{
        setLoading(true);
        await (0,_store_application__WEBPACK_IMPORTED_MODULE_6__/* .getApplications */ .RV)();
        setLoading(false);
    };
    const rows = appList.map((element)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: element.id
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                        href: `/app/${element.id}/knowledgeBase`,
                        children: element.name
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: element.description
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: (0,utils_index__WEBPACK_IMPORTED_MODULE_8__/* .formatDateTime */ .o)(element.created)
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: (0,utils_index__WEBPACK_IMPORTED_MODULE_8__/* .formatDateTime */ .o)(element.modified)
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                    children: [
                        " ",
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                            variant: "filled",
                            color: "red",
                            size: "xs",
                            onClick: ()=>removeApplication(element),
                            children: "删除"
                        })
                    ]
                })
            ]
        }, element.id));
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getApp();
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
        pos: "relative",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.LoadingOverlay, {
                visible: loading,
                overlayOpacity: 0.3
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Table, {
                striped: true,
                withBorder: true,
                withColumnBorders: true,
                mt: 12,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("thead", {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "应用id"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "应用名"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "应用描述"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "创建时间"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "修改时间"
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
function Add() {
    const open = (0,_store_application__WEBPACK_IMPORTED_MODULE_6__/* .useGlobalStore */ .s6)().open;
    const setOpen = (0,_store_application__WEBPACK_IMPORTED_MODULE_6__/* .useGlobalStore */ .s6)().setOpen;
    const setLoading = (0,_store_application__WEBPACK_IMPORTED_MODULE_6__/* .useGlobalStore */ .s6)().setLoading;
    const form = (0,_mantine_form__WEBPACK_IMPORTED_MODULE_4__.useForm)({
        initialValues: {
            name: "",
            description: ""
        },
        validate: {
            name: (value)=>!value ? "应用名必填" : null
        }
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Modal, {
        opened: open,
        onClose: ()=>{
            setOpen(false);
        },
        title: "创建应用",
        centered: true,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                maw: constants_index__WEBPACK_IMPORTED_MODULE_9__/* .FORM_WIDTH */ .hE,
                mx: "auto",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                        withAsterisk: true,
                        label: "名称",
                        placeholder: "输入应用名",
                        ...form.getInputProps("name")
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Textarea, {
                        label: "描述",
                        placeholder: "输入应用描述",
                        ...form.getInputProps("description")
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                maw: constants_index__WEBPACK_IMPORTED_MODULE_9__/* .FORM_WIDTH */ .hE,
                mx: "auto",
                pt: 12,
                style: {
                    textAlign: "right"
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                    onClick: async ()=>{
                        form.validate();
                        if (form.isValid()) {
                            setLoading(true);
                            const appData = form?.values || {};
                            await (0,_store_application__WEBPACK_IMPORTED_MODULE_6__/* .addApplication */ .E9)(appData);
                            await (0,_store_application__WEBPACK_IMPORTED_MODULE_6__/* .getApplications */ .RV)();
                            setOpen(false);
                            setLoading(false);
                        }
                    },
                    children: "确认"
                })
            })
        ]
    });
}
function ApplicationPage() {
    const items = [
        {
            title: "AgentCraft",
            href: "#"
        },
        {
            title: "应用",
            href: "/application"
        }
    ].map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Anchor, {
            href: item.href,
            children: item.title
        }, index));
    const setOpen = (0,_store_application__WEBPACK_IMPORTED_MODULE_6__/* .useGlobalStore */ .s6)().setOpen;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Breadcrumbs, {
                children: items
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_FeatureDescription__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                title: "应用",
                description: "AgentCraft的应用是对应业务场景的抽象，您可以聚合同类业务到同一个应用里面，在一个应用下您可以构建多个知识库服务及agent服务"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                mt: 12,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                    onClick: ()=>setOpen(true),
                    children: "新建应用"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Add, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(List, {})
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7359:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E9": () => (/* binding */ addApplication),
/* harmony export */   "RV": () => (/* binding */ getApplications),
/* harmony export */   "rw": () => (/* binding */ deleteApplication),
/* harmony export */   "s6": () => (/* binding */ useGlobalStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6912);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3602);
/* harmony import */ var _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8417);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__]);
([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const useGlobalStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)((set)=>({
        appList: [],
        open: false,
        loading: false,
        updateAppList: (appList)=>set((_state)=>({
                    appList
                })),
        setLoading: (status)=>set((_state)=>{
                return {
                    loading: status
                };
            }),
        setOpen: (status)=>set((_state)=>{
                return {
                    open: status
                };
            })
    })));
async function getApplications() {
    const state = useGlobalStore.getState();
    const updateAppList = state.updateAppList;
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)("/api/application/list");
    const data = res.data;
    if (data) {
        updateAppList(data);
    }
}
async function deleteApplication(id) {
    return await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/application/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
}
async function addApplication(payload) {
    return await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)("/api/application/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8847:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ formatDateTime)
/* harmony export */ });
/* unused harmony export delay */
function delay(milliseconds) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        }, milliseconds);
    });
}
function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


/***/ })

};
;