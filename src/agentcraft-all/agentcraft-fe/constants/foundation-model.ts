export const AGENTCRAFT_FM_QWEN_BIZ = 'agentcraft-fm-dashscope-biz'; // 弃用 agentcraft-fm-qwen-biz
export const AGENTCRAFT_FM_DASHSCOPE_BIZ ='agentcraft-fm-dashscope-biz'; 
export const AGENTCRAFT_FM_ZHIPUAI_BIZ ='agentcraft-fm-zhipuai-biz'; //智谱AI
export const AGENTCRAFT_FM_BAICHUANAI_BIZ ='agentcraft-fm-baichuanai-biz'; // 百川AI
export const AGENTCRAFT_FM_LINGYIAI_BIZ ='agentcraft-fm-lingyiai-biz'; // 零一万物
export const AGENTCRAFT_FM_MOONSHOTAI_BIZ ='agentcraft-fm-moonshotai-biz'; // 月之暗面  
export const AGENTCRAFT_FM_TOGETHERAI_BIZ ='agentcraft-fm-togetherai-biz'; // together ai
export const AGENTCRAFT_FM_CHATGLM2_OPENSOURCE = 'agentcraft-fm-chatglm2-opensource';
export const AGENTCRAFT_FM_CHATGLM3_OPENSOURCE = 'agentcraft-fm-chatglm3-opensource';
export const AGENTCRAFT_FM_LLAMA2_OPENSOURCE = 'agentcraft-fm-llama2-opensource';
export const AGENTCRAFT_FM_QWEN_OPENSOURCE = 'agentcraft-fm-qwen-opensource';
export const AGENTCRAFT_FM_GPT_SOVITS = 'fc-gpt-sovits-v2';
export const AGENTCRAFT_FM_COSYVOICE = 'cosyvoice';
export const AGENTCRAFT_FM_STABLEDIFFUSION= 'fc-stable-diffusion-v3';
export const AgentCRAFT_FM_COMFYUI = 'fc-comfyui';

export const BAILIAN_ENDPOINT = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';  // 百炼通义千问API访问的endpoint

export const AGENTCRAFT_FM_PREFIX = 'AgentCraft_FM';

export const SUPPORT_LLM_MODEL_REGIONS = ['cn-beijing','cn-hangzhou'];

export const FM_NAME_MAP: any = {
    [AGENTCRAFT_FM_QWEN_BIZ]: '通义千问商业版',
    // [AGENTCRAFT_FM_DASHSCOPE_BIZ]: 'DashscopeAI',
    [AGENTCRAFT_FM_ZHIPUAI_BIZ]:'智普AI',
    [AGENTCRAFT_FM_BAICHUANAI_BIZ]:'百川AI',
    [AGENTCRAFT_FM_LINGYIAI_BIZ]:'零一万物AI',
    [AGENTCRAFT_FM_MOONSHOTAI_BIZ]:'月之暗面AI',
    [AGENTCRAFT_FM_TOGETHERAI_BIZ]:'TogetherAI',
    [AGENTCRAFT_FM_CHATGLM2_OPENSOURCE]: 'Chatglm2-6b开源',
    [AGENTCRAFT_FM_CHATGLM3_OPENSOURCE]: 'Chatglm3-6b开源',
    [AGENTCRAFT_FM_LLAMA2_OPENSOURCE]: 'Llama2-13B（int4量化）开源',
    [AGENTCRAFT_FM_QWEN_OPENSOURCE]: '通义千问-7b开源',
    [AGENTCRAFT_FM_GPT_SOVITS]:'GptSovits 2.0',
    [AGENTCRAFT_FM_COSYVOICE]:'CosyVoice 1.0',
    [AGENTCRAFT_FM_STABLEDIFFUSION]:'Stable Diffusion',
    [AgentCRAFT_FM_COMFYUI]: 'ComfyUI'
}

