/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {
    export function postConstruct() {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            const metadata = new Metadata(POST_CONSTRUCT, propertyKey);

            if (Reflect.hasOwnMetadata(POST_CONSTRUCT, target.constructor)) {
                throw new Error(MULTIPLE_POST_CONSTRUCT_METHODS);
            }
            Reflect.defineMetadata(POST_CONSTRUCT, metadata, target.constructor);
        };
    }

}
