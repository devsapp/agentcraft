import React, { use, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Breadcrumbs, Anchor, Flex, Tabs, Box, Card, Image, Text, Badge, Button, Group, Modal, TextInput, Select, PasswordInput, LoadingOverlay, Stepper, Loader, Notification } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';

import { IconMessageCircle, IconBrandGithubFilled, IconExternalLink } from '@tabler/icons-react';
import FeatureDescription from '@/components/FeatureDescription';
import { useFoundationModelStore, addFoundationModel, getFoundationModel, APP_STATUS } from '@/store/foundationModel';

import { FORM_WIDTH } from 'constants/index';

import { FOUNDATION_MODEL_TEMPLATES } from '@/constants/foundationModelTemplate';
import { ServerlessAppTemplate, TemplateParams, TemplatePropertyDetail } from '@/types/serverless-devs-app';
// import styles from './index.module.scss';

function LoadingStepper() {
    const appStatus = useFoundationModelStore().appStatus;

    return <div>

        <div style={{ wordBreak: 'break-all', width: 400, display: 'flex', alignItems: 'center' }}><span>该应基础模型创建预计需要3分钟，请耐心等待，你可以可以关闭此弹框，在基础模型列表查看您创建的基础模型列表</span><Loader /></div>
        <Stepper active={appStatus} breakpoint="sm">
            <Stepper.Step label="初始化" description="" />
            <Stepper.Step label="创建中" description="" />
            <Stepper.Step label="创建成功/失败" description="" />
        </Stepper>
    </div>

}

