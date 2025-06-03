
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { request } from 'utils/clientRequest';
import {  UpsertMcpRequest } from 'types/mcp';



interface McpStore {
    loading: boolean,
    createLoading: boolean,
    open: boolean,
    appName: string,
    mcpList: any[],
    mcpTemplate: any,
    currentFoundationModel: any,
    setAppName: (appName: string) => void;
    setCreateLoading: (loading: boolean) => void;
    setOpen: (open: boolean) => void;
    setLoading: (loading: boolean) => void;
    setMcpTemplate: (fmTemplate: any) => void,
    setCurrentMcp: (currentMcp: any) => void,
    updateMcpList: (_: any[]) => void;


}


export const useMcpStore = create<McpStore>()(devtools((set) => ({
    mcpList: [],
    loading: false,
    createLoading: false,
    open: false,
    mcpTemplate: {},
    appName: '',
   
    currentFoundationModel: {},
    setCurrentMcp: (currentMcp: any) => set((_state) => {
        return ({ currentFoundationModel: currentMcp })
    }),
    setMcpTemplate: (_mcpTemplate: any) => set((_state) => {
        return ({ mcpTemplate: _mcpTemplate })
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
    updateMcpList: (mcpList: any[]) => set((_state: any) => ({ mcpList })),

})))


export async function getMcpList() {
    const { updateMcpList } = useMcpStore.getState();
    const result = await request(`/api/mcp/list`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = result.data;
    if (data) {
        updateMcpList(data);
    }
    return result;
}

export async function getMcp(projectName: string, serviceName: string) {
    const result = await request(`/api/mcp`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(result);
    return result;
}

export async function addMcp(payload: any) {
    const result = await request("/api/mcp/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return result;
}

export async function deleteMcp(id: any) {
    return await request(`/api/mcp/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}


