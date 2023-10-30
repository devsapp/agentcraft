import { useRouter } from 'next/router';
import { AppShell } from '@mantine/core';
import { Nav } from 'layouts/navbar'
import { Header } from 'layouts/header'
import React, { useEffect } from "react";
export function Shell(props: any) {
    const router = useRouter();
    const { pathname } = router;
    const isMainPage = pathname.indexOf('login') === -1 && pathname.indexOf('register') === -1;
    return <>{
        isMainPage ? <AppShell
            padding="md"
            navbar={<Nav />}
            header={<Header />}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            <div style={{ paddingRight: 20 }}>
                {props.children}
            </div>
        </AppShell> : <>{props.children}</>
    }</>


}