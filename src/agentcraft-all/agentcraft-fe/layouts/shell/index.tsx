import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { AppShell } from '@mantine/core';
import { Nav } from 'layouts/navbar';
import { TabContainer } from 'layouts/tabContainer';
import { getWorkspaceList, useWorkspaceStore } from 'store/workspace';

type MainProps = {
    children: any
}
function hasNoNavbar(pathname: string) {
    const noNavbarPaths = ['/login', '/register', '/config'];
    for (let i = 0; i < noNavbarPaths.length; i++) {
        if (pathname.indexOf(noNavbarPaths[i]) !== -1) {
            return true;
        }
    }
    return false;
}

function Shell(props: any) {
    const { currentWorkspace, workspaceList } = useWorkspaceStore();
    useEffect(() => {
        getWorkspaceList();
    }, []);
    return <AppShell
        padding="md"
        navbar={<Nav workspaceId={currentWorkspace} workspaceList={workspaceList} />}
        styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
    >
        <TabContainer workspaceId={currentWorkspace} >
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