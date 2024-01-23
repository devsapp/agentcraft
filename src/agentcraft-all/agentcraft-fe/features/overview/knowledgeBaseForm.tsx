import React from "react";
import { Box, TextInput, Group, MultiSelect, Textarea, Flex, NumberInput, Paper, Title, Divider, Select, Button } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { getDataSetList, useDataSetStore } from 'store/dataset';
import { DataSet, DataSetType } from 'types/dataset';
import { getModelList } from 'store/model';


export function KnowledgeBaseForm({ form, modelSelectData, openDatasetModel }: any) {
    const dataSetList: DataSet[] = useDataSetStore().dataSetList;
    const documentSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.DOCUMENT).map((item: DataSet) => { return { label: item.name, value: item.id } });
    const qaSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.QUESTION).map((item: DataSet) => { return { label: item.name, value: item.id } });

    return <Box >
        <Paper shadow="xs" p="md" withBorder mt={12}>
            <Title order={5} size="h5">知识库信息</Title>
            <Box pl={4} pr={4} >
                <TextInput withAsterisk label="名称" placeholder="输入知识库名称" {...form.getInputProps('name')} />
                <Textarea label="描述" placeholder="输入应用描述" description="请输入知识库的描述信息" {...form.getInputProps('description')} />
            </Box>
        </Paper>
        <Paper shadow="xs" p="md" withBorder mt={12}>
            <Title order={5} size="h5">调试指令</Title>
            <Box pl={4} pr={4} >
                <Textarea label="系统指令" placeholder="输入系统指令" {...form.getInputProps('system_message')} minRows={12} description="系统提示词可以作为对大语言模型的约束指令" />
                {/* <TextInput label="停止提示词" placeholder="停止输出的token" {...form.getInputProps('stop')} /> */}
            </Box>
        </Paper>
        <Paper shadow="xs" p="md" withBorder mt={12}>
            <Flex justify={'space-between'} align={'center'} mb={4} >
                <Title order={5} size="h5">LLM代理</Title>
                <IconRefresh cursor={'pointer'} onClick={getModelList} />
            </Flex>
            <Box pl={4} pr={4} >
                <Select
                    data={modelSelectData}
                    description=""
                    {...form.getInputProps('model_id')}
                    label="模型"
                    placeholder=""
                />
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

        <Paper shadow="xs" p="md" withBorder mt={12}>
            <Flex justify={'space-between'} align={'center'}>
                <Title order={5} size="h5" >数据召回</Title>

            </Flex>
            <Box pl={4} pr={4} >
                <Textarea withAsterisk label="召回提示词模板" placeholder="" {...form.getInputProps('prompt_template')} minRows={6} description="召回提示词模板可以将检索的结果context和用户的输入query整合到一起，最后整体输入给大语言模型" />
                {/* <TextInput label="停止提示词" placeholder="停止输出的token" {...form.getInputProps('stop')} /> */}
            </Box>
            <Divider my="sm" />

            <Flex justify={'space-between'} align={'center'} mb={4} >
                <Flex align={'center'}>
                    <Title order={5} size="h5">召回数据集</Title>
                    <Button size={'xs'} h={20} ml={12} variant={'outline'} onClick={openDatasetModel}>快速添加</Button>
                </Flex>
                <IconRefresh cursor={'pointer'} onClick={getDataSetList} />
            </Flex>
            <Box pl={4} pr={4} >
                <Group grow>
                    <MultiSelect
                        withAsterisk
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
    </Box>
}

