/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
namespace ioc {

    // Used to add custom metadata which is used to resolve metadata-based contextual bindings.
    export function tagged(metadataKey: string, metadataValue: any) {
        return function (target: any, targetKey: string, index?: number) {
            let metadata = new Metadata(metadataKey, metadataValue);
            if (typeof index === "number") {
                return tagParameter(target, targetKey, index, metadata);
            } else {
                return tagProperty(target, targetKey, metadata);
            }
        };
    }

}