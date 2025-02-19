import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Center, Button, Box, TextInput, Text, Group, Select, Textarea, Flex, Paper, Title, Radio } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconRefresh, IconLink } from '@tabler/icons-react';
import { getModelList, useModelStore } from 'store/model';
import { getDataSetList } from 'store/dataset';
import { createShare } from 'store/share';
import { Model } from 'types/model';
import { useKnowledgeBaseStore, addKnowledgeBase, refreshToken, updateKnowledgeBase, getKnowledgeBase } from 'store/knowledgeBase';
import { Dataset } from 'types/knowledgeBase';
import { DataSetType } from 'types/dataset';
import { DEFAULT_CHAT_INSTRUCTION } from 'constants/instructions'
import KnowledgeBaseChat from 'features/knowledgeBase/chat';
import { InstructionLLMForm } from 'components/InstructionLLMForm';

interface AssistantProps {
    workspaceId: any;
}


export function InstructionChatForm({ form }: { form: any }) {
    return <Box pr={32}>
        <Paper shadow="xs" p="md" withBorder mt={12}>
            <Title order={5} size="h5">问答信息</Title>
            <Box pl={4} pr={4} >
                <TextInput withAsterisk label="名称" placeholder="输入知识库名称" {...form.getInputProps('name')} />
                <Textarea label="描述" placeholder="输入应用描述" description="请输入知识库的描述信息" {...form.getInputProps('description')} />
            </Box>
        </Paper>
        <InstructionLLMForm form={form} />
    </Box>
}

export function BuilderForm({ workspaceId }: AssistantProps) {
    const { setLoading, currentKnowledgeBase, updateCurrentKnowledgeBase } = useKnowledgeBaseStore();
    const router = useRouter();
    const { query } = router;
    const instructionChatId: any = query.instructionChatId || currentKnowledgeBase?.id;
    const initAgentName = query.initAgentName;
    const modelList: Model[] = useModelStore().modelList;
    const [disabledSave, setDisabledSave] = useState(modelList?.length === 0);
    const initFormValue = {
        name: initAgentName,
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
        system_message: DEFAULT_CHAT_INSTRUCTION,
        exact_search_limit: 1,
        fuzzy_search_limit: 3,
        is_public: '0',
    }
    const form: any = useForm({
        initialValues: initFormValue,
        validate: {
            name: (value) => (!value ? '问答名必填' : null)
        },
    });
    useEffect(() => {
        updateCurrentKnowledgeBase(undefined); // 清理当前知识库
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
        setDisabledSave(modelList.length === 0)
        if (modelList.length > 0 && !instructionChatId) {
            form.setValues({
                model_id: modelList[0].id
            });
        }
    }, [modelList]);
    useEffect(() => {
        if (currentKnowledgeBase?.id) {
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
                fuzzy_search_limit: currentKnowledgeBase?.fuzzy_search_limit,
                is_public: `${currentKnowledgeBase?.is_public || 0}`,
            })
        } else {
            form.setValues(initFormValue)
        }
    }, [currentKnowledgeBase])

    const onSubmit = async () => {
        setDisabledSave(true);
        try {
            form.validate();
            if (form.isValid()) {
                setLoading(true);
                const values: any = { ...form.values };
                values.is_public = values.is_public === '1' ? 1 : 0;
                if (currentKnowledgeBase?.id) {
                    await updateKnowledgeBase(currentKnowledgeBase?.id, values);
                } else {
                    const result = await addKnowledgeBase(values);
                    const instructionChatId = result.id;
                    if (instructionChatId) {
                        const { token } = await refreshToken(instructionChatId);
                        // window.history.pushState({}, '', `?instructionChatId=${instructionChatId}`);
                        const url = new URL(window.location.href);
                        const newPath = `${url.pathname}/${instructionChatId}`;
                        const newUrl = new URL(newPath, url.origin);
                        window.history.pushState({}, '', newUrl.toString());
                        updateCurrentKnowledgeBase(Object.assign({}, values, { id: instructionChatId, token }));
                    }

                }
                setLoading(false);
            }
        } catch (e) {
        }
        setDisabledSave(false);
    }


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
                        <Button h={32} mr={12} onClick={onSubmit} disabled={disabledSave}>保存</Button>
                    </Flex>
                </Box>
            </Center>
            <Box h={'calc(100vh - 142px)'} style={{ overflowY: 'auto', paddingBottom: 64 }}>
                <InstructionChatForm form={form} />
            </Box>
        </Box>
        <Box w="50%" h="100%" p={16}>
            <Center maw={'100%'} h={38} mx="auto">
                <Text
                    fw={700}
                    td="underline"
                    style={{ cursor: 'pointer' }}
                    onClick={async () => {
                        const { token: shareToken } = await createShare(instructionChatId);
                        window.open(`/chatBot/${workspaceId}/${instructionChatId}?shareToken=${shareToken}`);
                    }}>
                    对外分享
                </Text>
                <IconLink size={'1rem'} />
            </Center>
            {currentKnowledgeBase?.id ? <KnowledgeBaseChat /> : null}
        </Box>
    </Flex>);
}
