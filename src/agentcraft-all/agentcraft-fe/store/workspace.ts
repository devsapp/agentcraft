
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ResponseData } from 'types/httpStatus';
import { request } from 'utils/clientRequest';
import { AGENTCRAFT_WORKSPACE } from 'constants/workspace';
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
    updateAppList: (_: WorkspaceResponseData[]) => void;
    setLoading: (loading: boolean) => void;
    setOpen: (open: boolean) => void;
}

export const useLocalWorkspaceStore = create<any>(persist(
    (set) => ({
        currentWorkspace: null,
        setCurrentWorkspace: (currentWorkspace: any) => set((_state: any) => {
            return ({ currentWorkspace })
        }),
    }),
    {
        name: AGENTCRAFT_WORKSPACE,
    }
))

export const useWorkspaceStore = create<WorkspaceStore>()(devtools((set) => ({
    workspaceList: [],
    open: false,
    loading: false,
    updateAppList: (workspaceList: WorkspaceResponseData[]) => set((_state: any) => ({ workspaceList })),
    setLoading: (status: boolean) => set((_state) => {
        return ({ loading: status })
    }),
    setOpen: (status: boolean) => set((_state) => {
        return ({ open: status })
    }),

})))

export async function getWorkspaceListAndSetCurrent() {
    const state = useWorkspaceStore.getState();
    const _localState = useLocalWorkspaceStore.getState();
    const { updateAppList, } = state;
    const { currentWorkspace, setCurrentWorkspace } = _localState;
    const data = await getWorkspaceList();
    if (data) {
        if (!currentWorkspace) {
            setCurrentWorkspace(data[0].id);
        } else {
            setCurrentWorkspace(currentWorkspace);
        }
        updateAppList(data);
    }

}

export async function getWorkspaceList() {
    const res: ResponseData = await request("/api/workspace/list");
    const data = res.data;
    return data;
}

export async function deleteWorkspace(id: number) {
    return await request(`/api/workspace/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

}
export async function updateWorkspace(id: number, payload: WorkspaceRequestPayload) {

    return await request(`/api/workspace/update?id=${id}`, {
        method: "POST",
        body: JSON.stringify(payload),
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
