import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { Breadcrumbs, Anchor, Button, Box, Table, TextInput, Text, Highlight, LoadingOverlay, Select, Modal, Textarea, Flex, Space, NumberInput } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { modals } from '@mantine/modals';
import { getDataSourceList, useDataSourceStore, addDataSource, deleteDataSource } from 'store/datasource';
import { DataSource } from 'types/datasource';
import { DataSetType } from "types/dataset";
import FeatureDescription from '@/components/FeatureDescription';
import { DocumentRequestPayload, QuestionRequestPayload } from "types/datasource";

import { formatDateTime } from 'utils/index';
import { DEFAULT_CHUNK_SIZE } from 'constants/dataset';
import { FORM_WIDTH } from 'constants/index';
// import styles from './index.module.scss';

interface DatasourceProps {
    dataSetId: number,
    dataSetType: number
}

function DocumentForm({ form }: { form: UseFormReturnType<DocumentRequestPayload> }) {
    return <Box maw={FORM_WIDTH} mx="auto">
        <TextInput withAsterisk label="标题" placeholder="" {...form.getInputProps('title')} />
        <Textarea withAsterisk label="内容" placeholder="" {...form.getInputProps('content')} />
        <TextInput label="来源url" placeholder="" {...form.getInputProps('url')} />
        <NumberInput label="文档切片大小" placeholder="" {...form.getInputProps('chunk_size')} />
    </Box>
}

function QuestionForm({ form }: { form: UseFormReturnType<QuestionRequestPayload> }) {
    return <Box maw={FORM_WIDTH} mx="auto">
        <TextInput withAsterisk label="标题" placeholder="" {...form.getInputProps('title')} />
        <Textarea withAsterisk label="问题" placeholder="" {...form.getInputProps('question')} />
        <Textarea withAsterisk label="答案" placeholder="" {...form.getInputProps('answer')} />
        <TextInput label="来源url" placeholder="" {...form.getInputProps('url')} />
    </Box>
}

function Add() {
    const router = useRouter()
    const open = useDataSourceStore().open;
    const setOpen = useDataSourceStore().setOpen;
    const setLoading = useDataSourceStore().setLoading;
    const { query } = router;
    const dataSetType: any = query.dataSetType;
    const dataSetId: any = query.id;

    const documentForm: UseFormReturnType<DocumentRequestPayload> = useForm({
        initialValues: {
            title: '',
            content: '',
            url: '',
            chunk_size: DEFAULT_CHUNK_SIZE,
            ext: 'txt',
            tag: dataSetId
        },
        validate: {
            title: (value) => (!value ? '标题必填' : null),
            content: (value) => (!value ? '内容必填' : null)
        },
    });
    const questionForm: UseFormReturnType<QuestionRequestPayload> = useForm({
        initialValues: {
            title: '',
            question: '',
            answer: '',
            tag: dataSetId,
            url: ''
        },
        validate: {
            title: (value) => (!value ? '标题必填' : null),
            question: (value) => (!value ? '问题必填' : null),
            answer: (value) => (!value ? '答案必填' : null)
        },
    });

    const currentForm: UseFormReturnType<any> = dataSetType == DataSetType.DOCUMENT ? documentForm : questionForm;
    return (
        <Modal opened={open} onClose={() => { setOpen(false) }} title="创建数据集" centered>
            {dataSetType == DataSetType.DOCUMENT ? <DocumentForm form={documentForm} /> : <QuestionForm form={questionForm} />}
            <Box maw={FORM_WIDTH} mx="auto" pt={12} style={{ textAlign: 'right' }}>
                <Button onClick={async () => {
                    currentForm.validate();
                    if (currentForm.isValid()) {
                        try {
                            setLoading(true);
                            const values = currentForm.values;
                            await addDataSource({ dataSetId, dataSetType }, values);
                            await getDataSourceList(dataSetId, dataSetType);
                        } catch (e) {
                            console.log(e);
                        } finally {
                            setOpen(false);
                            setLoading(false);
                        }


                    }

                }}>确认</Button>
            </Box>
        </Modal>
    );
}


function List({ dataSetId, dataSetType }: DatasourceProps) {
    const dataSourceList: DataSource[] = []; // useDataSourceStore().dataSourceList;
    const loading: boolean = useDataSourceStore().loading;
    const setLoading = useDataSourceStore().setLoading;
    const removeDataDataSource = (dataSource: DataSource) => {
        const { id, title } = dataSource;
        const deleteContent = `确定删除 ${title}?`;
        modals.openConfirmModal({
            title: '删除数据集',
            centered: true,
            children: (
                <Text size="sm">
                    <Highlight highlight={title}>{deleteContent}</Highlight>
                </Text>
            ),
            labels: { confirm: '确定', cancel: '取消' },
            onCancel: () => console.log('Cancel'),
            confirmProps: { color: 'red' },
            onConfirm: async () => {
                setLoading(true);
                await deleteDataSource({ dataSetId, dataSetType, dataSourceId: id });
                await getDataSourceList(dataSetId, dataSetType);
                setLoading(false);
            },
        });

    }
    const rows = dataSourceList.map((element: DataSource) => (
        <tr key={element.id}>
            <td>{element.id}</td>
            <td><div style={{ width: 100, wordBreak: 'break-word' }}>{element.title}</div></td>
            <td ><div style={{ width: 200, wordBreak: 'break-word' }}>{element.url}</div></td>
            {dataSetType == DataSetType.QUESTION ? <td >{element.question}</td> : null}
            <td>{element.doc_chunk}</td>
            <td>{element.token_size}</td>
            <td>{formatDateTime(element.created)}</td>
            <td>{formatDateTime(element.modified)}</td>
            <td> <Button variant="filled" color="red" size="xs" onClick={() => removeDataDataSource(element)}>删除</Button></td>
        </tr>
    ));
    useEffect(() => {
        getDataSourceList(dataSetId, dataSetType);
    }, []);

    return (
        <Box pos="relative" >
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>描述</th>
                        <th>源访问地址</th>
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


export function ToolFormer() {

    const router = useRouter()
    const { query } = router;
    const dataSetType: any = query.dataSetType;
    const dataSetId: any = query.id;
    const items = [
        { title: 'AgentCraft', href: `/` },
        { title: 'LLM工具集', href: `/toolformer` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
            <FeatureDescription title="LLM工具集" description="AgentCraft可以快速构建您业务所需要的工具函数，提供场景模板，快速部署，调试及日志访问能力，通过工具集可以帮助您构建更加强大的Agent服务"/>
            <Box  >
                <Flex
                    mih={50}
                    gap="md"
                    justify="flex-start"
                    align="flex-start"
                    direction="row"
                    wrap="wrap"
                >
                    <Button onClick={() => router.push('/foundationModel/create')}>
                        创建工具函数
                    </Button>
                  
                  

                </Flex>
            </Box>
            <Add />
            <List dataSetId={dataSetId} dataSetType={dataSetType} />
        </>

    );
}
