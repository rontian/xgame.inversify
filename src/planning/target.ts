/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
namespace ioc {

    export class Target implements interfaces.Target {

        public guid: string;
        public type: TargetType;
        public serviceIdentifier: interfaces.ServiceIdentifier<any>;
        public name: interfaces.QueryableString;
        public metadata: Array<Metadata>;

        constructor(
            type: TargetType,
            name: string,
            serviceIdentifier: interfaces.ServiceIdentifier<any>,
            namedOrTagged?: (string | Metadata)
        ) {

            this.guid = guid();
            this.type = type;
            this.serviceIdentifier = serviceIdentifier;
            this.name = new QueryableString(name || "");
            this.metadata = new Array<Metadata>();
            let metadataItem: interfaces.Metadata = null;

            // is named target
            if (typeof namedOrTagged === "string") {
                metadataItem = new Metadata(NAMED_TAG, namedOrTagged);
            } else if (namedOrTagged instanceof Metadata) {
                // is target with metadata
                metadataItem = namedOrTagged;
            }

            // target has metadata
            if (metadataItem !== null) {
                this.metadata.push(metadataItem);
            }

        }

        public hasTag(key: string): boolean {
            for (let i = 0; i < this.metadata.length; i++) {
                let m = this.metadata[i];
                if (m.key === key) {
                    return true;
                }
            }
            return false;
        }

        public isArray(): boolean {
            return this.hasTag(MULTI_INJECT_TAG);
        }

        public matchesArray(name: interfaces.ServiceIdentifier<any>): boolean {
            return this.matchesTag(MULTI_INJECT_TAG)(name);
        }

        public isNamed(): boolean {
            return this.hasTag(NAMED_TAG);
        }

        public isTagged(): boolean {
            if (this.metadata.length > 1) {
                return true;
            } else if (this.metadata.length === 1) {
                // NAMED_TAG is not considered a tagged binding
                return !this.hasTag(NAMED_TAG);
            } else {
                return false;
            }
        }

        public matchesNamedTag(name: string): boolean {
            return this.matchesTag(NAMED_TAG)(name);
        }

        public matchesTag(key: string) {
            return (value: any) => {
                for (let i = 0; i < this.metadata.length; i++) {
                    let m = this.metadata[i];
                    if (m.key === key && m.value === value) {
                        return true;
                    }
                }
                return false;
            };
        }

    }
}