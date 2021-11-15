/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
namespace inversify {

    export class Context implements interfaces.Context {

        public guid: string;
        public kernel: interfaces.Kernel;
        public plan: interfaces.Plan;

        public constructor(kernel: interfaces.Kernel) {
            this.guid = guid();
            this.kernel = kernel;
        }

        public addPlan(plan: interfaces.Plan) {
            this.plan = plan;
        }
    }

}
