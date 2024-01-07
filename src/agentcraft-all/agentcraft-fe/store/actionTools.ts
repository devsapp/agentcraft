
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ResponseData } from 'types/httpStatus';
import { request } from 'utils/clientRequest';

import { IActionTool } from 'types/actionTools';
export interface ActionToolsRequestPayload {
    name: string,
    description: string
}

interface ActionToolsStore {
    toolList: IActionTool[],
    isEdit: boolean,
    functionList: [],
    open: boolean,
    loading: boolean,
    currentActionTool: IActionTool,
    setEditStatus: (loading: boolean) => void;
    setCurrentActionTool: (currentActionTool: IActionTool) => void;
    updateFunctionList: (_: []) => void;
    updateToolList: (_: IActionTool[]) => void;
    setLoading: (loading: boolean) => void;
    setOpen: (open: boolean) => void;
}


export const useActionToolStore = create<ActionToolsStore>()(devtools((set) => ({
    toolList: [],
    open: false,
    loading: false,
    isEdit: false,
    functionList: [],
    currentActionTool: {} as IActionTool,
    updateFunctionList: (functionList: []) => set((_state: any) => ({ functionList })),
    updateToolList: (toolList: IActionTool[]) => set((_state: any) => ({ toolList })),
    setLoading: (status: boolean) => set((_state) => {
        return ({ loading: status })
    }),
    setCurrentActionTool: (currentActionTool: IActionTool) => set((_state) => {
        return ({ currentActionTool })
    }),
    setEditStatus: (isEdit: boolean) => set((_state) => {
        return ({ isEdit })
    }),
    setOpen: (status: boolean) => set((_state) => {
        return ({ open: status })
    }),

})))

export async function getToolList() {
    const state = useActionToolStore.getState();
    const updateToolList = state.updateToolList;
    const res: ResponseData = await request("/api/actionTools/list");
    const data = res.data;
    if (data) {
        updateToolList(data);
    }

}

export async function deleteTool(id: any) {
    return await request(`/api/actionTools/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "actionTools/json",
        },
    });

}

export async function addTool(payload: ActionToolsRequestPayload) {

    return await request("/api/actionTools/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "actionTools/json",
        },
    });


}

export async function updateTool(toolId: any, payload: any) {
    return await request(`/api/actionTools/update?id=${toolId}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "actionTools/json",
        },
    });

}


export async function getFunctionList(payload: any) {

    const res = await request("/api/actionTools/functionList", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "actionTools/json",
        },
    });

    const data = res.data;
    return data;

}
