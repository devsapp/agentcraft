
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { KnowledgeBaseRequestPayload, KnowledgeBaseResponseData, KnowledgeBase } from '@/types/knowledgeBase';
import { request } from '@/utils/clientRequest';


interface KnowledgeBaseStore {
    knowledgeBaseList: KnowledgeBaseResponseData[],
    open: boolean,
    loading: boolean,
    isEdit: boolean,
    currentKnowledgeBase?: KnowledgeBase,
    knowledgeBaseChatList: any[],
    setLoading: (loading: boolean) => void;
    setOpen: (open: boolean) => void;
    setEditStatus: (isEdit: boolean) => void;
    updateCurrentKnowledgeBase: (_: KnowledgeBase) => void;
    updateKnowledgeBaseList: (_: KnowledgeBaseResponseData[]) => void;
}


export const useGlobalStore = create<KnowledgeBaseStore>()(devtools((set) => ({
    knowledgeBaseList: [],
    knowledgeBaseChatList: [],
    open: false,
    loading: false,
    isEdit: false,
    updateCurrentKnowledgeBase: (currentKnowledgeBase: KnowledgeBase) => set((_state) => {
        return ({ currentKnowledgeBase })
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
    updateKnowledgeBaseList: (knowledgeBaseList: KnowledgeBaseResponseData[]) => set((_state: any) => ({ knowledgeBaseList })),
   


})))

export async function getKnowledgeBaseList(appId: number) {
    const state = useGlobalStore.getState();
    const updateKnowledgeBaseList = state.updateKnowledgeBaseList;
    const res = await request(`/api/knowledgeBase/list?appId=${appId}`);
    const knowledgeBaseList = res.data;
    if (knowledgeBaseList) updateKnowledgeBaseList(knowledgeBaseList);

}

export async function getKnowledgeBase(id: any): Promise<KnowledgeBase> {

    const res = await request(`/api/knowledgeBase/get?id=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;

}

export async function addKnowledgeBase(payload: KnowledgeBaseRequestPayload) {

    return await request("/api/knowledgeBase/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });

}

export async function updateKnowledgeBase(id: any, payload: KnowledgeBaseRequestPayload) {

    return await request(`/api/knowledgeBase/update?id=${id}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });


}

export async function refreshToken(agentId: number) {

    return await request(`/api/knowledgeBase/token?agentId=${agentId}`, {
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