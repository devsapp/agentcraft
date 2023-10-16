import { AppShell } from '@mantine/core';

import { Nav } from '@/layout/navbar'
import { Header } from '@/layout/header'

export function Shell(props: any) {

    return (
        <AppShell
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
        </AppShell>
    );
}