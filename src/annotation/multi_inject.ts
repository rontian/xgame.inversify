/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {
    export function multiInject(serviceIdentifier: interfaces.ServiceIdentifier<any>) {
        return function (target: any, targetKey: string, index?: number) {

            const metadata = new Metadata(MULTI_INJECT_TAG, serviceIdentifier);

            if (typeof index === "number") {
                tagParameter(target, targetKey, index, metadata);
            } else {
                tagProperty(target, targetKey, metadata);
            }

        };
    }
}