
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { request } from 'utils/clientRequest';

// TODO: 声明 historyItem
interface ChatStore {
    loading: boolean,
    history: any[],
    setLoading: (loading: boolean) => void;
    updateHistory: (history: any[]) => void;
}


export const useAssistantChatStore = create<ChatStore>()(devtools((set) => ({
    history: [],
    loading: false,
    setLoading: (status: boolean) => set((_state) => {
        return ({ loading: status })
    }),
    updateHistory: (history: any[]) => set((_state) => {
        return ({ history })
    }),
})))


/**
 * 获取数据集列表
 */
export async function getHistory(id: number) {
    const { setLoading, updateHistory } = useAssistantChatStore.getState();
    setLoading(true);
    const res = await request(`/api/assistantChat/list?id=${id}`);
    const data = res.data;
    if (data) {
        updateHistory(data);
    }
    setLoading(false);
}