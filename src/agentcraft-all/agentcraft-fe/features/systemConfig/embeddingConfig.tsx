import React from "react";

import { nanoid } from 'nanoid';
import { modals } from '@mantine/modals';
import { Paper, Stepper, Anchor, Button, TextInput, Text, LoadingOverlay, Flex, Radio, Group } from '@mantine/core';
import CopyToClipboard from 'components/CopyToClipboard';
import { useFoundationModelStore, addFoundationModel, getFoundationModel, APP_STATUS } from 'store/foundationModel';
import { SYSTEM_AGENTCRAFT_PREFIX, NEW_EMBEDDING_TEMPLATE_NAME, SUPPORT_EMBEDDING_REGIONS } from 'constants/system-config';

import { useSystemConfigStore } from 'store/systemConfig';
import { getCorrectRegionAddress } from 'utils/cloudInfra';
// import styles from './index.module.scss';



function getEmbeddingCurlCode(embeddingUrl: string) {
    return `curl -X 'POST' \
    '${embeddingUrl}' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "input": "你好"
  }'
  `
}

function LoadingStepper() {
    const appStatus = useFoundationModelStore().appStatus;
    const appName = useFoundationModelStore().appName;
    return <div>
        <Flex align={'center'}><span>创建Embedding服务预计需要1~2分钟，请耐心等待。</span> <Anchor href={`https://fcnext.console.aliyun.com/applications/${appName}/env/default?tab=envDetail`} target="_blank">点击查看服务部署信息</Anchor></Flex>
        <Stepper active={appStatus} breakpoint="sm" mt={12}>
            <Stepper.Step label="初始化" description="" />
            <Stepper.Step label="创建中" description="" loading={appStatus === APP_STATUS.CREATING} />
            <Stepper.Step label="创建成功/失败" description="" />
        </Stepper>
    </div>

}


