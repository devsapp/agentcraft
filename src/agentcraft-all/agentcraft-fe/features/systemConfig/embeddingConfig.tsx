import React from "react";

import { nanoid } from 'nanoid';
import { modals } from '@mantine/modals';
import { Paper, Stepper, Anchor, Button, TextInput, Text, LoadingOverlay, Flex } from '@mantine/core';
import { useFoundationModelStore, addFoundationModel, getFoundationModel, APP_STATUS } from 'store/foundationModel';
import { SYSTEM_AGENTCRAFT_PREFIX, AGENTCRAFT_SERVICE, AGENTCRAFT_FUNCTION, NEW_EMBEDDING_TEMPLATE_NAME } from 'constants/system-config';
import { useSystemConfigStore } from '@/store/systemConfig';
// import styles from './index.module.scss';




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
                const parameters: any = {
                    region: completeConfig.regionId || 'cn-hangzhou',
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
                    const embeddingServiceDomain: any = result?.output?.deploy['embedding-service-domain'];
                    const embeddingInternetUrl = embeddingServiceDomain?.domainName;
                    const fullEmbeddingInternetUrl = `http://${embeddingInternetUrl}`;
                    form.setValues({
                        EMBEDDING_URL: fullEmbeddingIntranetUrl
                    });
                    setEmbeddingConfing({
                        EMBEDDING_DIM: form.values['EMBEDDING_DIM'],
                        EMBEDDING_URL: fullEmbeddingIntranetUrl,
                        EMBEDDING_INTRANET_URL: fullEmbeddingIntranetUrl, // 内网
                        EMBEDDING_INTERNET_URL: fullEmbeddingInternetUrl
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
            <Flex align={'center'}>
                <TextInput label="embedding服务访问地址" description="通过系统创建的embedding服务地址为安全的内部网络地址，不可以直接访问" style={{ width: '85%' }} {...form.getInputProps('EMBEDDING_URL')} defaultValue={completeConfig.EMBEDDING_URL || ''} /> 
                <Button variant="subtle" mt={42} ml={4} onClick={createEmbeddingService}>快速获取embedding服务</Button>
            </Flex>
            {embedding_internet_url ? <Flex align={'flex-start'}>
                <Anchor href={embedding_internet_url} target="_blank">测试embedding服务</Anchor>
            </Flex> : null}
        </Paper>
    );
}
