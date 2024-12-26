import React, { useEffect } from "react";
import { Group, Card, Flex, Button, Box, Table, Modal, TextInput, Text, Highlight, LoadingOverlay, Select, Textarea, Code, Loader, Badge, Radio, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import CopyToClipboard from 'components/CopyToClipboard';
import { FORM_WIDTH } from 'constants/index';
import { getToolList, useActionToolStore, addTool, deleteTool, updateTool, getFunctionList } from 'store/actionTools';
import { createServerlessApp, checkAppStatus } from 'store/infra';
import { useSystemConfigStore } from 'store/systemConfig';
import { IActionTool, ActionToolType, ActionToolStatus } from 'types/actionTools';
import { ServerlessAppTemplate, TemplateParams, TemplatePropertyDetail } from 'types/serverless-devs-app';
import FeatureDescription from 'components/FeatureDescription';
import { formatDateTime } from 'utils/index';
import { ACTION_TOOL_TEMPLATES } from 'constants/action-tools';
import styles from './index.module.scss';

const ACTION_TOOL_TYPE_NAME_MAP = {
    [ActionToolType.FUNCTION]: '函数',
    [ActionToolType.PROXY]: 'http代理哦',
}

const ACTION_TOOL_STATUS_NAME_MAP = {
    [ActionToolStatus.CREATING]: '创建中',
    [ActionToolStatus.READY]: '已上线',
    [ActionToolStatus.UNREADY]: '已下线',
}

function AddOrUpdate() {
    const { open, setOpen, setLoading, functionList, updateFunctionList, isEdit, currentActionTool } = useActionToolStore();

    const form = useForm({
        initialValues: {
            name: '',
            alias: '',
            description: '',
            input_schema: '',
            output_schema: '',
            type: 1,
            proxy_url: '',
            author: '',
            need_llm_call: 1,
            status: ActionToolStatus.READY
        },
        validate: {
            name: (value) => (!value ? '工具名必填' : null),
            description: (value) => (!value ? '工具描述必填' : null),
            input_schema: (value) => (!value ? '工具入参必填' : null),
        },
    });
    const getFunctionTools = async () => {
        const functionList: [] = await getFunctionList({});
        updateFunctionList(functionList);
    }
    useEffect(() => {
        getFunctionTools();
        if (isEdit) {
            form.setValues({
                name: currentActionTool.name,
                alias: currentActionTool.alias,
                description: currentActionTool.description,
                input_schema: currentActionTool.input_schema,
                output_schema: currentActionTool.output_schema,
                type: currentActionTool.type,
                proxy_url: currentActionTool.proxy_url,
                author: currentActionTool.author,
                status: currentActionTool.status,
                need_llm_call: currentActionTool.need_llm_call
            })
        }
    }, [currentActionTool])
    return (
        <Modal opened={open} onClose={() => { setOpen(false) }} title={isEdit ? '编辑AI工具' : '创建AI工具'} centered size="50%">
            <Box mx="auto">
                <Select
                    withAsterisk
                    searchable
                    label={<span >执行函数<a href="https://fcnext.console.aliyun.com/cn-hangzhou/functions/create" target="_blank" style={{ marginLeft: 12 }}>还没有执行函数？点击前往创建</a></span>}
                    placeholder="请选择执行函数"
                    data={functionList}
                    {...form.getInputProps('name')}
                />
                <TextInput mt={4} label="名称" placeholder="工具名" {...form.getInputProps('alias')} />
                <Textarea mt={4} withAsterisk label="描述" placeholder="输入工具描述" {...form.getInputProps('description')} description={<div><span >参考示例：</span><CopyToClipboard value={"文生图是一个AI绘画（图像生成）服务，输入文本描述，返回根据文本作画得到的图片的URL"} content={"文生图是一个AI绘画（图像生成）服务，输入文本描述，返回根据文本作画得到的图片的URL"} position={"none"} /> </div>} />
                <Textarea mt={4} withAsterisk label="输入参数" placeholder="输入参数" {...form.getInputProps('input_schema')} description={<div><span >参考示例：</span><CopyToClipboard value={"[ { 'name': 'prompt', 'description': '英文关键词，描述了希望图像具有什么内容', 'required': True, 'schema': {'type': 'string'}, } ]"} content={"[ { 'name': 'prompt', 'description': '英文关键词，描述了希望图像具有什么内容', 'required': True, 'schema': {'type': 'string'}, } ]"} position={"none"} /> </div>} />
                <Textarea mt={4} label="输出参数" placeholder="输入参数" {...form.getInputProps('output_schema')} />
                <Radio.Group
                    mt={4}
                    withAsterisk
                    name="need_llm_call"
                    value={form.getInputProps('need_llm_call')?.value as any}
                    label="工具执行结果反馈与否"
                    description="如果选择否，智能体调用完工具会直接返回"
                    onChange={(value: any) => {
                        const _value = parseInt(value, 10);
                        form.setFieldValue('need_llm_call', _value);
                    }}
                >
                    <Group mt={4}>
                        <Radio value={1} label="是" />
                        <Radio value={2} label="否" />
                    </Group>
                </Radio.Group>
                <TextInput mt={8} label="作者" placeholder="请输入作者" {...form.getInputProps('author')} />
            </Box>
            <Box mx="auto" pt={12} style={{ textAlign: 'right' }}>
                <Button onClick={async () => {
                    form.validate();
                    if (form.isValid()) {
                        setLoading(true);
                        !isEdit ? await addTool(form.values) : await updateTool(currentActionTool?.id, form.values);

                        await getToolList();
                        setOpen(false);
                        setLoading(false);
                    }

                }}>确认</Button>
            </Box>
        </Modal>
    );
}


function ActionToolModelForm() {
    const { openToolForm, setOpenToolForm, currentToolForm, setLoadingForChoose, setOpenToChoose } = useActionToolStore();
    const atTemplate: TemplateParams & { template: string, description: string } = Object.assign({}, currentToolForm.functionConfig.templateParams, { template: currentToolForm.functionConfig.template, description: currentToolForm.description });
    let validate = {};
    let initialValues = {};
    const formParams: any = {};
    if (atTemplate.properties) {
        initialValues = Object.keys(atTemplate.properties).reduce((accumulator: any, filedName: string) => {
            accumulator[filedName] = atTemplate.properties[filedName].default;
            return accumulator;
        }, {});
        formParams.initialValues = initialValues;
    }
    const validateField = atTemplate?.required || [];
    if (validateField.length > 0) {
        validate = validateField.reduce((accumulator: any, filedName: string) => {
            accumulator[filedName] = (value: any) => (!value ? '必需填写' : null);
            return accumulator;
        }, {});
        formParams.validate = validate;
    }

    const form = useForm(formParams);
    function renderFormUi(key: string, field: TemplatePropertyDetail) {
        if (!field.hiddenUI) {
            let FieldComponent = <TextInput withAsterisk label={field.title} placeholder="" {...form.getInputProps(key)} description={<div dangerouslySetInnerHTML={{ __html: field.description }} />} />
            switch (field.type) {
                case 'string':
                    if (field.uiType === 'select') {
                        FieldComponent = <Select
                            withAsterisk={atTemplate.required.includes(key)}
                            data={field.dataSource}
                            description={<div dangerouslySetInnerHTML={{ __html: field.description }} />}
                            label={field.title}
                            placeholder=""

                            {...form.getInputProps(key)}
                        />
                    }
                    if (field.uiType === 'password') {
                        FieldComponent = <PasswordInput
                            withAsterisk label={field.title} placeholder="" {...form.getInputProps(key)} description={<div dangerouslySetInnerHTML={{ __html: field.description }} />} />
                    }
                    break;
                default:
                    break
            }
            return FieldComponent;
        } else {
            return null;
        }
    }

    return (
        <Modal opened={openToolForm} onClose={() => { setOpenToolForm(false) }} title="填写AI工具配置项" centered  >
            <Box maw={FORM_WIDTH} mx="auto">
                {atTemplate.properties && Object.keys(atTemplate?.properties).map((key: string) => {
                    return <div key={key}>{renderFormUi(key, atTemplate?.properties[key])}</div>
                })}
            </Box>
            <Box maw={FORM_WIDTH} mx="auto" pt={12} style={{ textAlign: 'right' }}>
                <Button onClick={async () => {
                    form.validate();
                    if (form.isValid()) {
                        try {
                            setOpenToolForm(false);
                            setLoadingForChoose(true);
                            const createAppPayload = {
                                description: currentToolForm.description,
                                name: currentToolForm.functionConfig.functionName,
                                ...form.values
                            }
                            const appName: any = await createServerlessApp(currentToolForm.functionConfig.template, createAppPayload);
                            if (appName) {
                                await checkAppStatus(appName);
                            } else {
                                throw new Error('创建应用失败');
                            }
                            const data = await addTool({
                                name: currentToolForm.functionConfig.functionName,
                                alias: currentToolForm.name,
                                description: currentToolForm.description,
                                input_schema: currentToolForm.input_schema,
                                type: 1,
                                status: 2,
                                output_schema: '',
                                author: '',
                                proxy_url: '',
                                need_llm_call: 1,
                            });
                            if (data) {
                                await getToolList();
                            } else {
                                notifications.show({
                                    title: '创建工具失败',
                                    message: '请检查是否已经存在该工具',
                                    color: 'red',
                                });
                            }
                            setOpenToChoose(false);
                            setLoadingForChoose(false);
                        } catch (e) {
                            console.log(e);
                        }

                    }

                }}>确认</Button>
            </Box>
        </Modal>
    );
}
function ActionToolCard(props: any) {
    const item = props.data;
    return <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 240, height: 160, cursor: 'pointer' }}>
        <div>
            {item.tag.map((tag: string, index: number) => {
                return <Badge color="green" variant="light" key={`template-${index}-${tag}`} mr={4}>
                    {tag}
                </Badge>
            })}
        </div>
        <Text size="sm" color="dimmed">
            {item.description}
        </Text>
    </Card>
}

