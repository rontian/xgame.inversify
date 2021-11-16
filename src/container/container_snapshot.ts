/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {

    export class ContainerSnapshot implements interfaces.ContainerSnapshot {

        public bindings: interfaces.Lookup<interfaces.Binding<any>>;
        public middleware: interfaces.Next | null;

        public static of(bindings: interfaces.Lookup<interfaces.Binding<any>>, middleware: interfaces.Next | null) {
            const snapshot = new ContainerSnapshot();
            snapshot.bindings = bindings;
            snapshot.middleware = middleware;
            return snapshot;
        }

    }

}