import React, { useEffect } from "react";
import Link from 'next/link'
import { Breadcrumbs, Anchor, Button, Box, Table, Modal, TextInput, Text, Highlight, LoadingOverlay, Select, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { getDataSetList, useDataSetStore, addDataSet, deleteDataSet } from '@/store/dataset';
import { DataSet, DataSetType } from '@/types/dataset';
import { DataSetRequestPayload } from "@/types/dataset";
import FeatureDescription from '@/components/FeatureDescription';
import { formatDateTime } from 'utils/index';
import { FORM_WIDTH } from 'constants/index';
// import styles from './index.module.scss';


function Add() {
    const open = useDataSetStore().open;
    const setOpen = useDataSetStore().setOpen;
    const setLoading = useDataSetStore().setLoading;

    const form = useForm({
        initialValues: {
            name: '',
            dataset_type: `${DataSetType.DOCUMENT}`,
            description: ''
        },
        validate: {
            name: (value) => (!value ? '数据集名必填' : null)
        },
    });
    return (
        <Modal opened={open} onClose={() => { setOpen(false) }} title="创建数据集" centered>
            <Box maw={FORM_WIDTH} mx="auto">
                <TextInput withAsterisk label="名称" placeholder="输入数据集名称" {...form.getInputProps('name')} />
                <Select
                    withAsterisk
                    label="数据集类型"
                    placeholder="请选择数据集类型"
                    data={[
                        { value: `${DataSetType.QUESTION}`, label: '精准类型（QA）' },
                        { value: `${DataSetType.DOCUMENT}`, label: '模糊类型（文档）' }
                    ]}
                    {...form.getInputProps('dataset_type')}
                />
                <Textarea label="描述" placeholder="输入数据集描述" {...form.getInputProps('description')} />
            </Box>
            <Box maw={FORM_WIDTH} mx="auto" pt={12} style={{ textAlign: 'right' }}>
                <Button onClick={async () => {
                    form.validate();
                    if (form.isValid()) {
                        setLoading(true);
                        const datasetData: DataSetRequestPayload = form?.values || {};
                        await addDataSet(datasetData);
                        await getDataSetList();
                        setOpen(false);
                        setLoading(false);
                    }

                }}>确认</Button>
            </Box>
        </Modal>
    );
}




function List() {

    const dataSetList: DataSet[] = useDataSetStore().dataSetList;
    const loading: boolean = useDataSetStore().loading;
    const setLoading = useDataSetStore().setLoading;
    const removeDataDataSet = (dataset: DataSet) => {
        const { id, name } = dataset;
        const deleteContent = `确定删除 ${name}?`;
        modals.openConfirmModal({
            title: '删除数据集',
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
                await deleteDataSet(id);
                await getDataSetList();
                setLoading(false);
            },
        });

    }
    const rows = dataSetList.map((element: DataSet) => (
        <tr key={element.id}>
            <td>{element.id}</td>
            <td><Link href={`/dataset/${element.id}/datasource?dataSetType=${element.dataset_type}`}>{element.name}</Link></td>
            <td>{element.dataset_type === DataSetType.DOCUMENT ? '文档数据集' : '问答数据集'}</td>
            <td>{element.description}</td>

            <td>{formatDateTime(element.created)}</td>
            <td>{formatDateTime(element.modified)}</td>
            <td> <Button variant="filled" color="red" size="xs" onClick={() => removeDataDataSet(element)}>删除</Button></td>
        </tr>
    ));

    const getDataSet = async () => {
        setLoading(true);
        await getDataSetList();
        setLoading(false);
    }
    useEffect(() => {
        getDataSet();
    }, []);

    return (
        <Box pos="relative" >
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>名称</th>
                        <th>类型</th>
                        <th>描述</th>
                        <th>创建时间</th>
                        <th>修改时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Box>

    );
}


export function DataSetPage() {
    const setOpen = useDataSetStore().setOpen;
    const items = [
        { title: 'AgentCraft', href: '#' },
        { title: '数据集', href: '/dataset' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
            <FeatureDescription title="数据集" description="AgentCraft中的数据集是对业务数据的高层抽象，您可以构建多个业务场景的数据集，并将他们进行知识库的关联"/>
            <Box mt={12} >
                <Button onClick={() => setOpen(true)}>
                    新建数据集
                </Button>
            </Box>
            <Add />
            <List />
        </>

    );
}
