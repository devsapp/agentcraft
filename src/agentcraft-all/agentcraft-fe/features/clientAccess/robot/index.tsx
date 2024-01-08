import React from "react";
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useForm, UseFormReturnType } from '@mantine/form';
import { Breadcrumbs, Anchor, Stepper, Group, Button, LoadingOverlay, Flex, Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useClientAccessStore, createChatBotBridgeService, createEventbus } from "store/clientAccess";
import { useSystemConfigStore } from 'store/systemConfig';
import { checkAppStatus } from 'store/infra';
import { getKnowledgeBase, getAccessUrl } from 'store/knowledgeBase';
import { getAssistant } from 'store/assistant';
import SetProxyService from 'features/clientAccess/robot/SetProxyService';
import ServiceConfigPreview from 'features/clientAccess/robot/ServiceConfigPreview';
import RobotWebhookConfig from 'features/clientAccess/robot/RobotWebhookConfig';
import FeatureDescription from 'components/FeatureDescription';
import { generateDingTalkToken } from 'utils/token';

import { ROBOT_NAME_VALUE, ROBOT_CONFIG_STEP, DEFAULT_CLIENT_ACCESS_REGION, AGENTCRAFT_CLIENT_PREFIX, CHATBOT_APPNAME_MAP, CHATBOT_APPSERVER_MAP,AGENT_TYPE } from 'constants/client-access';

