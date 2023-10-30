
import Ram from '@alicloud/ram20150501';
import * as $OpenApi from '@alicloud/openapi-client';


export default class RamClient extends Ram {
    constructor(config: $OpenApi.Config) {
        super(config);
    }
 
}

