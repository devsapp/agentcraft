export enum AgenticAppStatus {
    UNREADY = 0,
    CREATE_TOOL_MCP = 1,
    CREATE_LLM = 2,
    CREATE_WORKSPACE_AGENTS = 3,
    CREATE_APP = 4,
    FINISH = 5
}


export enum FunctionAiAppStatus {
    INITIALIZING = 'Initializing',
    FINISHED = 'Finished',
    FAILED = 'Failed'
}




export interface UpsertAgenticAppRequest {
  name: string;
  workspace_id?: string; 
  project_name: string;
  description?: string | null;
  template?: string | null;
  domain?: string | null;
  endpoint?: string | null;
  icon?: string | null;
  phase?: string;
  config?: Record<string, any> | null;
}

