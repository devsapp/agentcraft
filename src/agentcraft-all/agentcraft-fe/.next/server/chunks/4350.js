"use strict";
exports.id = 4350;
exports.ids = [4350];
exports.modules = {

/***/ 4350:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$s": () => (/* binding */ deleteModel),
/* harmony export */   "QB": () => (/* binding */ updateModel),
/* harmony export */   "fZ": () => (/* binding */ getModelList),
/* harmony export */   "mS": () => (/* binding */ addModel),
/* harmony export */   "s6": () => (/* binding */ useGlobalStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6912);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3602);
/* harmony import */ var _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8417);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__]);
([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const useGlobalStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)((set)=>({
        modelList: [],
        loading: false,
        open: false,
        isEdit: false,
        updateCurrentModel: (currentModel)=>set((_state)=>{
                return {
                    currentModel
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
        updateModelList: (modelList)=>set((_state)=>({
                    modelList
                }))
    })));
async function getModelList() {
    const state = useGlobalStore.getState();
    const updateModelList = state.updateModelList;
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)("/api/model/list");
    const modelList = await res.data;
    if (modelList) {
        updateModelList(modelList);
    }
}
async function deleteModel(id) {
    return await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/model/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
}
async function addModel(payload) {
    return await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)("/api/model/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    });
}
async function updateModel(modelId, payload) {
    return await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/model/update?id=${modelId}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;