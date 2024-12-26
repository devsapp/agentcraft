export const ACTION_TOOL_TEMPLATES = [
    {
        name: 'CosyVoice声音生成',
        tag: ['声音生成','cosyvoice'],
        type: 'action-tool',
        icon: '',
        functionConfig: {
            fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=tts-cosyvoice',
            githubLink: '',
            functionName: 'tts-cosyvoice',
            template: 'tts-cosyvoice',
            templateParams: {
                type: 'object',
                additionalProperties: false,
                required: ['region','dashscopeApiKey','bucketName'],
                properties: {
                    region: {
                        type: 'string',
                        title: '地域',
                        default: 'cn-hangzhou',
                        description: '该服务所在的地域',
                        enum: ['cn-beijing', 'cn-hangzhou','cn-shanghai','cn-shenzhen'],
                        uiType: 'select',
                        dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '北京', value: 'cn-beijing' }, { label: '上海', value: 'cn-shanghai' }, { label: '深圳', value: 'cn-shenzhen' }]
                    },
                    dashscopeApiKey: {
                        type: 'string',
                        title: '百炼API Key',
                        default: '',
                        description: '百炼API key 获取地址https://bailian.console.aliyun.com/?apiKey=1',
                        uiType: 'string'   
                    },
                    bucketName: {
                        type: 'string',
                        title: 'OSS Bucket名称',
                        default: '',
                        description: '阿里云OSS的存储桶名称',
                        uiType: 'string'   
                    },
                    bucketObjectPath: {
                        type: 'string',
                        title: '存储文件路径',
                        default: 'cosyvoice-audio',
                        description: '阿里云OSS的存储桶文件路径',
                        uiType: 'string'   
                    },
                    roleArn: {
                        hiddenUI: true,
                        type: 'string',
                        title: '角色ARN',
                        default: 'acs:ram::<uid>:role/aliyunfcdefaultrole',
                        description: '阿里云角色ARN',
                        uiType: 'string'   
                    }

                }
            }
        },
        description: 'CosyVoice声音生成是一个AI声音生成服务，输入文本描述，返回根据文本合成声音文件',
        input_schema: `[ { 'name': 'content', 'description': '用来合成声音的文本内容', 'required': True, 'schema': {'type': 'string'} } ]`
    },
    {
        name: 'Paraformer声音识别',
        tag: ['声音识别','paraformer'],
        type: 'action-tool',
        icon: '',
        functionConfig: {
            fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=asr-paraformer',
            githubLink: '',
            functionName: 'asr-paraformer',
            template: 'asr-paraformer',
            templateParams: {
                type: 'object',
                additionalProperties: false,
                required: ['region','dashscopeApiKey','bucketName'],
                properties: {
                    region: {
                        type: 'string',
                        title: '地域',
                        default: 'cn-hangzhou',
                        description: '该服务所在的地域',
                        enum: ['cn-beijing', 'cn-hangzhou','cn-shanghai','cn-shenzhen'],
                        uiType: 'select',
                        dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '北京', value: 'cn-beijing' }, { label: '上海', value: 'cn-shanghai' }, { label: '深圳', value: 'cn-shenzhen' }]
                    },
                    dashscopeApiKey: {
                        type: 'string',
                        title: '百炼API Key',
                        default: '',
                        description: '百炼API key 获取地址https://bailian.console.aliyun.com/?apiKey=1',
                        uiType: 'string'   
                    },
                    bucketName: {
                        type: 'string',
                        title: 'OSS Bucket名称',
                        default: '',
                        description: '阿里云OSS的存储桶名称',
                        uiType: 'string'   
                    },
                    bucketObjectPath: {
                        type: 'string',
                        title: '存储文件路径',
                        default: 'paraformer-subtitles',
                        description: '阿里云OSS的存储桶文件路径',
                        uiType: 'string'   
                    }
                }
            }
        },
        description: 'Paraformer声音识别是一个智能声音识别服务，输入语音文件的访问地址，返回根据该语音的内容文件',
        input_schema: `[ { 'name': 'url', 'description': '语音文件的地址', 'required': True, 'schema': {'type': 'string'}} ]`
    },
    {
        name: 'FluxSchnell图像生成',
        tag: ['图像生成','fluxschnell'],
        type: 'action-tool',
        icon: '',
        functionConfig: {
            fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=flux-schnell',
            githubLink: '',
            functionName: 'flux-schnell',
            template: 'flux-schnell',
            templateParams: {
                type: 'object',
                additionalProperties: false,
                required: ['region','dashscopeApiKey','bucketName'],
                properties: {
                    region: {
                        type: 'string',
                        title: '地域',
                        default: 'cn-hangzhou',
                        description: '该服务所在的地域',
                        enum: ['cn-beijing', 'cn-hangzhou','cn-shanghai','cn-shenzhen'],
                        uiType: 'select',
                        dataSource: [{ label: '杭州', value: 'cn-hangzhou' }, { label: '北京', value: 'cn-beijing' }, { label: '上海', value: 'cn-shanghai' }, { label: '深圳', value: 'cn-shenzhen' }]
                    },
                    dashscopeApiKey: {
                        type: 'string',
                        title: '百炼API Key',
                        default: '',
                        description: '百炼API key 获取地址https://bailian.console.aliyun.com/?apiKey=1',
                        uiType: 'string'   
                    },
                    bucketName: {
                        type: 'string',
                        title: 'OSS Bucket名称',
                        default: '',
                        description: '阿里云OSS的存储桶名称',
                        uiType: 'string'   
                    },
                    bucketObjectPath: {
                        type: 'string',
                        title: '存储文件路径',
                        default: 'flux-schnell-images',
                        description: '阿里云OSS的存储桶文件路径',
                        uiType: 'string'   
                    }
                }
            }
        },
        description: 'FluxSchnell图像生成是一个AI生成图像的服务，输入提示词返回图像地址',
        input_schema: `[ { 'name': 'prompt', 'description': '用来生成图像的提示词描述', 'required': True, 'schema': {'type': 'string'} } ]`
    },
    {
        name: '解释器',
        tag: ['代码解释器'],
        type: 'action-tool',
        icon: '',
        functionConfig: {
            functionName: 'execute',
            fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=agentcraft-at-execute',
            githubLink: '',
            template: 'agentcraft-at-execute',
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
                    }

                }
            }
        },
        description: '代码解释器可以执行输入的python代码，返回结果',
        input_schema: `[ { 'name': 'code', 'description': '执行的python代码', 'required': True, 'schema': {'type': 'string'} } ]`

    },
    {
        name: '文生图',
        tag: ['文生图'],
        type: 'action-tool',
        icon: '',
        functionConfig: {
            fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=agentcraft-at-imggen',
            githubLink: '',
            functionName: 'image_gen',
            template: 'agentcraft-at-imggen',
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
                    }

                }
            }
        },
        description: '文生图是一个AI绘画（图像生成）服务，输入文本描述，返回根据文本作画得到的图片的URL',
        input_schema: `[ { 'name': 'prompt', 'description': '英文关键词，描述了希望图像具有什么内容', 'required': True, 'schema': {'type': 'string'} } ]`

    },
    {
        name: '解释器',
        tag: ['代码解释器'],
        type: 'action-tool',
        icon: '',
        functionConfig: {
            functionName: 'execute',
            fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=agentcraft-at-execute',
            githubLink: '',
            template: 'agentcraft-at-execute',
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
                    }

                }
            }
        },
        description: '代码解释器可以执行输入的python代码，返回结果',
        input_schema: `[ { 'name': 'code', 'description': '执行的python代码', 'required': True, 'schema': {'type': 'string'}} ]`

    },
    {
        name: '查看函数列表',
        tag: ['函数列表'],
        type: 'action-tool',
        icon: '',
        functionConfig: {
            fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=agentcraft-at-list-functions',
            githubLink: '',
            functionName: 'list_functions',
            template: 'agentcraft-at-list-functions',
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
                    }

                }
            }
        },
        description: '查看函数列表可以查询所有的函数信息',
        input_schema: `[]`

    },
    {
        name: '查看函数函数详细',
        tag: ['函数详细'],
        type: 'action-tool',
        icon: '',
        functionConfig: {
            fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=agentcraft-at-get-function',
            githubLink: '',
            functionName: 'get_function',
            template: 'agentcraft-at-get-function',
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
                    }

                }
            }
        },
        description: '查看函数的详细信息',
        input_schema: `[ { 'name': 'functionName', 'description': '函数英文名', 'required': True, 'schema': {'type': 'string'} }] `

    },
    {
        name: 'web搜索',
        tag: ['web搜索'],
        type: 'action-tool',
        icon: '',
        functionConfig: {
            fcLink: 'https://fcnext.console.aliyun.com/applications/create?template=agentcraft-at-webbrowser',
            githubLink: '',
            functionName: 'web-browser',
            template: 'agentcraft-at-webbrowser',
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
                    }

                }
            }
        },
        description: 'web搜索可以检索实事新闻，最新百科',
        input_schema: `[ { 'name': 'search_input', 'description': '输入的搜索内容', 'required': True, 'schema': {'type': 'string'} }] `

    }
];