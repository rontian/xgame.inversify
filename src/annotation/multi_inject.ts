/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
namespace inversify {
    export function multiInject(serviceIdentifier: interfaces.ServiceIdentifier<any>) {
        return function (target: any, targetKey: string, index?: number) {

            let metadata = new Metadata(MULTI_INJECT_TAG, serviceIdentifier);

            if (typeof index === "number") {
                return tagParameter(target, targetKey, index, metadata);
            } else {
                return tagProperty(target, targetKey, metadata);
            }

        };
    }
}