export function ChooseModal() {
    const { openToChoose, setOpenToChoose, openToolForm, setOpen, loadingForChoose, setCurrentToolForm, setOpenToolForm } = useActionToolStore();

    const createActionTools = async (item: any) => {
        setOpenToolForm(true);
        setCurrentToolForm(item);
    }
    return (
        <Modal opened={openToChoose} onClose={() => { setOpenToChoose(false) }} title={'AI工具'} centered size="800px" closeOnClickOutside={false} >
            <LoadingOverlay visible={loadingForChoose} overlayOpacity={0.6} loader={<Flex align={'center'} direction="column"><Flex align={'center'} >部署AI工具大约需要1分钟，请耐心等待<Loader variant="bars" color={'pink'} ml={12} /></Flex></Flex>} />
            <Flex wrap={'wrap'} justify={'flex-start'} pb={24} pl={12}>
                {ACTION_TOOL_TEMPLATES.map((item: any, index: number) => {
                    return <Box key={`template-${index}-${item.tag.join('-')}`} mb={12} mr={12} onClick={() => createActionTools(item)} className={styles['action-tool-card']}>
                        <ActionToolCard data={item} />
                    </Box>
                })}
                <Box >
                    <Card shadow="sm" radius="md" withBorder style={{ width: 240, height: 120 }}>
                        <Button
                            variant={'outline'}
                            onClick={() => {
                                setOpenToChoose(false);
                                setOpen(true);
                            }}
                            h={'100%'}
                            w={'100%'} >
                            <Text size={18}>+ 自定义</Text>
                        </Button>
                    </Card>
                </Box>
            </Flex>
            {openToolForm && <ActionToolModelForm />}
        </Modal>
    );
}


