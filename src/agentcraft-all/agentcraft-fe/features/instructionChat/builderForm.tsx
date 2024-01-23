import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Center, ActionIcon, Tooltip, Spoiler, Breadcrumbs, Anchor, Button, Checkbox, Box, Table, TextInput, Text, Highlight, Switch, Group, Badge, MultiSelect, Select, Drawer, LoadingOverlay, Modal, Textarea, Flex, NumberInput, Paper, Title, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';

import { IconRefresh } from '@tabler/icons-react';
import { getModelList, useModelStore } from 'store/model';
import { getDataSetList, useDataSetStore } from 'store/dataset';

import { Model } from 'types/model';
import { DataSet, DataSetType } from 'types/dataset';

import { useKnowledgeBaseStore, addKnowledgeBase, refreshToken, updateKnowledgeBase, getKnowledgeBase } from 'store/knowledgeBase';
import { Dataset } from 'types/knowledgeBase';
import { PROMPT_TEMPLATE } from 'constants/index';
import { INSTRUCTION_TEMPLATES, DEFAULT_CHAT_INSTRUCTION } from 'constants/instructions'
import KnowledgeBaseChat from 'features/knowledgeBase/chat';


interface AssistantProps {
    workspaceId: any;
}


export function InstructionChatForm({ workspaceId, form }: { workspaceId: any, form: any }) {
    return <Box pr={32}>
        <Paper shadow="xs" p="md" withBorder mt={12}>
            <Title order={5} size="h5">问答信息</Title>
            <Box pl={4} pr={4} >
                <TextInput withAsterisk label="名称" placeholder="输入知识库名称" {...form.getInputProps('name')} />
                <Textarea label="描述" placeholder="输入应用描述" description="请输入知识库的描述信息" {...form.getInputProps('description')} />
            </Box>
        </Paper>
        <Paper shadow="xs" p="md" withBorder mt={12}>
            <Title order={5} size="h5">调试指令</Title>
            <Box pl={4} pr={4} >
                <Select
                    data={INSTRUCTION_TEMPLATES}
                    description=""
                    defaultValue={DEFAULT_CHAT_INSTRUCTION}
                    {...form.getInputProps('system_message')}
                    label="指令示例"
                    placeholder=""
                    onChange={(value: string) => {
                        form.setValues({
                            system_message: value
                        })
                    }}
                />
                <Textarea label="系统指令" placeholder="输入系统指令" {...form.getInputProps('system_message')} minRows={12} description="系统提示词可以作为对大语言模型的约束指令" />
                {/* <TextInput label="停止提示词" placeholder="停止输出的token" {...form.getInputProps('stop')} /> */}
            </Box>
        </Paper>
        <Paper shadow="xs" p="md" withBorder mt={12}>
            <Title order={5} size="h5">LLM参数</Title>
            <Box pl={4} pr={4} mt={4}>
                <Group grow>
                    <TextInput withAsterisk label="temperature" placeholder="" {...form.getInputProps('temperature')} />
                    <TextInput withAsterisk label="top_p" placeholder="" {...form.getInputProps('top_p')} />
                </Group>
                <Group grow>
                    <TextInput withAsterisk label="n_sequences" placeholder="" {...form.getInputProps('n_sequences')} />
                    <TextInput withAsterisk label="max_tokens" placeholder="" {...form.getInputProps('max_tokens')} />
                </Group>
                <Group grow>
                    <TextInput withAsterisk label="presence_penalty" placeholder="" {...form.getInputProps('presence_penalty')} />
                    <TextInput withAsterisk label="frequency_penalty" placeholder="" {...form.getInputProps('frequency_penalty')} />
                </Group>
                <TextInput label="logit_bias" placeholder="" {...form.getInputProps('logit_bias')} width={'50%'} />
            </Box>
        </Paper>
    </Box>
}

