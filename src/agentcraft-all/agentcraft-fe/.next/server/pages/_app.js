(() => {
var exports = {};
exports.id = 2888;
exports.ids = [2888];
exports.modules = {

/***/ 9299:
/***/ ((module) => {

// Exports
module.exports = {
	"agentcraft-header": "header_agentcraft-header__3PTbK",
	"user": "header_user__WEQyQ",
	"user-content": "header_user-content__gZ3TI",
	"logout": "header_logout__49lOn"
};


/***/ }),

/***/ 4309:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ ALIBABACLOUD_POSTGRESQL_TUTORIAL)
/* harmony export */ });
const ALIBABACLOUD_POSTGRESQL_TUTORIAL = `# 数据库获取实践教程



## 数据库资源领取 （1分钟）

新用户建议先领取免费额度，[点击进入freetair](//free.aliyun.com/?product=9564560&crowd=personal&spm=5176.28055625.J_4VYgf18xNlTAyFFbOuOQe.173.e939154aVMAc9G&scm=20140722.M_9489724._.V_1)

**选择”RDS PostgreSQL Serverless“**

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/38ae4820-2291-4583-9ca9-df897430af87.png)

老用户可以访问[快速创建](//rdsbuy.console.aliyun.com/fastCreate)
## 数据库创建

### 创建数据库实例 
#### 注意这里是Postgresql Serverless类型
![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/ac313cbc-9864-4945-bd07-721a64cf872d.png)

### 注意：
+ 创建vpc的时候最好保持跟当前服务的vpc一致
+ 如果没找到一致的vpc(函数计算的可用区跟数据库的可用区不完全一致)，可以选择默认的vpc，然后数据库开放公网访问进行测试，后续可以在函数计算服务修改vpc

### 以下是当前服务的vpc信息
+ **vpcName是: {{vpcName}}**
+ **vpcId是: {{vpcId}}** 
+ **交换机的名称是: agentcraft-vpc** 
+ **选择的可用区是:K**


![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/da06561c-711a-40b9-8579-951b74b0ff95.png)

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/1f2b443e-a7a0-47e6-90b3-09719e64dfa3.png)

进入控制台等待实例启动 

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/4a92fc9e-499c-445b-b273-43a66c39d88a.png)

### 创建数据库 

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/55f4970b-eb6f-45f8-b188-c0f47e3c466f.png)

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/8156e7c9-8e46-44d7-abb4-2f270cdb8d73.png)

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/ffbf5c7d-bf75-4e63-a71c-4754d33f06f0.png)

### 创建管理账号

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/3afd1698-654e-490c-8fef-666180bdc228.png)

注意选择高权限账号

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/97f0b2f4-1c11-40cd-80ce-7150be363e88.png)

### 数据库连接测试

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/846b2e73-5bc3-46d7-b668-ffc39307676e.png)

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/342ca780-047c-4e05-a545-7be56d09c10a.png)

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/5f90cd8d-92b3-45f0-9dc8-5b80097c3955.png)

### 开通vector插件，并且准备好配置项

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/33a4eb6a-1fce-49a6-bd62-0c0125223040.png)

## 最终配置

### 数据库连接地址 

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/d0188e29-0ddf-4fdc-9c10-6822cdf0edcd.png)

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/8dfb6eb8-9d72-4042-be64-836428e25a08.png)

### 数据库名

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/38053222-2c90-4e79-9ebd-d91f9376bcb6.png)

### 数据库账号 

_上面设置的高权限账号_

### 数据库密码 

_上面设置的高权限账号密码_`;


/***/ }),

/***/ 5590:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ CompleteConfirm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var utils_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8847);




