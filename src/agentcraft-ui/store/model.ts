
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ModelRequestPayload, Model } from "@/types/model";


interface ModelStore {
    modelList: Model[],
    loading: boolean,
    open: boolean,
    isEdit: boolean,
    currentModel?: Model,
    updateCurrentModel: (_: Model) => void;
    updateModelList: (_: Model[]) => void;
    setLoading: (loading: boolean) => void;
    setEditStatus: (loading: boolean) => void;
    setOpen: (open: boolean) => void;
}


export const useGlobalStore = create<ModelStore>()(devtools((set) => ({
    modelList: [],
    loading: false,
    open: false,
    isEdit: false,
    updateCurrentModel: (currentModel: Model) => set((_state) => {
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
    const state = useGlobalStore.getState();
    const updateModelList = state.updateModelList;
    const res = await fetch("/api/model/list");
    const modelList = await res.json();
    updateModelList(modelList);

}

export async function deleteModel(id: number) {
    const res = await fetch(`/api/model/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    await res.json();
}

export async function addModel(payload: ModelRequestPayload) {

    const res = await fetch("/api/model/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    await res.json();

}


export async function updateModel(modelId: any, payload: ModelRequestPayload) {

    const res = await fetch(`/api/model/update?id=${modelId}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    await res.json();

}
