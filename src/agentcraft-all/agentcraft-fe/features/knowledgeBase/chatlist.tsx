import React, { useEffect, useState } from "react";
import { Breadcrumbs, Anchor, Button, Box, Table, Modal, Text, TextInput, Group, Divider, Title, Paper, Flex, Badge, LoadingOverlay, Textarea, MultiSelect, NumberInput, Select, Drawer } from '@mantine/core';
import { useForm } from '@mantine/form';

import { getChatList, useChatStore } from '@/store/chat';

import { ChatItem } from '@/types/chat';

import { unicodeDecode } from '@/utils/chat';
import { FORM_WIDTH_1280 } from 'constants/index';
import FeatureDescription from '@/components/FeatureDescription';
import Chat from 'features/chat';
// import styles from './index.module.scss';


interface ChatListPageProps {
    appId: number;
    knowledgeBaseId: number
}


function List({ knowledgeBaseId }: { knowledgeBaseId: any }) {
    const chatList: ChatItem[] = useChatStore().chatList;
    const loading: boolean = useChatStore().loading;
    const setLoading = useChatStore().setLoading;
    const setOpen = useChatStore().setOpen;
    const getKnowledgeBaseChatList = async (knowledgeBaseId: any) => {
        setLoading(true);
        await getChatList(knowledgeBaseId);
        setLoading(false);
    }
    const rows = chatList.map((element: ChatItem) => (
        <tr key={element.id}>
            <td>{element.id}</td>
            <td><div style={{ width: 100, wordWrap:'break-word' }}>{element.question}</div></td>
            <td ><div style={{ width: 200, wordWrap:'break-word' }}>{unicodeDecode(element.answer)}</div></td>
            <td><div style={{ width: 200, wordWrap:'break-word' }}>{element.prompt}</div></td>
            <td>{element.ip}</td>
            <td><div style={{ width: 200, wordWrap:'break-word' }}>{JSON.stringify(unicodeDecode(element.source))}</div></td>
            <td>{element.model_name}</td>
            <td>{element.created}</td>
            {/* <td>{element.modified}</td> */}
            <td>
                <Button
                    onClick={() => {
                        setOpen(true);
                       
                    }}
                    size="xs"
               
                >
                    编辑
                </Button>
            </td>
        </tr>
    ));
    useEffect(() => {
        getKnowledgeBaseChatList(knowledgeBaseId);
    }, [knowledgeBaseId]);

    return (
        <Box pos="relative" >
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>问题</th>
                        <th>答案</th>
                        <th>完整提示词</th>
                        <th>访问IP</th>
                        <th>知识库结果</th>
                        <th>使用模型</th>
                        <th>问答创建时间</th>
                        {/* <th>问答修改时间</th> */}
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Box>
    );
}


export function ChatListPage({ appId, knowledgeBaseId }: ChatListPageProps) {
    const loading: boolean = useChatStore().loading;

    const items = [
        { title: '应用列表', href: '/app' },
        { title: '知识库', href: `/app/${appId}/knowledgeBase` },
        { title: '问答记录', href: `/app/${appId}/knowledgeBase/${knowledgeBaseId}/chatlist` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));



    return (
        <Box pos="relative" >
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Breadcrumbs>{items}</Breadcrumbs>
            <FeatureDescription title="问答记录" description="您可以在此查看该知识库的问答历史记录" />
            <List knowledgeBaseId={knowledgeBaseId} />
        </Box>

    );
}
