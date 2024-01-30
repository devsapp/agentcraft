
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface AgentStore {
    open: boolean,
    loading: boolean,
    setLoading: (loading: boolean) => void;
    setOpen: (open: boolean) => void;
}


export const useAgentStore = create<AgentStore>()(devtools((set) => ({
    open: false,
    loading: false,
    setLoading: (status: boolean) => set((_state) => {
        return ({ loading: status })
    }),
    setOpen: (status: boolean) => set((_state) => {
        return ({ open: status })
    })
})));


