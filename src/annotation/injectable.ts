/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
namespace ioc {

    export function injectable() {
        return function (target: any) {

            if (Reflect.hasOwnMetadata(PARAM_TYPES, target) === true) {
                throw new Error(DUPLICATED_INJECTABLE_DECORATOR);
            }

            let types = Reflect.getMetadata(DESIGN_PARAM_TYPES, target) || [];
            Reflect.defineMetadata(PARAM_TYPES, types, target);

            return target;
        };
    }

}
