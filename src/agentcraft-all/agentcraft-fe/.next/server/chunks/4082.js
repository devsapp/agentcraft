"use strict";
exports.id = 4082;
exports.ids = [4082];
exports.modules = {

/***/ 5417:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cv": () => (/* binding */ addDataSet),
/* harmony export */   "ln": () => (/* binding */ getDataSetList),
/* harmony export */   "s6": () => (/* binding */ useGlobalStore),
/* harmony export */   "uo": () => (/* binding */ deleteDataSet)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6912);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3602);
/* harmony import */ var _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8417);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__]);
([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const useGlobalStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)((set)=>({
        dataSetList: [],
        open: false,
        loading: false,
        updateDataSetList: (dataSetList)=>set((_state)=>({
                    dataSetList
                })),
        setLoading: (status)=>set((_state)=>{
                return {
                    loading: status
                };
            }),
        setOpen: (status)=>set((_state)=>{
                return {
                    open: status
                };
            })
    })));
/**
 * 获取数据集列表
 */ async function getDataSetList() {
    const state = useGlobalStore.getState();
    const updatedataSetList = state.updateDataSetList;
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)("/api/dataset/list");
    const data = res.data;
    if (data) {
        updatedataSetList(data);
    }
}
async function deleteDataSet(id) {
    return await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/dataset/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
}
async function addDataSet(payload) {
    return await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)("/api/dataset/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7194:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ DataSetType)
/* harmony export */ });
var DataSetType;
(function(DataSetType) {
    DataSetType[DataSetType["QUESTION"] = 1] = "QUESTION";
    DataSetType[DataSetType["DOCUMENT"] = 2] = "DOCUMENT";
})(DataSetType || (DataSetType = {}));


/***/ })

};
;