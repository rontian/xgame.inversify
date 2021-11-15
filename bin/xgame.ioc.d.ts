/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    function tagParameter(annotationTarget: any, propertyName: string, parameterIndex: number, metadata: interfaces.Metadata): any;
    function tagProperty(annotationTarget: any, propertyName: string, metadata: interfaces.Metadata): any;
    function decorate(decorator: (ClassDecorator | ParameterDecorator), target: any, parameterIndex?: number): void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    function inject(serviceIdentifier: interfaces.ServiceIdentifier<any>): (target: any, targetKey: string, index?: number) => any;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    function injectable(): (target: any) => any;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    function multiInject(serviceIdentifier: interfaces.ServiceIdentifier<any>): (target: any, targetKey: string, index?: number) => any;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    function named(name: string): (target: any, targetKey: string, index?: number) => any;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    function tagged(metadataKey: string, metadataValue: any): (target: any, targetKey: string, index?: number) => any;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    function targetName(name: string): (target: any, targetKey: string, index: number) => any;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    function unmanaged(): (target: any, targetKey: string, index: number) => any;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    enum BindingCount {
        NoBindingsAvailable = 0,
        OnlyOneBindingAvailable = 1,
        MultipleBindingsAvailable = 2,
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    enum BindingScope {
        Transient = 0,
        Singleton = 1,
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    enum BindingType {
        Invalid = 0,
        Instance = 1,
        ConstantValue = 2,
        DynamicValue = 3,
        Constructor = 4,
        Factory = 5,
        Function = 6,
        Provider = 7,
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class Binding<T> implements interfaces.Binding<T> {
        guid: string;
        moduleId: string;
        activated: boolean;
        serviceIdentifier: interfaces.ServiceIdentifier<T>;
        implementationType: interfaces.Newable<T>;
        cache: T;
        dynamicValue: (context: interfaces.Context) => T;
        scope: BindingScope;
        type: BindingType;
        factory: interfaces.FactoryCreator<T>;
        provider: interfaces.ProviderCreator<T>;
        constraint: (request: interfaces.Request) => boolean;
        onActivation: (context: interfaces.Context, injectable: T) => T;
        constructor(serviceIdentifier: interfaces.ServiceIdentifier<T>);
        clone(): interfaces.Binding<T>;
    }
}
declare namespace ioc {
    const DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
    const DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
    const NULL_ARGUMENT = "NULL argument";
    const KEY_NOT_FOUND = "Key Not Found";
    const AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
    const CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
    const NOT_REGISTERED = "No bindings found for serviceIdentifier:";
    const MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
    const MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
    const CIRCULAR_DEPENDENCY = "Circular dependency found:";
    const NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
    const INVALID_BINDING_TYPE = "Invalid binding type:";
    const NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
    const INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Return must be an Array!";
    const INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
    const INVALID_DECORATOR_OPERATION: string;
    const ARGUMENTS_LENGTH_MISMATCH_1 = "The number of constructor arguments in the derived class ";
    const ARGUMENTS_LENGTH_MISMATCH_2 = " must be >= than the number of constructor arguments of its base class.";
}
declare namespace ioc {
    const NAMED_TAG = "named";
    const NAME_TAG = "name";
    const UNMANAGED_TAG = "unmanaged";
    const INJECT_TAG = "inject";
    const MULTI_INJECT_TAG = "multi_inject";
    const TAGGED = "inversify:tagged";
    const TAGGED_PROP = "inversify:tagged_props";
    const PARAM_TYPES = "inversify:paramtypes";
    const DESIGN_PARAM_TYPES = "design:paramtypes";
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    namespace interfaces {
        interface Newable<T> {
            new (...args: any[]): T;
        }
        interface Abstract<T> {
            prototype: T;
        }
        type ServiceIdentifier<T> = (string | symbol | Newable<T> | Abstract<T>);
        interface Binding<T> extends Clonable<Binding<T>> {
            guid: string;
            moduleId: string;
            activated: boolean;
            serviceIdentifier: ServiceIdentifier<T>;
            implementationType: Newable<T>;
            factory: FactoryCreator<any>;
            provider: ProviderCreator<any>;
            constraint: ConstraintFunction;
            onActivation: (context: Context, injectable: T) => T;
            cache: T;
            dynamicValue: (context: Context) => T;
            scope: number;
            type: number;
        }
        interface Factory<T> extends Function {
            (...args: any[]): (((...args: any[]) => T) | T);
        }
        interface FactoryCreator<T> extends Function {
            (context: Context): Factory<T>;
        }
        interface Provider<T> extends Function {
            (): Promise<T>;
        }
        interface ProviderCreator<T> extends Function {
            (context: Context): Provider<T>;
        }
        interface PlanAndResolve<T> {
            (args: PlanAndResolveArgs): T[];
        }
        interface PlanAndResolveArgs {
            multiInject: boolean;
            serviceIdentifier: ServiceIdentifier<any>;
            target: Target;
            contextInterceptor: (contexts: Context) => Context;
        }
        interface Middleware extends Function {
            (next: PlanAndResolve<any>): PlanAndResolve<any>;
        }
        interface Context {
            guid: string;
            kernel: Kernel;
            plan: Plan;
            addPlan(plan: Plan): void;
        }
        interface ReflectResult {
            [key: string]: Metadata[];
        }
        interface Metadata {
            key: string;
            value: any;
        }
        interface Plan {
            parentContext: Context;
            rootRequest: Request;
        }
        interface Planner {
            createContext(kernel: Kernel): Context;
            createPlan(parentContext: Context, binding: Binding<any>, target: Target): Plan;
            getBindings<T>(kernel: Kernel, serviceIdentifier: ServiceIdentifier<T>): Binding<T>[];
            getActiveBindings(parentRequest: Request, target: Target): Binding<any>[];
        }
        interface QueryableString {
            startsWith(searchString: string): boolean;
            endsWith(searchString: string): boolean;
            contains(searchString: string): boolean;
            equals(compareString: string): boolean;
            value(): string;
        }
        interface Request {
            guid: string;
            serviceIdentifier: ServiceIdentifier<any>;
            parentContext: Context;
            parentRequest: Request;
            childRequests: Request[];
            target: Target;
            bindings: Binding<any>[];
            addChildRequest(serviceIdentifier: ServiceIdentifier<any>, bindings: (Binding<any> | Binding<any>[]), target: Target): Request;
        }
        interface Target {
            guid: string;
            serviceIdentifier: ServiceIdentifier<any>;
            type: number;
            name: QueryableString;
            metadata: Array<Metadata>;
            hasTag(key: string): boolean;
            isArray(): boolean;
            matchesArray(name: interfaces.ServiceIdentifier<any>): boolean;
            isNamed(): boolean;
            isTagged(): boolean;
            matchesNamedTag(name: string): boolean;
            matchesTag(key: string): (value: any) => boolean;
        }
        interface Resolver {
            resolve<T>(context: Context): T;
        }
        interface Kernel {
            guid: string;
            parent: Kernel;
            bind<T>(serviceIdentifier: ServiceIdentifier<T>): BindingToSyntax<T>;
            unbind(serviceIdentifier: ServiceIdentifier<any>): void;
            unbindAll(): void;
            isBound(serviceIdentifier: ServiceIdentifier<any>): boolean;
            get<T>(serviceIdentifier: ServiceIdentifier<T>): T;
            getNamed<T>(serviceIdentifier: ServiceIdentifier<T>, named: string): T;
            getTagged<T>(serviceIdentifier: ServiceIdentifier<T>, key: string, value: any): T;
            getAll<T>(serviceIdentifier: ServiceIdentifier<T>): T[];
            load(...modules: KernelModule[]): void;
            unload(...modules: KernelModule[]): void;
            applyMiddleware(...middleware: Middleware[]): void;
            getServiceIdentifierAsString(serviceIdentifier: ServiceIdentifier<any>): string;
            snapshot(): void;
            restore(): void;
        }
        interface Bind extends Function {
            <T>(serviceIdentifier: ServiceIdentifier<T>): BindingToSyntax<T>;
        }
        interface KernelModule {
            guid: string;
            registry: (bind: Bind) => void;
        }
        interface KernelSnapshot {
            bindings: Lookup<Binding<any>>;
            middleware: PlanAndResolve<any>;
        }
        interface Clonable<T> {
            clone(): T;
        }
        interface Lookup<T> extends Clonable<Lookup<T>> {
            add(serviceIdentifier: ServiceIdentifier<any>, value: T): void;
            get(serviceIdentifier: ServiceIdentifier<any>): Array<T>;
            remove(serviceIdentifier: ServiceIdentifier<any>): void;
            removeByModuleId(moduleId: string): void;
            hasKey(serviceIdentifier: ServiceIdentifier<any>): boolean;
        }
        interface KeyValuePair<T> {
            serviceIdentifier: ServiceIdentifier<any>;
            value: Array<T>;
            guid: string;
        }
        interface BindingInSyntax<T> {
            inSingletonScope(): BindingWhenOnSyntax<T>;
            inTransientScope(): BindingWhenOnSyntax<T>;
        }
        interface BindingInWhenOnSyntax<T> extends BindingInSyntax<T>, BindingWhenOnSyntax<T> {
        }
        interface BindingOnSyntax<T> {
            onActivation(fn: (context: Context, injectable: T) => T): BindingWhenSyntax<T>;
        }
        interface BindingToSyntax<T> {
            to(constructor: {
                new (...args: any[]): T;
            }): BindingInWhenOnSyntax<T>;
            toSelf(): BindingInWhenOnSyntax<T>;
            toConstantValue(value: T): BindingWhenOnSyntax<T>;
            toDynamicValue(func: (context: Context) => T): BindingInWhenOnSyntax<T>;
            toConstructor<T2>(constructor: Newable<T2>): BindingWhenOnSyntax<T>;
            toFactory<T2>(factory: FactoryCreator<T2>): BindingWhenOnSyntax<T>;
            toFunction(func: T): BindingWhenOnSyntax<T>;
            toAutoFactory<T2>(serviceIdentifier: ServiceIdentifier<T2>): BindingWhenOnSyntax<T>;
            toProvider<T2>(provider: ProviderCreator<T2>): BindingWhenOnSyntax<T>;
        }
        interface BindingWhenOnSyntax<T> extends BindingWhenSyntax<T>, BindingOnSyntax<T> {
        }
        interface BindingWhenSyntax<T> {
            when(constraint: (request: Request) => boolean): BindingOnSyntax<T>;
            whenTargetNamed(name: string): BindingOnSyntax<T>;
            whenTargetTagged(tag: string, value: any): BindingOnSyntax<T>;
            whenInjectedInto(parent: (Function | string)): BindingOnSyntax<T>;
            whenParentNamed(name: string): BindingOnSyntax<T>;
            whenParentTagged(tag: string, value: any): BindingOnSyntax<T>;
            whenAnyAncestorIs(ancestor: (Function | string)): BindingOnSyntax<T>;
            whenNoAncestorIs(ancestor: (Function | string)): BindingOnSyntax<T>;
            whenAnyAncestorNamed(name: string): BindingOnSyntax<T>;
            whenAnyAncestorTagged(tag: string, value: any): BindingOnSyntax<T>;
            whenNoAncestorNamed(name: string): BindingOnSyntax<T>;
            whenNoAncestorTagged(tag: string, value: any): BindingOnSyntax<T>;
            whenAnyAncestorMatches(constraint: (request: Request) => boolean): BindingOnSyntax<T>;
            whenNoAncestorMatches(constraint: (request: Request) => boolean): BindingOnSyntax<T>;
        }
        interface ConstraintFunction extends Function {
            (request: Request): boolean;
            metaData?: Metadata;
        }
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class KernelModule implements interfaces.KernelModule {
        guid: string;
        registry: (bind: interfaces.Bind) => void;
        constructor(registry: (bind: interfaces.Bind) => void);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class KernelSnapshot implements interfaces.KernelSnapshot {
        bindings: interfaces.Lookup<interfaces.Binding<any>>;
        middleware: interfaces.PlanAndResolve<any>;
        static of(bindings: interfaces.Lookup<interfaces.Binding<any>>, middleware: interfaces.PlanAndResolve<any>): KernelSnapshot;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class Kernel implements interfaces.Kernel {
        guid: string;
        private _planner;
        private _resolver;
        private _middleware;
        private _bindingDictionary;
        private _snapshots;
        private _parentKernel;
        constructor();
        load(...modules: interfaces.KernelModule[]): void;
        unload(...modules: interfaces.KernelModule[]): void;
        bind<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): interfaces.BindingToSyntax<T>;
        unbind(serviceIdentifier: interfaces.ServiceIdentifier<any>): void;
        unbindAll(): void;
        isBound(serviceIdentifier: interfaces.ServiceIdentifier<any>): boolean;
        get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T;
        getNamed<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, named: string): T;
        getTagged<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, key: string, value: any): T;
        snapshot(): void;
        restore(): void;
        getServiceIdentifierAsString(serviceIdentifier: interfaces.ServiceIdentifier<any>): string;
        applyMiddleware(...middlewares: interfaces.Middleware[]): void;
        getAll<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T[];
        getAllNamed<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, named: string): T[];
        getAllTagged<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, key: string, value: any): T[];
        parent: interfaces.Kernel;
        private _get<T>(args);
        private _planAndResolve<T>(args);
        private _getActiveBindings<T>(multiInject, serviceIdentifier, target);
        private _plan<T>(multiInject, serviceIdentifier, target);
        private _createContext<T>(binding, target);
        private _resolve<T>(contexts, contextInterceptor);
        private _listRegisteredBindingsForServiceIdentifier(serviceIdentifier);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class KeyValuePair<T> implements interfaces.KeyValuePair<T> {
        serviceIdentifier: interfaces.ServiceIdentifier<any>;
        value: Array<T>;
        guid: string;
        constructor(serviceIdentifier: interfaces.ServiceIdentifier<any>, value: T);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class Lookup<T extends interfaces.Clonable<T>> implements interfaces.Lookup<T> {
        private _dictionary;
        constructor();
        add(serviceIdentifier: interfaces.ServiceIdentifier<any>, value: T): void;
        get(serviceIdentifier: interfaces.ServiceIdentifier<any>): Array<T>;
        remove(serviceIdentifier: interfaces.ServiceIdentifier<any>): void;
        removeByModuleId(moduleId: string): void;
        hasKey(serviceIdentifier: interfaces.ServiceIdentifier<any>): boolean;
        clone(): interfaces.Lookup<T>;
        private getIndexByKey(serviceIdentifier);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class Context implements interfaces.Context {
        guid: string;
        kernel: interfaces.Kernel;
        plan: interfaces.Plan;
        constructor(kernel: interfaces.Kernel);
        addPlan(plan: interfaces.Plan): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class Metadata implements interfaces.Metadata {
        key: string;
        value: any;
        constructor(key: string, value: any);
        toString(): string;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class Plan implements interfaces.Plan {
        parentContext: interfaces.Context;
        rootRequest: interfaces.Request;
        constructor(parentContext: interfaces.Context, rootRequest: interfaces.Request);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class Planner implements interfaces.Planner {
        createContext(kernel: interfaces.Kernel): interfaces.Context;
        createPlan(context: interfaces.Context, binding: interfaces.Binding<any>, target: interfaces.Target): interfaces.Plan;
        getBindings<T>(kernel: interfaces.Kernel, serviceIdentifier: interfaces.ServiceIdentifier<T>): interfaces.Binding<T>[];
        getActiveBindings(parentRequest: interfaces.Request, target: interfaces.Target): interfaces.Binding<any>[];
        private _createSubRequest(parentRequest, target);
        private _createChildRequest(parentRequest, target, bindings);
        private _throwWhenCircularDependenciesFound(request, previousServiceIdentifiers?);
        private _formatTargetMetadata(targetMetadata);
        private _getTargets(func, isBaseClass);
        private _constructorArgsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, constructorLength);
        private _getClassPropsTargets(func);
        private _getDependencies(func);
        private _baseClassDepencencyCount(func);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class QueryableString implements interfaces.QueryableString {
        private str;
        constructor(str: string);
        startsWith(searchString: string): boolean;
        endsWith(searchString: string): boolean;
        contains(searchString: string): boolean;
        equals(compareString: string): boolean;
        value(): string;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class Request implements interfaces.Request {
        guid: string;
        serviceIdentifier: interfaces.ServiceIdentifier<any>;
        parentContext: interfaces.Context;
        parentRequest: interfaces.Request;
        bindings: interfaces.Binding<any>[];
        childRequests: interfaces.Request[];
        target: interfaces.Target;
        constructor(serviceIdentifier: interfaces.ServiceIdentifier<any>, parentContext: interfaces.Context, parentRequest: interfaces.Request, bindings: (interfaces.Binding<any> | interfaces.Binding<any>[]), target?: interfaces.Target);
        addChildRequest(serviceIdentifier: string, bindings: (interfaces.Binding<any> | interfaces.Binding<any>[]), target: interfaces.Target): interfaces.Request;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    enum TargetType {
        ConstructorArgument = 0,
        ClassProperty = 1,
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class Target implements interfaces.Target {
        guid: string;
        type: TargetType;
        serviceIdentifier: interfaces.ServiceIdentifier<any>;
        name: interfaces.QueryableString;
        metadata: Array<Metadata>;
        constructor(type: TargetType, name: string, serviceIdentifier: interfaces.ServiceIdentifier<any>, namedOrTagged?: (string | Metadata));
        hasTag(key: string): boolean;
        isArray(): boolean;
        matchesArray(name: interfaces.ServiceIdentifier<any>): boolean;
        isNamed(): boolean;
        isTagged(): boolean;
        matchesNamedTag(name: string): boolean;
        matchesTag(key: string): (value: any) => boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class Resolver implements interfaces.Resolver {
        resolve<T>(context: interfaces.Context): T;
        private _resolve(request);
        private _injectProperties(instance, childRequests);
        private _createInstance(Func, injections);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class BindingInSyntax<T> implements interfaces.BindingInSyntax<T> {
        private _binding;
        constructor(binding: interfaces.Binding<T>);
        inSingletonScope(): interfaces.BindingWhenOnSyntax<T>;
        inTransientScope(): interfaces.BindingWhenOnSyntax<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class BindingInWhenOnSyntax<T> implements interfaces.BindingInSyntax<T>, interfaces.BindingWhenSyntax<T>, interfaces.BindingOnSyntax<T> {
        private _bindingInSyntax;
        private _bindingWhenSyntax;
        private _bindingOnSyntax;
        private _binding;
        constructor(binding: interfaces.Binding<T>);
        inSingletonScope(): interfaces.BindingWhenOnSyntax<T>;
        inTransientScope(): interfaces.BindingWhenOnSyntax<T>;
        when(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
        whenTargetNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenTargetTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenInjectedInto(parent: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenParentNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenParentTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorIs(ancestor: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenNoAncestorIs(ancestor: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenNoAncestorNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenNoAncestorTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
        whenNoAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
        onActivation(handler: (context: interfaces.Context, injectable: T) => T): interfaces.BindingWhenSyntax<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class BindingOnSyntax<T> implements interfaces.BindingOnSyntax<T> {
        private _binding;
        constructor(binding: interfaces.Binding<T>);
        onActivation(handler: (context: interfaces.Context, injectable: T) => T): interfaces.BindingWhenSyntax<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class BindingToSyntax<T> implements interfaces.BindingToSyntax<T> {
        private _binding;
        constructor(binding: interfaces.Binding<T>);
        to(constructor: {
            new (...args: any[]): T;
        }): interfaces.BindingInWhenOnSyntax<T>;
        toSelf(): interfaces.BindingInWhenOnSyntax<T>;
        toConstantValue(value: T): interfaces.BindingWhenOnSyntax<T>;
        toDynamicValue(func: (context: interfaces.Context) => T): interfaces.BindingInWhenOnSyntax<T>;
        toConstructor<T2>(constructor: interfaces.Newable<T2>): interfaces.BindingWhenOnSyntax<T>;
        toFactory<T2>(factory: interfaces.FactoryCreator<T2>): interfaces.BindingWhenOnSyntax<T>;
        toFunction(func: T): interfaces.BindingWhenOnSyntax<T>;
        toAutoFactory<T2>(serviceIdentifier: interfaces.ServiceIdentifier<T2>): interfaces.BindingWhenOnSyntax<T>;
        toProvider<T2>(provider: interfaces.ProviderCreator<T2>): interfaces.BindingWhenOnSyntax<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class BindingWhenOnSyntax<T> implements interfaces.BindingWhenSyntax<T>, interfaces.BindingOnSyntax<T> {
        private _bindingWhenSyntax;
        private _bindingOnSyntax;
        private _binding;
        constructor(binding: interfaces.Binding<T>);
        when(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
        whenTargetNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenTargetTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenInjectedInto(parent: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenParentNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenParentTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorIs(ancestor: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenNoAncestorIs(ancestor: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenNoAncestorNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenNoAncestorTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
        whenNoAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
        onActivation(handler: (context: interfaces.Context, injectable: T) => T): interfaces.BindingWhenSyntax<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    class BindingWhenSyntax<T> implements interfaces.BindingWhenSyntax<T> {
        private _binding;
        constructor(binding: interfaces.Binding<T>);
        when(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
        whenTargetNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenTargetTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenInjectedInto(parent: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenParentNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenParentTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorIs(ancestor: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenNoAncestorIs(ancestor: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenNoAncestorNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenNoAncestorTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
        whenNoAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    let traverseAncerstors: (request: interfaces.Request, constraint: interfaces.ConstraintFunction) => boolean;
    let taggedConstraint: (key: string) => (value: any) => interfaces.ConstraintFunction;
    let namedConstraint: (value: any) => interfaces.ConstraintFunction;
    let typeConstraint: (type: string | Function) => (request: interfaces.Request) => boolean;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    function guid(): string;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
declare namespace ioc {
    function getFunctionName(v: any): string;
}
