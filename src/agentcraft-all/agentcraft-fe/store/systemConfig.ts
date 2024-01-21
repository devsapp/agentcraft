
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AGENTCRAFT_SYSTEMCONFIG_COMPLETED } from 'constants/index';
import { request } from 'utils/clientRequest';
export const enum SystemConfigStep {
    EMBEDDING_SERVICE = 0,
    DATABASE = 1,
    COMPLETE = 2
}
export interface VpcInfo {
    vpcName: string,
    vpcId: string
}
export interface CompleteConfigData {
    regionId: string,
    EMBEDDING_URL: string,
    vpcInfo: VpcInfo
}



export const useSystemConfigStore = create<any>(persist(
    (set) => ({
        completeConfig: {},
        hiddenConfigView: false,
        embeddingConfig: {
            EMBEDDING_DIM: '1024',
            EMBEDDING_URL: ''
        },
        databaseConfig: {
            POSTGRES_HOST: '',
            POSTGRES_DATABASE: '',
            POSTGRES_USER: '',
            POSTGRES_PASSWORD: ''
        },
        activeStep: SystemConfigStep.EMBEDDING_SERVICE,
        setHiddenConfigView: (hiddenConfigView: boolean) => set({ hiddenConfigView }),
        setEmbeddingConfig: (embeddingConfig: any) => set({ embeddingConfig }),
        setDatabaseConfig: (databaseConfig: any) => set({ databaseConfig }),
        setActiveStep: (activeStep: SystemConfigStep) => set({ activeStep }),
        setCompleteConfig: (completeConfig: any) => set({ completeConfig }),
    }),
    {
        name: AGENTCRAFT_SYSTEMCONFIG_COMPLETED,
    }
))





export async function getSystemConfig() {
    const result: any = await request(`/api/systemConfig/init`);
    const state: any = useSystemConfigStore.getState();
    const setCompleteConfig = state.setCompleteConfig;
    const setHiddenConfigView = state.setHiddenConfigView;
    setCompleteConfig(result?.data || {});
    result?.data?.systemReady ? setHiddenConfigView(true) : setHiddenConfigView(false);
}


export async function updateSystemConfig(payload: any) {
    return await request("/api/systemConfig/update", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

