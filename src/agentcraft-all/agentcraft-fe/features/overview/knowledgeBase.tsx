import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Paper, Button, Box, Table, TextInput, MultiSelect, FileInput, PasswordInput, Text, Textarea, Highlight, LoadingOverlay, Divider, Title, Select, Modal, Flex, Space, NumberInput, Stepper, Group, rem } from '@mantine/core';
import { getModelList, useGlobalStore as useModelStore } from '@/store/model';
import { getDataSetList, useGlobalStore as useDatasetStore } from '@/store/dataset';
import { useQuickStartStore } from "store/quickStart";
import { Model } from '@/types/model';
import { DataSet, DataSetType } from '@/types/dataset';

export default function KnowledgeBase({ form }: any) {

    const modelList: Model[] = useModelStore().modelList;
    const dataSetList: DataSet[] = useDatasetStore().dataSetList;
    const { dataSetId, modelId } = useQuickStartStore();
    const modelSelectData: any = modelList.map((item: Model) => { return { label: item.name_alias, value: item.id } });
    const documentSelectData: any = dataSetList.filter((item: DataSet) => item.dataset_type == DataSetType.DOCUMENT).map((item: DataSet) => { return { label: item.name, value: item.id } });
    useEffect(() => {
        getModelList();
        getDataSetList();
        form.setFieldValue('model_id', modelId);
        form.setFieldValue('fuzzy_datasets', dataSetId)
    }, [dataSetId, modelId]);
    return (
        <>
            <Title order={5}>应用基本信息</Title>
            <Box mx="auto">
                <TextInput withAsterisk label="应用名称" description="" placeholder=""  {...form.getInputProps('name')} />
                <Textarea label="描述" description="" placeholder="" minRows={2}  {...form.getInputProps('description')} />
            </Box>
            <Divider my="sm" />
            <Title order={5}>知识库设置</Title>
            <Box pl={4} pr={4} >
                <Textarea label="系统提示词" placeholder="输入系统提示词" {...form.getInputProps('system_message')} minRows={2} description="系统提示词作为第一个输入给大语言模型的文本，往往用来设定角色" />
                <Textarea label="提示词模板" placeholder="" {...form.getInputProps('prompt_template')} minRows={2} description="提示词模板可以将检索的结果context和用户的输入query整合到一起，最后整体输入给大语言模型" />
                {/* <TextInput label="停止提示词" placeholder="停止输出的token" {...form.getInputProps('stop')} /> */}
            </Box>

            <Box pl={4} pr={4} >
                <Group grow>
                    <MultiSelect
                        withAsterisk
                        data={documentSelectData}
                        description=""
                        label="数据集"
                        placeholder="添加模糊数据集"
                        {...form.getInputProps('fuzzy_datasets')}
                    />
                </Group>
            </Box>

            <Box pl={4} pr={4} mb={12}>
                <Select
                    withAsterisk
                    data={modelSelectData}
                    description=""
                    label="LLM代理"
                    placeholder=""
                    {...form.getInputProps('model_id')}
                />
            </Box>

        </>
    );
}