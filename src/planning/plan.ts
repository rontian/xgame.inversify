/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
namespace inversify {
    export class Plan implements interfaces.Plan {

        public parentContext: interfaces.Context;
        public rootRequest: interfaces.Request;

        public constructor(parentContext: interfaces.Context, rootRequest: interfaces.Request) {
            this.parentContext = parentContext;
            this.rootRequest = rootRequest;
        }
    }

}
