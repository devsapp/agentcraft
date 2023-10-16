import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { Breadcrumbs, Anchor, Button, Text, Flex, Card ,Image ,Group ,Badge} from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconFileUpload } from '@tabler/icons-react';
import { getDataSourceList, useGlobalStore, addDataSource, deleteDataSource } from '@/store/datasource';
import { DataSource } from '@/types/datasource';
import { DataSetType } from "@/types/dataset";

import { DocumentRequestPayload, QuestionRequestPayload } from "@/types/datasource";
import { formatDateTime } from '@/util/index';
import { FORM_WIDTH } from '@/constant/index';
import FeatureDescription from '@/components/FeatureDescription';
// import styles from './index.module.scss';



export function ClientAccess() {

    const router = useRouter()
    const { query } = router
    const items = [
        { title: 'AgentCraft', href: '/' },
        { title: '客户端接入', href: '/clientAccess' }
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
            <FeatureDescription title="客户端接入" description="AgentCraft通过引导及直接创建的方式帮助构建您的专属客户端服务，如web网站，钉钉，企业微信等" />
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
                        <Text weight={500}>web站点</Text>
                     
                    </Group>

                    <Text size="sm" color="dimmed">
                        使用开源的LLM客户端对AgentCraft构建的知识库或Agent服务进行独立部署
                    </Text>
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md" >
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
                        <Text weight={500}>客户端接入</Text>
                     
                    </Group>

                    <Text size="sm" color="dimmed">
                        通过引导流程，将AgentCraft创建的知识库或者Agent服务构建到您的钉群，微信群中
                    </Text>
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md" >
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
                        <Text weight={500}>网站嵌入</Text>
                     
                    </Group>

                    <Text size="sm" color="dimmed">
                        通过集成脚本的方式将 知识库或agent服务集成到您的网站
                    </Text>
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md" disabled>
                        建设中
                    </Button>
                </Card>
            </Flex>
        </>

    );
}