function List() {
    const { toolList, loading, setLoading, setEditStatus, setOpen, setCurrentActionTool } = useActionToolStore();

    const removeDataActionTool = (actionTool: IActionTool) => {
        const { id, name } = actionTool;
        const deleteContent = `确定删除 ${name}?, 删除AI工具可能会影响您的智能助手使用，请检查相关的依赖，本次删除不会删除您的云上函数资源`;
        modals.openConfirmModal({
            title: '删除AI工具',
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
                await deleteTool(id);
                await getToolList();
                setLoading(false);
            },
        });

    }
    const rows = toolList.map((element: IActionTool) => (
        <tr key={element.id}>
            <td>{element.id}</td>
            <td>{element.alias}</td>
            <td>{element.name}</td>
            {/* <td >{ACTION_TOOL_STATUS_NAME_MAP[element.status]}</td> */}
            <td style={{ width: 200 }}>{<CopyToClipboard value={element.description} content={element.description} position={"none"} />}</td>
            <td style={{ width: 200 }}><CopyToClipboard value={element.input_schema} content={<Code color="teal">{element.input_schema}</Code>} position={"none"} /></td>
            <td>{element.output_schema}</td>
            <td>{ACTION_TOOL_TYPE_NAME_MAP[element.type]}</td>
            <td>{element.author}</td>
            <td>{formatDateTime(element.created)}</td>
            <td>{formatDateTime(element.modified)}</td>
            <td>
                <Button
                    variant="filled"
                    size="xs"
                    onClick={() => {
                        setEditStatus(true);
                        setCurrentActionTool(element);
                        setOpen(true);
                    }} mr={4}>编辑</Button>
                <Button variant="filled"
                    color="red"
                    size="xs"
                    onClick={() => removeDataActionTool(element)}>删除</Button>
            </td>
        </tr>
    ));

    const getActionTools = async () => {
        setLoading(true);
        await getToolList();
        setLoading(false);
    }
    useEffect(() => {
        getActionTools();
    }, []);

    return (
        <Box pos="relative" className={'content-container'} pb={124} >
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>名称</th>
                        <th>执行函数</th>
                        {/* <th>函数状态</th> */}
                        <th>描述</th>
                        <th>入参</th>
                        <th>出参</th>
                        <th>类型</th>
                        <th>作者</th>
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


export function ActionToolsPage() {
    const { setOpenToChoose, setEditStatus } = useActionToolStore();
    // const items = [
    //     { title: 'AgentCraft', href: '#' },
    //     { title: 'AI工具', href: '/actionTools' },
    // ].map((item, index) => (
    //     <Anchor href={item.href} key={index}>
    //         {item.title}
    //     </Anchor>
    // ));

    return (
        <>
            {/* <Breadcrumbs>{items}</Breadcrumbs> */}
            <FeatureDescription title="AI工具" description="AI工具是Agent能力非常核心的部分，当你需要进行高级功能的Agent开发，AI工具是必不可少的" />
            <Box mt={12} >
                <Button onClick={() => {
                    setEditStatus(false);
                    setOpenToChoose(true);
                }}>
                    新建AI工具
                </Button>
            </Box>
            <AddOrUpdate />
            <ChooseModal />
            <List />
        </>

    );
}