export const FM_DOCS: any = {
    [AGENTCRAFT_FM_GPT_SOVITS]: [{
        name: 'GptSovits 2.0 Serverless版使用介绍',
        url: 'https://www.yuque.com/zxypro/mnayfw/yrvd2gsbvtzbxvnn'
    },{
        name: 'GptSovits 2.0 Serverless版模型训练',
        url: 'https://www.yuque.com/zxypro/mnayfw/rg5hfc1za58q9zze'
    }],
    [AGENTCRAFT_FM_COSYVOICE]: [{
        name: 'CosyVoice Serverless 版使用介绍',
        url: 'https://developer.aliyun.com/article/1619858'
    }],
    [AgentCRAFT_FM_COMFYUI]: [{
        name: 'ComfyUI API Serverless版使用介绍',
        url: 'https://help.aliyun.com/zh/functioncompute/fc-3-0/use-cases/comfyui-api-serverless-version-solution'
    }],
    [AGENTCRAFT_FM_STABLEDIFFUSION]: [{
        name: 'StableDiffusion API Serverless版使用介绍',
        url: 'https://help.aliyun.com/zh/functioncompute/fc-3-0/use-cases/stable-diffusion-api-serverless-solution'
    }],

}

export const FM_TEMPLATE_ACCESS_API_FUNCTION_MAP: any = {
    [AGENTCRAFT_FM_QWEN_BIZ]: 'apiServer',
    // [AGENTCRAFT_FM_DASHSCOPE_BIZ]: 'apiServer',
    [AGENTCRAFT_FM_TOGETHERAI_BIZ]: 'apiServer',
    [AGENTCRAFT_FM_ZHIPUAI_BIZ]:  'apiServer',
    [AGENTCRAFT_FM_BAICHUANAI_BIZ]:  'apiServer',
    [AGENTCRAFT_FM_LINGYIAI_BIZ]:  'apiServer',
    [AGENTCRAFT_FM_MOONSHOTAI_BIZ]:  'apiServer',
    'fc-llm-api': 'llm-server',
}

