export const FC_CONSOLE_ACCOUNTID = ''; // fc-console 账号id
export const FC_CONSOLE_WEBIDE_SERVICENAME = 'fc-webide-service'; // fc-console webide service
export const FC_CONSOLE_WEBIDE_FUNCTIONNAME = 'GetOrCreateAppWorkSpace'; // fc-console 创建或者查询webide
export const FC_CONSOLE_UPDATECODE_FUNCTIONNAME = 'DeployUserFunctionCode'; // fc-console 更新代码
export const ASSUME_ROLE_FOR_FC_CONSOLE = process.env.FcConsoleAssumeRoleName; // 授权的账号名
export const FC_DEFAULT_ROLE_NAME = 'AliyunFCServerlessDevsRole';  // serverless devs 检查角色
export const DEVS_API_ENDPOINT = 'serverless-dualstack.ap-southeast-1.aliyuncs.com';

export const DEFAULT_REGION = 'cn-hangzhou';

export const INVOKE_GET_WEBIDE_DATA = {
    serviceName: FC_CONSOLE_WEBIDE_SERVICENAME,
    functionName: FC_CONSOLE_WEBIDE_FUNCTIONNAME
}

export const INVOKE_UPDATE_CODE_DATA = {
    serviceName: FC_CONSOLE_WEBIDE_SERVICENAME,
    functionName: FC_CONSOLE_UPDATECODE_FUNCTIONNAME
}

export const STS_ASSUME_ROLE_PAYLOAD = {
    roleArn: `acs:ram::${FC_CONSOLE_ACCOUNTID}:role/${ASSUME_ROLE_FOR_FC_CONSOLE}`,
    roleSessionName: ASSUME_ROLE_FOR_FC_CONSOLE  // 这个角色是需要fc-console授权
}

export const ASSUME_ROLE_POLICY_DOCUMENT = {
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Effect": "Allow",
            "Principal": {
                "Service": [
                    "fc.aliyuncs.com"
                ]
            }
        }
    ],
    "Version": "1"
}

export const SERVERLESS_DEVS_POLICIES = ['AliyunFCServerlessDevsRolePolicy', 'AliyunFCDefaultRolePolicy', 'AliyunFCFullAccess', 'AliyunNASFullAccess', 'AliyunVPCFullAccess'];