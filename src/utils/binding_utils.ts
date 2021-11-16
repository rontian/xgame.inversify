/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {

    export const multiBindToService = (container: interfaces.Container) =>
        (service: interfaces.ServiceIdentifier<any>) =>
            (...types: interfaces.ServiceIdentifier<any>[]) =>
                types.forEach((t) => container.bind(t).toService(service));
}