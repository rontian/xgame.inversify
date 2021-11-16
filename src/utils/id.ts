/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {
    let idCounter = 0;

    export function id(): number {
        return idCounter++;
    }
}
