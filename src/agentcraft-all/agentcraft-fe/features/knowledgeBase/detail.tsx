import React, { useEffect, useState } from "react";
import { Breadcrumbs, Anchor, Button, Box, Table, Modal, Text, TextInput, Group, Divider, Title, Paper, Flex, Badge, LoadingOverlay, Textarea, MultiSelect, NumberInput, Select, Drawer } from '@mantine/core';
import { useForm } from '@mantine/form';

import { getModelList, useGlobalStore as modelUseGlobalStore } from '@/store/model';
import { getDataSetList, useGlobalStore as dataSetUseGlobalStore } from '@/store/dataset';
import { Model } from '@/types/model';
import { DataSet, DataSetType } from '@/types/dataset';
import {  useGlobalStore,  updateKnowledgeBase, getKnowledgeBase, } from '@/store/knowledgeBase';
import { Dataset } from '@/types/knowledgeBase';
import { FORM_WIDTH_1280 } from 'constants/index';
import FeatureDescription from '@/components/FeatureDescription';

// import styles from './index.module.scss';

enum ContainerType {
    ADD_OR_UPDATE = 1, // 增加和修改
    CHAT = 2, // 问答
}
interface DetailPageProps {
    appId: number;
    knowledgeBaseId: number
}


export function KnowledgeBaseForm({ appId, containerType }: { appId: any, containerType?: ContainerType }) {
    const setOpen = useGlobalStore().setOpen;
    // const isEdit = useGlobalStore().isEdit;
    const currentKnowledgeBase = useGlobalStore().currentKnowledgeBase;
    const setLoading = useGlobalStore().setLoading;
    const modelList: Model[] = modelUseGlobalStore().modelList;
    const dataSetList: DataSet[] = dataSetUseGlobalStore().dataSetList;
    const form: any = useForm({
        initialValues: {
            name: '',
            description: '',
            prompt_template: `已知信息：【{context}】。你需要积极，简洁和专业地来回答\`\`\`中的问题。如果问题和已知信息没有关系，或者问题存在争议性，请说 “抱歉，无法回答该问题”，不允许编造。问题是：\`\`\`{query}\`\`\``,
            app_id: parseInt(appId),
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
            system_message: '',
            exact_search_limit: 1,
            fuzzy_search_limit: 3

        },
        validate: {
            name: (value) => (!value ? '知识库名必填' : null)
        },
    });
    useEffect(() => {
        getModelList();
        getDataSetList();
        const datasets = currentKnowledgeBase?.datasets;
        form.setValues({
            id: currentKnowledgeBase?.id,
            name: currentKnowledgeBase?.name,
            description: currentKnowledgeBase?.description,
            prompt_template: currentKnowledgeBase?.prompt_template,
            app_id: currentKnowledgeBase?.app_id,
            exact_datasets: datasets?.filter((item: Dataset) => item.dataset_type === DataSetType.QUESTION).map((item: Dataset) => item.dataset_id),
            fuzzy_datasets: datasets?.filter((item: Dataset) => item.dataset_type === DataSetType.DOCUMENT).map((item: Dataset) => item.dataset_id),
            exact_search_similarity: currentKnowledgeBase?.exact_search_limit,
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
    }, [currentKnowledgeBase]);
    const modelSelectData: any = modelList.map((item: Model) => { return { label: item.name, value: item.id } });
    const documentSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.DOCUMENT).map((item: DataSet) => { return { label: item.name, value: item.id } });
    const qaSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.QUESTION).map((item: DataSet) => { return { label: item.name, value: item.id } });
    return <>
        <div style={{ width: '33%' }}>
            {containerType !== ContainerType.CHAT ? <Title order={4} mb={8}>基础设置</Title> : null}
            <Paper shadow="xs" p="md" withBorder >
                {containerType !== ContainerType.CHAT ? <>
                    <Title order={5} size="h5">知识库</Title>
                    <Box maw={FORM_WIDTH_1280} pl={4} pr={4} >
                        <TextInput withAsterisk label="名称" placeholder="输入知识库名称" {...form.getInputProps('name')} />
                        <Textarea label="描述" placeholder="输入应用描述" {...form.getInputProps('description')} />
                    </Box>
                    <Divider my="sm" />
                </> : null}

                <Title order={5} size="h5">提示词</Title>
                <Box maw={FORM_WIDTH_1280} pl={4} pr={4} >
                    <Textarea label="系统提示词" placeholder="输入系统提示词" {...form.getInputProps('system_message')} description="系统提示词作为第一个输入给大语言模型的文本，往往用来设定角色" />
                    <Textarea withAsterisk label="提示词模板" placeholder="" {...form.getInputProps('prompt_template')} minRows={6} description="提示词模板可以将检索的结果context和用户的输入query整合到一起，最后整体输入给大语言模型" />
                    {/* <TextInput label="停止提示词" placeholder="停止输出的token" {...form.getInputProps('stop')} /> */}
                </Box>
                <Divider my="sm" />

                <Title order={5} size="h5">数据集</Title>
                <Box maw={FORM_WIDTH_1280} pl={4} pr={4} >
                    <Group grow>
                        <MultiSelect
                            data={documentSelectData}
                            description="文档数据集用来做模型检索"
                            label="文档数据集"
                            placeholder="添加模糊数据集"
                            {...form.getInputProps('fuzzy_datasets')}
                        />
                        <MultiSelect
                            data={qaSelectData}
                            description="问答数据集用来做问题精确匹配"
                            label="问答数据集"
                            placeholder="添加精准数据集"
                            {...form.getInputProps('exact_datasets')}
                        />
                    </Group>
                </Box>
                <Divider my="sm" />
                <Title order={5} size="h5" >模型</Title>
                <Box maw={FORM_WIDTH_1280} pl={4} pr={4} mb={12}>
                    <Select
                        withAsterisk
                        data={modelSelectData}
                        description="LLM代理是大语言模型的代理服务，通过opneai范式的兼容，可以任意切换不同类型的LLM而不用修改业务代码"
                        label="LLM代理"
                        placeholder=""
                        {...form.getInputProps('model_id')}
                    />
                </Box>
                <Divider my="sm" />
            </Paper>
        </div>
        <div style={{ width: '33%' }}>
            {containerType !== ContainerType.CHAT ? <Title order={4} mb={8} >高级设置</Title> : null}
            <Paper shadow="xs" p="md" withBorder>
                <Title order={5} size="h5" >答案召回</Title>
                <Box maw={FORM_WIDTH_1280} pl={4} pr={4}>
                    <Group grow>
                        <TextInput withAsterisk description="文档数据检索的精度，取值0-1之间，建议取0.6~0.8" label="文档结果召回精度" placeholder="" {...form.getInputProps('fuzzy_search_similarity')} />
                        <TextInput withAsterisk description="问答数据检索的精度，取值0-1之间，建议取0.9~1" label="问答结果召回精度" placeholder="" {...form.getInputProps('exact_search_similarity')} />
                    </Group>
                    <Group grow>
                        <NumberInput withAsterisk description="文档结果的召回数量，数量越多信息越丰富，但是首先于LLM上下文长度，不宜过长" label="文档结果召回数量" placeholder="" {...form.getInputProps('fuzzy_search_limit')} />
                        <NumberInput withAsterisk description="问答结果的召回数量，数量越多信息越丰富，但是首先于LLM上下文长度，不宜过长" label="问答结果召回数量" placeholder="" {...form.getInputProps('exact_search_limit')} />
                    </Group>
                </Box>
                {/* <Divider my="sm" />
                <Title order={5} size="h5">安全访问</Title>
                <Box maw={FORM_WIDTH_1280} pl={4} pr={4}>
                    <Group grow>
                        <NumberInput withAsterisk label="历史记录保存数量" placeholder="" {...form.getInputProps('llm_history_len')} disabled />
                        <NumberInput withAsterisk label="单个ip每天访问次数上限" placeholder="" {...form.getInputProps('model_ip_limit')} disabled />
                    </Group>
                    <Group grow>
                        <NumberInput withAsterisk label="限制ip访问的时间" placeholder="" {...form.getInputProps('redis_ip_ex')} disabled />
                        <NumberInput label="描述" placeholder="限制历史记录保存的时间" {...form.getInputProps('redis_history_ex')} disabled />
                    </Group>
                </Box> */}
                <Divider my="sm" />
                <Title order={5} size="h5">大语言模型参数</Title>
                <Box maw={FORM_WIDTH_1280} pl={4} pr={4}>
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
                <Divider my="sm" />
            </Paper>
            <Box maw={FORM_WIDTH_1280} pt={24} style={{ textAlign: 'center', width: '100%' }}>
                <Button style={{ width: '100%' }} onClick={async () => {
                    form.validate();
                    if (form.isValid()) {
                        setLoading(true);
                        const values: any = form.values;
                        await updateKnowledgeBase(values.id, values)
                        setLoading(false);
                    }

                }}>确认修改</Button>
            </Box>
        </div>
    </>
}
export function APIAccess() {
    const currentKnowledgeBase = useGlobalStore().currentKnowledgeBase;
    return <div style={{ width: '33%' }}>
        <Title order={4} mb={8}>访问接入</Title>
        <Paper shadow="xs" p="md" withBorder >

            <Title order={5} size="h5">API访问</Title>
            <Box maw={FORM_WIDTH_1280} pl={4} pr={4} >
               <div>
                    <span>API访问地址：</span>
                    <span></span>
               </div>
               <div>
                    <span style={{wordBreak:'break-all'}}>API访问token：{currentKnowledgeBase?.token}</span>
                    <span></span>
               </div>

            </Box>
            <Divider my="sm" />


            <Title order={5} size="h5">API调用示例</Title>
            <Box maw={FORM_WIDTH_1280} pl={4} pr={4} >


            </Box>
            <Divider my="sm" />

            <Title order={5} size="h5">效果测试</Title>
            <Box maw={FORM_WIDTH_1280} pl={4} pr={4} >
                <Group grow>

                </Group>
            </Box>
        </Paper>
    </div>
}






export function DetailPage({ appId, knowledgeBaseId }: DetailPageProps) {
    const loading: boolean = useGlobalStore().loading;
    const updateCurrentKnowledgeBase = useGlobalStore().updateCurrentKnowledgeBase;
    const items = [
        { title: '应用列表', href: '/app' },
        { title: '知识库', href: `/app/${appId}/knowledgeBase` },
        { title: '知识库详细', href: `/app/${appId}/knowledgeBase/${knowledgeBaseId}/detail` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));
    useEffect(() => {
        (async () => {
            const knowledgeBase = await getKnowledgeBase(knowledgeBaseId);
            updateCurrentKnowledgeBase(knowledgeBase);
        })()
    }, [knowledgeBaseId])


    return (
        <Box pos="relative" >
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Breadcrumbs>{items}</Breadcrumbs>
            <FeatureDescription title="知识库详情" description="您可以查看修改知识库内容，以及查看API调用" />
            <Flex
                mih={50}
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="nowrap"
            >
                <APIAccess />
                <KnowledgeBaseForm appId={appId} />
            </Flex>
        </Box>

    );
}
