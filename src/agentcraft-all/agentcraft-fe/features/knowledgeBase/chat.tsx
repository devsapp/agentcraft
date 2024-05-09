import { useState, useRef, useEffect } from 'react';
import { Loader } from '@mantine/core';
import MarkdownContent from 'components/MarkdownContent';
import MDXContainer from 'components/MDXContainer';
import { chatStream } from 'store/chat';
import { MessageType, ChatMessage } from 'types/chat';
import { useKnowledgeBaseStore } from 'store/knowledgeBase';
import styles from 'styles/chat.module.scss';

const defaultPrompt = ``;

export default function Home() {
    const currentKnowledgeBase = useKnowledgeBaseStore().currentKnowledgeBase;
    const [userInput, setUserInput] = useState(defaultPrompt);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
       
    ]);
    const knowledgeBaseToken = currentKnowledgeBase?.token || '';
    const messageListRef = useRef(null);
    const textAreaRef = useRef(null);

    useEffect(() => {
        const messageList: any = messageListRef.current;
        messageList.scrollTop = messageList.scrollHeight;
    }, [messages]);


    useEffect(() => {
        (textAreaRef as any).current.focus();
    }, []);

    const handleError = (e: any) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                message: e.message,
                type: MessageType.ASSISTANT,
                sourceIdx: -1,
                showFeedback: false,
                liked: false,
                disLiked: false,
            },
        ]);
        setLoading(false);
        setUserInput("");
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (userInput.trim() === "") {
            return;
        }

        const currentMessage: ChatMessage[] = [
            ...messages,
            {
                message: userInput,
                type: MessageType.USER,
                sourceIdx: -1,
                showFeedback: false,
                liked: false,
                disLiked: false,
            },
        ];
        setLoading(true);
        setMessages(currentMessage);
        try {
            const _preMessages = JSON.parse(JSON.stringify(currentMessage));
            const newMessage = {
                message: "",
                type: "assistant",
                sourceIdx: -1,
                showFeedback: false,
                liked: false,
                disLiked: false,
            };
            setUserInput("");
            const requestMessage = currentMessage.map((item) => {
                return {
                    role: item.type,
                    content: item.message
                }
            })
            chatStream({
                version: 'v1',
                messages: requestMessage,
                config: {
                    stream: true,
                    max_tokens: 1024,
                    status: 0,
                },
                onFinish: (msg) => {
                    setLoading(false);
                },
                onUpdate: (responseText: string, delta: string) => {
                    newMessage.message += delta;
                    setMessages([..._preMessages, newMessage]);
                }
            }, knowledgeBaseToken);

        } catch (e) {
            handleError(e);
        }
    };
    const userResponseWithUI = (assistant: string) => {
        const currentMessage: ChatMessage[] = [
            ...messages,
            {
                message: assistant,
                type: MessageType.USER,
                sourceIdx: -1,
                showFeedback: false,
                liked: false,
                disLiked: false,
            },
        ];
        setLoading(true);
        setMessages(currentMessage);
        try {
            const _preMessages = JSON.parse(JSON.stringify(currentMessage));
            const newMessage = {
                message: "",
                type: "assistant",
                sourceIdx: -1,
                showFeedback: false,
                liked: false,
                disLiked: false,
            };
            setUserInput("");
            chatStream({
                version: 'v1',
                messages: [{
                    role: 'user',
                    content: assistant
                }],
                config: {
                    stream: true,
                    max_tokens: 1024,
                    status: 0,
                },
                onFinish: (msg) => {
                    setLoading(false);
                },
                onUpdate: (responseText: string, delta: string) => {
                    newMessage.message += delta;
                    setMessages([..._preMessages, newMessage]);
                }
            }, knowledgeBaseToken);

        } catch (e) {
            handleError(e);
        }
    }
    const handleEnter = (e: any) => {
        if (e.keyCode === 13 && userInput) {
            if (!e.shiftKey && userInput) {
                handleSubmit(e);
            }
        } else if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    return (
        <>
            <main className={styles.main}>
                <div className={styles.cloud}>
                    <div ref={messageListRef} className={styles.messagelist}>
                        {messages.map((message: ChatMessage, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className={
                                        message.type === MessageType.USER &&
                                            loading &&
                                            index === messages.length - 1
                                            ? styles.usermessagewaiting
                                            : message.type !== MessageType.USER
                                                ? styles.apimessage
                                                : styles.usermessage
                                    }
                                >
                                    {message.type !== MessageType.USER ? (
                                        <div className={styles["system_avatar"]} >
                                            <img src="https://img.alicdn.com/imgextra/i1/O1CN01Ag2hWp1uz3fbGtWqB_!!6000000006107-2-tps-1024-1024.png" style={{ width: '100%', height: '100%' }} />
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
                                        {message.type == MessageType.USER ? <MarkdownContent textContent={message.message} /> : <MDXContainer content={message.message} scope={{ userResponseWithUI }} />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.center}>
                    <div className={styles.cloudform}>
                        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                            <textarea
                                disabled={loading}
                                onKeyDown={handleEnter}
                                ref={textAreaRef}
                                autoFocus={false}
                                rows={1}
                                id="userInput"
                                name="userInput"
                                placeholder={loading ? "等待回复中" : "请输入你的问题，如AgentCraft的使用场景有哪些？"}
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className={styles.textarea}
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className={styles.generatebutton}
                            >
                                {loading ? <Loader mt={-8} /> : (
                                    <svg
                                        viewBox="0 0 20 20"
                                        className={styles.svgicon}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                    </svg>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}
