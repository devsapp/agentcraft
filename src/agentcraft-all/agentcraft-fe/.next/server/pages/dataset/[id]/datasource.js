"use strict";
(() => {
var exports = {};
exports.id = 4650;
exports.ids = [4650];
exports.modules = {

/***/ 7914:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ Datasource)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mantine_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9445);
/* harmony import */ var _mantine_form__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mantine_form__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mantine_modals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1280);
/* harmony import */ var _mantine_modals__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mantine_modals__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_CopyToClipboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(372);
/* harmony import */ var _tabler_icons_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2236);
/* harmony import */ var _tabler_icons_react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _store_datasource__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9494);
/* harmony import */ var _types_dataset__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7194);
/* harmony import */ var utils_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8847);
/* harmony import */ var constants_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1407);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store_datasource__WEBPACK_IMPORTED_MODULE_8__]);
_store_datasource__WEBPACK_IMPORTED_MODULE_8__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];












function DocumentForm({ form  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
        maw: constants_index__WEBPACK_IMPORTED_MODULE_10__/* .FORM_WIDTH */ .hE,
        mx: "auto",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                withAsterisk: true,
                label: "标题",
                placeholder: "",
                ...form.getInputProps("title")
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Textarea, {
                withAsterisk: true,
                label: "内容",
                placeholder: "",
                ...form.getInputProps("content")
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                label: "来源url",
                placeholder: "",
                ...form.getInputProps("url")
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.NumberInput, {
                label: "文档切片大小",
                placeholder: "",
                ...form.getInputProps("chunk_size")
            })
        ]
    });
}
function QuestionForm({ form  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
        maw: constants_index__WEBPACK_IMPORTED_MODULE_10__/* .FORM_WIDTH */ .hE,
        mx: "auto",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                withAsterisk: true,
                label: "标题",
                placeholder: "",
                ...form.getInputProps("title")
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Textarea, {
                withAsterisk: true,
                label: "问题",
                placeholder: "",
                ...form.getInputProps("question")
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Textarea, {
                withAsterisk: true,
                label: "答案",
                placeholder: "",
                ...form.getInputProps("answer")
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                label: "来源url",
                placeholder: "",
                ...form.getInputProps("url")
            })
        ]
    });
}
function Add() {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const open = (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().open;
    const setOpen = (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().setOpen;
    const setLoading = (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().setLoading;
    const { query  } = router;
    const dataSetType = query.dataSetType;
    const dataSetId = query.id;
    const documentForm = (0,_mantine_form__WEBPACK_IMPORTED_MODULE_4__.useForm)({
        initialValues: {
            title: "",
            content: "",
            url: "",
            chunk_size: 1024,
            ext: "txt",
            tag: dataSetId
        },
        validate: {
            title: (value)=>!value ? "标题必填" : null,
            content: (value)=>!value ? "内容必填" : null
        }
    });
    const questionForm = (0,_mantine_form__WEBPACK_IMPORTED_MODULE_4__.useForm)({
        initialValues: {
            title: "",
            question: "",
            answer: "",
            tag: dataSetId,
            url: ""
        },
        validate: {
            title: (value)=>!value ? "标题必填" : null,
            question: (value)=>!value ? "问题必填" : null,
            answer: (value)=>!value ? "答案必填" : null
        }
    });
    const currentForm = dataSetType == _types_dataset__WEBPACK_IMPORTED_MODULE_9__/* .DataSetType.DOCUMENT */ .I.DOCUMENT ? documentForm : questionForm;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Modal, {
        opened: open,
        onClose: ()=>{
            setOpen(false);
        },
        title: "创建数据集",
        centered: true,
        children: [
            dataSetType == _types_dataset__WEBPACK_IMPORTED_MODULE_9__/* .DataSetType.DOCUMENT */ .I.DOCUMENT ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DocumentForm, {
                form: documentForm
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(QuestionForm, {
                form: questionForm
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                maw: constants_index__WEBPACK_IMPORTED_MODULE_10__/* .FORM_WIDTH */ .hE,
                mx: "auto",
                pt: 12,
                style: {
                    textAlign: "right"
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                    onClick: async ()=>{
                        currentForm.validate();
                        if (currentForm.isValid()) {
                            try {
                                setLoading(true);
                                const values = currentForm.values;
                                await (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .addDataSource */ .J_)({
                                    dataSetId,
                                    dataSetType
                                }, values);
                                await (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .getDataSourceList */ .z9)(dataSetId, dataSetType);
                            } catch (e) {
                                console.log(e);
                            } finally{
                                setOpen(false);
                                setLoading(false);
                            }
                        }
                    },
                    children: "确认"
                })
            })
        ]
    });
}
function UploadDataSource() {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const open = (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().openUploadModel;
    const setOpen = (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().setOpenUploadModel;
    const setLoading = (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().setLoading;
    const { query  } = router;
    const dataSetType = query.dataSetType;
    const dataSetId = query.id;
    const form = (0,_mantine_form__WEBPACK_IMPORTED_MODULE_4__.useForm)({
        initialValues: {
            title: "",
            url: "",
            chunk_size: 512,
            ext: "txt",
            tag: dataSetId
        },
        validate: {
            title: (value)=>!value ? "标题必填" : null
        }
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Modal, {
        opened: open,
        onClose: ()=>{
            setOpen(false);
        },
        title: "上传数据集文档",
        centered: true,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.FileInput, {
                withAsterisk: true,
                accept: ".md,.txt,.html,.pdf",
                name: "file",
                label: "选择文档",
                description: "选择本地文件上传，支持 .txt,.md,.html文件",
                placeholder: "点击上传文档",
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_7__.IconUpload, {
                    size: (0,_mantine_core__WEBPACK_IMPORTED_MODULE_3__.rem)(14)
                }),
                ...form.getInputProps("file")
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                withAsterisk: true,
                label: "标题",
                description: "标题内容作为检索的数据来源，用来展示检索结果",
                placeholder: "",
                ...form.getInputProps("title")
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.NumberInput, {
                withAsterisk: true,
                label: "文档切片大小",
                description: "",
                placeholder: "",
                ...form.getInputProps("chunk_size")
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                label: "来源url",
                placeholder: "",
                ...form.getInputProps("url")
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                maw: constants_index__WEBPACK_IMPORTED_MODULE_10__/* .FORM_WIDTH */ .hE,
                mx: "auto",
                pt: 12,
                style: {
                    textAlign: "right"
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                    onClick: async ()=>{
                        form.validate();
                        if (form.isValid()) {
                            try {
                                setLoading(true);
                                const values = await form.values;
                                const formData = new FormData();
                                formData.append("file", values.file);
                                formData.append("title", values.title);
                                formData.append("chunk_size", values.chunk_size);
                                formData.append("url", values.url);
                                await (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .addDataSourceByUploadFile */ .$s)({
                                    dataSetId
                                }, formData);
                                await (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .getDataSourceList */ .z9)(dataSetId, dataSetType);
                            } catch (e) {
                                console.log(e);
                            } finally{
                                setOpen(false);
                                setLoading(false);
                            }
                        }
                    },
                    children: "确认"
                })
            })
        ]
    });
}
function List({ dataSetId , dataSetType  }) {
    const dataSourceList = (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().dataSourceList;
    const setLoading = (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().setLoading;
    const removeDataDataSource = (dataSource)=>{
        const { id , title  } = dataSource;
        const deleteContent = `确定删除 ${title}?`;
        _mantine_modals__WEBPACK_IMPORTED_MODULE_5__.modals.openConfirmModal({
            title: "删除数据集",
            centered: true,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Text, {
                size: "sm",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Highlight, {
                    highlight: title,
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
                await (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .deleteDataSource */ .xU)({
                    dataSetId,
                    dataSetType,
                    dataSourceId: id
                });
                await (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .getDataSourceList */ .z9)(dataSetId, dataSetType);
                setLoading(false);
            }
        });
    };
    const rows = dataSourceList.map((element)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: element.id
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: element.title
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CopyToClipboard__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                        value: element.url,
                        content: element.url,
                        truncate: true
                    })
                }),
                dataSetType == _types_dataset__WEBPACK_IMPORTED_MODULE_9__/* .DataSetType.QUESTION */ .I.QUESTION ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CopyToClipboard__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                        value: element.question,
                        content: element.question,
                        truncate: true
                    })
                }) : null,
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CopyToClipboard__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                        value: element.doc_chunk,
                        content: element.doc_chunk
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: (0,utils_index__WEBPACK_IMPORTED_MODULE_11__/* .formatDateTime */ .o0)(element.created)
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: (0,utils_index__WEBPACK_IMPORTED_MODULE_11__/* .formatDateTime */ .o0)(element.modified)
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                    children: [
                        " ",
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                            variant: "filled",
                            color: "red",
                            size: "xs",
                            onClick: ()=>removeDataDataSource(element),
                            children: "删除"
                        })
                    ]
                })
            ]
        }, element.id));
    const getDatasource = async ()=>{
        setLoading(true);
        try {
            await (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .getDataSourceList */ .z9)(dataSetId, dataSetType);
        } catch (e) {}
        setLoading(false);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getDatasource();
    }, [
        dataSetId,
        dataSetType
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    "共计",
                    dataSourceList.length,
                    "条数据"
                ]
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
                                    children: "编号"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "标题"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "源访问地址"
                                }),
                                dataSetType == _types_dataset__WEBPACK_IMPORTED_MODULE_9__/* .DataSetType.QUESTION */ .I.QUESTION ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "问题"
                                }) : null,
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: dataSetType == _types_dataset__WEBPACK_IMPORTED_MODULE_9__/* .DataSetType.QUESTION */ .I.QUESTION ? "答案" : "文档内容"
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
function Datasource() {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { query  } = router;
    const dataSetType = query.dataSetType;
    const dataSetId = query.id;
    const items = [
        {
            title: "AgentCraft",
            href: "/"
        },
        {
            title: "数据集",
            href: "/dataset"
        },
        {
            title: "数据源",
            href: `/dataset/${dataSetId}/datasource`
        }
    ].map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Anchor, {
            href: item.href,
            children: item.title
        }, index));
    const loading = (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().loading;
    const setOpen = (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().setOpen;
    const setOpenUploadModel = (0,_store_datasource__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().setOpenUploadModel;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Breadcrumbs, {
                children: items
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                mt: 12,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                    mih: 50,
                    gap: "md",
                    justify: "flex-start",
                    align: "flex-start",
                    direction: "row",
                    wrap: "wrap",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                            onClick: ()=>setOpen(true),
                            children: "新建单条数据源"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Space, {
                            h: "md"
                        }),
                        dataSetType == _types_dataset__WEBPACK_IMPORTED_MODULE_9__/* .DataSetType.DOCUMENT */ .I.DOCUMENT ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                            onClick: ()=>setOpenUploadModel(true),
                            variant: "filled",
                            leftIcon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_7__.IconFileUpload, {
                                size: "1rem"
                            }),
                            children: "上传文件"
                        }) : null
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.LoadingOverlay, {
                        visible: loading,
                        overlayOpacity: 0.3
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Add, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(UploadDataSource, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(List, {
                        dataSetId: dataSetId,
                        dataSetType: dataSetType
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4201:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IndexPage),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var features_datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7914);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([features_datasource__WEBPACK_IMPORTED_MODULE_1__]);
features_datasource__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function getServerSideProps(context) {
    const { params  } = context;
    const datasetId = params.id;
    return {
        props: {
            datasetId
        }
    };
}
function IndexPage() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(features_datasource__WEBPACK_IMPORTED_MODULE_1__/* .Datasource */ .Y, {});
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2247:
/***/ ((module) => {

module.exports = require("@mantine/core");

/***/ }),

/***/ 9445:
/***/ ((module) => {

module.exports = require("@mantine/form");

/***/ }),

/***/ 1280:
/***/ ((module) => {

module.exports = require("@mantine/modals");

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
var __webpack_exports__ = __webpack_require__.X(0, [6766,372,4999], () => (__webpack_exec__(4201)));
module.exports = __webpack_exports__;

})();