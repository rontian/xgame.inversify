/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {

    export class ContainerModule implements interfaces.ContainerModule {

        public id: number;
        public registry: interfaces.ContainerModuleCallBack;

        public constructor(registry: interfaces.ContainerModuleCallBack) {
            this.id = id();
            this.registry = registry;
        }

    }

    export class AsyncContainerModule implements interfaces.AsyncContainerModule {

        public id: number;
        public registry: interfaces.AsyncContainerModuleCallBack;

        public constructor(registry: interfaces.AsyncContainerModuleCallBack) {
            this.id = id();
            this.registry = registry;
        }

    }
}