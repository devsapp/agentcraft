

export const ROLES = ["system", "user", "assistant"] as const;
export type MessageRole = (typeof ROLES)[number];

export const Models = ["gpt-3.5-turbo", "gpt-4"] as const;


export interface RequestMessage {
  role: MessageRole;
  content: string;
}

export interface LLMConfig {
  model?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  stream?: boolean;
  presence_penalty?: number;
  frequency_penalty?: number;
  status?: number; // status 如果为0，则表示测试的会话
  agent_session_id?: number;
  assistant_session_id?: number;
}

export const enum MessageType {
  SYSTEM = "system",
  USER = "user",
  ASSISTANT = "assistant"
}

export const enum ChatSentimentClassification {
  NOTLABELED = 0,  // not labeled  
  NEUTRAL = 2,
  POSITIVE = 1
}
export interface ChatItem {
  ip: string,
  question: string,
  source: string,
  type: ChatSentimentClassification,
  created: string,
  agent_id: number,
  model_name: string,
  id: number,
  prompt: string,
  answer: string,
  modified: string,
  model_id: number,
  uid: string
}

export interface ChatMessage {
  message: string,
  type: MessageType,
  sourceIdx: number,
  showFeedback: boolean, // 是否有反馈
  liked: boolean, // 是否有链接
  disLiked: boolean,
}

export interface ChatCallBack {
  onmessage: (message: string) => void;
}

export interface ChatOptions {
  messages: RequestMessage[];
  config: LLMConfig;
  version?: string;
  onUpdate?: (message: string, chunk: string) => void;
  onFinish: (message: string) => void;
  onError?: (err: Error) => void;
  onController?: (controller: AbortController) => void;
}





