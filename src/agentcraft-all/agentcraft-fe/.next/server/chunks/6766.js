"use strict";
exports.id = 6766;
exports.ids = [6766];
exports.modules = {

/***/ 1407:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "As": () => (/* binding */ AGENTCRAFT_FUNCTION),
/* harmony export */   "Gf": () => (/* binding */ PROMPT_TEMPLATE),
/* harmony export */   "NH": () => (/* binding */ AGENTCRAFT_QUICK_START),
/* harmony export */   "OC": () => (/* binding */ AGENTCRAFT_SERVICE),
/* harmony export */   "T9": () => (/* binding */ AGENTCRAFT_SYSTEMCONFIG_COMPLETED),
/* harmony export */   "TM": () => (/* binding */ EMBEDDING_TEMPLATE_NAME),
/* harmony export */   "cl": () => (/* binding */ DEFAULT_SYSTEM_PROMPT),
/* harmony export */   "cy": () => (/* binding */ FORM_WIDTH_1280),
/* harmony export */   "hE": () => (/* binding */ FORM_WIDTH),
/* harmony export */   "jx": () => (/* binding */ SYSTEM_AGENTCRAFT),
/* harmony export */   "t5": () => (/* binding */ DEFAULT_MODEL_REQUEST_TIMEOUT),
/* harmony export */   "tb": () => (/* binding */ REQUEST_TIMEOUT_MS),
/* harmony export */   "yp": () => (/* binding */ AGENTCRAFT_TOKEN)
/* harmony export */ });
/* unused harmony export AGENTCRAFT_APP */
const FORM_WIDTH = 640;
const FORM_WIDTH_1280 = 1280;
const DEFAULT_MODEL_REQUEST_TIMEOUT = 600;
const REQUEST_TIMEOUT_MS = 60000;
const AGENTCRAFT_TOKEN = "agent_craft_token";
const AGENTCRAFT_SYSTEMCONFIG_COMPLETED = "agent_craft_systemconfig_completed";
const AGENTCRAFT_QUICK_START = "agentcraft-quick-start";
const SYSTEM_AGENTCRAFT = "SYSTEM_AGPENTCRAFT"; // AgentCraft的核心服务
const AGENTCRAFT_APP = "AgentCraftApp";
const AGENTCRAFT_SERVICE = "AgentCraftService";
const AGENTCRAFT_FUNCTION = "AgentCraftFunction";
const EMBEDDING_TEMPLATE_NAME = "fc-embedding-api";
const PROMPT_TEMPLATE = "已知信息：【{context}】。你需要积极，简洁和专业地来回答```中的问题。如果问题和已知信息没有关系，或者问题存在争议性，请说 “抱歉，无法回答该问题”，不允许编造。问题是：```{query}```";
const DEFAULT_SYSTEM_PROMPT = "你是领域的智能助手，努力帮助解决客户问题";


/***/ }),

/***/ 7583:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O_": () => (/* binding */ useAuthenticationStore),
/* harmony export */   "x4": () => (/* binding */ login),
/* harmony export */   "z2": () => (/* binding */ register)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6912);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3602);
/* harmony import */ var _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8417);
/* harmony import */ var _constants_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1407);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__]);
([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const useAuthenticationStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.persist)((set)=>({
        token: "",
        setToken: (token)=>set({
                token
            })
    }), {
    name: _constants_index__WEBPACK_IMPORTED_MODULE_3__/* .AGENTCRAFT_TOKEN */ .yp
}));
async function login(username, password) {
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)("/api/authentication/login", {
        method: "POST",
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res;
}
async function register(username, password) {
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)("/api/authentication/register", {
        method: "POST",
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8624:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M": () => (/* binding */ HTTP_STATUS)
/* harmony export */ });
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    GONE: 410,
    UNSUPPORTED_MEDIA_TYPE: 415,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
};


/***/ }),

/***/ 8417:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": () => (/* binding */ request)
/* harmony export */ });
/* harmony import */ var _types_httpStatus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8624);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_authentication__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7583);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store_authentication__WEBPACK_IMPORTED_MODULE_2__]);
_store_authentication__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



async function request(url, data) {
    const { token  } = _store_authentication__WEBPACK_IMPORTED_MODULE_2__/* .useAuthenticationStore.getState */ .O_.getState();
    if (!data) {
        data = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };
    }
    if (token) {
        data.headers["Authorization"] = `Bearer ${token || ""}`;
    }
    const res = await fetch(url, data);
    const result = await res.json();
    if (result.code === _types_httpStatus__WEBPACK_IMPORTED_MODULE_0__/* .HTTP_STATUS.UNAUTHORIZED */ .M.UNAUTHORIZED) {
        next_router__WEBPACK_IMPORTED_MODULE_1___default().push("/login");
    }
    return result;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;