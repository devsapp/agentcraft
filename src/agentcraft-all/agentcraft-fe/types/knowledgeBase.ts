export type IIsPublic = 0 | 1;

export type IIsPublicString = IIsPublic | '0' | '1';


export interface KnowledgeBaseRequestPayload {
    name: string;
    description?: string;
    prompt_template: string;
    app_id: number;
    exact_datasets: any[];
    fuzzy_datasets: any[];
    exact_search_similarity: number;
    fuzzy_search_similarity: number;
    temperature: number;
    top_p: number;
    n_sequences: number;
    max_tokens: number;
    stop: string[];
    presence_penalty: number;
    frequency_penalty: number;
    logit_bias?: string;
    model_id: any;
    redis_ip_ex: number;
    redis_history_ex: number;
    model_ip_limit: number;
    llm_history_len: number;
    system_message?: string;
    exact_search_limit: number;
    fuzzy_search_limit: number;
    is_public: IIsPublic;
}

export interface Dataset {
    id: number;
    dataset_type: number;
    modified: string;
    agent_id: number;
    dataset_id: number;
    created: string;
    dataset_name: string;
}

export interface KnowledgeBase {
    default_answer: string;
    exp: number;
    datasets: Dataset[];
    model_name: string;
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
    app_id: number;
    stop: string[];
    redis_history_ex: number;
    is_public: IIsPublicString;
}



export interface KnowledgeBaseResponseData {
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
    is_public: IIsPublicString;
}