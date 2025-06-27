
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { DataSource, DocumentRequestPayload, QuestionRequestPayload } from "types/datasource";
import { request } from 'utils/clientRequest';



interface DataSourceStore {
    loading: boolean,
    open: boolean,
    isEdit: boolean,
    pagination: any,
    currentDataSource: any,
    openUploadModel: boolean,
    dataSourceList: DataSource[],
    setIsEdit: (isEdit: boolean) => void;
    setPagination: (pagination: any) => void;
    setLoading: (loading: boolean) => void;
    setOpen: (open: boolean) => void;
    setOpenUploadModel: (open: boolean) => void;
    setCurrentDataSource: (currentDataSource: DataSource) => void;
    updatedataSourceList: (_: DataSource[]) => void;


}


export const useDataSourceStore = create<DataSourceStore>()(devtools((set) => ({
    dataSourceList: [],
    loading: false,
    open: false,
    isEdit: false,
    openUploadModel: false,
    pagination: {
        page: 1,
        pageSize: 20,
        total: 0
    },
    currentDataSource: {
    },
    setCurrentDataSource: (currentDataSource: any) => set((_state) => {
        return ({ currentDataSource })
    }),
    setPagination: (pagination: any) => set((_state) => {
        return ({ pagination })
    }),
    setIsEdit: (isEdit: boolean) => set((_state) => {
        return ({ isEdit })
    }),
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
    const state = useDataSourceStore.getState();
    const updatedataSourceList = state.updatedataSourceList;
    const res = await request(`/api/dataset/${dataSetId}/datasource/list?dataSetType=${dataSetType}`);
    const dataSourceList = res.data;
    if (dataSourceList)
        updatedataSourceList(dataSourceList);

}



export async function deleteDataSource({ dataSetId, dataSetType, dataSourceId }: { dataSetId: number, dataSetType: number | string, dataSourceId: number | string, }) {
    const res = await request(`/api/dataset/${dataSetId}/datasource/delete?dataSetType=${dataSetType}&dataSourceId=${dataSourceId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    await res;
}

export async function addDataSource({ dataSetId, dataSetType }: { dataSetId: number, dataSetType: number }, payload: DocumentRequestPayload | QuestionRequestPayload) {

    const res = await request(`/api/dataset/${dataSetId}/datasource/create?dataSetType=${dataSetType}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    await res;

}

export async function updateDataSource({ dataSetId, dataSetType, dataSourceId }: { dataSetId: number, dataSetType: number, dataSourceId: any }, payload: DocumentRequestPayload | QuestionRequestPayload) {
    const res = await request(`/api/dataset/${dataSetId}/datasource/update?dataSetType=${dataSetType}&dataSourceId=${dataSourceId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    await res;

}


export async function addDataSourceByUploadFile({ dataSetId }: { dataSetId: number }, payload: any) {
    const res = await request(`/api/dataset/${dataSetId}/datasource/upload`, {
        method: "POST",
        body: payload,
        headers: {}
    });
    await res;

}



