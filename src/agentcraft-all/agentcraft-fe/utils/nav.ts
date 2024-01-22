import { NavItem } from 'types/nav';
import { IconHome2, IconArrowBackUp, IconApps, IconVocabulary, IconServer, IconDatabasePlus, IconTrowel, IconRowInsertTop, IconDevicesPc } from '@tabler/icons-react';

export const flattenNavItems = (result: { [key: string]: NavItem }, navItems: NavItem[], parentPath = '', level = 0) => {
    level++;
    return navItems.reduce((result, item) => {
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

export function getNavAndCurrentPath(router: any) {
    const { pathname } = router;
    const navItems: NavItem[] = [
        {
            name: "概览",
            path: "/overview",
            icon: IconHome2,
        },
        {
            name: "智能体",
            path: "/agent",
            icon: IconApps,
            subNav: [
                {
                    name: "新建智能助手",
                    path: "/agent/[id]/assistant",
                    icon: IconVocabulary,
                },
                {
                    name: "编辑智能助手",
                    path: "/agent/[id]/assistant/[assistantId]",
                    icon: IconVocabulary,
                },
                {
                    name: "新增知识库问答",
                    path: "/agent/[id]/knowledgeBase",
                    icon: IconVocabulary,
                },
                {
                    name: "编辑知识库问答",
                    path: "/agent/[id]/knowledgeBase/[knowledgeBaseId]",
                    icon: IconVocabulary,
                },
                {
                    name: "新增简单问答",
                    path: "/agent/[id]/instructionChat",
                    icon: IconVocabulary,
                },
                {
                    name: "编辑简单问答",
                    path: "/agent/[id]/instructionChat/[instructionChatId]",
                    icon: IconVocabulary,
                }
            ]
        },
        // {
        //     name: "应用",
        //     path: "/app",
        //     icon: <IconApps size="1rem" stroke={1.5} />,
        //     subNav: [
        //         {
        //             name: "知识库",
        //             path: "/app/[id]/knowledgeBase",
        //             icon: <IconVocabulary size="1rem" stroke={1.5} />,
        //             subNav: [{
        //                 name: "知识库信息",
        //                 path: "/app/[id]/knowledgeBase/[knowledgeBaseId]/detail",
        //                 icon: <IconHome2 size="1rem" stroke={1.5} />,
        //             }, {
        //                 name: "知识库系统记录",
        //                 path: "/app/[id]/knowledgeBase/[knowledgeBaseId]/chatlist",
        //                 icon: <IconHome2 size="1rem" stroke={1.5} />,
        //             }]
        //         },
        //         {
        //             name: "智能助手",
        //             path: "/app/[id]/assistant",
        //             icon: <IconVocabulary size="1rem" stroke={1.5} />,
        //             subNav: [{
        //                 name: "智能助手信息",
        //                 path: "/app/[id]/assistant/[assistantId]/detail",
        //                 icon: <IconHome2 size="1rem" stroke={1.5} />,
        //             }, {
        //                 name: "智能助手系统记录",
        //                 path: "/app/[id]/assistant/[assistantId]/chatlist",
        //                 icon: <IconHome2 size="1rem" stroke={1.5} />,
        //             }]
        //         }
        //     ]
        // },
        {
            name: "数据集",
            path: "/dataset",
            icon: IconDatabasePlus,
            subNav: [{
                name: "数据源",
                path: "/dataset/[id]/datasource",
                icon: IconHome2,
            }]
        },
        {
            name: "LLM代理",
            path: "/model",
            icon: IconServer
        },
        {
            path: '/divider1',
            type: 'divider',
        },
        {
            name: "执行工具",
            path: "/actionTools",
            icon: IconTrowel,
        },
        {
            path: '/divider4',
            type: 'divider',
        },

        {
            name: "基础模型",
            path: "/foundationModel",
            icon: IconRowInsertTop,
            subNav: [{
                name: "创建基础模型",
                path: "/foundationModel/create",
                solo: true,
                icon: IconHome2,
            }, {
                name: "基础模型详细",
                solo: true,
                path: "/foundationModel/[fmId]/detail",
                icon: IconHome2,
            }]
        },

        {
            path: '/divider2',
            type: 'divider',
        },
        {
            name: "客户端接入",
            path: "/clientAccess",
            icon: IconDevicesPc,
            subNav: [{
                name: "创建客户端接入服务",
                path: "/clientAccess/create",
                solo: true,
                icon: IconHome2,
            }, {
                name: "创建机器人服务",
                path: "/clientAccess/robot",
                solo: true,
                icon: IconHome2,
            }, {
                name: "创建web独立站服务",
                path: "/clientAccess/web",
                solo: true,
                icon: IconHome2,
            }]
        },
        {
            path: '/divider3',
            type: 'divider',
        },

        // {
        //     path: '/divider',
        //     type: 'divider',
        // },
        // {
        //     name: "试玩工厂",
        //     path: "/playground",
        //     icon: <IconActivity size="1rem" stroke={1.5} />,
        // },
    ]
    const navItemsMap = flattenNavItems({}, navItems);
    const currentNav: NavItem = navItemsMap[pathname] || {};
    let renderNavList: NavItem[] = navItems;
    // if (currentNav.solo) {
    //     renderNavList = [currentNav]; // 只有一个
    // } else {
    //     renderNavList = Object.keys(navItemsMap).filter((key) => {
    //         const navItem = navItemsMap[key];
    //         return navItem.level === currentNav.level && navItem.parentPath === currentNav.parentPath;
    //     }).map((key) => {
    //         return navItemsMap[key];
    //     })
    // }
    return { renderNavList, currentNav }
}