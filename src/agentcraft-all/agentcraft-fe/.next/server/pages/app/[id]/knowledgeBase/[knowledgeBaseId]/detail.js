"use strict";
(() => {
var exports = {};
exports.id = 8159;
exports.ids = [8159];
exports.modules = {

/***/ 411:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hb": () => (/* binding */ DetailPage)
/* harmony export */ });
/* unused harmony exports KnowledgeBaseForm, APIAccess */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mantine_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9445);
/* harmony import */ var _mantine_form__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mantine_form__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var features_chat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2041);
/* harmony import */ var _store_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4350);
/* harmony import */ var _store_dataset__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5417);
/* harmony import */ var _types_dataset__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7194);
/* harmony import */ var _store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3483);
/* harmony import */ var constants_index__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1407);
/* harmony import */ var _components_FeatureDescription__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3658);
/* harmony import */ var _components_CopyToClipboard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(372);
/* harmony import */ var _components_MarkdownContent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7511);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([features_chat__WEBPACK_IMPORTED_MODULE_4__, _store_model__WEBPACK_IMPORTED_MODULE_5__, _store_dataset__WEBPACK_IMPORTED_MODULE_6__, _store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__, _components_MarkdownContent__WEBPACK_IMPORTED_MODULE_11__]);
([features_chat__WEBPACK_IMPORTED_MODULE_4__, _store_model__WEBPACK_IMPORTED_MODULE_5__, _store_dataset__WEBPACK_IMPORTED_MODULE_6__, _store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__, _components_MarkdownContent__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);













var // import styles from './index.module.scss';
ContainerType;
(function(ContainerType) {
    ContainerType[ContainerType["ADD_OR_UPDATE"] = 1] = "ADD_OR_UPDATE";
    ContainerType[ContainerType["CHAT"] = 2] = "CHAT";
})(ContainerType || (ContainerType = {}));
function KnowledgeBaseForm({ appId , containerType  }) {
    const setOpen = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().setOpen;
    // const isEdit = useGlobalStore().isEdit;
    const currentKnowledgeBase = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().currentKnowledgeBase;
    const setLoading = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().setLoading;
    const modelList = (0,_store_model__WEBPACK_IMPORTED_MODULE_5__/* .useGlobalStore */ .s6)().modelList;
    const dataSetList = (0,_store_dataset__WEBPACK_IMPORTED_MODULE_6__/* .useGlobalStore */ .s6)().dataSetList;
    const form = (0,_mantine_form__WEBPACK_IMPORTED_MODULE_3__.useForm)({
        initialValues: {
            name: "",
            description: "",
            prompt_template: `已知信息：【{context}】。你需要积极，简洁和专业地来回答\`\`\`中的问题。如果问题和已知信息没有关系，或者问题存在争议性，请说 “抱歉，无法回答该问题”，不允许编造。问题是：\`\`\`{query}\`\`\``,
            app_id: parseInt(appId),
            exact_datasets: [],
            fuzzy_datasets: [],
            exact_search_similarity: 0.9,
            fuzzy_search_similarity: 0.6,
            temperature: 0.5,
            top_p: 1.0,
            n_sequences: 1,
            max_tokens: 1024,
            stop: [],
            presence_penalty: 0,
            frequency_penalty: 0,
            logit_bias: "",
            model_id: "",
            redis_ip_ex: 0,
            redis_history_ex: 0,
            model_ip_limit: 0,
            llm_history_len: 0,
            system_message: "",
            exact_search_limit: 1,
            fuzzy_search_limit: 3
        },
        validate: {
            name: (value)=>!value ? "知识库名必填" : null
        }
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        (0,_store_model__WEBPACK_IMPORTED_MODULE_5__/* .getModelList */ .fZ)();
        (0,_store_dataset__WEBPACK_IMPORTED_MODULE_6__/* .getDataSetList */ .ln)();
        const datasets = currentKnowledgeBase?.datasets;
        form.setValues({
            id: currentKnowledgeBase?.id,
            name: currentKnowledgeBase?.name,
            description: currentKnowledgeBase?.description,
            prompt_template: currentKnowledgeBase?.prompt_template,
            app_id: currentKnowledgeBase?.app_id,
            exact_datasets: datasets?.filter((item)=>item.dataset_type === _types_dataset__WEBPACK_IMPORTED_MODULE_7__/* .DataSetType.QUESTION */ .I.QUESTION).map((item)=>item.dataset_id),
            fuzzy_datasets: datasets?.filter((item)=>item.dataset_type === _types_dataset__WEBPACK_IMPORTED_MODULE_7__/* .DataSetType.DOCUMENT */ .I.DOCUMENT).map((item)=>item.dataset_id),
            exact_search_similarity: currentKnowledgeBase?.exact_search_limit,
            fuzzy_search_similarity: currentKnowledgeBase?.fuzzy_search_similarity,
            temperature: currentKnowledgeBase?.temperature,
            top_p: currentKnowledgeBase?.top_p,
            n_sequences: currentKnowledgeBase?.n_sequences,
            max_tokens: currentKnowledgeBase?.max_tokens,
            stop: currentKnowledgeBase?.stop,
            presence_penalty: currentKnowledgeBase?.presence_penalty,
            frequency_penalty: currentKnowledgeBase?.frequency_penalty,
            logit_bias: currentKnowledgeBase?.logit_bias,
            model_id: currentKnowledgeBase?.model_id,
            redis_ip_ex: currentKnowledgeBase?.redis_ip_ex,
            redis_history_ex: currentKnowledgeBase?.redis_history_ex,
            model_ip_limit: currentKnowledgeBase?.model_ip_limit,
            llm_history_len: currentKnowledgeBase?.llm_history_len,
            system_message: currentKnowledgeBase?.system_message,
            exact_search_limit: currentKnowledgeBase?.exact_search_limit,
            fuzzy_search_limit: currentKnowledgeBase?.fuzzy_search_limit
        });
    }, [
        currentKnowledgeBase
    ]);
    const modelSelectData = modelList.map((item)=>{
        return {
            label: item.name,
            value: item.id
        };
    });
    const documentSelectData = dataSetList.filter((item)=>item.dataset_type == _types_dataset__WEBPACK_IMPORTED_MODULE_7__/* .DataSetType.DOCUMENT */ .I.DOCUMENT).map((item)=>{
        return {
            label: item.name,
            value: item.id
        };
    });
    const qaSelectData = dataSetList.filter((item)=>item.dataset_type == _types_dataset__WEBPACK_IMPORTED_MODULE_7__/* .DataSetType.QUESTION */ .I.QUESTION).map((item)=>{
        return {
            label: item.name,
            value: item.id
        };
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    width: "33%"
                },
                children: [
                    containerType !== ContainerType.CHAT ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Title, {
                        order: 4,
                        mb: 8,
                        children: "基础设置"
                    }) : null,
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Paper, {
                        shadow: "xs",
                        p: "md",
                        withBorder: true,
                        children: [
                            containerType !== ContainerType.CHAT ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Title, {
                                        order: 5,
                                        size: "h5",
                                        children: "知识库"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Box, {
                                        maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                                        pl: 4,
                                        pr: 4,
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.TextInput, {
                                                withAsterisk: true,
                                                label: "名称",
                                                placeholder: "输入知识库名称",
                                                ...form.getInputProps("name")
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Textarea, {
                                                label: "描述",
                                                placeholder: "输入应用描述",
                                                ...form.getInputProps("description")
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Divider, {
                                        my: "sm"
                                    })
                                ]
                            }) : null,
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Title, {
                                order: 5,
                                size: "h5",
                                children: "提示词"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Box, {
                                maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                                pl: 4,
                                pr: 4,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Textarea, {
                                        label: "系统提示词",
                                        placeholder: "输入系统提示词",
                                        ...form.getInputProps("system_message"),
                                        description: "系统提示词作为第一个输入给大语言模型的文本，往往用来设定角色"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Textarea, {
                                        withAsterisk: true,
                                        label: "提示词模板",
                                        placeholder: "",
                                        ...form.getInputProps("prompt_template"),
                                        minRows: 6,
                                        description: "提示词模板可以将检索的结果context和用户的输入query整合到一起，最后整体输入给大语言模型"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Divider, {
                                my: "sm"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Title, {
                                order: 5,
                                size: "h5",
                                children: "数据集"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Box, {
                                maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                                pl: 4,
                                pr: 4,
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                                    grow: true,
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.MultiSelect, {
                                            data: documentSelectData,
                                            description: "文档数据集用来做模型检索",
                                            label: "文档数据集",
                                            placeholder: "添加模糊数据集",
                                            ...form.getInputProps("fuzzy_datasets")
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.MultiSelect, {
                                            data: qaSelectData,
                                            description: "问答数据集用来做问题精确匹配",
                                            label: "问答数据集",
                                            placeholder: "添加精准数据集",
                                            ...form.getInputProps("exact_datasets")
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Divider, {
                                my: "sm"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Title, {
                                order: 5,
                                size: "h5",
                                children: "模型"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Box, {
                                maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                                pl: 4,
                                pr: 4,
                                mb: 12,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Select, {
                                    withAsterisk: true,
                                    data: modelSelectData,
                                    description: "LLM代理是大语言模型的代理服务，通过opneai范式的兼容，可以任意切换不同类型的LLM而不用修改业务代码",
                                    label: "LLM代理",
                                    placeholder: "",
                                    ...form.getInputProps("model_id")
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Divider, {
                                my: "sm"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    width: "33%"
                },
                children: [
                    containerType !== ContainerType.CHAT ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Title, {
                        order: 4,
                        mb: 8,
                        children: "高级设置"
                    }) : null,
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Paper, {
                        shadow: "xs",
                        p: "md",
                        withBorder: true,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Title, {
                                order: 5,
                                size: "h5",
                                children: "答案召回"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Box, {
                                maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                                pl: 4,
                                pr: 4,
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                                        grow: true,
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.TextInput, {
                                                withAsterisk: true,
                                                description: "文档数据检索的精度，取值0-1之间，建议取0.6~0.8",
                                                label: "文档结果召回精度",
                                                placeholder: "",
                                                ...form.getInputProps("fuzzy_search_similarity")
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.TextInput, {
                                                withAsterisk: true,
                                                description: "问答数据检索的精度，取值0-1之间，建议取0.9~1",
                                                label: "问答结果召回精度",
                                                placeholder: "",
                                                ...form.getInputProps("exact_search_similarity")
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                                        grow: true,
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.NumberInput, {
                                                withAsterisk: true,
                                                description: "文档结果的召回数量，数量越多信息越丰富，但是首先于LLM上下文长度，不宜过长",
                                                label: "文档结果召回数量",
                                                placeholder: "",
                                                ...form.getInputProps("fuzzy_search_limit")
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.NumberInput, {
                                                withAsterisk: true,
                                                description: "问答结果的召回数量，数量越多信息越丰富，但是首先于LLM上下文长度，不宜过长",
                                                label: "问答结果召回数量",
                                                placeholder: "",
                                                ...form.getInputProps("exact_search_limit")
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Divider, {
                                my: "sm"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Title, {
                                order: 5,
                                size: "h5",
                                children: "大语言模型参数"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Box, {
                                maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                                pl: 4,
                                pr: 4,
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                                        grow: true,
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.TextInput, {
                                                withAsterisk: true,
                                                label: "temperature",
                                                placeholder: "",
                                                ...form.getInputProps("temperature")
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.TextInput, {
                                                withAsterisk: true,
                                                label: "top_p",
                                                placeholder: "",
                                                ...form.getInputProps("top_p")
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                                        grow: true,
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.TextInput, {
                                                withAsterisk: true,
                                                label: "n_sequences",
                                                placeholder: "",
                                                ...form.getInputProps("n_sequences")
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.TextInput, {
                                                withAsterisk: true,
                                                label: "max_tokens",
                                                placeholder: "",
                                                ...form.getInputProps("max_tokens")
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                                        grow: true,
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.TextInput, {
                                                withAsterisk: true,
                                                label: "presence_penalty",
                                                placeholder: "",
                                                ...form.getInputProps("presence_penalty")
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.TextInput, {
                                                withAsterisk: true,
                                                label: "frequency_penalty",
                                                placeholder: "",
                                                ...form.getInputProps("frequency_penalty")
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.TextInput, {
                                        label: "logit_bias",
                                        placeholder: "",
                                        ...form.getInputProps("logit_bias"),
                                        width: "50%"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Divider, {
                                my: "sm"
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Box, {
                        maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                        pt: 24,
                        style: {
                            textAlign: "center",
                            width: "100%"
                        },
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Button, {
                            style: {
                                width: "100%"
                            },
                            onClick: async ()=>{
                                form.validate();
                                if (form.isValid()) {
                                    setLoading(true);
                                    const values = form.values;
                                    await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__/* .updateKnowledgeBase */ .CH)(values.id, values);
                                    setLoading(false);
                                }
                            },
                            children: "确认修改"
                        })
                    })
                ]
            })
        ]
    });
}
function ChatDrawer() {
    const chatDrawer = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().chatDrawer;
    const setChatDrawer = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().setChatDrawer;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Drawer, {
        opened: chatDrawer,
        onClose: ()=>{
            setChatDrawer(false);
        },
        title: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                    fz: "xl",
                    children: "知识库调试"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                    fz: "sm",
                    children: "您可以通过提示词调整，数据集切换，模型服务，以及切换模型参数来调整知识库问答的效果"
                })
            ]
        }),
        position: "right",
        size: "30%",
        overlayProps: {
            opacity: 0.5,
            blur: 4
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Flex, {
            mih: 50,
            direction: "row",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Badge, {
                            color: "orange",
                            size: "lg",
                            radius: "xs",
                            variant: "filled",
                            children: "知识库问答"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(features_chat__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {})
                ]
            })
        })
    });
}
function APIAccess() {
    const currentKnowledgeBase = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().currentKnowledgeBase;
    const accessUrl = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().accessUrl;
    const setAccessUrl = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().setAccessUrl;
    const setChatDrawer = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().setChatDrawer;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        (async ()=>{
            const result = await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__/* .getAccessUrl */ .Sk)();
            const data = result.data || {
                openApiUrl: "",
                innerApiUrl: ""
            };
            setAccessUrl(data);
        })();
    }, []);
    const curlExample = `curl -X 'POST' \
    '${accessUrl.openApiUrl}/v1/chat/completions' \
    -H 'accept: application/json' \
    -H 'Authorization: Bearer ${currentKnowledgeBase?.token}' \
    -H 'Content-Type: application/json' \
    -d '{
      "messages":[
          {
              "role": "user",
              "content": "请问世界最高峰是什么？"
          }
      ],
      "stream": false,
      "max_tokens": 1024
  }'`;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            width: "33%"
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Title, {
                order: 4,
                mb: 8,
                children: "访问接入"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Paper, {
                shadow: "xs",
                p: "md",
                withBorder: true,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Title, {
                        order: 5,
                        size: "h5",
                        children: "API访问"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Box, {
                        maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                        pl: 4,
                        pr: 4,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                                color: "cyan",
                                                weight: 700,
                                                children: "公网API访问地址："
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CopyToClipboard__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                                                value: accessUrl.openApiUrl,
                                                content: accessUrl.openApiUrl
                                            }),
                                            " "
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {})
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        style: {
                                            wordBreak: "break-all"
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                                color: "cyan",
                                                weight: 700,
                                                children: "API访问token："
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CopyToClipboard__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                                                value: currentKnowledgeBase?.token,
                                                content: currentKnowledgeBase?.token
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {})
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        style: {
                                            wordBreak: "break-all"
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                                color: "cyan",
                                                weight: 700,
                                                children: "API文档访问："
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                href: `${accessUrl.openApiUrl}/docs`,
                                                target: "_blank",
                                                children: `${accessUrl.openApiUrl}/docs`
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {})
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Divider, {
                        my: "sm"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Title, {
                        order: 5,
                        size: "h5",
                        children: "API调用示例"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Box, {
                        maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                        pl: 4,
                        pr: 4,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_MarkdownContent__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                            textContent: `\`\`\`shell\n${curlExample}`,
                            value: curlExample
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Divider, {
                        my: "sm"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Title, {
                        order: 5,
                        size: "h5",
                        children: "效果测试"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Box, {
                        maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                        pl: 4,
                        pr: 4,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                            grow: true,
                            children: !currentKnowledgeBase?.token ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
                                label: "需要成访问令牌才可以访问此能力",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                    color: "grape",
                                    variant: "filled",
                                    size: "xs",
                                    mr: 4,
                                    children: "问答测试"
                                })
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                color: "grape",
                                variant: "filled",
                                size: "xs",
                                onClick: ()=>{
                                    setChatDrawer(true);
                                },
                                mr: 4,
                                children: "问答测试"
                            })
                        })
                    })
                ]
            })
        ]
    });
}
function DetailPage({ appId , knowledgeBaseId  }) {
    const loading = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().loading;
    const updateCurrentKnowledgeBase = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__/* .useGlobalStore */ .s6)().updateCurrentKnowledgeBase;
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
            title: "知识库详细",
            href: `/app/${appId}/knowledgeBase/${knowledgeBaseId}/detail`
        }
    ].map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Anchor, {
            href: item.href,
            children: item.title
        }, index));
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        (async ()=>{
            const knowledgeBase = await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_8__/* .getKnowledgeBase */ .IV)(knowledgeBaseId);
            updateCurrentKnowledgeBase(knowledgeBase);
        })();
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
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Breadcrumbs, {
                children: items
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_FeatureDescription__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                title: "知识库详情",
                description: "您可以查看修改知识库内容，以及查看API调用"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ChatDrawer, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                mih: 50,
                gap: "md",
                justify: "flex-start",
                align: "flex-start",
                direction: "row",
                wrap: "nowrap",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(APIAccess, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(KnowledgeBaseForm, {
                        appId: appId
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 389:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IndexPage),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var features_knowledgeBase_detail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(411);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([features_knowledgeBase_detail__WEBPACK_IMPORTED_MODULE_1__]);
features_knowledgeBase_detail__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


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
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(features_knowledgeBase_detail__WEBPACK_IMPORTED_MODULE_1__/* .DetailPage */ .Hb, {
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

/***/ 9445:
/***/ ((module) => {

module.exports = require("@mantine/form");

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

/***/ 727:
/***/ ((module) => {

module.exports = require("react-syntax-highlighter");

/***/ }),

/***/ 4794:
/***/ ((module) => {

module.exports = require("react-syntax-highlighter/dist/cjs/styles/prism");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 4827:
/***/ ((module) => {

module.exports = import("@fortaine/fetch-event-source");;

/***/ }),

/***/ 3135:
/***/ ((module) => {

module.exports = import("react-markdown");;

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
var __webpack_exports__ = __webpack_require__.X(0, [6766,3658,372,2788,4350,4082,2041], () => (__webpack_exec__(389)));
module.exports = __webpack_exports__;

})();