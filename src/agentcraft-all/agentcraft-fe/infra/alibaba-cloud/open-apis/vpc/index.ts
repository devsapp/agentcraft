
import * as $OpenApi from '@alicloud/openapi-client';
import { DescribeVpcsRequest ,CreateVSwitchRequest } from '@alicloud/vpc20160428';
import * as $Util from '@alicloud/tea-util';
import VpcClient from "./vpcClient";

import { OpenApiConfig } from '../types';




export class ServerlessBridgeVpc {
    client;
    constructor(config?: OpenApiConfig) {
        this.client = this.createVpcClient(config);
    }
    createVpcClient(config?: OpenApiConfig) {
        const credential = config ?? {
            accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
            accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
        }
        credential.endpoint = `vpc.aliyuncs.com`;
        const _config = new $OpenApi.Config(credential);
        return new VpcClient(_config);
    }
    describeVpcs({ vpcId, regionId }: any) {
        const describeVpcsRequest = new DescribeVpcsRequest({
            regionId,
            vpcId,
        });
        const runtime = new $Util.RuntimeOptions({});
        return this.client.describeVpcsWithOptions(describeVpcsRequest, runtime);
    }

    async createVSwitch(payload:any) {
        const createVSwitchRequest = new CreateVSwitchRequest(payload);
        const runtime = new $Util.RuntimeOptions({ });
        return await this.client.createVSwitchWithOptions(createVSwitchRequest, runtime);
    }
}

