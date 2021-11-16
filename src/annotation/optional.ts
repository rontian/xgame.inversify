/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {

    export function optional() {
        return function (target: any, targetKey: string, index?: number) {

            const metadata = new Metadata(OPTIONAL_TAG, true);

            if (typeof index === "number") {
                tagParameter(target, targetKey, index, metadata);
            } else {
                tagProperty(target, targetKey, metadata);
            }

        };
    }

}