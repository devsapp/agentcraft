import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

import { Center, ActionIcon, Tooltip, Spoiler, Breadcrumbs, Anchor, Button, Checkbox, Box, Table, TextInput, Text, Highlight, Switch, Group, Badge, MultiSelect, Select, Drawer, LoadingOverlay, Modal, Textarea, Flex, NumberInput, Paper, Title, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconRefresh, IconArrowBackUp } from '@tabler/icons-react';
import { getModelList, useModelStore } from 'store/model';
import { getDataSetList, useDataSetStore } from 'store/dataset';
import { Model } from 'types/model';
import { DataSet, DataSetType } from 'types/dataset';
import { useAssistantStore, addAssistant, refreshToken, updateAssistant, getAssistant } from 'store/assistant';
import { getToolList, useActionToolStore } from 'store/actionTools';
import { Dataset } from 'types/assistant';
import { DATA_RETRIVAL_PROMPT_TEMPLATE } from 'constants/instructions';
import AssistantChat from 'features/assistant/chat';


interface AssistantProps {
    workspaceId: any;
}



export function AssistantForm({ workspaceId, form }: { workspaceId: any, form: any }) {
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
        {/* <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }}>
            <Flex justify={'space-between'} align={'center'}>
                <Title order={5} size="h5" >内置能力（待开放）</Title>
            </Flex>

            <Box pl={4} pr={4} >
                <Checkbox.Group
                    value={form.values.capabilities}
                    onChange={(values) => {
                        form.setValues({
                            capabilities: values
                        })
                    }}
                >
                    <Group mt="xs">
                        <Checkbox value="code_interpreter" label="代码解释器" disabled />
                    </Group>
                </Checkbox.Group>
            </Box>
        </Paper> */}
        <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }}>
            <Flex justify={'space-between'} align={'center'}>
                <Title order={5} size="h5">AI工具</Title>
                <IconRefresh cursor={'pointer'} onClick={getToolList} />
            </Flex>

            <Box pl={4} pr={4} mb={12}>
                <MultiSelect
                    data={toolList.map((item: any) => {
                        return {
                            label: `${item.alias}(${item.name})`,
                            value: item.id
                        }
                    })}
                    description="AI工具是LLM可以调用的工具"
                    label="AI工具"
                    placeholder=""
                    {...form.getInputProps('action_tools')}
                />
            </Box>
        </Paper>
        <Paper shadow="xs" p="md" withBorder mt={12}>
            <Title order={5} size="h5">LLM参数</Title>
            <Box pl={4} pr={4} mt={4}>
                <Group grow>
                    <TextInput withAsterisk label="temperature" placeholder="" description="采样温度，用于控制模型生成文本的多样性。temperature越高，生成的文本更多样，反之，生成的文本更确定。取值范围： [0, 2)" {...form.getInputProps('temperature')} />
                    <TextInput withAsterisk label="top_p" placeholder="" description="核采样的概率阈值，用于控制模型生成文本的多样性。top_p越高，生成的文本更多样。反之，生成的文本更确定。取值范围：（0,1.0]" {...form.getInputProps('top_p')} />
                </Group>
                <Group grow>
                    <TextInput withAsterisk label="n_sequences" placeholder="" description="" {...form.getInputProps('n_sequences')} />
                    <TextInput withAsterisk label="max_tokens" placeholder="" description="允许模型生成的最大Token数。" {...form.getInputProps('max_tokens')} />
                </Group>
                <Group grow>
                    <TextInput withAsterisk label="presence_penalty" placeholder="控制模型生成文本时的内容重复度。值范围：[-2.0, 2.0]。正数会减少重复度，负数会增加重复度。适用场景：较高的presence_penalty适用于要求多样性、趣味性或创造性的场景，如创意写作或头脑风暴。较低的presence_penalty适用于要求一致性或专业术语的场景，如技术文档或其他正式文档。" description="" {...form.getInputProps('presence_penalty')} />
                    <TextInput withAsterisk label="frequency_penalty" placeholder="" description="" {...form.getInputProps('frequency_penalty')} />
                </Group>
                <TextInput label="logit_bias" placeholder="" {...form.getInputProps('logit_bias')} width={'50%'} />
            </Box>
        </Paper>
    </Flex>
}

