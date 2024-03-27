export interface ModelRequestPayload {
    name: string;
    name_alias: string;
    description?: string;
    url: string;
    token?: string;
    timeout?: number;
}

export interface Model {
    id: number,
    url: string,
    description: string,
    created: string,
    user_id: number,
    name: string,
    name_alias: string,
    token: string,
    modified: string,
    timeout: number
}


export interface FM_INFO {
    system_intranet_url: string,
    app_template: string
}