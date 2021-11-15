/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
namespace ioc {
    export enum BindingType {
        Invalid = 0,
        Instance = 1,
        ConstantValue = 2,
        DynamicValue = 3,
        Constructor = 4,
        Factory = 5,
        Function = 6,
        Provider = 7
    }

}
