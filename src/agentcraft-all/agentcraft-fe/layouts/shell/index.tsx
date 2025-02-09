import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { AppShell } from '@mantine/core';
import { Nav } from 'layouts/navbar';
import { TabContainer } from 'layouts/tabContainer';
import { getWorkspaceListAndSetCurrent, useWorkspaceStore, useLocalWorkspaceStore } from 'store/workspace';
import { getNavAndCurrentPath } from 'utils/nav';
import { EXPAND_NAV_WIDTH, CLOSE_NAV_WIDTH } from 'constants/index';

type MainProps = {
    children: any
}
function hasNoNavbar(pathname: string) {
    const noNavbarPaths = ['/login', '/register', '/config', '/chatBot'];
    for (let i = 0; i < noNavbarPaths.length; i++) {
        if (pathname.indexOf(noNavbarPaths[i]) !== -1) {
            return true;
        }
    }
    return false;
}

function Shell(props: any) {
    const router = useRouter();
    const { workspaceList } = useWorkspaceStore();
    const { currentWorkspace } = useLocalWorkspaceStore();
    const { renderNavList, currentNav } = getNavAndCurrentPath(router);
    const subComponentProps = {
        workspaceId: currentWorkspace,
        workspaceList,
        renderNavList,
        currentNav
    }
    useEffect(() => {
        getWorkspaceListAndSetCurrent();
    }, []);
    const parentPath = currentNav.parentPath as string;
    return <AppShell
        padding="md"
        navbar={<Nav {...subComponentProps} />}
        styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], paddingLeft: parentPath ? CLOSE_NAV_WIDTH : EXPAND_NAV_WIDTH, overflow: 'hidden' },
        })}
    >
        <TabContainer {...subComponentProps} >
            {props.children}
        </TabContainer>
    </AppShell>
}

export function Main(props: MainProps) {
    const router = useRouter();
    const { pathname } = router;
    const hiddenNavBar = hasNoNavbar(pathname);
    const { children } = props;
    return <>
        {
            hiddenNavBar ? <>{children}</> : <Shell {...props} />
        }
    </>
}