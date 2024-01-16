import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { Breadcrumbs, Anchor, Box, Text, Title, Paper, Flex } from '@mantine/core';


import FeatureDescription from '@/components/FeatureDescription';
import { useFoundationModelStore, getFoundationModel } from '@/store/foundationModel';

import CopyToClipboard from '@/components/CopyToClipboard';
import { FORM_WIDTH_1280 } from 'constants/index';


// import styles from './index.module.scss';

const FM_TEMPLATE_ACCESS_API_FUNCTION_MAP: any = {
    'agentcraft-fm-qwen-biz': 'apiServer',
    'fc-llm-api': 'llm-server',
}

const FM_APP_STATUS: any = {
    'published': {
        color: 'green',
        text: '已发布'
    },
    'deploying': {
        color: 'yellow',
        text: '部署中'
    }
}

interface DOMAIN_DATA {
    domainName: string,
    protocol: string
}
function getLLMServiceUrl(currentFoundationModel: any) {
    try {
        const output = currentFoundationModel.output;
        const deploy = output?.deploy || {};

        const allFunctions = Object.keys(deploy).filter((key: string) => FM_TEMPLATE_ACCESS_API_FUNCTION_MAP[currentFoundationModel.appConfig.template] === key);
        const apiServiceConfig = deploy[allFunctions[0]];
        if (apiServiceConfig) {
            if (apiServiceConfig.customDomains && apiServiceConfig.customDomains[0]) {
                return apiServiceConfig.customDomains[0].domainName;
            }
            const domainData: DOMAIN_DATA = deploy['domain'];
            return domainData.domainName;

        }
    } catch (e) {
        console.log(e);
    }
    return '';
}

function FoundationModelView({ fmId }: any) {
    const currentFoundationModel = useFoundationModelStore().currentFoundationModel;
    const setCurrentFoundationModel = useFoundationModelStore().setCurrentFoundationModel;

    useEffect(() => {
        (async () => {
            const result = await getFoundationModel(fmId);
            const _currentFoundationModel = result?.lastRelease;
            setCurrentFoundationModel(_currentFoundationModel);

        })()

    }, [fmId]);
    const servcieURL = getLLMServiceUrl(currentFoundationModel);
    const deployStatus = FM_APP_STATUS[currentFoundationModel?.status] || { color: 'grey', text: '初始化' }
    return <div>

        <div>
            <Title order={4} mb={8}>基础模型服务信息</Title>
            <Paper shadow="xs" p="md" withBorder mb={12}>
                <Title order={5} size="h5">应用信息</Title>
                <Box maw={FORM_WIDTH_1280} pl={4} pr={4} >
                    <div>
                        <Flex align={'center'}>应用访问状态：<Text color={deployStatus.color}>{deployStatus.text}</Text></Flex>
                    </div>
                </Box>
            </Paper>
            <Title order={4} mb={8}>访问接入</Title>
            <Paper shadow="xs" p="md" withBorder mb={12}>
                <Title order={5} size="h5">基础模型服务访问信息</Title>

                {servcieURL ?
                    <Box maw={FORM_WIDTH_1280} pl={4} pr={4} >

                        <div>
                            <Flex align={'center'}>API访问地址：<CopyToClipboard width={800} content={`http://${servcieURL}/v1/chat/completions`} value={`http://${servcieURL}/v1/chat/completions`} /></Flex>
                        </div>
                        <div>
                            <span>API访问文档：<Anchor href={`http://${servcieURL}/docs`} target="_blank">访问文档</Anchor></span>
                        </div>

                    </Box> : null}
            </Paper>
            <Title order={4} mb={8}>云资源信息</Title>
            <Paper shadow="xs" p="md" withBorder >

                <Title order={5} size="h5">函数计算应用信息</Title>
                <Box maw={FORM_WIDTH_1280} pl={4} pr={4} >
                    <div>
                        <span>应用名：{`${currentFoundationModel?.appName}`}</span>
                    </div>
                </Box>
            </Paper>
        </div>
    </div>
}

export function FoundationModelDetail() {

    const router = useRouter();
    const { query } = router;
    const fmId = query.fmId;
    const items = [
        { title: 'AgentCraft', href: '/' },
        { title: '基础模型', href: '/foundationModel' },
        { title: '模型详情', href: `/foundationModel/${fmId}/detail` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <>
            {/* <Breadcrumbs>{items}</Breadcrumbs> */}
            <FeatureDescription title={`${fmId}详情`} description="依托阿里云Serverless的丰富应用模版以及完整的工具链，AgentCraft可以创建丰富多样的基础模型服务" />
            <Box mt={12} >
                <FoundationModelView fmId={fmId} />
            </Box>

        </>

    );
}
