/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {

    export function targetName(name: string) {
        return function (target: any, targetKey: string, index: number) {
            const metadata = new Metadata(NAME_TAG, name);
            tagParameter(target, targetKey, index, metadata);
        };
    }

}