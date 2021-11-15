/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
namespace ioc {

    export class KeyValuePair<T> implements interfaces.KeyValuePair<T> {

        public serviceIdentifier: interfaces.ServiceIdentifier<any>;
        public value: Array<T>;
        public guid: string;

        public constructor(serviceIdentifier: interfaces.ServiceIdentifier<any>, value: T) {
            this.serviceIdentifier = serviceIdentifier;
            this.value = new Array<T>();
            this.value.push(value);
            this.guid = guid();
        }
    }
}
