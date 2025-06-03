import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { Stepper, Tabs, Card, Button, Box, Select, PasswordInput, Image, TextInput, Text, LoadingOverlay, Modal, Textarea, Flex } from '@mantine/core';
import { addKnowledgeBase, refreshToken } from 'store/knowledgeBase';
import { addAssistant, refreshToken as refreshAssistenToken } from 'store/assistant';
import { addFunctionAiApp, getFunctionAiApp } from '@/store/functionAI';
import { IIsPublic } from 'types/knowledgeBase';
import { AgenticAppStatus, FunctionAiAppStatus, UpsertAgenticAppRequest } from '@/types/agenticApp';
import { DATA_RETRIVAL_PROMPT_TEMPLATE, DEFAULT_CHAT_INSTRUCTION } from 'constants/instructions';
import { useForm } from '@mantine/form';
import { MULTI_AGENT_APP_TEMPLATES } from 'constants/super-apps';
import { useAgenticAppStore, addAgenticApp, getAgenticAppList } from 'store/agenticApp';
import { addMcp, useMcpStore, } from 'store/mcp';
import { generateRandomSuffix } from 'utils/index'
import { createServerlessApp, checkAppStatus } from 'store/infra';
import { getModelList, addModel } from 'store/model';
import { addWorkspace, getWorkspaceListAndSetCurrent } from 'store/workspace';
import { addTool, getToolList } from 'store/actionTools';
import { ACTION_TOOL_TEMPLATES } from 'constants/action-tools';
import { MCP_FUNCTION_AI_TEMPLATES } from 'constants/mcp';
import { UpsertMcpRequest } from 'types/mcp';




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
                            const agenticAppResData = await addFunctionAiApp(AgenticAppPayload);
                            const { deployedServiceName } = agenticAppResData.data;
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
                        router.push('/agentic-app');
                    }

                }}>确认</Button>
            </Box>
        </>
    );
}