function CompleteConfirm({ embeddingServiceForm , databaseForm  }) {
    const embeddingSerivceValues = embeddingServiceForm.values;
    const databaseValues = databaseForm.values;
    const { EMBEDDING_DIM , EMBEDDING_URL  } = embeddingSerivceValues;
    const { POSTGRES_HOST , POSTGRES_DATABASE , POSTGRES_USER , POSTGRES_PASSWORD  } = databaseValues;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Paper, {
        shadow: "xs",
        p: "xl",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Title, {
                order: 5,
                size: "h5",
                children: "向量服务配置"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Box, {
                pl: 4,
                pr: 4,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                        grow: true,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                children: "向量维度："
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                children: EMBEDDING_DIM
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                        grow: true,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                children: "embedding服务地址："
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                children: EMBEDDING_URL
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Divider, {
                my: "sm"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Title, {
                order: 5,
                size: "h5",
                children: "数据库配置"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Box, {
                pl: 4,
                pr: 4,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                        grow: true,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                children: "数据库地址："
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                children: POSTGRES_HOST
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                        grow: true,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                children: "数据库账号："
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                children: POSTGRES_DATABASE
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                        grow: true,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                children: "数据库用户名："
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                children: POSTGRES_USER
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                        grow: true,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                children: "数据库密码："
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                children: (0,utils_index__WEBPACK_IMPORTED_MODULE_3__/* .obscureString */ .Ti)(POSTGRES_PASSWORD)
                            })
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 9745:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ DataBaseConfig)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mantine_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_MarkdownContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7511);
/* harmony import */ var _constants_postgresql_tutorial__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4309);
/* harmony import */ var _store_systemConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2460);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_MarkdownContent__WEBPACK_IMPORTED_MODULE_4__, _store_systemConfig__WEBPACK_IMPORTED_MODULE_5__]);
([_components_MarkdownContent__WEBPACK_IMPORTED_MODULE_4__, _store_systemConfig__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







// import styles from './index.module.scss';
function dynamicAddition(content, { vpcId , vpcName  }) {
    return content.replace(/{{vpcId}}/g, vpcId).replace(/{{vpcName}}/g, vpcName);
}
function DataBaseConfig({ form  }) {
    const [opened, { open , close  }] = (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_2__.useDisclosure)(false);
    const completeConfig = (0,_store_systemConfig__WEBPACK_IMPORTED_MODULE_5__/* .useSystemConfigStore */ .Po)().completeConfig;
    const vpcInfo = completeConfig?.vpcInfo || {};
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Paper, {
        shadow: "xs",
        p: "xl",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Drawer, {
                opened: opened,
                onClose: close,
                title: "获取阿里云Postgresql Serverless版教程",
                position: "right",
                size: "50%",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    style: {
                        width: window.innerWidth / 2 - 40
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_MarkdownContent__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                        textContent: dynamicAddition(_constants_postgresql_tutorial__WEBPACK_IMPORTED_MODULE_6__/* .ALIBABACLOUD_POSTGRESQL_TUTORIAL */ .g, vpcInfo),
                        className: "markdown-content"
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Text, {
                    weight: 700,
                    children: [
                        "还没有数据库？ ",
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                            onClick: open,
                            variant: "subtle",
                            children: "查看如何免费获取"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                withAsterisk: true,
                label: "数据库地址",
                description: "请输入数据库访问地址",
                placeholder: "示例: mxlpo.pg.rds.aliyuncs.com",
                ...form.getInputProps("POSTGRES_HOST")
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                withAsterisk: true,
                label: "数据库名称",
                description: "请输入数据库名称",
                placeholder: "",
                ...form.getInputProps("POSTGRES_DATABASE")
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.TextInput, {
                withAsterisk: true,
                label: "数据库访问用户名",
                description: "请输入数据库访问用户名",
                placeholder: "",
                ...form.getInputProps("POSTGRES_USER")
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.PasswordInput, {
                withAsterisk: true,
                label: "数据库访问密码",
                description: "请输入数据库访问密码，注意不要带“@”符号",
                placeholder: "",
                ...form.getInputProps("POSTGRES_PASSWORD")
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2139:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ EmbeddingConfig)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5611);
/* harmony import */ var _mantine_modals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1280);
/* harmony import */ var _mantine_modals__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mantine_modals__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var store_foundationModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9911);
/* harmony import */ var constants_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1407);
/* harmony import */ var _store_systemConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2460);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([nanoid__WEBPACK_IMPORTED_MODULE_2__, store_foundationModel__WEBPACK_IMPORTED_MODULE_5__, _store_systemConfig__WEBPACK_IMPORTED_MODULE_6__]);
([nanoid__WEBPACK_IMPORTED_MODULE_2__, store_foundationModel__WEBPACK_IMPORTED_MODULE_5__, _store_systemConfig__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








// import styles from './index.module.scss';
function LoadingStepper() {
    const appStatus = (0,store_foundationModel__WEBPACK_IMPORTED_MODULE_5__/* .useFoundationModelStore */ .bQ)().appStatus;
    const appName = (0,store_foundationModel__WEBPACK_IMPORTED_MODULE_5__/* .useFoundationModelStore */ .bQ)().appName;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                align: "center",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: "创建Embedding服务预计需要1~2分钟，请耐心等待。"
                    }),
                    " ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Anchor, {
                        href: `https://fcnext.console.aliyun.com/applications/${appName}/env/default?tab=envDetail`,
                        target: "_blank",
                        children: "点击查看服务部署信息"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Stepper, {
                active: appStatus,
                breakpoint: "sm",
                mt: 12,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Stepper.Step, {
                        label: "初始化",
                        description: ""
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Stepper.Step, {
                        label: "创建中",
                        description: "",
                        loading: appStatus === store_foundationModel__WEBPACK_IMPORTED_MODULE_5__/* .APP_STATUS.CREATING */ .FR.CREATING
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Stepper.Step, {
                        label: "创建成功/失败",
                        description: ""
                    })
                ]
            })
        ]
    });
}
function EmbeddingConfig({ form  }) {
    const setCreateLoading = (0,store_foundationModel__WEBPACK_IMPORTED_MODULE_5__/* .useFoundationModelStore */ .bQ)().setCreateLoading;
    const createLoading = (0,store_foundationModel__WEBPACK_IMPORTED_MODULE_5__/* .useFoundationModelStore */ .bQ)().createLoading;
    const setAppStatus = (0,store_foundationModel__WEBPACK_IMPORTED_MODULE_5__/* .useFoundationModelStore */ .bQ)().setAppStatus;
    const completeConfig = (0,_store_systemConfig__WEBPACK_IMPORTED_MODULE_6__/* .useSystemConfigStore */ .Po)().completeConfig;
    const setAppName = (0,store_foundationModel__WEBPACK_IMPORTED_MODULE_5__/* .useFoundationModelStore */ .bQ)().setAppName;
    function checkAppStatus(appName) {
        return new Promise((resolve, reject)=>{
            setAppStatus(store_foundationModel__WEBPACK_IMPORTED_MODULE_5__/* .APP_STATUS.CREATING */ .FR.CREATING);
            const timmer = setInterval(async ()=>{
                try {
                    const result = await (0,store_foundationModel__WEBPACK_IMPORTED_MODULE_5__/* .getFoundationModel */ .Yo)(appName);
                    const release = result.lastRelease;
                    if (release.status === "published") {
                        clearInterval(timmer);
                        setAppStatus(store_foundationModel__WEBPACK_IMPORTED_MODULE_5__/* .APP_STATUS.SUCCESS */ .FR.SUCCESS);
                        resolve(release);
                    }
                } catch (e) {
                    reject(e);
                }
            }, 4000);
        });
    }
    async function createEmbeddingService() {
        const addContent = `该操作会使用《阿里云函数计算服务》进行Embedding服务的创建，确认创建吗？`;
        _mantine_modals__WEBPACK_IMPORTED_MODULE_3__.modals.openConfirmModal({
            title: "创建函数计算Embedding服务",
            centered: true,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Text, {
                size: "sm",
                children: addContent
            }),
            labels: {
                confirm: "确定",
                cancel: "取消"
            },
            onCancel: ()=>console.log("Cancel"),
            onConfirm: async ()=>{
                const templateName = constants_index__WEBPACK_IMPORTED_MODULE_7__/* .EMBEDDING_TEMPLATE_NAME */ .TM;
                const parameters = {
                    region: process.env.Region || "cn-hangzhou",
                    serviceName: constants_index__WEBPACK_IMPORTED_MODULE_7__/* .AGENTCRAFT_SERVICE */ .OC,
                    functionName: `${constants_index__WEBPACK_IMPORTED_MODULE_7__/* .AGENTCRAFT_FUNCTION */ .As}_${(0,nanoid__WEBPACK_IMPORTED_MODULE_2__.nanoid)()}`,
                    description: "Embedding算法服务【作为AgentCraft服务的核心依赖，请谨慎删除】"
                };
                try {
                    setCreateLoading(true);
                    setAppStatus(store_foundationModel__WEBPACK_IMPORTED_MODULE_5__/* .APP_STATUS.INIT */ .FR.INIT);
                    parameters.name = `${constants_index__WEBPACK_IMPORTED_MODULE_7__/* .SYSTEM_AGENTCRAFT */ .jx}_${(0,nanoid__WEBPACK_IMPORTED_MODULE_2__.nanoid)()}`;
                    const data = await (0,store_foundationModel__WEBPACK_IMPORTED_MODULE_5__/* .addFoundationModel */ .iO)(templateName, parameters);
                    const name = data.name;
                    setAppName(name);
                    const result = await checkAppStatus(name);
                    const embeddingService = result?.output?.deploy["embedding-service"];
                    const embeddingUrl = embeddingService?.customDomains[0]?.domainName;
                    const fullEmbeddingUrl = `http://${embeddingUrl}/embedding`;
                    form.setValues({
                        EMBEDDING_URL: fullEmbeddingUrl
                    });
                } catch (e) {
                    console.log(e);
                }
                setCreateLoading(false);
            }
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Paper, {
        shadow: "xs",
        p: "xl",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.LoadingOverlay, {
                loader: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(LoadingStepper, {}),
                visible: createLoading,
                overlayOpacity: 0.8,
                overlayBlur: 2
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.TextInput, {
                withAsterisk: true,
                label: "向量维度",
                description: "向量的维度设置，跟使用embedding算法相关，并且在数据库持久化的时候不能修改",
                defaultValue: "1024",
                placeholder: "",
                ...form.getInputProps("EMBEDDING_DIM")
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                align: "center",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.TextInput, {
                        withAsterisk: true,
                        label: "embedding服务访问地址",
                        description: "AgentCraft需要访问embedding服务地址，进行上下文的向量化处理",
                        style: {
                            width: "85%"
                        },
                        ...form.getInputProps("EMBEDDING_URL"),
                        defaultValue: completeConfig.EMBEDDING_URL || ""
                    }),
                    " ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Button, {
                        variant: "subtle",
                        mt: 42,
                        ml: 4,
                        onClick: createEmbeddingService,
                        children: "快速获取embedding服务"
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9216:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ SystemConfig)
/* harmony export */ });
/* unused harmony export SystemConfigStep */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mantine_modals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1280);
/* harmony import */ var _mantine_modals__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mantine_modals__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mantine_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9445);
/* harmony import */ var _mantine_form__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mantine_form__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mantine_notifications__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(914);
/* harmony import */ var _mantine_notifications__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mantine_notifications__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var features_systemConfig_embeddingConfig__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2139);
/* harmony import */ var features_systemConfig_databaseConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9745);
/* harmony import */ var features_systemConfig_completeConfirm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5590);
/* harmony import */ var _store_systemConfig__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2460);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([features_systemConfig_embeddingConfig__WEBPACK_IMPORTED_MODULE_7__, features_systemConfig_databaseConfig__WEBPACK_IMPORTED_MODULE_8__, _store_systemConfig__WEBPACK_IMPORTED_MODULE_10__]);
([features_systemConfig_embeddingConfig__WEBPACK_IMPORTED_MODULE_7__, features_systemConfig_databaseConfig__WEBPACK_IMPORTED_MODULE_8__, _store_systemConfig__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











var SystemConfigStep;
(function(SystemConfigStep) {
    SystemConfigStep[SystemConfigStep["EMBEDDING_SERVICE"] = 0] = "EMBEDDING_SERVICE";
    SystemConfigStep[SystemConfigStep["DATABASE"] = 1] = "DATABASE";
    SystemConfigStep[SystemConfigStep["COMPLETE"] = 2] = "COMPLETE";
})(SystemConfigStep || (SystemConfigStep = {}));
function SystemConfig() {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const setHiddenConfigView = (0,_store_systemConfig__WEBPACK_IMPORTED_MODULE_10__/* .useSystemConfigStore */ .Po)().setHiddenConfigView;
    const embeddingConfig = (0,_store_systemConfig__WEBPACK_IMPORTED_MODULE_10__/* .useSystemConfigStore */ .Po)().embeddingConfig;
    const databaseConfig = (0,_store_systemConfig__WEBPACK_IMPORTED_MODULE_10__/* .useSystemConfigStore */ .Po)().databaseConfig;
    const setEmbeddingConfing = (0,_store_systemConfig__WEBPACK_IMPORTED_MODULE_10__/* .useSystemConfigStore */ .Po)().setEmbeddingConfig;
    const setDatabaseConfig = (0,_store_systemConfig__WEBPACK_IMPORTED_MODULE_10__/* .useSystemConfigStore */ .Po)().setDatabaseConfig;
    const activeStep = (0,_store_systemConfig__WEBPACK_IMPORTED_MODULE_10__/* .useSystemConfigStore */ .Po)().activeStep;
    const setActiveStep = (0,_store_systemConfig__WEBPACK_IMPORTED_MODULE_10__/* .useSystemConfigStore */ .Po)().setActiveStep;
    const embeddingServiceForm = (0,_mantine_form__WEBPACK_IMPORTED_MODULE_4__.useForm)({
        initialValues: embeddingConfig,
        validate: {
            EMBEDDING_DIM: (value)=>!value ? "向量维度必填" : null,
            EMBEDDING_URL: (value)=>/^(http|https):\/\/[^ "]+$/.test(value) ? null : "请输入正确的URL地址"
        }
    });
    const databaseConfigForm = (0,_mantine_form__WEBPACK_IMPORTED_MODULE_4__.useForm)({
        initialValues: databaseConfig,
        validate: {
            POSTGRES_HOST: (value)=>!value ? "数据库地址必填" : null,
            POSTGRES_DATABASE: (value)=>!value ? "数据库名称必填" : null,
            POSTGRES_USER: (value)=>!value ? "数据库用户名必填" : null,
            POSTGRES_PASSWORD: (value)=>!value ? "数据库密码必填" : null
        }
    });
    const nextStep = ()=>{
        if (activeStep === 0) {
            embeddingServiceForm.validate();
            if (!embeddingServiceForm.isValid()) {
                return;
            } else {
                setEmbeddingConfing(embeddingServiceForm.values);
            }
        }
        if (activeStep === 1) {
            databaseConfigForm.validate();
            if (!databaseConfigForm.isValid()) {
                return;
            } else {
                setDatabaseConfig(databaseConfigForm.values);
            }
        }
        const currentStep = activeStep < 3 ? activeStep + 1 : activeStep;
        setActiveStep(currentStep);
    };
    const prevStep = ()=>{
        const currentStep = activeStep > 0 ? activeStep - 1 : activeStep;
        setActiveStep(currentStep);
    };
    function handleSubmit() {
        const addContent = `确定进行服务配置更新吗？`;
        _mantine_modals__WEBPACK_IMPORTED_MODULE_3__.modals.openConfirmModal({
            title: "更新系统配置",
            centered: true,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_6__.Text, {
                size: "sm",
                children: addContent
            }),
            labels: {
                confirm: "确定",
                cancel: "取消"
            },
            onCancel: ()=>console.log("Cancel"),
            onConfirm: async ()=>{
                setLoading(true);
                try {
                    const result = await (0,_store_systemConfig__WEBPACK_IMPORTED_MODULE_10__/* .updateSystemConfig */ .w1)({
                        ...embeddingConfig,
                        ...databaseConfig
                    });
                    if (result.code === 200) {
                        setHiddenConfigView(true);
                        _mantine_notifications__WEBPACK_IMPORTED_MODULE_5__.notifications.show({
                            title: "恭喜配置成功",
                            message: "您已完成配置，请前往注册",
                            color: "green"
                        });
                        router.push("/register");
                    } else {
                        _mantine_notifications__WEBPACK_IMPORTED_MODULE_5__.notifications.show({
                            title: "系统异常",
                            message: result.error,
                            color: "red"
                        });
                    }
                } catch (e) {
                    _mantine_notifications__WEBPACK_IMPORTED_MODULE_5__.notifications.show({
                        title: "系统异常",
                        message: e.message,
                        color: "red"
                    });
                }
                setLoading(false);
            }
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_6__.Paper, {
        shadow: "xs",
        p: "xl",
        style: {
            width: "60%",
            margin: "0 auto"
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_6__.LoadingOverlay, {
                visible: loading
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_6__.Notification, {
                title: "系统配置",
                mb: 148,
                withCloseButton: false,
                radius: "xs",
                children: "在进行系统操作前，您需要准备好embedding服务，以及数据库服务，AgentCraft提供了引导式的配置服务，帮助您快速完成系统配置"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_6__.Stepper, {
                        active: activeStep,
                        onStepClick: setActiveStep,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_6__.Stepper.Step, {
                                label: "配置Embedding服务",
                                description: "配置向量服务",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(features_systemConfig_embeddingConfig__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                    form: embeddingServiceForm
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_6__.Stepper.Step, {
                                label: "配置数据库",
                                description: "进行关系型数据库和向量数据库配置",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(features_systemConfig_databaseConfig__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                    form: databaseConfigForm
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_6__.Stepper.Completed, {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(features_systemConfig_completeConfirm__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                                    embeddingServiceForm: embeddingServiceForm,
                                    databaseForm: databaseConfigForm
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_6__.Group, {
                        mt: "xl",
                        pl: 24,
                        children: [
                            activeStep > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_6__.Button, {
                                variant: "default",
                                onClick: prevStep,
                                children: "上一步"
                            }),
                            activeStep === 2 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_6__.Button, {
                                onClick: handleSubmit,
                                children: "完成"
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_6__.Button, {
                                onClick: nextStep,
                                children: "下一步"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5321:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mantine_modals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1280);
/* harmony import */ var _mantine_modals__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mantine_modals__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2236);
/* harmony import */ var _tabler_icons_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9095);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _store_authentication__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7583);
/* harmony import */ var _styles_header_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9299);
/* harmony import */ var _styles_header_module_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_header_module_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store_user__WEBPACK_IMPORTED_MODULE_4__, _store_authentication__WEBPACK_IMPORTED_MODULE_6__]);
([_store_user__WEBPACK_IMPORTED_MODULE_4__, _store_authentication__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









function Header() {
    const user = (0,_store_user__WEBPACK_IMPORTED_MODULE_4__/* .useUserStore */ .L)().userInfo;
    const setToken = (0,_store_authentication__WEBPACK_IMPORTED_MODULE_6__/* .useAuthenticationStore */ .O_)().setToken;
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    const logout = ()=>{
        _mantine_modals__WEBPACK_IMPORTED_MODULE_2__.modals.openConfirmModal({
            title: "登出确认",
            centered: true,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                size: "sm",
                children: "确定退出本次登录么？"
            }),
            labels: {
                confirm: "确定",
                cancel: "取消"
            },
            onCancel: ()=>console.log("Cancel"),
            onConfirm: ()=>{
                setToken("");
                router.push("/login");
            }
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(()=>{
        if (!user.username) (0,_store_user__WEBPACK_IMPORTED_MODULE_4__/* .getUserInfo */ .b)();
    }, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Header, {
        height: 60,
        p: "xs",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_styles_header_module_scss__WEBPACK_IMPORTED_MODULE_8___default()["agentcraft-header"]),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Box, {
                    ml: 5,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        href: "https://github.com/devsapp/agentcraft",
                        target: "_blank",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Flex, {
                            align: "center",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    style: {
                                        marginRight: 12
                                    },
                                    children: "AgentCraft【Beta】"
                                }),
                                "  ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconBrandGithubFilled, {
                                    color: "white"
                                })
                            ]
                        })
                    })
                }),
                user.username ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_header_module_scss__WEBPACK_IMPORTED_MODULE_8___default().user),
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_styles_header_module_scss__WEBPACK_IMPORTED_MODULE_8___default()["user-content"]),
                            children: [
                                "您好：",
                                user.username
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            className: (_styles_header_module_scss__WEBPACK_IMPORTED_MODULE_8___default().logout),
                            onClick: logout,
                            children: "登出"
                        })
                    ]
                }) : null
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9198:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ Nav)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2236);
/* harmony import */ var _tabler_icons_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__);




