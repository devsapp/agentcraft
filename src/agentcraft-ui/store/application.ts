
import { create } from "zustand";
import { devtools } from "zustand/middleware";


export interface ApplicationResponseData {
    created: string,
    description: string,
    id: string,
    modified: string,
    name: string
    user_id: string
}

interface ApplicationStore {
    appList: ApplicationResponseData[],
    open: boolean,
    loading: boolean,
    updateAppList: (_: ApplicationResponseData[]) => void;
    setLoading:(loading: boolean)=>void;
    setOpen:(open: boolean)=>void;
}


export const useGlobalStore = create<ApplicationStore>()(devtools((set) => ({
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
    const state = useGlobalStore.getState();
    const updateAppList = state.updateAppList;
    const res = await fetch("/api/application/list");
    const appList = await res.json();
    updateAppList(appList);

}
