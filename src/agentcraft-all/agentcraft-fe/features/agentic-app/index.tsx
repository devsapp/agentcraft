import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { Stepper, Tabs, Table, Card, Button, Box, Select, PasswordInput, Image, TextInput, Text, LoadingOverlay, Modal, Textarea, Flex } from '@mantine/core';
import { useKnowledgeBaseStore, addKnowledgeBase, refreshToken, updateKnowledgeBase, getKnowledgeBase } from 'store/knowledgeBase';
import { useAssistantStore, addAssistant, refreshToken as refreshAssistenToken, updateAssistant, getAssistant } from 'store/assistant';
import { addFunctionAiApp, getFunctionAiApp } from '@/store/functionAI';
import { KnowledgeBaseRequestPayload, KnowledgeBaseResponseData, KnowledgeBase, IIsPublic } from 'types/knowledgeBase';
import { AgenticAppStatus, FunctionAiAppStatus, UpsertAgenticAppRequest } from '@/types/agenticApp';
import { DATA_RETRIVAL_PROMPT_TEMPLATE, DEFAULT_CHAT_INSTRUCTION } from 'constants/instructions';
import { useForm } from '@mantine/form';
import FeatureDescription from 'components/FeatureDescription';
import { MULTI_AGENT_APP_TEMPLATES } from '@/constants/super-apps';
import { useAgenticAppStore, addAgenticApp, getAgenticAppList } from '@/store/agenticApp';
import { generateRandomSuffix } from 'utils/index'
import { ACTION_TOOL_TEMPLATES } from 'constants/action-tools';
import { createServerlessApp, checkAppStatus } from 'store/infra';
import { getModelList, addModel } from 'store/model';
import { addWorkspace, getWorkspaceListAndSetCurrent } from 'store/workspace';
import { addTool, getToolList } from 'store/actionTools';
import { formatDateTime } from 'utils/index';

function findActionToolByTemplate(templateList: any[], tool: any) {
    return templateList.find(item => item.functionConfig.template === tool.template);
}
function extractDefaults(toolProperties: any) {
    const defaults: Record<string, any> = {};

    for (const key in toolProperties) {
        if (toolProperties.hasOwnProperty(key)) {
            const property = toolProperties[key];
            defaults[key] = property.default;
            if (key === 'dashscopeApiKey') {
                defaults[key] = '<DASHSCOPE_API_KEY>';
            }
            if (key === 'bucketName') {
                defaults[key] = '<BUCKET_NAME>';
            }
        }
    }

    return defaults;
}
function LoadingStepper() {
    const appStatus = useAgenticAppStore().appStatus;

    return <div>
        <Stepper active={appStatus} breakpoint="sm">
            <Stepper.Step label="创建工具&MCP" description="" loading={appStatus === AgenticAppStatus.CREATE_TOOL_MCP} />
            <Stepper.Step label="创建LLM代理服务" description="" loading={appStatus === AgenticAppStatus.CREATE_LLM} />
            <Stepper.Step label="创建工作空间&智能体" description="" loading={appStatus === AgenticAppStatus.CREATE_WORKSPACE_AGENTS} />
            <Stepper.Step label="智能体编排&创建应用" description="" loading={appStatus === AgenticAppStatus.CREATE_APP} />
        </Stepper>
    </div>

}

