import React from "react";

import { Paper, Group, Text, Title, Box ,Divider} from '@mantine/core';
import { obscureString } from 'utils/index';




export default function CompleteConfirm({ embeddingServiceForm, databaseForm }: any) {


    const embeddingSerivceValues = embeddingServiceForm.values;
    const databaseValues = databaseForm.values;
    const { EMBEDDING_DIM, EMBEDDING_URL } = embeddingSerivceValues;
    const { POSTGRES_HOST, POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD } = databaseValues;
    return (
        <Paper shadow="xs" p="xl">
            <Title order={5} size="h5">向量服务配置</Title>
            <Box pl={4} pr={4} >
                <Group grow>
                    <Text>向量维度：</Text>
                    <Text>{EMBEDDING_DIM}</Text>
                </Group>
                <Group grow>
                    <Text>embedding服务地址：</Text>
                    <Text>{EMBEDDING_URL}</Text>
                </Group>
            </Box>
            <Divider my="sm" />
            <Title order={5} size="h5">数据库配置</Title>
            <Box pl={4} pr={4} >
                <Group grow>
                    <Text>数据库地址：</Text>
                    <Text>{POSTGRES_HOST}</Text>
                </Group>
                <Group grow>
                    <Text>数据库账号：</Text>
                    <Text>{POSTGRES_DATABASE}</Text>
                </Group>
                <Group grow>
                    <Text>数据库用户名：</Text>
                    <Text>{POSTGRES_USER}</Text>
                </Group>
                <Group grow>
                    <Text>数据库密码：</Text>
                    <Text>{obscureString(POSTGRES_PASSWORD)}</Text>
                </Group>
            </Box>
        </Paper>
    );
}
