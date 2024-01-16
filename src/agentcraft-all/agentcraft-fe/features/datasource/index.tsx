import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { Breadcrumbs, Anchor, Button, Box, Table, TextInput, Text, Highlight, LoadingOverlay, Modal, Textarea, Flex, Space, NumberInput, FileInput, rem } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { modals } from '@mantine/modals';
import CopyToClipboard from 'components/CopyToClipboard';
import { IconFileUpload, IconUpload } from '@tabler/icons-react';
import { getDataSourceList, useDataSourceStore, addDataSource, deleteDataSource, addDataSourceByUploadFile, updateDataSource } from 'store/datasource';
import { DataSource } from 'types/datasource';
import { DataSetType } from "types/dataset";

import { DocumentRequestPayload, QuestionRequestPayload } from "types/datasource";
import { formatDateTime } from 'utils/index';
import { DEFAULT_CHUNK_SIZE } from 'constants/dataset';
import { FORM_WIDTH } from 'constants/index';

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

function AddOrUpdate() {
    const router = useRouter()
    const open = useDataSourceStore().open;
    const setOpen = useDataSourceStore().setOpen;
    const setLoading = useDataSourceStore().setLoading;
    const isEdit = useDataSourceStore().isEdit;
    const setIsEdit = useDataSourceStore().setIsEdit;
    const currentDataSource = useDataSourceStore().currentDataSource;
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
    useEffect(() => {
        if (isEdit) {
            if (dataSetType == DataSetType.DOCUMENT) {
                documentForm.setValues({
                    title: currentDataSource.title,
                    content: currentDataSource.doc_chunk,
                    url: currentDataSource.url,
                    chunk_size: currentDataSource.token_size,
                    ext: 'txt',
                    tag: dataSetId
                });
            }
            if (dataSetType == DataSetType.QUESTION) {
                questionForm.setValues({
                    title: currentDataSource.title,
                    question: currentDataSource.question,
                    answer: currentDataSource.doc_chunk,
                    tag: dataSetId,
                    url: currentDataSource.url
                });
            }
        }
    }, [isEdit, currentDataSource]);
    return (
        <Modal opened={open} onClose={() => { setOpen(false); setIsEdit(false); }} title={isEdit ? '编辑数据源' : '新增数据源'} centered>
            {dataSetType == DataSetType.DOCUMENT ? <DocumentForm form={documentForm} /> : <QuestionForm form={questionForm} />}
            <Box maw={FORM_WIDTH} mx="auto" pt={12} style={{ textAlign: 'right' }}>
                <Button onClick={async () => {
                    currentForm.validate();
                    if (currentForm.isValid()) {
                        try {
                            setLoading(true);
                            const values = currentForm.values;
                            if (isEdit) {
                                await updateDataSource({ dataSetId, dataSetType, dataSourceId: currentDataSource.id }, values);
                            } else {
                                await addDataSource({ dataSetId, dataSetType }, values);
                            }

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
    const open = useDataSourceStore().openUploadModel;
    const setOpen = useDataSourceStore().setOpenUploadModel;
    const setLoading = useDataSourceStore().setLoading;
    const setIsEdit = useDataSourceStore().setIsEdit;
    const { query } = router;
    const dataSetType: any = query.dataSetType;
    const dataSetId: any = query.id;
    const form = useForm({
        initialValues: {
            title: '',
            url: '',
            chunk_size: DEFAULT_CHUNK_SIZE,
            ext: 'txt',
            tag: dataSetId
        },
        validate: {
            title: (value) => (!value ? '标题必填' : null)

        },
    });


    return (
        <Modal opened={open} onClose={() => { setOpen(false); setIsEdit(false) }} title="上传数据集文档" centered>
            <FileInput withAsterisk accept=".md,.txt,.html,.pdf" name="file" label="选择文档" description="选择本地文件上传，支持 .txt,.md,.html文件" placeholder="点击上传文档" icon={<IconUpload size={rem(14)} />} {...form.getInputProps('file')} />
            <TextInput withAsterisk label="标题" description="标题内容作为检索的数据来源，用来展示检索结果" placeholder="" {...form.getInputProps('title')} />
            <NumberInput withAsterisk label="文档切片大小" description="" placeholder="" {...form.getInputProps('chunk_size')} />
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
    const dataSourceList: DataSource[] = useDataSourceStore().dataSourceList;
    const setLoading = useDataSourceStore().setLoading;
    const setIsEdit = useDataSourceStore().setIsEdit;
    const setOpen = useDataSourceStore().setOpen;
    const setCurrentDataSource = useDataSourceStore().setCurrentDataSource;
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
            <td style={{ width: 80 }}>{element.id}</td>
            <td style={{ width: 240 }}>{element.title}</td>
            <td style={{ width: 140 }}>{element.url ? <CopyToClipboard value={element.url} content={element.url} truncate width={120} /> : null}</td>
            {dataSetType == DataSetType.QUESTION ? <td style={{ width: 120 }}><CopyToClipboard value={element.question} content={element.question} truncate /></td> : null}
            <td width={550} ><CopyToClipboard value={element.doc_chunk} content={element.doc_chunk} width={550} /></td>
            {/* <td>{element.token_size}</td> */}
            <td style={{ width: 120 }}>{formatDateTime(element.created)}</td>
            <td style={{ width: 120 }}>{formatDateTime(element.modified)}</td>
            <td style={{ width: 140 }}>
                <Button variant="filled" color="red" size="xs" onClick={() => removeDataDataSource(element)} mr={4}>删除</Button>
                <Button variant="filled" size="xs" onClick={() => {
                    setOpen(true);
                    setIsEdit(true);
                    setCurrentDataSource(element);
                }}>编辑</Button>
            </td>
        </tr>
    ));
    const getDatasource = async () => {
        setLoading(true)
        try {
            await getDataSourceList(dataSetId, dataSetType);
        } catch (e) {

        }
        setLoading(false)
    }
    useEffect(() => {
        getDatasource();
    }, [dataSetId, dataSetType]);

    return (
        <>

            <div>共计{dataSourceList.length}条数据</div>
            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>标题</th>
                        <th>源访问地址</th>
                        {dataSetType == DataSetType.QUESTION ? <th>问题</th> : null}
                        <th>{dataSetType == DataSetType.QUESTION ? '答案' : '文档内容'}</th>
                        {/* <th>切片大小</th> */}
                        <th>创建时间</th>
                        <th>修改时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
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
    const loading: boolean = useDataSourceStore().loading;
    const setOpen = useDataSourceStore().setOpen;
    const setIsEdit = useDataSourceStore().setIsEdit;
    const setOpenUploadModel = useDataSourceStore().setOpenUploadModel;
    return (
        <>
            {/* <Breadcrumbs>{items}</Breadcrumbs> */}
            <Box mt={12} >
                <Flex
                    mih={50}
                    gap="md"
                    justify="flex-start"
                    align="flex-start"
                    direction="row"
                    wrap="wrap"
                >
                    <Button onClick={() => {
                        setIsEdit(false);
                        setOpen(true);
                    }}>
                        新建单条数据源
                    </Button>
                    <Space h="md" />
                    {dataSetType == DataSetType.DOCUMENT ? <Button onClick={() => setOpenUploadModel(true)} variant="filled" leftIcon={<IconFileUpload size="1rem" />}>
                        上传文件
                    </Button> : null}
                </Flex>
            </Box>
            <Box >
                <LoadingOverlay visible={loading} overlayOpacity={0.3} />
                <AddOrUpdate />
                <UploadDataSource />
                <List dataSetId={dataSetId} dataSetType={dataSetType} />
            </Box>
        </>

    );
}
