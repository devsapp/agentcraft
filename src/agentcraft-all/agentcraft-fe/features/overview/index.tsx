import React, { useEffect } from "react";
import { Paper, Text, Title, Button, Divider, Flex, Box, Anchor } from '@mantine/core';
import { QuickStart } from "features/overview/quickStart";
import { useQuickStartStore } from "store/quickStart";
import { useKnowledgeBaseStore, getAccessUrl } from '@/store/knowledgeBase';
export function OverView() {
    const { autoQuickStart, setAutoQuickStart } = useQuickStartStore();
    const accessUrl = useKnowledgeBaseStore().accessUrl;
    const setAccessUrl = useKnowledgeBaseStore().setAccessUrl;
    useEffect(() => {
        (async () => {
            const result = await getAccessUrl();
            const data = result.data || { openApiUrl: '', innerApiUrl: '' }
            setAccessUrl(data);
        })()
    }, [])
    return (
        <>
            {autoQuickStart && <Paper shadow="xs" p="xl" mt={24} >
                <QuickStart />
            </Paper>}
            {!autoQuickStart &&
                <Box className={'content-container'} mt={24} >
                    <Box>
                        <Flex gap="xs">
                            <Flex direction="column" style={{ width: '68%' }}>
                                <Paper shadow="xs" p="xl" mb={24} withBorder >
                                  
                                </Paper>
                                <Paper shadow="xs" p="xl" mb={24} withBorder >
                                    
                                </Paper>
                            </Flex>

                            <Flex direction="column" style={{ width: '30%' }}>
                                <Paper shadow="xs" p="xl" mb={24} withBorder >
                                    <Title order={3}>常用信息</Title>
                                    <Flex align="center" mb={8} justify="space-between" mt={8}>
                                        <div style={{ width: '50%' }}>
                                            <Anchor href="https://github.com/devsapp/agentcraft" target="_blank" mr={8}>
                                                AgentCarft项目地址
                                            </Anchor>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <Anchor href="https://www.serverless-devs.com/" target="_blank">
                                                ServerlessDevs地址
                                            </Anchor>
                                        </div>

                                    </Flex>
                                    <Flex align="center" mb={8} justify="space-between" mt={8}>
                                        <Anchor href={accessUrl.openApiUrl} target="_blank" mr={8}>
                                            当前项目API地址
                                        </Anchor>

                                    </Flex>
                                    <div>
                                        <Title order={4} mt={8}>交流群</Title>
                                        <img style={{ width: 160, height: 160 }} src="https://img.alicdn.com/imgextra/i2/O1CN01zGJ4fS21GMJy6Okd8_!!6000000006957-0-tps-470-472.jpg" alt="交流群" />
                                    </div>
                                </Paper>
                                <Paper shadow="xs" p="xl" mb={24} withBorder >
                                    <Title order={3}>新手引导</Title>
                                    <Button compact variant="subtle" onClick={() => setAutoQuickStart(true)} mb={12}>打开快速引导</Button>
                                </Paper>
                                <Paper shadow="xs" p="xl" mb={24} withBorder >
                                    <Title order={3}>算力资源相关</Title>
                                    <Flex align="center" mb={8} justify="space-between" mt={8}>
                                        <div style={{ width: '50%' }}>
                                            <Anchor href="https://www.aliyun.com/product/fc?spm=agentcraft" target="_blank" mr={8}>
                                                函数计算FC
                                            </Anchor>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <Anchor href="https://www.aliyun.com/product/rds/postgresql?spm=agentcraft" target="_blank">
                                                云数据库 RDS PostgreSQL 版
                                            </Anchor>
                                        </div>
                                    </Flex>
                                    <Flex align="center" justify="space-between">
                                        <div style={{ width: '50%' }}>
                                            <Anchor href="https://www.aliyun.com/product/rocketmq?spm=agentcraft" target="_blank" mr={8}>
                                                云消息队列 RocketMQ 版
                                            </Anchor>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <Anchor href="https://www.aliyun.com/product/aliware/eventbridge?spm=agentcraft" target="_blank">
                                                事件总线 EventBridge
                                            </Anchor>
                                        </div>
                                    </Flex>
                                </Paper>
                                <Paper shadow="xs" p="xl" mb={24} withBorder >
                                    <Title order={3}>相关阅读</Title>
                                    <Flex align="start" mb={8} justify="space-between" mt={8}>

                                        <div style={{ width: '50%' }}>
                                            <Anchor href="https://www.gatesnotes.com/AI-agents" target="_blank">
                                                人工智能即将彻底改变你使用计算机的方式
                                            </Anchor>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <Anchor href="https://zhuanlan.zhihu.com/p/640634046" target="_blank" mr={8}>
                                                Agent介绍
                                            </Anchor>
                                        </div>
                                    </Flex>
                                    <Flex align="center" justify="space-between">
                                        <div style={{ width: '50%' }}>

                                            <Anchor href="https://github.com/tensorchord/Awesome-LLMOps" target="_blank" mr={8}>
                                                Awesome-LLMOPs
                                            </Anchor>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <Anchor href="https://langchain.com/" target="_blank">
                                                LangChain
                                            </Anchor>
                                        </div>
                                    </Flex>
                                </Paper>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
            }
        </>
    );
}