export function BuilderForm({ workspaceId }: AssistantProps) {
    const router = useRouter();
    const { query } = router;
    const initAgentName = query.initAgentName;
    const assistantId = query.assistantId;
    const [disabledSave, setDisabledSave] = useState(false);
    const setLoading = useAssistantStore().setLoading;
    const updateCurrentAssistant = useAssistantStore().updateCurrentAssistant;
    const currentAssistant = useAssistantStore().currentAssistant;
    const modelList: Model[] = useModelStore().modelList;
    const initFormValue = {
        name: initAgentName,
        description: '',
        retrieval_prompt_template: DATA_RETRIVAL_PROMPT_TEMPLATE,
        app_id: parseInt(workspaceId),
        exact_datasets: [],
        fuzzy_datasets: [],
        action_tools: [],
        exact_search_similarity: 0.9,
        fuzzy_search_similarity: 0.6,
        temperature: 0.5,
        top_p: 1.0,
        n_sequences: 1,
        max_tokens: 8000,
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
        capabilities: []
    }
    const form: any = useForm({
        initialValues: initFormValue,
        validate: {
            name: (value) => (!value ? '智能助手名必填' : null)
        },
    });
    useEffect(() => {
        updateCurrentAssistant(undefined);
        getModelList();
        if (assistantId) {
            (async () => {
                const assistant = await getAssistant(assistantId);
                updateCurrentAssistant(assistant);
            })()
        } else {
            form.setValues(initFormValue)
        }
    }, []);

    useEffect(() => {
        if (currentAssistant?.id) {
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
        } else {
            form.setValues(initFormValue)
        }
    }, [currentAssistant])

    useEffect(() => {
        if (modelList.length > 0 && !assistantId) {
            form.setValues({
                model_id: modelList[0].id
            });
        }
    }, [modelList]);

    const modelSelectData: any = modelList.map((item: Model) => { return { label: item.name_alias, value: item.id } });
    return (<Flex h={'100%'} style={{ overflow: 'hidden' }}>
        <Box w="50%" h="100%" style={{ borderRight: '1px solid rgba(217,217,227,.15)' }}>
            <Center maw={'100%'} h={38} mx="auto" pos={'relative'} mt={12} mb={12} >
                <Box style={{ position: 'absolute', top: 0, left: 0, bottom: 0 }}>
                    <Flex justify={'flex-start'} align={'center'}>
                        <Select
                            ml={8}
                            mr={8}
                            w={240}
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
                            setDisabledSave(true);
                            try {
                                form.validate();
                                if (form.isValid()) {
                                    setLoading(true);
                                    const values: any = form.values;
                                    // console.log(values, 'values');
                                    if (currentAssistant?.id) {
                                        await updateAssistant(currentAssistant?.id, values);
                                    } else {
                                        const result = await addAssistant(values);
                                        const assistantId = result.id;
                                        if (assistantId) {
                                            await refreshToken(assistantId);
                                            window.history.pushState({}, '', `?assistantId=${assistantId}`);
                                            const assistant = await getAssistant(assistantId);
                                            updateCurrentAssistant(assistant);
                                        }
                                    }
                                    setLoading(false);
                                }
                            } catch (e) { }
                            setDisabledSave(false);
                        }} disabled={disabledSave}>保存</Button>
                    </Flex>
                </Box>
            </Center>
            <Box h={'calc(100vh - 142px)'} style={{ overflowY: 'auto', paddingBottom: 64 }}>
                <AssistantForm workspaceId={workspaceId} form={form} />
            </Box>
        </Box>
        <Box w="50%" h="100%" p={16}>
            <Center maw={'100%'} h={38} mx="auto">
                <Text fw={700}>预览</Text>
            </Center>
            {currentAssistant?.id ? <AssistantChat /> : null}

        </Box>
    </Flex>);
}
