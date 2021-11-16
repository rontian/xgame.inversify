/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {

    export class MetadataReader implements interfaces.MetadataReader {

        public getConstructorMetadata(constructorFunc: Function): interfaces.ConstructorMetadata {

            // TypeScript compiler generated annotations
            const compilerGeneratedMetadata = Reflect.getMetadata(PARAM_TYPES, constructorFunc);

            // User generated constructor annotations
            const userGeneratedMetadata = Reflect.getMetadata(TAGGED, constructorFunc);

            return {
                compilerGeneratedMetadata,
                userGeneratedMetadata: userGeneratedMetadata || {}
            };

        }

        public getPropertiesMetadata(constructorFunc: Function): interfaces.MetadataMap {
            // User generated properties annotations
            const userGeneratedMetadata = Reflect.getMetadata(TAGGED_PROP, constructorFunc) || [];
            return userGeneratedMetadata;
        }

    }
}
