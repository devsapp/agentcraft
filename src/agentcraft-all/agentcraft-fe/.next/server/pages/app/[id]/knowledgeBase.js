(() => {
var exports = {};
exports.id = 9470;
exports.ids = [9470];
exports.modules = {

/***/ 9160:
/***/ ((module) => {

// Exports
module.exports = {
	"header": "chat_header__hHER5",
	"apptitle": "chat_apptitle__B3npV",
	"appdescription": "chat_appdescription__vZ9FM",
	"avatar": "chat_avatar__wXfts",
	"link": "chat_link__zjpnr",
	"cloudform": "chat_cloudform__au_vs",
	"textarea": "chat_textarea__9vQ_K",
	"generatebutton": "chat_generatebutton__o27ml",
	"loadingwheel": "chat_loadingwheel__Yow4D",
	"svgicon": "chat_svgicon__tyh_s",
	"messagelist": "chat_messagelist__JEIse",
	"messagelistloading": "chat_messagelistloading__BHTi2",
	"usermessage": "chat_usermessage__cXbBX",
	"usermessagewaiting": "chat_usermessagewaiting__z1r1q",
	"apimessage": "chat_apimessage__lAq52",
	"fadein": "chat_fadein__CJeAc",
	"markdownanswer": "chat_markdownanswer__5IpAO",
	"boticon": "chat_boticon__YscfB",
	"usericon": "chat_usericon__p8gNB",
	"center": "chat_center__GrDZB",
	"cloud": "chat_cloud__0GuLb",
	"pointsnormal": "chat_pointsnormal__6Kvc9",
	"pointsdim": "chat_pointsdim__Z33LI",
	"footer": "chat_footer__GbVW_",
	"code-container": "chat_code-container__Zkhic",
	"copy-btn": "chat_copy-btn__dDi51",
	"feedback-container": "chat_feedback-container__c1YR_",
	"chat-container": "chat_chat-container__uSHvy",
	"loading-gradient": "chat_loading-gradient__74jiP"
};


/***/ }),

/***/ 4193:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_CodeHighlight)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: external "react-syntax-highlighter"
const external_react_syntax_highlighter_namespaceObject = require("react-syntax-highlighter");
;// CONCATENATED MODULE: external "react-syntax-highlighter/dist/cjs/styles/prism"
const prism_namespaceObject = require("react-syntax-highlighter/dist/cjs/styles/prism");
;// CONCATENATED MODULE: ./components/CodeHighlight.tsx




const them = {
    dark: prism_namespaceObject.vscDarkPlus,
    light: prism_namespaceObject.vs
};
const CodeHighlight = (props)=>{
    const { textContent , darkMode , language ="txt"  } = props;
    return /*#__PURE__*/ jsx_runtime_.jsx(external_react_syntax_highlighter_namespaceObject.Prism, {
        style: them.dark,
        language: language,
        PreTag: "div",
        children: String(textContent).replace(/\n$/, "")
    });
};
/* harmony default export */ const components_CodeHighlight = (CodeHighlight);


/***/ }),

