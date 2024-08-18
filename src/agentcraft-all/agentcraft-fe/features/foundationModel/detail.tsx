import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { Anchor, Box, Text, Title, Paper, Flex, ActionIcon } from '@mantine/core';
import { IconArrowBackUp } from '@tabler/icons-react';
import { useFoundationModelStore, getFoundationModel } from 'store/foundationModel';
import { FM_APP_STATUS, FM_TEMPLATE_ACCESS_API_FUNCTION_MAP } from 'constants/foundation-model';
import CopyToClipboard from 'components/CopyToClipboard';
// import styles from './index.module.scss';



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
            // if (apiServiceConfig.customDomains && apiServiceConfig.customDomains[0]) {
            //     return apiServiceConfig.customDomains[0].domainName;
            // }
            // const domainData: DOMAIN_DATA = deploy['domain'];
            // return domainData.domainName;
            return apiServiceConfig.url.system_url;

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
            <Title order={5} mb={8}>基础模型服务信息</Title>
            <Paper shadow="xs" p="md" withBorder mb={12}>
                <Title order={6} size="h6">应用信息</Title>
                <Box pl={4} pr={4} >
                    <div>
                        <Flex align={'center'}>应用访问状态：<Text size="h6" color={deployStatus.color}>{deployStatus.text}</Text></Flex>
                    </div>
                </Box>
            </Paper>
            <Title order={5} mb={8}>访问接入</Title>
            <Paper shadow="xs" p="md" withBorder mb={12}>
                <Title order={6} size="h6">基础模型服务访问信息</Title>
                {servcieURL ?
                    <Box pl={4} pr={4} >
                        <div>
                            <Flex align={'center'}>API访问地址：<CopyToClipboard content={`${servcieURL}/v1/chat/completions`} value={`${servcieURL}/v1/chat/completions`} /></Flex>
                        </div>
                    </Box> : null}
            </Paper>
            <Title order={5} mb={8}>云资源信息</Title>
            <Paper shadow="xs" p="md" withBorder >

                <Title order={6} size="h6">函数计算应用信息</Title>
                <Box pl={4} pr={4} >
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
            <Flex justify={'flex-start'} align={'center'} mt={12} >
                <Flex align={'center'} h={'100%'} >
                    <ActionIcon onClick={() => {
                        router.push('/foundationModel')
                    }}>
                        <IconArrowBackUp />
                    </ActionIcon>
                    <Title order={4}>基础模型详细</Title>
                </Flex>
            </Flex>
            {/* <FeatureDescription title={`${fmId}详情`} description="依托阿里云Serverless的丰富应用模版以及完整的工具链，AgentCraft可以创建丰富多样的基础模型服务" /> */}
            <Box mt={12} >
                <FoundationModelView fmId={fmId} />
            </Box>
        </>
    );
}
