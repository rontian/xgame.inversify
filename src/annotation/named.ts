/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {

    // Used to add named metadata which is used to resolve name-based contextual bindings.
    export function named(name: string | number | symbol) {
        return function (target: any, targetKey: string, index?: number) {
            const metadata = new Metadata(NAMED_TAG, name);
            if (typeof index === "number") {
                tagParameter(target, targetKey, index, metadata);
            } else {
                tagProperty(target, targetKey, metadata);
            }
        };
    }
}
