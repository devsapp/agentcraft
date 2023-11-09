import React, { useEffect } from "react";
import Link from 'next/link';
import { Breadcrumbs, Anchor, Button, Box, Table, Modal, Text, TextInput, Group, Divider, Title, Paper, Tooltip, Flex, Badge, LoadingOverlay, Textarea, MultiSelect, NumberInput, Select, Drawer } from '@mantine/core';
import { useForm } from '@mantine/form';
import { getModelList, useGlobalStore as modelUseGlobalStore } from '@/store/model';
import { getDataSetList, useGlobalStore as dataSetUseGlobalStore } from '@/store/dataset';
import { formatDateTime } from 'utils/index';
import { Model } from '@/types/model';
import { DataSet, DataSetType } from '@/types/dataset';
import FeatureDescription from '@/components/FeatureDescription';
import { getKnowledgeBaseList, useGlobalStore, addKnowledgeBase, refreshToken, updateKnowledgeBase, getKnowledgeBase, } from '@/store/knowledgeBase';
import { KnowledgeBaseResponseData, Dataset } from '@/types/knowledgeBase';
import { FORM_WIDTH_1280,PROMPT_TEMPLATE, DEFAULT_SYSTEM_PROMPT } from 'constants/index';

import CopyToClipboard from '@/components/CopyToClipboard';
import Chat from 'features/chat';
// import styles from './index.module.scss';

enum ContainerType {
    ADD_OR_UPDATE = 1, // 增加和修改
    CHAT = 2, // 问答
}
interface KnowledgeBaseProps {
    appId: number;
}


