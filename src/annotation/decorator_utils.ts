/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {

    export function tagParameter(
        annotationTarget: any,
        propertyName: string,
        parameterIndex: number,
        metadata: interfaces.Metadata
    ) {
        const metadataKey = TAGGED;
        _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex);
    }

    export function tagProperty(
        annotationTarget: any,
        propertyName: string,
        metadata: interfaces.Metadata
    ) {
        const metadataKey = TAGGED_PROP;
        _tagParameterOrProperty(metadataKey, annotationTarget.constructor, propertyName, metadata);
    }

    function _tagParameterOrProperty(
        metadataKey: string,
        annotationTarget: any,
        propertyName: string,
        metadata: interfaces.Metadata,
        parameterIndex?: number
    ) {

        let paramsOrPropertiesMetadata: interfaces.ReflectResult = {};
        const isParameterDecorator = (typeof parameterIndex === "number");
        const key: string = (parameterIndex !== undefined && isParameterDecorator) ? parameterIndex.toString() : propertyName;

        // if the decorator is used as a parameter decorator, the property name must be provided
        if (isParameterDecorator && propertyName !== undefined) {
            throw new Error(INVALID_DECORATOR_OPERATION);
        }

        // read metadata if available
        if (Reflect.hasOwnMetadata(metadataKey, annotationTarget)) {
            paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
        }

        // get metadata for the decorated parameter by its index
        let paramOrPropertyMetadata: interfaces.Metadata[] = paramsOrPropertiesMetadata[key];

        if (!Array.isArray(paramOrPropertyMetadata)) {
            paramOrPropertyMetadata = [];
        } else {
            for (const m of paramOrPropertyMetadata) {
                if (m.key === metadata.key) {
                    throw new Error(`${DUPLICATED_METADATA} ${m.key.toString()}`);
                }
            }
        }

        // set metadata
        paramOrPropertyMetadata.push(metadata);
        paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
        Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);

    }

    function _decorate(decorators: any[], target: any): void {
        Reflect.decorate(decorators, target);
    }

    function _param(paramIndex: number, decorator: ParameterDecorator) {
        return function (target: any, key: string) { decorator(target, key, paramIndex); };
    }

    // Allows VanillaJS developers to use decorators:
    // decorate(injectable("Foo", "Bar"), FooBar);
    // decorate(targetName("foo", "bar"), FooBar);
    // decorate(named("foo"), FooBar, 0);
    // decorate(tagged("bar"), FooBar, 1);
    export function decorate(
        decorator: (ClassDecorator | ParameterDecorator | MethodDecorator),
        target: any,
        parameterIndex?: number | string): void {

        if (typeof parameterIndex === "number") {
            _decorate([_param(parameterIndex, decorator as ParameterDecorator)], target);
        } else if (typeof parameterIndex === "string") {
            Reflect.decorate([decorator as MethodDecorator], target, parameterIndex);
        } else {
            _decorate([decorator as ClassDecorator], target);
        }
    }

}
