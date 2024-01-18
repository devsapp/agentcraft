import React from 'react';
import { useRouter } from 'next/router';
import { Navbar, NavLink, Box, Divider } from '@mantine/core';
import { WorkSpace } from 'features/workspace';
import { PageProps } from 'types/page';
import { NavItem } from 'types/nav';
import { EXPAND_NAV_WIDTH, CLOSE_NAV_WIDTH } from 'constants/index';
import styles from './index.module.scss';

interface NavProps extends PageProps {
    renderNavList: NavItem[];
    currentNav: any
}

function cloneIconComponent(icon) {
    return React.createElement(icon, {
        size: '1rem',
        stroke: 1.5
    });
}

export const Nav = (props: NavProps) => {
    const router = useRouter();
    const { renderNavList, currentNav } = props;
    const { pathname, query } = router;
    let id: any = query.id;
    const knowledgeBaseId: any = query.knowledgeBaseId;
    const handleClick = (path: string) => {
        router.push(`${path.replace('[id]', id).replace('[knowledgeBaseId]', knowledgeBaseId)}`)
    };
    const parentPath = currentNav.parentPath as string;
    return (
        <Navbar className={styles.navbar} width={{ base: parentPath ? CLOSE_NAV_WIDTH : EXPAND_NAV_WIDTH }} p="xs">
            <WorkSpace {...props} parentPath={parentPath} />
            {renderNavList.map((item: NavItem) => {
                if (item.type === 'divider') {
                    if (parentPath) {
                        return null;
                    }
                    return <Divider mt={8} mb={8} key={item.path} />
                } else {
                    if (parentPath) {
                        return <NavLink key={item.path}
                            label={null}
                            icon={<Box pl={6}>{cloneIconComponent(item.icon)}</Box>}
                            variant="filled"
                            onClick={() => handleClick(item.path)}
                            active={item.path.indexOf(parentPath) === 0 ? true : false}
                        />
                    }
                    return <NavLink key={item.path}
                        label={<Box pl={12}>{item.name}</Box>}
                        icon={cloneIconComponent(item.icon)}
                        variant="filled"
                        onClick={() => handleClick(item.path)}
                        active={(pathname === item.path) ? true : false} />
                }
            })}
            {/* <div className={styles['nav-bottom-config']} >
                <IconBrandGithubFilled color='white' className={styles['git']} />
            </div> */}
        </Navbar>
    )
}