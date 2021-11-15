/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
namespace ioc {

    export function unmanaged() {
        return function (target: any, targetKey: string, index: number) {
            let metadata = new Metadata(UNMANAGED_TAG, true);
            return tagParameter(target, targetKey, index, metadata);
        };
    }
}
