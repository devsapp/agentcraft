import { NavItem } from 'types/nav';
import { IconHome2, IconBrandReactNative, IconTemplate, IconApps, IconVocabulary, IconServer, IconDatabasePlus, IconTrowel, IconRowInsertTop, IconDevicesPc } from '@tabler/icons-react';

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
            name: "Agentic应用🔥",
            path: "/agentic-app",
            icon: IconApps,
        },
        {
            name: "智能体",
            path: "/agent",
            icon: IconBrandReactNative,
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
            name: "MCP🔥",
            path: "/mcp",
            icon: IconTemplate,
        },
        {
            name: "AI工具",
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
        }
    ]
    const navItemsMap = flattenNavItems({}, navItems);
    const currentNav: NavItem = navItemsMap[pathname] || {};
    let renderNavList: NavItem[] = navItems;
    return { renderNavList, currentNav }
}