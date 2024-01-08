import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Center, ActionIcon, Tooltip, Spoiler, Breadcrumbs, Anchor, Button, Checkbox, Box, Table, TextInput, Text, Highlight, Switch, Group, Badge, MultiSelect, Select, Drawer, LoadingOverlay, Modal, Textarea, Flex, NumberInput, Paper, Title, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconRefresh, IconArrowBackUp } from '@tabler/icons-react';
import { getModelList, useModelStore } from 'store/model';
import { getDataSetList, useDataSetStore } from 'store/dataset';
import { formatDateTime } from 'utils/index';
import { Model } from 'types/model';
import { DataSet, DataSetType } from 'types/dataset';
import FeatureDescription from 'components/FeatureDescription';
import { getAssistantList, useAssistantStore, addAssistant, refreshToken, updateAssistant, getAssistant, deleteAssistant } from 'store/assistant';
import { getToolList, useActionToolStore } from 'store/actionTools';
import { AssistantResponseData, Dataset } from 'types/assistant';
import { DATA_RETRIVAL_PROMPT_TEMPLATE } from 'constants/instructions';
import { INSTRUCTION_TEMPLATES, DEFAULT_ASSISTANT_INSTRUCTION } from 'constants/instructions';
import CopyToClipboard from 'components/CopyToClipboard';
import AssistantChat from 'features/assistant/chat';

enum ContainerType {
    ADD_OR_UPDATE = 1, // 增加和修改
    CHAT = 2, // 问答
}
interface AssistantProps {
    appId: any;
}



export function AssistantForm({ appId, form }: { appId: any, form: any }) {

    const dataSetList: DataSet[] = useDataSetStore().dataSetList;
    const { toolList } = useActionToolStore();
    useEffect(() => {
        getDataSetList();
        getToolList();

    }, []);

    const documentSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.DOCUMENT).map((item: DataSet) => { return { label: item.name, value: item.id } });
    const qaSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.QUESTION).map((item: DataSet) => { return { label: item.name, value: item.id } });
    let pannelWidth = '100%';
    return <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="column">

        <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }}>
            <Title order={5} size="h5">智能助手信息</Title>
            <Box pl={4} pr={4} >
                <TextInput withAsterisk label="名称" placeholder="输入智能助手名称" {...form.getInputProps('name')} />
                <TextInput label="描述" placeholder="输入关于智能助手的简单描述" description="请输入智能助手的描述信息" {...form.getInputProps('description')} />
            </Box>
        </Paper>
        <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }}>
            <Title order={5} size="h5">调试指令</Title>
            <Box pl={4} pr={4} >
                <Textarea label="系统指令" placeholder="这个智能助手是干什么的，他应该怎么表现，应该避免做哪些事情？" {...form.getInputProps('instruction')} minRows={8} description="系统指令可以作为对大语言模型的约束指令" />
            </Box>
        </Paper>
        <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }}>
            <Title order={5} size="h5" mb={4} >对话示例设置</Title>
            <Box pl={4} pr={4} >
                <TextInput  {...form.getInputProps('prompt_starts')} />

            </Box>
        </Paper>
        <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }}>
            <Flex justify={'space-between'} align={'center'} mb={4} >
                <Title order={5} size="h5">知识库</Title>
                <IconRefresh cursor={'pointer'} onClick={getDataSetList} />
            </Flex>

            <Box pl={4} pr={4} >
                <MultiSelect
                    data={documentSelectData}
                    placeholder="添加数据集"
                    {...form.getInputProps('fuzzy_datasets')}
                />
            </Box>
        </Paper>
        <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }}>
            <Flex justify={'space-between'} align={'center'}>
                <Title order={5} size="h5" >内置能力</Title>
            </Flex>

            <Box pl={4} pr={4} >
                <Checkbox.Group
                    value={form.values.capabilities}
                    onChange={(values) => {
                        console.log(values)
                        form.setValues({
                            capabilities: values
                        })
                    }}
                >
                    <Group mt="xs">
                        <Checkbox value="web-browser" label="Web浏览" />
                        <Checkbox value="code-interpreter" label="代码解释器" disabled />
                    </Group>
                </Checkbox.Group>
            </Box>
        </Paper>
        <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }}>
            <Flex justify={'space-between'} align={'center'}>
                <Title order={5} size="h5">执行工具</Title>
                <IconRefresh cursor={'pointer'} onClick={getToolList} />
            </Flex>

            <Box pl={4} pr={4} mb={12}>
                <MultiSelect
                    data={toolList.map((item: any) => {
                        return {
                            label: item.name,
                            value: item.id
                        }
                    })}
                    description="执行工具是LLM可以调用的工具"
                    label="执行工具"
                    placeholder=""
                    {...form.getInputProps('action_tools')}
                />
            </Box>
        </Paper>
    </Flex>
}

