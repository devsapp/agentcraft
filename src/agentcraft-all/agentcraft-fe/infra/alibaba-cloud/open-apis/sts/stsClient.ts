
import Sts from '@alicloud/sts20150401';
import * as $OpenApi from '@alicloud/openapi-client';


export default class StsClient extends Sts {
    constructor(config: $OpenApi.Config) {
        super(config);
    }
 
}

