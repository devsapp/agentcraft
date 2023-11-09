import React, { useState } from "react";
import { useRouter } from 'next/router';
import { useForm, UseFormReturnType } from '@mantine/form';
import { Button, Title, Stepper, Group, Flex, LoadingOverlay, Anchor, Loader } from '@mantine/core';
import LLMProxy from 'features/overview/llmProxy';
import DataAll from 'features/overview/dataAll';
import KnowledgeBase from 'features/overview/knowledgeBase';
import { notifications } from '@mantine/notifications';
import { useQuickStartStore, QuickStartStep, createFoundationModelOnly, checkFoundationModelStatusAndLLMProxy, createDataAll, createKnowledgeBaseApp } from "store/quickStart";
import { PROMPT_TEMPLATE, DEFAULT_SYSTEM_PROMPT } from 'constants/index';

export function QuickStart() {
    const router = useRouter();
    const [appName, setAppName] = useState('');
    const llmProxyForm: UseFormReturnType<any> = useForm({
        initialValues: {
            name_alias: '通义千问模型',
            description: '',
            region: 'cn-hangzhou',
            apiKey: '',
            model: 'qwen-turbo'
        },
        validate: {
            name_alias: (value) => (!value ? 'LLM代理名称必填' : null),
            region: (value) => (!value ? 'LLM代理所在地域必填' : null),
            apiKey: (value) => (!value ? 'API Key必填' : null)
        },
    });

    const dataAllForm: UseFormReturnType<any> = useForm({
        initialValues: {
            name: 'AgentCraft快速入门数据集',
            title: 'AgentCraft快速入门数据集',
            chunk_size: 521,
            url: `${window.location.protocol}/${window.location.host}/example.md`,
            file: ''
        },
        validate: {
            name: (value) => (!value ? '名称必填' : null),
            chunk_size: (value) => (!value ? '切片数字必填' : null),
            file: (value) => (!value ? '上传文档必填' : null)
        },
    });

    const knowledgeBaseForm: UseFormReturnType<any> = useForm({
        initialValues: {
            name: 'AgentCraft快速入门知识库',
            prompt_template: PROMPT_TEMPLATE,
            description: '',
            app_id: '',
            exact_datasets: [],
            fuzzy_datasets: [],
            exact_search_similarity: 0.9,
            fuzzy_search_similarity: 0.6,
            temperature: 0.5,
            top_p: 1.0,
            n_sequences: 1,
            max_tokens: 1024,
            stop: [],
            presence_penalty: 0,
            frequency_penalty: 0,
            logit_bias: '',
            model_id: '',
            redis_ip_ex: 0,
            redis_history_ex: 0,
            model_ip_limit: 0,
            llm_history_len: 0,
            system_message: DEFAULT_SYSTEM_PROMPT,
            exact_search_limit: 1,
            fuzzy_search_limit: 3
        },
        validate: {
            name: (value) => (!value ? '知识库名称必填' : null),
        },
    });
    const {
        activeStep,
        configStepStatus,
        setDataSetId,
        setModelId,
        setActiveStep,
        setConfigStepStatus,
        setAutoQuickStart
    } = useQuickStartStore();

    const {
        llm_proxy_config_ready,
        llm_proxy_create_loading,
        data_all_config_ready,
        data_all_create_loading,
        knowledge_base_config_ready,
        knowledge_base_create_loading,
    } = configStepStatus;

    const createLLMProxy = async () => {
        llmProxyForm.validate();
        if (!llmProxyForm.isValid()) {
            return;
        }
        configStepStatus.llm_proxy_create_loading = true;
        setConfigStepStatus(configStepStatus);
        //处理
        const values = llmProxyForm.values;
        try {
            const _appName = await createFoundationModelOnly(values);
            setAppName(_appName);
            const modelId = await checkFoundationModelStatusAndLLMProxy(_appName, values);
            //结束
            configStepStatus.llm_proxy_create_loading = false;
            configStepStatus.llm_proxy_config_ready = true;
            setConfigStepStatus(configStepStatus);
            setModelId(modelId);
            notifications.show({
                title: '基础模型和LLM代理配置成功',
                message: '您已完成基础模型和LLM代理配置',
                color: 'green',
            });
            const currentStep = activeStep < 2 ? activeStep + 1 : activeStep;
            setActiveStep(currentStep);
        } catch (e: any) {
            notifications.show({
                title: '异常',
                message: e.message,
                color: 'red',
            });
            configStepStatus.llm_proxy_create_loading = false;
            configStepStatus.llm_proxy_config_ready = false;
            setConfigStepStatus(configStepStatus);
        }

    }

    const createAppAll = async () => {
        dataAllForm.validate();
        if (!dataAllForm.isValid()) {
            return;
        }
        configStepStatus.data_all_create_loading = true;
        setConfigStepStatus(configStepStatus);
        try {
            const dataSetId = await createDataAll(dataAllForm.values);
            configStepStatus.data_all_create_loading = false;
            configStepStatus.data_all_config_ready = true;
            setConfigStepStatus(configStepStatus);
            setDataSetId([dataSetId]);
            notifications.show({
                title: '恭喜数据集创建成功',
                message: '数据集创建成功',
                color: 'green',
            });
            const currentStep = activeStep < 2 ? activeStep + 1 : activeStep;
            setActiveStep(currentStep);
        } catch (e: any) {
            notifications.show({
                title: '异常',
                message: e.message,
                color: 'red',
            });
            configStepStatus.data_all_create_loading = false;
            configStepStatus.data_all_config_ready = false;
            setConfigStepStatus(configStepStatus);
        }
    }

    const createKnowledgeBase = async () => {
        knowledgeBaseForm.validate();
        if (!knowledgeBaseForm.isValid()) {
            return;
        }
        try {
            configStepStatus.knowledge_base_create_loading = true;
            setConfigStepStatus(configStepStatus);
            const appId = await createKnowledgeBaseApp(knowledgeBaseForm.values);
            configStepStatus.knowledge_base_create_loading = false;
            configStepStatus.knowledge_base_config_ready = true;
            setConfigStepStatus(configStepStatus);
            notifications.show({
                title: '恭喜您完成知识库应用创建',
                message: '前往知识库详列表查看',
                color: 'green',
            });
            router.push(`/app/${appId}/knowledgeBase`)


        } catch (e: any) {
            notifications.show({
                title: '异常',
                message: e.message,
                color: 'red',
            });
            configStepStatus.knowledge_base_create_loading = false;
            configStepStatus.knowledge_base_config_ready = false;
            setConfigStepStatus(configStepStatus);
        }


    }
    const nextStep = async () => {

        if (activeStep === QuickStartStep.LLM_PROXY) {
            await createLLMProxy();
            // if (!llm_proxy_config_ready) {

            //     await createLLMProxy();
            // }
        }
        if (activeStep === QuickStartStep.DATA_ALL) {
            await createAppAll();
            // if (!data_all_config_ready) {
            //     await createAppAll();
            // }
        }
        if (activeStep === QuickStartStep.KNOWLEDGE_BASE) {
            await createKnowledgeBase();
            // if (!knowledge_base_config_ready) {
            //     await createKnowledgeBase();
            // }
        }

    };
    const prevStep = () => {
        const currentStep = activeStep > 0 ? activeStep - 1 : activeStep;
        setActiveStep(currentStep);
    };
    return (
        <>
            <Flex align={'center'} mb={18}><Title order={3} >快速开始</Title><Button onClick={() => { setAutoQuickStart(false) }} compact variant="subtle">关闭</Button></Flex>
            <Stepper active={activeStep} onStepClick={setActiveStep}>
                <Stepper.Step label="基础模型&LLM代理" description="进行LLM基础模型的创建以及LLM代理关联" loading={llm_proxy_create_loading}>
                    <div style={{ position: 'relative' }}>
                        <LoadingOverlay
                            loader={<Flex align={'center'} direction="column"><Flex align={'center'} >部署基础模型和LLM代理预计需要5分钟，请耐心等待<Loader variant="bars" color={'pink'}  ml={12}/></Flex><Anchor href={`https://fcnext.console.aliyun.com/applications/${appName}/env/default?tab=envDetail`} target="_blank">点击查看应用创建日志</Anchor></Flex>}
                            overlayOpacity={0.3}
                            overlayColor="#c5c5c5"
                            visible={llm_proxy_create_loading}
                        />
                        {/* <div>{configStepStatus.llm_proxy_config_ready ? <div>该服务已经创建,点击下一步会自动忽略创建过程。<Button onClick={() => {
                        createLLMProxy();
                    }} compact variant="subtle">可点击再次创建</Button></div> : null}</div> */}
                        <div style={{ padding: 20 }}>
                            <LLMProxy form={llmProxyForm} />
                        </div>
                    </div>
                </Stepper.Step>
                <Stepper.Step label="创建数据集&数据源" description="创建数据集，上传数据源文件" loading={data_all_create_loading}>
                    {/* <div>{configStepStatus.llm_proxy_config_ready ? <div>该服务已经创建,点击下一步会自动忽略创建过程。<Button onClick={() => {
                        createLLMProxy();
                    }} compact variant="subtle">可点击再次创建</Button></div> : null}</div> */}
                    <div style={{ position: 'relative' }}>
                        <LoadingOverlay
                            loader={<Flex align={'center'} direction="column"><Flex align={'center'} >创建数据集&数据源预计花费1-2分钟，请耐心等待<Loader variant="bars" color={'pink'}  ml={12}/></Flex></Flex>}
                            overlayOpacity={0.3}
                            overlayColor="#c5c5c5"
                            visible={data_all_create_loading}
                        />
                        <div style={{ padding: 20 }}>
                            <DataAll form={dataAllForm} />
                        </div>
                    </div>
                </Stepper.Step>
                <Stepper.Step label="知识库应用创建" description="创建知识库" loading={knowledge_base_create_loading}>
                    {/* <div>{configStepStatus.llm_proxy_config_ready ? <div>该服务已经创建,点击完成会自动忽略创建过程。<Button onClick={() => {
                        createLLMProxy();
                    }} compact variant="subtle">可点击再次创建</Button></div> : null}</div> */}
                    <div style={{ position: 'relative' }}>
                        <LoadingOverlay
                            loaderProps={{ size: 'sm', color: 'pink', variant: 'bars' }}
                            overlayOpacity={0.3}
                            overlayColor="#c5c5c5"
                            visible={knowledge_base_create_loading}
                        />
                        <div style={{ padding: 20 }}>
                            <KnowledgeBase form={knowledgeBaseForm} />
                        </div>
                    </div>

                </Stepper.Step>
            </Stepper>

            <Group mt="xl">
                {activeStep > QuickStartStep.LLM_PROXY ? <Button variant="default" onClick={prevStep}>上一步</Button> : null}
                {activeStep === QuickStartStep.LLM_PROXY ? <Button onClick={nextStep} disabled={llm_proxy_create_loading}>下一步</Button> : null}
                {activeStep === QuickStartStep.DATA_ALL ? <Button onClick={nextStep} disabled={data_all_create_loading}>下一步</Button> : null}
                {activeStep === QuickStartStep.KNOWLEDGE_BASE ? <Button onClick={nextStep} disabled={knowledge_base_create_loading}>完成</Button> : null}
            </Group>
        </>
    );
}