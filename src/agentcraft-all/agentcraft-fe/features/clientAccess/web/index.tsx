import React from "react";
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useForm, UseFormReturnType } from '@mantine/form';
import { Breadcrumbs, Anchor, Stepper, Group, Button, LoadingOverlay, Flex, Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useClientAccessStore, createChatBotBridgeService } from "store/clientAccess";
import { useSystemConfigStore } from 'store/systemConfig';
import { checkAppStatus } from 'store/infra';
import { getKnowledgeBase, getAccessUrl } from 'store/knowledgeBase';
import WebIndependentStation from 'features/clientAccess/web/webIndependentStation';
import FeatureDescription from 'components/FeatureDescription';

import { WEB_NAME_VALUE, WEB_IS_MAP, WEB_IS_APPSERVER_MAP,  DEFAULT_CLIENT_ACCESS_REGION, AGENTCRAFT_CLIENT_PREFIX,} from 'constants/client-access';

export function Web() {
    const router = useRouter()
    const { activeStep, setActiveStep, robotStepStatus, setRobotStepStatus } = useClientAccessStore();
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
            webTemplate: WEB_NAME_VALUE.CHATGPT_NEXTJS_WEB,
            appId: '',
            agentId: '',
            description: '桥接AgentCraft智能体到钉钉/微信的代理服务'

        },
        validate: {
            webTemplate: (value) => (!value ? '请选择一个独立站模版' : null),
            appId: (value) => (!value ? '请选择应用' : null),
            agentId: (value) => (!value ? '请选择一个智能体' : null),
        },
    });


    const { webTemplate } = proxyServiceForm.values;
    const createWebIndependentStation = async () => {
        proxyServiceForm.validate();
        if (!proxyServiceForm.isValid()) {
            return;
        }
        try {
            robotStepStatus.robot_proxy_service_create_loading = true;
            setRobotStepStatus(robotStepStatus);
            const { agentId, description } = proxyServiceForm.values;
            const agentDetail = await getKnowledgeBase(agentId);
            const token = agentDetail.token;
            const agentAccess = await getAccessUrl();
            const agentAccessInfo = agentAccess.data || { openApiUrl: '', innerApiUrl: '' };
            const webAppName: any = await createChatBotBridgeService(WEB_IS_MAP[webTemplate], {
                region: completeConfig.regionId || DEFAULT_CLIENT_ACCESS_REGION,
                TOKEN: token,
                BASE_LLM_SERVER: agentAccessInfo.openApiUrl,
                name: `${AGENTCRAFT_CLIENT_PREFIX}_${nanoid()}`,
                description,
            });
            if (webAppName) {
                const appInfo = await checkAppStatus(webAppName);
                const domainData: any = appInfo?.output?.deploy['domain'];
                const agentFunctionName: any = appInfo?.output?.deploy[WEB_IS_APPSERVER_MAP[webTemplate]]?.functionName;

                notifications.show({
                    title: 'Web独立站服务创建成功',
                    message: '您已完成Web独立站服务创建',
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
        router.push('/clientAccess');

    }
    const nextStep = async () => {
        await createWebIndependentStation();
    };



    return (
        <>
            {/* <Breadcrumbs>{items}</Breadcrumbs> */}
            <FeatureDescription title="Web独立站" description="构建独立的Web站点提供智能体服务" />
            <Stepper active={activeStep} onStepClick={setActiveStep} mt={12}>
                <Stepper.Step label="独立站点配置" description="" loading={robotStepStatus.robot_proxy_service_create_loading}>
                    <div style={{ position: 'relative' }}>
                        <LoadingOverlay
                            loader={<Flex align={'center'} direction="column"><Flex align={'center'} >部署Web独立站大约需要1分钟，请耐心等待<Loader variant="bars" color={'pink'} ml={12} /></Flex></Flex>}
                            overlayOpacity={0.3}
                            overlayColor="#c5c5c5"
                            visible={robotStepStatus.robot_proxy_service_create_loading}
                        />
                        <div style={{ padding: 20 }}>
                            <WebIndependentStation form={proxyServiceForm} />
                        </div>
                    </div>
                </Stepper.Step>

            </Stepper>
            <Group mt="xl">
                <Button onClick={nextStep} >确定</Button>
            </Group>
        </>
    );
}