const flattenNavItems = (result, navItems, parentPath = "", level = 0)=>{
    level++;
    return navItems.reduce((result, item)=>{
        const fullPath = item.path;
        item.parentPath = parentPath;
        item.level = level;
        result[fullPath] = item;
        if (item.subNav) {
            result = flattenNavItems(result, item.subNav, `${fullPath}`, level);
        } else {
            result[fullPath] = item;
        }
        return result;
    }, result);
};
const Nav = ()=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const { pathname , query  } = router;
    const id = query.id;
    const knowledgeBaseId = query.knowledgeBaseId;
    const handleClick = (path)=>{
        router.push(`${path.replace("[id]", id).replace("[knowledgeBaseId]", knowledgeBaseId)}`);
    };
    const navItems = [
        {
            name: "概览",
            path: "/overview",
            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconHome2, {
                size: "1rem",
                stroke: 1.5
            })
        },
        {
            name: "应用",
            path: "/app",
            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconApps, {
                size: "1rem",
                stroke: 1.5
            }),
            subNav: [
                {
                    name: "知识库",
                    path: "/app/[id]/knowledgeBase",
                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconVocabulary, {
                        size: "1rem",
                        stroke: 1.5
                    }),
                    subNav: [
                        {
                            name: "知识库信息",
                            path: "/app/[id]/knowledgeBase/[knowledgeBaseId]/detail",
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconHome2, {
                                size: "1rem",
                                stroke: 1.5
                            })
                        },
                        {
                            name: "知识库问答记录",
                            path: "/app/[id]/knowledgeBase/[knowledgeBaseId]/chatlist",
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconHome2, {
                                size: "1rem",
                                stroke: 1.5
                            })
                        }
                    ]
                }
            ]
        },
        {
            name: "数据集",
            path: "/dataset",
            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconDatabasePlus, {
                size: "1rem",
                stroke: 1.5
            }),
            subNav: [
                {
                    name: "数据源",
                    path: "/dataset/[id]/datasource",
                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconHome2, {
                        size: "1rem",
                        stroke: 1.5
                    })
                }
            ]
        },
        {
            name: "LLM代理",
            path: "/model",
            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconServer, {
                size: "1rem",
                stroke: 1.5
            })
        },
        {
            path: "/divider1",
            type: "divider"
        },
        {
            name: "基础模型",
            path: "/foundationModel",
            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconRowInsertTop, {
                size: "1rem",
                stroke: 1.5
            }),
            subNav: [
                {
                    name: "创建基础模型",
                    path: "/foundationModel/create",
                    solo: true,
                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconHome2, {
                        size: "1rem",
                        stroke: 1.5
                    })
                },
                {
                    name: "基础模型详细",
                    solo: true,
                    path: "/foundationModel/[fmId]/detail",
                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconHome2, {
                        size: "1rem",
                        stroke: 1.5
                    })
                }
            ]
        }
    ];
    const navItemsMap = flattenNavItems({}, navItems);
    const currentNav = navItemsMap[pathname];
    let renderNavList = [];
    if (currentNav.solo) {
        renderNavList = [
            currentNav
        ]; // 只有一个
    } else {
        renderNavList = Object.keys(navItemsMap).filter((key)=>{
            const navItem = navItemsMap[key];
            return navItem.level === currentNav.level && navItem.parentPath === currentNav.parentPath;
        }).map((key)=>{
            return navItemsMap[key];
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Navbar, {
        className: "navbar",
        width: {
            base: 240
        },
        p: "xs",
        children: [
            currentNav.parentPath ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Center, {
                h: 40,
                mx: "auto",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.ActionIcon, {
                    onClick: ()=>{
                        let parentPath = currentNav.parentPath?.replace("[id]", id).replace("[knowledgeBaseId]", knowledgeBaseId) || "";
                        router.push(parentPath);
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconArrowBackUp, {})
                })
            }) : null,
            renderNavList.map((item)=>{
                if (item.type === "divider") {
                    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Divider, {
                        mt: 8,
                        mb: 8
                    }, item.path);
                } else {
                    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.NavLink, {
                        label: item.name,
                        icon: item.icon,
                        variant: "filled",
                        onClick: ()=>handleClick(item.path),
                        active: pathname === item.path ? true : false
                    }, item.path);
                }
            })
        ]
    });
};


