import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Button, Box, Flex, TextInput, Text, Highlight, LoadingOverlay, Radio, Divider, Modal } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { getKnowledgeBaseList, useKnowledgeBaseStore, deleteKnowledgeBase } from 'store/knowledgeBase';
import { getAssistantList, useAssistantStore, deleteAssistant } from 'store/assistant';
import { useAgentStore } from 'store/agent';
import FeatureDescription from 'components/FeatureDescription';
import { KnowledgeBaseResponseData } from 'types/knowledgeBase';
import { Assistant } from 'types/assistant';
import CopyToClipboard from 'components/CopyToClipboard';


import styles from './index.module.scss';

interface AppForm {
    name: string,
    description: string
}

type IAgentItem = {
    key: string,
    name: string,
    instruction: string,
    created: string,
    modified: string,
    capabilities: any[],
    id: number,
    type: 'assistant' | 'knowledgeBase' | 'instructionChat'
}
const AGENT_TAG_MAP = {
    'assistant': '智能助手',
    'knowledgeBase': '知识库',
    'instructionChat': '简单问答'
}

function AgentCard({ data, workspaceId, onDelete, router }: { data: IAgentItem, workspaceId: any, onDelete: any, router: any }) {

    return (
        <Box className={styles['agent-card']} onClick={
            (e) => {
                const current_link = `/agent/${workspaceId}/${data.type}/${data.id}`;
                router.push(current_link)
            }
        }>
            <Box pos={'relative'}>
                <Text className={styles['agent-title']}>{data.name}</Text>
                <Text className={styles['agent-tag']}>{AGENT_TAG_MAP[data.type]}</Text>
                <Box className={`${styles['agent-delete-btn']} delete-agent`}>
                    <IconTrash onClick={onDelete} className={`${styles['agent-delete-icon']}`} />
                </Box>
            </Box>
            <Divider mt={11.5} mb={12.5} />

            <Box>
                <Text className={styles['prompt-title']}>提示词</Text>
                <CopyToClipboard value={data.instruction} content={<Text className={styles['prompt-content']} truncate >
                    {data.instruction}
                </Text>} width={220} />
            </Box>
        </Box>

    );
}

export function List(props: any) {
    const router = useRouter();
    const { workspaceId } = props;
    const { knowledgeBaseList, setLoading } = useKnowledgeBaseStore();
    const { assistantList } = useAssistantStore();
    const removeAssistant = (assistant: any) => {
        const { id, name } = assistant;
        const deleteContent = `确定删除 ${name}?`;
        modals.openConfirmModal({
            title: '删除',
            centered: true,
            children: (
                <Text size="sm">
                    <Highlight highlight={name}>{deleteContent}</Highlight>
                </Text>
            ),
            labels: { confirm: '确定', cancel: '取消' },
            onCancel: () => console.log('Cancel'),
            confirmProps: { color: 'red' },
            onConfirm: async () => {
                setLoading(true);
                await deleteAssistant(id);
                await getAssistantList(workspaceId);
                setLoading(false);
            },
        });

    }
    const removeKnowledgeBase = (knowledgeBase: KnowledgeBaseResponseData) => {
        const { id, name } = knowledgeBase;
        const deleteContent = `确定删除 ${name}?`;
        modals.openConfirmModal({
            title: '删除',
            centered: true,
            children: (
                <Text size="sm">
                    <Highlight highlight={name}>{deleteContent}</Highlight>
                </Text>
            ),
            labels: { confirm: '确定', cancel: '取消' },
            onCancel: () => console.log('Cancel'),
            confirmProps: { color: 'red' },
            onConfirm: async () => {
                setLoading(true);
                await deleteKnowledgeBase(id);
                await getKnowledgeBaseList(workspaceId);
                setLoading(false);
            },
        });

    }
    useEffect(() => {
        if (workspaceId) {
            getKnowledgeBaseList(workspaceId);
            getAssistantList(workspaceId);
        }
    }, [workspaceId]);
    const _assistantList: IAgentItem[] = assistantList.map((item: any) => {
        return {
            id: item.id,
            key: `assistant-${item.id}`,
            name: item.name,
            instruction: item.instruction,
            created: item.created,
            modified: item.modified,
            capabilities: item.capabilities,
            type: 'assistant'
        };
    })
    const _knowledgeBaseList: IAgentItem[] = knowledgeBaseList.filter((item) => item.prompt_template).map((item) => {
        return {
            id: item.id,
            key: `knowledgeBase-${item.id}`,
            name: item.name,
            instruction: item.system_message,
            created: item.created,
            modified: item.modified,
            capabilities: [],
            type: 'knowledgeBase'
        };
    });
    const _instructionChatList: IAgentItem[] = knowledgeBaseList.filter((item) => !item.prompt_template).map((item) => {
        return {
            id: item.id,
            key: `instructionChat-${item.id}`,
            name: item.name,
            instruction: item.system_message,
            created: item.created,
            modified: item.modified,
            capabilities: [],
            type: 'instructionChat'
        };
    });
    const _list: IAgentItem[] = _assistantList.concat(_knowledgeBaseList).concat(_instructionChatList).sort((a: IAgentItem, b: IAgentItem) => {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
    });
    return (
        <Box pos="relative">
            <LoadingOverlay visible={false} overlayOpacity={0.3} />
            <Flex align={'center'} wrap={'wrap'}>
                {_list.map((item: any) => {
                    return <AgentCard
                        key={item.key}
                        data={item}
                        workspaceId={workspaceId}
                        onDelete={(e: any) => {
                            e.stopPropagation();
                            if (item.type === 'assistant') {
                                removeAssistant(item);
                            } else {
                                removeKnowledgeBase(item)
                            }
                        }}
                        router={router}
                    />
                })}
            </Flex>
        </Box>
    );
}

