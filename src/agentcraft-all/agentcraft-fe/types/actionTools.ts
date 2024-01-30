
export enum ActionToolType {
    FUNCTION = 1,
    PROXY = 2
}

export enum ActionToolStatus {
    CREATING = 1,
    READY = 2,
    UNREADY = 3
}
export interface IActionTool {
    id?: number,
    name: string,
    alias: string,
    description: string,
    proxy_url: string,
    input_schema: string,
    output_schema?: string,
    type: ActionToolType,
    author: string,
    status: ActionToolStatus,
    user_id?: number,
    created?: string,
    modified?: string,
 
}


 