export function AssistantBuilder({ appId }: AssistantProps) {
    const router = useRouter();
    const { pathname, query } = router;
    const assistantId = query.assistantId;
    const setLoading = useAssistantStore().setLoading;
    const loading: boolean = useAssistantStore().loading;
    const updateCurrentAssistant = useAssistantStore().updateCurrentAssistant;
    const currentAssistant = useAssistantStore().currentAssistant;
    const modelList: Model[] = useModelStore().modelList;
    const form: any = useForm({
        initialValues: {
            name: '',
            description: '',
            retrieval_prompt_template: DATA_RETRIVAL_PROMPT_TEMPLATE,
            app_id: parseInt(appId),
            exact_datasets: [],
            fuzzy_datasets: [],
            action_tools: [],
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
            system_message: '',
            instruction: '',
            exact_search_limit: 1,
            fuzzy_search_limit: 3,
            prompt_starts: [],
            capabilities: ['ac-img-gen', 'web-browser']
        },
        validate: {
            name: (value) => (!value ? '智能助手名必填' : null)
        },
    });
    useEffect(() => {
        getModelList();
        if (assistantId) {
            (async () => {
                const assistant = await getAssistant(assistantId);
                updateCurrentAssistant(assistant);
            })()
        }
    }, []);
  
    useEffect(() => {
        if (currentAssistant) {
            const datasets = currentAssistant?.datasets;
            form.setValues({
                id: currentAssistant?.id,
                name: currentAssistant?.name,
                description: currentAssistant?.description,
                retrieval_prompt_template: currentAssistant?.retrieval_prompt_template,
                action_tools: currentAssistant?.action_tools?.map((item: any) => item.id),
                app_id: currentAssistant?.app_id,
                exact_datasets: datasets?.filter((item: Dataset) => item.dataset_type === DataSetType.QUESTION).map((item: Dataset) => item.dataset_id),
                fuzzy_datasets: datasets?.filter((item: Dataset) => item.dataset_type === DataSetType.DOCUMENT).map((item: Dataset) => item.dataset_id),
                exact_search_similarity: currentAssistant?.exact_search_limit,
                fuzzy_search_similarity: currentAssistant?.fuzzy_search_similarity,
                temperature: currentAssistant?.temperature,
                top_p: currentAssistant?.top_p,
                n_sequences: currentAssistant?.n_sequences,
                max_tokens: currentAssistant?.max_tokens,
                stop: currentAssistant?.stop,
                presence_penalty: currentAssistant?.presence_penalty,
                frequency_penalty: currentAssistant?.frequency_penalty,
                logit_bias: currentAssistant?.logit_bias,
                model_id: currentAssistant?.model_id,
                redis_ip_ex: currentAssistant?.redis_ip_ex,
                redis_history_ex: currentAssistant?.redis_history_ex,
                model_ip_limit: currentAssistant?.model_ip_limit,
                llm_history_len: currentAssistant?.llm_history_len,
                system_message: currentAssistant?.system_message,
                instruction: currentAssistant?.instruction,
                exact_search_limit: currentAssistant?.exact_search_limit,
                fuzzy_search_limit: currentAssistant?.fuzzy_search_limit
            })
        }
    }, [currentAssistant])

    useEffect(() => {
        if (modelList.length > 0) {
            form.setValues({
                model_id: modelList[0].id
            })
        }
    }, [modelList]);
    const modelSelectData: any = modelList.map((item: Model) => { return { label: item.name_alias, value: item.id } });
    return (
        <div style={{ position: 'relative' }}>
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Box h={56} w="100%" style={{ borderBottom: '1px solid rgba(217,217,227,.15)', position: 'relative' }} p={12}>
                <Flex justify={'space-between'} align={'center'} h={'100%'} >
                    <Flex align={'center'} h={'100%'} >
                        <ActionIcon onClick={() => {
                            router.push(pathname.replace('/builder', '').replace('[id]', appId))
                        }}>
                            <IconArrowBackUp />
                        </ActionIcon>
                        <Title order={4}>新建智能助手</Title>
                    </Flex>
                    <div>
                        <Button onClick={async () => {
                            form.validate();
                            if (form.isValid()) {
                                setLoading(true);
                                const values: any = form.values;
                                if (assistantId) {
                                    await updateAssistant(assistantId, values);
                                } else {
                                    const result = await addAssistant(values);
                                    const assistantId = result.id;
                                    if (assistantId) {
                                        await refreshToken(assistantId);
                                        window.history.pushState({}, '', `?assistantId=${assistantId}`);
                                        updateCurrentAssistant(Object.assign({}, values, { id: assistantId }));
                                    }
                                }


                                setLoading(false);
                            }
                        }}>保存</Button>
                    </div>
                </Flex>
            </Box>
            <Box w="100%" style={{ height: 'calc(100vh - 56px)' }} >
                <Flex h={'100%'} style={{ overflow: 'hidden' }}>
                    <Box w="50%" h="100%" p={16} style={{ borderRight: '1px solid rgba(217,217,227,.15)' }}>
                        <Center maw={'100%'} h={38} mx="auto" style={{ position: 'relative', marginBottom: 12 }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0 }}>
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

                            </div>
                            <Text fw={700}>配置</Text>
                        </Center>
                        <Box h={'calc(100vh - 94px)'} style={{ overflowY: 'auto', paddingBottom: 64 }}>
                            <AssistantForm appId={appId} form={form} />
                        </Box>
                    </Box>
                    <Box w="50%" h="100%" p={16}>
                        <Center maw={'100%'} h={38} mx="auto">
                            <Text fw={700}>预览</Text>
                        </Center>
                        {currentAssistant?.id ? <AssistantChat /> : null}

                    </Box>
                </Flex>
            </Box>
        </div>
    );
}
