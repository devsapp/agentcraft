
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { DataSetRequestPayload, DataSet } from '@/types/dataset'


interface DataSetStore {
    loading: boolean,
    dataSetList: DataSet[],
    open: boolean,
    setLoading: (loading: boolean) => void;
    updateDataSetList: (_: DataSet[]) => void;
    setOpen: (open: boolean) => void;
}

export const useGlobalStore = create<DataSetStore>()(devtools((set) => ({
    dataSetList: [],
    open: false,
    loading: false,
    updateDataSetList: (dataSetList: DataSet[]) => set((_state: any) => ({ dataSetList })),
    setLoading: (status: boolean) => set((_state) => {
        return ({ loading: status })
    }),
    setOpen: (status: boolean) => set((_state) => {
        return ({ open: status })
    }),

})))



/**
 * 获取数据集列表
 */
export async function getDataSetList() {
    const state = useGlobalStore.getState();
    const updatedataSetList = state.updateDataSetList;
    const res = await fetch("/api/dataset/list");
    const data = (await res.json()).data;
    updatedataSetList(data);

}

export async function deleteDataSet(id: number) {
    const res = await fetch(`/api/dataset/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    await res.json();
}

export async function addDataSet(payload: DataSetRequestPayload) {

    const res = await fetch("/api/dataset/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    await res.json();

}


