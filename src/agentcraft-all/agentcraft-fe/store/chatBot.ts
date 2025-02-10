
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AGENTCRAFT_SHARE } from 'constants/index';
import { nanoid } from 'nanoid';

const DEFAULT_SESSION_ID = 'share-a2AbiN3PQMaugZZST7T5m'; //`share-${nanoid()}`;
const DEFAULT_LOCAL_SESSIONG_DATA = { value: DEFAULT_SESSION_ID, label: '对话' };
export const useChatBotStore = create<any>(persist(
    (set) => ({
        localSessions: [DEFAULT_LOCAL_SESSIONG_DATA],
        currentLocalSession: DEFAULT_LOCAL_SESSIONG_DATA,
        setLocalSessions: (localSessions: any) => set({ localSessions }),
        setCurrentLocalSession: (currentLocalSession: any) => set({ currentLocalSession }),
    }),
    {
        name: AGENTCRAFT_SHARE,
    }
))




