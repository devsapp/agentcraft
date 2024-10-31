
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AGENTCRAFT_FM_QWEN_BIZ } from 'constants/foundation-model';
import { AGENTCRAFT_QUICK_START } from 'constants/index';
import { request } from 'utils/clientRequest';
export const enum QuickStartStep {
    LLM_PROXY = 0,
    AGENT = 1
}

interface LLM_PROXY_CONFIG {
    region: string,
    name: string,
    apiKey: string,
    model: string,
    description: string,
}

interface DATA_ALL_CONFIG {
    name: string,
    description: string,
    file: string,
    title: string,
    chunck_size: string,
    url: string
}

interface KNOWLEDGE_BASE_CONFIG {
    name: string,
    description: string,
    system_prompt: string,
    prompt_template: string,
    data_set_id: string,
    llm_proxy_id: string
}

interface QuickStartConfig {
    llm_proxy_config: LLM_PROXY_CONFIG,
    data_all_config: DATA_ALL_CONFIG,
    knowledge_base_config: KNOWLEDGE_BASE_CONFIG
}


export const useQuickStartStore = create<any>(persist(
    (set) => ({
        autoQuickStart: true,
        activeStep: QuickStartStep.LLM_PROXY,
        dataSetId: [],
        modelId: '',
        currentAgentType: 'instructionChat',
        configStepStatus: {
            llm_proxy_config_ready: false,
            llm_proxy_create_loading: false,
            data_all_config_ready: false,
            data_all_create_loading: false,
            knowledge_base_config_ready: false,
            knowledge_base_create_loading: false,
        },
        quickStartConfig: {
            llm_proxy_config: {} as LLM_PROXY_CONFIG,
            data_all_config: {} as DATA_ALL_CONFIG,
            knowledge_base_config: {} as KNOWLEDGE_BASE_CONFIG
        } as QuickStartConfig,
        setDataSetId: (dataSetId: []) => set(() => {
            return ({ dataSetId })
        }),
        setCurrentAgentType: (currentAgentType: string) => set(() => {
            return ({ currentAgentType })
        }),
        setModelId: (modelId: any) => set(() => {
            return ({ modelId })
        }),
        setConfigStepStatus: (configStepStatus: any) => {
            set({ configStepStatus });
        },
        setQuickStartConfig: (quickStartConfig: QuickStartConfig) => {
            set({ quickStartConfig });
        },
        setActiveStep: (activeStep: QuickStartStep) => {
            set({ activeStep });
        },
        setAutoQuickStart: (autoQuickStart: boolean) => {
            set({ autoQuickStart });
        },

    }),
    {
        name: AGENTCRAFT_QUICK_START,
    }
))

function checkAppStatus(appName: string): Promise<any> {

    return new Promise((resolve, reject) => {

        const timmer = setInterval(async () => {
            try {
                const result: any = await request(`/api/infra/alibaba-cloud/getApp?appName=${appName}`);
                const release = result.data.lastRelease;
                if (release.status === 'published') {
                    clearInterval(timmer);
                    resolve(release);
                }
            } catch (e) {
                // 忽略超时 
                // reject(e);
            }

        }, 4000);

    })


}

export async function createFoundationModelOnly(payload: any) {

    const createAppPayload = {
        description: payload.description,
        region: payload.region,
        apiKey: payload.apiKey,
        name: payload.name,
    }


    const res = await request(`/api/infra/alibaba-cloud/createApp?template=${AGENTCRAFT_FM_QWEN_BIZ}`, {
        method: "POST",
        body: JSON.stringify(createAppPayload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res?.data?.name;

}
export async function checkFoundationModelStatusAndLLMProxy(appName: string, payload: any) {

    const appInfo = await checkAppStatus(appName);
    // const domainData: any = appInfo?.output?.deploy['domain'];
    // const appUrl = domainData.domainName;
    let system_url = '';
    try {
        system_url = appInfo?.output?.deploy?.apiServer?.url?.system_url;
    } catch (e) {
        console.log(e);
    }
    const llmProxyPayload = {
        name: payload.model,
        name_alias: payload.name_alias,
        url: `${system_url}/v1/chat/completions`,
        token: '',
        description: '',
        timeout: 600
    };

    const llmProxyResult = await request("/api/model/create", {
        method: "POST",
        body: JSON.stringify(llmProxyPayload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return llmProxyResult.data.id
}

export async function createDataAll(payload: any) {
    const datasetPayload = {
        name: payload.name,
        dataset_type: 2,
        description: payload.description || '数据集',
    }
    const result = await request("/api/dataset/create", {
        method: "POST",
        body: JSON.stringify(datasetPayload),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const datasetId = result.data.id;
    const datasourcePayload = new FormData();
    datasourcePayload.append('file', payload.file);
    datasourcePayload.append('title', payload.title);
    datasourcePayload.append('chunk_size', payload.chunk_size);
    datasourcePayload.append('url', payload.url);
    await request(`/api/dataset/${datasetId}/datasource/upload`, {
        method: "POST",
        body: datasourcePayload,
        headers: {}
    });
    return datasetId
}


export async function createKnowledgeBaseApp(payload: any) {

    const appPayload = {
        name: payload.name,
        description: payload.description,
    }
    const app = await request("/api/application/create", {
        method: "POST",
        body: JSON.stringify(appPayload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const appId = app.data.id;
    payload.app_id = appId;
    await request("/api/knowledgeBase/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return appId;

}