export const FM_APP_STATUS: any = {
    'published': {
        color: 'green',
        text: '已发布'
    },
    'deploying': {
        color: 'yellow',
        text: '部署中'
    }
}
export const FOUNDATION_MODEL_TTI_TEMPLATES = [
    {
        name: 'ComfyUI 图像工作流',
        tag: ['ComfyUI','图像生成','图像工作流'],
        type: 'tti',
        icon: '',
        iconText: 'ComfyUI',
        description: '',
        fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=fc-comfyui',
        githubLink: '',
        template: 'fc-comfyui',
        templateParams: {
            type: 'object',
            additionalProperties: false,
            required: ['region'],
            properties: {
                region: {
                    type: 'string',
                    title: '地域',
                    default: 'cn-hangzhou',
                    description: '该服务所在的地域',
                    enum: ['cn-shanghai', 'cn-hangzhou'],
                    uiType: 'select',
                    dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '上海', value: 'cn-shanghai' }]
                }
            }
        }
    },
    // {
    //     name: 'StableDiffusion图像生成',
    //     tag: ['StableDuffusion','图像生成'],
    //     type: 'tti',
    //     icon: '',
    //     iconText: 'StableDiffusion',
    //     description: '',
    //     fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=fc-stable-diffusion-v3',
    //     githubLink: '',
    //     template: 'fc-stable-diffusion-v3',
    //     templateParams: {
    //         type: 'object',
    //         additionalProperties: false,
    //         required: ['region'],
    //         properties: {
    //             region: {
    //                 type: 'string',
    //                 title: '地域',
    //                 default: 'cn-hangzhou',
    //                 description: '该服务所在的地域',
    //                 enum: ['cn-beijing', 'cn-hangzhou'],
    //                 uiType: 'select',
    //                 dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '北京', value: 'cn-beijing' }]
    //             }
    //         }
    //     }
    // }
    
]
export const FOUNDATION_MODEL_TTS_TEMPLATES = [
    {
        name: 'CosyVoice 语音生成 ',
        tag: ['CosyVoice', '声音生成'],
        type: 'tts',
        icon: '',
        iconText: 'CosyVoice语音生成',
        description: 'CosyVoice语音生成(V1版本) 支持样本示例声音，自定义声音，支持 中文，粤语，英文，日语等多语种合成',
        fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=cosyvoice',
        githubLink: '',
        template: 'cosyvoice',
        templateParams: {
            type: 'object',
            additionalProperties: false,
            required: ['region'],
            properties: {
                region: {
                    type: 'string',
                    title: '地域',
                    default: 'cn-hangzhou',
                    description: '该服务所在的地域',
                    enum: ['cn-beijing', 'cn-hangzhou','cn-shanghai','cn-shenzhen'],
                    uiType: 'select',
                    dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '北京', value: 'cn-beijing' }, { label: '上海', value: 'cn-shanghai' },, { label: '深圳', value: 'cn-shenzhen' }]
                }
            }
        }
    },{
        name: 'GptSovits 语音生成 ',
        tag: ['GptSovits', '声音生成'],
        type: 'tts',
        icon: '',
        iconText: 'GptSovits语音生成',
        description: 'GptSovits语音合成V2版本 支持样本示例声音，自定义声音，支持 中文，粤语，英文，日语等多语种合成,支持模型训练',
        fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=fc-gpt-sovits-v2',
        githubLink: '',
        template: 'fc-gpt-sovits-v2',
        templateParams: {
            type: 'object',
            additionalProperties: false,
            required: ['region'],
            properties: {
                region: {
                    type: 'string',
                    title: '地域',
                    default: 'cn-hangzhou',
                    description: '该服务所在的地域',
                    enum: ['cn-beijing', 'cn-hangzhou','cn-shanghai','cn-shenzhen'],
                    uiType: 'select',
                    dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '北京', value: 'cn-beijing' }, { label: '上海', value: 'cn-shanghai' },, { label: '深圳', value: 'cn-shenzhen' }]
                }
            }
        }
    },
]
export const FOUNDATION_MODEL_TEMPLATES = [
    {
        name: '百炼模型（代理阿里云百炼）',
        tag: ['Dashcope', '通义千问'],
        type: 'llm',
        icon: '',
        iconText: '模型服务百炼',
        description: '阿里云百炼是阿里云的AI API基础设施平台，包含qwen-turbo，qwen-plus等商业版本的通义千问模型',
        fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=agentcraft-fm-dashscope-biz',
        githubLink: '',
        template: 'agentcraft-fm-dashscope-biz',
        templateParams: {
            type: 'object',
            additionalProperties: false,
            required: ['region'],
            properties: {
                region: {
                    type: 'string',
                    title: '地域',
                    default: 'cn-hangzhou',
                    description: '该服务所在的地域',
                    enum: ['cn-beijing', 'cn-hangzhou'],
                    uiType: 'select',
                    dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '北京', value: 'cn-beijing' }]
                },
                apiKey: {
                    type: 'string',
                    title: '阿里云百炼 API-Key[如已在部署时设置，此处可以忽略]',
                    description: '阿里云百炼 的API-KEY <a href="https://bailian.console.aliyun.com/?apiKey=1#/api-key" target="_blank">免费申领地址</a>',
                    default: '',
                    uiType: 'password'
                }
            }
        }
    },

    {
        name: '月之暗面AI模型（代理MoonshotAI）',
        tag: ['月之暗面AI', 'Kimi'],
        type: 'llm',
        icon: '',
        iconText: '月之暗面.AI',
        description: '月之暗面AI 包含moonshot-v1-8k，moonshot-v1-32k，moonshot-v1-128k大语言模型',
        fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=agentcraft-fm-moonshotai-biz',
        githubLink: '',
        template: 'agentcraft-fm-moonshotai-biz',
        templateParams: {
            type: 'object',
            additionalProperties: false,
            required: ['region', 'apiKey'],
            properties: {
                region: {
                    type: 'string',
                    title: '地域',
                    default: 'cn-hangzhou',
                    description: '该服务所在的地域',
                    enum: ['cn-beijing', 'cn-hangzhou'],
                    uiType: 'select',
                    dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '北京', value: 'cn-beijing' }]
                },
                apiKey: {
                    type: 'string',
                    title: 'Moonshot AI开放平台 ApiKey',
                    description: '访问Moonshot AI开放平台 所需的KEY<a href="https://platform.moonshot.cn/console/api-keys" target="_blank">申请地址</a>',
                    default: '',
                    uiType: 'password'
                }

            }
        }
    },
    {
        name: '百川AI模型（代理百川AI）',
        tag: ['百川AI'],
        type: 'llm',
        icon: '',
        iconText: '百川.AI',
        description: '百川AI 包含Baichuan2-Turbo,Baichuan2-Turbo-192k,Baichuan2-53B大语言模型',
        fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=agentcraft-fm-baichuanai-biz',
        githubLink: '',
        template: 'agentcraft-fm-baichuanai-biz',
        templateParams: {
            type: 'object',
            additionalProperties: false,
            required: ['region', 'apiKey'],
            properties: {
                region: {
                    type: 'string',
                    title: '地域',
                    default: 'cn-hangzhou',
                    description: '该服务所在的地域',
                    enum: ['cn-beijing', 'cn-hangzhou'],
                    uiType: 'select',
                    dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '北京', value: 'cn-beijing' }]
                },
                apiKey: {
                    type: 'string',
                    title: '百川AI开放平台 ApiKey',
                    description: '访问百川 AI开放平台 所需的KEY<a href="https://platform.baichuan-ai.com/console/apikey" target="_blank">申请地址</a>',
                    default: '',
                    uiType: 'password'
                }

            }
        }
    },
    {
        name: '零一万物AI模型（代理零一万物AI）',
        tag: ['零一万物AI'],
        type: 'llm',
        icon: '',
        iconText: '零一万物.AI',
        description: '零一万物AI 包含yi-34b-chat-0205,yi-34b-chat-200k大语言模型',
        fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=agentcraft-fm-lingyiai-biz',
        githubLink: '',
        template: 'agentcraft-fm-lingyiai-biz',
        templateParams: {
            type: 'object',
            additionalProperties: false,
            required: ['region', 'apiKey'],
            properties: {
                region: {
                    type: 'string',
                    title: '地域',
                    default: 'cn-hangzhou',
                    description: '该服务所在的地域',
                    enum: ['cn-beijing', 'cn-hangzhou'],
                    uiType: 'select',
                    dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '北京', value: 'cn-beijing' }]
                },
                apiKey: {
                    type: 'string',
                    title: '零一万物AI开放平台 ApiKey',
                    description: '访问零一万物 AI开放平台 所需的KEY<a href="https://platform.lingyiwanwu.com/apikeys" target="_blank">申请地址</a>',
                    default: '',
                    uiType: 'password'
                }

            }
        }
    },
    {
        name: '智普AI模型（代理智普AI）',
        tag: ['智普AI', 'GLM'],
        type: 'llm',
        icon: '',
        iconText: '智普.AI',
        description: '智普AI 包含glm-4, glm-3.5-turbo两款 128K上下文大语言模型',
        fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=agentcraft-fm-zhipuai-biz',
        githubLink: '',
        template: 'agentcraft-fm-zhipuai-biz',
        templateParams: {
            type: 'object',
            additionalProperties: false,
            required: ['region', 'apiKey'],
            properties: {
                region: {
                    type: 'string',
                    title: '地域',
                    default: 'cn-hangzhou',
                    description: '该服务所在的地域',
                    enum: ['cn-beijing', 'cn-hangzhou'],
                    uiType: 'select',
                    dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '北京', value: 'cn-beijing' }]
                },
                apiKey: {
                    type: 'string',
                    title: '智普AI开放平台 ApiKey',
                    description: '访问GML所需的KEY<a href="https://open.bigmodel.cn/usercenter/apikeys" target="_blank">申请地址</a>',
                    default: '',
                    uiType: 'password'
                }

            }
        }
    },
    {
        name: 'TogetherAI模型（代理TogetherAI）',
        tag: ['TogetherAI', 'LLama2'],
        type: 'llm',
        icon: '',
        iconText: 'Together.AI',
        description: 'Together AI 包含LLama2, Mistral,零一，Vicuna等40多款大语言模型',
        fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=agentcraft-fm-togetherai-biz',
        githubLink: 'https://github.com/devsapp/agentcraft-fm-togetherai-biz',
        template: 'agentcraft-fm-togetherai-biz',
        templateParams: {
            type: 'object',
            additionalProperties: false,
            required: ['region', 'apiKey'],
            properties: {
                region: {
                    type: 'string',
                    title: '地域',
                    default: 'cn-hangzhou',
                    description: '该服务所在的地域',
                    enum: ['cn-beijing', 'cn-hangzhou'],
                    uiType: 'select',
                    dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '北京', value: 'cn-beijing' }]
                },
                apiKey: {
                    type: 'string',
                    title: 'TogetherAI平台 ApiKey',
                    description: '访问TogetherApi所需的KEY<a href="https://api.together.xyz/settings/api-keys" target="_blank">申请地址</a>',
                    default: '',
                    uiType: 'password'
                }

            }
        }
    }, ,
    {
        name: '通义千问开源版7b模型（私有化部署）',
        tag: ['通义千问', '开源'],
        type: 'llm',
        icon: 'https://img.alicdn.com/imgextra/i4/O1CN01c26iB51UyR3MKMFvk_!!6000000002586-2-tps-124-122.png',
        description: '开源版本通义千问，支持灵活定制， 性能强劲，推理能力强',
        fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=fc-llm-api',
        githubLink: 'https://github.com/devsapp/fc-qwen',
        template: 'fc-llm-api',
        templateParams: {
            type: 'object',
            additionalProperties: false,
            required: ['region', 'llmModel'],
            properties: {
                region: {
                    type: 'string',
                    title: '地域',
                    default: 'cn-hangzhou',
                    description: '该服务所在的地域',
                    enum: ['cn-hangzhou', 'cn-shanghai'],
                    uiType: 'select',
                    dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '上海', value: 'cn-shanghai' }]
                },
                llmModel: {
                    type: 'string',
                    title: '模型名称',
                    description: '模型名称',
                    default: 'qwen-7b-chat',
                    uiType: 'input'
                },
                adminEnabled: {
                    type: 'string',
                    title: '',
                    description: '',
                    default: false,
                    hiddenUI: true,

                },
                serviceName: {
                    type: 'string',
                    title: '服务名',
                    description: '',
                    default: 'AgentCraft',
                    hiddenUI: true,
                },
                clientPassword: {
                    type: 'string',
                    title: '客户端访问密码',
                    description: '',
                    default: '',
                    hiddenUI: true,
                }

            }
        }
    }, {
        name: 'chatglm2开源版6b（私有化部署）',
        tag: ['chatglm2', '开源'],
        type: 'llm',
        icon: '',
        iconText: 'Chatglm2-6b',
        description: '开源chatglm2，支持灵活定制， 性能强劲，推理能力强',
        fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=fc-llm-api',
        githubLink: 'https://github.com/devsapp/fc-llm-api',
        template: 'fc-llm-api',
        templateParams: {
            type: 'object',
            additionalProperties: false,
            required: ['region', 'llmModel'],
            properties: {
                region: {
                    type: 'string',
                    title: '地域',
                    default: 'cn-hangzhou',
                    description: '该服务所在的地域',
                    enum: ['cn-hangzhou', 'cn-shanghai'],
                    uiType: 'select',
                    dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '上海', value: 'cn-shanghai' }]
                },
                llmModel: {
                    type: 'string',
                    title: '模型名称',
                    description: '模型名称',
                    default: 'chatglm2-6b-int4',
                    uiType: 'input'
                },
                adminEnabled: {
                    type: 'string',
                    title: '',
                    description: '',
                    default: false,
                    hiddenUI: true,

                },
                serviceName: {
                    type: 'string',
                    title: '服务名',
                    description: '',
                    default: 'AgentCraft',
                    hiddenUI: true,
                },
                clientPassword: {
                    type: 'string',
                    title: '客户端访问密码',
                    description: '',
                    default: '',
                    hiddenUI: true,
                }

            }
        }
    }, {
        name: 'chatglm3开源版6b（私有化部署）',
        tag: ['chatglm3', '开源'],
        type: 'llm',
        icon: '',
        iconText: 'Chatglm3-6b',
        description: '开源chatglm3 6b模型',
        fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=agentcraft-fm-chatglm3-6b-opensource',
        githubLink: 'https://github.com/devsapp/agentcraft-fm-chatglm3-6b-opensource',
        template: 'agentcraft-fm-chatglm3-6b-opensource',
        templateParams: {
            type: 'object',
            additionalProperties: false,
            required: ['region', 'llmModel'],
            properties: {
                region: {
                    type: 'string',
                    title: '地域',
                    default: 'cn-hangzhou',
                    description: '该服务所在的地域',
                    enum: ['cn-hangzhou', 'cn-shanghai'],
                    uiType: 'select',
                    dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '上海', value: 'cn-shanghai' }]
                },
                llmModel: {
                    type: 'string',
                    title: '模型名称',
                    description: '模型名称',
                    default: 'chatglm2-6b-int4',
                    uiType: 'input'
                },
                adminEnabled: {
                    type: 'string',
                    title: '',
                    description: '',
                    default: false,
                    hiddenUI: true,

                },
                serviceName: {
                    type: 'string',
                    title: '服务名',
                    description: '',
                    default: 'AgentCraft',
                    hiddenUI: true,
                },
                clientPassword: {
                    type: 'string',
                    title: '客户端访问密码',
                    description: '',
                    default: '',
                    hiddenUI: true,
                }

            }
        }
    }, {
        name: 'llama2开源版13b,in4量化(私有化部署)',
        tag: ['llama2', '开源'],
        type: 'llm',
        icon: '',
        iconText: 'LLAMA2',
        description: '开源llama2，支持灵活定制， 性能强劲，推理能力强',
        fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=fc-llm-api',
        githubLink: 'https://github.com/devsapp/fc-llm-api',
        template: 'fc-llm-api',
        templateParams: {
            type: 'object',
            additionalProperties: false,
            required: ['region', 'llmModel'],
            properties: {
                region: {
                    type: 'string',
                    title: '地域',
                    default: 'cn-hangzhou',
                    description: '该服务所在的地域',
                    enum: ['cn-hangzhou', 'cn-shanghai'],
                    uiType: 'select',
                    dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '北京', value: 'cn-beijing' }]
                },
                llmModel: {
                    type: 'string',
                    title: '模型名称',
                    description: '模型名称',
                    default: 'chatglm3-6b',
                    uiType: 'input'
                },
                adminEnabled: {
                    type: 'boolean',
                    title: '',
                    description: '',
                    default: false,
                    hiddenUI: true,

                },
                serviceName: {
                    type: 'string',
                    title: '服务名',
                    description: '',
                    default: 'AgentCraft',
                    hiddenUI: true,
                },
                clientPassword: {
                    type: 'string',
                    title: '客户端访问密码',
                    description: '',
                    default: '',
                    hiddenUI: true,
                }

            }
        }
    }
];