export default function EmbeddingConfig({ form }: any) {
    const setCreateLoading = useFoundationModelStore().setCreateLoading;
    const createLoading = useFoundationModelStore().createLoading;
    const setAppStatus = useFoundationModelStore().setAppStatus;
    const completeConfig = useSystemConfigStore().completeConfig;
    const embeddingConfig = useSystemConfigStore().embeddingConfig;
    const setEmbeddingConfing = useSystemConfigStore().setEmbeddingConfig;
    const modelType = useSystemConfigStore().modelType;
    const setModelType = useSystemConfigStore().setModelType;
    const setAppName = useFoundationModelStore().setAppName;
    function checkAppStatus(appName: string): Promise<any> {

        return new Promise((resolve, reject) => {
            setAppStatus(APP_STATUS.CREATING);
            const timmer = setInterval(async () => {
                try {
                    const result = await getFoundationModel(appName);
                    const release = result.lastRelease;
                    if (release.status === 'published') {
                        clearInterval(timmer);
                        setAppStatus(APP_STATUS.SUCCESS);
                        resolve(release);
                    }
                } catch (e) {
                    // 忽略超时响应的问题
                    // reject(e);
                }

            }, 4000);

        })


    }
    async function createEmbeddingService() {

        const addContent = `该操作会使用《阿里云函数计算服务》进行Embedding服务的创建，确认创建吗？`;
        modals.openConfirmModal({
            title: '创建函数计算Embedding服务',
            centered: true,
            children: (
                <div>
                    <Text size="sm">
                        {addContent}
                    </Text>
                    <Flex align={'center'}><span>注意该服务需要依赖NAS服务以存储模型</span> <Anchor href={`https://nasnext.console.aliyun.com/introduction`} target="_blank">NAS服务地址</Anchor></Flex>
                </div>

            ),
            labels: { confirm: '确定', cancel: '取消' },
            onCancel: () => console.log('Cancel'),
            onConfirm: async () => {
                const templateName = NEW_EMBEDDING_TEMPLATE_NAME;
                const region = getCorrectRegionAddress(SUPPORT_EMBEDDING_REGIONS, completeConfig.regionId); // embedding模型支持有限的region，如果主服务的部署region超出该范围，则默认使用cn-hangzhou
                const parameters: any = {
                    region,
                    // serviceName: AGENTCRAFT_SERVICE,
                    // functionName: `${AGENTCRAFT_FUNCTION}_${nanoid()}`,
                    description: 'Embedding算法服务【作为AgentCraft服务的核心依赖，请谨慎删除】'
                }
                try {
                    setCreateLoading(true);
                    setAppStatus(APP_STATUS.INIT);
                    parameters.name = `${SYSTEM_AGENTCRAFT_PREFIX}_${nanoid()}`;
                    const data = await addFoundationModel(templateName, parameters);
                    const name = data.name;
                    setAppName(name);
                    const result = await checkAppStatus(name);
                    const embeddingService: any = result?.output?.deploy['embedding-service'];
                    const embeddingIntranetUrl = embeddingService?.url?.system_intranet_url;
                    const fullEmbeddingIntranetUrl = `${embeddingIntranetUrl}/embedding`;
                    // const embeddingServiceDomain: any = result?.output?.deploy['embedding-service-domain'];
                    const embeddingInternetUrl = embeddingService?.url?.system_url;
                    const fullEmbeddingInternetUrl = `${embeddingInternetUrl}/embedding`;
                    form.setValues({
                        EMBEDDING_URL: fullEmbeddingIntranetUrl
                    });
                    setEmbeddingConfing({
                        EMBEDDING_DIM: form.values['EMBEDDING_DIM'],
                        EMBEDDING_URL: fullEmbeddingIntranetUrl,
                        EMBEDDING_INTRANET_URL: fullEmbeddingIntranetUrl, // 内网
                        EMBEDDING_INTERNET_URL: fullEmbeddingInternetUrl // 公网
                    });
                } catch (e) {
                    console.log(e);
                }
                setCreateLoading(false);
            },
        });
    }

    const embedding_internet_url = embeddingConfig.EMBEDDING_INTERNET_URL;
    return (
        <Paper shadow="xs" p="xl">
            <LoadingOverlay loader={<LoadingStepper />} visible={createLoading} overlayOpacity={0.8} overlayBlur={2} />
            <TextInput withAsterisk label="向量维度" description="向量的维度设置，跟使用embedding算法相关，并且在数据库持久化的时候不能修改" defaultValue={'1024'} placeholder="" {...form.getInputProps('EMBEDDING_DIM')} />
            <Radio.Group
                name="modelType"
                label="选择模型类型"
                value={modelType}
                onChange={setModelType}
                mt="md"
            >
                <Group >
                    <Radio value="bailian" label="阿里云百炼模型" />
                    <Radio value="fc" label="自定义模型" />
                </Group>
            </Radio.Group>
            {modelType === 'bailian' && (
                <Flex align={'center'} mt="md">
                    <div style={{ fontSize: '12px', fontWeight: 500 }}><span style={{ color: '#212529',marginRight: 12 }}>无需配置，系统自动对接</span><a href="https://bailian.console.aliyun.com/?tab=api#/doc/?type=model&url=https%3A%2F%2Fhelp.aliyun.com%2Fdocument_detail%2F2712515.html" target="_blank">模型api文档</a></div>
                </Flex>
            )}
            {modelType === 'fc' && (
                <Flex align={'center'} mt="md">
                    <TextInput label="embedding服务" description={<div><span>embedding服务访问地址</span><a href="https://fcnext.console.aliyun.com/applications/ai/create?template=55" target="_blank">无法创建？点击此前往单独创建</a></div>} style={{ width: '85%' }} {...form.getInputProps('EMBEDDING_URL')} defaultValue={completeConfig.EMBEDDING_URL || ''} />
                    <Button variant="subtle" mt={42} ml={4} onClick={createEmbeddingService}>快速获取embedding服务</Button>
                </Flex>
            )}
            {embedding_internet_url ? <Flex align={'flex-start'} mt="md">
                <CopyToClipboard value={getEmbeddingCurlCode(embedding_internet_url)} content="测试embedding服务" />
            </Flex> : null}
        </Paper>
    );
}
