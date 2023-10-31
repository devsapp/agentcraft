"use strict";
(() => {
var exports = {};
exports.id = 9470;
exports.ids = [9470];
exports.modules = {

/***/ 4784:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JS": () => (/* binding */ KnowledgeBasePage)
/* harmony export */ });
/* unused harmony exports KnowledgeBaseForm, ChatDrawer */
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
/* harmony import */ var _store_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4350);
/* harmony import */ var _store_dataset__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5417);
/* harmony import */ var utils_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(8847);
/* harmony import */ var _types_dataset__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7194);
/* harmony import */ var _components_FeatureDescription__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3658);
/* harmony import */ var _store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3483);
/* harmony import */ var constants_index__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1407);
/* harmony import */ var _components_CopyToClipboard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(372);
/* harmony import */ var features_chat__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2041);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store_model__WEBPACK_IMPORTED_MODULE_5__, _store_dataset__WEBPACK_IMPORTED_MODULE_6__, _store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__, features_chat__WEBPACK_IMPORTED_MODULE_11__]);
([_store_model__WEBPACK_IMPORTED_MODULE_5__, _store_dataset__WEBPACK_IMPORTED_MODULE_6__, _store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__, features_chat__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);














var // import styles from './index.module.scss';
ContainerType;
(function(ContainerType) {
    ContainerType[ContainerType["ADD_OR_UPDATE"] = 1] = "ADD_OR_UPDATE";
    ContainerType[ContainerType["CHAT"] = 2] = "CHAT";
})(ContainerType || (ContainerType = {}));
function KnowledgeBaseForm({ appId , containerType  }) {
    const setOpen = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().setOpen;
    const isEdit = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().isEdit;
    const currentKnowledgeBase = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().currentKnowledgeBase;
    const setLoading = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().setLoading;
    const modelList = (0,_store_model__WEBPACK_IMPORTED_MODULE_5__/* .useGlobalStore */ .s6)().modelList;
    const dataSetList = (0,_store_dataset__WEBPACK_IMPORTED_MODULE_6__/* .useGlobalStore */ .s6)().dataSetList;
    const form = (0,_mantine_form__WEBPACK_IMPORTED_MODULE_4__.useForm)({
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
        if (isEdit) {
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
        }
    }, [
        currentKnowledgeBase
    ]);
    const modelSelectData = modelList.map((item)=>{
        return {
            label: item.name_alias,
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
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Flex, {
        mih: 50,
        gap: "md",
        justify: "flex-start",
        align: "flex-start",
        direction: "column",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                mih: 50,
                gap: "md",
                justify: "flex-start",
                align: "flex-start",
                direction: "row",
                wrap: "nowrap",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            width: "50%"
                        },
                        children: [
                            containerType !== ContainerType.CHAT ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Title, {
                                order: 4,
                                mb: 8,
                                children: "基础设置"
                            }) : null,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Paper, {
                                shadow: "xs",
                                p: "md",
                                withBorder: true,
                                children: [
                                    containerType !== ContainerType.CHAT ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Title, {
                                                order: 5,
                                                size: "h5",
                                                children: "知识库"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                                                maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                                                pl: 4,
                                                pr: 4,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                                                        withAsterisk: true,
                                                        label: "名称",
                                                        placeholder: "输入知识库名称",
                                                        ...form.getInputProps("name")
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Textarea, {
                                                        label: "描述",
                                                        placeholder: "输入应用描述",
                                                        ...form.getInputProps("description")
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Divider, {
                                                my: "sm"
                                            })
                                        ]
                                    }) : null,
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Title, {
                                        order: 5,
                                        size: "h5",
                                        children: "提示词"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                                        maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                                        pl: 4,
                                        pr: 4,
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Textarea, {
                                                label: "系统提示词",
                                                placeholder: "输入系统提示词",
                                                ...form.getInputProps("system_message"),
                                                description: "系统提示词作为第一个输入给大语言模型的文本，往往用来设定角色"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Textarea, {
                                                withAsterisk: true,
                                                label: "提示词模板",
                                                placeholder: "",
                                                ...form.getInputProps("prompt_template"),
                                                minRows: 6,
                                                description: "提示词模板可以将检索的结果context和用户的输入query整合到一起，最后整体输入给大语言模型"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Divider, {
                                        my: "sm"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Title, {
                                        order: 5,
                                        size: "h5",
                                        children: "数据集"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                                        maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                                        pl: 4,
                                        pr: 4,
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Group, {
                                            grow: true,
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.MultiSelect, {
                                                    data: documentSelectData,
                                                    description: "文档数据集用来做模型检索",
                                                    label: "文档数据集",
                                                    placeholder: "添加模糊数据集",
                                                    ...form.getInputProps("fuzzy_datasets")
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.MultiSelect, {
                                                    data: qaSelectData,
                                                    description: "问答数据集用来做精确匹配",
                                                    label: "问答数据集",
                                                    placeholder: "添加精准数据集",
                                                    ...form.getInputProps("exact_datasets")
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Divider, {
                                        my: "sm"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Title, {
                                        order: 5,
                                        size: "h5",
                                        children: "基础模型"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                                        maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                                        pl: 4,
                                        pr: 4,
                                        mb: 12,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Select, {
                                            withAsterisk: true,
                                            data: modelSelectData,
                                            description: "LLM代理是大语言模型的代理服务，通过opneai范式的兼容，可以任意切换不同类型的LLM而不用修改业务代码",
                                            label: "LLM代理",
                                            placeholder: "",
                                            ...form.getInputProps("model_id")
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Divider, {
                                        my: "sm"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            width: "50%"
                        },
                        children: [
                            containerType !== ContainerType.CHAT ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Title, {
                                order: 4,
                                mb: 8,
                                children: "高级设置"
                            }) : null,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Paper, {
                                shadow: "xs",
                                p: "md",
                                withBorder: true,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Title, {
                                        order: 5,
                                        size: "h5",
                                        children: "答案召回"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                                        maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                                        pl: 4,
                                        pr: 4,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Group, {
                                                grow: true,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                                                        withAsterisk: true,
                                                        description: "文档数据检索的精度，取值0-1之间，建议取0.6~0.8",
                                                        label: "文档结果召回精度",
                                                        placeholder: "",
                                                        ...form.getInputProps("fuzzy_search_similarity")
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                                                        withAsterisk: true,
                                                        description: "问答数据检索的精度，取值0-1之间，建议取0.9~1",
                                                        label: "问答结果召回精度",
                                                        placeholder: "",
                                                        ...form.getInputProps("exact_search_similarity")
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Group, {
                                                grow: true,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.NumberInput, {
                                                        withAsterisk: true,
                                                        description: "文档结果的召回数量，数量越多信息越丰富，但是首先于LLM上下文长度，不宜过长",
                                                        label: "文档结果召回数量",
                                                        placeholder: "",
                                                        ...form.getInputProps("fuzzy_search_limit")
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.NumberInput, {
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
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Divider, {
                                        my: "sm"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Title, {
                                        order: 5,
                                        size: "h5",
                                        children: "大语言模型参数"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                                        maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                                        pl: 4,
                                        pr: 4,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Group, {
                                                grow: true,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                                                        withAsterisk: true,
                                                        label: "temperature",
                                                        placeholder: "",
                                                        ...form.getInputProps("temperature")
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                                                        withAsterisk: true,
                                                        label: "top_p",
                                                        placeholder: "",
                                                        ...form.getInputProps("top_p")
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Group, {
                                                grow: true,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                                                        withAsterisk: true,
                                                        label: "n_sequences",
                                                        placeholder: "",
                                                        ...form.getInputProps("n_sequences")
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                                                        withAsterisk: true,
                                                        label: "max_tokens",
                                                        placeholder: "",
                                                        ...form.getInputProps("max_tokens")
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Group, {
                                                grow: true,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                                                        withAsterisk: true,
                                                        label: "presence_penalty",
                                                        placeholder: "",
                                                        ...form.getInputProps("presence_penalty")
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                                                        withAsterisk: true,
                                                        label: "frequency_penalty",
                                                        placeholder: "",
                                                        ...form.getInputProps("frequency_penalty")
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                                                label: "logit_bias",
                                                placeholder: "",
                                                ...form.getInputProps("logit_bias"),
                                                width: "50%"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Divider, {
                                        my: "sm"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                maw: constants_index__WEBPACK_IMPORTED_MODULE_12__/* .FORM_WIDTH_1280 */ .cy,
                pt: 4,
                style: {
                    textAlign: "center",
                    width: "100%"
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                    style: {
                        width: "100%"
                    },
                    onClick: async ()=>{
                        form.validate();
                        if (form.isValid()) {
                            setLoading(true);
                            const values = form.values;
                            if (!isEdit) {
                                await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .addKnowledgeBase */ .uA)(values);
                            } else {
                                await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .updateKnowledgeBase */ .CH)(values.id, values);
                            }
                            await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .getKnowledgeBaseList */ .Co)(appId);
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
function AddOrUpdate({ appId  }) {
    const open = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().open;
    const setOpen = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().setOpen;
    const isEdit = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().isEdit;
    const setEditStatus = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().setEditStatus;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Modal, {
        opened: open,
        onClose: ()=>{
            setEditStatus(false);
            setOpen(false);
        },
        title: isEdit ? "编辑知识库" : "创建知识库",
        centered: true,
        size: "55%",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(KnowledgeBaseForm, {
            appId: appId
        })
    });
}
function ChatDrawer({ appId  }) {
    const chatDrawer = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().chatDrawer;
    const setChatDrawer = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().setChatDrawer;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Drawer, {
        opened: chatDrawer,
        onClose: ()=>{
            setChatDrawer(false);
        },
        title: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Text, {
                    fz: "xl",
                    children: "知识库调试"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Text, {
                    fz: "sm",
                    children: "您可以通过提示词调整，数据集切换，模型服务，以及切换模型参数来调整知识库问答的效果"
                })
            ]
        }),
        position: "right",
        size: "90%",
        overlayProps: {
            opacity: 0.5,
            blur: 4
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Flex, {
            mih: 50,
            direction: "row",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    style: {
                        width: "60%"
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            style: {
                                marginBottom: 12
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Badge, {
                                color: "orange",
                                size: "lg",
                                radius: "xs",
                                variant: "filled",
                                children: "知识库参数设置"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(KnowledgeBaseForm, {
                            appId: appId,
                            containerType: ContainerType.CHAT
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    style: {
                        marginLeft: 12,
                        borderLeft: "1px solid #eee",
                        paddingLeft: 8,
                        width: "40%"
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Badge, {
                                color: "orange",
                                size: "lg",
                                radius: "xs",
                                variant: "filled",
                                children: "知识库问答"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(features_chat__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {})
                    ]
                })
            ]
        })
    });
}
function List({ appId  }) {
    const knowledgeBaseList = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().knowledgeBaseList;
    const setLoading = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().setLoading;
    const updateCurrentKnowledgeBase = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().updateCurrentKnowledgeBase;
    const setEditStatus = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().setEditStatus;
    const setOpen = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().setOpen;
    const setChatDrawer = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().setChatDrawer;
    const generateToken = async (agentId)=>{
        try {
            setLoading(true);
            await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .refreshToken */ .g$)(agentId);
            await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .getKnowledgeBaseList */ .Co)(appId);
        } catch (e) {
            console.log(e);
        } finally{
            setLoading(false);
        }
    };
    const rows = knowledgeBaseList.map((element)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    style: {
                        width: 20
                    },
                    children: element.id
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    style: {
                        width: 100
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                        href: `/app/${appId}/knowledgeBase/${element.id}/detail`,
                        children: element.name
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    style: {
                        width: 100
                    },
                    children: element.description
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    style: {
                        width: 200
                    },
                    children: element.system_message
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    style: {
                        width: 300
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CopyToClipboard__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                        value: element.prompt_template,
                        content: element.prompt_template
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: element.token ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CopyToClipboard__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                        value: element.token,
                        content: element.token,
                        truncate: true
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                        color: "lime",
                        size: "xs",
                        compact: true,
                        onClick: ()=>generateToken(element.id),
                        children: "生成访问令牌"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: (0,utils_index__WEBPACK_IMPORTED_MODULE_13__/* .formatDateTime */ .o)(element.created)
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                    children: [
                        !element.token ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Tooltip, {
                            label: "需要成访问令牌才可以访问此能力",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                color: "grape",
                                variant: "filled",
                                size: "xs",
                                mr: 4,
                                children: "问答测试"
                            })
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                            color: "grape",
                            variant: "filled",
                            size: "xs",
                            onClick: async ()=>{
                                setEditStatus(true);
                                const knowledgeBase = await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .getKnowledgeBase */ .IV)(element.id);
                                updateCurrentKnowledgeBase(knowledgeBase);
                                setChatDrawer(true);
                            },
                            mr: 4,
                            children: "问答测试"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                            variant: "filled",
                            size: "xs",
                            onClick: async ()=>{
                                setEditStatus(true);
                                const knowledgeBase = await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .getKnowledgeBase */ .IV)(element.id);
                                updateCurrentKnowledgeBase(knowledgeBase);
                                setOpen(true);
                            },
                            mr: 4,
                            children: "编辑"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                            variant: "filled",
                            color: "red",
                            size: "xs",
                            onClick: ()=>{},
                            children: "删除"
                        })
                    ]
                })
            ]
        }, element.id));
    const getKonwledgeBase = async ()=>{
        setLoading(true);
        try {
            await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .getKnowledgeBaseList */ .Co)(appId);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getKonwledgeBase();
    }, [
        appId
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ChatDrawer, {
                appId: appId
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
                                    children: "名称"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "描述"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "系统提示词"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "完整提示词"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "访问token"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                    children: "创建时间"
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
function KnowledgeBasePage({ appId  }) {
    const loading = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().loading;
    const items = [
        {
            title: "应用列表",
            href: "/app"
        },
        {
            title: "知识库",
            href: `/app/${appId}/knowledgeBase`
        }
    ].map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Anchor, {
            href: item.href,
            children: item.title
        }, index));
    const setOpen = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_9__/* .useGlobalStore */ .s6)().setOpen;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            position: "relative"
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.LoadingOverlay, {
                visible: loading,
                overlayOpacity: 0.3
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Breadcrumbs, {
                children: items
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_FeatureDescription__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                title: "知识库",
                description: "知识库使用RAG(Retrieval-Augmented Generation 检索增强生成)技术来将大语言模型跟数据进行结合，以实现更准确的预测"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Box, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                    onClick: ()=>setOpen(true),
                    children: "新建知识库"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AddOrUpdate, {
                appId: appId
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(List, {
                appId: appId
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3905:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IndexPage),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var features_knowledgeBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4784);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([features_knowledgeBase__WEBPACK_IMPORTED_MODULE_1__]);
features_knowledgeBase__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function getServerSideProps(context) {
    const { params  } = context;
    const appId = params.id;
    return {
        props: {
            appId
        }
    };
}
function IndexPage({ appId  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(features_knowledgeBase__WEBPACK_IMPORTED_MODULE_1__/* .KnowledgeBasePage */ .JS, {
        appId: appId
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

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1664,6766,3658,372,2788,4350,4082,2041], () => (__webpack_exec__(3905)));
module.exports = __webpack_exports__;

})();