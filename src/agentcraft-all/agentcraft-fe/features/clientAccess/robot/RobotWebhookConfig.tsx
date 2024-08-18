import React from "react";
import { Box, Textarea, Title, Paper, Notification, Anchor } from '@mantine/core';



export default function RobotWebhookConfig({ form }: any) {


    return (
        <>
            <Paper shadow="xs" p="xl">
                <Title order={5}>配置钉钉机器人webhook</Title>
                <Notification title="系统配置" mb={12} mt={12} withCloseButton={false} radius="xs" >
                    使用该功能请先开通 <Anchor href="https://common-buy.aliyun.com/?commodityCode=eventbridge_post_public_cn" target="_blank">Eventbridge</Anchor>
                </Notification>
                <Box mx="auto">
                    <Textarea label="Webhook" description="" placeholder=""  {...form.getInputProps('webhook')} />
                    <Textarea label="访问令牌" description="" placeholder=""  {...form.getInputProps('token')} />
                </Box>
            </Paper>

        </>
    );
}