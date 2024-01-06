import React, { useEffect } from "react";
import { Breadcrumbs, Anchor, Button, Box, Text, TextInput, Group, Divider, Title, Paper, Flex, Badge, Tooltip, LoadingOverlay, Textarea, MultiSelect, NumberInput, Select, Drawer } from '@mantine/core';
import { useForm } from '@mantine/form';
import Chat from 'features/assistant/chat';
import { getModelList, useGlobalStore as modelUseGlobalStore } from 'store/model';
import { getDataSetList, useGlobalStore as dataSetUseGlobalStore } from 'store/dataset';
import { IconRefresh } from '@tabler/icons-react';
import { Model } from 'types/model';
import { DataSet, DataSetType } from 'types/dataset';
import { useAssistantStore, updateAssistant, getAssistant, getAccessUrl } from 'store/assistant';
import { Dataset } from 'types/assistant';
import { INSTRUCTION_TEMPLATES, DEFAULT_ASSISTANT_INSTRUCTION , DATA_RETRIVAL_PROMPT_TEMPLATE } from 'constants/instructions'
import FeatureDescription from 'components/FeatureDescription';
import CopyToClipboard from 'components/CopyToClipboard';
import MarkdownContent from "components/MarkdownContent";

// import styles from './index.module.scss';

enum ContainerType {
    ADD_OR_UPDATE = 1, // 增加和修改
    CHAT = 2, // 问答
}
interface DetailPageProps {
    appId: number;
    assistantId: number
}


export function AssistantForm({ appId, containerType }: { appId: any, containerType?: ContainerType }) {
    // const setOpen = useAssistantStore().setOpen;
    // const isEdit = useGlobalStore().isEdit;
    const currentAssistant = useAssistantStore().currentAssistant;
    const setLoading = useAssistantStore().setLoading;
    const modelList: Model[] = modelUseGlobalStore().modelList;
    const dataSetList: DataSet[] = dataSetUseGlobalStore().dataSetList;
    const form: any = useForm({
        initialValues: {
            name: '',
            description: '',
            prompt_template: DATA_RETRIVAL_PROMPT_TEMPLATE,
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
            name: (value) => (!value ? '智能体名必填' : null)
        },
    });
    useEffect(() => {
        getModelList();
        getDataSetList();
        const datasets = currentAssistant?.datasets;
        form.setValues({
            id: currentAssistant?.id,
            name: currentAssistant?.name,
            description: currentAssistant?.description,
            retrieval_prompt_template: currentAssistant?.retrieval_prompt_template,
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
            exact_search_limit: currentAssistant?.exact_search_limit,
            fuzzy_search_limit: currentAssistant?.fuzzy_search_limit
        })
    }, [currentAssistant]);
    const modelSelectData: any = modelList.map((item: Model) => { return { label: item.name_alias, value: item.id } });
    const documentSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.DOCUMENT).map((item: DataSet) => { return { label: item.name, value: item.id } });
    const qaSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.QUESTION).map((item: DataSet) => { return { label: item.name, value: item.id } });
    const pannelWidth = '25%';
    return <div style={{ width: '100%' }}>


        <Flex style={{
            alignItems: 'stretch'
        }}>
            {containerType !== ContainerType.CHAT ? <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }} mr={12}>
                <Title order={5} size="h5">智能体信息</Title>
                <Box pl={4} pr={4} >
                    <TextInput withAsterisk label="名称" placeholder="输入智能体名称" {...form.getInputProps('name')} />
                    <Textarea label="描述" placeholder="输入应用描述" description="请输入智能体的描述信息" {...form.getInputProps('description')} minRows={22} />
                </Box>
            </Paper> : null}
            <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }} mr={12} >
                <Title order={5} size="h5">调试指令</Title>
                <Box pl={4} pr={4} >
                    <Select
                        data={INSTRUCTION_TEMPLATES}
                        description=""
                        defaultValue={DEFAULT_ASSISTANT_INSTRUCTION }
                        label="指令示例"
                        placeholder=""
                        onChange={(value: string) => {
                            form.setValues({
                                system_message: value
                            })
                        }}
                    />
                    <Textarea label="系统提示词" placeholder="输入系统提示词" {...form.getInputProps('system_message')} description="系统提示词可以作为对大语言模型的约束指令" minRows={22} />

                    {/* <TextInput label="停止提示词" placeholder="停止输出的token" {...form.getInputProps('stop')} /> */}
                </Box>
                {/* <Divider my="sm" /> */}
            </Paper>
            <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }} mr={12} >
                <Flex justify={'space-between'} align={'center'}>
                    <Title order={5} size="h5" >LLM服务</Title>
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
                <Title order={5} size="h5">大语言模型参数</Title>
                <Box pl={4} pr={4}>
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
            <Paper shadow="xs" p="md" withBorder style={{ width: pannelWidth }} >
                <Title order={5} size="h5" >数据召回</Title>
                <Textarea label="召回提示词模板" placeholder="" {...form.getInputProps('prompt_template')} minRows={6} description="召回提示词模板可以将检索的结果context和用户的输入query整合到一起，最后整体输入给大语言模型" />
                <Flex justify={'space-between'} align={'center'}>
                    <Title order={5} size="h5" >召回数据集</Title>
                    <IconRefresh cursor={'pointer'} onClick={getDataSetList} />
                </Flex>
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
                            description="问答数据集用来做问题精确匹配"
                            label="问答数据集"
                            placeholder="添加精准数据集"
                            {...form.getInputProps('exact_datasets')}
                        />
                    </Group>
                </Box>
                <Divider my="sm" />
                <Title order={5} size="h5" >召回参数</Title>
                <Box pl={4} pr={4}>
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
                {/* <Title order={5} size="h5">大语言模型参数</Title>
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
            <Divider my="sm" /> */}
            </Paper>
        </Flex>
        <Box pt={18} style={{ textAlign: 'center', width: '100%' }}>
            <Button style={{ width: '100%' }} onClick={async () => {
                form.validate();
                if (form.isValid()) {
                    setLoading(true);
                    const values: any = form.values;
                    await updateAssistant(values.id, values)
                    setLoading(false);
                }

            }}>确认修改</Button>
        </Box>
    </div>
}

