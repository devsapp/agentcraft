
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ResponseData } from 'types/httpStatus';
import { request } from 'utils/clientRequest';
import { IActionTool } from 'types/actionTools';
export interface ActionToolsRequestPayload {
    name: string,
    description: string
}

interface IFunctionListItem {
    label: string,
    value: string
}

interface ActionToolsStore {
    toolList: IActionTool[],
    isEdit: boolean,
    functionList: IFunctionListItem[],
    currentToolForm: any,
    open: boolean,
    openToolForm: boolean, // 是否打开工具表单
    openToChoose: boolean,
    loading: boolean,
    loadingForChoose: boolean
    currentActionTool: IActionTool,
    setCurrentToolForm: (currentToolForm: {}) => void;
    setEditStatus: (loading: boolean) => void;
    setCurrentActionTool: (currentActionTool: IActionTool) => void;
    updateFunctionList: (_: []) => void;
    updateToolList: (_: IActionTool[]) => void;
    setLoading: (loading: boolean) => void;
    setLoadingForChoose: (loading: boolean) => void;
    setOpenToolForm: (open: boolean) => void;
    setOpen: (open: boolean) => void;
    setOpenToChoose: (open: boolean) => void;
}


export const useActionToolStore = create<ActionToolsStore>()(devtools((set) => ({
    toolList: [],
    open: false,
    openToolForm: false,
    currentToolForm: {functionConfig:{}},
    openToChoose: false,
    loading: false,
    loadingForChoose: false,
    isEdit: false,
    functionList: [],
    currentActionTool: {} as IActionTool,
    updateFunctionList: (functionList: IFunctionListItem[]) => set((_state: any) => ({ functionList })),
    updateToolList: (toolList: IActionTool[]) => set((_state: any) => ({ toolList })),
    setLoading: (status: boolean) => set((_state) => {
        return ({ loading: status })
    }),
    setCurrentToolForm: (currentToolForm: any) => set((_state: any) => ({ currentToolForm })),
    setLoadingForChoose: (status: boolean) => set((_state) => {
        return ({ loadingForChoose: status })
    }),
    setCurrentActionTool: (currentActionTool: IActionTool) => set((_state) => {
        return ({ currentActionTool })
    }),
    setEditStatus: (isEdit: boolean) => set((_state) => {
        return ({ isEdit })
    }),
    setOpenToolForm: (status: boolean) => set((_state) => {
        return ({ openToolForm: status })
    }),
    setOpen: (status: boolean) => set((_state) => {
        return ({ open: status })
    }),
    setOpenToChoose: (status: boolean) => set((_state) => {
        return ({ openToChoose: status })
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
    return data;

}

export async function deleteTool(id: any) {
    return await request(`/api/actionTools/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "actionTools/json",
        },
    });

}

export async function addTool(payload: any) {

    const res = await request("/api/actionTools/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "actionTools/json",
        },
    });

    return res.data;


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

