"use strict";
exports.id = 2041;
exports.ids = [2041];
exports.modules = {

/***/ 2041:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Home)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_MarkdownContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7511);
/* harmony import */ var _store_chat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2788);
/* harmony import */ var _types_chat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1060);
/* harmony import */ var _store_knowledgeBase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3483);
/* harmony import */ var _styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9160);
/* harmony import */ var _styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_MarkdownContent__WEBPACK_IMPORTED_MODULE_3__, _store_chat__WEBPACK_IMPORTED_MODULE_4__, _store_knowledgeBase__WEBPACK_IMPORTED_MODULE_6__]);
([_components_MarkdownContent__WEBPACK_IMPORTED_MODULE_3__, _store_chat__WEBPACK_IMPORTED_MODULE_4__, _store_knowledgeBase__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const defaultPrompt = ``;
function Home({ fromChat =false  }) {
    const currentKnowledgeBase = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_6__/* .useGlobalStore */ .s6)().currentKnowledgeBase;
    const [userInput, setUserInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultPrompt);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(currentKnowledgeBase.system_message ? [
        {
            message: currentKnowledgeBase.system_message,
            sourceIdx: -1,
            type: _types_chat__WEBPACK_IMPORTED_MODULE_5__/* .MessageType.SYSTEM */ .Cs.SYSTEM,
            showFeedback: false,
            liked: false,
            disLiked: false
        }
    ] : []);
    const messageListRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const textAreaRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const messageList = messageListRef.current;
        messageList.scrollTop = messageList.scrollHeight;
    }, [
        messages
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        textAreaRef.current.focus();
    }, []);
    const handleError = (e)=>{
        setMessages((prevMessages)=>[
                ...prevMessages,
                {
                    message: e.message,
                    type: _types_chat__WEBPACK_IMPORTED_MODULE_5__/* .MessageType.ASSISTANT */ .Cs.ASSISTANT,
                    sourceIdx: -1,
                    showFeedback: false,
                    liked: false,
                    disLiked: false
                }
            ]);
        setLoading(false);
        setUserInput("");
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (userInput.trim() === "") {
            return;
        }
        let currentMessage = [
            ...messages,
            {
                message: userInput,
                type: _types_chat__WEBPACK_IMPORTED_MODULE_5__/* .MessageType.USER */ .Cs.USER,
                sourceIdx: -1,
                showFeedback: false,
                liked: false,
                disLiked: false
            }
        ];
        setLoading(true);
        setMessages(currentMessage);
        try {
            const _preMessages = JSON.parse(JSON.stringify(currentMessage));
            const newMessage = {
                message: "",
                type: "assistant",
                sourceIdx: -1,
                showFeedback: false,
                liked: false,
                disLiked: false
            };
            setUserInput("");
            await (0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .chatStream */ .dr)({
                messages: [
                    {
                        role: "user",
                        content: userInput
                    }
                ],
                config: {
                    stream: true,
                    max_tokens: 1024
                },
                onFinish: (msg)=>{
                    setLoading(false);
                },
                onUpdate: (responseText, delta)=>{
                    newMessage.message += delta;
                    console.log(delta, "delta");
                    setMessages([
                        ..._preMessages,
                        newMessage
                    ]);
                }
            }, currentKnowledgeBase.token);
        } catch (e) {
            handleError(e);
        }
    };
    const handleEnter = (e)=>{
        if (e.keyCode === 13 && userInput) {
            if (!e.shiftKey && userInput) {
                handleSubmit(e);
            }
        } else if (e.key === "Enter") {
            e.preventDefault();
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
            className: (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default().main),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default().cloud),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        ref: messageListRef,
                        className: (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default().messagelist),
                        children: messages.map((message, index)=>{
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: message.type === _types_chat__WEBPACK_IMPORTED_MODULE_5__/* .MessageType.USER */ .Cs.USER && loading && index === messages.length - 1 ? (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default().usermessagewaiting) : message.type !== _types_chat__WEBPACK_IMPORTED_MODULE_5__/* .MessageType.USER */ .Cs.USER ? (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default().apimessage) : (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default().usermessage),
                                children: [
                                    message.type !== _types_chat__WEBPACK_IMPORTED_MODULE_5__/* .MessageType.USER */ .Cs.USER ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default().avatar),
                                        onClick: handleError,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                            viewBox: "0 0 1024 1024",
                                            version: "1.1",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            "p-id": "2573",
                                            width: "24",
                                            height: "24",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                fill: "#E4782C",
                                                d: "M512 1024c-80.64-74.88-77.354667-159.701333-77.354667-159.701333h154.709334S592.64 949.12 512 1024z m0-939.178667c-68.053333 89.856-200.234667 294.101333-200.234667 524.416 0 66.645333 12.501333 122.453333 25.130667 161.834667h350.208c12.629333-39.381333 25.130667-95.189333 25.130667-161.834667 0-230.314667-132.181333-434.56-200.234667-524.416z m253.866667 524.416c0 151.722667-58.154667 251.861333-58.154667 251.861334l-62.208-36.394667H378.496l-62.208 36.394667S258.133333 760.96 258.133333 609.237333C258.133333 275.029333 511.914667 0.085333 512 0c0.085333 0.085333 253.866667 275.029333 253.866667 609.237333z m35.114666 99.626667c0 58.154667-25.813333 121.386667-43.605333 148.053333h123.264l-13.653333-83.84-66.005334-64.213333zM157.013333 773.12l-13.653333 83.84h123.264c-17.834667-26.666667-43.605333-89.898667-43.605333-148.053333L157.013333 773.12z m306.645334-242.005333a11.946667 11.946667 0 1 0 0 23.808 11.946667 11.946667 0 0 0 0-23.808z m38.186666 0a11.946667 11.946667 0 1 0 0 23.808 11.946667 11.946667 0 0 0 0-23.808z m38.186667 0a11.946667 11.946667 0 1 0 0 23.808 11.946667 11.946667 0 0 0 0-23.808z m130.474667 150.698666a61.653333 61.653333 0 1 1-115.2-30.677333l-15.402667-21.034667a94.677333 94.677333 0 0 1-99.626667-14.72l-17.194666 14.933334a36.906667 36.906667 0 1 1-36.053334-29.184c4.437333 0 8.618667 0.896 12.544 2.346666l18.304-15.914666a94.592 94.592 0 0 1 8.277334-101.973334l-19.242667-20.906666c-1.408 0.170667-2.773333 0.426667-4.181333 0.426666a31.36 31.36 0 1 1 30.549333-24.490666l19.413333 21.12a94.592 94.592 0 0 1 95.872-1.536l16.426667-16.426667a48.810667 48.810667 0 1 1 30.293333 30.293333l-15.061333 15.061334a94.634667 94.634667 0 0 1-5.888 115.370666l14.037333 19.157334c6.442667-2.261333 13.312-3.584 20.522667-3.584a61.738667 61.738667 0 0 1 61.610667 61.738666z m-168.661334-63.957333a74.837333 74.837333 0 1 0 0-149.632 74.837333 74.837333 0 0 0 0 149.632z",
                                                "p-id": "2574"
                                            })
                                        })
                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default().avatar),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                            viewBox: "0 0 1024 1024",
                                            version: "1.1",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            "p-id": "3538",
                                            width: "24",
                                            height: "24",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                d: "M858.5 763.6c-18.9-44.8-46.1-85-80.6-119.5-34.5-34.5-74.7-61.6-119.5-80.6-0.4-0.2-0.8-0.3-1.2-0.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-0.4 0.2-0.8 0.3-1.2 0.5-44.8 18.9-85 46-119.5 80.6-34.5 34.5-61.6 74.7-80.6 119.5C146.9 807.5 137 854 136 901.8c-0.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c0.1 4.4 3.6 7.8 8 7.8h60c4.5 0 8.1-3.7 8-8.2-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z",
                                                "p-id": "3539"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default().markdownanswer),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_MarkdownContent__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                            textContent: message.message
                                        })
                                    })
                                ]
                            }, index);
                        })
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default().center),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default().cloudform),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                            style: {
                                width: "100%"
                            },
                            onSubmit: handleSubmit,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                    disabled: loading,
                                    onKeyDown: handleEnter,
                                    ref: textAreaRef,
                                    autoFocus: false,
                                    rows: 1,
                                    maxLength: 512,
                                    id: "userInput",
                                    name: "userInput",
                                    placeholder: loading ? "等待回复中" : "请输入你的问题",
                                    value: userInput,
                                    onChange: (e)=>setUserInput(e.target.value),
                                    className: (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default().textarea)
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    type: "submit",
                                    disabled: loading,
                                    className: (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default().generatebutton),
                                    children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Loader, {}) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                        viewBox: "0 0 20 20",
                                        className: (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default().svgicon),
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                            d: "M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                                        })
                                    })
                                })
                            ]
                        })
                    })
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3483:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CH": () => (/* binding */ updateKnowledgeBase),
/* harmony export */   "Co": () => (/* binding */ getKnowledgeBaseList),
/* harmony export */   "IV": () => (/* binding */ getKnowledgeBase),
/* harmony export */   "Sk": () => (/* binding */ getAccessUrl),
/* harmony export */   "g$": () => (/* binding */ refreshToken),
/* harmony export */   "s6": () => (/* binding */ useGlobalStore),
/* harmony export */   "uA": () => (/* binding */ addKnowledgeBase)
/* harmony export */ });
/* unused harmony export chat */
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6912);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3602);
/* harmony import */ var _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8417);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__]);
([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const useGlobalStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)((set)=>({
        knowledgeBaseList: [],
        knowledgeBaseChatList: [],
        open: false,
        chatDrawer: false,
        loading: false,
        isEdit: false,
        accessUrl: {
            openApiUrl: "",
            innerApiUrl: ""
        },
        currentKnowledgeBase: undefined,
        // 知识库列表
        updateCurrentKnowledgeBase: (currentKnowledgeBase)=>set((_state)=>{
                return {
                    currentKnowledgeBase
                };
            }),
        setChatDrawer: (chatDrawer)=>set((_state)=>{
                return {
                    chatDrawer
                };
            }),
        setAccessUrl: (accessUrl)=>set((_state)=>{
                return {
                    accessUrl
                };
            }),
        setEditStatus: (isEdit)=>set((_state)=>{
                return {
                    isEdit
                };
            }),
        setLoading: (status)=>set((_state)=>{
                return {
                    loading: status
                };
            }),
        setOpen: (status)=>set((_state)=>{
                return {
                    open: status
                };
            }),
        updateKnowledgeBaseList: (knowledgeBaseList)=>set((_state)=>({
                    knowledgeBaseList
                }))
    })));
