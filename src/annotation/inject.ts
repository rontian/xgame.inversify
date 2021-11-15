/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
namespace inversify {

    export function inject(serviceIdentifier: interfaces.ServiceIdentifier<any>) {
        return function (target: any, targetKey: string, index?: number) {

            let metadata = new Metadata(INJECT_TAG, serviceIdentifier);

            if (typeof index === "number") {
                return tagParameter(target, targetKey, index, metadata);
            } else {
                return tagProperty(target, targetKey, metadata);
            }

        };
    }

}
