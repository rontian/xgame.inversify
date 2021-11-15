/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
namespace inversify {
    export class KernelModule implements interfaces.KernelModule {

        public guid: string;
        public registry: (bind: interfaces.Bind) => void;

        public constructor(registry: (bind: interfaces.Bind) => void) {
            this.guid = guid();
            this.registry = registry;
        }

    }

}
