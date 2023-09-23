
import { create } from "zustand";
import { devtools } from "zustand/middleware";


export interface DatasetResponseData {
    id: number,
    description: string,
    created: string,
    user_id: number,
    name: string,
    dataset_type: number, // 1 question 精确数据集 2 document 模糊数据集
    modified: string
}

interface DatasetStore {
    datasetList: DatasetResponseData[],
    updateDatasetList: (_: DatasetResponseData[]) => void;
}


export const useGlobalStore = create<DatasetStore>()(devtools((set) => ({
    datasetList: [],

    updateDatasetList: (datasetList: DatasetResponseData[]) => set((_state: any) => ({ datasetList })),


})))

export async function getDatasetList() {
    const state = useGlobalStore.getState();
    const updateDatasetList = state.updateDatasetList;
    const res = await fetch("/api/dataset/list");
    const datasetList = await res.json();
    updateDatasetList(datasetList);

}
