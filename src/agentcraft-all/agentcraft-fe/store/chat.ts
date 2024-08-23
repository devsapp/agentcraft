
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { fetchEventSource } from "@fortaine/fetch-event-source";
import { notifications } from '@mantine/notifications';
import Locale from "locales/index";
import { ChatOptions, ChatItem, IUsage } from 'types/chat';
import { REQUEST_TIMEOUT_MS } from 'constants/index';
import { prettyObject } from 'utils/chat';
import { request } from 'utils/clientRequest';

interface ChatStore {
    chatList: ChatItem[],
    open: boolean,
    loading: boolean,
    isEdit: boolean,
    currentChatItem: ChatItem,
    setLoading: (loading: boolean) => void;
    setOpen: (open: boolean) => void;
    setEditStatus: (isEdit: boolean) => void;
    updateCurrentChatItem: (_: ChatItem) => void;
    updateChatList: (chatList: ChatItem[]) => void;
}


export const useChatStore = create<ChatStore>()(devtools((set) => ({
    chatList: [],
    open: false,
    loading: false,
    isEdit: false,
    currentChatItem: {} as ChatItem,
    updateCurrentChatItem: (currentChatItem: ChatItem) => set((_state) => {
        return ({ currentChatItem })
    }),
    setEditStatus: (isEdit: boolean) => set((_state) => {
        return ({ isEdit })
    }),
    setLoading: (status: boolean) => set((_state) => {
        return ({ loading: status })
    }),
    setOpen: (status: boolean) => set((_state) => {
        return ({ open: status })
    }),
    updateChatList: (chatList: ChatItem[]) => set((_state) => {
        return ({ chatList })
    })
})))


/**
 * 获取数据集列表
 */
export async function getChatList(knowledgeBaseId: any) {
    const state = useChatStore.getState();
    const updateChatList = state.updateChatList;
    const res = await request(`/api/chat/chatlist?id=${knowledgeBaseId}`);
    const data = res.data;
    if (data) {
        updateChatList(data);
    }
}


export function chatStream(options: ChatOptions, token: string) {
    const controller = new AbortController();
    options.onController?.(controller);
    const chatPayload = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        signal: controller.signal,
        body: JSON.stringify(Object.assign({ stream: true }, options, { token })),
    }
    const requestTimeoutId = setTimeout(
        () => controller.abort(),
        REQUEST_TIMEOUT_MS,
    );
    let responseText = "";
    let finished = false;
    let usage: IUsage;

    const finish = () => {
        if (!finished) {
            options.onFinish(responseText, usage);
            finished = true;
        }
    };
    controller.signal.onabort = finish;
    fetchEventSource(`/api/chat?version=${options.version}`, {
        ...chatPayload,
        async onopen(res) {
            clearTimeout(requestTimeoutId);
            const contentType = res.headers.get("content-type");
            if (contentType?.startsWith("text/plain")) {
                responseText = await res.clone().text();
                return finish();
            }
            if (
                !res.ok ||
                !res.headers
                    .get("content-type")
                    ?.startsWith('application/octet-stream') ||
                res.status !== 200
            ) {
                const responseTexts = [responseText];
                let extraInfo = await res.clone().text();

                try {
                    const resJson = await res.clone().json();
                    extraInfo = prettyObject(resJson);
                } catch (e) {
                    console.log(e);
                }

                if (res.status === 401) {
                    responseTexts.push(Locale.Error.Unauthorized);
                }
                if (extraInfo) {
                    responseTexts.push(extraInfo);
                }

                responseText = responseTexts.join("\n\n");

                return finish();
            }
        },
        onmessage(msg) {
            if (msg.data === "[DONE]" || finished) {
                return finish();
            }
            const text = msg.data;
            let json;
            try {
                json = text ? JSON.parse(text) : {};
            } catch (e) {
                console.error("[Request] parse error", text, msg);
                notifications.show({
                    color: 'red',
                    title: '[Request] parse error',
                    message: `message: ${JSON.stringify(msg)}`,
                });
                return finish();
            }
            if (json.usage?.total_tokens) {
                usage = json.usage;
            }
            // if (json.choices[0].message) {
            //     console.error("[Request] invoke error： 调用异常", msg);
            //     notifications.show({
            //         color: 'red',
            //         title: '[Request] invoke error',
            //         message: '调用异常',
            //     });
            //     return finish();
            // }
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
                responseText += delta;
                options.onUpdate?.(responseText, delta);
            } else {
                const message = json.message?.[0]?.content;
                if (message) {
                    responseText += message;
                    options.onUpdate?.(responseText, message);
                }
            }
        },
        onclose() {
            finish();
        },
        onerror(e) {
            options.onError?.(e);
            throw e;
        },
        openWhenHidden: true,
    });
}
