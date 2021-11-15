/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
namespace inversify {
    // Used to add named metadata which is used to resolve name-based contextual bindings.
    export function named(name: string) {
        return function (target: any, targetKey: string, index?: number) {
            let metadata = new Metadata(NAMED_TAG, name);
            if (typeof index === "number") {
                return tagParameter(target, targetKey, index, metadata);
            } else {
                return tagProperty(target, targetKey, metadata);
            }
        };
    }

}