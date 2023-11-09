exports.id = 7511;
exports.ids = [7511];
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

/***/ 7612:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(727);
/* harmony import */ var react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_syntax_highlighter_dist_cjs_styles_prism__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4794);
/* harmony import */ var react_syntax_highlighter_dist_cjs_styles_prism__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_syntax_highlighter_dist_cjs_styles_prism__WEBPACK_IMPORTED_MODULE_3__);




const them = {
    dark: react_syntax_highlighter_dist_cjs_styles_prism__WEBPACK_IMPORTED_MODULE_3__.vscDarkPlus,
    light: react_syntax_highlighter_dist_cjs_styles_prism__WEBPACK_IMPORTED_MODULE_3__.vs
};
const CodeHighlight = (props)=>{
    const { textContent , darkMode , language ="txt"  } = props;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_2__.Prism, {
        style: them.dark,
        language: language,
        PreTag: "div",
        children: String(textContent).replace(/\n$/, "")
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CodeHighlight);


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
/* harmony import */ var _components_CodeHighlight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7612);
/* harmony import */ var remark_math__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9832);
/* harmony import */ var remark_breaks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7984);
/* harmony import */ var remark_gfm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6809);
/* harmony import */ var _styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9160);
/* harmony import */ var _styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_markdown__WEBPACK_IMPORTED_MODULE_2__, remark_math__WEBPACK_IMPORTED_MODULE_4__, remark_breaks__WEBPACK_IMPORTED_MODULE_5__, remark_gfm__WEBPACK_IMPORTED_MODULE_6__]);
([react_markdown__WEBPACK_IMPORTED_MODULE_2__, remark_math__WEBPACK_IMPORTED_MODULE_4__, remark_breaks__WEBPACK_IMPORTED_MODULE_5__, remark_gfm__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






// import RehypeKatex from "rehype-katex";


const MarkdownContent = (props)=>{
    const { textContent , darkMode , className , value  } = props;
    const [showCopy, setShowCopy] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const copy2Clipboard = async (text)=>{
        try {
            await navigator.clipboard.writeText(text);
            alert("复制成功");
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
            alert("复制成功");
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_markdown__WEBPACK_IMPORTED_MODULE_2__["default"], {
        linkTarget: "_blank",
        className: className,
        remarkPlugins: [
            remark_math__WEBPACK_IMPORTED_MODULE_4__["default"],
            remark_gfm__WEBPACK_IMPORTED_MODULE_6__["default"],
            remark_breaks__WEBPACK_IMPORTED_MODULE_5__["default"]
        ],
        components: {
            code ({ node , inline , className , children , ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default()["code-container"]),
                    onMouseEnter: ()=>setShowCopy(true),
                    onMouseLeave: ()=>setShowCopy(false),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: (_styles_chat_module_scss__WEBPACK_IMPORTED_MODULE_7___default()["copy-btn"]),
                            style: {
                                visibility: showCopy ? "visible" : "hidden"
                            },
                            onClick: ()=>copy2Clipboard(value || textContent),
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

/***/ })

};
;