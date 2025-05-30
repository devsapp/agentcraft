
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { request } from 'utils/clientRequest';
import { AgenticAppStatus, UpsertAgenticAppRequest } from '@/types/agenticApp';



interface AgenticAppStore {
    loading: boolean,
    createLoading: boolean,
    open: boolean,
    appName: string,
    agenticAppList: any[],
    AgenticAppTemplate: any,
    appStatus: AgenticAppStatus,
    currentFoundationModel: any,
    setAppName: (appName: string) => void;
    setCreateLoading: (loading: boolean) => void;
    setAppStatus: (appStatus: number) => void,
    setOpen: (open: boolean) => void;
    setLoading: (loading: boolean) => void;
    setAgenticAppTemplate: (fmTemplate: any) => void,
    setCurrentAgenticApp: (currentAgenticApp: any) => void,
    updateAgenticAppList: (_: any[]) => void;


}


export const useAgenticAppStore = create<AgenticAppStore>()(devtools((set) => ({
    agenticAppList: [],
    loading: false,
    createLoading: false,
    open: false,
    AgenticAppTemplate: {},
    appName: '',
    appStatus: AgenticAppStatus.CREATE_TOOL_MCP,
    currentFoundationModel: {},
    setCurrentAgenticApp: (currentAgenticApp: any) => set((_state) => {
        return ({ currentFoundationModel: currentAgenticApp })
    }),
    setAppStatus: (appStatus: number) => set((_state) => {
        return ({ appStatus })
    }),
    setAgenticAppTemplate: (_AgenticAppTemplate: any) => set((_state) => {
        return ({ AgenticAppTemplate: _AgenticAppTemplate })
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
    updateAgenticAppList: (agenticAppList: any[]) => set((_state: any) => ({ agenticAppList })),

})))



export async function getAgenticAppList() {
    const {updateAgenticAppList} = useAgenticAppStore.getState();
    const result = await request(`/api/agenticApp/list`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = result.data;
    if (data) {
        updateAgenticAppList(data);
    }
    return result;
}

export async function getAgenticApp(projectName: string, serviceName: string) {
    const result = await request(`/api/agenticApp`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(result);
    return result;
}



export async function addAgenticApp(payload: UpsertAgenticAppRequest) {
    const result = await request("/api/agenticApp/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return result;
}




export async function deleteAgenticApp(appName: string) {

}


