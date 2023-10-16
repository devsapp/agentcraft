import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { Breadcrumbs, Anchor, Flex, Tabs, Box, Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconPhoto, IconMessageCircle } from '@tabler/icons-react';
import FeatureDescription from '@/components/FeatureDescription';
import { getDataSourceList, useGlobalStore, addDataSource, deleteDataSource } from '@/store/datasource';
import { DataSource } from '@/types/datasource';
import { DataSetType } from "@/types/dataset";

import { DocumentRequestPayload, QuestionRequestPayload } from "@/types/datasource";
import { formatDateTime } from '@/util/index';
import { FORM_WIDTH } from '@/constant/index';
// import styles from './index.module.scss';

function FoundationModelTab() {
    return <Tabs variant="outline" defaultValue="text2text">
        <Tabs.List>
            <Tabs.Tab value="text2text" icon={<IconMessageCircle size="0.8rem" />}>文本生成</Tabs.Tab>
            <Tabs.Tab value="text2img" icon={<IconPhoto size="0.8rem" />}>图像生成</Tabs.Tab>

        </Tabs.List>

        <Tabs.Panel value="text2text" pt="xs">
            <Flex
                mih={50}
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
            >
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 320 }} mr={12}>
                    <Card.Section>
                        <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={160}
                            alt="Norway"
                        />
                    </Card.Section>

                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>通义千问商业版</Text>
                        <Badge color="pink" variant="light">
                            阿里云
                        </Badge>
                    </Group>

                    <Text size="sm" color="dimmed">
                        商业版本的统一千问，支持8K上下文，性能强劲，推理能力强
                    </Text>

                    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                        创建
                    </Button>
                </Card>
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 320 }} mr={12}>
                    <Card.Section>
                        <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={160}
                            alt="Norway"
                        />
                    </Card.Section>

                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>通义千问开源版(7b)</Text>
                        <Badge color="green" variant="light">
                            魔搭社区
                        </Badge>
                    </Group>

                    <Text size="sm" color="dimmed">
                        开源版本通义千问，支持灵活定制， 性能强劲，推理能力强
                    </Text>

                    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                        创建
                    </Button>
                </Card>
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 320 }} mr={12}>
                    <Card.Section>
                        <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={160}
                            alt="Norway"
                        />
                    </Card.Section>

                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>Chatglm2-6b</Text>
                        <Badge color="green" variant="light">
                            huggingface社区
                        </Badge>
                    </Group>

                    <Text size="sm" color="dimmed">
                        流行开源大语言模型，文本生成能力强，性能强劲
                    </Text>

                    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                        创建
                    </Button>
                </Card>
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 320 }} mr={12}>
                    <Card.Section>
                        <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={160}
                            alt="Norway"
                        />
                    </Card.Section>

                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>llama2-12b</Text>
                        <Badge color="green" variant="light">
                            huggingface社区
                        </Badge>
                    </Group>

                    <Text size="sm" color="dimmed">
                        世界最火爆的开源大语言模型之一，性能强劲，推理能力强
                    </Text>

                    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                        创建
                    </Button>
                </Card>
            </Flex>
        </Tabs.Panel>

        <Tabs.Panel value="text2img" pt="xs">
            <Flex
                mih={50}
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
            >
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 320 }} mr={12}>
                    <Card.Section>
                        <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={160}
                            alt="Norway"
                        />
                    </Card.Section>

                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>stable-diffusion</Text>
                        <Badge color="green" variant="light">
                            huggingface社区
                        </Badge>
                    </Group>

                    <Text size="sm" color="dimmed">
                        文生图系列模型，效果炸裂，可扩展性强
                    </Text>

                    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                        创建
                    </Button>
                </Card>
            </Flex>
        </Tabs.Panel>

    </Tabs>
}

export function CreateFoundationModel() {

    const router = useRouter()
    const { query } = router;
    const items = [
        { title: 'AgentCraft', href: '/' },
        { title: '基础模型', href: '/foundationModel' },
        { title: '创建基础模型', href: `/foundationModel/create` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
            <FeatureDescription title="创建基础模型"  description="依托阿里云Serverless的丰富应用模版以及完整的工具链，AgentCraft可以创建丰富多样的基础模型服务"/>
            <Box mt={12} >
                <FoundationModelTab />
            </Box>
        </>

    );
}
