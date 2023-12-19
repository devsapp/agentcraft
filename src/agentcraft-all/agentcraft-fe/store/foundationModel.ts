
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { request } from '@/utils/clientRequest';

import { AGENTCRAFT_FM_PREFIX } from 'constants/foundation-model';


export const enum APP_STATUS {
    INIT = 1,
    CREATING = 2,
    SUCCESS = 3,
    FAILED = 4
}

interface FoundationModelStore {
    loading: boolean,
    createLoading: boolean,
    open: boolean,
    appName: string,
    foundationModelList: any[],
    fmTemplate: any,
    appStatus: APP_STATUS,
    currentFoundationModel: any,
    setAppName: (appName: string) => void;
    setCreateLoading: (loading: boolean) => void;
    setAppStatus: (appStatus: number) => void,
    setOpen: (open: boolean) => void;
    setLoading: (loading: boolean) => void;
    setFmTemplate: (fmTemplate: any) => void,
    setCurrentFoundationModel: (currentFoundationModel: any) => void,
    updateFoundationModelList: (_: any[]) => void;


}


export const useFoundationModelStore = create<FoundationModelStore>()(devtools((set) => ({
    foundationModelList: [],
    loading: false,
    createLoading: false,
    open: false,
    fmTemplate: {},
    appName: '',
    appStatus: APP_STATUS.INIT,
    currentFoundationModel: {},
    setCurrentFoundationModel: (currentFoundationModel) => set((_state) => {
        return ({ currentFoundationModel })
    }),
    setAppStatus: (appStatus: number) => set((_state) => {
        return ({ appStatus })
    }),
    setFmTemplate: (_fmTemplate: any) => set((_state) => {
        return ({ fmTemplate: _fmTemplate })
    }),
    setAppName: (appName: string) => set((_state) => {
        return ({ appName })
    }),
    setCreateLoading: (createLoading: boolean) => set((_state) => {
        return ({ createLoading })
    }),
    setLoading: (status: boolean) => set((_state) => {
        return ({ loading: status })
    }),
    setOpen: (status: boolean) => set((_state) => {
        return ({ open: status })
    }),
    updateFoundationModelList: (foundationModelList: any[]) => set((_state: any) => ({ foundationModelList })),

})))



export async function getFoundationModelList() {
    const state = useFoundationModelStore.getState();
    const updateFoundationModelList = state.updateFoundationModelList;
    const res = await request(`/api/infra/alibaba-cloud/listApps?appFilter=${AGENTCRAFT_FM_PREFIX}`);
    const foundationModelList = res.data;
    if (foundationModelList)
        updateFoundationModelList(foundationModelList);

}



export async function getFoundationModel(appName: string) {

    const res = await request(`/api/infra/alibaba-cloud/getApp?appName=${appName}`);
    return res.data;

}



export async function deleteFoundationModel(appName: string) {
    return await request(`/api/infra/alibaba-cloud/deleteApp?appName=${appName}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function addFoundationModel(template: string, payload: any) {
    const res = await request(`/api/infra/alibaba-cloud/createApp?template=${template}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;

}

