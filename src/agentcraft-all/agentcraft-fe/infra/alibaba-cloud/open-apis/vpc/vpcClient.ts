
import Vpc from '@alicloud/vpc20160428';
import * as $OpenApi from '@alicloud/openapi-client';


export default class VpcClient extends Vpc {
    constructor(config: $OpenApi.Config) {
        super(config);
    }
 
}

