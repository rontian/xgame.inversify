/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
namespace inversify {
    export function targetName(name: string) {
        return function (target: any, targetKey: string, index: number) {
            let metadata = new Metadata(NAME_TAG, name);
            return tagParameter(target, targetKey, index, metadata);
        };
    }

}
