import React, { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';
import { useForm, UseFormReturnType } from '@mantine/form';
import { Button, Title, Stepper, Group, Flex, LoadingOverlay, Anchor, Loader, Modal, Box } from '@mantine/core';
import LLMProxy from 'features/overview/llmProxy';
import DataAll from 'features/overview/dataAll';
import { DEFAULT_CHAT_INSTRUCTION } from 'constants/instructions'
import { Agent } from 'features/overview/agent';
import { useQuickStartStore, QuickStartStep,  createLLMProxyOnly, createDataAll } from "store/quickStart";
import { addAssistant, refreshToken as refreshAssistantToken } from 'store/assistant';
import { addKnowledgeBase, refreshToken } from 'store/knowledgeBase';
import { getModelList, useModelStore } from 'store/model';
import { getDataSetList, useDataSetStore } from 'store/dataset';
import { DataSetRequestPayload } from 'types/dataset';
import { PROMPT_TEMPLATE, DEFAULT_SYSTEM_PROMPT } from 'constants/index';
import { DATA_RETRIVAL_PROMPT_TEMPLATE } from 'constants/instructions';
import { DEFAULT_CHUNK_SIZE } from 'constants/dataset';
import { AGENT_TYPE } from 'constants/agent';
import { Model } from 'types/model';



function Add() {
    const open = useDataSetStore().open;
    const setOpen = useDataSetStore().setOpen;
    const loading = useDataSetStore().loading;
    const setLoading = useDataSetStore().setLoading;
    const dataAllForm: UseFormReturnType<any> = useForm({
        initialValues: {
            name: 'AgentCraft快速入门数据集',
            title: 'AgentCraft快速入门数据集',
            chunk_size: DEFAULT_CHUNK_SIZE,
            url: `${window.location.protocol}//${window.location.host}/agentcraft.md`,
            file: ''
        },
        validate: {
            name: (value) => (!value ? '名称必填' : null),
            chunk_size: (value) => (!value ? '切片数字必填' : null),
            file: (value) => (!value ? '上传文档必填' : null)
        },
    });

    return (
        <Modal opened={open} onClose={() => { setOpen(false) }} title="创建数据集" centered size={'lg'}>
            <div style={{ position: 'relative' }}>
                <LoadingOverlay
                    loader={<Flex align={'center'} direction="column"><Flex align={'center'} bg="white" p={12}>创建数据集&数据源预计花费1-2分钟，请耐心等待<Loader variant="bars" color={'pink'} ml={12} /></Flex></Flex>}
                    overlayOpacity={0.3}
                    overlayColor="#c5c5c5"
                    visible={loading}
                />
                <DataAll form={dataAllForm} />
                <Box mx="auto" pt={12} style={{ textAlign: 'right' }}>
                    <Button onClick={async () => {
                        dataAllForm.validate();
                        if (dataAllForm.isValid()) {
                            setLoading(true);
                            const datasetData: DataSetRequestPayload = dataAllForm?.values || {};
                            await createDataAll(datasetData);
                            await getDataSetList();
                            setOpen(false);
                            setLoading(false);
                        }

                    }}>确认</Button>
                </Box>
            </div>
        </Modal>
    );
}




export function QuickStart({ workspaceId }: any) {
    const router = useRouter();

    const modelList: Model[] = useModelStore().modelList;
    const setOpen = useDataSetStore().setOpen;
    const [appName, setAppName] = useState('');
    const llmProxyForm: UseFormReturnType<any> = useForm({
        initialValues: {
            name_alias: 'QWEN3-235b',
            description: 'QWEN最新模型QWEN3-235b',
            region: 'cn-hangzhou',
            apiKey: '',
            model: 'qwen3-235b-a22b'
        },
        validate: {
            name_alias: (value) => (!value ? 'LLM代理名称必填' : null),
            region: (value) => (!value ? 'LLM代理所在地域必填' : null)
        },
    });

    const createInstructionChat = async (form: any) => {
        form.validate();
        if (form.isValid()) {
            const values: any = form.values;
            const result = await addKnowledgeBase(values);
            const instructionChatId = result.id;
            if (instructionChatId) {
                await refreshToken(instructionChatId);
                await router.push(`/agent/${workspaceId}/instructionChat/${instructionChatId}`);
            }
            return true;
        } else {
            return false
        }
    }
    const createKnowledgeBase = async (form: any) => {
        form.validate();
        if (form.isValid()) {
            const values: any = form.values;
            const result = await addKnowledgeBase(values);
            const knowledgeBaseId = result.id;
            if (knowledgeBaseId) {
                await refreshToken(knowledgeBaseId);
                await router.push(`/agent/${workspaceId}/knowledgeBase/${knowledgeBaseId}`)
            }
            return true;
        } else {
            return false
        }
    }
    const createAssistant = async (form: any) => {
        form.validate();
        if (form.isValid()) {
            const values: any = form.values;
            const result = await addAssistant(values);
            const assistantId = result.id;
            if (assistantId) {
                await refreshAssistantToken(assistantId);
                await router.push(`/agent/${workspaceId}/assistant/${assistantId}`)
            }
            return true;
        } else {
            return false
        }
    }

    const knowledgeBaseForm: UseFormReturnType<any> = useForm({
        initialValues: {
            name: '',
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
            max_tokens: 8000,
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
            name: (value) => (!value ? '智能体名称必填' : null),
        },
    });
    const assistantForm: any = useForm({
        initialValues: {
            name: '',
            description: '',
            retrieval_prompt_template: DATA_RETRIVAL_PROMPT_TEMPLATE,
            app_id: '',
            exact_datasets: [],
            fuzzy_datasets: [],
            action_tools: [],
            exact_search_similarity: 0.9,
            fuzzy_search_similarity: 0.6,
            temperature: 0.5,
            top_p: 1.0,
            n_sequences: 1,
            max_tokens: 8000,
            stop: [],
            presence_penalty: 0,
            frequency_penalty: 0,
            logit_bias: '',
            model_id: '',
            redis_ip_ex: 0,
            redis_history_ex: 0,
            model_ip_limit: 0,
            llm_history_len: 0,
            system_message: '',
            instruction: '',
            exact_search_limit: 1,
            fuzzy_search_limit: 3,
            prompt_starts: [],
            capabilities: []
        },
        validate: {
            name: (value) => (!value ? '智能助手名必填' : null)
        },
    });
    const instructionChatForm: UseFormReturnType<any> = useForm({
        initialValues: {
            name: '',
            description: '',
            prompt_template: '',
            app_id: '',
            exact_datasets: [],
            fuzzy_datasets: [],
            exact_search_similarity: 0.9,
            fuzzy_search_similarity: 0.6,
            temperature: 0.5,
            top_p: 1.0,
            n_sequences: 1,
            max_tokens: 8000,
            stop: [],
            presence_penalty: 0,
            frequency_penalty: 0,
            logit_bias: '',
            model_id: '',
            redis_ip_ex: 0,
            redis_history_ex: 0,
            model_ip_limit: 0,
            llm_history_len: 0,
            system_message: DEFAULT_CHAT_INSTRUCTION,
            exact_search_limit: 1,
            fuzzy_search_limit: 3
        },
        validate: {
            name: (value) => (!value ? '智能体名称必填' : null),
        },
    });
    const {
        activeStep,
        configStepStatus,
        setDataSetId,
        setModelId,
        setActiveStep,
        setConfigStepStatus,
        setAutoQuickStart,
        currentAgentType,
        autoQuickStart
    } = useQuickStartStore();

    const {
        llm_proxy_create_loading,
        data_all_create_loading,
        knowledge_base_create_loading,
    } = configStepStatus;

    const createLLMProxy = async () => {
        llmProxyForm.validate();
        if (!llmProxyForm.isValid()) {
            return;
        }
        let modelId = '';
        configStepStatus.llm_proxy_create_loading = true;
        setConfigStepStatus(configStepStatus);
        //处理
        const values = llmProxyForm.values;

        try {
       

            modelId = await createLLMProxyOnly(values);
            configStepStatus.llm_proxy_create_loading = false;
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
            setConfigStepStatus(configStepStatus);
        }
        return modelId;

    }

    const nextStep = async () => {
        if (activeStep === QuickStartStep.LLM_PROXY) {
            await createLLMProxy();
            await getModelList();
        }
        if (activeStep === QuickStartStep.AGENT) {
            configStepStatus.knowledge_base_create_loading = true;
            setConfigStepStatus(configStepStatus);
            try {
                let agentCreateSuccess = false
                if (currentAgentType === AGENT_TYPE.KNOWLEDGEBASE) {
                    agentCreateSuccess = await createKnowledgeBase(knowledgeBaseForm)
                }
                if (currentAgentType === AGENT_TYPE.ASSISTANT) {
                    agentCreateSuccess = await createAssistant(assistantForm)
                }
                if (currentAgentType === AGENT_TYPE.INSTRUCTIO_CHAT) {
                    agentCreateSuccess = await createInstructionChat(instructionChatForm)
                }
                if (agentCreateSuccess) {
                    setAutoQuickStart(false); //关闭快速启动
                }

            } catch (e) {
            }
            configStepStatus.knowledge_base_create_loading = false;
            setConfigStepStatus(configStepStatus);

        }

    };
    const prevStep = () => {
        const currentStep = activeStep > 0 ? activeStep - 1 : activeStep;
        setActiveStep(currentStep);
    };
    const autoCreate = async () => {
        // 检测是否已经存在智能体
        if (autoQuickStart) {

            const modelId = await createLLMProxy();
            if (modelId) {
                instructionChatForm.setValues({
                    model_id: modelId,
                    name: '满血版DeepSeek-R1',
                    description: '满血DeepSeek-R1智能助手'
                });
            }
            setTimeout(async () => {
                configStepStatus.knowledge_base_create_loading = true;
                setConfigStepStatus(configStepStatus);
                await createInstructionChat(instructionChatForm);
                configStepStatus.knowledge_base_create_loading = false;
                setConfigStepStatus(configStepStatus);
                setAutoQuickStart(false);
            }, 1000);
        }

    };

    // useEffect(() => {
    //     autoCreate(); // 自动创建代理及智能体
    // }, []);

    useEffect(() => {
        if (workspaceId) {
            let app_id;
            try {
                app_id = parseInt(workspaceId);
            } catch (e) { }
            instructionChatForm.setValues({
                app_id
            });
            knowledgeBaseForm.setValues({
                app_id
            });
            assistantForm.setValues({
                app_id
            });
        }
    }, [workspaceId]);

    useEffect(() => {
        getModelList();
    }, []);

    useEffect(() => {
        if (modelList.length > 0) {
            const model_id = modelList[0].id;
            instructionChatForm.setValues({
                model_id,
                name: '满血版DeepSeek-R1',
                description: '满血DeepSeek-R1智能助手'
            });
            knowledgeBaseForm.setValues({
                model_id
            });
            assistantForm.setValues({
                model_id
            });
        }
    }, [modelList]);

    const modelSelectData: any = modelList.map((item: Model) => { return { label: item.name_alias, value: item.id } });
    return (
        <>
            <Flex align={'center'} mb={18}><Title order={3} >快速开始</Title><Button onClick={() => { setAutoQuickStart(false) }} compact variant="subtle">关闭</Button></Flex>
            <Stepper active={activeStep} onStepClick={setActiveStep}>
                <Stepper.Step label="基础模型&LLM代理" description="进行LLM基础模型的创建以及LLM代理关联" loading={llm_proxy_create_loading}>
                    <div style={{ position: 'relative' }}>
                        <LoadingOverlay
                            loader={<Flex align={'center'} direction="column">帮助您构建通义千问的代理服务，后续可以用于各类智能体</Flex>}
                            overlayOpacity={0.3}
                            overlayColor="#c5c5c5"
                            visible={llm_proxy_create_loading}
                        />
                        <div style={{ padding: 20 }}>
                            <LLMProxy form={llmProxyForm} />
                        </div>
                    </div>
                </Stepper.Step>

                <Stepper.Step label="智能体创建" description="创建智能体" loading={knowledge_base_create_loading}>
                    <div style={{ position: 'relative' }}>
                        <LoadingOverlay
                            loaderProps={{ size: 'sm', color: 'pink', variant: 'bars' }}
                            overlayOpacity={0.3}
                            overlayColor="#c5c5c5"
                            visible={knowledge_base_create_loading}
                        />
                        <Agent
                            instructionChatForm={instructionChatForm}
                            knowledgeBaseForm={knowledgeBaseForm}
                            assistantForm={assistantForm}
                            modelSelectData={modelSelectData}
                            openDatasetModel={() => setOpen(true)} />
                    </div>
                </Stepper.Step>
            </Stepper>
            <Group mt="xl">
                {activeStep > QuickStartStep.LLM_PROXY ? <Button variant="default" onClick={prevStep}>上一步</Button> : null}
                {activeStep === QuickStartStep.LLM_PROXY ? <Button onClick={nextStep} disabled={llm_proxy_create_loading}>下一步</Button> : null}
                {activeStep === QuickStartStep.AGENT ? <Button onClick={nextStep} disabled={knowledge_base_create_loading}>完成</Button> : null}
            </Group>
            <Add />
        </>
    );
}