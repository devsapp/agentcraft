
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AGENTCRAFT_CHATBOT } from 'constants/index';



export const useChatBotStore = create<any>(persist(
    (set) => ({
        localSessions: [],
        currentLocalSessions: [],
        menuClose: false as boolean,
        setMenuClose: (menuClose: boolean) => set({ menuClose }),
        setLocalSessions: (localSessions: any) => set({ localSessions }),
        setCurrentLocalSessions: (currentLocalSessions: any) => set({ currentLocalSessions }),
    }),
    {
        name: AGENTCRAFT_CHATBOT,
    }
))



