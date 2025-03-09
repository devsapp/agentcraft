import React, { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Loader, LoadingOverlay, Button, Modal, Group, Badge, CopyButton, Text } from '@mantine/core';
import { IconPlayerStop } from '@tabler/icons-react';
import { useSystemConfigStore } from 'store/systemConfig';
// import MarkdownContainer from 'components/Markdown';
import { notifications } from '@mantine/notifications';
import MDXContainer from 'components/MDXContainer';
import { chatStream } from 'store/chat';
import * as v1 from 'store/knowledgeBase';
import * as v2 from 'store/assistantSession';
import { MessageType, IUsage } from 'types/chat';
import styles from 'styles/chat.module.scss';


const ApiVersion = { v1, v2 };

type ConversationItem = {
    id: string;
    content: string;
    role: 'user' | 'assistant' | 'system';
    prompt_tokens?: number | string;
    completion_tokens?: number | string;
    feedback?: string;
    isRead?: boolean;
    hiddenUseage?: boolean;
}

type ConversationProps = {
    keyword?: string,
    id: number,
    token: string,
    shareToken?: string,
    hiddenUseage?: boolean,
    version: 'v1' | 'v2' // v1 对应基础llm调用和rag检索， v2代表agent服务 二者在agentcraft的后端是分开的
}

function setTextAreaRef(ref: any, value: any) {
    if (ref?.current?.value) ref.current.value = value;
}
function getTextRreaRefValue(ref: any) {
    return ref?.current?.value;

}

function transformMessage(data: any[]): ConversationItem[] {
    if (!Array.isArray(data)) {
        return [];
    }
    const m = [];
    for (const item of data) {
        if (item.question) {
            m.push({
                id: nanoid(),
                content: item.question,
                role: MessageType.USER,
            })
        }
        if (item.answer) {
            m.push({
                id: nanoid(),
                content: item.answer,
                role: MessageType.ASSISTANT,
                prompt_tokens: item.prompt_tokens ? item.prompt_tokens : '-',
                completion_tokens: item.completion_tokens ? item.completion_tokens : '-',
            });
        }
    }

    return m;
}

let currentController: AbortController | null = null;

const ConversationComponent = React.memo((data: ConversationItem) => {
    const isUser = data.role == MessageType.USER;
    const { completeConfig = {} } = useSystemConfigStore();
    const { chatBotIcon = '' } = completeConfig;
    const copyNode = ({ copied, copy }: any) => {
        if (copied) {
            notifications.show({
                id: 'conversation-component-copy',
                title: '已复制',
                message: data.content,
            });
        }

        return (
            <Badge radius="sm" style={{ cursor: 'pointer' }} onClick={copy}>
                复制
            </Badge>
        )
    }
    return (
        <div
            className={styles.usermessage}
        >
            {!isUser ? (
                <div className={styles["system_avatar"]} >
                    <img
                        src={chatBotIcon}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
            ) : (
                <div className={styles["user_avatar"]}>
                    <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3538"
                        width="24"
                        height="24"
                    >
                        <path
                            d="M858.5 763.6c-18.9-44.8-46.1-85-80.6-119.5-34.5-34.5-74.7-61.6-119.5-80.6-0.4-0.2-0.8-0.3-1.2-0.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-0.4 0.2-0.8 0.3-1.2 0.5-44.8 18.9-85 46-119.5 80.6-34.5 34.5-61.6 74.7-80.6 119.5C146.9 807.5 137 854 136 901.8c-0.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c0.1 4.4 3.6 7.8 8 7.8h60c4.5 0 8.1-3.7 8-8.2-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"
                            p-id="3539"
                        ></path>
                    </svg>
                </div>
            )}
            <div className={styles.markdownanswer}>
                {isUser ? <Text style={{ whiteSpace: 'pre-wrap' }} >{data.content}</Text> : <MDXContainer content={data.content} />}
            </div>
            {
                !isUser && (
                    <Group spacing="xs" mt={4} >
                        {!data.hiddenUseage ? <Badge radius="sm">
                            输入token:{data.prompt_tokens || '-'}&nbsp;｜&nbsp;输出token:{data.completion_tokens || '-'}
                        </Badge> : null}

                        <CopyButton value={data.content}>
                            {copyNode}
                        </CopyButton>
                    </Group>
                )
            }
        </div>
    )
});
ConversationComponent.displayName = 'ConversationComponent';

