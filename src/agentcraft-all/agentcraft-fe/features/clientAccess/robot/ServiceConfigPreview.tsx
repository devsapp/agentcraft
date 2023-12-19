import React from "react";
import { Box, Title, Grid, Flex } from '@mantine/core';
import CopyToClipboard from 'components/CopyToClipboard';
import { useClientAccessStore } from "store/clientAccess";

export default function ServiceConfigPreview() {
    const { robotConfig } = useClientAccessStore();
    const { robotProxyServiceConfig } = robotConfig;
    const { serviceUrl, token } = robotProxyServiceConfig;

    return (
        <>
            <Title order={5}>代理服务配置信息</Title>
            <Box mx="auto">
                <Grid>
                    <Grid.Col span={4}>Outgoing Post地址</Grid.Col>
                    <Grid.Col span={8} className="copy_container">
                        <Flex
                            justify="flex-start"
                            align="center"
                            direction="row"
                        >
                            {serviceUrl ? <CopyToClipboard value={serviceUrl} content={serviceUrl} /> : null}

                        </Flex>
                    </Grid.Col>

                </Grid>
                <Grid>
                    <Grid.Col span={4}>Outgoing Token</Grid.Col>
                    <Grid.Col span={8}>
                        <Flex
                            justify="flex-start"
                            align="center"
                            direction="row"
                        >
                            {token ? <CopyToClipboard value={token} content={token} /> : null}
                        </Flex>
                    </Grid.Col>
                </Grid>

            </Box>
        </>
    );
}