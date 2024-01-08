import { useRouter } from 'next/router';
import { AppShell } from '@mantine/core';
import { Nav } from 'layouts/navbar'
import { Header } from 'layouts/header'
import React from "react";


function hasNoNavbar(pathname: string) {
    const noNavbarPaths = ['/login', '/register', '/config', 'assistant/builder'];
    for (let i = 0; i < noNavbarPaths.length; i++) {
        if (pathname.indexOf(noNavbarPaths[i]) !== -1) {
            return true;
        }
    }
    return false;
}

export function Shell(props: any) {
    const router = useRouter();
    const { pathname } = router;
    const noNavBarPage = hasNoNavbar(pathname);
    return <>{
        !noNavBarPage ? <AppShell
            padding="md"
            navbar={<Nav />}
            header={<Header />}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            {props.children}
        </AppShell> : <>{props.children}</>
    }</>


}