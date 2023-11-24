

import FCV3 from '@alicloud/fc20230330';
import * as $OpenApi from '@alicloud/openapi-client';


export default class FcClientV3 extends FCV3 {
    constructor(config: $OpenApi.Config) {
        super(config);
    }
   
}

