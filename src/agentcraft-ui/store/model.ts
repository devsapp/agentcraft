
import { create } from "zustand";
import { devtools } from "zustand/middleware";


export interface ModelResponseData {
    id: number,
    url: string,
    description: string,
    created: string,
    user_id: number,
    name: string,
    name_alias: string,
    token: string,
    modified: string,
    timeout: number
}

interface ModelStore {
    modelList: ModelResponseData[],
    updateModelList: (_: ModelResponseData[]) => void;
}


export const useGlobalStore = create<ModelStore>()(devtools((set) => ({
    modelList: [],

    updateModelList: (modelList: ModelResponseData[]) => set((_state: any) => ({ modelList })),


})))

export async function getModelList() {
    const state = useGlobalStore.getState();
    const updateModelList = state.updateModelList;
    const res = await fetch("/api/model/list");
    const modelList = await res.json();
    updateModelList(modelList);

}