function FmForm() {

    const setOpen = useFoundationModelStore().setOpen;
    const setCreateLoading = useFoundationModelStore().setCreateLoading;
    const setAppStatus = useFoundationModelStore().setAppStatus;
    const fmTemplate: TemplateParams & { template: string } = useFoundationModelStore().fmTemplate as TemplateParams & { template: string };
    let validate = {};
    const validateField = fmTemplate?.required || [];
    if (validateField.length > 0) {
        validate = validateField.reduce((accumulator: any, filedName: string) => {
            accumulator[filedName] = (value: any) => (!value ? '必需填写' : null);
            return accumulator;
        }, {});
    }
    const form = useForm({
        initialValues: {
        },
        validate,
    });

    function renderFormUi(key: string, field: TemplatePropertyDetail) {
        if (!field.hiddenUI) {
            let FieldComponent = <TextInput withAsterisk label={field.title} placeholder="" {...form.getInputProps(key)} description={<div dangerouslySetInnerHTML={{ __html: field.description }} />} />
            switch (field.type) {
                case 'string':
                    if (field.uiType === 'select') {
                        FieldComponent = <Select
                            withAsterisk={fmTemplate.required.includes(key)}
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

    function checkAppStatus(appName: string) {

        return new Promise((resolve, reject) => {
            setAppStatus(APP_STATUS.CREATING);
            const timmer = setInterval(async () => {
                try {
                    const result = await getFoundationModel(appName);
                    const release = result.lastRelease;
                    if (release.status === 'published') {
                        clearInterval(timmer);
                        setAppStatus(APP_STATUS.SUCCESS);
                        resolve('');
                    }
                } catch (e) {
                    reject(e);
                }

            }, 4000);

        })


    }
    useEffect(() => {
        if (fmTemplate.properties) {
            const initFormData = Object.keys(fmTemplate.properties).reduce((accumulator: any, currentKey: any) => {
                accumulator[currentKey] = fmTemplate.properties[currentKey].default;
                return accumulator;
            }, {});



            form.setValues(initFormData);

        }
    }, [fmTemplate])

    return (
        <>

            <Box maw={FORM_WIDTH} mx="auto">
                {fmTemplate.properties && Object.keys(fmTemplate?.properties).map((key: string) => {
                    return <div key={key}>{renderFormUi(key, fmTemplate?.properties[key])}</div>
                })}
            </Box>
            <Box maw={FORM_WIDTH} mx="auto" pt={12} style={{ textAlign: 'right' }}>
                <Button onClick={async () => {
                    form.validate();
                    if (form.isValid()) {
                        try {
                            setCreateLoading(true);
                            setAppStatus(APP_STATUS.INIT);
                            
                            const data = await addFoundationModel(fmTemplate.template, form.values);

                            const name = data.name;
                            await checkAppStatus(name);
                        } catch (e) {
                            console.log(e);
                        }
                        setCreateLoading(false);
                        setOpen(false);
                    }

                }}>确认</Button>
            </Box>
        </>
    );
}

function Add() {
    const open = useFoundationModelStore().open;
    const setOpen = useFoundationModelStore().setOpen;
    const createLoading = useFoundationModelStore().createLoading;



    return (
        <Modal opened={open} onClose={() => { setOpen(false) }} title="创建基础模型" centered size={'xl'}>
            <LoadingOverlay loader={<LoadingStepper />} visible={createLoading} overlayOpacity={0.8} overlayBlur={2} />
            {open && <FmForm />}
        </Modal>
    );
}


function FoundationModelTab() {
    const setOpen = useFoundationModelStore().setOpen;
    const setFmTemplate = useFoundationModelStore().setFmTemplate;
    const openToCreateFoundationModel = (template: string, formData: any) => {
        setFmTemplate(Object.assign({}, formData, { template }));
        setOpen(true);
    }
    return <Tabs variant="outline" defaultValue="text2text">
        <Tabs.List>
            <Tabs.Tab value="text2text" icon={<IconMessageCircle size="0.8rem" />}>文本生成</Tabs.Tab>
            {/* <Tabs.Tab value="text2img" icon={<IconPhoto size="0.8rem" />}>图像生成</Tabs.Tab> */}
        </Tabs.List>
        <Tabs.Panel value="text2text" pt="xs">
            <Flex
                mih={50}
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
            >
                {FOUNDATION_MODEL_TEMPLATES.map((item: ServerlessAppTemplate, index: number) => {
                    return <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 320 }} mr={12} key={`template-${index}`}>
                        <Card.Section >
                            <Image
                                src={item.icon}
                                style={{ margin: '10px auto' }}
                                height={160}
                                width={160}
                                alt={item.tag.join('')}
                            />
                        </Card.Section>
                        <Group position="apart" mt="md" mb="xs">
                            <Text weight={500}>{item.name}</Text>
                            {
                                item.githubLink ? <a href={item.githubLink} target="_blank"><IconBrandGithubFilled /></a> : null
                            }

                        </Group>
                        <div>
                            {item.tag.map((tag) => {
                                return <Badge color="green" variant="light" key={`template-${index}-${tag}`} mr={4}>
                                    {tag}
                                </Badge>
                            })}
                        </div>
                        <Text size="sm" color="dimmed">
                            {item.description}
                        </Text>
                        <Flex align={'center'}>
                            <Button mr={8} variant="light" fullWidth mt="md" radius="md" onClick={() => openToCreateFoundationModel(item.template, item.templateParams)}>
                                直接创建
                            </Button>
                            <a target="_blank" href={item.fcLink}>
                                <Button variant="light" color="yellow" fullWidth mt="md" radius="md">
                                    <Flex align={'center'}>
                                        云创建<IconExternalLink />
                                    </Flex>
                                </Button>
                            </a>
                        </Flex>
                    </Card>
                })}
            </Flex>
        </Tabs.Panel>

        {/* <Tabs.Panel value="text2img" pt="xs">
            <Flex
                mih={50}
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
            >
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 320 }} mr={12}>
                    <Card.Section>
                        <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={160}
                            alt="Norway"
                        />
                    </Card.Section>

                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>stable-diffusion</Text>
                        <Badge color="green" variant="light">
                            huggingface社区
                        </Badge>
                    </Group>

                    <Text size="sm" color="dimmed">
                        文生图系列模型，效果炸裂，可扩展性强
                    </Text>

                    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                        创建
                    </Button>
                </Card>
            </Flex>
        </Tabs.Panel> */}
    </Tabs>
}

export function CreateFoundationModel() {

    const router = useRouter()
    const { query } = router;
    const items = [
        { title: 'AgentCraft', href: '/' },
        { title: '基础模型', href: '/foundationModel' },
        { title: '创建基础模型', href: `/foundationModel/create` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
            <FeatureDescription title="创建基础模型" description="依托阿里云Serverless的丰富应用模版以及完整的工具链，AgentCraft可以创建丰富多样的基础模型服务" />
            <Notification title="基础模型创建提示">
                <Flex align={'center'}>
                    使用非阿里云主账号部署的AgentCraft,请选择使用<Text c="yellow" fw={700}>”云创建“</Text>跳转到<a href="https://fcnext.console.aliyun.com/applications?tab=all" target="_blank">函数计算控制台</a>进行基础模型的服务创建，在云端创建的时候请注意使用AgentCraft前缀作为应用名
                </Flex>
            </Notification>
            <Box mt={12} >
                <FoundationModelTab />
            </Box>
            <Add />
        </>

    );
}
