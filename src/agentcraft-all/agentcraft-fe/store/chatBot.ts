
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AGENTCRAFT_CHATBOT } from 'constants/index';
import { nanoid } from 'nanoid';


export const useChatBotStore = create<any>(persist(
    (set) => ({
        localSessions: [],
        currentLocalSessions: [],
        setLocalSessions: (localSessions: any) => set({ localSessions }),
        setCurrentLocalSessions: (currentLocalSessions: any) => set({ currentLocalSessions }),
    }),
    {
        name: AGENTCRAFT_CHATBOT,
    }
))