/***/ 7511:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3135);
/* harmony import */ var _components_CodeHighlight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4193);
/* harmony import */ var _styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9160);
/* harmony import */ var _styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_markdown__WEBPACK_IMPORTED_MODULE_2__]);
react_markdown__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const MarkdownContent = (props)=>{
    const { textContent , darkMode , className  } = props;
    const [showCopy, setShowCopy] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const copy2Clipboard = async (text)=>{
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand("copy");
            } catch (error) {
                console.log(error);
            }
            document.body.removeChild(textArea);
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_markdown__WEBPACK_IMPORTED_MODULE_2__["default"], {
        linkTarget: "_blank",
        className: className,
        components: {
            code ({ node , inline , className , children , ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_4___default()["code-container"]),
                    onMouseEnter: ()=>setShowCopy(true),
                    onMouseLeave: ()=>setShowCopy(false),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_4___default()["copy-btn"]),
                            style: {
                                visibility: showCopy ? "visible" : "hidden"
                            },
                            onClick: ()=>copy2Clipboard(textContent),
                            children: "Copy"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CodeHighlight__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                darkMode: darkMode,
                                language: match[1],
                                ...props,
                                textContent: String(children).replace(/\n$/, "")
                            })
                        })
                    ]
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("code", {
                    className: className,
                    ...props,
                    children: children
                });
            }
        },
        children: textContent
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MarkdownContent);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2041:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 4784:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ KnowledgeBasePage)
/* harmony export */ });
/* unused harmony export KnowledgeBaseForm */
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
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(32);
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mantine_hooks__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _store_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4350);
/* harmony import */ var _store_dataset__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5417);
/* harmony import */ var utils_index__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(8847);
/* harmony import */ var _types_dataset__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7194);
/* harmony import */ var _components_FeatureDescription__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3658);
/* harmony import */ var _store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3483);
/* harmony import */ var constants_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1407);
/* harmony import */ var _components_CopyToClipboard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(372);
/* harmony import */ var features_chat__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(2041);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store_model__WEBPACK_IMPORTED_MODULE_6__, _store_dataset__WEBPACK_IMPORTED_MODULE_7__, _store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__, features_chat__WEBPACK_IMPORTED_MODULE_12__]);
([_store_model__WEBPACK_IMPORTED_MODULE_6__, _store_dataset__WEBPACK_IMPORTED_MODULE_7__, _store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__, features_chat__WEBPACK_IMPORTED_MODULE_12__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);















var // import styles from './index.module.scss';
ContainerType;
(function(ContainerType) {
    ContainerType[ContainerType["ADD_OR_UPDATE"] = 1] = "ADD_OR_UPDATE";
    ContainerType[ContainerType["CHAT"] = 2] = "CHAT";
})(ContainerType || (ContainerType = {}));
function KnowledgeBaseForm({ appId , containerType  }) {
    const setOpen = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .useGlobalStore */ .s6)().setOpen;
    const isEdit = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .useGlobalStore */ .s6)().isEdit;
    const currentKnowledgeBase = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .useGlobalStore */ .s6)().currentKnowledgeBase;
    const setLoading = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .useGlobalStore */ .s6)().setLoading;
    const modelList = (0,_store_model__WEBPACK_IMPORTED_MODULE_6__/* .useGlobalStore */ .s6)().modelList;
    const dataSetList = (0,_store_dataset__WEBPACK_IMPORTED_MODULE_7__/* .useGlobalStore */ .s6)().dataSetList;
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
        (0,_store_model__WEBPACK_IMPORTED_MODULE_6__/* .getModelList */ .fZ)();
        (0,_store_dataset__WEBPACK_IMPORTED_MODULE_7__/* .getDataSetList */ .ln)();
        if (isEdit) {
            const datasets = currentKnowledgeBase?.datasets;
            form.setValues({
                id: currentKnowledgeBase?.id,
                name: currentKnowledgeBase?.name,
                description: currentKnowledgeBase?.description,
                prompt_template: currentKnowledgeBase?.prompt_template,
                app_id: currentKnowledgeBase?.app_id,
                exact_datasets: datasets?.filter((item)=>item.dataset_type === _types_dataset__WEBPACK_IMPORTED_MODULE_8__/* .DataSetType.QUESTION */ .I.QUESTION).map((item)=>item.dataset_id),
                fuzzy_datasets: datasets?.filter((item)=>item.dataset_type === _types_dataset__WEBPACK_IMPORTED_MODULE_8__/* .DataSetType.DOCUMENT */ .I.DOCUMENT).map((item)=>item.dataset_id),
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
    const documentSelectData = dataSetList.filter((item)=>item.dataset_type == _types_dataset__WEBPACK_IMPORTED_MODULE_8__/* .DataSetType.DOCUMENT */ .I.DOCUMENT).map((item)=>{
        return {
            label: item.name,
            value: item.id
        };
    });
    const qaSelectData = dataSetList.filter((item)=>item.dataset_type == _types_dataset__WEBPACK_IMPORTED_MODULE_8__/* .DataSetType.QUESTION */ .I.QUESTION).map((item)=>{
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
                                                maw: constants_index__WEBPACK_IMPORTED_MODULE_13__/* .FORM_WIDTH_1280 */ .cy,
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
                                        maw: constants_index__WEBPACK_IMPORTED_MODULE_13__/* .FORM_WIDTH_1280 */ .cy,
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
                                        maw: constants_index__WEBPACK_IMPORTED_MODULE_13__/* .FORM_WIDTH_1280 */ .cy,
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
                                        maw: constants_index__WEBPACK_IMPORTED_MODULE_13__/* .FORM_WIDTH_1280 */ .cy,
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
                                        maw: constants_index__WEBPACK_IMPORTED_MODULE_13__/* .FORM_WIDTH_1280 */ .cy,
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
                                        maw: constants_index__WEBPACK_IMPORTED_MODULE_13__/* .FORM_WIDTH_1280 */ .cy,
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
                maw: constants_index__WEBPACK_IMPORTED_MODULE_13__/* .FORM_WIDTH_1280 */ .cy,
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
                                await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .addKnowledgeBase */ .uA)(values);
                            } else {
                                await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .updateKnowledgeBase */ .CH)(values.id, values);
                            }
                            await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .getKnowledgeBaseList */ .Co)(appId);
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
    const open = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .useGlobalStore */ .s6)().open;
    const setOpen = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .useGlobalStore */ .s6)().setOpen;
    const isEdit = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .useGlobalStore */ .s6)().isEdit;
    const setEditStatus = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .useGlobalStore */ .s6)().setEditStatus;
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
function List({ appId  }) {
    const knowledgeBaseList = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .useGlobalStore */ .s6)().knowledgeBaseList;
    const setLoading = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .useGlobalStore */ .s6)().setLoading;
    const updateCurrentKnowledgeBase = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .useGlobalStore */ .s6)().updateCurrentKnowledgeBase;
    const setEditStatus = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .useGlobalStore */ .s6)().setEditStatus;
    const setOpen = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .useGlobalStore */ .s6)().setOpen;
    const [opened, { open , close  }] = (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_5__.useDisclosure)(false);
    const generateToken = async (agentId)=>{
        try {
            setLoading(true);
            await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .refreshToken */ .g$)(agentId);
            await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .getKnowledgeBaseList */ .Co)(appId);
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
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CopyToClipboard__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                        value: element.prompt_template,
                        content: element.prompt_template
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: element.token ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CopyToClipboard__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
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
                    children: (0,utils_index__WEBPACK_IMPORTED_MODULE_14__/* .formatDateTime */ .o)(element.created)
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
                                const knowledgeBase = await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .getKnowledgeBase */ .IV)(element.id);
                                updateCurrentKnowledgeBase(knowledgeBase);
                                open();
                            },
                            mr: 4,
                            children: "问答测试"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                            variant: "filled",
                            size: "xs",
                            onClick: async ()=>{
                                setEditStatus(true);
                                const knowledgeBase = await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .getKnowledgeBase */ .IV)(element.id);
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
            await (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .getKnowledgeBaseList */ .Co)(appId);
        } catch (e) {}
        setLoading(false);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getKonwledgeBase();
    }, [
        appId
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Drawer, {
                opened: opened,
                onClose: close,
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
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(features_chat__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {})
                            ]
                        })
                    ]
                })
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
    const loading = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .useGlobalStore */ .s6)().loading;
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
    const setOpen = (0,_store_knowledgeBase__WEBPACK_IMPORTED_MODULE_10__/* .useGlobalStore */ .s6)().setOpen;
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
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_FeatureDescription__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
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

"use strict";
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
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(features_knowledgeBase__WEBPACK_IMPORTED_MODULE_1__/* .KnowledgeBasePage */ .J, {
        appId: appId
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1060:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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


/***/ }),

/***/ 8847:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
module.exports = require("@mantine/core");

/***/ }),

/***/ 9445:
/***/ ((module) => {

"use strict";
module.exports = require("@mantine/form");

/***/ }),

/***/ 32:
/***/ ((module) => {

"use strict";
module.exports = require("@mantine/hooks");

/***/ }),

/***/ 2236:
/***/ ((module) => {

"use strict";
module.exports = require("@tabler/icons-react");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 4827:
/***/ ((module) => {

"use strict";
module.exports = import("@fortaine/fetch-event-source");;

/***/ }),

/***/ 3135:
/***/ ((module) => {

"use strict";
module.exports = import("react-markdown");;

/***/ }),

/***/ 6912:
/***/ ((module) => {

"use strict";
module.exports = import("zustand");;

/***/ }),

/***/ 3602:
/***/ ((module) => {

"use strict";
module.exports = import("zustand/middleware");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1664,6766,3658,372,4350,4082,2788,3483], () => (__webpack_exec__(3905)));
module.exports = __webpack_exports__;

})();