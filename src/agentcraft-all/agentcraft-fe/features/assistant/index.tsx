import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Tooltip, Spoiler, Breadcrumbs, Anchor, Button, Box, Table, TextInput, Text, Highlight, Switch, Group, Badge, MultiSelect, Select, Drawer, LoadingOverlay, Modal, Textarea, Flex, NumberInput, Paper, Title, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconRefresh } from '@tabler/icons-react';
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
import Chat from 'features/assistant/chat';

enum ContainerType {
    ADD_OR_UPDATE = 1, // 增加和修改
    CHAT = 2, // 问答
}
interface AssistantProps {
    appId: number;
    router?: any
}



export function AssistantForm({ appId, containerType }: { appId: any, containerType?: ContainerType }) {

    const setOpen = useAssistantStore().setOpen;
    const isEdit = useAssistantStore().isEdit;
    const currentAssistant = useAssistantStore().currentAssistant;
    const setLoading = useAssistantStore().setLoading;
    const modelList: Model[] = useModelStore().modelList;
    const dataSetList: DataSet[] = useDataSetStore().dataSetList;
    const { toolList } = useActionToolStore();
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
            instruction: DEFAULT_ASSISTANT_INSTRUCTION,
            exact_search_limit: 1,
            fuzzy_search_limit: 3

        },
        validate: {
            name: (value) => (!value ? '智能助手名必填' : null)
        },
    });
    useEffect(() => {
        getModelList();
        getDataSetList();
        getToolList();
        if (isEdit) {
            const datasets = currentAssistant?.datasets;
            form.setValues({
                id: currentAssistant?.id,
                name: currentAssistant?.name,
                description: currentAssistant?.description,
                retrieval_prompt_template: currentAssistant?.retrieval_prompt_template,
                app_id: currentAssistant?.app_id,
                action_tools: currentAssistant?.action_tools?.map((item: any) => item.id),
                exact_datasets: datasets?.filter((item: Dataset) => item.dataset_type === DataSetType.QUESTION).map((item: Dataset) => item.dataset_id),
                fuzzy_datasets: datasets?.filter((item: Dataset) => item.dataset_type === DataSetType.DOCUMENT).map((item: Dataset) => item.dataset_id),
                exact_search_similarity: currentAssistant?.exact_search_similarity,
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
    }, [currentAssistant]);
    const modelSelectData: any = modelList.map((item: Model) => { return { label: item.name_alias, value: item.id } });
    const documentSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.DOCUMENT).map((item: DataSet) => { return { label: item.name, value: item.id } });
    const qaSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.QUESTION).map((item: DataSet) => { return { label: item.name, value: item.id } });
    let pannelWidth = containerType !== ContainerType.CHAT ? '20%' : '25%';
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
                    <Title order={5} size="h5">智能助手信息</Title>
                    <Box pl={4} pr={4} >
                        <TextInput withAsterisk label="名称" placeholder="输入智能助手名称" {...form.getInputProps('name')} />
                        <Textarea label="描述" placeholder="输入应用描述" description="请输入智能助手的描述信息" {...form.getInputProps('description')} minRows={22} />
                    </Box>
                </Paper> : null}
            <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }}>
                <Title order={5} size="h5">调试指令</Title>
                <Box pl={4} pr={4} >
                    <Select
                        data={INSTRUCTION_TEMPLATES}
                        description=""
                        defaultValue={DEFAULT_ASSISTANT_INSTRUCTION}
                        {...form.getInputProps('instruction')}
                        label="指令示例"
                        placeholder=""
                        onChange={(value: string) => {
                            form.setValues({
                                system_message: value
                            })
                        }}
                    />
                    <Textarea label="系统指令" placeholder="输入系统指令" {...form.getInputProps('instruction')} minRows={22} description="系统指令可以作为对大语言模型的约束指令" />
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
                    <TextInput label="停止提示词" placeholder="停止输出的token" {...form.getInputProps('stop')} />
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

            <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }}>
                <Flex justify={'space-between'} align={'center'}>
                    <Title order={5} size="h5" >数据召回</Title>
                    <IconRefresh cursor={'pointer'} onClick={getDataSetList} />
                </Flex>
                <Box pl={4} pr={4} >
                    <Textarea label="召回提示词模板" placeholder="" {...form.getInputProps('retrieval_prompt_template')} minRows={containerType !== ContainerType.CHAT ? 6 : 8} description="召回提示词模板可以将检索的结果context和用户的输入query整合到一起，最后整体输入给大语言模型" />

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
            </Paper>
        </Flex>
        <Box pt={4} style={{ textAlign: 'center', width: '100%' }}>
            <Button style={{ width: '100%' }} onClick={async () => {
                form.validate();
                if (form.isValid()) {
                    setLoading(true);
                    const values: any = form.values;
                    if (!isEdit) {
                        await addAssistant(values);
                    } else {
                        await updateAssistant(values.id, values)
                    }

                    await getAssistantList(appId);
                    setOpen(false);
                    setLoading(false);
                }

            }}>确认</Button>
        </Box>
    </Flex>
}
function AddOrUpdate({ appId }: any) {
    const open = useAssistantStore().open;
    const setOpen = useAssistantStore().setOpen;
    const isEdit = useAssistantStore().isEdit;
    const setEditStatus = useAssistantStore().setEditStatus;


    return (
        <Modal
            opened={open}
            onClose={() => {
                setEditStatus(false);
                setOpen(false);
            }}
            title={isEdit ? "编辑智能助手" : "创建智能助手"}
            centered
            size={'95%'}
            >
            <AssistantForm appId={appId} />
        </Modal>
    );
}

