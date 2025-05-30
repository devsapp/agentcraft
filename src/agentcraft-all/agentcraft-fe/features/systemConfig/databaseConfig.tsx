import React from "react";
import { useDisclosure } from '@mantine/hooks';
import { PasswordInput, Paper, Drawer, Button, TextInput, Text, Flex } from '@mantine/core';
import MarkdownContent from "components/MDXContainer";
import { ALIBABACLOUD_POSTGRESQL_TUTORIAL, D1, D2, D3, D4, AGENTCRAFT_PERFIX } from 'constants/system-config';
import { useSystemConfigStore } from 'store/systemConfig';

function dynamicAddition(content: string, { vpcId = '', vpcName = '' }: { vpcId: string, vpcName: string }) {
    return content.replace(/{{vpcId}}/g, vpcId).replace(/{{vpcName}}/g, vpcName);
}

export default function DataBaseConfig({ form }: any) {
    const [opened, { open, close }] = useDisclosure(false);
    const completeConfig = useSystemConfigStore().completeConfig;
    const vpcInfo = completeConfig?.vpcInfo || {};
    function setShareDbInfo() {
        const d = D2.replaceAll(AGENTCRAFT_PERFIX, '');
        const c = D4.replaceAll(AGENTCRAFT_PERFIX, '');
        const dbInfo = {
            POSTGRES_HOST: D1.replaceAll(AGENTCRAFT_PERFIX, ''),
            POSTGRES_DATABASE: c,
            POSTGRES_USER: d,
            POSTGRES_PASSWORD: D3.replaceAll(AGENTCRAFT_PERFIX, ''),
        }
        form.setValues(dbInfo);
    }
    return (
        <Paper shadow="xs" p="xl">
            <Drawer opened={opened} onClose={close} title="获取阿里云Postgresql Serverless版教程" position="right" size="50%">
                <div style={{ width: window.innerWidth / 2 - 40 }}>
                    {/* <MarkdownContent textContent={dynamicAddition(ALIBABACLOUD_POSTGRESQL_TUTORIAL, vpcInfo)}  /> */}
                    <MarkdownContent 
                        content={dynamicAddition(ALIBABACLOUD_POSTGRESQL_TUTORIAL, vpcInfo)} 
                    />
                </div>
            </Drawer>
            <Flex align="center" >
                <Text size={12}>
                    还没有数据库？ 您可以在阿里云上获取
                </Text>
                <Button onClick={open} variant="subtle">
                    <Text size={12}>
                        专属数据库
                    </Text>
                </Button>
                <Text size={12}>
                    或者先使用
                </Text>
                <Button onClick={setShareDbInfo} variant="subtle" >
                    <Text size={12}>
                        共享体验数据库
                    </Text>
                </Button>
            </Flex>
            <TextInput withAsterisk label="数据库地址" description="请输入数据库访问地址" placeholder="示例: mxlpo.pg.rds.aliyuncs.com"  {...form.getInputProps('POSTGRES_HOST')} />
            <TextInput withAsterisk label="数据库名称" description="请输入数据库名称" placeholder="" {...form.getInputProps('POSTGRES_DATABASE')} />
            <TextInput withAsterisk label="数据库访问用户名" description="请输入数据库访问用户名" placeholder="" {...form.getInputProps('POSTGRES_USER')} />
            <PasswordInput withAsterisk label="数据库访问密码" description="请输入数据库访问密码" placeholder="" {...form.getInputProps('POSTGRES_PASSWORD')} />
        </Paper>
    );
}
