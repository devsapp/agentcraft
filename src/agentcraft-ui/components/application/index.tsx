import React, { useEffect } from "react";
import Link from 'next/link'
import { Breadcrumbs, Anchor, Button, Box, Table, Modal, TextInput, Flex } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { getApplications, useGlobalStore, ApplicationResponseData } from '@/store/application';
// import styles from './index.module.scss';
const items = [
    { title: '应用管理', href: '#' },
    { title: '应用列表', href: '#' },
].map((item, index) => (
    <Anchor href={item.href} key={index}>
        {item.title}
    </Anchor>
));

interface AppForm {
    name: string,
    description: string
}
interface AppFormProps {
    form: UseFormReturnType<AppForm>
}

export function AppFormComponent({ form }: AppFormProps) {
    return (
        <Box maw={340} mx="auto">
            <TextInput label="名称" placeholder="输入应用名" {...form.getInputProps('name')} />
            <TextInput label="描述" placeholder="输入应用描述" {...form.getInputProps('description')} />
        </Box>
    );
}

function App() {
    const appList: ApplicationResponseData[] = useGlobalStore().appList;
    const open = useGlobalStore().open;
    const setOpen = useGlobalStore().setOpen;

    const rows = appList.map((element: ApplicationResponseData) => (
        <tr key={element.id}>
            <td>{element.id}</td>
            <td><Link href={`/app/${element.id}/agent`}>{element.name}</Link></td>
            <td>{element.description}</td>
            <td>{element.created}</td>
            <td>{element.modified}</td>
        </tr>
    ));
    const form = useForm({
        initialValues: {
            name: '',
            description: ''
        },
        validate: {
            name: (value) => (!value ? '应用名必填' : null)
        },
    });

    useEffect(() => {
        getApplications();
    }, []);

    return (
        <>
            <Box mt={12} >
                <Button onClick={() => setOpen(true)}>
                    新建应用
                </Button>
            </Box>
            <Modal opened={open} onClose={() => { setOpen(false) }} title="创建应用" centered>
                <AppFormComponent form={form} />

                <Box maw={340} mx="auto" pt={12} style={{ textAlign: 'right' }}>
                    <Button onClick={() => {
                        form.validate();
                        if (form.isValid()) {
                            const appData: AppForm = form?.values || {};
                            console.log(appData);
                        }

                    }}>确认</Button>
                </Box>

            </Modal>
            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>应用id</th>
                        <th>应用名</th>
                        <th>应用描述</th>
                        <th>创建时间</th>
                        <th>修改时间</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
}


export function Application() {

    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
            <App />
        </>

    );
}
