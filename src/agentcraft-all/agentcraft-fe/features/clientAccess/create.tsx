import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { Breadcrumbs, Anchor, Button, Text, Flex, Card, Image, Group, Badge } from '@mantine/core';
import FeatureDescription from 'components/FeatureDescription';


export function CreateClientAccess() {

    const router = useRouter()

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
            <FeatureDescription title="客户端接入服务" description="AgentCraft通过引导及直接创建的方式帮助构建您的专属客户端服务，如web网站，钉钉，企业微信等" />
            <Flex
                mih={50}
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
            >
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 320, height: 360 }} mr={12}>
                    <Card.Section>
                        <Image
                            src="https://img.alicdn.com/imgextra/i3/O1CN01mwqUCr22vrqYE3kly_!!6000000007183-0-tps-1280-732.jpg"
                            height={160}
                            alt="Norway"
                        />
                    </Card.Section>
                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>客户端接入</Text>
                    </Group>
                    <div style={{ height: 75 }}>
                        <Text size="sm" color="dimmed">
                            将智能体能力接入钉钉机器人，微信等及时通讯软件
                        </Text>
                    </div>
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={() => router.push('/clientAccess/robot')}>
                        创建
                    </Button>
                </Card>
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 320, height: 360 }} mr={12}>
                    <Card.Section>
                        <Image
                            src="https://img.alicdn.com/imgextra/i2/O1CN01Eepj7f1KtGVA2ftT1_!!6000000001221-0-tps-1280-732.jpg"
                            height={160}
                            alt="Norway"
                        />
                    </Card.Section>
                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>WEB独立站点</Text>
                    </Group>
                    <div style={{ height: 75 }}>
                        <Text size="sm" color="dimmed">
                            将构建的智能体服务发布为独立WEB站点，方便进行独立访问
                        </Text>
                    </div>
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={() => router.push('/clientAccess/web')}>
                        创建
                    </Button>
                </Card>

                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 320, height: 360 }} mr={12}>
                    <Card.Section>
                        <Image
                            src="https://img.alicdn.com/imgextra/i4/O1CN01rOWuf323SNxxuEt26_!!6000000007254-0-tps-1280-732.jpg"
                            height={160}
                            alt="Norway"
                        />
                    </Card.Section>
                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>网站嵌入</Text>
                    </Group>
                    <div style={{ height: 75 }}>
                        <Text size="sm" color="dimmed">
                            将构建出的智能体服务以脚本或者SDK的方式嵌入网页
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
