
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { DataSource, DocumentRequestPayload, QuestionRequestPayload } from "@/types/datasource";




interface DataSourceStore {
    loading: boolean,
    open: boolean,
    openUploadModel: boolean,
    dataSourceList: DataSource[],
    setLoading: (loading: boolean) => void;
    setOpen: (open: boolean) => void;
    setOpenUploadModel: (open: boolean) => void;
    updatedataSourceList: (_: DataSource[]) => void;


}


export const useGlobalStore = create<DataSourceStore>()(devtools((set) => ({
    dataSourceList: [],
    loading: false,
    open: false,
    openUploadModel: false,
    setLoading: (status: boolean) => set((_state) => {
        return ({ loading: status })
    }),
    setOpen: (status: boolean) => set((_state) => {
        return ({ open: status })
    }),
    setOpenUploadModel: (status: boolean) => set((_state) => {
        return ({ openUploadModel: status })
    }),
    updatedataSourceList: (dataSourceList: DataSource[]) => set((_state: any) => ({ dataSourceList })),


})))

/**
 * 获取数据源列表
 * @param ddataSetId 
 * @param datasetType 
 */
export async function getDataSourceList(dataSetId: number, dataSetType: number) {
    const state = useGlobalStore.getState();
    const updatedataSourceList = state.updatedataSourceList;
    const res = await fetch(`/api/dataset/${dataSetId}/datasource/list?dataSetType=${dataSetType}`);
    const dataSourceList = (await res.json()).data;
    updatedataSourceList(dataSourceList);

}



export async function deleteDataSource({ dataSetId, dataSetType, dataSourceId }: { dataSetId: number, dataSetType: number | string, dataSourceId: number | string, }) {
    const res = await fetch(`/api/dataset/${dataSetId}/datasource/delete?dataSetType=${dataSetType}&dataSourceId=${dataSourceId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    await res.json();
}

export async function addDataSource({ dataSetId, dataSetType }: { dataSetId: number, dataSetType: number }, payload: DocumentRequestPayload | QuestionRequestPayload) {

    const res = await fetch(`/api/dataset/${dataSetId}/datasource/create?dataSetType=${dataSetType}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    await res.json();

}


export async function addDataSourceByUploadFile({ dataSetId }: { dataSetId: number }, payload: any) {
    console.log(payload);
    const res = await fetch(`/api/dataset/${dataSetId}/datasource/upload`, {
        method: "POST",
        body: payload
    });
    await res.json();

}



