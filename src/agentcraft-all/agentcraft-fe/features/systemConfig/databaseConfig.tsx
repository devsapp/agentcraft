import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useDisclosure } from '@mantine/hooks';
import { PasswordInput, Paper, Drawer, Group, Anchor, Button, Box, Table, TextInput, Text, Highlight, LoadingOverlay, Select, Modal, Textarea, Flex, Space, NumberInput } from '@mantine/core';
import MarkdownContent from "@/components/MarkdownContent";
import { ALIBABACLOUD_POSTGRESQL_TUTORIAL } from '@/constants/postgresql-tutorial';
import { useSystemConfigStore } from '@/store/systemConfig';
// import styles from './index.module.scss';


function dynamicAddition(content: string, { vpcId, vpcName }: { vpcId: string, vpcName: string }) {
    return content.replace(/{{vpcId}}/g, vpcId).replace(/{{vpcName}}/g, vpcName);
}

export default function DataBaseConfig({ form }: any) {
    const [opened, { open, close }] = useDisclosure(false);
    const completeConfig = useSystemConfigStore().completeConfig;
    const vpcInfo = completeConfig?.vpcInfo || {};
    return (
        <Paper shadow="xs" p="xl">
            <Drawer opened={opened} onClose={close} title="获取阿里云Postgresql Serverless版教程" position="right" size="50%">
                <div style={{ width: window.innerWidth / 2 - 40 }}>
                    <MarkdownContent textContent={dynamicAddition(ALIBABACLOUD_POSTGRESQL_TUTORIAL, vpcInfo)} className="markdown-content" />
                </div>
            </Drawer>
            <div>
                <Text weight={700}>还没有数据库？ <Button onClick={open} variant="subtle">查看如何免费获取</Button></Text>
            </div>
            <TextInput withAsterisk label="数据库地址" description="请输入数据库访问地址" placeholder="示例: mxlpo.pg.rds.aliyuncs.com"  {...form.getInputProps('POSTGRES_HOST')} />
            <TextInput withAsterisk label="数据库名称" description="请输入数据库名称" placeholder="" {...form.getInputProps('POSTGRES_DATABASE')} />
            <TextInput withAsterisk label="数据库访问用户名" description="请输入数据库访问用户名" placeholder="" {...form.getInputProps('POSTGRES_USER')} />
            <PasswordInput withAsterisk label="数据库访问密码" description="请输入数据库访问密码" placeholder="" {...form.getInputProps('POSTGRES_PASSWORD')} />
        </Paper>
    );
}
