
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { request } from 'utils/clientRequest';

interface ShareStore {
    shareToken: string,

}


export const useModelStore = create<ShareStore>()(devtools((set) => ({
    shareToken: "",
    setShareToken: (shareToken: string) => set((_state) => {
        return ({ shareToken })
    }),

})))

export async function createShare(agentId: string) {
    const result = await request("/api/share/create", {
        method: "POST",
        body: JSON.stringify({ agentId }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return result.data;
}

