import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { Breadcrumbs, Anchor, Button, Text, Flex, Card, Image, Group, Badge } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconFileUpload } from '@tabler/icons-react';
import { getDataSourceList, useDataSourceStore, addDataSource, deleteDataSource } from '@/store/datasource';
import { DataSource } from '@/types/datasource';
import { DataSetType } from "@/types/dataset";

import { DocumentRequestPayload, QuestionRequestPayload } from "@/types/datasource";
import { formatDateTime } from 'utils/index';
import { FORM_WIDTH } from 'constants/index';
import FeatureDescription from '@/components/FeatureDescription';
// import styles from './index.module.scss';



export function ClientAccess() {



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
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 320, height: 460 }} mr={12}>
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
                    <div style={{ height: 175 }}>
                        <Text size="sm" color="dimmed">
                            当您希望把您所构建的知识库服务或者agent服务通过一个独立的web站点提供给外部用户使用的时候您可以使用这种方式，可以使用开源的ChatGPT客户端快速部署到函数计算上提供web服务
                        </Text>
                    </div>
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md" >
                        创建
                    </Button>
                </Card>
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 320, height: 460 }} mr={12}>
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
                    <div style={{ height: 175 }}>
                        <Text size="sm" color="dimmed">
                            当您需要将知识库系统或者Agent服务接入到钉钉，企业微信，飞书等系统的时候，您可以使用此方式，此方式会通过流程式的引导帮助您快速接入上述系统，会帮助您创建必要的中间协议转换层服务，该服务使用阿里云的
                            事件总线以及函数计算进行服务托管，用来连接AgentCraft的服务和这些企业客户端应用
                        </Text>
                    </div>
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md" >
                        创建
                    </Button>
                </Card>
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 320, height: 460 }} mr={12}>
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
                    <div style={{ height: 175 }}>
                        <Text size="sm" color="dimmed">
                            当您只是希望在已有的网站上进行由AgentCraft创建的知识库或者Agent服务，您可以通过此方式，生成集成脚本，然后嵌入您的网页
                        </Text>
                    </div>
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md" disabled>
                        建设中
                    </Button>
                </Card>
            </Flex>
        </>

    );
}
