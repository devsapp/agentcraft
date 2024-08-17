import Eventbridge from '@alicloud/eventbridge20200401';
import * as $OpenApi from '@alicloud/openapi-client';

export default class EventbridgeClient extends Eventbridge {
    constructor(config: $OpenApi.Config) {
        super(config);
    }
}

