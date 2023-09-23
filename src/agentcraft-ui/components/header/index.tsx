import { Center, Box, Header as MantineHeader } from '@mantine/core';


export function Header(props: any) {

    return <MantineHeader height={60} p="xs">
            <Center inline>
                <Box ml={5}>AgentCraft</Box>
            </Center>
    </MantineHeader>
}