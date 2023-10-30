"use strict";
exports.id = 3483;
exports.ids = [3483];
exports.modules = {

/***/ 3483:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CH": () => (/* binding */ updateKnowledgeBase),
/* harmony export */   "Co": () => (/* binding */ getKnowledgeBaseList),
/* harmony export */   "IV": () => (/* binding */ getKnowledgeBase),
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
        loading: false,
        isEdit: false,
        updateCurrentKnowledgeBase: (currentKnowledgeBase)=>set((_state)=>{
                return {
                    currentKnowledgeBase
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

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;