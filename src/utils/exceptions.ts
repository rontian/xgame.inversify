/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {

    export function isStackOverflowExeption(error: Error) {
        return (
            error instanceof RangeError ||
            error.message === STACK_OVERFLOW
        );
    }
}