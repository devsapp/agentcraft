export const ACTION_TOOL_TEMPLATES = [
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
        input_schema: `[ { 'name': 'prompt', 'description': '英文关键词，描述了希望图像具有什么内容', 'required': True, 'schema': {'type': 'string'}, } ]`

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
        input_schema: `[ { 'name': 'code', 'description': '执行的python代码', 'required': True, 'schema': {'type': 'string'}, } ]`

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
        input_schema: `[ { 'name': 'functionName', 'description': '函数英文名', 'required': True, 'schema': {'type': 'string'}, } `

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
        input_schema: `[ { 'name': 'search_input', 'description': '输入的搜索内容', 'required': True, 'schema': {'type': 'string'}, } `

    }
];