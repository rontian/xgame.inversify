/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
namespace ioc {
    export class Metadata implements interfaces.Metadata {

        public key: string;
        public value: any;

        constructor(key: string, value: any) {
            this.key = key;
            this.value = value;
        }

        public toString() {
            if (this.key === NAMED_TAG) {
                return `named: ${this.value} `;
            } else {
                return `tagged: { key:${this.key}, value: ${this.value} }`;
            }
        }
    }

}
