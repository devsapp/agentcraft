import React, { useEffect } from "react";
import { Breadcrumbs, Anchor, Button, Box, Table, Affix, rem, LoadingOverlay, Spoiler } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { getChatList, useChatStore } from 'store/chat';

import { ChatItem } from 'types/chat';
import { unicodeDecode } from 'utils/chat';
import { formatDateTime } from 'utils/index';
import CopyToClipboard from 'components/CopyToClipboard';
import FeatureDescription from 'components/FeatureDescription';

// import styles from './index.module.scss';


interface ChatListPageProps {
    appId: number;
    assistantId: number
}


function List({ assistantId }: { assistantId: any }) {
    const chatList: ChatItem[] = useChatStore().chatList;
    const loading: boolean = useChatStore().loading;
    const setLoading = useChatStore().setLoading;


    const getAssistantChatList = async (assistantId: any) => {
        setLoading(true);
        await getChatList(assistantId);
        setLoading(false);
    }
    const rows = chatList.map((element: ChatItem) => (
        <tr key={element.id}>
            <td>{element.id}</td>

            <td style={{ width: 120 }}>
                {element.question ?
                    <CopyToClipboard value={element.question} content={<Spoiler maxHeight={80} showLabel="显示更多" hideLabel="隐藏">
                        {element.question}
                    </Spoiler>} width={120} />
                    : null}
            </td>

            <td >
                {element.answer ?
                    <CopyToClipboard value={unicodeDecode(element.answer)} content={<Spoiler maxHeight={180} showLabel="显示更多" hideLabel="隐藏">
                        {unicodeDecode(element.answer)}
                    </Spoiler>} width={300} />
                    : null}
            </td>
            <td>
                {element.prompt ?
                    <CopyToClipboard value={element.prompt} content={<Spoiler maxHeight={180} showLabel="显示更多" hideLabel="隐藏">
                        {element.prompt}
                    </Spoiler>} width={300} />
                    : null}
            </td>
            <td>{element.ip}</td>
            <td>
                {element.source ?
                    <CopyToClipboard value={JSON.stringify(unicodeDecode(element.source))} content={<Spoiler maxHeight={180} showLabel="显示更多" hideLabel="隐藏">
                        {JSON.stringify(unicodeDecode(element.source))}
                    </Spoiler>} width={300} />
                    : null}
            </td>
            <td style={{ width: 80 }}>{element.model_name}</td>
            <td style={{ width: 80 }}>{formatDateTime(element.created)}</td>
            <td style={{ width: 80 }}>{element.prompt_tokens || '-'}</td>
            <td style={{ width: 80 }}>{element.completion_tokens || '-'}</td>
        </tr>
    ));
    useEffect(() => {
        getAssistantChatList(assistantId);
    }, [assistantId]);

    return (
        <Box pos="relative" >
            <Affix position={{ top: rem(120), right: rem(20) }}>
                <Button leftIcon={<IconRefresh />} onClick={() => {
                    getAssistantChatList(assistantId);
                }} >
                    刷新
                </Button>
            </Affix>
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>问题</th>
                        <th>答案</th>
                        <th>完整提示词</th>
                        <th>访问IP</th>
                        <th>智能体结果</th>
                        <th>使用模型</th>
                        <th>问答创建时间</th>
                        <th>输入Token</th>
                        <th>输出Token</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Box >
    );
}


export function ChatListPage({ appId, assistantId }: ChatListPageProps) {

    const items = [
        { title: '应用列表', href: '/app' },
        { title: '助手智能体', href: `/app/${appId}/knowledgeBase` },
        { title: '问答记录', href: `/app/${appId}/knowledgeBase/${assistantId}/chatlist` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));



    return (
        <Box pos="relative" >
            <Breadcrumbs>{items}</Breadcrumbs>
            <FeatureDescription title="问答记录" description="您可以在此查看该智能体的问答历史记录" />
            <List assistantId={assistantId} />
        </Box>

    );
}
