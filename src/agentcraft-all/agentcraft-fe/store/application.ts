
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ResponseData } from 'types/httpStatus';
import { request } from 'utils/clientRequest';
export interface ApplicationResponseData {
    created: string,
    description: string,
    id: number,
    modified: string,
    name: string
    user_id: string
}

export interface ApplicationRequestPayload {
    name: string,
    description: string
}

interface ApplicationStore {
    appList: ApplicationResponseData[],
    open: boolean,
    loading: boolean,
    updateAppList: (_: ApplicationResponseData[]) => void;
    setLoading: (loading: boolean) => void;
    setOpen: (open: boolean) => void;
}


export const useAppStore = create<ApplicationStore>()(devtools((set) => ({
    appList: [],
    open: false,
    loading: false,
    updateAppList: (appList: ApplicationResponseData[]) => set((_state: any) => ({ appList })),
    setLoading: (status: boolean) => set((_state) => {
        return ({ loading: status })
    }),
    setOpen: (status: boolean) => set((_state) => {
        return ({ open: status })
    }),

})))

export async function getApplications() {
    const state = useAppStore.getState();
    const updateAppList = state.updateAppList;
    const res: ResponseData = await request("/api/application/list");
    const data = res.data;
    if (data) {
        updateAppList(data);
    }

}

export async function deleteApplication(id: number) {
    return await request(`/api/application/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

}

export async function addApplication(payload: ApplicationRequestPayload) {

    return await request("/api/application/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });


}
