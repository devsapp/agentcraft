"use strict";
exports.id = 2788;
exports.ids = [2788];
exports.modules = {

/***/ 4765:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ZP": () => (/* binding */ locales)
});

// UNUSED EXPORTS: ALL_LANG_OPTIONS, AllLangs, changeLang, getISOLang, getLang

;// CONCATENATED MODULE: ./locales/cn.ts
const cn = {
    Error: {
        Unauthorized: "无权限"
    }
};
/* harmony default export */ const locales_cn = (cn);

;// CONCATENATED MODULE: ./utils/merge.ts
function merge(target, source) {
    Object.keys(source).forEach(function(key) {
        if (source[key] && typeof source[key] === "object") {
            merge(target[key] = target[key] || {}, source[key]);
            return;
        }
        target[key] = source[key];
    });
}

;// CONCATENATED MODULE: ./locales/index.ts


const ALL_LANGS = {
    cn: locales_cn
};
const AllLangs = Object.keys(ALL_LANGS);
const ALL_LANG_OPTIONS = {
    cn: "简体中文"
};
const LANG_KEY = "lang";
const DEFAULT_LANG = "cn";
const fallbackLang = locales_cn;
const targetLang = ALL_LANGS[getLang()];
merge(fallbackLang, targetLang);
/* harmony default export */ const locales = (fallbackLang);
function getItem(key) {
    try {
        return localStorage.getItem(key);
    } catch  {
        return null;
    }
}
function setItem(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch  {}
}
function getLanguage() {
    try {
        return navigator.language.toLowerCase();
    } catch  {
        return DEFAULT_LANG;
    }
}
function getLang() {
    const savedLang = getItem(LANG_KEY);
    if (AllLangs.includes(savedLang ?? "")) {
        return savedLang;
    }
    const lang = getLanguage();
    for (const option of AllLangs){
        if (lang.includes(option)) {
            return option;
        }
    }
    return DEFAULT_LANG;
}
function changeLang(lang) {
    setItem(LANG_KEY, lang);
    location.reload();
}
function getISOLang() {
    const isoLangString = {
        cn: "zh-Hans"
    };
    const lang = getLang();
    return isoLangString[lang] ?? lang;
}


/***/ }),

