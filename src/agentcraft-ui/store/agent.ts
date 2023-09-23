
import { create } from "zustand";
import { devtools } from "zustand/middleware";


export interface AgentResponseData {
    app_id: number;
    stop: any[];
    redis_history_ex: number;
    token: string;
    presence_penalty: number;
    model_ip_limit: number;
    name: string;
    exact_search_similarity: number;
    frequency_penalty: number;
    description: string;
    fuzzy_search_similarity: number;
    logit_bias: string;
    exact_search_limit: number;
    prompt_template: string;
    temperature: number;
    model_id: number;
    fuzzy_search_limit: number;
    created: string;
    top_p: number;
    system_message: string;
    modified: string;
    n_sequences: number;
    llm_history_len: number;
    id: number;
    user_id: number;
    max_tokens: number;
    redis_ip_ex: number;
}

interface AgentStore {
    agentList: AgentResponseData[],
    updateAgentList: (_: AgentResponseData[]) => void;
}


export const useGlobalStore = create<AgentStore>()(devtools((set) => ({
    agentList: [],

    updateAgentList: (agentList: AgentResponseData[]) => set((_state: any) => ({ agentList })),


})))

export async function getAgentList(appId: number) {
    const state = useGlobalStore.getState();
    const updateAgentList = state.updateAgentList;
    const res = await fetch(`/api/agent/list?appId=${appId}`);
    const agentList = await res.json();
    updateAgentList(agentList);

}