export function BuilderForm({ workspaceId }: AssistantProps) {
    const router = useRouter();
    const { query } = router;
    const instructionChatId = query.instructionChatId;
    const initialAgentName = query.initialAgentName;
    const { setLoading, currentKnowledgeBase, updateCurrentKnowledgeBase } = useKnowledgeBaseStore();
    const modelList: Model[] = useModelStore().modelList;
    const initFormValue = {
        name: initialAgentName,
        description: '',
        prompt_template: '',
        app_id: parseInt(workspaceId),
        exact_datasets: [],
        fuzzy_datasets: [],
        exact_search_similarity: 0.9,
        fuzzy_search_similarity: 0.6,
        temperature: 0.5,
        top_p: 1.0,
        n_sequences: 1,
        max_tokens: 1024,
        stop: [],
        presence_penalty: 0,
        frequency_penalty: 0,
        logit_bias: '',
        model_id: '',
        redis_ip_ex: 0,
        redis_history_ex: 0,
        model_ip_limit: 0,
        llm_history_len: 0,
        system_message: DEFAULT_CHAT_INSTRUCTION,
        exact_search_limit: 1,
        fuzzy_search_limit: 3
    }
    const form: any = useForm({
        initialValues: initFormValue,
        validate: {
            name: (value) => (!value ? '问答名必填' : null)
        },
    });
    useEffect(() => {
        getModelList();
        getDataSetList();
        if (instructionChatId) {
            (async () => {
                const knowledgeBase = await getKnowledgeBase(instructionChatId);
                updateCurrentKnowledgeBase(knowledgeBase);
            })()
        } else {
            form.setValues(initFormValue)
        }
    }, []);

    useEffect(() => {
        if (currentKnowledgeBase && instructionChatId) {
            const datasets = currentKnowledgeBase?.datasets;
            form.setValues({
                id: currentKnowledgeBase?.id,
                name: currentKnowledgeBase?.name,
                description: currentKnowledgeBase?.description,
                prompt_template: currentKnowledgeBase?.prompt_template,
                app_id: currentKnowledgeBase?.app_id,
                exact_datasets: datasets?.filter((item: Dataset) => item.dataset_type === DataSetType.QUESTION).map((item: Dataset) => item.dataset_id),
                fuzzy_datasets: datasets?.filter((item: Dataset) => item.dataset_type === DataSetType.DOCUMENT).map((item: Dataset) => item.dataset_id),
                exact_search_similarity: currentKnowledgeBase?.exact_search_similarity,
                fuzzy_search_similarity: currentKnowledgeBase?.fuzzy_search_similarity,
                temperature: currentKnowledgeBase?.temperature,
                top_p: currentKnowledgeBase?.top_p,
                n_sequences: currentKnowledgeBase?.n_sequences,
                max_tokens: currentKnowledgeBase?.max_tokens,
                stop: currentKnowledgeBase?.stop,
                presence_penalty: currentKnowledgeBase?.presence_penalty,
                frequency_penalty: currentKnowledgeBase?.frequency_penalty,
                logit_bias: currentKnowledgeBase?.logit_bias,
                model_id: currentKnowledgeBase?.model_id,
                redis_ip_ex: currentKnowledgeBase?.redis_ip_ex,
                redis_history_ex: currentKnowledgeBase?.redis_history_ex,
                model_ip_limit: currentKnowledgeBase?.model_ip_limit,
                llm_history_len: currentKnowledgeBase?.llm_history_len,
                system_message: currentKnowledgeBase?.system_message,
                exact_search_limit: currentKnowledgeBase?.exact_search_limit,
                fuzzy_search_limit: currentKnowledgeBase?.fuzzy_search_limit
            })
        } else if (modelList.length > 0 && !instructionChatId) {
            form.setValues({
                model_id: modelList[0].id
            })
        }
    }, [currentKnowledgeBase, modelList])


    const modelSelectData: any = modelList.map((item: Model) => { return { label: item.name_alias, value: item.id } });
    return (<Flex h={'100%'} style={{ overflow: 'hidden' }}>
        <Box w="50%" h="100%" style={{ borderRight: '1px solid rgba(217,217,227,.15)' }}>
            <Center maw={'100%'} h={38} mx="auto" pos={'relative'} mt={12} mb={12} >
                <Box style={{ position: 'absolute', top: 0, left: 0, bottom: 0 }}>
                    <Flex justify={'flex-start'} align={'center'}>
                        <Select
                            ml={8}
                            mr={8}
                            withAsterisk
                            data={modelSelectData}
                            placeholder=""
                            variant="unstyled"
                            {...form.getInputProps('model_id')}
                        />
                        <IconRefresh cursor={'pointer'} onClick={getModelList} />
                    </Flex>
                </Box >
                <Text fw={700}>配置</Text>
                <Box style={{ position: 'absolute', top: 0, right: 0 }}>
                    <Flex justify={'flex-end'} align={'center'}>
                        <Button h={32} mr={12} onClick={async () => {
                            form.validate();
                            if (form.isValid()) {
                                setLoading(true);
                                const values: any = form.values;
                                if (instructionChatId) {
                                    await updateKnowledgeBase(instructionChatId, values);
                                } else {
                                    const result = await addKnowledgeBase(values);
                                    const instructionChatId = result.id;
                                    if (instructionChatId) {
                                        const { token } = await refreshToken(instructionChatId);
                                        window.history.pushState({}, '', `?instructionChatId=${instructionChatId}`);
                                        updateCurrentKnowledgeBase(Object.assign({}, values, { id: instructionChatId, token }));
                                    }
                                }

                                setLoading(false);
                            }
                        }}>保存</Button>
                    </Flex>
                </Box>
            </Center>
            <Box h={'calc(100vh - 142px)'} style={{ overflowY: 'auto', paddingBottom: 64 }}>
                <InstructionChatForm workspaceId={workspaceId} form={form} />
            </Box>
        </Box>
        <Box w="50%" h="100%" p={16}>
            <Center maw={'100%'} h={38} mx="auto">
                <Text fw={700}>预览</Text>
            </Center>
            {currentKnowledgeBase?.id ? <KnowledgeBaseChat /> : null}
        </Box>
    </Flex>);
}
