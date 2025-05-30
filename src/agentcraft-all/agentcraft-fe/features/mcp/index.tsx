import React, { useEffect, useState } from "react";
import { Button, Box, Tabs, Text, Flex, Card, Image } from '@mantine/core';

import FeatureDescription from 'components/FeatureDescription';

import { MCP_MODEL_SCOPE_TEMPLATES } from '@/constants/mcp'




export function MCPPage() {

    return (
        <>
            <FeatureDescription title="MCP" description="AgentCraft的智能体可以无缝集成MCP Server, 实现智能应用快速扩展" />
            <Box pos="relative" pb={124} mt={12}>
                <Tabs variant="outline" defaultValue="mcp-modelscope">
                    <Tabs.List>
                        <Tabs.Tab value="mcp-modelscope" >魔搭MCP精选</Tabs.Tab>
                        {/* <Tabs.Tab value="self-deploy" >自托管</Tabs.Tab> */}
                    </Tabs.List>
                    <Tabs.Panel value="mcp-modelscope" pt="xs">
                        <Flex
                            mih={50}
                            gap="md"
                            justify="flex-start"
                            align="flex-start"
                            direction="row"
                            wrap="wrap"
                            pb={120}
                        >
                            {MCP_MODEL_SCOPE_TEMPLATES.map((item: any) => {
                                return (
                                    <a href={item.link} target="_blank" rel="noreferrer" key={item.id}>
                                        <Card
                                            shadow="sm"
                                            padding="lg"
                                            radius={5}
                                            withBorder
                                            style={{ width: 353, height: 146 }}
                                        >
                                            <Flex justify="space-between" align="center" mb={10}>
                                                <Text size="md" fw={700}>
                                                    {item.name}
                                                </Text>
                                                {item.icon ? (
                                                    <Image src={item.icon} width={38} height={38} alt="icon" />
                                                ) : (
                                                    <Box
                                                        w={38}
                                                        h={38}
                                                        style={{
                                                            lineHeight: '38px',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        {item.iconText}
                                                    </Box>
                                                )}
                                            </Flex>

                                            <Text
                                                size="sm"
                                                color="dimmed"
                                                h={32}
                                                style={{
                                                    display: 'block',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                                title={item.description}
                                            >
                                                {item.description}
                                            </Text>
                                        </Card>
                                    </a>
                                );
                            })}
                        </Flex>
                    </Tabs.Panel>

                    {/* <Tabs.Panel value="self-deploy" pt="xs">
                        建设中
                    </Tabs.Panel> */}

                </Tabs>
            </Box>
        </>

    );
}