export function ChatDrawer({ appId }: AssistantProps) {
    const chatDrawer = useAssistantStore().chatDrawer;
    const setChatDrawer = useAssistantStore().setChatDrawer;
    const [checked, setChecked] = useState(true);
    return <Drawer
        opened={chatDrawer}
        onClose={() => { setChatDrawer(false) }}
        title={<div><Text fz="xl" >智能助手调试</Text><Text fz="sm">您可以通过提示词调整，数据集切换，模型服务，以及切换模型参数来调整智能助手问答的效果</Text></div>}
        position="right"
        size="90%"
        overlayProps={{ opacity: 0.5, blur: 4 }}
    >
        <Flex
            mih={50}
            direction="row"
        >
            <div style={{ flex: 'none', width: '64%', overflow: 'hidden', borderRight: '1px solid #eee', paddingRight: 8, marginRight: 12, display: checked ? 'block' : 'none' }}>
                <div style={{ marginBottom: 12 }}><Badge color="orange" size="lg" radius="xs" variant="filled">智能助手参数设置</Badge></div>
                <AssistantForm appId={appId} containerType={ContainerType.CHAT} />
            </div>
            <div style={{ flex: 1 }}>
                <Flex justify="space-between"><Badge color="orange" size="lg" radius="xs" variant="filled">智能助手问答</Badge>
                    <Switch
                        label={checked ? "关闭智能助手参数配置" : "开启智能助手参数配置"}
                        checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)}
                    /></Flex>
                <Chat />
            </div>
        </Flex>
    </Drawer>
}

