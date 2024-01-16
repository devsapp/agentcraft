import React, { useEffect } from "react";
import { Breadcrumbs, Anchor, Button, Box, Table, Modal, TextInput, Text, Highlight, LoadingOverlay, Select, NumberInput, PasswordInput, Textarea, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { getModelList, useModelStore, deleteModel, addModel, updateModel } from 'store/model';
import { Model } from 'types/model';
import { formatDateTime } from 'utils/index';
import CopyToClipboard from 'components/CopyToClipboard';
import { DEFAULT_MODEL_REQUEST_TIMEOUT } from 'constants/index';
import FeatureDescription from 'components/FeatureDescription';

function List() {
    const modelList: Model[] = useModelStore().modelList;
    const loading: boolean = useModelStore().loading;
    const setLoading = useModelStore().setLoading;
    const setOpen = useModelStore().setOpen;
    const setEditStatus = useModelStore().setEditStatus;
    const setCurrentModel = useModelStore().setCurrentModel;
    const removeModel = (model: Model) => {
        const { id, name } = model;
        const deleteContent = `确定删除 ${name}?`;
        modals.openConfirmModal({
            title: '删除LLM代理',
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
                try {
                    setLoading(true);
                    await deleteModel(id);
                    await getModelList();
                } catch (e) {
                    console.log(e);
                } finally {
                    setLoading(false);
                }

            },
        });

    }
    const getModels = async () => {
        setLoading(true);
        await getModelList();
        setLoading(false);
    }
    const rows = modelList.map((element: Model) => (
        <tr key={element.id}>
            <td>{element.id}</td>
            <td>{element.name_alias}</td>
            <td>{element.name}</td>
            <td>{element.description}</td>
            <td style={{ width: 450 }}><CopyToClipboard value={element.url} content={element.url} /></td>
            <td style={{ width: 200 }}>{element.token ? <CopyToClipboard value={element.token} content={'******************'} width={100} /> : null}</td>
            <td>{formatDateTime(element.created)}</td>
            <td>{formatDateTime(element.modified)}</td>
            <td style={{ width: 180 }}> <Button variant="filled" size="xs" onClick={() => { setEditStatus(true); setCurrentModel(element); setOpen(true); }} mr={4}>编辑</Button><Button variant="filled" color="red" size="xs" onClick={() => removeModel(element)}>删除</Button></td>
        </tr>
    ));
    useEffect(() => {
        getModels();
    }, []);

    return (
        <Box pos="relative" >
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>LLM代理名称</th>
                        <th>基础模型名称</th>
                        <th>描述</th>
                        <th>LLM服务访问地址</th>
                        <th>访问token</th>
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

function AddOrUpdate() {
    const open = useModelStore().open;
    const isEdit = useModelStore().isEdit;
    const setEditStatus = useModelStore().setEditStatus;
    const setOpen = useModelStore().setOpen;
    const setLoading = useModelStore().setLoading;
    const currentModel: Model | undefined = useModelStore().currentModel;
    const initialValues = {
        name: '',
        name_alias: '',
        url: '',
        token: '',
        timeout: DEFAULT_MODEL_REQUEST_TIMEOUT,
        description: ''
    }
    const form = useForm({
        initialValues,
        validate: {
            name: (value) => (!value ? '名称必填' : null),
            name_alias: (value) => (!value ? '模型别名必填' : null),
            url: (value) => (/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(value) ? null : '请输入合法的访问地址'),
        },
    });
    useEffect(() => {
        if (isEdit) {
            form.setValues({
                name: currentModel?.name || '',
                name_alias: currentModel?.name_alias || '',
                url: currentModel?.url || '',
                token: currentModel?.token || '',
                timeout: currentModel?.timeout || DEFAULT_MODEL_REQUEST_TIMEOUT,
                description: currentModel?.description || ''
            })
        }
    }, [currentModel]);

    return (
        <Modal opened={open} onClose={() => { setOpen(false) }} title={isEdit ? "修改LLM代理" : "创建LLM代理"} centered>
            <Box maw={640} mx="auto">
                <TextInput withAsterisk label="LLM代理名" placeholder="" {...form.getInputProps('name_alias')} description="LLM代理的名称" />
                <TextInput withAsterisk label="模型名" placeholder="" {...form.getInputProps('name')} description="基础模型服务需要的模型参数，通过LLM代理透传给基础模型服务，比如访问千问的模型明示qwen-plus或qwen-turbo" />

                <TextInput withAsterisk label={<span>基础模型服务访问地址<a href="/foundationModel/create" target="_blank">还没有基础模型服务？去创建</a></span>} placeholder="" {...form.getInputProps('url')} description="基础模型服务原始地址，可以通过基础模型菜单访问创建,创建成功后粘贴基础模服务访问地址在此" />
                <PasswordInput label="LLM服务访问token" placeholder="" {...form.getInputProps('token')} description="当你访问的服务需要透传token，比如openai 的chatgpt，在这里填写，默认情况下可以不填写" />
                <NumberInput label="访问超时时间(s)" placeholder="" {...form.getInputProps('timeout')} description="AgentCraft访问基础模型服务的超时时间" />
                <Textarea label="描述" placeholder="输入数据集描述" {...form.getInputProps('description')} />
            </Box>
            <Box maw={640} mx="auto" pt={12} style={{ textAlign: 'right' }}>
                <Button onClick={async () => {
                    form.validate();
                    if (form.isValid()) {
                        try {
                            setLoading(true);
                            !isEdit ? await addModel(form.values) : await updateModel(currentModel?.id, form.values);
                            await getModelList();
                            setOpen(false);
                            form.reset();
                        } catch (e) {
                            console.log(e);
                        } finally {
                            setEditStatus(false);
                            setLoading(false);
                        }

                    }

                }}>确认</Button>
            </Box>
        </Modal>
    );
}



export function ModelPage() {

    const items = [
        { title: 'AgentCraft', href: '#' },
        { title: 'LLM代理', href: '/model' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));
    const setOpen = useModelStore().setOpen;
    const setEditStatus = useModelStore().setEditStatus;
    return (
        <>
            {/* <Breadcrumbs>{items}</Breadcrumbs> */}
            <FeatureDescription title="LLM代理" description="AgentCraft的LLM代理是基于基础大语言模型服务比如通义千问等构建出的一个代理层服务，主要是为了抹平不同模型服务之间的接口数据差异，方便在业务中快速切换更加适合的模型服务" />
            <Box mt={12} >
                <Button onClick={() => { setEditStatus(false); setOpen(true) }}>
                    新建LLM代理
                </Button>
            </Box>
            <AddOrUpdate />
            <List />
        </>

    );
}
