import React from "react";
import { useRouter } from 'next/router';
import { Tabs, Box, Flex } from '@mantine/core';
import { Header } from 'layouts/header';
import { PageProps } from 'types/page';
import { NavItem } from 'types/nav';
interface TabContainerProps extends PageProps {
    renderNavList: NavItem[];
    currentNav: any,
    children: any
}



export function TabContainer(props: TabContainerProps) {
    const router = useRouter();
    const { renderNavList, currentNav } = props;
    const tabList = renderNavList.filter((item) => item.type !== 'divider').map(item => ({
        name: item.name,
        value: item.path
    }));
    const parentPath = currentNav.parentPath as string;
    return <>
        <Box h={50} pl={24} pr={24} >
            <Flex align={'center'} justify={'space-between'} style={{height: '100%'}}>
                <div></div>
                {/* <>
                    {
                        tabList.length === 1 ?
                            <div style={{ height: 40, lineHeight: '40px' }}>{tabList[0].name}</div> :
                            <Tabs
                                value={parentPath ? parentPath : router.pathname as string}
                                onTabChange={(value: string) => {
                                    router.push(value);
                                }}
                            >
                                <Tabs.List>
                                    {tabList.map((item) => <Tabs.Tab value={item.value} key={item.value} >{item.name}</Tabs.Tab>)}
                                </Tabs.List>
                            </Tabs>
                    }
                </> */}
                <Header />
            </Flex>
        </Box>
        <Box bg={'#fff'} pl={32} pr={32} h={'calc(100vh - 48px)'} className={'page-container'} >
            {props.children}
        </Box>
    </>


}