/***/ }),

/***/ 973:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ Shell)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var layouts_navbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9198);
/* harmony import */ var layouts_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5321);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([layouts_header__WEBPACK_IMPORTED_MODULE_4__]);
layouts_header__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






function Shell(props) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const { pathname  } = router;
    const isMainPage = pathname.indexOf("login") === -1 && pathname.indexOf("register") === -1 && pathname.indexOf("config") === -1;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: isMainPage ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.AppShell, {
            padding: "md",
            navbar: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(layouts_navbar__WEBPACK_IMPORTED_MODULE_3__/* .Nav */ .J, {}),
            header: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(layouts_header__WEBPACK_IMPORTED_MODULE_4__/* .Header */ .h, {}),
            styles: (theme)=>({
                    main: {
                        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0]
                    }
                }),
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    paddingRight: 20
                },
                children: props.children
            })
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: props.children
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5656:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mantine_modals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1280);
/* harmony import */ var _mantine_modals__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mantine_modals__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mantine_notifications__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(914);
/* harmony import */ var _mantine_notifications__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mantine_notifications__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var layouts_shell__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(973);
/* harmony import */ var _store_systemConfig__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2460);
/* harmony import */ var _features_systemConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9216);
/* harmony import */ var _styles_global_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(291);
/* harmony import */ var _styles_global_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_global_scss__WEBPACK_IMPORTED_MODULE_9__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([layouts_shell__WEBPACK_IMPORTED_MODULE_6__, _store_systemConfig__WEBPACK_IMPORTED_MODULE_7__, _features_systemConfig__WEBPACK_IMPORTED_MODULE_8__]);
([layouts_shell__WEBPACK_IMPORTED_MODULE_6__, _store_systemConfig__WEBPACK_IMPORTED_MODULE_7__, _features_systemConfig__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










function App(props) {
    const { Component , pageProps  } = props;
    const [render, setRender] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const hiddenConfigView = (0,_store_systemConfig__WEBPACK_IMPORTED_MODULE_7__/* .useSystemConfigStore */ .Po)().hiddenConfigView;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setRender(true);
        (0,_store_systemConfig__WEBPACK_IMPORTED_MODULE_7__/* .getSystemConfig */ .kH)();
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                        children: "AgentCraft"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "shortcut icon",
                        href: "/favicon.svg"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "viewport",
                        content: "minimum-scale=1, initial-scale=1, width=device-width"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.MantineProvider, {
                withGlobalStyles: true,
                withNormalizeCSS: true,
                theme: {
                    colorScheme: "dark"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_notifications__WEBPACK_IMPORTED_MODULE_5__.Notifications, {}),
                    render ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_modals__WEBPACK_IMPORTED_MODULE_4__.ModalsProvider, {
                        children: [
                            !hiddenConfigView ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_features_systemConfig__WEBPACK_IMPORTED_MODULE_8__/* .SystemConfig */ .T, {}) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(layouts_shell__WEBPACK_IMPORTED_MODULE_6__/* .Shell */ .N, {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                                    ...pageProps
                                })
                            }),
                            "."
                        ]
                    }) : null
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2460:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Po": () => (/* binding */ useSystemConfigStore),
/* harmony export */   "kH": () => (/* binding */ getSystemConfig),
/* harmony export */   "w1": () => (/* binding */ updateSystemConfig)
/* harmony export */ });
/* unused harmony export SystemConfigStep */
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6912);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3602);
/* harmony import */ var _constants_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1407);
/* harmony import */ var _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8417);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__]);
([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




var SystemConfigStep;
(function(SystemConfigStep) {
    SystemConfigStep[SystemConfigStep["EMBEDDING_SERVICE"] = 0] = "EMBEDDING_SERVICE";
    SystemConfigStep[SystemConfigStep["DATABASE"] = 1] = "DATABASE";
    SystemConfigStep[SystemConfigStep["COMPLETE"] = 2] = "COMPLETE";
})(SystemConfigStep || (SystemConfigStep = {}));
const useSystemConfigStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.persist)((set)=>({
        completeConfig: {},
        hiddenConfigView: false,
        embeddingConfig: {
            EMBEDDING_DIM: "1024",
            EMBEDDING_URL: ""
        },
        databaseConfig: {
            POSTGRES_HOST: "",
            POSTGRES_DATABASE: "",
            POSTGRES_USER: "",
            POSTGRES_PASSWORD: ""
        },
        activeStep: 0,
        setHiddenConfigView: (hiddenConfigView)=>set({
                hiddenConfigView
            }),
        setEmbeddingConfig: (embeddingConfig)=>set({
                embeddingConfig
            }),
        setDatabaseConfig: (databaseConfig)=>set({
                databaseConfig
            }),
        setActiveStep: (activeStep)=>set({
                activeStep
            }),
        setCompleteConfig: (completeConfig)=>set({
                completeConfig
            })
    }), {
    name: _constants_index__WEBPACK_IMPORTED_MODULE_3__/* .AGENTCRAFT_SYSTEMCONFIG_COMPLETED */ .T9
}));
async function getSystemConfig() {
    const result = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)(`/api/systemConfig/init`);
    const state = useSystemConfigStore.getState();
    const setCompleteConfig = state.setCompleteConfig;
    const setHiddenConfigView = state.setHiddenConfigView;
    setCompleteConfig(result?.data || {});
    result?.data?.EMBEDDING_URL ? setHiddenConfigView(true) : setHiddenConfigView(false);
}
async function updateSystemConfig(payload) {
    return await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)("/api/systemConfig/update", {
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

/***/ 9095:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L": () => (/* binding */ useUserStore),
/* harmony export */   "b": () => (/* binding */ getUserInfo)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6912);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3602);
/* harmony import */ var _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8417);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__]);
([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__, _utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const useUserStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)((set)=>({
        userInfo: {
            username: "",
            created: ""
        },
        setUserInfo: (userInfo)=>set((_state)=>({
                    userInfo
                }))
    })));
