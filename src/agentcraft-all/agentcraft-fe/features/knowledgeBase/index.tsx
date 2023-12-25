import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Tooltip, Spoiler, Breadcrumbs, Anchor, Button, Box, Table, TextInput, Text, Highlight, Switch, Group, Badge, MultiSelect, Select, Drawer, LoadingOverlay, Modal, Textarea, Flex, NumberInput, Paper, Title, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconRefresh } from '@tabler/icons-react';
import { getModelList, useGlobalStore as modelUseGlobalStore } from 'store/model';
import { getDataSetList, useGlobalStore as dataSetUseGlobalStore } from 'store/dataset';
import { formatDateTime } from 'utils/index';
import { Model } from 'types/model';
import { DataSet, DataSetType } from 'types/dataset';
import FeatureDescription from 'components/FeatureDescription';
import { getKnowledgeBaseList, useKnowledgeBaseStore, addKnowledgeBase, refreshToken, updateKnowledgeBase, getKnowledgeBase, deleteKnowledgeBase } from 'store/knowledgeBase';
import { KnowledgeBaseResponseData, Dataset } from 'types/knowledgeBase';
import { PROMPT_TEMPLATE } from 'constants/index';
import { INSTRUCTION_TEMPLATES, DEFAULT_INSTRUCTION } from 'constants/instructions'
import CopyToClipboard from 'components/CopyToClipboard';
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

    const setOpen = useKnowledgeBaseStore().setOpen;
    const isEdit = useKnowledgeBaseStore().isEdit;
    const currentKnowledgeBase = useKnowledgeBaseStore().currentKnowledgeBase;
    const setLoading = useKnowledgeBaseStore().setLoading;
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
            system_message: DEFAULT_INSTRUCTION,
            exact_search_limit: 1,
            fuzzy_search_limit: 3

        },
        validate: {
            name: (value) => (!value ? '智能体名必填' : null)
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
        }
    }, [currentKnowledgeBase]);
    const modelSelectData: any = modelList.map((item: Model) => { return { label: item.name_alias, value: item.id } });
    const documentSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.DOCUMENT).map((item: DataSet) => { return { label: item.name, value: item.id } });
    const qaSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.QUESTION).map((item: DataSet) => { return { label: item.name, value: item.id } });
    let pannelWidth = containerType !== ContainerType.CHAT ? '25%' : '33.33%';
    return <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="column">
        <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="nowrap"
            style={{
                alignItems: 'stretch'
            }}
        >
            {containerType !== ContainerType.CHAT ?
                <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }}>
                    <Title order={5} size="h5">智能体信息</Title>
                    <Box pl={4} pr={4} >
                        <TextInput withAsterisk label="名称" placeholder="输入智能体名称" {...form.getInputProps('name')} />
                        <Textarea label="描述" placeholder="输入应用描述" description="请输入智能体的描述信息" {...form.getInputProps('description')} minRows={22} />
                    </Box>
                </Paper> : null}
            <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }}>
                <Title order={5} size="h5">调试指令</Title>
                <Box pl={4} pr={4} >
                    <Select
                        data={INSTRUCTION_TEMPLATES}
                        description=""
                        defaultValue={DEFAULT_INSTRUCTION}
                        {...form.getInputProps('system_message')}
                        label="指令示例"
                        placeholder=""
                        onChange={(value: string) => {
                            form.setValues({
                                system_message: value
                            })
                        }}
                    />
                    <Textarea withAsterisk label="系统提示词" placeholder="输入系统提示词" {...form.getInputProps('system_message')} minRows={22} description="系统提示词可以作为对大语言模型的约束指令" />
                    {/* <TextInput label="停止提示词" placeholder="停止输出的token" {...form.getInputProps('stop')} /> */}
                </Box>
            </Paper>
            <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }}>
                <Flex justify={'space-between'} align={'center'}>
                    <Title order={5} size="h5">LLM服务</Title>
                    <IconRefresh cursor={'pointer'} onClick={getModelList} />
                </Flex>

                <Box pl={4} pr={4} mb={12}>
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

            <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }}>
                <Flex justify={'space-between'} align={'center'}>
                    <Title order={5} size="h5" >数据召回</Title>
                    <IconRefresh cursor={'pointer'} onClick={getDataSetList} />
                </Flex>
                <Box pl={4} pr={4} >
                    <Textarea label="召回提示词模板" placeholder="" {...form.getInputProps('prompt_template')} minRows={containerType !== ContainerType.CHAT ? 6 : 8} description="召回提示词模板可以将检索的结果context和用户的输入query整合到一起，最后整体输入给大语言模型" />
                    {/* <TextInput label="停止提示词" placeholder="停止输出的token" {...form.getInputProps('stop')} /> */}
                </Box>
                <Divider my="sm" />
                <Title order={5} size="h6" >召回数据集</Title>
                <Box pl={4} pr={4} >
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
                <Title order={5} size="h6" >召回参数</Title>
                <Box pl={4} pr={4} mt={4}>
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
                {/* <Divider my="sm" />
                    <Title order={5} size="h5">大语言模型参数</Title>
                    <Box maw={FORM_WIDTH_1280} pl={4} pr={4} mt={4}>
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
                    <Divider my="sm" /> */}
            </Paper>
        </Flex>
        <Box pt={4} style={{ textAlign: 'center', width: '100%' }}>
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
    const open = useKnowledgeBaseStore().open;
    const setOpen = useKnowledgeBaseStore().setOpen;
    const isEdit = useKnowledgeBaseStore().isEdit;
    const setEditStatus = useKnowledgeBaseStore().setEditStatus;


    return (
        <Modal opened={open} onClose={() => { setEditStatus(false); setOpen(false); }} title={isEdit ? "编辑智能体" : "创建智能体"} centered size="90%">
            <KnowledgeBaseForm appId={appId} />
        </Modal>
    );
}

