/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {
    export class Metadata implements interfaces.Metadata {

        public key: string | number | symbol;
        public value: any;

        public constructor(key: string | number | symbol, value: any) {
            this.key = key;
            this.value = value;
        }

        public toString() {
            if (this.key === NAMED_TAG) {
                return `named: ${this.value.toString()} `;
            } else {
                return `tagged: { key:${this.key.toString()}, value: ${this.value} }`;
            }
        }
    }

}