

export interface TemplatePropertyDetail {
    type: string;
    description: string;
    default: any;
    title: string,
    hiddenUI?: boolean,
    enum?: any[],
    dataSource: any[],
    uiType: string
}

export interface TemplateProperties {
    [key: string]: any; // 或者你可以指定为具体的类型，如 number 或 string
}

export interface TemplateParams {
    type: string,
    additionalProperties: boolean,
    required: string[],
    properties:  TemplateProperties
}


export const enum ModelType {
    LLM = 'llm',
    TEXT2IMG = 'text2img'
}

export interface ServerlessAppTemplate {
    name: string; // 名称
    tag: string[]; // 标签
    type: string; // 类型 文生文
    icon: string;
    description: string;
    fcLink: string;
    githubLink: string;
    template: string;
    templateParams: TemplateParams;
}