export default function Conversation(props: ConversationProps) {
    const { token, version, keyword = '测试会话', id, shareToken = '', hiddenUseage } = props;
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [conversations, setConversations] = useState<ConversationItem[]>([]);
    const messageListRef = useRef(null);
    const chatInputRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        (chatInputRef as any).current.focus();
        getMessages();
    }, [keyword, id, shareToken]);

    useEffect(() => {
        if (messageListRef.current && conversations.length > 0) {
            // @ts-ignore
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [conversations]);

    useEffect(() => {
        return () => currentController?.abort();
    }, []);
    const getMessages = async () => {
        if (id) {
            setHistoryLoading(true);
            const res = await ApiVersion[version].getSessionHistory(id, { keyword, shareToken });
            setConversations(transformMessage(res.data));
            setHistoryLoading(false);
        }
    }
    const removeSession = async () => {
        setHistoryLoading(true);
        const { data } = await ApiVersion[version].getSessionByKeyword(id, keyword, shareToken);
        if (data?.id) {
            await ApiVersion[version].removeSessionHistory(id, data.id, shareToken);
            await getMessages();
        }
        setHistoryLoading(false);
        setShowModal(false);
    }

    const handleError = (e: any) => {
        setLoading(false);
        setTextAreaRef(chatInputRef, '');
    };

    // 取消请求
    const handleCancel = () => {
        currentController?.abort();
        currentController = null;
        setLoading(false);
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const inputValue = getTextRreaRefValue(chatInputRef);
        if (inputValue.trim() === "") {
            return;
        }
        setLoading(true);

        const userConversation: ConversationItem = {
            id: nanoid(),
            content: inputValue,
            role: MessageType.USER,
        }
        const oldConversations: ConversationItem[] = [
            ...conversations,
            userConversation,
        ];

        setConversations(oldConversations);
        try {
            const newConversations: ConversationItem[] = JSON.parse(JSON.stringify(oldConversations));
            const assistantConversation: ConversationItem = {
                id: nanoid(),
                content: '',
                role: MessageType.ASSISTANT,
            };
            setTextAreaRef(chatInputRef, '');
            const requestMessage = newConversations.map((item: ConversationItem) => {
                return {
                    role: item.role,
                    content: item.content
                }
            })
            chatStream({
                version,
                messages: requestMessage,
                config: {
                    stream: true,
                    max_tokens: 2000,
                    keyword,
                },
                onController: (controller) => {
                    currentController = controller; // 保存controller引用
                },
                onFinish: (msg, usage: IUsage) => {
                    if (usage?.total_tokens) {
                        assistantConversation.prompt_tokens = usage.prompt_tokens;
                        assistantConversation.completion_tokens = usage.completion_tokens;
                    }
                    setLoading(false);
                },
                onUpdate: (responseText: string, delta: string) => {
                    assistantConversation.content += delta;
                    setConversations([...oldConversations, assistantConversation]);
                }
            }, token);
        } catch (e) {
            handleError(e);
        }
    };
    const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const inputValue = getTextRreaRefValue(chatInputRef);
        if (e.key === 'Enter' && inputValue) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <>
            <LoadingOverlay
                visible={historyLoading}
                overlayOpacity={0.3}
            />
            <Modal
                opened={showModal}
                onClose={() => setShowModal(false)}
                title="确定要删除吗？"
            >
                <Group style={{ paddingTop: 20 }}>
                    <Button color="red" onClick={removeSession}>确认</Button>
                    <Button variant="outline" onClick={() => setShowModal(false)}>取消</Button>
                </Group>
            </Modal>
            <div className={styles.main}>
                <Button color="red" className={styles.clear} variant="subtle" onClick={() => setShowModal(true)}>
                    清空会话
                </Button>
                <div className={styles.cloud}>
                    <div ref={messageListRef} className={styles.messagelist}>
                        {conversations.map((item: ConversationItem) => (
                            <ConversationComponent key={item.id} {...item} hiddenUseage={hiddenUseage} />
                        ))}
                    </div>
                </div>
                <div className={styles.center}>
                    <div className={styles.cloudform}>
                        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                            <textarea
                                disabled={loading}
                                onKeyDown={handleEnter}
                                ref={chatInputRef}
                                autoFocus={false}
                                rows={1}
                                name="chatInput"
                                placeholder={loading ? "等待回复中" : "请输入你的问题 "}
                                className={styles.textarea}
                            />


                            {loading ?
                                <button
                                    className={styles.stopbutton}
                                    onClick={handleCancel}
                                >
                                    <IconPlayerStop stroke={2} />
                                </button>
                                :
                                <button
                                    type="submit"
                                    className={styles.generatebutton}
                                >
                                    <svg
                                        viewBox="0 0 20 20"
                                        className={styles.svgicon}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                    </svg>
                                </button>
                            }

                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}