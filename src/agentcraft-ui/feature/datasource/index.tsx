import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { Breadcrumbs, Anchor, Button, Box, Table, TextInput, Text, Highlight, LoadingOverlay, Select, Modal, Textarea, Flex, Space, NumberInput, FileInput, rem } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconFileUpload, IconUpload } from '@tabler/icons-react';
import { getDataSourceList, useGlobalStore, addDataSource, deleteDataSource, addDataSourceByUploadFile } from '@/store/datasource';
import { DataSource } from '@/types/datasource';
import { DataSetType } from "@/types/dataset";

import { DocumentRequestPayload, QuestionRequestPayload } from "@/types/datasource";
import { formatDateTime } from '@/util/index';
import { FORM_WIDTH } from '@/constant/index';
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
    const open = useGlobalStore().open;
    const setOpen = useGlobalStore().setOpen;
    const setLoading = useGlobalStore().setLoading;
    const { query } = router;
    const dataSetType: any = query.dataSetType;
    const dataSetId: any = query.id;

    const documentForm: UseFormReturnType<DocumentRequestPayload> = useForm({
        initialValues: {
            title: '',
            content: '',
            url: '',
            chunk_size: 1024,
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


function UploadDataSource() {
    const router = useRouter()
    const open = useGlobalStore().openUploadModel;
    const setOpen = useGlobalStore().setOpenUploadModel;
    const setLoading = useGlobalStore().setLoading;
    const { query } = router;
    const dataSetType: any = query.dataSetType;
    const dataSetId: any = query.id;
    const form = useForm({
        initialValues: {
            title: '',
            url: '',
            chunk_size: 512,
            ext: 'txt',
            tag: dataSetId
        },
        validate: {
            title: (value) => (!value ? '标题必填' : null)

        },
    });


    return (
        <Modal opened={open} onClose={() => { setOpen(false) }} title="上传数据集文档" centered>


            <FileInput withAsterisk label="选择文档" placeholder="点击上传文档" icon={<IconUpload size={rem(14)} />} {...form.getInputProps('file')} />
            <TextInput withAsterisk label="标题" placeholder="" {...form.getInputProps('title')} />
            <NumberInput withAsterisk label="文档切片大小" placeholder="" {...form.getInputProps('chunk_size')} />
            <TextInput label="来源url" placeholder="" {...form.getInputProps('url')} />
            <Box maw={FORM_WIDTH} mx="auto" pt={12} style={{ textAlign: 'right' }}>

                <Button onClick={async () => {
                    form.validate();
                    if (form.isValid()) {
                        try {
                            setLoading(true);
                            const values: any = await form.values;
                            const formData = new FormData();
                            formData.append('file', values.file);
                            formData.append('title', values.title);
                            formData.append('chunk_size', values.chunk_size);
                            formData.append('url', values.url);
                            await addDataSourceByUploadFile({ dataSetId }, formData);
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
    const dataSourceList: DataSource[] = useGlobalStore().dataSourceList;
    const loading: boolean = useGlobalStore().loading;
    const setLoading = useGlobalStore().setLoading;
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
                        <th>编号</th>
                        <th>标题</th>
                        <th>源访问地址</th>
                        {dataSetType == DataSetType.QUESTION ? <th>问题</th> : null}
                        <th>{dataSetType == DataSetType.QUESTION ? '答案' : '文档内容'}</th>
                        <th>切片大小</th>
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


export function Datasource() {

    const router = useRouter()
    const { query } = router;
    const dataSetType: any = query.dataSetType;
    const dataSetId: any = query.id;
    const items = [
        { title: 'AgentCraft', href: '/' },
        { title: '数据集', href: '/dataset' },
        { title: '数据源', href: `/dataset/${dataSetId}/datasource` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));
    const setOpen = useGlobalStore().setOpen;
    const setOpenUploadModel = useGlobalStore().setOpenUploadModel;
    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
            <Box mt={12} >
                <Flex
                    mih={50}
                    gap="md"
                    justify="flex-start"
                    align="flex-start"
                    direction="row"
                    wrap="wrap"
                >
                    <Button onClick={() => setOpen(true)}>
                        新建单条数据源
                    </Button>
                    <Space h="md" />
                    {dataSetType == DataSetType.DOCUMENT ? <Button onClick={() => setOpenUploadModel(true)} variant="filled" leftIcon={<IconFileUpload size="1rem" />}>
                        上传文件
                    </Button> : null}

                </Flex>
            </Box>
            <Add />
            <UploadDataSource />
            <List dataSetId={dataSetId} dataSetType={dataSetType} />
        </>

    );
}