export function KnowledgeBaseForm({ appId, containerType }: { appId: any, containerType?: ContainerType }) {

    const setOpen = useGlobalStore().setOpen;
    const isEdit = useGlobalStore().isEdit;
    const currentKnowledgeBase = useGlobalStore().currentKnowledgeBase;
    const setLoading = useGlobalStore().setLoading;
    const modelList: Model[] = modelUseGlobalStore().modelList;
    const dataSetList: DataSet[] = dataSetUseGlobalStore().dataSetList;
    const form: any = useForm({
        initialValues: {
            name: '',
            description: '',
            prompt_template: PROMPT_TEMPLATE,
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
            system_message: DEFAULT_SYSTEM_PROMPT,
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
    const modelSelectData: any = modelList.map((item: Model) => { return { label: item.name_alias, value: item.id } });
    const documentSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.DOCUMENT).map((item: DataSet) => { return { label: item.name, value: item.id } });
    const qaSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.QUESTION).map((item: DataSet) => { return { label: item.name, value: item.id } });
    return <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="column"
    >
        <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="nowrap"
        >
            <div style={{ width: '50%' }}>

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
                        <Textarea label="提示词模板" placeholder="" {...form.getInputProps('prompt_template')} minRows={6} description="提示词模板可以将检索的结果context和用户的输入query整合到一起，最后整体输入给大语言模型" />
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
                                description="问答数据集用来做精确匹配"
                                label="问答数据集"
                                placeholder="添加精准数据集"
                                {...form.getInputProps('exact_datasets')}
                            />
                        </Group>
                    </Box>
                    <Divider my="sm" />
                    <Title order={5} size="h5" >基础模型</Title>
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
            <div style={{ width: '50%' }}>
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
            </div>
        </Flex>
        <Box maw={FORM_WIDTH_1280} pt={4} style={{ textAlign: 'center', width: '100%' }}>
            <Button style={{ width: '100%' }} onClick={async () => {
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
    </Flex>
}
function AddOrUpdate({ appId }: any) {
    const open = useGlobalStore().open;
    const setOpen = useGlobalStore().setOpen;
    const isEdit = useGlobalStore().isEdit;
    const setEditStatus = useGlobalStore().setEditStatus;


    return (
        <Modal opened={open} onClose={() => { setEditStatus(false); setOpen(false); }} title={isEdit ? "编辑知识库" : "创建知识库"} centered size="55%">

            <KnowledgeBaseForm appId={appId} />

        </Modal>
    );
}

export function ChatDrawer({ appId }: KnowledgeBaseProps) {
    const chatDrawer = useGlobalStore().chatDrawer;
    const setChatDrawer = useGlobalStore().setChatDrawer;
    return <Drawer
        opened={chatDrawer}
        onClose={() => { setChatDrawer(false) }}
        title={<div><Text fz="xl" >知识库调试</Text><Text fz="sm">您可以通过提示词调整，数据集切换，模型服务，以及切换模型参数来调整知识库问答的效果</Text></div>}
        position="right"
        size="90%"
        overlayProps={{ opacity: 0.5, blur: 4 }}
    >
        <Flex
            mih={50}
            direction="row"
        >
            <div style={{ width: '60%' }}>
                <div style={{ marginBottom: 12 }}><Badge color="orange" size="lg" radius="xs" variant="filled">知识库参数设置</Badge></div>
                <KnowledgeBaseForm appId={appId} containerType={ContainerType.CHAT} />
            </div>
            <div style={{ marginLeft: 12, borderLeft: '1px solid #eee', paddingLeft: 8, width: '40%' }}>
                <div><Badge color="orange" size="lg" radius="xs" variant="filled">知识库问答</Badge></div>
                <Chat />
            </div>
        </Flex>
    </Drawer>
}

function List({ appId }: KnowledgeBaseProps) {
    const knowledgeBaseList: KnowledgeBaseResponseData[] = useGlobalStore().knowledgeBaseList;
    const setLoading = useGlobalStore().setLoading;
    const updateCurrentKnowledgeBase = useGlobalStore().updateCurrentKnowledgeBase;
    const setEditStatus = useGlobalStore().setEditStatus;
    const setOpen = useGlobalStore().setOpen;
    const setChatDrawer = useGlobalStore().setChatDrawer;
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
            <td style={{ width: 100 }}><Link href={`/app/${appId}/knowledgeBase/${element.id}/detail`}>{element.name}</Link></td>
            <td style={{ width: 100 }}>{element.description}</td>
            <td style={{ width: 200 }}>{element.system_message}</td>
            <td style={{ width: 300 }}><CopyToClipboard value={element.prompt_template} content={element.prompt_template} /></td>
            <td >{element.token ? <CopyToClipboard value={element.token} content={element.token} truncate /> : <Button color="lime" size="xs" compact onClick={() => generateToken(element.id)}>生成访问令牌</Button>}</td>
            <td>{formatDateTime(element.created)}</td>
            <td>
                {!element.token ? <Tooltip label="需要成访问令牌才可以访问此能力" >
                    <Button
                        color="grape"
                        variant="filled"
                        size="xs"
                        mr={4} >问答测试</Button>
                </Tooltip> : <Button
                    color="grape"
                    variant="filled"
                    size="xs"
                    onClick={async () => {
                        setEditStatus(true);
                        const knowledgeBase = await getKnowledgeBase(element.id);
                        updateCurrentKnowledgeBase(knowledgeBase);
                        setChatDrawer(true);
                    }}
                    mr={4} >
                    问答测试
                </Button>}
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
    const getKonwledgeBase = async () => {
        setLoading(true);
        try {
            await getKnowledgeBaseList(appId);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }
    useEffect(() => {
        getKonwledgeBase();
    }, [appId]);

    return (
        <>

            <ChatDrawer appId={appId}/>
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
        <div style={{ position: 'relative' }} >
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Breadcrumbs>{items}</Breadcrumbs>
            <FeatureDescription title="知识库" description="知识库使用RAG(Retrieval-Augmented Generation 检索增强生成)技术来将大语言模型跟数据进行结合，以实现更准确的预测" />
            <Box  >
                <Button onClick={() => setOpen(true)}>
                    新建知识库
                </Button>
            </Box>
            <AddOrUpdate appId={appId} />
            <List appId={appId} />
        </div>

    );
}
