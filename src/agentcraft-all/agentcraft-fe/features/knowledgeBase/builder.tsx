import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Center, ActionIcon, Tooltip, Spoiler, Breadcrumbs, Anchor, Button, Checkbox, Box, Table, TextInput, Text, Highlight, Switch, Group, Badge, MultiSelect, Select, Drawer, LoadingOverlay, Modal, Textarea, Flex, NumberInput, Paper, Title, Divider } from '@mantine/core';
import { IconArrowBackUp } from '@tabler/icons-react';
import { useKnowledgeBaseStore } from 'store/knowledgeBase';
import { BuilderForm } from 'features/knowledgeBase/builderForm';
import { APIAccess } from 'features/knowledgeBase/apiAccess';
import { ChatHistory } from 'features/knowledgeBase/history';
import { Tabs } from '@mantine/core';
enum ContainerType {
    ADD_OR_UPDATE = 1, // 增加和修改
    CHAT = 2, // 问答
}
interface AssistantProps {
    workspaceId: any;
}


export function KnowledgeBaseBuilder({ workspaceId }: AssistantProps) {
    const router = useRouter();
    const { query } = router;
    const knowledgeBaseId = query.knowledgeBaseId;
    const loading: boolean = useKnowledgeBaseStore().loading;
    const [innerTab, setInnerTab] = useState('chat')


    return (
        <div style={{ position: 'relative' }}>
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Box h={56} w="100%" style={{ borderBottom: '1px solid rgba(217,217,227,.15)', position: 'relative' }} >
                <Flex justify={'space-between'} align={'center'} h={'100%'}>
                    <Flex justify={'space-between'} align={'center'} h={'100%'} w={'50%'} >
                        <Flex align={'center'} h={'100%'} >
                            <ActionIcon onClick={() => {
                                router.push('/agent')
                            }}>
                                <IconArrowBackUp />
                            </ActionIcon>
                            <Title order={4}>{knowledgeBaseId ? '编辑知识库问答' : '新建知识库问答'}</Title>
                        </Flex>
                    </Flex>
                    {knowledgeBaseId ? <Tabs
                        value={innerTab}
                        onTabChange={(value: string) => {
                            setInnerTab(value)
                        }}
                        unstyled
                        styles={(theme) => ({
                            tab: {
                                ...theme.fn.focusStyles(),
                                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
                                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
                                border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : '#DEE1E7'}`,
                                cursor: 'pointer',
                                fontSize: theme.fontSizes.sm,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 32,
                                width: 136,
                                textAlign: 'center',
                                '&:disabled': {
                                    opacity: 0.5,
                                    cursor: 'not-allowed',
                                },
                                '&:first-of-type': {
                                    borderTopLeftRadius: 4,
                                    borderBottomLeftRadius: 4,
                                },
                                '&:last-of-type': {
                                    borderTopRightRadius: 4,
                                    borderBottomRightRadius: 4,
                                },
                                '&[data-active]': {
                                    backgroundColor: '#F1ECFD',
                                    borderColor: '#DEE1E7',
                                    borderRadius: 0,
                                    color: '#5719E6',
                                }
                            },
                            tabsList: {
                                display: 'flex',
                            },
                        })}
                    >
                        <Tabs.List >
                            <Tabs.Tab value="chat">
                                对话测试
                            </Tabs.Tab>
                            <Tabs.Tab value="access" >
                                访问接入
                            </Tabs.Tab>
                            <Tabs.Tab value="history" >
                                对话历史
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs> : null}
                </Flex>
            </Box>
            <Box w="100%" style={{ height: 'calc(100vh - 106px)' }} >
                {innerTab === 'chat' ? <BuilderForm workspaceId={workspaceId} /> : null}
                {innerTab === 'access' ? <APIAccess /> : null}
                {innerTab === 'history' ? <ChatHistory /> : null}
            </Box>
        </div>
    );
}