function List({ appId,router }: AssistantProps) {
    const assistantList: AssistantResponseData[] = useAssistantStore().assistantList;
    const setLoading = useAssistantStore().setLoading;
    const updateCurrentAssistant = useAssistantStore().updateCurrentAssistant;
    const setEditStatus = useAssistantStore().setEditStatus;
    const setOpen = useAssistantStore().setOpen;
    const setChatDrawer = useAssistantStore().setChatDrawer;
    const generateToken = async (agentId: number) => {
        try {
            setLoading(true);
            await refreshToken(agentId);
            await getAssistantList(appId);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }

    }
    const removeAssistant = (assistant: AssistantResponseData) => {
        const { id, name } = assistant;
        const deleteContent = `确定删除 ${name}?`;
        modals.openConfirmModal({
            title: '删除知识智能助手',
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
                await deleteAssistant(id);
                await getAssistantList(appId);
                setLoading(false);
            },
        });

    }
    const rows = assistantList.map((element: AssistantResponseData) => (
        <tr key={element.id}>
            <td style={{ width: 20 }}>{element.id}</td>
            <td style={{ width: 120 }}><Link href={`/app/${appId}/assistant/${element.id}/detail`}>{element.name}</Link></td>
            <td style={{ width: 180 }}>{element.description}</td>
            <td style={{ width: 200 }}>{element.instruction ?
                <CopyToClipboard value={element.instruction} content={<Spoiler maxHeight={80} showLabel="显示更多" hideLabel="隐藏">
                    {element.instruction}
                </Spoiler>} width={300} />
                : null}
            </td>
            {/* <td style={{ width: 300 }}>{element.retrieval_prompt_template ? <CopyToClipboard value={element.retrieval_prompt_template} content={element.retrieval_prompt_template} width={300} /> : null}</td> */}
            <td >{element.token ? <CopyToClipboard value={element.token} content={element.token} truncate width={160} /> : <Button color="lime" size="xs" compact onClick={() => generateToken(element.id)}>生成访问令牌</Button>}</td>
            <td>{formatDateTime(element.created)}</td>
            <td >
                {/* {!element.token ? <Tooltip label="需要成访问令牌才可以访问此能力" >
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
                        const assistant = await getAssistant(element.id);
                        updateCurrentAssistant(assistant);
                        setChatDrawer(true);
                    }}
                    mr={4} >
                    问答测试
                </Button>}
                <Button variant="filled"
                    size="xs"
                    onClick={async () => {
                        setEditStatus(true);
                        const assistant = await getAssistant(element.id);
                        updateCurrentAssistant(assistant);
                        setOpen(true)
                    }}
                    mr={4}>
                    编辑
                </Button> */}
                <Button variant="filled"
                    size="xs"
                    onClick={async () => {
                        router && router.push(`/app/${appId}/assistant/builder?assistantId=${element.id}`)
                    }}
                    mr={4}>
                    调试
                </Button>
                <Button variant="filled" color="red" size="xs" onClick={() => {
                    removeAssistant(element);
                }}>删除</Button></td>
        </tr>
    ));
    const getAssistantInfo = async () => {
        setLoading(true);
        try {
            await getAssistantList(appId);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }
    useEffect(() => {
        getAssistantInfo();
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
                        <th>系统指令</th>
                        {/* <th>完整提示词</th> */}
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



export function AssistantPage({ appId }: AssistantProps) {
    const router = useRouter();
    const loading: boolean = useAssistantStore().loading;
    const items = [
        { title: '应用列表', href: '/app' },
        { title: '智能助手', href: `/app/${appId}/assistant` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const setOpen = useAssistantStore().setOpen;
    const setEditStatus = useAssistantStore().setEditStatus;
    return (
        <div style={{ position: 'relative' }} >
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Breadcrumbs>{items}</Breadcrumbs>
            <FeatureDescription title="智能助手" description="智能助手作为强有力的Agent实现，可以进行数据的召回" />
            <Box  >
                <Flex>
                    {/* <Button mr={12} onClick={() => {
                        setEditStatus(false);
                        setOpen(true)
                    }}>
                        新建智能助手(普通模式)
                    </Button> */}
                    <Button onClick={() => {
                        router.push(`/app/${appId}/assistant/builder`)
                    }}>
                        新建智能助手
                    </Button>
                </Flex>
            </Box>
            <AddOrUpdate appId={appId} />
            <List appId={appId} router={router}/>
        </div>

    );
}
