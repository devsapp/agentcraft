export const FORM_WIDTH =  640;
export const FORM_WIDTH_1280 =  1280;
export const DEFAULT_MODEL_REQUEST_TIMEOUT = 600;
export const REQUEST_TIMEOUT_MS = 60000;
export const AGENTCRAFT_TOKEN = 'agent_craft_token';
export const AGENTCRAFT_SYSTEMCONFIG_COMPLETED = 'agent_craft_systemconfig_completed';
export const AGENTCRAFT_QUICK_START = 'agentcraft-quick-start';

export const SYSTEM_AGENTCRAFT = 'SYSTEM_AGPENTCRAFT';  // AgentCraft的核心服务
export const AGENTCRAFT_APP = 'AgentCraftApp';
export const AGENTCRAFT_SERVICE = 'AgentCraftService';
export const AGENTCRAFT_FUNCTION = 'AgentCraftFunction';
export const EMBEDDING_TEMPLATE_NAME = 'fc-embedding-api';

export const PROMPT_TEMPLATE = '已知信息：【{context}】。你需要积极，简洁和专业地来回答\`\`\`中的问题。如果问题和已知信息没有关系，或者问题存在争议性，请说 “抱歉，无法回答该问题”，不允许编造。问题是：\`\`\`{query}\`\`\`';
export const DEFAULT_SYSTEM_PROMPT = `你是领域有文档的专家，能够将文档内容更有价值的展示给用户，在你输出文档的时候需要有一些富内容的展示，比如
你的内容是图片url，你应该输出![image](图片url);
你的内容是视频url，你的输出应当是<video width="320" height="240" controls src="视频url"/>;
如果你的内容包含像 <Card >这种以"<"开头并且有闭合的标签语法，直接输出就好。`;

