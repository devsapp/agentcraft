export enum FunctionAiAppStatus {
    INITIALIZING = 'Initializing',
    FINISHED = 'Finished',
    FAILED = 'Failed'
}




export interface UpsertMcpRequest {
  name: string;
  project_name: string;
  description?: string | null;
  template?: string | null;
  endpoint?: string | null;
  icon?: string | null;
  content?: string,
  arn?: string,
  type: number,
  tools: any
}

