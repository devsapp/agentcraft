import React, { use, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { modals } from '@mantine/modals';
import { useForm, UseFormReturnType } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Notification, Paper, Stepper, Group, Anchor, Button, Box, Table, TextInput, Text, Highlight, LoadingOverlay, Select, Modal, Textarea, Flex, Space, NumberInput } from '@mantine/core';
import EmbeddingConfig from 'features/systemConfig/embeddingConfig';
import DataBaseConfig from 'features/systemConfig/databaseConfig';
import CompleteConfirm from 'features/systemConfig/completeConfirm';
import { useSystemConfigStore, updateSystemConfig } from 'store/systemConfig';
// import styles from './index.module.scss';


export interface EmbeddingServicePayload {
    EMBEDDING_DIM: number,
    EMBEDDING_URL: string
}

export interface DataBaseConfigPayload {
    POSTGRES_HOST: string,
    POSTGRES_DATABASE: string,
    POSTGRES_USER: string,
    POSTGRES_PASSWORD: string
}

export const enum SystemConfigStep {
    DATABASE = 0,
    EMBEDDING_SERVICE = 1,
    COMPLETE = 2
}

export function SystemConfig() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const setHiddenConfigView = useSystemConfigStore().setHiddenConfigView;
    const embeddingConfig = useSystemConfigStore().embeddingConfig;
    const databaseConfig = useSystemConfigStore().databaseConfig;
    const setEmbeddingConfing = useSystemConfigStore().setEmbeddingConfig;
    const setDatabaseConfig = useSystemConfigStore().setDatabaseConfig;
    const activeStep = useSystemConfigStore().activeStep;
    const setActiveStep = useSystemConfigStore().setActiveStep;


    const embeddingServiceForm: UseFormReturnType<EmbeddingServicePayload> = useForm({
        initialValues: embeddingConfig,
        validate: {
            EMBEDDING_DIM: (value) => (!value ? '向量维度必填' : null)
        },
    });

    const databaseConfigForm: UseFormReturnType<DataBaseConfigPayload> = useForm({
        initialValues: databaseConfig,
        validate: {
            POSTGRES_HOST: (value) => (!value ? '数据库地址必填' : null),
            POSTGRES_DATABASE: (value) => (!value ? '数据库名称必填' : null),
            POSTGRES_USER: (value) => (!value ? '数据库用户名必填' : null),
            POSTGRES_PASSWORD: (value) => (!value ? '数据库密码必填' : null)
        },
    });

    const nextStep = () => {
        if (activeStep === SystemConfigStep.EMBEDDING_SERVICE) {
            embeddingServiceForm.validate();
            if (!embeddingServiceForm.isValid()) {
                return;
            } else {
                setEmbeddingConfing(embeddingServiceForm.values);
            }
        }
        if (activeStep === SystemConfigStep.DATABASE) {
            databaseConfigForm.validate();
            if (!databaseConfigForm.isValid()) {
                return;
            } else {
                setDatabaseConfig(databaseConfigForm.values);
            }
        }
        const currentStep = activeStep < 3 ? activeStep + 1 : activeStep
        setActiveStep(currentStep);
    }
    const prevStep = () => {
        const currentStep = activeStep > 0 ? activeStep - 1 : activeStep
        setActiveStep(currentStep);
    };


    function handleSubmit() {
        const addContent = `确定进行服务配置更新吗？`;
        modals.openConfirmModal({
            title: '更新系统配置',
            centered: true,
            children: (
                <Text size="sm">
                    {addContent}
                </Text>
            ),
            labels: { confirm: '确定', cancel: '取消' },
            onCancel: () => console.log('Cancel'),
            onConfirm: async () => {
                setLoading(true);
                try {
                    const result: any = await updateSystemConfig({ ...embeddingConfig, ...databaseConfig });
                    if (result.code === 200) {
                        setHiddenConfigView(true);
                        notifications.show({
                            title: '恭喜配置成功',
                            message: '您已完成配置，请前往注册',
                            color: 'green',
                        });
                        
                        router.push('/register');
                    } else {
                        notifications.show({
                            title: '系统异常',
                            message: result.error,
                            color: 'red',
                        });
                    }
                } catch (e: any) {
                    notifications.show({
                        title: '系统异常',
                        message: e.message,
                        color: 'red',
                    });
                }
                setLoading(false);
            },
        });

    }

    return (
        <Paper shadow="xs" p="xl" style={{ width: '60%', margin: '0 auto' }}>
            <LoadingOverlay visible={loading} />
            <Notification title="系统配置" mb={148} withCloseButton={false} radius="xs" >
                在进行系统操作前，您需要准备好Postgresql数据库（必填），embedding服务(选填)，AgentCraft提供了引导式的配置服务，帮助您快速完成系统配置
            </Notification>
            <div>
                <Stepper active={activeStep} onStepClick={setActiveStep}>
                    <Stepper.Step label="配置数据库" description="进行关系型数据库和向量数据库配置">
                        <DataBaseConfig form={databaseConfigForm} />
                    </Stepper.Step>
                    <Stepper.Step label="配置Embedding服务" description="配置向量服务">
                        <EmbeddingConfig form={embeddingServiceForm} />
                    </Stepper.Step>
                    <Stepper.Completed >
                        <CompleteConfirm embeddingServiceForm={embeddingServiceForm} databaseForm={databaseConfigForm} />
                    </Stepper.Completed>
                </Stepper>
                <Group mt="xl" pl={24}>
                    {activeStep > SystemConfigStep.DATABASE && <Button variant="default" onClick={prevStep}>上一步</Button>}
                    {activeStep === SystemConfigStep.COMPLETE ? <Button onClick={handleSubmit} >完成</Button> : <Button onClick={nextStep}>下一步</Button>}
                </Group>
            </div>
        </Paper>
    );
}
