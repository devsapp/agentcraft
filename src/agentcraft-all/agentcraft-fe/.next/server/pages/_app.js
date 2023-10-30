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
        // {
        //     name: "概览",
        //     path: "/overview",
        //     icon: <IconHome2 size="1rem" stroke={1.5} />,
        // },
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
                },
                {
                    name: "Agent",
                    path: "/app/[id]/agent",
                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconAlien, {
                        size: "1rem",
                        stroke: 1.5
                    })
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
    const isMainPage = pathname.indexOf("login") === -1 && pathname.indexOf("register") === -1;
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
/* harmony import */ var layouts_shell__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(973);
/* harmony import */ var _styles_global_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(291);
/* harmony import */ var _styles_global_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_global_scss__WEBPACK_IMPORTED_MODULE_6__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([layouts_shell__WEBPACK_IMPORTED_MODULE_5__]);
layouts_shell__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







function App(props) {
    const { Component , pageProps  } = props;
    const [render, setRender] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>setRender(true), []);
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
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.MantineProvider, {
                withGlobalStyles: true,
                withNormalizeCSS: true,
                theme: {
                    colorScheme: "dark"
                },
                children: render ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_modals__WEBPACK_IMPORTED_MODULE_4__.ModalsProvider, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(layouts_shell__WEBPACK_IMPORTED_MODULE_5__/* .Shell */ .N, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                            ...pageProps
                        })
                    })
                }) : null
            })
        ]
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

/***/ 291:
/***/ (() => {



/***/ }),

/***/ 2247:
/***/ ((module) => {

"use strict";
module.exports = require("@mantine/core");

/***/ }),

/***/ 1280:
/***/ ((module) => {

"use strict";
module.exports = require("@mantine/modals");

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

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

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
var __webpack_exports__ = __webpack_require__.X(0, [6766], () => (__webpack_exec__(5656)));
module.exports = __webpack_exports__;

})();