export function Robot() {
    const router = useRouter()
    const { activeStep, setActiveStep, robotStepStatus, setRobotStepStatus, robotConfig, setRobotConfig } = useClientAccessStore();
    const completeConfig = useSystemConfigStore().completeConfig;

    const items = [
        { title: 'AgentCraft', href: '/' },
        { title: '客户端接入', href: '/clientAccess' }
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const proxyServiceForm: UseFormReturnType<any> = useForm({
        initialValues: {
            chatBotType: ROBOT_NAME_VALUE.DING_TALK,
            appId: '',
            agentId: '',
            agentType: AGENT_TYPE.KNOWLEDGEBASE,
            description: '桥接AgentCraft智能体到钉钉/微信的代理服务'
        },
        validate: {
            chatBotType: (value) => (!value ? '请选择一个机器人类型' : null),
            appId: (value) => (!value ? '请选择应用' : null),
            agentId: (value) => (!value ? '请选择一个智能体' : null),
        },
    });

    const robotWebhookForm: UseFormReturnType<any> = useForm({
        initialValues: {
            webhook: '',
            token: ''
        },
        validate: {
            webhook: (value) => (!value ? '请输入钉钉机器人webhook' : null),
            token: (value) => (!value ? '请输入认证令牌' : null)
        },
    });

    const { chatBotType } = proxyServiceForm.values;
    const createProxyService = async () => {
        proxyServiceForm.validate();
        if (!proxyServiceForm.isValid()) {
            return;
        }
        try {
            robotStepStatus.robot_proxy_service_create_loading = true;
            setRobotStepStatus(robotStepStatus);
            const { agentId, description ,agentType } = proxyServiceForm.values;
            const agentDetail =  agentType === AGENT_TYPE.KNOWLEDGEBASE? await getKnowledgeBase(agentId) : await getAssistant(agentId);
            const token = agentDetail.token;
            const agentAccess = await getAccessUrl();
            const agentAccessInfo = agentAccess.data || { openApiUrl: '', innerApiUrl: '' };
            const chatBotAppName: any = await createChatBotBridgeService(CHATBOT_APPNAME_MAP[chatBotType], {
                region: completeConfig.regionId || DEFAULT_CLIENT_ACCESS_REGION,
                TOKEN: token,
                AGENT_TYPE: agentType,
                BASE_LLM_SERVER: agentAccessInfo.openApiUrl,
                name: `${AGENTCRAFT_CLIENT_PREFIX}_${nanoid()}`,
                description,
            });
            if (chatBotAppName) {
                const appInfo = await checkAppStatus(chatBotAppName);
                const domainData: any = appInfo?.output?.deploy['domain'];
                const agentFunctionName: any = appInfo?.output?.deploy[CHATBOT_APPSERVER_MAP[chatBotType]]?.functionName;
                if (chatBotType === ROBOT_NAME_VALUE.DING_TALK) {
                    const appUrl = domainData.domainName;
                    const dingtalkToken = generateDingTalkToken();
                    robotConfig.robotProxyServiceConfig = {
                        serviceUrl: `http://${appUrl}/chat`,
                        token: dingtalkToken,
                        agentFunctionName
                    };
                    setRobotConfig(robotConfig);
                }
                notifications.show({
                    title: '机器人服务创建成功',
                    message: '您已完成机器人服务创建',
                    color: 'green',
                });
            }
        } catch (e: any) {
            notifications.show({
                title: '异常',
                message: e.message,
                color: 'red',
            });
        }
        robotStepStatus.robot_proxy_service_create_loading = false;
        setRobotStepStatus(robotStepStatus);

        if (chatBotType === ROBOT_NAME_VALUE.DING_TALK) {
            nextStepAction();
        } else {
            router.push('/clientAccess');
        }

    }

    const createWebhook = async () => {
        robotWebhookForm.validate();
        if (!robotWebhookForm.isValid()) {
            return;
        }
        try {
            robotStepStatus.robot_webhook_create_loading = true;
            setRobotStepStatus(robotStepStatus);
            const { webhook, token } = robotWebhookForm.values;
            const robotProxyServiceConfig = robotConfig.robotProxyServiceConfig;
            await createEventbus({
                region: completeConfig.regionId || DEFAULT_CLIENT_ACCESS_REGION,
                webhook,
                token,
                functionName: robotProxyServiceConfig.agentFunctionName
            })
            robotConfig.robotWebhookConfig = {
                webhook,
                token,
            };
            setRobotConfig(robotConfig);
            notifications.show({
                title: '机器人Webhook创建成功',
                message: '您已完成机器人Webhook创建',
                color: 'green',
            });
            router.push('/clientAccess')
        } catch (e: any) {
            notifications.show({
                title: '异常',
                message: e.message,
                color: 'red',
            });
        }
        robotStepStatus.robot_webhook_create_loading = false;
        setRobotStepStatus(robotStepStatus);
        nextStepAction();
    }
    const nextStepAction = () => {
        const currentStep = activeStep < 2 ? activeStep + 1 : activeStep;
        setActiveStep(currentStep);
    }

    const nextStep = async () => {
        if (activeStep === ROBOT_CONFIG_STEP.AGENT_SERVICE) {
            await createProxyService();
        }
        if (activeStep === ROBOT_CONFIG_STEP.ROBOT_WEBHOOK) {
            await createWebhook();
        }

    };
    const prevStep = () => {
        const currentStep = activeStep > 0 ? activeStep - 1 : activeStep;
        setActiveStep(currentStep);
    };



    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
            <FeatureDescription title="机器人接入" description="将智能体服务接入机器人" />
            <Stepper active={activeStep} onStepClick={setActiveStep}>
                <Stepper.Step label="配置机器人服务" description="" loading={robotStepStatus.robot_proxy_service_create_loading}>
                    <div style={{ position: 'relative' }}>
                        <LoadingOverlay
                            loader={<Flex align={'center'} direction="column"><Flex align={'center'} >部署机器人服务大约需要1分钟，请耐心等待<Loader variant="bars" color={'pink'} ml={12} /></Flex></Flex>}
                            overlayOpacity={0.3}
                            overlayColor="#c5c5c5"
                            visible={robotStepStatus.robot_proxy_service_create_loading}
                        />
                        <div style={{ padding: 20 }}>
                            <SetProxyService form={proxyServiceForm} />
                        </div>
                    </div>
                </Stepper.Step>
                {chatBotType === ROBOT_NAME_VALUE.DING_TALK && <Stepper.Step label="机器人信息展示" description="" >
                    <ServiceConfigPreview />
                </Stepper.Step>}
                {chatBotType === ROBOT_NAME_VALUE.DING_TALK && <Stepper.Step label="配置机器人Webhook" description="" loading={robotStepStatus.robot_webhook_create_loading}>
                    <div style={{ position: 'relative' }}>
                        <LoadingOverlay
                            overlayOpacity={0.3}
                            overlayColor="#c5c5c5"
                            visible={robotStepStatus.robot_webhook_create_loading}
                        />
                        <div style={{ padding: 20 }}>
                            <RobotWebhookConfig form={robotWebhookForm} />
                        </div>
                    </div>
                </Stepper.Step>}
            </Stepper>
            <Group mt="xl">
                {chatBotType === ROBOT_NAME_VALUE.WECHAT ? <Button onClick={nextStep} >确定</Button> :
                    <>
                        {activeStep > ROBOT_CONFIG_STEP.AGENT_SERVICE ? <Button variant="default" onClick={prevStep}>上一步</Button> : null}
                        {activeStep === ROBOT_CONFIG_STEP.AGENT_SERVICE ? <Button onClick={nextStep} >下一步</Button> : null}
                        {activeStep === ROBOT_CONFIG_STEP.SERVICE_CONFIG_PREVIEW ? <Button onClick={nextStepAction} >下一步</Button> : null}
                        {activeStep === ROBOT_CONFIG_STEP.ROBOT_WEBHOOK ? <Button onClick={nextStep} >确定</Button> : null}
                    </>}

            </Group>
        </>
    );
}
