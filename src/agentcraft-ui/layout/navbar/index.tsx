import { useRouter } from 'next/router';
import { Navbar, NavLink, Center, ActionIcon, Divider } from '@mantine/core';

import { IconHome2, IconGauge, IconActivity, IconArrowBackUp, IconApps, IconVocabulary, IconServer, IconDatabasePlus, IconTrowel, IconRowInsertTop, IconDevicesPc } from '@tabler/icons-react';

interface NavItem {
    name?: string,
    path: string,
    type?: string,
    icon?: JSX.Element,
    subNav?: NavItem[]
}
export const Nav = () => {
    const router = useRouter();
    const { pathname, query } = router;
    const id: any = query.id;
    const [base = '', level1, level2 = ''] = pathname.split('/');
    const handleClick = (path: string) => {
        id ? router.push(`${path.replace('[id]', id)}`) : router.push(path);
    };
    const navItems: NavItem[] = [
        // {
        //     name: "概览",
        //     path: "/overview",
        //     icon: <IconHome2 size="1rem" stroke={1.5} />,
        // },
        {
            name: "应用",
            path: "/app",
            icon: <IconApps size="1rem" stroke={1.5} />,
            subNav: [{
                name: "知识库",
                path: "/app/[id]/knowledgeBase",
                icon: <IconVocabulary size="1rem" stroke={1.5} />,
            }]
        },
        {
            name: "LLM代理",
            path: "/model",
            icon: <IconServer size="1rem" stroke={1.5} />
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
            path: '/divider',
            type: 'divider',
        },
        {
            name: "基础模型",
            path: "/foundationModel",
            icon: <IconRowInsertTop size="1rem" stroke={1.5} />,
            subNav: [{
                name: "创建基础模型",
                path: "/foundationModel/create",
                icon: <IconHome2 size="1rem" stroke={1.5} />,
            }]
        },
        {
            path: '/divider',
            type: 'divider',
        },
        {
            name: "客户端接入",
            path: "/clientAccess",
            icon: <IconDevicesPc size="1rem" stroke={1.5} />,
        },
        {
            path: '/divider',
            type: 'divider',
        },
        {
            name: "LLM工具集",
            path: "/toolformer",
            icon: <IconTrowel size="1rem" stroke={1.5} />,
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

    const renderNavList: NavItem[] = (level2 ? navItems.find((item: NavItem) => item.path === `/${level1}`)?.subNav : navItems) as NavItem[];

    return (
        <Navbar className="navbar" width={{ base: 240 }} p="xs">
            {level2 ? <Center h={40} mx="auto"> <ActionIcon onClick={() => { router.push(`/${level1}`) }}><IconArrowBackUp /></ActionIcon></Center> : null}
            {renderNavList.map((item: NavItem) => {

                if (item.type === 'divider') {
                    return <Divider mt={8} mb={8} />
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