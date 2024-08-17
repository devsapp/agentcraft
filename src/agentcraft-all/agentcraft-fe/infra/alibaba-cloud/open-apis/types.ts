export interface OpenApiConfig {
    accessKeyId?: string;
    accessKeySecret?: string;
    securityToken?: string;
    protocol?: string;
    method?: string;
    regionId?: string;
    readTimeout?: number;
    connectTimeout?: number;
    httpProxy?: string;
    httpsProxy?: string;
    credential?: Credential;
    endpoint?: string;
    noProxy?: string;
    maxIdleConns?: number;
    network?: string;
    userAgent?: string;
    suffix?: string;
    socks5Proxy?: string;
    socks5NetWork?: string;
    endpointType?: string;
    openPlatformEndpoint?: string;
    type?: string;
    signatureVersion?: string;
    signatureAlgorithm?: string;
    key?: string;
    cert?: string;
    ca?: string;
}

export interface FcAsyncCallBack {
    destination: string
}
export interface DestinationConfig {
    onFailure: FcAsyncCallBack,
    onSuccess: FcAsyncCallBack
}

export interface FC3AsyncInvokeConfig {
    destinationConfig: DestinationConfig,
    maxAsyncEventAgeInSeconds?: number, // 消息最大存活时长
    maxAsyncRetryAttempts?:number // 异步调用失败后的最大重试次数
}