function ChooseAgentDialog(props: any) {
    const [agentName, setAgentName] = useState('');
    const { open, setOpen } = useAgentStore();
    const [agentType, setAgentType] = useState('instructionChat');
    const { updateCurrentAssistant } = useAssistantStore();
    const router = useRouter();
    const { workspaceId } = props;
    const agentTypeList = [{
        label: '简单问答',
        value: 'instructionChat',
        description: '直接提问或者设定指令问答'
    }, {
        label: '知识库',
        value: 'knowledgeBase',
        description: '基于专有知识库的问答'
    }, {
        label: '智能助手',
        value: 'assistant',
        description: '调用多种工具，完成进阶任务'
    }]

    return (
        <Modal opened={open} onClose={() => { setOpen(false) }} title={<div className={styles['agent-container-title']}>新建智能体</div>} centered size="auto">
            <Box className={styles['agent-model']}>
                <Flex className={styles['agent-type']} justify={'space-between'} >
                    <Text className={styles['agent-title']}>智能体类型</Text>
                    <Box className={styles['agent-container']}>
                        {
                            agentTypeList.map((item) =>
                                <Box className={`${styles['agent-tag']} ${item.value === agentType ? styles['active'] : ''}`} key={item.value} onClick={() => { setAgentType(item.value) }}>
                                    <Flex >
                                        <Radio mr={5} checked={item.value === agentType} size='xs' onChange={(value: any) => { }} />
                                        <Box mt={-4}>
                                            <Text className={styles['agent-type-name']}>{item.label}</Text>
                                            <Text className={styles['agent-type-desc']}>{item.description}</Text>
                                        </Box>
                                    </Flex>
                                </Box>)
                        }
                    </Box>
                </Flex>
                <Flex className={styles['agent-type']} justify={'space-between'} >
                    <Text className={styles['agent-title']}>智能体名称</Text>
                    <Box className={styles['agent-container']}>
                        <TextInput className={styles['agent-name-input']} onChange={(event) => setAgentName(event.currentTarget.value)} value={agentName} />
                    </Box>
                </Flex>
                <Flex justify={'flex-end'}>
                    <Box>
                        <Button mr={8} className={styles['agent-footer-btn']} color="#FFF" onClick={() => {
                            updateCurrentAssistant({} as Assistant);
                            if (agentType === 'assistant') {
                                router.push(`/agent/${workspaceId}/assistant?initAgentName=${agentName}`);
                            } else if (agentType === 'knowledgeBase') {
                                router.push(`/agent/${workspaceId}/knowledgeBase?initAgentName=${agentName}`);
                            } else if (agentType === 'instructionChat') {
                                router.push(`/agent/${workspaceId}/instructionChat?initAgentName=${agentName}`);
                            }
                            setOpen(false);
                        }}>确定</Button>
                        <Button className={styles['agent-footer-btn']} variant="outline" color="#1A1A1A" onClick={() => setOpen(false)}> 取消</Button>
                    </Box>
                </Flex>
            </Box>
        </Modal>
    );
}

export function AgentPage(props: any) {

    const { setOpen } = useAgentStore();

    return (
        <>
            <FeatureDescription title="智能体" description="智能体包含知识库问答类型和智能助手类型，知识库类型专注于智能问答，智能助手则具备调用工具能力，综合表现更强大" />
            <Box mt={12} mb={18}>
                <Button leftIcon={<IconPlus />} onClick={() => { setOpen(true) }} variant="outline" h={36} >
                    新建
                </Button>
            </Box>
            <Box className={'content-container'} pb={124} >
                <List {...props} />
            </Box>
            <ChooseAgentDialog {...props} />
        </>

    );
}
