/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {

    export function unmanaged() {
        return function (target: any, targetKey: string, index: number) {
            const metadata = new Metadata(UNMANAGED_TAG, true);
            tagParameter(target, targetKey, index, metadata);
        };
    }

}
