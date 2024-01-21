import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Button, Box, Flex, TextInput, Text, Highlight, LoadingOverlay, Radio, Divider, Modal } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { getKnowledgeBaseList, useKnowledgeBaseStore, deleteKnowledgeBase } from 'store/knowledgeBase';
import { getAssistantList, useAssistantStore, deleteAssistant } from 'store/assistant';
import { useAgentStore } from 'store/agent';

import { Assistant } from 'types/assistant';

import styles from 'features/agent/index.module.scss';

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




function ChooseAgentDialog(props: any) {
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
        <Box>
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
                        <TextInput className={styles['agent-name-input']} />
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}

export default function AgentPage(props: any) {

    return <ChooseAgentDialog {...props} />
}
