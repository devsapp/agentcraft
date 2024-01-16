import { useRouter } from 'next/router';
import { Tabs, Box, Flex } from '@mantine/core';
import { Header } from 'layouts/header';
import React from "react";



export function TabContainer(props: any) {
    const router = useRouter();
    const tabList = [{
        name: "概览",
        value: "/overview",
    },
    {
        name: "智能体",
        value: "/agent"
    },
    {
        name: "数据集",
        value: "/dataset",
    },
    {
        name: "LLM代理",
        value: "/model"
    },
    {
        name: "执行工具",
        value: "/actionTools",
    },

    {
        name: "基础模型",
        value: "/foundationModel",
    },
    {
        name: "客户端接入",
        value: "/clientAccess",
    }]
    return <>
        <Box h={40} mt={8} pl={24} pr={24} >
            <Flex align={'center'} justify={'space-between'}>
                <>
                    {tabList.length === 1 ?
                        <div style={{ height: 40, lineHeight: '40px' }}>{tabList[0].name}</div> :
                        <Tabs
                            value={router.pathname as string}
                            onTabChange={(value: string) => {
                                router.push(value);
                            }}
                        >
                            <Tabs.List>
                                {tabList.map((item) => <Tabs.Tab value={item.value} key={item.value}>{item.name}</Tabs.Tab>)}
                            </Tabs.List>
                        </Tabs>
                    }</>
                <Header />
            </Flex>
        </Box>
        <Box bg={'#fff'} pl={32} pr={32} h={'calc(100vh - 48px)'}>
            {props.children}
        </Box>
    </>


}