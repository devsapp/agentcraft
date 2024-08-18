import React, { useEffect } from "react";

import { Button, Checkbox, Box, TextInput, Text, Highlight, Switch, Group, Badge, MultiSelect, Select, Textarea, Flex, NumberInput, Paper, Title, Divider } from '@mantine/core';

import { IconRefresh } from '@tabler/icons-react';
import { ChooseModal } from 'features/actionTools';
import { getModelList } from 'store/model';
import { getDataSetList, useDataSetStore } from 'store/dataset';
import { DataSet, DataSetType } from 'types/dataset';
import { getToolList, useActionToolStore } from 'store/actionTools';

export function AssistantForm({ form, modelSelectData, openDatasetModel }: any) {
    const { setOpenToChoose } = useActionToolStore();
    const dataSetList: DataSet[] = useDataSetStore().dataSetList;
    const { toolList } = useActionToolStore();
    useEffect(() => {
        getDataSetList();
        getToolList();

    }, []);

    const documentSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.DOCUMENT).map((item: DataSet) => { return { label: item.name, value: item.id } });
    const qaSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.QUESTION).map((item: DataSet) => { return { label: item.name, value: item.id } });

    return <Box>
        <ChooseModal />
        <Paper shadow="xs" p="md" withBorder mt={12}>
            <Title order={5} size="h5">智能助手信息</Title>
            <Box pl={4} pr={4} >
                <TextInput withAsterisk label="名称" placeholder="输入智能助手名称" {...form.getInputProps('name')} />
                <TextInput label="描述" placeholder="输入关于智能助手的简单描述" description="请输入智能助手的描述信息" {...form.getInputProps('description')} />
            </Box>
        </Paper>
        <Paper shadow="xs" p="md" withBorder mt={12}>
            <Title order={5} size="h5">调试指令</Title>
            <Box pl={4} pr={4} >
                <Textarea label="系统指令" placeholder="这个智能助手是干什么的，他应该怎么表现，应该避免做哪些事情？" {...form.getInputProps('instruction')} minRows={8} description="系统指令可以作为对大语言模型的约束指令" />
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
            <Title order={5} size="h5" mb={4} >对话示例设置</Title>
            <Box pl={4} pr={4} >
                <TextInput  {...form.getInputProps('prompt_starts')} />

            </Box>
        </Paper>
        <Paper shadow="xs" p="md" withBorder mt={12}>
            <Flex justify={'space-between'} align={'center'} mb={4} >

                <Flex align={'center'}>
                    <Title order={5} size="h5">知识库</Title>
                    <Button size={'xs'} h={20} ml={12} variant={'outline'} onClick={openDatasetModel}>快速添加</Button>
                </Flex>
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
        <Paper shadow="xs" p="md" withBorder mt={12}>
            <Flex justify={'space-between'} align={'center'}>
                <Title order={5} size="h5" >内置能力（待开放）</Title>
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
                        {/* <Checkbox value="web_browser" label="Web浏览" /> */}
                        <Checkbox value="code_interpreter" label="代码解释器" disabled />
                    </Group>
                </Checkbox.Group>
            </Box>
        </Paper>
        <Paper shadow="xs" p="md" withBorder mt={12}>
            <Flex justify={'space-between'} align={'center'}>
                <Flex align={'center'}>
                    <Title order={5} size="h5">执行工具</Title>
                    <Button size={'xs'} h={20} ml={12} variant={'outline'} onClick={() => { setOpenToChoose(true) }}>快速添加</Button>
                </Flex>
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
                    description="执行工具是LLM可以调用的工具"
                    label="执行工具"
                    placeholder=""
                    {...form.getInputProps('action_tools')}
                />
            </Box>
        </Paper>
    </Box>
}

