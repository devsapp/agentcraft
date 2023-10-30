"use strict";
exports.id = 9911;
exports.ids = [9911];
exports.modules = {

/***/ 9911:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FR": () => (/* binding */ APP_STATUS),
/* harmony export */   "Yo": () => (/* binding */ getFoundationModel),
/* harmony export */   "bQ": () => (/* binding */ useFoundationModelStore),
/* harmony export */   "ff": () => (/* binding */ deleteFoundationModel),
/* harmony export */   "iO": () => (/* binding */ addFoundationModel),
/* harmony export */   "im": () => (/* binding */ getFoundationModelList)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6912);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3602);
/* harmony import */ var _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8417);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__]);
([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



var APP_STATUS;
(function(APP_STATUS) {
    APP_STATUS[APP_STATUS["INIT"] = 1] = "INIT";
    APP_STATUS[APP_STATUS["CREATING"] = 2] = "CREATING";
    APP_STATUS[APP_STATUS["SUCCESS"] = 3] = "SUCCESS";
    APP_STATUS[APP_STATUS["FAILED"] = 4] = "FAILED";
})(APP_STATUS || (APP_STATUS = {}));
const useFoundationModelStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)((set)=>({
        foundationModelList: [],
        loading: false,
        createLoading: false,
        open: false,
        fmTemplate: {},
        appStatus: 1,
        currentFoundationModel: {},
        setCurrentFoundationModel: (currentFoundationModel)=>set((_state)=>{
                return {
                    currentFoundationModel
                };
            }),
        setAppStatus: (appStatus)=>set((_state)=>{
                return {
                    appStatus
                };
            }),
        setFmTemplate: (_fmTemplate)=>set((_state)=>{
                return {
                    fmTemplate: _fmTemplate
                };
            }),
        setCreateLoading: (createLoading)=>set((_state)=>{
                return {
                    createLoading
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
        updateFoundationModelList: (foundationModelList)=>set((_state)=>({
                    foundationModelList
                }))
    })));
async function getFoundationModelList() {
    const state = useFoundationModelStore.getState();
    const updateFoundationModelList = state.updateFoundationModelList;
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/infra/alibaba-cloud/listApps`);
    const foundationModelList = res.data;
    if (foundationModelList) updateFoundationModelList(foundationModelList);
}
async function getFoundationModel(appName) {
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/infra/alibaba-cloud/getApp?appName=${appName}`);
    return res.data;
}
async function deleteFoundationModel(appName) {
    return await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/infra/alibaba-cloud/deleteApp?appName=${appName}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
}
async function addFoundationModel(template, payload) {
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/infra/alibaba-cloud/createApp?template=${template}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.data;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;