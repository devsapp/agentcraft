import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Paper, Button, Box, Table, TextInput, FileInput, PasswordInput, Text, Textarea, Highlight, LoadingOverlay, Divider, Title, Select, Modal, Flex, Space, NumberInput, Stepper, Group, rem } from '@mantine/core';
import { IconFileUpload, IconUpload } from '@tabler/icons-react';
export default function DataAll({ form }: any) {



    return (
        <>
            <Title order={5}>数据集设置</Title>
            <Box mx="auto">
                <TextInput withAsterisk label="数据集名称" description="" placeholder=""  {...form.getInputProps('name')} />
                <Textarea label="描述" description="" placeholder=""  {...form.getInputProps('description')} />
            </Box>
            <Divider my="sm" />
            <Title order={5}>数据源设置</Title>
            <Box mx="auto">
                <FileInput withAsterisk accept=".md,.txt,.html,.pdf" name="file" label="选择文档" description={<div > 选择本地文件上传，支持 .txt,.md,.html文件 ,<a href="/agentcraft.md" download>下载AgentCraft教程文档</a></div>} placeholder="点击上传文档" icon={<IconUpload size={rem(14)} />} {...form.getInputProps('file')} />
                <TextInput withAsterisk label="标题" description="标题内容作为检索的数据来源，用来展示检索结果" placeholder="" {...form.getInputProps('title')} />
                <NumberInput withAsterisk label="文档切片大小" description="" placeholder="" {...form.getInputProps('chunk_size')} />
                <TextInput label="来源url" placeholder="" {...form.getInputProps('url')} />
            </Box>
        </>
    );
}