async function createActionTools(tools: any[]) {
    const currentTools = await getToolList();

    let toolsMap: any = {};
    if (currentTools && currentTools.length > 0) {
        currentTools.forEach((item: any) => {
            toolsMap[item.name] = item.id;
        });
    }

    for (const tool of tools) {
        if (!toolsMap[tool.name]) {
            const currentActionToolTemplateConfig = findActionToolByTemplate(ACTION_TOOL_TEMPLATES, tool);
            if (currentActionToolTemplateConfig) {
                const input_schema = currentActionToolTemplateConfig.input_schema;
                const functionConifg = currentActionToolTemplateConfig.functionConfig;
                const templateParams = functionConifg.templateParams;
                const template = functionConifg.template;
                const toolProperties = templateParams.properties;
                const toolPayloadValues = extractDefaults(toolProperties);
                const name = functionConifg.functionName;
                const description = currentActionToolTemplateConfig.description;
                const createToolayload = {
                    description,
                    name,
                    ...toolPayloadValues
                };

                try {
                    const appName: any = await createServerlessApp(template, createToolayload);
                    if (appName) {
                        await checkAppStatus(appName);
                    }
                } catch (e) {

                }
                await addTool({
                    name: functionConifg.functionName,
                    alias: name,
                    description,
                    input_schema,
                    type: 1,
                    status: 2,
                    output_schema: '',
                    author: '',
                    proxy_url: '',
                    need_llm_call: 1,
                });
            }
        }
    }
    return toolsMap;
}

async function createLLMs(llms: any[]) {
    const llmList = await getModelList();
    let llmModelMap: any = {};
    if (llmList && llmList.length > 0) {
        llmList.forEach((item: any) => {
            llmModelMap[item.name] = item.id;
        });
    }
    for (const llm of llms) {
        if (!llmModelMap[llm.name]) {
            const llmResult: any = await addModel({ ...llm });
            llmModelMap[llm.name] = llmResult.data.id;
        }
    }
    return llmModelMap;
}


async function createWorkspace(name: string, description: string) {
    let id = '';
    try {
        const res = await addWorkspace({
            name,
            description
        });
        id = res.data.id;
    } catch (e) {
    }
    return id;
}


async function createAgents(agents: any[], dependencies: any) {
    const { workspaceId, llmDenpendencies, toolDenpendencies } = dependencies;
    let agentTokenMap: any = {};
    const is_public: IIsPublic = 0;
    const agentFormValues: any = {
        name: '',
        description: '',
        prompt_template: '',
        app_id: workspaceId,
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
        system_message: '',
        exact_search_limit: 1,
        fuzzy_search_limit: 3,
        is_public
    }
    const intentionAgentFrom = JSON.parse(JSON.stringify(agentFormValues));
    let intentionPrompt = `你是一个专业的意图识别器，请一步一步思考，仔细根据上下文以及用户最后问题的的意图识别用户想要咨询的服务是哪个智能体，已知智能体如下:\n`;
    let examplePrompts = '';
    let agentIndex = 1;
    for (const agent of agents) {
        agentFormValues['name'] = agent.name;
        agentFormValues['description'] = agent.description;
        agentFormValues['system_message'] = agent.prompt;
        agentFormValues['model_id'] = llmDenpendencies[agent.llm];
        intentionPrompt += `${agentIndex}. ${agent.description} \n`;
        examplePrompts += [`\t\t<user_query>${agent.example || ''}</user_query>`, `\t\t<assistant_response>${agentIndex}</assistant_response>`].join('\n');
        if (agent.type === 'instruction') {
            const result = await addKnowledgeBase(agentFormValues);
            const instructionChatId = result.id;
            if (instructionChatId) {
                const { token } = await refreshToken(instructionChatId);
                agentTokenMap[`agent-${agentIndex}`] = { token, type: 'v1' };
            }
        }
        if (agent.type === 'assistant') {
            let agentTools = [];
            if (agent.tools) {
                agentTools = agent.tools.map((tool: any) => {
                    return toolDenpendencies[tool.name]
                }).filter((tool: any) => tool);
            }
            agentFormValues['action_tools'] = agentTools;
            agentFormValues['mcp_server'] = '';
            agentFormValues['prompt_starts'] = [];
            agentFormValues['capabilities'] = [];
            agentFormValues['instruction'] = DEFAULT_CHAT_INSTRUCTION
            agentFormValues['retrieval_prompt_template'] = DATA_RETRIVAL_PROMPT_TEMPLATE;

            const result = await addAssistant(agentFormValues);
            const assistantId = result.id;
            if (assistantId) {
                const { token } = await refreshAssistenToken(assistantId);
                agentTokenMap[`agent-${agentIndex}`] = { token, type: 'v2' };
            }
        }
        agentIndex++;
    }
    const artifact_info = ['<artifact_info>',
        '\t<artifact_instructions>',
        '\t\t1. 根据用户的需求辨别智能体，返回对应的数字编号',
        '\t\t2. 不明意图一律返回默认智能体的编号',
        '\t\t3. 无需进行其他的解释',
        '\t</artifact_instructions>',
        '</artifact_info>'].join('\n');
    const finalIntentionPrompt = [
        intentionPrompt,
        artifact_info,
        `<examples>\n\t<example>\n${examplePrompts}\n</example>\n\t</examples>`,
        '注意结合上下文，注意仔细甄别内容不要出现误判'
    ].join('\n');
    intentionAgentFrom['name'] = '意图识别器';
    intentionAgentFrom['description'] = '意图识别';
    intentionAgentFrom['system_message'] = finalIntentionPrompt;
    intentionAgentFrom['model_id'] = llmDenpendencies['qwen-plus'];
    const result = await addKnowledgeBase(intentionAgentFrom);
    const instructionChatId = result.id;
    if (instructionChatId) {
        const { token } = await refreshToken(instructionChatId);
        agentTokenMap["intention"] = { token, type: 'v1' };
    }
    return agentTokenMap;
}





