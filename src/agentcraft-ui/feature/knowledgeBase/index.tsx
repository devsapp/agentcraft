import React, { useEffect } from "react";
import { Breadcrumbs, Anchor, Button, Box, Table, Modal, Text, TextInput, Group, Divider, Title, Paper, Flex, Badge, LoadingOverlay, Textarea, MultiSelect, NumberInput, Select, Drawer } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { getModelList, useGlobalStore as modelUseGlobalStore } from '@/store/model';
import { getDataSetList, useGlobalStore as dataSetUseGlobalStore } from '@/store/dataset';
import { formatDateTime } from '@/util/index';
import { Model } from '@/types/model';
import { DataSet, DataSetType } from '@/types/dataset';

import { getKnowledgeBaseList, useGlobalStore, addKnowledgeBase, refreshToken, updateKnowledgeBase, getKnowledgeBase, } from '@/store/knowledgeBase';
import { KnowledgeBase, KnowledgeBaseResponseData, Dataset } from '@/types/knowledgeBase';
import { FORM_WIDTH_1280 } from '@/constant/index';
import CopyToClipboard from '@/components/CopyToClipboard';
// import styles from './index.module.scss';


interface KnowledgeBaseProps {
    appId: number;
}



function AddOrUpdate({ appId }: any) {
    const open = useGlobalStore().open;
    const setOpen = useGlobalStore().setOpen;
    const isEdit = useGlobalStore().isEdit;
    const setEditStatus = useGlobalStore().setEditStatus;
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
        if (isEdit) {
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
        }
    }, [currentKnowledgeBase]);
    const modelSelectData: any = modelList.map((item: Model) => { return { label: item.name, value: item.id } });
    const documentSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.DOCUMENT).map((item: DataSet) => { return { label: item.name, value: item.id } });
    const qaSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.QUESTION).map((item: DataSet) => { return { label: item.name, value: item.id } });
    return (
        <Modal opened={open} onClose={() => { setEditStatus(false); setOpen(false); }} title={isEdit ? "编辑知识库" : "创建知识库"} centered size="55%">


            <Title order={4} mb={8}>基础设置</Title>

            <Paper shadow="xs" p="md" withBorder >
                <Title order={5} size="h5">知识库</Title>
                <Box maw={FORM_WIDTH_1280} pl={4} pr={4} >
                    <TextInput withAsterisk label="名称" placeholder="输入知识库名称" {...form.getInputProps('name')} />
                    <Textarea label="描述" placeholder="输入应用描述" {...form.getInputProps('description')} />
                </Box>

                <Divider my="sm" />

                <Title order={5} size="h5">提示词</Title>
                <Box maw={FORM_WIDTH_1280} pl={4} pr={4} >
                    <Textarea label="系统提示词" placeholder="输入系统提示词" {...form.getInputProps('system_message')} />
                    <Textarea withAsterisk label="提示词模板" placeholder="" {...form.getInputProps('prompt_template')} />
                    {/* <TextInput label="停止提示词" placeholder="停止输出的token" {...form.getInputProps('stop')} /> */}
                </Box>
                <Divider my="sm" />

                <Title order={5} size="h5">数据集</Title>
                <Box maw={FORM_WIDTH_1280} pl={4} pr={4} >
                    <Group grow>
                        <MultiSelect
                            data={documentSelectData}
                            label="文档数据集"
                            placeholder="添加模糊数据集"
                            {...form.getInputProps('fuzzy_datasets')}
                        />
                        <MultiSelect
                            data={qaSelectData}
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
                        label="模型服务"
                        placeholder=""
                        {...form.getInputProps('model_id')}
                    />
                </Box>
                <Divider my="sm" />
            </Paper>
            <Title order={4} mb={8} mt={8}>高级设置</Title>

            <Paper shadow="xs" p="md" withBorder>
                <Title order={5} size="h5" >答案召回</Title>
                <Box maw={FORM_WIDTH_1280} pl={4} pr={4}>
                    <Group grow>
                        <NumberInput withAsterisk label="模糊答案召回精度" placeholder="" {...form.getInputProps('fuzzy_search_similarity')} />
                        <NumberInput withAsterisk label="精准答案召回精度" placeholder="" {...form.getInputProps('exact_search_similarity')} />
                    </Group>
                    <Group grow>
                        <NumberInput withAsterisk label="模糊答案召回数量" placeholder="" {...form.getInputProps('fuzzy_search_limit')} />
                        <NumberInput withAsterisk label="精准答案召回数量" placeholder="" {...form.getInputProps('exact_search_limit')} />
                    </Group>
                </Box>
                <Divider my="sm" />
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
                </Box>
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
            <Box maw={FORM_WIDTH_1280} pt={12} style={{ textAlign: 'right' }}>
                <Button onClick={async () => {
                    form.validate();
                    if (form.isValid()) {
                        setLoading(true);
                        const values: any = form.values;
                        if (!isEdit) {
                            await addKnowledgeBase(values);
                        } else {
                            await updateKnowledgeBase(values.id, values)
                        }

                        await getKnowledgeBaseList(appId);
                        setOpen(false);
                        setLoading(false);
                    }

                }}>确认</Button>
            </Box>
        </Modal>
    );
}



