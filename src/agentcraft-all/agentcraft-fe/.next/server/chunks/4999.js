"use strict";
exports.id = 4999;
exports.ids = [4999];
exports.modules = {

/***/ 9494:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$s": () => (/* binding */ addDataSourceByUploadFile),
/* harmony export */   "J_": () => (/* binding */ addDataSource),
/* harmony export */   "s6": () => (/* binding */ useGlobalStore),
/* harmony export */   "xU": () => (/* binding */ deleteDataSource),
/* harmony export */   "z9": () => (/* binding */ getDataSourceList)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6912);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3602);
/* harmony import */ var _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8417);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__]);
([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const useGlobalStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)((set)=>({
        dataSourceList: [],
        loading: false,
        open: false,
        openUploadModel: false,
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
        setOpenUploadModel: (status)=>set((_state)=>{
                return {
                    openUploadModel: status
                };
            }),
        updatedataSourceList: (dataSourceList)=>set((_state)=>({
                    dataSourceList
                }))
    })));
/**
 * 获取数据源列表
 * @param ddataSetId 
 * @param datasetType 
 */ async function getDataSourceList(dataSetId, dataSetType) {
    const state = useGlobalStore.getState();
    const updatedataSourceList = state.updatedataSourceList;
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/dataset/${dataSetId}/datasource/list?dataSetType=${dataSetType}`);
    const dataSourceList = res.data;
    if (dataSourceList) updatedataSourceList(dataSourceList);
}
async function deleteDataSource({ dataSetId , dataSetType , dataSourceId  }) {
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/dataset/${dataSetId}/datasource/delete?dataSetType=${dataSetType}&dataSourceId=${dataSourceId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    await res;
}
async function addDataSource({ dataSetId , dataSetType  }, payload) {
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/dataset/${dataSetId}/datasource/create?dataSetType=${dataSetType}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    });
    await res;
}
async function addDataSourceByUploadFile({ dataSetId  }, payload) {
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/dataset/${dataSetId}/datasource/upload`, {
        method: "POST",
        body: payload,
        headers: {}
    });
    await res;
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


/***/ }),

/***/ 8847:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ti": () => (/* binding */ obscureString),
/* harmony export */   "o0": () => (/* binding */ formatDateTime)
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
function obscureString(str) {
    if (!str) {
        return "";
    }
    return str.replace(/./g, "*");
}


/***/ })

};
;