import { useRouter } from 'next/router';
import { Navbar, NavLink, Center, ActionIcon, Divider } from '@mantine/core';

import { IconHome2, IconGauge, IconActivity, IconArrowBackUp, IconApps, IconVocabulary, IconServer, IconDatabasePlus, IconTrowel, IconRowInsertTop, IconDevicesPc, IconAlien } from '@tabler/icons-react';

interface NavItem {
    name?: string,
    path: string,
    type?: string,
    icon?: JSX.Element,
    subNav?: NavItem[],
    parentPath?: string,
    level?: number,
    solo?: boolean
}





const flattenNavItems = (result: { [key: string]: NavItem }, navItems: NavItem[], parentPath = '', level = 0) => {
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

export const Nav = () => {
    const router = useRouter();
    const { pathname, query } = router;
    const id: any = query.id;
    const knowledgeBaseId: any = query.knowledgeBaseId;

    const handleClick = (path: string) => {
        router.push(`${path.replace('[id]', id).replace('[knowledgeBaseId]', knowledgeBaseId)}`)
    };
    const navItems: NavItem[] = [
        {
            name: "概览",
            path: "/overview",
            icon: <IconHome2 size="1rem" stroke={1.5} />,
        },
        {
            name: "应用",
            path: "/app",
            icon: <IconApps size="1rem" stroke={1.5} />,
            subNav: [{
                name: "领域知识智能体",
                path: "/app/[id]/knowledgeBase",
                icon: <IconVocabulary size="1rem" stroke={1.5} />,
                subNav: [{
                    name: "智能体信息",
                    path: "/app/[id]/knowledgeBase/[knowledgeBaseId]/detail",
                    icon: <IconHome2 size="1rem" stroke={1.5} />,
                }, {
                    name: "智能体解答记录",
                    path: "/app/[id]/knowledgeBase/[knowledgeBaseId]/chatlist",
                    icon: <IconHome2 size="1rem" stroke={1.5} />,
                }]
            }, 
            // {
            //     name: "Agent",
            //     path: "/app/[id]/agent",
            //     icon: <IconAlien size="1rem" stroke={1.5} />,
            // }
            ]
        },
        {
            name: "数据集",
            path: "/dataset",
            icon: <IconDatabasePlus size="1rem" stroke={1.5} />,
            subNav: [{
                name: "数据源",
                path: "/dataset/[id]/datasource",
                icon: <IconHome2 size="1rem" stroke={1.5} />,
            }]
        },
        {
            name: "LLM代理",
            path: "/model",
            icon: <IconServer size="1rem" stroke={1.5} />
        },
        {
            path: '/divider1',
            type: 'divider',
        },
        {
            name: "基础模型",
            path: "/foundationModel",
            icon: <IconRowInsertTop size="1rem" stroke={1.5} />,
            subNav: [{
                name: "创建基础模型",
                path: "/foundationModel/create",
                solo: true,
                icon: <IconHome2 size="1rem" stroke={1.5} />,
            },{
                name: "基础模型详细",
                solo: true,
                path: "/foundationModel/[fmId]/detail",
                icon: <IconHome2 size="1rem" stroke={1.5} />,
            }]
        },
        // {
        //     path: '/divider2',
        //     type: 'divider',
        // },
        // {
        //     name: "客户端接入",
        //     path: "/clientAccess",
        //     icon: <IconDevicesPc size="1rem" stroke={1.5} />,
        // },
        // {
        //     path: '/divider3',
        //     type: 'divider',
        // },
        // {
        //     name: "LLM工具集",
        //     path: "/toolformer",
        //     icon: <IconTrowel size="1rem" stroke={1.5} />,
        // },
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
    let renderNavList: NavItem[] = [];
    if(currentNav.solo) {
        renderNavList = [currentNav]; // 只有一个
    } else {
        renderNavList = Object.keys(navItemsMap).filter((key) => {
            const navItem = navItemsMap[key];
            return navItem.level === currentNav.level && navItem.parentPath === currentNav.parentPath;
        }).map((key) => {
            return navItemsMap[key];
        })
    }
   

    return (
        <Navbar className="navbar" width={{ base: 240 }} p="xs">
            {currentNav.parentPath ?
                <Center h={40} mx="auto">
                    <ActionIcon onClick={() => {
                        let parentPath = currentNav.parentPath?.replace('[id]', id).replace('[knowledgeBaseId]', knowledgeBaseId) || '';
                        router.push(parentPath)
                    }}>
                        <IconArrowBackUp />
                    </ActionIcon>
                </Center> : null}
            {renderNavList.map((item: NavItem) => {
                if (item.type === 'divider') {
                    return <Divider mt={8} mb={8} key={item.path} />
                } else {
                    return <NavLink key={item.path}
                        label={item.name}
                        icon={item.icon}
                        variant="filled"
                        onClick={() => handleClick(item.path)}
                        active={pathname === item.path ? true : false} />
                }
            })}
        </Navbar>
    )
}