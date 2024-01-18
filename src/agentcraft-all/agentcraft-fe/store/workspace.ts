
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ResponseData } from 'types/httpStatus';
import { request } from 'utils/clientRequest';

export interface WorkspaceResponseData {
    created: string,
    description: string,
    id: number,
    modified: string,
    name: string
    user_id: string
}

export interface WorkspaceRequestPayload {
    name: string,
    description: string
}

interface WorkspaceStore {
    workspaceList: WorkspaceResponseData[],
    open: boolean,
    loading: boolean,
    currentWorkspace: any,
    updateAppList: (_: WorkspaceResponseData[]) => void;
    setCurrentWorkspace: (currentWorkspace: any) => void;
    setLoading: (loading: boolean) => void;
    setOpen: (open: boolean) => void;
}



export const useWorkspaceStore = create<WorkspaceStore>()(devtools((set) => ({
    workspaceList: [],
    open: false,
    loading: false,
    currentWorkspace: null,
    updateAppList: (workspaceList: WorkspaceResponseData[]) => set((_state: any) => ({ workspaceList })),
    setCurrentWorkspace: (currentWorkspace: any) => set((_state) => {
        return ({ currentWorkspace })
    }),
    setLoading: (status: boolean) => set((_state) => {
        return ({ loading: status })
    }),
    setOpen: (status: boolean) => set((_state) => {
        return ({ open: status })
    }),

})))

export async function getWorkspaceList() {
    const state = useWorkspaceStore.getState();
    const { updateAppList, currentWorkspace, setCurrentWorkspace } = state;
    const res: ResponseData = await request("/api/workspace/list");
    const data = res.data;
    if (data) {
        updateAppList(data);
        if(!currentWorkspace) {
            setCurrentWorkspace(data[0].id);
        }
    }

}

export async function deleteWorkspace(id: number) {
    return await request(`/api/workspace/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

}

export async function addWorkspace(payload: WorkspaceRequestPayload) {

    return await request("/api/workspace/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });


}
