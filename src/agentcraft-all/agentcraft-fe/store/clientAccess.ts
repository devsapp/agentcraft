
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { DING_TALK_BRIDGE_APP_PARAMS } from 'types/clientAccess';
import { DevsAppParamsBase } from 'types/serverless-devs-app';
import { createServerlessApp } from 'store/infra';
import { AGENTCRAFT_CLIENT_DINGTALK, ROBOT_CONFIG_STEP, AGENTCRAFT_CLIENT_PREFIX } from 'constants/client-access';
import { request } from 'utils/clientRequest';


export interface RobotProxyServiceConfig {
    agentToken: string,
    agentUrl: string,
}

export interface RobotWebhookConfig {

}


export interface RobotConfig {

}



export const useClientAccessStore = create<any>(devtools(
    (set) => ({
        clientAccessList: [],
        loading: false,
        activeStep: ROBOT_CONFIG_STEP.AGENT_SERVICE,
        agents: [],
        selectedAgent: {},
        robotStepStatus: {
            robot_proxy_service_create_loading: false,
            robot_webhook_create_loading: false,
        },
        robotConfig: {
            robotProxyServiceConfig: {},
            robotWebhookConfig: {}
        },
        setLoading: (status: boolean) => set(() => {
            return ({ loading: status })
        }),
        setOpen: (status: boolean) => set(() => {
            return ({ open: status })
        }),
        updateClientAccessList: (clientAccessList: any[]) => set((_state: any) => ({ clientAccessList })),
        setActiveStep: (activeStep: ROBOT_CONFIG_STEP) => {
            set({ activeStep });
        },
        setRobotConfig: (robotConfig: any) => {
            set({ robotConfig });
        },
        setRobotStepStatus: (robotStepStatus: any) => {
            set({ robotStepStatus });
        },

    })
))



export async function createChatBotBridgeService(appName: string, params: any) {
    return await createServerlessApp(appName, params);

}

export async function createEventbus(payload: any) {

    return await request("/api/clientAccess/eventbus", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });


}



export async function getClientAccessList() {

    const state = useClientAccessStore.getState();
    const updateClientAccessList = state.updateClientAccessList;
    const res = await request(`/api/infra/alibaba-cloud/listApps?appFilter=${AGENTCRAFT_CLIENT_PREFIX}`);
    const clientAccessList = res.data;
    if (clientAccessList)
        updateClientAccessList(clientAccessList);

}

export async function deleteClientAccess(appName: string) {
    return await request(`/api/infra/alibaba-cloud/deleteApp?appName=${appName}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}