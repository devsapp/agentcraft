
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ModelRequestPayload, Model } from "types/model";
import { request } from 'utils/clientRequest';

interface ModelStore {
    modelList: Model[],
    loading: boolean,
    open: boolean,
    isEdit: boolean,
    currentModel?: Model,
    setCurrentModel: (_: Model) => void;
    updateModelList: (_: Model[]) => void;
    setLoading: (loading: boolean) => void;
    setEditStatus: (loading: boolean) => void;
    setOpen: (open: boolean) => void;
}


export const useModelStore = create<ModelStore>()(devtools((set) => ({
    modelList: [],
    loading: false,
    open: false,
    isEdit: false,
    setCurrentModel: (currentModel: Model) => set((_state) => {
        return ({ currentModel })
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
    updateModelList: (modelList: Model[]) => set((_state: any) => ({ modelList })),


})))

export async function getModelList() {
    const state = useModelStore.getState();
    const updateModelList = state.updateModelList;
    const res = await request("/api/model/list");
    const modelList = await res.data;
    if (modelList) {
        updateModelList(modelList);
    }
}

export async function deleteModel(id: number) {
    return await request(`/api/model/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

}

export async function addModel(payload: ModelRequestPayload) {

    return await request("/api/model/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    

}


export async function updateModel(modelId: any, payload: ModelRequestPayload) {

    return await request(`/api/model/update?id=${modelId}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });


}
