/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {

    export type ServiceIdentifierOrFunc = interfaces.ServiceIdentifier<any> | LazyServiceIdentifer;

    export class LazyServiceIdentifer<T = any> {
        private _cb: () => interfaces.ServiceIdentifier<T>;
        public constructor(cb: () => interfaces.ServiceIdentifier<T>) {
            this._cb = cb;
        }

        public unwrap() {
            return this._cb();
        }
    }

    export function inject(serviceIdentifier: ServiceIdentifierOrFunc) {
        return function (target: any, targetKey: string, index?: number | PropertyDescriptor): void {
            if (serviceIdentifier === undefined) {
                throw new Error(UNDEFINED_INJECT_ANNOTATION(target.name));
            }

            const metadata = new Metadata(INJECT_TAG, serviceIdentifier);

            if (typeof index === "number") {
                tagParameter(target, targetKey, index, metadata);
            } else {
                tagProperty(target, targetKey, metadata);
            }

        };
    }

}