function List({ appId }: KnowledgeBaseProps) {
    const knowledgeBaseList: KnowledgeBaseResponseData[] = useGlobalStore().knowledgeBaseList;
    const setLoading = useGlobalStore().setLoading;
    const updateCurrentKnowledgeBase = useGlobalStore().updateCurrentKnowledgeBase;
    const setEditStatus = useGlobalStore().setEditStatus;
    const setOpen = useGlobalStore().setOpen;
    const [opened, { open, close }] = useDisclosure(false);
    const generateToken = async (agentId: number) => {
        try {
            setLoading(true);
            await refreshToken(agentId);
            await getKnowledgeBaseList(appId);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }

    }
    const rows = knowledgeBaseList.map((element: KnowledgeBaseResponseData) => (
        <tr key={element.id}>
            <td style={{ width: 20 }}>{element.id}</td>
            <td style={{ width: 100 }}>{element.name}</td>
            <td style={{ width: 100 }}>{element.description}</td>
            <td style={{ width: 200 }}>{element.system_message}</td>
            <td style={{ width: 300 }}>{element.prompt_template}<CopyToClipboard value={element.prompt_template} /></td>
            <td >{element.token ? <Flex
                mih={50}
                style={{ width: 300 }}
                gap="xs"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="nowrap"><Text truncate>{element.token}</Text><CopyToClipboard value={element.token} /></Flex> : <Button color="lime" size="xs" compact onClick={() => generateToken(element.id)}>生成访问令牌</Button>}</td>
            <td>{formatDateTime(element.created)}</td>
            <td>
                <Button color="grape" variant="filled" size="xs" onClick={() => { open() }} mr={4} >问答测试</Button>
                <Button variant="filled"
                    size="xs"
                    onClick={async () => {
                        setEditStatus(true);
                        const knowledgeBase = await getKnowledgeBase(element.id);
                        updateCurrentKnowledgeBase(knowledgeBase);
                        setOpen(true)
                    }}
                    mr={4}>
                    编辑
                </Button>
                <Button variant="filled" color="red" size="xs" onClick={() => { }}>删除</Button></td>
        </tr>
    ));
    useEffect(() => {
        getKnowledgeBaseList(appId);
    }, []);

    return (
        <>
            <Drawer
                opened={opened}
                onClose={close}
                title="知识库测试"
                position="right"
                overlayProps={{ opacity: 0.5, blur: 4 }}
            >
                <Box p={4}>
                    <Text>
                        请使用以下token访问知识库
                    </Text>
                    <Text>
                        测试
                    </Text>
                </Box>
            </Drawer>

            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>名称</th>
                        <th>描述</th>
                        <th>系统提示词</th>
                        <th>完整提示词</th>
                        <th>访问token</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
}



export function KnowledgeBasePage({ appId }: KnowledgeBaseProps) {
    const loading: boolean = useGlobalStore().loading;
    const items = [
        { title: '应用列表', href: '/app' },
        { title: '知识库', href: `/app/${appId}/knowledgeBase` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const setOpen = useGlobalStore().setOpen;

    return (
        <Box pos="relative" >
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Breadcrumbs>{items}</Breadcrumbs>
            <Box mt={12} >
                <Button onClick={() => setOpen(true)}>
                    新建知识库
                </Button>
            </Box>
            <AddOrUpdate appId={appId} />
            <List appId={appId} />
        </Box>

    );
}
