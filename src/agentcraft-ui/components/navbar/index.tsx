import { useRouter } from 'next/router';
import { Navbar, NavLink } from '@mantine/core';

import { IconHome2, IconGauge, IconActivity, } from '@tabler/icons-react';

interface NavItem {
    name: string,
    path: string,
    icon: JSX.Element,
    subNav?: NavItem[]
}
export const Nav = () => {
    const router = useRouter();
    const { pathname, query } = router;
    const { id = [''] } = query;
    const [base = '', level1, level2 = ''] = pathname.split('/');
    const handleClick = (path: string) => {
        id[0] ? router.push(`${path}/${id[0]}`) : router.push(path);
    };
    const navItems: NavItem[] = [
        {
            name: "应用管理",
            path: "/app",
            icon: <IconHome2 size="1rem" stroke={1.5} />,
            subNav: [{
                name: "Agent管理",
                path: "/app/[id]/agent",
                icon: <IconHome2 size="1rem" stroke={1.5} />,
            }]
        },
        {
            name: "模型管理",
            path: "/model",
            icon: <IconGauge size="1rem" stroke={1.5} />
        },
        {
            name: "数据集管理",
            path: "/dataset",
            icon: <IconActivity size="1rem" stroke={1.5} />,
            subNav: [{
                name: "数据源管理",
                path: "/dataset/[id]/datasource",
                icon: <IconHome2 size="1rem" stroke={1.5} />,
            }]
        },
    ]

    const renderNavList: NavItem[] = (level2 ? navItems.find((item: NavItem) => item.path === `/${level1}`)?.subNav : navItems) as NavItem[];

    return (
        <Navbar className="navbar" width={{ base: 240 }} p="xs">
            {renderNavList.map((item: NavItem) => <NavLink key={item.path}
                label={item.name}
                icon={item.icon}
                variant="filled"
                onClick={() => handleClick(item.path)}
                active={pathname === item.path ? true : false} />)}
        </Navbar>
    )
}