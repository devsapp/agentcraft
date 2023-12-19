
export const enum ROBOT_NAME_VALUE {
    DING_TALK = 'dingtalk',
    WECHAT = 'wechat'
}


export const enum WEB_NAME_VALUE {
    CHATGPT_NEXTJS_WEB = 'chatgpt-next-web'
}
export const ROBOT_TYPES = [
    {
        label: '钉钉机器人',
        value: 'dingtalk',
        image: 'https://img.alicdn.com/imgextra/i2/O1CN019OiHSB1tMIXnlm4k0_!!6000000005887-2-tps-200-200.png',
        description: '钉钉机器人',
    },
    {
        label: '微信个人机器人',
        value: 'wechat',
        image: 'https://img.alicdn.com/imgextra/i1/O1CN01bhGQ8126xw6OOzOxN_!!6000000007729-2-tps-200-200.png',
        description: '微信个人机器人',
    }
]

export const WEB_IS_TYPES = [
    {
        label: 'chatgpt-next-web应用模板',
        value: 'chatgpt-next-web',
        image: 'https://img.alicdn.com/imgextra/i3/O1CN010n937P22NW91SAmvB_!!6000000007108-0-tps-1678-958.jpg',
        description: 'chatgpt-next-web',
    }
]

export const AGENTCRAFT_CLIENT_ACCESS_LOCALSTORAGE = "agentcraft_client_access_robot";

export const DEFAULT_CLIENT_ACCESS_REGION = 'cn-hangzhou';
export const AGENTCRAFT_CLIENT_PREFIX = 'AGENTCRAFT_CLIENT';

export const AGENTCRAFT_CLIENT_DINGTALK = 'agentcraft-client-dingtalk';
export const AGENTCRAFT_CLIENT_WECHAT = 'agentcraft-client-wechat';

export const AGENTCRAFT_CLIENT_WEB_NEXTGPT = 'agentcraft-client-web';

export const AGENTCRAFT_CLIENT_DINGTALK_SERVERNAME = 'agentcraft-dingtalk-agent-server'; // 钉钉客户端代理的服务名
export const AGENTCRAFT_CLIENT_WECHAT_SERVERNAME = 'agentcraft-wechat-agent-server'; // 微信客户端代理的服务名
export const AGENTCRAFT_CLIENT_WEB_NEXTGPT_SERVERNAME = 'agentcraft-web-frontend'; // web独立站的服务名


export const enum ROBOT_CONFIG_STEP {
    AGENT_SERVICE = 0,
    SERVICE_CONFIG_PREVIEW = 1,
    ROBOT_WEBHOOK = 2
}

export const AGENTCRAFT_BUS_NAME = 'AGENTCRAFT_BUS';


export const CLIENTACCESS_NAME_MAP: any = {
    [AGENTCRAFT_CLIENT_DINGTALK]: '钉钉机器人',
    [AGENTCRAFT_CLIENT_WECHAT]: '微信机器人（个人版）',
}

export const CHATBOT_APPNAME_MAP: any = {
    [ROBOT_NAME_VALUE.DING_TALK]: AGENTCRAFT_CLIENT_DINGTALK,
    [ROBOT_NAME_VALUE.WECHAT]: AGENTCRAFT_CLIENT_WECHAT
}

export const CHATBOT_APPSERVER_MAP: any = {
    [ROBOT_NAME_VALUE.DING_TALK]: AGENTCRAFT_CLIENT_DINGTALK_SERVERNAME,
    [ROBOT_NAME_VALUE.WECHAT]: AGENTCRAFT_CLIENT_WECHAT_SERVERNAME
}



export const WEB_IS_MAP: any = {
    [WEB_NAME_VALUE.CHATGPT_NEXTJS_WEB]: AGENTCRAFT_CLIENT_WEB_NEXTGPT,

}


export const WEB_IS_APPSERVER_MAP: any = {
    [WEB_NAME_VALUE.CHATGPT_NEXTJS_WEB]: AGENTCRAFT_CLIENT_WEB_NEXTGPT_SERVERNAME,
} 
