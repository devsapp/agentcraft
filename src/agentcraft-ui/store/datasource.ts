
import { create } from "zustand";
import { devtools } from "zustand/middleware";



export interface DatasourceResponseData {
    id: number,
    title: string,
    url: string,
    tag: number,
    doc_chunk: string,
    chunk_idx: number,
    token_size: number,

    created: string,
    modified: string
}

interface DatasourceStore {
    datasourceList: DatasourceResponseData[],
    updateDatasourceList: (_: DatasourceResponseData[]) => void;
}


export const useGlobalStore = create<DatasourceStore>()(devtools((set) => ({
    datasourceList: [],

    updateDatasourceList: (datasourceList: DatasourceResponseData[]) => set((_state: any) => ({ datasourceList })),


})))

export async function getDatasourceList(datasetId: number, datasetType: number) {
    const state = useGlobalStore.getState();
    const updateDatasourceList = state.updateDatasourceList;
    const res = await fetch(`/api/dataset/${datasetId}/datasource/list?datasetType=${datasetType}&datasetId=${datasetId}`);
    const datasourceList = await res.json();
    updateDatasourceList(datasourceList);

}
