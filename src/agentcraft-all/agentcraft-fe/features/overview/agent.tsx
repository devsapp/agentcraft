import React from "react";
import { Box, Flex, Text, Radio, Title } from '@mantine/core';
import { useQuickStartStore } from "store/quickStart";
import { InstructionChatForm } from 'features/overview/instructionChatForm';
import { KnowledgeBaseForm } from 'features/overview/knowledgeBaseForm';
import { AssistantForm } from 'features/overview/assistantForm';
import { AGENT_TYPE } from 'constants/agent';
import styles from 'features/agent/index.module.scss';

export function Agent(props: any) {
    const {
        currentAgentType,
        setCurrentAgentType
    } = useQuickStartStore();
    const { instructionChatForm, knowledgeBaseForm, assistantForm, modelSelectData, openDatasetModel } = props;
    const agentTypeList = [{
        label: '简单问答',
        value: AGENT_TYPE.INSTRUCTIO_CHAT,
        description: '直接提问或者设定指令问答'
    }, {
        label: '知识库',
        value: AGENT_TYPE.KNOWLEDGEBASE,
        description: '基于专有知识库的问答'
    }, {
        label: '智能助手',
        value: AGENT_TYPE.ASSISTANT,
        description: '调用多种工具，完成进阶任务'
    }]
    return (
        <Box w={'100%'}>
            <Box className={styles['agent-model']} h={'auto'}>
                <Flex className={styles['agent-type']} justify={'space-between'} >
                    <Title order={5}>智能体类型</Title>
                    <Box className={styles['agent-container']}>
                        {
                            agentTypeList.map((item) =>
                                <Box className={`${styles['agent-tag']} ${item.value === currentAgentType ? styles['active'] : ''}`} key={item.value} onClick={() => { setCurrentAgentType(item.value) }}>
                                    <Flex >
                                        <Radio mr={5} checked={item.value === currentAgentType} size='xs' onChange={(value: any) => { }} />
                                        <Box mt={-4}>
                                            <Text className={styles['agent-type-name']}>{item.label}</Text>
                                            <Text className={styles['agent-type-desc']}>{item.description}</Text>
                                        </Box>
                                    </Flex>
                                </Box>)
                        }
                    </Box>
                </Flex>
            </Box>
            <Title order={5} >智能体详细</Title>
            <Box w="100%" style={{ overflowY: 'auto', paddingBottom: 64 }}>
                <Box h={'calc(100vh - 600px)'} >
                    {currentAgentType === AGENT_TYPE.INSTRUCTIO_CHAT && <InstructionChatForm form={instructionChatForm} modelSelectData={modelSelectData} />}
                    {currentAgentType === AGENT_TYPE.KNOWLEDGEBASE && <KnowledgeBaseForm form={knowledgeBaseForm} modelSelectData={modelSelectData} openDatasetModel={openDatasetModel} />}
                    {currentAgentType === AGENT_TYPE.ASSISTANT && <AssistantForm form={assistantForm} modelSelectData={modelSelectData} openDatasetModel={openDatasetModel} />}
                </Box>
            </Box>
        </Box>
    );
}


