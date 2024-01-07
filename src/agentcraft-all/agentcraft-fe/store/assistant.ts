
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AssistantRequestPayload, AssistantResponseData, Assistant } from 'types/assistant';
import { request } from 'utils/clientRequest';

interface AccessUrl {
    openApiUrl: string
    innerApiUrl: string
}
interface AssistantStore {
    assistantList: AssistantResponseData[],
    open: boolean,
    chatDrawer: boolean,
    loading: boolean,
    isEdit: boolean,
    accessUrl: AccessUrl,
    currentAssistant?: Assistant,
    assistantChatList: any[],
    setAccessUrl: (accessUrl: AccessUrl) => void;
    setChatDrawer: (chatDrawer: boolean) => void;
    setLoading: (loading: boolean) => void;
    setOpen: (open: boolean) => void;
    setEditStatus: (isEdit: boolean) => void;
    updateCurrentAssistant: (_: Assistant) => void;
    updateAssistantList: (_: AssistantResponseData[]) => void;
}


export const useAssistantStore = create<AssistantStore>()(devtools((set) => ({
    assistantList: [],
    assistantChatList: [],
    open: true,
    chatDrawer: false,
    loading: false,
    isEdit: false,
    accessUrl: {
        openApiUrl: '',
        innerApiUrl: ''
    },
    currentAssistant: undefined,
    // 知识库列表
    updateCurrentAssistant: (currentAssistant: Assistant) => set((_state) => {
        return ({ currentAssistant })
    }),
    setChatDrawer: (chatDrawer: boolean) => set((_state) => {
        return ({ chatDrawer })
    }),
    setAccessUrl: (accessUrl: AccessUrl) => set((_state) => {
        return ({ accessUrl })
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
    updateAssistantList: (assistantList: AssistantResponseData[]) => set((_state: any) => ({ assistantList })),



})))

export async function getAssistantList(appId: number) {
    const state = useAssistantStore.getState();
    const updateAssistantList = state.updateAssistantList;
    const res = await request(`/api/assistant/list?appId=${appId}`);
    const assistantList = res.data;
    if (assistantList) updateAssistantList(assistantList);

}

export async function getAssistant(id: any): Promise<Assistant> {

    const res = await request(`/api/assistant/get?id=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;

}

export async function addAssistant(payload: AssistantRequestPayload) {

    return await request("/api/assistant/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });

}

export async function deleteAssistant(assistantId: any) {
    return await request(`/api/assistant/delete?agentId=${assistantId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

}

export async function updateAssistant(id: any, payload: AssistantRequestPayload) {

    return await request(`/api/assistant/update?id=${id}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });


}

export async function refreshToken(agentId: number) {

    return await request(`/api/assistant/token?agentId=${agentId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });


}


export async function chat(payload: any) {
    const res = await request(`/api/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify(payload),
    });
    return res;
}


export async function getAccessUrl() {
    const res = await request(`/api/assistant/getAccessUrl`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

        }
    });
    return res;
}