async function getKnowledgeBaseList(appId) {
    const state = useGlobalStore.getState();
    const updateKnowledgeBaseList = state.updateKnowledgeBaseList;
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/knowledgeBase/list?appId=${appId}`);
    const knowledgeBaseList = res.data;
    if (knowledgeBaseList) updateKnowledgeBaseList(knowledgeBaseList);
}
async function getKnowledgeBase(id) {
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/knowledgeBase/get?id=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.data;
}
async function addKnowledgeBase(payload) {
    return await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)("/api/knowledgeBase/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    });
}
async function updateKnowledgeBase(id, payload) {
    return await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/knowledgeBase/update?id=${id}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    });
}
async function refreshToken(agentId) {
    return await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/knowledgeBase/token?agentId=${agentId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
}
async function chat(payload) {
    const res = await request(`/api/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    return res;
}
async function getAccessUrl() {
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/knowledgeBase/getAccessUrl`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1060:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cs": () => (/* binding */ MessageType)
/* harmony export */ });
/* unused harmony exports ROLES, Models, ChatSentimentClassification */
const ROLES = (/* unused pure expression or super */ null && ([
    "system",
    "user",
    "assistant"
]));
const Models = (/* unused pure expression or super */ null && ([
    "gpt-3.5-turbo",
    "gpt-4"
]));
var MessageType;
(function(MessageType) {
    MessageType["SYSTEM"] = "system";
    MessageType["USER"] = "user";
    MessageType["ASSISTANT"] = "assistant";
})(MessageType || (MessageType = {}));
var ChatSentimentClassification;
(function(ChatSentimentClassification) {
    ChatSentimentClassification[ChatSentimentClassification["NOTLABELED"] = 0] = "NOTLABELED";
    ChatSentimentClassification[ChatSentimentClassification["NEUTRAL"] = 2] = "NEUTRAL";
    ChatSentimentClassification[ChatSentimentClassification["POSITIVE"] = 1] = "POSITIVE";
})(ChatSentimentClassification || (ChatSentimentClassification = {}));


/***/ })

};
;