function ChatDrawer() {
    const chatDrawer = useAssistantStore().chatDrawer;
    const setChatDrawer = useAssistantStore().setChatDrawer;
    return <Drawer
        opened={chatDrawer}
        onClose={() => { setChatDrawer(false) }}
        title={<div><Text fz="xl" >智能体调试</Text><Text fz="sm">您可以通过提示词调整，数据集切换，模型服务，以及切换模型参数来调整智能体问答的效果</Text></div>}
        position="right"
        size="30%"
        overlayProps={{ opacity: 0.5, blur: 4 }}
    >
        <div><Badge color="orange" size="lg" radius="xs" variant="filled">智能体问答</Badge></div>
        <Chat />
    </Drawer>
}
export function APIAccess() {
    const currentAssistant = useAssistantStore().currentAssistant;
    const accessUrl = useAssistantStore().accessUrl;
    const setAccessUrl = useAssistantStore().setAccessUrl;
    const setChatDrawer = useAssistantStore().setChatDrawer;
    useEffect(() => {
        (async () => {
            const result = await getAccessUrl();
            const data = result.data || { openApiUrl: '', innerApiUrl: '' }
            setAccessUrl(data);
        })()

    }, [])
    const curlExample = `curl -X 'POST' \
    '${accessUrl.openApiUrl}/v1/chat/completions' \
    -H 'accept: application/json' \
    -H 'Authorization: Bearer ${currentAssistant?.token}' \
    -H 'Content-Type: application/json' \
    -d '{
      "messages":[
          {
              "role": "user",
              "content": "请问世界最高峰是什么？"
          }
      ],
      "stream": false,
      "max_tokens": 1024
  }'`
    return <Flex direction={'column'} style={{ width: '100%' }}>
        <Title order={4} mb={8}>访问接入</Title>
        <Paper shadow="xs" p="md" withBorder >
            <Title order={5} size="h5">API访问</Title>
            <Box pl={4} pr={4} >
                <div>
                    <span><Text color="cyan" weight={700}>公网API访问地址：</Text><CopyToClipboard value={accessUrl.openApiUrl} content={accessUrl.openApiUrl} /> </span>
                    <span></span>
                </div>
                <div>
                    <span style={{ wordBreak: 'break-all' }}><Text color="cyan" weight={700}>API访问token：</Text><CopyToClipboard value={currentAssistant?.token} content={currentAssistant?.token} /></span>
                    <span></span>
                </div>
                <div>
                    <span style={{ wordBreak: 'break-all' }}><Text color="cyan" weight={700}>API文档访问：</Text><a href={`${accessUrl.openApiUrl}/docs`} target="_blank">{`${accessUrl.openApiUrl}/docs`}</a></span>
                    <span></span>
                </div>
            </Box>
            <Divider my="sm" />
            <Title order={5} size="h5">API调用示例</Title>
            <div style={{ width: '95%', overflow: 'hidden', margin: '0 auto' }} >
                <MarkdownContent textContent={`\`\`\`shell\n${curlExample}`} value={curlExample} />
            </div>
            <Divider my="sm" />
            <Title order={5} size="h5">效果测试</Title>
            <Box pl={4} pr={4} >
                <Group grow>
                    {!currentAssistant?.token ? <Tooltip label="需要成访问令牌才可以访问此能力" >
                        <Button
                            color="grape"
                            variant="filled"
                            size="xs"
                            mr={4} >问答测试</Button>
                    </Tooltip> : <Button
                        color="grape"
                        variant="filled"
                        size="xs"
                        onClick={() => {
                            setChatDrawer(true);
                        }}
                        mr={4} >
                        问答测试
                    </Button>}
                </Group>
            </Box>
        </Paper>
    </Flex>
}






export function DetailPage({ appId, assistantId }: DetailPageProps) {
    const loading: boolean = useAssistantStore().loading;
    const updateCurrentAssistant = useAssistantStore().updateCurrentAssistant;
    const items = [
        { title: '应用列表', href: '/app' },
        { title: '助手智能体', href: `/app/${appId}/assistant` },
        { title: '智能体详细', href: `/app/${appId}/assistant/${assistantId}/detail` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));
    useEffect(() => {
        (async () => {
            const assistant = await getAssistant(assistantId);
            updateCurrentAssistant(assistant);
        })()
    }, [assistantId])


    return (
        <Box pos="relative" >
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Breadcrumbs>{items}</Breadcrumbs>
            <FeatureDescription title="智能体详情" description="您可以查看修改智能体内容，以及查看API调用" />
            <ChatDrawer />
            <Flex
                mih={50}
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="column"
                wrap="nowrap"
            >
                <APIAccess />
                <AssistantForm appId={appId} />
            </Flex>
        </Box>

    );
}