export function ChatDrawer({ appId }: KnowledgeBaseProps) {
    const chatDrawer = useKnowledgeBaseStore().chatDrawer;
    const setChatDrawer = useKnowledgeBaseStore().setChatDrawer;
    const [checked, setChecked] = useState(true);
    return <Drawer
        opened={chatDrawer}
        onClose={() => { setChatDrawer(false) }}
        title={<div><Text fz="xl" >智能体调试</Text><Text fz="sm">您可以通过提示词调整，数据集切换，模型服务，以及切换模型参数来调整智能体问答的效果</Text></div>}
        position="right"
        size="90%"
        overlayProps={{ opacity: 0.5, blur: 4 }}
    >
        <Flex
            mih={50}
            direction="row"
        >
            <div style={{ flex: 'none', width: '64%', overflow: 'hidden', borderRight: '1px solid #eee', paddingRight: 8, marginRight: 12, display: checked ? 'block' : 'none' }}>
                <div style={{ marginBottom: 12 }}><Badge color="orange" size="lg" radius="xs" variant="filled">智能体参数设置</Badge></div>
                <KnowledgeBaseForm appId={appId} containerType={ContainerType.CHAT} />
            </div>
            <div style={{ flex: 1 }}>
                <Flex justify="space-between"><Badge color="orange" size="lg" radius="xs" variant="filled">智能体问答</Badge>
                    <Switch
                        label={checked ? "关闭智能体参数配置" : "开启智能体参数配置"}
                        checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)}
                    /></Flex>
                <Chat />
            </div>
        </Flex>
    </Drawer>
}

function List({ appId }: KnowledgeBaseProps) {
    const knowledgeBaseList: KnowledgeBaseResponseData[] = useKnowledgeBaseStore().knowledgeBaseList;
    const setLoading = useKnowledgeBaseStore().setLoading;
    const updateCurrentKnowledgeBase = useKnowledgeBaseStore().updateCurrentKnowledgeBase;
    const setEditStatus = useKnowledgeBaseStore().setEditStatus;
    const setOpen = useKnowledgeBaseStore().setOpen;
    const setChatDrawer = useKnowledgeBaseStore().setChatDrawer;
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
    const removeKnowledgeBase = (knowledgeBase: KnowledgeBaseResponseData) => {
        const { id, name } = knowledgeBase;
        const deleteContent = `确定删除 ${name}?`;
        modals.openConfirmModal({
            title: '删除知识智能体',
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
                await getKnowledgeBaseList(appId);
                setLoading(false);
            },
        });

    }
    const rows = knowledgeBaseList.map((element: KnowledgeBaseResponseData) => (
        <tr key={element.id}>
            <td style={{ width: 20 }}>{element.id}</td>
            <td style={{ width: 120 }}><Link href={`/app/${appId}/knowledgeBase/${element.id}/detail`}>{element.name}</Link></td>
            <td style={{ width: 180 }}>{element.description}</td>
            <td style={{ width: 200 }}>{element.system_message ?
                <CopyToClipboard value={element.system_message} content={<Spoiler maxHeight={80} showLabel="显示更多" hideLabel="隐藏">
                    {element.system_message}
                </Spoiler>} width={300} />
                : null}
            </td>
            <td style={{ width: 300 }}>{element.prompt_template ? <CopyToClipboard value={element.prompt_template} content={element.prompt_template} width={300} /> : null}</td>
            <td >{element.token ? <CopyToClipboard value={element.token} content={element.token} truncate width={160} /> : <Button color="lime" size="xs" compact onClick={() => generateToken(element.id)}>生成访问令牌</Button>}</td>
            <td>{formatDateTime(element.created)}</td>
            <td style={{ width: 220 }}>
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
                <Button variant="filled" color="red" size="xs" onClick={() => {
                    removeKnowledgeBase(element);
                }}>删除</Button></td>
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
            <ChatDrawer appId={appId} />
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
    const loading: boolean = useKnowledgeBaseStore().loading;
    const items = [
        { title: '应用列表', href: '/app' },
        { title: '智能体', href: `/app/${appId}/knowledgeBase` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const setOpen = useKnowledgeBaseStore().setOpen;
    const setEditStatus = useKnowledgeBaseStore().setEditStatus;
    return (
        <div style={{ position: 'relative' }} >
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Breadcrumbs>{items}</Breadcrumbs>
            <FeatureDescription title="领域知识智能体" description="领域知识智能体专注于传授知识，利用LLM对自然语言进行认知，结合RAG(Retrieval-Augmented Generation 检索增强生成)技术来将领域的信息进行有效的整合，然后通过图片，视频，可交互组件完成知识交付，" />
            <Box  >
                <Button onClick={() => {
                    setEditStatus(false);
                    setOpen(true)
                }}>
                    新建领域知识智能体
                </Button>
            </Box>
            <AddOrUpdate appId={appId} />
            <List appId={appId} />
        </div>

    );
}