async function getUserInfo() {
    const state = useUserStore.getState();
    const res = await (0,_utils_clientRequest__WEBPACK_IMPORTED_MODULE_2__/* .request */ .W)("/api/user");
    const userInfo = await res.data;
    if (userInfo) {
        state.setUserInfo(userInfo);
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8847:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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


/***/ }),

/***/ 291:
/***/ (() => {



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

/***/ 1280:
/***/ ((module) => {

"use strict";
module.exports = require("@mantine/modals");

/***/ }),

/***/ 914:
/***/ ((module) => {

"use strict";
module.exports = require("@mantine/notifications");

/***/ }),

/***/ 2236:
/***/ ((module) => {

"use strict";
module.exports = require("@tabler/icons-react");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

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

/***/ 727:
/***/ ((module) => {

"use strict";
module.exports = require("react-syntax-highlighter");

/***/ }),

/***/ 4794:
/***/ ((module) => {

"use strict";
module.exports = require("react-syntax-highlighter/dist/cjs/styles/prism");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 5611:
/***/ ((module) => {

"use strict";
module.exports = import("nanoid");;

/***/ }),

/***/ 3135:
/***/ ((module) => {

"use strict";
module.exports = import("react-markdown");;

/***/ }),

/***/ 7984:
/***/ ((module) => {

"use strict";
module.exports = import("remark-breaks");;

/***/ }),

/***/ 6809:
/***/ ((module) => {

"use strict";
module.exports = import("remark-gfm");;

/***/ }),

/***/ 9832:
/***/ ((module) => {

"use strict";
module.exports = import("remark-math");;

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
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [6766,9911,7511], () => (__webpack_exec__(5656)));
module.exports = __webpack_exports__;

})();