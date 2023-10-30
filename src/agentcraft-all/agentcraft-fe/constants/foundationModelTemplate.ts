export const FOUNDATION_MODEL_TEMPLATES = [
    {
        name: '通义千问（商业模型）',
        tag: ['阿里云', '通义千问'],
        type: 'llm',
        icon: 'https://img.alicdn.com/imgextra/i4/O1CN01c26iB51UyR3MKMFvk_!!6000000002586-2-tps-124-122.png',
        description: '商业版本的统一千问，支持8K上下文，性能强劲，推理能力强',
        fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=fc-qwen',
        githubLink: '',
        template: 'fc-qwen',
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
                    enum: ['cn-beijing', 'cn-hangzhou', 'cn-shanghai', 'cn-shenzhen'],
                    uiType: 'select',
                    dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '上海', value: 'cn-shanghai' }, { label: '北京', value: 'cn-beijing' }, { label: '深圳', value: 'cn-shenzhen' }]
                },
                apiKey: {
                    type: 'string',
                    title: '通义千问API-Key',
                    description: '通义千问的API-KEY，<a href="https://dashscope.console.aliyun.com/apiKey" target="_blank">免费申领地址</a>',
                    default: '',
                    uiType: 'password'
                },
                model: {
                    type: 'string',
                    title: '通义千问可访问模型',
                    description: '通义千问支持的两种模型，<a href="https://help.aliyun.com/zh/dashscope/developer-reference/api-details?disableWebsiteRedirect=true" target="_blank">点击查看详情</a>',
                    default: 'qwen-turbo',
                    enum: ['qwen-turbo', 'qwen-plus'],
                    uiType: 'select',
                    dataSource: [{ label: 'qwen-turbo', value: 'qwen-turbo' }, { label: 'qwen-plus', value: 'qwen-plus' }]
                },
                serviceName: {
                    type: 'string',
                    title: '服务名',
                    description: '',
                    hiddenUI: true,
                    default: 'AgentCraft',
                },
                clientPassword: {
                    type: 'string',
                    title: '客户端访问密码',
                    description: '',
                    hiddenUI: true,
                    default: '',
                }

            }
        }
    },
    {
        name: '通义千问开源版(7b模型)',
        tag: ['阿里云', '通义千问', '开源'],
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
        name: 'chatglm2开源版(6b,in4量化)',
        tag: ['阿里云', 'chatglm2', '开源'],
        type: 'llm',
        icon: 'https://img.alicdn.com/imgextra/i4/O1CN01c26iB51UyR3MKMFvk_!!6000000002586-2-tps-124-122.png',
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
        name: 'llama2开源版(13b,in4量化)',
        tag: ['阿里云', 'llama2', '开源'],
        type: 'llm',
        icon: 'https://img.alicdn.com/imgextra/i4/O1CN01c26iB51UyR3MKMFvk_!!6000000002586-2-tps-124-122.png',
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
                    dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '上海', value: 'cn-shanghai' }]
                },
                llmModel: {
                    type: 'string',
                    title: '模型名称',
                    description: '模型名称',
                    default: 'llama2-13b-q4',
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