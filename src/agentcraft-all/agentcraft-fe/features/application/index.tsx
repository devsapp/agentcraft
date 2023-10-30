import React, { useEffect } from "react";
import Link from 'next/link'
import { Breadcrumbs, Anchor, Button, Box, Table, Modal, TextInput, Text, Highlight, LoadingOverlay, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { getApplications, useGlobalStore, ApplicationResponseData, addApplication, deleteApplication } from '@/store/application';
import FeatureDescription from '@/components/FeatureDescription';
import { formatDateTime } from 'utils/index';
import { FORM_WIDTH } from 'constants/index';



interface AppForm {
    name: string,
    description: string
}



function List() {
    const appList: ApplicationResponseData[] = useGlobalStore().appList;
    const loading = useGlobalStore().loading;
    const setLoading = useGlobalStore().setLoading;
    const removeApplication = (app: ApplicationResponseData) => {
        const { id, name } = app;
        const deleteContent = `确定删除 ${name}?`;
        modals.openConfirmModal({
            title: '删除应用',
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
                await deleteApplication(id);
                await getApplications();
                setLoading(false);
            },
        });

    }

    const getApp = async () => {
        setLoading(true);
        await getApplications();
        setLoading(false);
    }

    const rows = appList.map((element: ApplicationResponseData) => (
        <tr key={element.id}>
            <td>{element.id}</td>
            <td><Link href={`/app/${element.id}/knowledgeBase`}>{element.name}</Link></td>
            <td>{element.description}</td>
            <td>{formatDateTime(element.created)}</td>
            <td>{formatDateTime(element.modified)}</td>
            <td> <Button variant="filled" color="red" size="xs" onClick={() => removeApplication(element)}>删除</Button></td>
        </tr>
    ));

    useEffect(() => {
        getApp();
    }, []);


    return (
        <Box pos="relative" >
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>应用id</th>
                        <th>应用名</th>
                        <th>应用描述</th>
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

function Add() {
    const open = useGlobalStore().open;
    const setOpen = useGlobalStore().setOpen;
    const setLoading = useGlobalStore().setLoading;
    const form = useForm({
        initialValues: {
            name: '',
            description: ''
        },
        validate: {
            name: (value) => (!value ? '应用名必填' : null)
        },
    });
    return (
        <Modal opened={open} onClose={() => { setOpen(false) }} title="创建应用" centered>
            <Box maw={FORM_WIDTH} mx="auto">
                <TextInput withAsterisk label="名称" placeholder="输入应用名" {...form.getInputProps('name')} />
                <Textarea  label="描述" placeholder="输入应用描述" {...form.getInputProps('description')} />
            </Box>
            <Box maw={FORM_WIDTH} mx="auto" pt={12} style={{ textAlign: 'right' }}>
                <Button onClick={async () => {
                    form.validate();
                    if (form.isValid()) {
                        setLoading(true);
                        const appData: AppForm = form?.values || {};
                        await addApplication(appData);
                        await getApplications();
                        setOpen(false);
                        setLoading(false);
                    }

                }}>确认</Button>
            </Box>
        </Modal>
    );
}



export function ApplicationPage() {
    const items = [
        { title: 'AgentCraft', href: '#' },
        { title: '应用', href: '/application' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));
    const setOpen = useGlobalStore().setOpen;
    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
            <FeatureDescription title="应用" description="AgentCraft的应用是对应业务场景的抽象，您可以聚合同类业务到同一个应用里面，在一个应用下您可以构建多个知识库服务及agent服务"/>
            <Box mt={12} >
                <Button onClick={() => setOpen(true)}>
                    新建应用
                </Button>
            </Box>
            <Add />
            <List />
        </>

    );
}