function AgenticAppAdd() {
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

function McpForm() {
    const router = useRouter();
    const setOpen = useMcpStore().setOpen;
    const setCreateLoading = useMcpStore().setCreateLoading;
    const mcpTemplate: any = useMcpStore().mcpTemplate;
    let validate = {};
    let mcpTemplateParams: any = {};
    try {
        const mcpVersion = mcpTemplate.version;
        mcpTemplateParams = JSON.parse(mcpVersion.param);
    } catch (e) {

    }
    const validateField: any = mcpTemplateParams.required || [];
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

    function renderFormUi(required: string[], key: string, field: any) {
        if (field.enum) {
            field.uiType = 'select';
            field.enum = field.enum.map((item: any) => {
                return {
                    value: item,
                    label: item
                };
            });
        }
        if (!field.hiddenUI) {
            let FieldComponent = <TextInput withAsterisk label={field.title} placeholder="" {...form.getInputProps(key)} description={<div dangerouslySetInnerHTML={{ __html: field.description }} />} />
            switch (field.type) {
                case 'string':
                    if (field.uiType === 'select') {
                        FieldComponent = <Select
                            withAsterisk={required.includes(key)}
                            data={field.enum}
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

    const pollMcpStatus = async (projectName: string, deployedServiceName: string, maxAttempts = 24, interval = 5000): Promise<{ custom_domain: string, system_url: string, phase: string, arn?: string, type?: number }> => {
        return new Promise(async (resolve, reject) => {
            let attempts = 0;

            const checkStatus = async () => {
                try {
                    const result = await getFunctionAiApp(projectName, deployedServiceName);
                    const { system_url, phase, custom_domain, arn, type } = result.data;

                    if (phase === FunctionAiAppStatus.FINISHED || phase === FunctionAiAppStatus.FAILED) {
                        console.log(`Final phase: ${phase}`);
                        resolve({ system_url, phase, custom_domain, arn, type });
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
        if (mcpTemplateParams.properties) {
            const initFormData = Object.keys(mcpTemplateParams.properties).reduce((acc: any, key) => {
                acc[key] = generateRandomSuffix(mcpTemplateParams.properties[key].default);
                return acc;
            }, {});

            form.setValues(initFormData);
        }
    }, [JSON.stringify(mcpTemplateParams.properties)])

    return (
        <>
            <Box maw={'95%'} mx="auto">
                {mcpTemplateParams.properties && Object.keys(mcpTemplateParams.properties).map((key: string) => {
                    return <div key={key}>{renderFormUi(mcpTemplateParams.required, key, mcpTemplateParams.properties[key])}</div>
                })}
            </Box>
            <Box maw={'95%'} mx="auto" pt={12} style={{ textAlign: 'right' }}>
                <Button onClick={async () => {
                    form.validate();
                    if (form.isValid()) {
                        try {
                            setCreateLoading(true);
                            const functionAiApp = form.values;
                            const projectName = mcpTemplate.package.name;
                            const templateName = mcpTemplate.version.name;
                            const description = mcpTemplate.version.description;
                            const mcpPayload = {
                                projectName,
                                templateName,
                                templateParameters: {
                                    ...functionAiApp,
                                },
                                description,
                                envName: 'production',
                                variableValues: {},
                                serviceNameChanges: {}
                            }
                            const mcpResData = await addFunctionAiApp(mcpPayload);
                            const { deployedServiceName } = mcpResData.data;
                            const { system_url, arn, type } = await pollMcpStatus(projectName, deployedServiceName);
                            const mcpPaylpad: UpsertMcpRequest = {
                                name: mcpTemplate.name,
                                description,
                                template: templateName,
                                endpoint: system_url,
                                project_name: projectName,
                                icon: mcpTemplate.logo,
                                content: mcpTemplate.version.readme,
                                type: type || 1,
                                arn,
                                tools: {}
                            }
                            await addMcp(mcpPaylpad);
                        } catch (e) {

                        }
                        setCreateLoading(false);
                        setOpen(false);
                        router.push('/mcp');

                    }

                }}>确认</Button>
            </Box>
        </>
    );
}
function McpAdd() {
    const open = useMcpStore().open;
    const setOpen = useMcpStore().setOpen;
    const createLoading = useMcpStore().createLoading;

    return (
        <Modal opened={open} onClose={() => { setOpen(false) }} title="创建MCP服务" centered size="60%" closeOnClickOutside={false}>
            <LoadingOverlay visible={createLoading} overlayOpacity={0.8} overlayBlur={2} />
            {open && <McpForm />}
        </Modal>
    );
}

export function ExplorePage() {

    const setOpen = useAgenticAppStore().setOpen;
    const setMcpFormOpen = useMcpStore().setOpen;
    const setAgenticAppTemplate = useAgenticAppStore().setAgenticAppTemplate;
    const setMcpTemplate = useMcpStore().setMcpTemplate;
    const openToCreateAgenticApp = (item: any) => {
        setAgenticAppTemplate(item);
        setOpen(true);
    }

    const openToCreateMCP = (item: any) => {
        setMcpTemplate(item);
        setMcpFormOpen(true);
    }

    useEffect(() => {
        getAgenticAppList();
    }, [])
    // 渲染模板卡片
    const renderAgenticApps = () => {
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

                            </Flex>
                            <Text size="sm"
                                color="dimmed"
                                title={item.description}
                                mb={12}
                            >
                                {item.description}
                            </Text>
                            <Button onClick={() => openToCreateAgenticApp(item)} w={'100%'} h={32}>一键部署</Button>
                        </Card>
                    ))}
                </Flex>
            </Box>
        );
    };
    const renderMcps = () => {
        return <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
            pb={120}
        >
            {MCP_FUNCTION_AI_TEMPLATES.map((item: any) => {
                return (
                    <a href={item.link} target="_blank" rel="noreferrer" key={item.id}>
                        <Card
                            shadow="sm"
                            padding="lg"
                            radius={5}
                            withBorder
                            style={{ width: 353 }}
                        >
                            <Flex justify="space-between" align="center" mb={10}>
                                <Text size="md" fw={700}>
                                    {item.name}
                                </Text>
                                {item.logo ? (
                                    <Image src={item.logo} width={38} height={38} alt="icon" />
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
                            <Text
                                size="sm"
                                color="dimmed"
                                title={item.description}
                                mb={12}
                            >
                                {item.description}
                            </Text>
                            <Button onClick={() => openToCreateMCP(item)} w={'100%'} h={32}>一键部署</Button>
                        </Card>
                    </a>
                );
            })}
        </Flex>
    }
    return (
        <Box pos="relative" pb={124} mt={12}>
            <AgenticAppAdd />
            <McpAdd />
            <Tabs variant="outline" defaultValue="agentic">
                <Tabs.List>
                    <Tabs.Tab value="agentic">Agentic 应用广场</Tabs.Tab>
                    <Tabs.Tab value="mcp">MCP 广场</Tabs.Tab>
                </Tabs.List>

                {/* Agentic 应用广场 */}
                <Tabs.Panel value="agentic" pt="xs">
                    {renderAgenticApps()}
                </Tabs.Panel>

                {/* MCP 广场 */}
                <Tabs.Panel value="mcp" pt="xs">
                    {renderMcps()}
                </Tabs.Panel>
            </Tabs>
        </Box>
    );
}