function AgenticAppForm() {
    const router = useRouter();
    const setOpen = useAgenticAppStore().setOpen;
    const setCreateLoading = useAgenticAppStore().setCreateLoading;
    const setAppStatus = useAgenticAppStore().setAppStatus;
    const AgenticAppTemplate = useAgenticAppStore().AgenticAppTemplate;
    let validate = {};
    const validateField = AgenticAppTemplate?.required || [];
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

    function renderFormUi(key: string, field: any) {
        if (!field.hiddenUI) {
            const agentTemplateParams = AgenticAppTemplate.templateParams;
            let FieldComponent = <TextInput withAsterisk label={field.title} placeholder="" {...form.getInputProps(key)} description={<div dangerouslySetInnerHTML={{ __html: field.description }} />} />
            switch (field.type) {
                case 'string':
                    if (field.uiType === 'select') {
                        FieldComponent = <Select
                            withAsterisk={agentTemplateParams.required.includes(key)}
                            data={field.dataSource}
                            description={<div dangerouslySetInnerHTML={{ __html: field.description }} />}
                            label={field.title}
                            placeholder=""

                            {...form.getInputProps(key)}
                        />
                    }
                    if (field.uiType === 'hidden') {
                        FieldComponent = <TextInput style={{ display: 'none' }} withAsterisk label={field.title} placeholder="" {...form.getInputProps(key)} description={<div dangerouslySetInnerHTML={{ __html: field.description }} />} />
                    }
                    if (field.uiType === 'textarea') {
                        FieldComponent = <Textarea
                            minRows={8}
                            withAsterisk
                            label={field.title}
                            placeholder=""
                            {...form.getInputProps(key)}
                            description={<div dangerouslySetInnerHTML={{ __html: field.description }} />} />
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

    const pollAgenticAppStatus = async (projectName: string, deployedServiceName: string, maxAttempts = 24, interval = 5000): Promise<{ custom_domain: string, system_url: string, phase: string }> => {
        return new Promise(async (resolve, reject) => {
            let attempts = 0;

            const checkStatus = async () => {
                try {
                    const result = await getFunctionAiApp(projectName, deployedServiceName);
                    const { system_url, phase, custom_domain } = result.data;

                    if (phase === FunctionAiAppStatus.FINISHED || phase === FunctionAiAppStatus.FAILED) {
                        console.log(`Final phase: ${phase}`);
                        resolve({ system_url, phase, custom_domain });
                        return;
                    }

                    if (attempts < maxAttempts) {
                        attempts++;
                        setTimeout(checkStatus, interval);
                    } else {
                        console.log('Max attempts reached. Stopping polling.');
                        resolve({ system_url, phase, custom_domain }); // 或者 reject(new Error('Timeout'));
                    }
                } catch (error) {
                    console.error('Error fetching agent app status:', error);
                    reject(error);
                }
            };

            checkStatus();
        });
    };

    useEffect(() => {
        const agentTemplateParams = AgenticAppTemplate.templateParams;
        if (agentTemplateParams.properties) {

            const initFormData = Object.keys(agentTemplateParams.properties).reduce((accumulator: any, currentKey: any) => {
                accumulator[currentKey] = generateRandomSuffix(agentTemplateParams.properties[currentKey].default);
                return accumulator;
            }, {});

            form.setValues(initFormData);
        }
    }, [AgenticAppTemplate])

    return (
        <>
            <Box maw={'95%'} mx="auto">
                {AgenticAppTemplate.templateParams.properties && Object.keys(AgenticAppTemplate?.templateParams?.properties).map((key: string) => {
                    return <div key={key}>{renderFormUi(key, AgenticAppTemplate?.templateParams?.properties[key])}</div>
                })}
            </Box>
            <Box maw={'95%'} mx="auto" pt={12} style={{ textAlign: 'right' }}>
                <Button onClick={async () => {
                    form.validate();
                    if (form.isValid()) {
                        try {
                            setCreateLoading(true);
                            const functionAiApp = form.values;
                            const actionTools = AgenticAppTemplate.actionTools;
                            const llms = AgenticAppTemplate.llms;
                            const agents = AgenticAppTemplate.agents;
                            // 创建一个 app
                            setAppStatus(AgenticAppStatus.CREATE_TOOL_MCP);
                            const toolsMap = await createActionTools(actionTools);
                            setAppStatus(AgenticAppStatus.CREATE_LLM);
                            const llmMap = await createLLMs(llms);
                            setAppStatus(AgenticAppStatus.CREATE_WORKSPACE_AGENTS);
                            const workspaceId = await createWorkspace(AgenticAppTemplate.name, AgenticAppTemplate.description);
                            const agentTokenMap = await createAgents(agents, { workspaceId, llmDenpendencies: llmMap, toolDenpendencies: toolsMap });
                            const projectName = AgenticAppTemplate.projectName;
                            const AgenticAppPayload = {
                                projectName,
                                templateName: AgenticAppTemplate.templateName,
                                templateParameters: {
                                    ...functionAiApp,
                                    agentTokenMap: JSON.stringify(agentTokenMap)
                                },
                                description: AgenticAppTemplate.description,
                                envName: 'production',
                                variableValues: {},
                                serviceNameChanges: {}
                            }
                            setAppStatus(AgenticAppStatus.CREATE_APP);
                            const AgenticAppResData = await addFunctionAiApp(AgenticAppPayload);
                            const { deployedServiceName } = AgenticAppResData.data;
                            const { system_url, custom_domain, phase } = await pollAgenticAppStatus(projectName, AgenticAppTemplate.mainServiceName || deployedServiceName);
                            const agenticAppPaylpad: UpsertAgenticAppRequest = {
                                name: AgenticAppTemplate.name,
                                description: AgenticAppTemplate.description,
                                template: AgenticAppTemplate.templateName,
                                domain: custom_domain,
                                endpoint: system_url,
                                phase,
                                project_name: projectName,
                                config: AgenticAppTemplate,
                                icon: AgenticAppTemplate.icon,
                            }
                            await addAgenticApp(agenticAppPaylpad);

                        } catch (e) {
                        }
                        setAppStatus(AgenticAppStatus.FINISH);
                        getWorkspaceListAndSetCurrent();
                        setCreateLoading(false);
                        setOpen(false);
                    }

                }}>确认</Button>
            </Box>
        </>
    );
}

function Add() {
    const open = useAgenticAppStore().open;
    const setOpen = useAgenticAppStore().setOpen;
    const createLoading = useAgenticAppStore().createLoading;

    return (
        <Modal opened={open} onClose={() => { setOpen(false) }} title="创建Agentic应用" centered size="60%" closeOnClickOutside={false}>
            <LoadingOverlay loader={<LoadingStepper />} visible={createLoading} overlayOpacity={0.8} overlayBlur={2} />
            {open && <AgenticAppForm />}
        </Modal>
    );
}

export function AgenticAppPage() {

    const setOpen = useAgenticAppStore().setOpen;
    const agenticAppList = useAgenticAppStore().agenticAppList;
    const setAgenticAppTemplate = useAgenticAppStore().setAgenticAppTemplate;
    const openToCreateAgenticApp = (item: any) => {
        setAgenticAppTemplate(item);
        setOpen(true);
    }

    useEffect(() => {
        getAgenticAppList();
    }, [])
    // 表格渲染部分
    const renderAgenticAppTable = () => {
        if (!agenticAppList || agenticAppList.length === 0) {
            return <Text>暂无 Agentic 应用数据</Text>;
        }

        const rows = agenticAppList.map((app) => (
            <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.name}</td>
                <td style={{ width: 400 }}>{app.description}</td>
                <td>{formatDateTime(app.created_at)}</td>
                <td>{formatDateTime(app.updated_at)}</td>
                <td>
                    <a href={`http://${app.domain}`} target="_blank" rel="noopener noreferrer">
                        访问地址
                    </a>
                </td>
            </tr>
        ));

        return (
            <Box pos="relative" className={'content-container'} pb={124}>
                <Table striped withBorder withColumnBorders mt={12}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>名称</th>
                            <th>描述</th>
                            <th>创建时间</th>
                            <th>更新时间</th>
                            <th>访问链接</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Box>
        );
    };

    // 渲染模板卡片
    const renderAgenticAppTemplates = () => {
        return (
            <Box pos="relative" pb={124} mt={12}>
                <Flex
                    mih={50}
                    gap="md"
                    justify="flex-start"
                    align="flex-start"
                    direction="row"
                    wrap="wrap"
                    pb={120}
                >
                    {MULTI_AGENT_APP_TEMPLATES.map((item: any) => (
                        <Card
                            shadow="sm"
                            padding="lg"
                            radius={5}
                            withBorder
                            key={item.name}
                            style={{ width: 353 }}
                        >
                            <Flex justify="space-between" align="center" mb={10}>
                                <Flex align={'center'}>
                                    <Text size="md" fw={700} mr={12}>
                                        {item.name}
                                    </Text>
                                    {item.icon ? (
                                        <img src={item.icon} width={38} height={38} alt="icon" />
                                    ) : (
                                        <Box
                                            w={38}
                                            h={38}
                                            style={{
                                                lineHeight: '38px',
                                                textAlign: 'center',
                                                fontSize: '14px',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {item.iconText}
                                        </Box>
                                    )}
                                </Flex>
                                <Button onClick={() => openToCreateAgenticApp(item)}>一键部署</Button>
                            </Flex>
                            <Text size="sm" color="dimmed" title={item.description}>
                                {item.description}
                            </Text>
                        </Card>
                    ))}
                </Flex>
            </Box>
        );
    };

    return (
        <>
            <FeatureDescription title="Agentic应用" description="Agentic应用是面向垂直场景的多智能体协作应用，将LLM、MCP、生成式UI、工作流等技术方案融合到一起，专注于交付智能服务效果的应用形态" />
            {agenticAppList && agenticAppList.length > 0 ? (
                <Tabs defaultValue="list">
                    <Tabs.List>
                        <Tabs.Tab value="list">Agentic 应用列表</Tabs.Tab>
                        <Tabs.Tab value="templates">Agentic 应用模板</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="list" pt="xs">
                        {renderAgenticAppTable()}
                    </Tabs.Panel>

                    <Tabs.Panel value="templates" pt="xs">
                        {renderAgenticAppTemplates()}
                    </Tabs.Panel>
                </Tabs>
            ) : (
                renderAgenticAppTemplates()
            )}
            <Add />
        </>
    );
}


