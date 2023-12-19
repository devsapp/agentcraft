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
            {autoQuickStart && <Paper shadow="xs" p="xl" >
                <QuickStart />
            </Paper>}
            {!autoQuickStart &&
                <div>
                    <Flex gap="xs">

                        <Flex direction="column" style={{ width: '68%' }}>
                            <Paper shadow="xs" p="xl" mb={24} withBorder >
                                <Title order={3} mb={8}>功能指引</Title>
                                <div style={{ textAlign: 'center' }}>
                                    <img src="https://img.alicdn.com/imgextra/i2/O1CN01phVIf61Iceu25Q6Gk_!!6000000000914-2-tps-1968-1378.png" alt="AgentCraft流程指引" style={{ width: '80%' }} />
                                </div>
                            </Paper>
                            <Paper shadow="xs" p="xl" mb={24} withBorder >
                                <Title order={3}>基本概念</Title>
                                <Box pl={4} pr={4} mt={18}>
                                    <Title order={4}>基础模型</Title>
                                    <Text>
                                        由函数计算提供的基础模型包含丰富的AI领域模型，包括LLM类别的通义千问，Chatglm,Llama2等，以及绘画类别的Stable Diffusion,通义万相等，以及Bert算法模型，Ocr模型
                                    </Text>
                                    <Divider my="sm" />

                                    <Title order={4}>LLM代理</Title>
                                    <Text>
                                        LLM代理可以更好的兼容不同的LLM服务，使用相同的数据输入和输出格式，这样做的好处是，在应用侧可以无缝的切换LLM模型，而应用本身不受影响，可以更方便的对比不同的LLM模型效果
                                    </Text>
                                    <Divider my="sm" />
                                    <Title order={4}>数据集</Title>
                                    <Text>
                                        数据集是业务层面的高层抽象，方便业务聚合自己的业务场景，本身没有实际的数据，数据集本身分为两种类型 文档数据集和问答数据集，其中文档数据集是为了泛化知识内容，而问答数据集则是精准的问答知识
                                    </Text>
                                    <Divider my="sm" />
                                    <Title order={4}>数据源</Title>
                                    <Text>
                                        数据源是真实的数据，来自于markdown,pdf,text等文件，也可以手动独条录入，数据源是智能体检索的真实数据，数据源跟数据集是从属关系，一个数据集可以包含多条数据源。数据源类型同样也是分为文档类型和问答类型
                                    </Text>
                                    <Divider my="sm" />
                                    <Title order={4}>应用</Title>
                                    <Text>
                                        应用是业务高层的抽象，为了区分不同的业务场景，本身没有实际操作意义
                                    </Text>
                                    <Divider my="sm" />
                                    <Title order={4}>智能体（Agent）</Title>
                                    <Text>
                                        智能体是只能应用的核心，具备上下文记忆，工具处理，自然语言认知等能力，智能体分为领域知识智能体，工具智能体和综合智能体，其中领域知识智能体是专门针对领域的知识进行智能化的问答，通过增强检索技术
                                        增加问答知识的准确率，通过生成式UI，加强知识的交付效果
                                    </Text>
                                    <Divider my="sm" />
                                </Box>
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
                </div>
            }
        </>
    );
}