/***/ 2788:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ag": () => (/* binding */ getChatList),
/* harmony export */   "aK": () => (/* binding */ useChatStore),
/* harmony export */   "dr": () => (/* binding */ chatStream)
/* harmony export */ });
/* harmony import */ var _fortaine_fetch_event_source__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4827);
/* harmony import */ var _locales_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4765);
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6912);
/* harmony import */ var constants_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1407);
/* harmony import */ var _utils_chat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8597);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3602);
/* harmony import */ var _utils_clientRequest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8417);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_fortaine_fetch_event_source__WEBPACK_IMPORTED_MODULE_0__, zustand__WEBPACK_IMPORTED_MODULE_2__, zustand_middleware__WEBPACK_IMPORTED_MODULE_3__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_4__]);
([_fortaine_fetch_event_source__WEBPACK_IMPORTED_MODULE_0__, zustand__WEBPACK_IMPORTED_MODULE_2__, zustand_middleware__WEBPACK_IMPORTED_MODULE_3__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const useChatStore = (0,zustand__WEBPACK_IMPORTED_MODULE_2__.create)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_3__.devtools)((set)=>({
        chatList: [],
        open: false,
        loading: false,
        isEdit: false,
        currentChatItem: {},
        updateCurrentChatItem: (currentChatItem)=>set((_state)=>{
                return {
                    currentChatItem
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
        updateChatList: (chatList)=>set((_state)=>{
                return {
                    chatList
                };
            })
    })));
/**
 * 获取数据集列表
 */ async function getChatList(knowledgeBaseId) {
    const state = useChatStore.getState();
    const updateChatList = state.updateChatList;
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_4__/* .request */ .W)(`/api/chat/chatlist?id=${knowledgeBaseId}`);
    const data = res.data;
    if (data) {
        updateChatList(data);
    }
}
async function chatStream(options, token) {
    const controller = new AbortController();
    options.onController?.(controller);
    const chatPayload = await {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        signal: controller.signal,
        body: JSON.stringify(Object.assign({}, options, {
            token
        }))
    };
    const requestTimeoutId = setTimeout(()=>controller.abort(), constants_index__WEBPACK_IMPORTED_MODULE_5__/* .REQUEST_TIMEOUT_MS */ .tb);
    let responseText = "";
    let finished = false;
    const finish = ()=>{
        if (!finished) {
            options.onFinish(responseText);
            finished = true;
        }
    };
    controller.signal.onabort = finish;
    (0,_fortaine_fetch_event_source__WEBPACK_IMPORTED_MODULE_0__.fetchEventSource)("/api/chat", {
        ...chatPayload,
        async onopen (res) {
            clearTimeout(requestTimeoutId);
            const contentType = res.headers.get("content-type");
            console.log("AgentCraft request response content type: ", contentType);
            if (contentType?.startsWith("text/plain")) {
                responseText = await res.clone().text();
                return finish();
            }
            if (!res.ok || !res.headers.get("content-type")?.startsWith(_fortaine_fetch_event_source__WEBPACK_IMPORTED_MODULE_0__.EventStreamContentType) || res.status !== 200) {
                const responseTexts = [
                    responseText
                ];
                let extraInfo = await res.clone().text();
                try {
                    const resJson = await res.clone().json();
                    extraInfo = (0,_utils_chat__WEBPACK_IMPORTED_MODULE_6__/* .prettyObject */ .Bs)(resJson);
                } catch  {}
                if (res.status === 401) {
                    responseTexts.push(_locales_index__WEBPACK_IMPORTED_MODULE_1__/* ["default"].Error.Unauthorized */ .ZP.Error.Unauthorized);
                }
                if (extraInfo) {
                    responseTexts.push(extraInfo);
                }
                responseText = responseTexts.join("\n\n");
                return finish();
            }
        },
        onmessage (msg) {
            if (msg.data === "[DONE]" || finished) {
                return finish();
            }
            const text = msg.data;
            try {
                const json = JSON.parse(text);
                const delta = json.choices[0].delta.content;
                if (delta) {
                    responseText += delta;
                    options.onUpdate?.(responseText, delta);
                }
            } catch (e) {
                console.error("[Request] parse error", text, msg);
            }
        },
        onclose () {
            finish();
        },
        onerror (e) {
            options.onError?.(e);
            throw e;
        },
        openWhenHidden: true
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8597:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bs": () => (/* binding */ prettyObject),
/* harmony export */   "pI": () => (/* binding */ unicodeDecode)
/* harmony export */ });
/* unused harmony export readAndRenderStream */
function unicodeDecode(unicode) {
    let result = unicode;
    try {
        result = JSON.parse(unicode);
    } catch (error) {
        console.error("Invalid URI sequence", error);
    }
    return result;
}
async function readAndRenderStream(readerInstance, renderInvoke, closeCallBack) {
    if (typeof readerInstance !== "undefined") {
        const reader = readerInstance.getReader();
        const decoder = new TextDecoder("utf-8");
        while(true){
            const { done , value  } = await reader.read();
            if (done) {
                closeCallBack && closeCallBack();
                break;
            }
            const _value = decoder.decode(value);
            const msg = JSON.parse('{"data":' + _value.replace("data", "").trim() + "}");
            renderInvoke(decoder.decode(value));
        }
    }
}
function prettyObject(msg) {
    const obj = msg;
    if (typeof msg !== "string") {
        msg = JSON.stringify(msg, null, "  ");
    }
    if (msg === "{}") {
        return obj.toString();
    }
    if (msg.startsWith("```json")) {
        return msg;
    }
    return [
        "```json",
        msg,
        "```"
    ].join("\n");
}


/***/ })

};
;