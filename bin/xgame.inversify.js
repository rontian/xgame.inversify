window.inversify = {};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    function tagParameter(annotationTarget, propertyName, parameterIndex, metadata) {
        var metadataKey = inversify.TAGGED;
        _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex);
    }
    inversify.tagParameter = tagParameter;
    function tagProperty(annotationTarget, propertyName, metadata) {
        var metadataKey = inversify.TAGGED_PROP;
        _tagParameterOrProperty(metadataKey, annotationTarget.constructor, propertyName, metadata);
    }
    inversify.tagProperty = tagProperty;
    function _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex) {
        var paramsOrPropertiesMetadata = {};
        var isParameterDecorator = (typeof parameterIndex === "number");
        var key = (parameterIndex !== undefined && isParameterDecorator) ? parameterIndex.toString() : propertyName;
        // if the decorator is used as a parameter decorator, the property name must be provided
        if (isParameterDecorator && propertyName !== undefined) {
            throw new Error(inversify.INVALID_DECORATOR_OPERATION);
        }
        // read metadata if available
        if (Reflect.hasOwnMetadata(metadataKey, annotationTarget)) {
            paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
        }
        // get metadata for the decorated parameter by its index
        var paramOrPropertyMetadata = paramsOrPropertiesMetadata[key];
        if (!Array.isArray(paramOrPropertyMetadata)) {
            paramOrPropertyMetadata = [];
        }
        else {
            for (var _i = 0, paramOrPropertyMetadata_1 = paramOrPropertyMetadata; _i < paramOrPropertyMetadata_1.length; _i++) {
                var m = paramOrPropertyMetadata_1[_i];
                if (m.key === metadata.key) {
                    throw new Error(inversify.DUPLICATED_METADATA + " " + m.key.toString());
                }
            }
        }
        // set metadata
        paramOrPropertyMetadata.push(metadata);
        paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
        Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);
    }
    function _decorate(decorators, target) {
        Reflect.decorate(decorators, target);
    }
    function _param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    // Allows VanillaJS developers to use decorators:
    // decorate(injectable("Foo", "Bar"), FooBar);
    // decorate(targetName("foo", "bar"), FooBar);
    // decorate(named("foo"), FooBar, 0);
    // decorate(tagged("bar"), FooBar, 1);
    function decorate(decorator, target, parameterIndex) {
        if (typeof parameterIndex === "number") {
            _decorate([_param(parameterIndex, decorator)], target);
        }
        else if (typeof parameterIndex === "string") {
            Reflect.decorate([decorator], target, parameterIndex);
        }
        else {
            _decorate([decorator], target);
        }
    }
    inversify.decorate = decorate;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var LazyServiceIdentifer = (function () {
        function LazyServiceIdentifer(cb) {
            this._cb = cb;
        }
        LazyServiceIdentifer.prototype.unwrap = function () {
            return this._cb();
        };
        return LazyServiceIdentifer;
    }());
    inversify.LazyServiceIdentifer = LazyServiceIdentifer;
    function inject(serviceIdentifier) {
        return function (target, targetKey, index) {
            if (serviceIdentifier === undefined) {
                throw new Error(inversify.UNDEFINED_INJECT_ANNOTATION(target.name));
            }
            var metadata = new inversify.Metadata(inversify.INJECT_TAG, serviceIdentifier);
            if (typeof index === "number") {
                inversify.tagParameter(target, targetKey, index, metadata);
            }
            else {
                inversify.tagProperty(target, targetKey, metadata);
            }
        };
    }
    inversify.inject = inject;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    function injectable() {
        return function (target) {
            if (Reflect.hasOwnMetadata(inversify.PARAM_TYPES, target)) {
                throw new Error(inversify.DUPLICATED_INJECTABLE_DECORATOR);
            }
            var types = Reflect.getMetadata(inversify.DESIGN_PARAM_TYPES, target) || [];
            Reflect.defineMetadata(inversify.PARAM_TYPES, types, target);
            return target;
        };
    }
    inversify.injectable = injectable;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    function multiInject(serviceIdentifier) {
        return function (target, targetKey, index) {
            var metadata = new inversify.Metadata(inversify.MULTI_INJECT_TAG, serviceIdentifier);
            if (typeof index === "number") {
                inversify.tagParameter(target, targetKey, index, metadata);
            }
            else {
                inversify.tagProperty(target, targetKey, metadata);
            }
        };
    }
    inversify.multiInject = multiInject;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    // Used to add named metadata which is used to resolve name-based contextual bindings.
    function named(name) {
        return function (target, targetKey, index) {
            var metadata = new inversify.Metadata(inversify.NAMED_TAG, name);
            if (typeof index === "number") {
                inversify.tagParameter(target, targetKey, index, metadata);
            }
            else {
                inversify.tagProperty(target, targetKey, metadata);
            }
        };
    }
    inversify.named = named;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    function optional() {
        return function (target, targetKey, index) {
            var metadata = new inversify.Metadata(inversify.OPTIONAL_TAG, true);
            if (typeof index === "number") {
                inversify.tagParameter(target, targetKey, index, metadata);
            }
            else {
                inversify.tagProperty(target, targetKey, metadata);
            }
        };
    }
    inversify.optional = optional;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    function postConstruct() {
        return function (target, propertyKey, descriptor) {
            var metadata = new inversify.Metadata(inversify.POST_CONSTRUCT, propertyKey);
            if (Reflect.hasOwnMetadata(inversify.POST_CONSTRUCT, target.constructor)) {
                throw new Error(inversify.MULTIPLE_POST_CONSTRUCT_METHODS);
            }
            Reflect.defineMetadata(inversify.POST_CONSTRUCT, metadata, target.constructor);
        };
    }
    inversify.postConstruct = postConstruct;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    // Used to add custom metadata which is used to resolve metadata-based contextual bindings.
    function tagged(metadataKey, metadataValue) {
        return function (target, targetKey, index) {
            var metadata = new inversify.Metadata(metadataKey, metadataValue);
            if (typeof index === "number") {
                inversify.tagParameter(target, targetKey, index, metadata);
            }
            else {
                inversify.tagProperty(target, targetKey, metadata);
            }
        };
    }
    inversify.tagged = tagged;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    function targetName(name) {
        return function (target, targetKey, index) {
            var metadata = new inversify.Metadata(inversify.NAME_TAG, name);
            inversify.tagParameter(target, targetKey, index, metadata);
        };
    }
    inversify.targetName = targetName;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    function unmanaged() {
        return function (target, targetKey, index) {
            var metadata = new inversify.Metadata(inversify.UNMANAGED_TAG, true);
            inversify.tagParameter(target, targetKey, index, metadata);
        };
    }
    inversify.unmanaged = unmanaged;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    inversify.BindingCount = {
        MultipleBindingsAvailable: 2,
        NoBindingsAvailable: 0,
        OnlyOneBindingAvailable: 1
    };
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var Binding = (function () {
        function Binding(serviceIdentifier, scope) {
            this.id = inversify.id();
            this.activated = false;
            this.serviceIdentifier = serviceIdentifier;
            this.scope = scope;
            this.type = inversify.BindingTypeEnum.Invalid;
            this.constraint = function (request) { return true; };
            this.implementationType = null;
            this.cache = null;
            this.factory = null;
            this.provider = null;
            this.onActivation = null;
            this.dynamicValue = null;
        }
        Binding.prototype.clone = function () {
            var clone = new Binding(this.serviceIdentifier, this.scope);
            clone.activated = (clone.scope === inversify.BindingScopeEnum.Singleton) ? this.activated : false;
            clone.implementationType = this.implementationType;
            clone.dynamicValue = this.dynamicValue;
            clone.scope = this.scope;
            clone.type = this.type;
            clone.factory = this.factory;
            clone.provider = this.provider;
            clone.constraint = this.constraint;
            clone.onActivation = this.onActivation;
            clone.cache = this.cache;
            return clone;
        };
        return Binding;
    }());
    inversify.Binding = Binding;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    inversify.DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
    inversify.DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
    inversify.NULL_ARGUMENT = "NULL argument";
    inversify.KEY_NOT_FOUND = "Key Not Found";
    inversify.AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
    inversify.CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
    inversify.NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
    inversify.MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
    inversify.MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
    inversify.UNDEFINED_INJECT_ANNOTATION = function (name) {
        return "@inject called with undefined this could mean that the class " + name + " has " +
            "a circular dependency problem. You can use a LazyServiceIdentifer to  " +
            "overcome this limitation.";
    };
    inversify.CIRCULAR_DEPENDENCY = "Circular dependency found:";
    inversify.NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
    inversify.INVALID_BINDING_TYPE = "Invalid binding type:";
    inversify.NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
    inversify.INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!";
    inversify.INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
    inversify.INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is " +
        "used as service identifier";
    inversify.INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators " +
        "must be applied to the parameters of a class constructor or a class property.";
    inversify.ARGUMENTS_LENGTH_MISMATCH = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return "The number of constructor arguments in the derived class " +
            (values[0] + " must be >= than the number of constructor arguments of its base class.");
    };
    inversify.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options " +
        "must be an object.";
    inversify.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = "Invalid Container option. Default scope must " +
        "be a string ('singleton' or 'transient').";
    inversify.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = "Invalid Container option. Auto bind injectable must " +
        "be a boolean";
    inversify.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = "Invalid Container option. Skip base check must " +
        "be a boolean";
    inversify.MULTIPLE_POST_CONSTRUCT_METHODS = "Cannot apply @postConstruct decorator multiple times in the same class";
    inversify.POST_CONSTRUCT_ERROR = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return "@postConstruct error in class " + values[0] + ": " + values[1];
    };
    inversify.CIRCULAR_DEPENDENCY_IN_FACTORY = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return "It looks like there is a circular dependency " +
            ("in one of the '" + values[0] + "' bindings. Please investigate bindings with") +
            ("service identifier '" + values[1] + "'.");
    };
    inversify.STACK_OVERFLOW = "Maximum call stack size exceeded";
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    inversify.BindingScopeEnum = {
        Request: "Request",
        Singleton: "Singleton",
        Transient: "Transient"
    };
    inversify.BindingTypeEnum = {
        ConstantValue: "ConstantValue",
        Constructor: "Constructor",
        DynamicValue: "DynamicValue",
        Factory: "Factory",
        Function: "Function",
        Instance: "Instance",
        Invalid: "Invalid",
        Provider: "Provider"
    };
    inversify.TargetTypeEnum = {
        ClassProperty: "ClassProperty",
        ConstructorArgument: "ConstructorArgument",
        Variable: "Variable"
    };
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    // Used for named bindings
    inversify.NAMED_TAG = "named";
    // The name of the target at design time
    inversify.NAME_TAG = "name";
    // The for unmanaged injections (in base classes when using inheritance)
    inversify.UNMANAGED_TAG = "unmanaged";
    // The for optional injections
    inversify.OPTIONAL_TAG = "optional";
    // The type of the binding at design time
    inversify.INJECT_TAG = "inject";
    // The type of the binding at design type for multi-injections
    inversify.MULTI_INJECT_TAG = "multi_inject";
    // used to store constructor arguments tags
    inversify.TAGGED = "inversify:tagged";
    // used to store class properties tags
    inversify.TAGGED_PROP = "inversify:tagged_props";
    // used to store types to be injected
    inversify.PARAM_TYPES = "inversify:paramtypes";
    // used to access design time types
    inversify.DESIGN_PARAM_TYPES = "design:paramtypes";
    // used to identify postConstruct functions
    inversify.POST_CONSTRUCT = "post_construct";
    function getNonCustomTagKeys() {
        return [
            inversify.INJECT_TAG,
            inversify.MULTI_INJECT_TAG,
            inversify.NAME_TAG,
            inversify.UNMANAGED_TAG,
            inversify.NAMED_TAG,
            inversify.OPTIONAL_TAG,
        ];
    }
    inversify.NON_CUSTOM_TAG_KEYS = getNonCustomTagKeys();
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var ContainerModule = (function () {
        function ContainerModule(registry) {
            this.id = inversify.id();
            this.registry = registry;
        }
        return ContainerModule;
    }());
    inversify.ContainerModule = ContainerModule;
    var AsyncContainerModule = (function () {
        function AsyncContainerModule(registry) {
            this.id = inversify.id();
            this.registry = registry;
        }
        return AsyncContainerModule;
    }());
    inversify.AsyncContainerModule = AsyncContainerModule;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var ContainerSnapshot = (function () {
        function ContainerSnapshot() {
        }
        ContainerSnapshot.of = function (bindings, middleware) {
            var snapshot = new ContainerSnapshot();
            snapshot.bindings = bindings;
            snapshot.middleware = middleware;
            return snapshot;
        };
        return ContainerSnapshot;
    }());
    inversify.ContainerSnapshot = ContainerSnapshot;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var Container = (function () {
        function Container(containerOptions) {
            this._appliedMiddleware = [];
            var options = containerOptions || {};
            if (typeof options !== "object") {
                throw new Error("" + inversify.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT);
            }
            if (options.defaultScope === undefined) {
                options.defaultScope = inversify.BindingScopeEnum.Transient;
            }
            else if (options.defaultScope !== inversify.BindingScopeEnum.Singleton &&
                options.defaultScope !== inversify.BindingScopeEnum.Transient &&
                options.defaultScope !== inversify.BindingScopeEnum.Request) {
                throw new Error("" + inversify.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE);
            }
            if (options.autoBindInjectable === undefined) {
                options.autoBindInjectable = false;
            }
            else if (typeof options.autoBindInjectable !== "boolean") {
                throw new Error("" + inversify.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE);
            }
            if (options.skipBaseClassChecks === undefined) {
                options.skipBaseClassChecks = false;
            }
            else if (typeof options.skipBaseClassChecks !== "boolean") {
                throw new Error("" + inversify.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK);
            }
            this.options = {
                autoBindInjectable: options.autoBindInjectable,
                defaultScope: options.defaultScope,
                skipBaseClassChecks: options.skipBaseClassChecks
            };
            this.id = inversify.id();
            this._bindingDictionary = new inversify.Lookup();
            this._snapshots = [];
            this._middleware = null;
            this.parent = null;
            this._metadataReader = new inversify.MetadataReader();
        }
        Container.merge = function (container1, container2) {
            var container3 = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                container3[_i - 2] = arguments[_i];
            }
            var container = new Container();
            var targetContainers = [container1, container2].concat(container3).map(function (targetContainer) { return inversify.getBindingDictionary(targetContainer); });
            var bindingDictionary = inversify.getBindingDictionary(container);
            function copyDictionary(origin, destination) {
                origin.traverse(function (key, value) {
                    value.forEach(function (binding) {
                        destination.add(binding.serviceIdentifier, binding.clone());
                    });
                });
            }
            targetContainers.forEach(function (targetBindingDictionary) {
                copyDictionary(targetBindingDictionary, bindingDictionary);
            });
            return container;
        };
        Container.prototype.load = function () {
            var modules = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                modules[_i] = arguments[_i];
            }
            var getHelpers = this._getContainerModuleHelpersFactory();
            for (var _a = 0, modules_1 = modules; _a < modules_1.length; _a++) {
                var currentModule = modules_1[_a];
                var containerModuleHelpers = getHelpers(currentModule.id);
                currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction);
            }
        };
        Container.prototype.loadAsync = function () {
            var modules = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                modules[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var getHelpers, _i, modules_2, currentModule, containerModuleHelpers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            getHelpers = this._getContainerModuleHelpersFactory();
                            _i = 0, modules_2 = modules;
                            _a.label = 1;
                        case 1:
                            if (!(_i < modules_2.length)) return [3 /*break*/, 4];
                            currentModule = modules_2[_i];
                            containerModuleHelpers = getHelpers(currentModule.id);
                            return [4 /*yield*/, currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Container.prototype.unload = function () {
            var _this = this;
            var modules = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                modules[_i] = arguments[_i];
            }
            var conditionFactory = function (expected) { return function (item) {
                return item.moduleId === expected;
            }; };
            modules.forEach(function (module) {
                var condition = conditionFactory(module.id);
                _this._bindingDictionary.removeByCondition(condition);
            });
        };
        // Registers a type binding
        Container.prototype.bind = function (serviceIdentifier) {
            var scope = this.options.defaultScope || inversify.BindingScopeEnum.Transient;
            var binding = new inversify.Binding(serviceIdentifier, scope);
            this._bindingDictionary.add(serviceIdentifier, binding);
            return new inversify.BindingToSyntax(binding);
        };
        Container.prototype.rebind = function (serviceIdentifier) {
            this.unbind(serviceIdentifier);
            return this.bind(serviceIdentifier);
        };
        // Removes a type binding from the registry by its key
        Container.prototype.unbind = function (serviceIdentifier) {
            try {
                this._bindingDictionary.remove(serviceIdentifier);
            }
            catch (e) {
                throw new Error(inversify.CANNOT_UNBIND + " " + inversify.getServiceIdentifierAsString(serviceIdentifier));
            }
        };
        // Removes all the type bindings from the registry
        Container.prototype.unbindAll = function () {
            this._bindingDictionary = new inversify.Lookup();
        };
        // Allows to check if there are bindings available for serviceIdentifier
        Container.prototype.isBound = function (serviceIdentifier) {
            var bound = this._bindingDictionary.hasKey(serviceIdentifier);
            if (!bound && this.parent) {
                bound = this.parent.isBound(serviceIdentifier);
            }
            return bound;
        };
        Container.prototype.isBoundNamed = function (serviceIdentifier, named) {
            return this.isBoundTagged(serviceIdentifier, inversify.NAMED_TAG, named);
        };
        // Check if a binding with a complex constraint is available without throwing a error. Ancestors are also verified.
        Container.prototype.isBoundTagged = function (serviceIdentifier, key, value) {
            var bound = false;
            // verify if there are bindings available for serviceIdentifier on current binding dictionary
            if (this._bindingDictionary.hasKey(serviceIdentifier)) {
                var bindings = this._bindingDictionary.get(serviceIdentifier);
                var request_1 = inversify.createMockRequest(this, serviceIdentifier, key, value);
                bound = bindings.some(function (b) { return b.constraint(request_1); });
            }
            // verify if there is a parent container that could solve the request
            if (!bound && this.parent) {
                bound = this.parent.isBoundTagged(serviceIdentifier, key, value);
            }
            return bound;
        };
        Container.prototype.snapshot = function () {
            this._snapshots.push(inversify.ContainerSnapshot.of(this._bindingDictionary.clone(), this._middleware));
        };
        Container.prototype.restore = function () {
            var snapshot = this._snapshots.pop();
            if (snapshot === undefined) {
                throw new Error(inversify.NO_MORE_SNAPSHOTS_AVAILABLE);
            }
            this._bindingDictionary = snapshot.bindings;
            this._middleware = snapshot.middleware;
        };
        Container.prototype.createChild = function (containerOptions) {
            var child = new Container(containerOptions || this.options);
            child.parent = this;
            return child;
        };
        Container.prototype.applyMiddleware = function () {
            var middlewares = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                middlewares[_i] = arguments[_i];
            }
            this._appliedMiddleware = this._appliedMiddleware.concat(middlewares);
            var initial = (this._middleware) ? this._middleware : this._planAndResolve();
            this._middleware = middlewares.reduce(function (prev, curr) { return curr(prev); }, initial);
        };
        Container.prototype.applyCustomMetadataReader = function (metadataReader) {
            this._metadataReader = metadataReader;
        };
        // Resolves a dependency by its runtime identifier
        // The runtime identifier must be associated with only one binding
        // use getAll when the runtime identifier is associated with multiple bindings
        Container.prototype.get = function (serviceIdentifier) {
            return this._get(false, false, inversify.TargetTypeEnum.Variable, serviceIdentifier);
        };
        Container.prototype.getTagged = function (serviceIdentifier, key, value) {
            return this._get(false, false, inversify.TargetTypeEnum.Variable, serviceIdentifier, key, value);
        };
        Container.prototype.getNamed = function (serviceIdentifier, named) {
            return this.getTagged(serviceIdentifier, inversify.NAMED_TAG, named);
        };
        // Resolves a dependency by its runtime identifier
        // The runtime identifier can be associated with one or multiple bindings
        Container.prototype.getAll = function (serviceIdentifier) {
            return this._get(true, true, inversify.TargetTypeEnum.Variable, serviceIdentifier);
        };
        Container.prototype.getAllTagged = function (serviceIdentifier, key, value) {
            return this._get(false, true, inversify.TargetTypeEnum.Variable, serviceIdentifier, key, value);
        };
        Container.prototype.getAllNamed = function (serviceIdentifier, named) {
            return this.getAllTagged(serviceIdentifier, inversify.NAMED_TAG, named);
        };
        Container.prototype.resolve = function (constructorFunction) {
            var tempContainer = this.createChild();
            tempContainer.bind(constructorFunction).toSelf();
            this._appliedMiddleware.forEach(function (m) {
                tempContainer.applyMiddleware(m);
            });
            return tempContainer.get(constructorFunction);
        };
        Container.prototype._getContainerModuleHelpersFactory = function () {
            var _this = this;
            var setModuleId = function (bindingToSyntax, moduleId) {
                bindingToSyntax._binding.moduleId = moduleId;
            };
            var getBindFunction = function (moduleId) {
                return function (serviceIdentifier) {
                    var _bind = _this.bind.bind(_this);
                    var bindingToSyntax = _bind(serviceIdentifier);
                    setModuleId(bindingToSyntax, moduleId);
                    return bindingToSyntax;
                };
            };
            var getUnbindFunction = function (moduleId) {
                return function (serviceIdentifier) {
                    var _unbind = _this.unbind.bind(_this);
                    _unbind(serviceIdentifier);
                };
            };
            var getIsboundFunction = function (moduleId) {
                return function (serviceIdentifier) {
                    var _isBound = _this.isBound.bind(_this);
                    return _isBound(serviceIdentifier);
                };
            };
            var getRebindFunction = function (moduleId) {
                return function (serviceIdentifier) {
                    var _rebind = _this.rebind.bind(_this);
                    var bindingToSyntax = _rebind(serviceIdentifier);
                    setModuleId(bindingToSyntax, moduleId);
                    return bindingToSyntax;
                };
            };
            return function (mId) { return ({
                bindFunction: getBindFunction(mId),
                isboundFunction: getIsboundFunction(mId),
                rebindFunction: getRebindFunction(mId),
                unbindFunction: getUnbindFunction(mId)
            }); };
        };
        // Prepares arguments required for resolution and
        // delegates resolution to _middleware if available
        // otherwise it delegates resolution to _planAndResolve
        Container.prototype._get = function (avoidConstraints, isMultiInject, targetType, serviceIdentifier, key, value) {
            var result = null;
            var defaultArgs = {
                avoidConstraints: avoidConstraints,
                contextInterceptor: function (context) { return context; },
                isMultiInject: isMultiInject,
                key: key,
                serviceIdentifier: serviceIdentifier,
                targetType: targetType,
                value: value
            };
            if (this._middleware) {
                result = this._middleware(defaultArgs);
                if (result === undefined || result === null) {
                    throw new Error(inversify.INVALID_MIDDLEWARE_RETURN);
                }
            }
            else {
                result = this._planAndResolve()(defaultArgs);
            }
            return result;
        };
        // Planner creates a plan and Resolver resolves a plan
        // one of the jobs of the Container is to links the Planner
        // with the Resolver and that is what this function is about
        Container.prototype._planAndResolve = function () {
            var _this = this;
            return function (args) {
                // create a plan
                var context = inversify.plan(_this._metadataReader, _this, args.isMultiInject, args.targetType, args.serviceIdentifier, args.key, args.value, args.avoidConstraints);
                // apply context interceptor
                context = args.contextInterceptor(context);
                // resolve plan
                var result = inversify.resolve(context);
                return result;
            };
        };
        return Container;
    }());
    inversify.Container = Container;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var Lookup = (function () {
        function Lookup() {
            this._map = new inversify._Map();
        }
        Lookup.prototype.getMap = function () {
            return this._map;
        };
        // adds a new entry to _map
        Lookup.prototype.add = function (serviceIdentifier, value) {
            if (serviceIdentifier === null || serviceIdentifier === undefined) {
                throw new Error(inversify.NULL_ARGUMENT);
            }
            if (value === null || value === undefined) {
                throw new Error(inversify.NULL_ARGUMENT);
            }
            var entry = this._map.get(serviceIdentifier);
            if (entry !== undefined) {
                entry.push(value);
                this._map.set(serviceIdentifier, entry);
            }
            else {
                this._map.set(serviceIdentifier, [value]);
            }
        };
        // gets the value of a entry by its key (serviceIdentifier)
        Lookup.prototype.get = function (serviceIdentifier) {
            if (serviceIdentifier === null || serviceIdentifier === undefined) {
                throw new Error(inversify.NULL_ARGUMENT);
            }
            var entry = this._map.get(serviceIdentifier);
            if (entry !== undefined) {
                return entry;
            }
            else {
                throw new Error(inversify.KEY_NOT_FOUND);
            }
        };
        // removes a entry from _map by its key (serviceIdentifier)
        Lookup.prototype.remove = function (serviceIdentifier) {
            if (serviceIdentifier === null || serviceIdentifier === undefined) {
                throw new Error(inversify.NULL_ARGUMENT);
            }
            if (!this._map.delete(serviceIdentifier)) {
                throw new Error(inversify.KEY_NOT_FOUND);
            }
        };
        Lookup.prototype.removeByCondition = function (condition) {
            var _this = this;
            this._map.forEach(function (entries, key) {
                var updatedEntries = entries.filter(function (entry) { return !condition(entry); });
                if (updatedEntries.length > 0) {
                    _this._map.set(key, updatedEntries);
                }
                else {
                    _this._map.delete(key);
                }
            });
        };
        // returns true if _map contains a key (serviceIdentifier)
        Lookup.prototype.hasKey = function (serviceIdentifier) {
            if (serviceIdentifier === null || serviceIdentifier === undefined) {
                throw new Error(inversify.NULL_ARGUMENT);
            }
            return this._map.has(serviceIdentifier);
        };
        // returns a new Lookup instance; note: this is not a deep clone, only Lookup related data structure (dictionary) is
        // cloned, content remains the same
        Lookup.prototype.clone = function () {
            var copy = new Lookup();
            this._map.forEach(function (value, key) {
                value.forEach(function (b) { return copy.add(key, b.clone()); });
            });
            return copy;
        };
        Lookup.prototype.traverse = function (func) {
            this._map.forEach(function (value, key) {
                func(key, value);
            });
        };
        return Lookup;
    }());
    inversify.Lookup = Lookup;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var supportsSymbol = typeof Symbol === "function";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    function CreateMapPolyfill() {
        var cacheSentinel = {};
        var arraySentinel = [];
        var MapIterator = (function () {
            function MapIterator(keys, values, selector) {
                this._index = 0;
                this._keys = keys;
                this._values = values;
                this._selector = selector;
            }
            MapIterator.prototype["@@iterator"] = function () { return this; };
            MapIterator.prototype[iteratorSymbol] = function () { return this; };
            MapIterator.prototype.next = function () {
                var index = this._index;
                if (index >= 0 && index < this._keys.length) {
                    var result = this._selector(this._keys[index], this._values[index]);
                    if (index + 1 >= this._keys.length) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    else {
                        this._index++;
                    }
                    return { value: result, done: false };
                }
                return { value: undefined, done: true };
            };
            MapIterator.prototype.throw = function (error) {
                if (this._index >= 0) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                }
                throw error;
            };
            MapIterator.prototype.return = function (value) {
                if (this._index >= 0) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                }
                return { value: value, done: true };
            };
            return MapIterator;
        }());
        return (function () {
            function Map() {
                this._keys = [];
                this._values = [];
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            }
            Object.defineProperty(Map.prototype, "size", {
                get: function () { return this._keys.length; },
                enumerable: true,
                configurable: true
            });
            Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
            Map.prototype.get = function (key) {
                var index = this._find(key, /*insert*/ false);
                return index >= 0 ? this._values[index] : undefined;
            };
            Map.prototype.set = function (key, value) {
                var index = this._find(key, /*insert*/ true);
                this._values[index] = value;
                return this;
            };
            Map.prototype.delete = function (key) {
                var index = this._find(key, /*insert*/ false);
                if (index >= 0) {
                    var size = this._keys.length;
                    for (var i = index + 1; i < size; i++) {
                        this._keys[i - 1] = this._keys[i];
                        this._values[i - 1] = this._values[i];
                    }
                    this._keys.length--;
                    this._values.length--;
                    if (key === this._cacheKey) {
                        this._cacheKey = cacheSentinel;
                        this._cacheIndex = -2;
                    }
                    return true;
                }
                return false;
            };
            Map.prototype.clear = function () {
                this._keys.length = 0;
                this._values.length = 0;
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            };
            Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
            Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
            Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
            Map.prototype["@@iterator"] = function () { return this.entries(); };
            Map.prototype[iteratorSymbol] = function () { return this.entries(); };
            Map.prototype._find = function (key, insert) {
                if (this._cacheKey !== key) {
                    this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                }
                if (this._cacheIndex < 0 && insert) {
                    this._cacheIndex = this._keys.length;
                    this._keys.push(key);
                    this._values.push(undefined);
                }
                return this._cacheIndex;
            };
            Map.prototype.forEach = function (callback) {
                var iterator = this.entries();
                var r;
                while (r = iterator.next()) {
                    callback(r[1], r[0], this);
                }
            };
            return Map;
        }());
        function getKey(key, _) {
            return key;
        }
        function getValue(_, value) {
            return value;
        }
        function getEntry(key, value) {
            return [key, value];
        }
    }
    inversify._Map = CreateMapPolyfill();
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
/// <reference path="../utils/Map.ts" />
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var Context = (function () {
        function Context(container) {
            this.id = inversify.id();
            this.container = container;
        }
        Context.prototype.addPlan = function (plan) {
            this.plan = plan;
        };
        Context.prototype.setCurrentRequest = function (currentRequest) {
            this.currentRequest = currentRequest;
        };
        return Context;
    }());
    inversify.Context = Context;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var MetadataReader = (function () {
        function MetadataReader() {
        }
        MetadataReader.prototype.getConstructorMetadata = function (constructorFunc) {
            // TypeScript compiler generated annotations
            var compilerGeneratedMetadata = Reflect.getMetadata(inversify.PARAM_TYPES, constructorFunc);
            // User generated constructor annotations
            var userGeneratedMetadata = Reflect.getMetadata(inversify.TAGGED, constructorFunc);
            return {
                compilerGeneratedMetadata: compilerGeneratedMetadata,
                userGeneratedMetadata: userGeneratedMetadata || {}
            };
        };
        MetadataReader.prototype.getPropertiesMetadata = function (constructorFunc) {
            // User generated properties annotations
            var userGeneratedMetadata = Reflect.getMetadata(inversify.TAGGED_PROP, constructorFunc) || [];
            return userGeneratedMetadata;
        };
        return MetadataReader;
    }());
    inversify.MetadataReader = MetadataReader;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var Metadata = (function () {
        function Metadata(key, value) {
            this.key = key;
            this.value = value;
        }
        Metadata.prototype.toString = function () {
            if (this.key === inversify.NAMED_TAG) {
                return "named: " + this.value.toString() + " ";
            }
            else {
                return "tagged: { key:" + this.key.toString() + ", value: " + this.value + " }";
            }
        };
        return Metadata;
    }());
    inversify.Metadata = Metadata;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var Plan = (function () {
        function Plan(parentContext, rootRequest) {
            this.parentContext = parentContext;
            this.rootRequest = rootRequest;
        }
        return Plan;
    }());
    inversify.Plan = Plan;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    function getBindingDictionary(cntnr) {
        return cntnr._bindingDictionary;
    }
    inversify.getBindingDictionary = getBindingDictionary;
    function _createTarget(isMultiInject, targetType, serviceIdentifier, name, key, value) {
        var metadataKey = isMultiInject ? inversify.MULTI_INJECT_TAG : inversify.INJECT_TAG;
        var injectMetadata = new inversify.Metadata(metadataKey, serviceIdentifier);
        var target = new inversify.Target(targetType, name, serviceIdentifier, injectMetadata);
        if (key !== undefined) {
            var tagMetadata = new inversify.Metadata(key, value);
            target.metadata.push(tagMetadata);
        }
        return target;
    }
    function _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target) {
        var bindings = getBindings(context.container, target.serviceIdentifier);
        var activeBindings = [];
        // automatic binding
        if (bindings.length === inversify.BindingCount.NoBindingsAvailable &&
            context.container.options.autoBindInjectable &&
            typeof target.serviceIdentifier === "function" &&
            metadataReader.getConstructorMetadata(target.serviceIdentifier).compilerGeneratedMetadata) {
            context.container.bind(target.serviceIdentifier).toSelf();
            bindings = getBindings(context.container, target.serviceIdentifier);
        }
        // multiple bindings available
        if (!avoidConstraints) {
            // apply constraints if available to reduce the number of active bindings
            activeBindings = bindings.filter(function (binding) {
                var request = new inversify.Request(binding.serviceIdentifier, context, parentRequest, binding, target);
                return binding.constraint(request);
            });
        }
        else {
            // simple injection or multi-injection without constraints
            activeBindings = bindings;
        }
        // validate active bindings
        _validateActiveBindingCount(target.serviceIdentifier, activeBindings, target, context.container);
        return activeBindings;
    }
    function _validateActiveBindingCount(serviceIdentifier, bindings, target, container) {
        switch (bindings.length) {
            case inversify.BindingCount.NoBindingsAvailable:
                if (target.isOptional()) {
                    return bindings;
                }
                else {
                    var serviceIdentifierString = inversify.getServiceIdentifierAsString(serviceIdentifier);
                    var msg = inversify.NOT_REGISTERED;
                    msg += inversify.listMetadataForTarget(serviceIdentifierString, target);
                    msg += inversify.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
                    throw new Error(msg);
                }
            case inversify.BindingCount.OnlyOneBindingAvailable:
                if (!target.isArray()) {
                    return bindings;
                }
            case inversify.BindingCount.MultipleBindingsAvailable:
            default:
                if (!target.isArray()) {
                    var serviceIdentifierString = inversify.getServiceIdentifierAsString(serviceIdentifier);
                    var msg = inversify.AMBIGUOUS_MATCH + " " + serviceIdentifierString;
                    msg += inversify.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
                    throw new Error(msg);
                }
                else {
                    return bindings;
                }
        }
    }
    function _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, parentRequest, target) {
        var activeBindings;
        var childRequest;
        if (parentRequest === null) {
            activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, null, target);
            childRequest = new inversify.Request(serviceIdentifier, context, null, activeBindings, target);
            var thePlan = new inversify.Plan(context, childRequest);
            context.addPlan(thePlan);
        }
        else {
            activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target);
            childRequest = parentRequest.addChildRequest(target.serviceIdentifier, activeBindings, target);
        }
        activeBindings.forEach(function (binding) {
            var subChildRequest = null;
            if (target.isArray()) {
                subChildRequest = childRequest.addChildRequest(binding.serviceIdentifier, binding, target);
            }
            else {
                if (binding.cache) {
                    return;
                }
                subChildRequest = childRequest;
            }
            if (binding.type === inversify.BindingTypeEnum.Instance && binding.implementationType !== null) {
                var dependencies = inversify.getDependencies(metadataReader, binding.implementationType);
                if (!context.container.options.skipBaseClassChecks) {
                    // Throw if a derived class does not implement its constructor explicitly
                    // We do this to prevent errors when a base class (parent) has dependencies
                    // and one of the derived classes (children) has no dependencies
                    var baseClassDependencyCount = inversify.getBaseClassDependencyCount(metadataReader, binding.implementationType);
                    if (dependencies.length < baseClassDependencyCount) {
                        var error = inversify.ARGUMENTS_LENGTH_MISMATCH(inversify.getFunctionName(binding.implementationType));
                        throw new Error(error);
                    }
                }
                dependencies.forEach(function (dependency) {
                    _createSubRequests(metadataReader, false, dependency.serviceIdentifier, context, subChildRequest, dependency);
                });
            }
        });
    }
    function getBindings(container, serviceIdentifier) {
        var bindings = [];
        var bindingDictionary = getBindingDictionary(container);
        if (bindingDictionary.hasKey(serviceIdentifier)) {
            bindings = bindingDictionary.get(serviceIdentifier);
        }
        else if (container.parent !== null) {
            // recursively try to get bindings from parent container
            bindings = getBindings(container.parent, serviceIdentifier);
        }
        return bindings;
    }
    function plan(metadataReader, container, isMultiInject, targetType, serviceIdentifier, key, value, avoidConstraints) {
        if (avoidConstraints === void 0) { avoidConstraints = false; }
        var context = new inversify.Context(container);
        var target = _createTarget(isMultiInject, targetType, serviceIdentifier, "", key, value);
        try {
            _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, null, target);
            return context;
        }
        catch (error) {
            if (inversify.isStackOverflowExeption(error)) {
                if (context.plan) {
                    inversify.circularDependencyToException(context.plan.rootRequest);
                }
            }
            throw error;
        }
    }
    inversify.plan = plan;
    function createMockRequest(container, serviceIdentifier, key, value) {
        var target = new inversify.Target(inversify.TargetTypeEnum.Variable, "", serviceIdentifier, new inversify.Metadata(key, value));
        var context = new inversify.Context(container);
        var request = new inversify.Request(serviceIdentifier, context, null, [], target);
        return request;
    }
    inversify.createMockRequest = createMockRequest;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var QueryableString = (function () {
        function QueryableString(str) {
            this.str = str;
        }
        QueryableString.prototype.startsWith = function (searchString) {
            return this.str.indexOf(searchString) === 0;
        };
        QueryableString.prototype.endsWith = function (searchString) {
            var reverseString = "";
            var reverseSearchString = searchString.split("").reverse().join("");
            reverseString = this.str.split("").reverse().join("");
            return this.startsWith.call({ str: reverseString }, reverseSearchString);
        };
        QueryableString.prototype.contains = function (searchString) {
            return (this.str.indexOf(searchString) !== -1);
        };
        QueryableString.prototype.equals = function (compareString) {
            return this.str === compareString;
        };
        QueryableString.prototype.value = function () {
            return this.str;
        };
        return QueryableString;
    }());
    inversify.QueryableString = QueryableString;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    function getDependencies(metadataReader, func) {
        var constructorName = inversify.getFunctionName(func);
        var targets = getTargets(metadataReader, constructorName, func, false);
        return targets;
    }
    inversify.getDependencies = getDependencies;
    function getTargets(metadataReader, constructorName, func, isBaseClass) {
        var metadata = metadataReader.getConstructorMetadata(func);
        // TypeScript compiler generated annotations
        var serviceIdentifiers = metadata.compilerGeneratedMetadata;
        // All types resolved must be annotated with @injectable
        if (serviceIdentifiers === undefined) {
            var msg = inversify.MISSING_INJECTABLE_ANNOTATION + " " + constructorName + ".";
            throw new Error(msg);
        }
        // User generated annotations
        var constructorArgsMetadata = metadata.userGeneratedMetadata;
        var keys = Object.keys(constructorArgsMetadata);
        var hasUserDeclaredUnknownInjections = (func.length === 0 && keys.length > 0);
        var hasOptionalParameters = keys.length > func.length;
        var iterations = (hasUserDeclaredUnknownInjections || hasOptionalParameters) ? keys.length : func.length;
        // Target instances that represent constructor arguments to be injected
        var constructorTargets = getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations);
        // Target instances that represent properties to be injected
        var propertyTargets = getClassPropsAsTargets(metadataReader, func);
        var targets = constructorTargets.concat(propertyTargets);
        return targets;
    }
    function getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata) {
        // Create map from array of metadata for faster access to metadata
        var targetMetadata = constructorArgsMetadata[index.toString()] || [];
        var metadata = formatTargetMetadata(targetMetadata);
        var isManaged = metadata.unmanaged !== true;
        // Take types to be injected from user-generated metadata
        // if not available use compiler-generated metadata
        var serviceIdentifier = serviceIdentifiers[index];
        var injectIdentifier = (metadata.inject || metadata.multiInject);
        serviceIdentifier = (injectIdentifier) ? (injectIdentifier) : serviceIdentifier;
        // we unwrap LazyServiceIdentifer wrappers to allow circular dependencies on symbols
        if (serviceIdentifier instanceof inversify.LazyServiceIdentifer) {
            serviceIdentifier = serviceIdentifier.unwrap();
        }
        // Types Object and Function are too ambiguous to be resolved
        // user needs to generate metadata manually for those
        if (isManaged) {
            var isObject = serviceIdentifier === Object;
            var isFunction = serviceIdentifier === Function;
            var isUndefined = serviceIdentifier === undefined;
            var isUnknownType = (isObject || isFunction || isUndefined);
            if (!isBaseClass && isUnknownType) {
                var msg = inversify.MISSING_INJECT_ANNOTATION + " argument " + index + " in class " + constructorName + ".";
                throw new Error(msg);
            }
            var target = new inversify.Target(inversify.TargetTypeEnum.ConstructorArgument, metadata.targetName, serviceIdentifier);
            target.metadata = targetMetadata;
            return target;
        }
        return null;
    }
    function getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations) {
        var targets = [];
        for (var i = 0; i < iterations; i++) {
            var index = i;
            var target = getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata);
            if (target !== null) {
                targets.push(target);
            }
        }
        return targets;
    }
    function getClassPropsAsTargets(metadataReader, constructorFunc) {
        var classPropsMetadata = metadataReader.getPropertiesMetadata(constructorFunc);
        var targets = [];
        var keys = Object.keys(classPropsMetadata);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            // the metadata for the property being injected
            var targetMetadata = classPropsMetadata[key];
            // the metadata formatted for easier access
            var metadata = formatTargetMetadata(classPropsMetadata[key]);
            // the name of the property being injected
            var targetName_1 = metadata.targetName || key;
            // Take types to be injected from user-generated metadata
            var serviceIdentifier = (metadata.inject || metadata.multiInject);
            // The property target
            var target = new inversify.Target(inversify.TargetTypeEnum.ClassProperty, targetName_1, serviceIdentifier);
            target.metadata = targetMetadata;
            targets.push(target);
        }
        // Check if base class has injected properties
        var baseConstructor = Object.getPrototypeOf(constructorFunc.prototype).constructor;
        if (baseConstructor !== Object) {
            var baseTargets = getClassPropsAsTargets(metadataReader, baseConstructor);
            targets = targets.concat(baseTargets);
        }
        return targets;
    }
    function getBaseClassDependencyCount(metadataReader, func) {
        var baseConstructor = Object.getPrototypeOf(func.prototype).constructor;
        if (baseConstructor !== Object) {
            // get targets for base class
            var baseConstructorName = inversify.getFunctionName(baseConstructor);
            var targets = getTargets(metadataReader, baseConstructorName, baseConstructor, true);
            // get unmanaged metadata
            var metadata = targets.map(function (t) {
                return t.metadata.filter(function (m) {
                    return m.key === inversify.UNMANAGED_TAG;
                });
            });
            // Compare the number of constructor arguments with the number of
            // unmanaged dependencies unmanaged dependencies are not required
            var unmanagedCount = [].concat.apply([], metadata).length;
            var dependencyCount = targets.length - unmanagedCount;
            if (dependencyCount > 0) {
                return dependencyCount;
            }
            else {
                return getBaseClassDependencyCount(metadataReader, baseConstructor);
            }
        }
        else {
            return 0;
        }
    }
    inversify.getBaseClassDependencyCount = getBaseClassDependencyCount;
    function formatTargetMetadata(targetMetadata) {
        // Create map from array of metadata for faster access to metadata
        var targetMetadataMap = {};
        targetMetadata.forEach(function (m) {
            targetMetadataMap[m.key.toString()] = m.value;
        });
        // user generated metadata
        return {
            inject: targetMetadataMap[inversify.INJECT_TAG],
            multiInject: targetMetadataMap[inversify.MULTI_INJECT_TAG],
            targetName: targetMetadataMap[inversify.NAME_TAG],
            unmanaged: targetMetadataMap[inversify.UNMANAGED_TAG]
        };
    }
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var Request = (function () {
        function Request(serviceIdentifier, parentContext, parentRequest, bindings, target) {
            this.id = inversify.id();
            this.serviceIdentifier = serviceIdentifier;
            this.parentContext = parentContext;
            this.parentRequest = parentRequest;
            this.target = target;
            this.childRequests = [];
            this.bindings = (Array.isArray(bindings) ? bindings : [bindings]);
            // Set requestScope if Request is the root request
            this.requestScope = parentRequest === null
                ? new inversify._Map()
                : null;
        }
        Request.prototype.addChildRequest = function (serviceIdentifier, bindings, target) {
            var child = new Request(serviceIdentifier, this.parentContext, this, bindings, target);
            this.childRequests.push(child);
            return child;
        };
        return Request;
    }());
    inversify.Request = Request;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var Target = (function () {
        function Target(type, name, serviceIdentifier, namedOrTagged) {
            this.id = inversify.id();
            this.type = type;
            this.serviceIdentifier = serviceIdentifier;
            this.name = new inversify.QueryableString(name || "");
            this.metadata = new Array();
            var metadataItem = null;
            // is named target
            if (typeof namedOrTagged === "string") {
                metadataItem = new inversify.Metadata(inversify.NAMED_TAG, namedOrTagged);
            }
            else if (namedOrTagged instanceof inversify.Metadata) {
                // is target with metadata
                metadataItem = namedOrTagged;
            }
            // target has metadata
            if (metadataItem !== null) {
                this.metadata.push(metadataItem);
            }
        }
        Target.prototype.hasTag = function (key) {
            for (var _i = 0, _a = this.metadata; _i < _a.length; _i++) {
                var m = _a[_i];
                if (m.key === key) {
                    return true;
                }
            }
            return false;
        };
        Target.prototype.isArray = function () {
            return this.hasTag(inversify.MULTI_INJECT_TAG);
        };
        Target.prototype.matchesArray = function (name) {
            return this.matchesTag(inversify.MULTI_INJECT_TAG)(name);
        };
        Target.prototype.isNamed = function () {
            return this.hasTag(inversify.NAMED_TAG);
        };
        Target.prototype.isTagged = function () {
            return this.metadata.some(function (metadata) { return inversify.NON_CUSTOM_TAG_KEYS.every(function (key) { return metadata.key !== key; }); });
        };
        Target.prototype.isOptional = function () {
            return this.matchesTag(inversify.OPTIONAL_TAG)(true);
        };
        Target.prototype.getNamedTag = function () {
            if (this.isNamed()) {
                return this.metadata.filter(function (m) { return m.key === inversify.NAMED_TAG; })[0];
            }
            return null;
        };
        Target.prototype.getCustomTags = function () {
            if (this.isTagged()) {
                return this.metadata.filter(function (metadata) { return inversify.NON_CUSTOM_TAG_KEYS.every(function (key) { return metadata.key !== key; }); });
            }
            else {
                return null;
            }
        };
        Target.prototype.matchesNamedTag = function (name) {
            return this.matchesTag(inversify.NAMED_TAG)(name);
        };
        Target.prototype.matchesTag = function (key) {
            var _this = this;
            return function (value) {
                for (var _i = 0, _a = _this.metadata; _i < _a.length; _i++) {
                    var m = _a[_i];
                    if (m.key === key && m.value === value) {
                        return true;
                    }
                }
                return false;
            };
        };
        return Target;
    }());
    inversify.Target = Target;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    function _injectProperties(instance, childRequests, resolveRequest) {
        var propertyInjectionsRequests = childRequests.filter(function (childRequest) {
            return (childRequest.target !== null &&
                childRequest.target.type === inversify.TargetTypeEnum.ClassProperty);
        });
        var propertyInjections = propertyInjectionsRequests.map(resolveRequest);
        propertyInjectionsRequests.forEach(function (r, index) {
            var propertyName = "";
            propertyName = r.target.name.value();
            var injection = propertyInjections[index];
            instance[propertyName] = injection;
        });
        return instance;
    }
    function _createInstance(Func, injections) {
        return new (Func.bind.apply(Func, [void 0].concat(injections)))();
    }
    function _postConstruct(constr, result) {
        if (Reflect.hasMetadata(inversify.POST_CONSTRUCT, constr)) {
            var data = Reflect.getMetadata(inversify.POST_CONSTRUCT, constr);
            try {
                result[data.value]();
            }
            catch (e) {
                throw new Error(inversify.POST_CONSTRUCT_ERROR(constr.name, e.message));
            }
        }
    }
    function resolveInstance(constr, childRequests, resolveRequest) {
        var result = null;
        if (childRequests.length > 0) {
            var constructorInjectionsRequests = childRequests.filter(function (childRequest) {
                return (childRequest.target !== null && childRequest.target.type === inversify.TargetTypeEnum.ConstructorArgument);
            });
            var constructorInjections = constructorInjectionsRequests.map(resolveRequest);
            result = _createInstance(constr, constructorInjections);
            result = _injectProperties(result, childRequests, resolveRequest);
        }
        else {
            result = new constr();
        }
        _postConstruct(constr, result);
        return result;
    }
    inversify.resolveInstance = resolveInstance;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var invokeFactory = function (factoryType, serviceIdentifier, fn) {
        try {
            return fn();
        }
        catch (error) {
            if (inversify.isStackOverflowExeption(error)) {
                throw new Error(inversify.CIRCULAR_DEPENDENCY_IN_FACTORY(factoryType, serviceIdentifier.toString()));
            }
            else {
                throw error;
            }
        }
    };
    var _resolveRequest = function (requestScope) {
        return function (request) {
            request.parentContext.setCurrentRequest(request);
            var bindings = request.bindings;
            var childRequests = request.childRequests;
            var targetIsAnArray = request.target && request.target.isArray();
            var targetParentIsNotAnArray = !request.parentRequest ||
                !request.parentRequest.target ||
                !request.target ||
                !request.parentRequest.target.matchesArray(request.target.serviceIdentifier);
            if (targetIsAnArray && targetParentIsNotAnArray) {
                // Create an array instead of creating an instance
                return childRequests.map(function (childRequest) {
                    var _f = _resolveRequest(requestScope);
                    return _f(childRequest);
                });
            }
            else {
                var result = null;
                if (request.target.isOptional() && bindings.length === 0) {
                    return undefined;
                }
                var binding_1 = bindings[0];
                var isSingleton = binding_1.scope === inversify.BindingScopeEnum.Singleton;
                var isRequestSingleton = binding_1.scope === inversify.BindingScopeEnum.Request;
                if (isSingleton && binding_1.activated) {
                    return binding_1.cache;
                }
                if (isRequestSingleton &&
                    requestScope !== null &&
                    requestScope.has(binding_1.id)) {
                    return requestScope.get(binding_1.id);
                }
                if (binding_1.type === inversify.BindingTypeEnum.ConstantValue) {
                    result = binding_1.cache;
                    binding_1.activated = true;
                }
                else if (binding_1.type === inversify.BindingTypeEnum.Function) {
                    result = binding_1.cache;
                    binding_1.activated = true;
                }
                else if (binding_1.type === inversify.BindingTypeEnum.Constructor) {
                    result = binding_1.implementationType;
                }
                else if (binding_1.type === inversify.BindingTypeEnum.DynamicValue && binding_1.dynamicValue !== null) {
                    result = invokeFactory("toDynamicValue", binding_1.serviceIdentifier, function () { return binding_1.dynamicValue(request.parentContext); });
                }
                else if (binding_1.type === inversify.BindingTypeEnum.Factory && binding_1.factory !== null) {
                    result = invokeFactory("toFactory", binding_1.serviceIdentifier, function () { return binding_1.factory(request.parentContext); });
                }
                else if (binding_1.type === inversify.BindingTypeEnum.Provider && binding_1.provider !== null) {
                    result = invokeFactory("toProvider", binding_1.serviceIdentifier, function () { return binding_1.provider(request.parentContext); });
                }
                else if (binding_1.type === inversify.BindingTypeEnum.Instance && binding_1.implementationType !== null) {
                    result = inversify.resolveInstance(binding_1.implementationType, childRequests, _resolveRequest(requestScope));
                }
                else {
                    // The user probably created a binding but didn't finish it
                    // e.g. container.bind<T>("Something"); missing BindingToSyntax
                    var serviceIdentifier = inversify.getServiceIdentifierAsString(request.serviceIdentifier);
                    throw new Error(inversify.INVALID_BINDING_TYPE + " " + serviceIdentifier);
                }
                // use activation handler if available
                if (typeof binding_1.onActivation === "function") {
                    result = binding_1.onActivation(request.parentContext, result);
                }
                // store in cache if scope is singleton
                if (isSingleton) {
                    binding_1.cache = result;
                    binding_1.activated = true;
                }
                if (isRequestSingleton &&
                    requestScope !== null &&
                    !requestScope.has(binding_1.id)) {
                    requestScope.set(binding_1.id, result);
                }
                return result;
            }
        };
    };
    function resolve(context) {
        var _f = _resolveRequest(context.plan.rootRequest.requestScope);
        return _f(context.plan.rootRequest);
    }
    inversify.resolve = resolve;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var BindingInSyntax = (function () {
        function BindingInSyntax(binding) {
            this._binding = binding;
        }
        BindingInSyntax.prototype.inRequestScope = function () {
            this._binding.scope = inversify.BindingScopeEnum.Request;
            return new inversify.BindingWhenOnSyntax(this._binding);
        };
        BindingInSyntax.prototype.inSingletonScope = function () {
            this._binding.scope = inversify.BindingScopeEnum.Singleton;
            return new inversify.BindingWhenOnSyntax(this._binding);
        };
        BindingInSyntax.prototype.inTransientScope = function () {
            this._binding.scope = inversify.BindingScopeEnum.Transient;
            return new inversify.BindingWhenOnSyntax(this._binding);
        };
        return BindingInSyntax;
    }());
    inversify.BindingInSyntax = BindingInSyntax;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var BindingInWhenOnSyntax = (function () {
        function BindingInWhenOnSyntax(binding) {
            this._binding = binding;
            this._bindingWhenSyntax = new inversify.BindingWhenSyntax(this._binding);
            this._bindingOnSyntax = new inversify.BindingOnSyntax(this._binding);
            this._bindingInSyntax = new inversify.BindingInSyntax(binding);
        }
        BindingInWhenOnSyntax.prototype.inRequestScope = function () {
            return this._bindingInSyntax.inRequestScope();
        };
        BindingInWhenOnSyntax.prototype.inSingletonScope = function () {
            return this._bindingInSyntax.inSingletonScope();
        };
        BindingInWhenOnSyntax.prototype.inTransientScope = function () {
            return this._bindingInSyntax.inTransientScope();
        };
        BindingInWhenOnSyntax.prototype.when = function (constraint) {
            return this._bindingWhenSyntax.when(constraint);
        };
        BindingInWhenOnSyntax.prototype.whenTargetNamed = function (name) {
            return this._bindingWhenSyntax.whenTargetNamed(name);
        };
        BindingInWhenOnSyntax.prototype.whenTargetIsDefault = function () {
            return this._bindingWhenSyntax.whenTargetIsDefault();
        };
        BindingInWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
            return this._bindingWhenSyntax.whenTargetTagged(tag, value);
        };
        BindingInWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
            return this._bindingWhenSyntax.whenInjectedInto(parent);
        };
        BindingInWhenOnSyntax.prototype.whenParentNamed = function (name) {
            return this._bindingWhenSyntax.whenParentNamed(name);
        };
        BindingInWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
            return this._bindingWhenSyntax.whenParentTagged(tag, value);
        };
        BindingInWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
            return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
        };
        BindingInWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
            return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
        };
        BindingInWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
            return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
        };
        BindingInWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
            return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
        };
        BindingInWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
            return this._bindingWhenSyntax.whenNoAncestorNamed(name);
        };
        BindingInWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
            return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
        };
        BindingInWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
            return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
        };
        BindingInWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
            return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
        };
        BindingInWhenOnSyntax.prototype.onActivation = function (handler) {
            return this._bindingOnSyntax.onActivation(handler);
        };
        return BindingInWhenOnSyntax;
    }());
    inversify.BindingInWhenOnSyntax = BindingInWhenOnSyntax;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var BindingOnSyntax = (function () {
        function BindingOnSyntax(binding) {
            this._binding = binding;
        }
        BindingOnSyntax.prototype.onActivation = function (handler) {
            this._binding.onActivation = handler;
            return new inversify.BindingWhenSyntax(this._binding);
        };
        return BindingOnSyntax;
    }());
    inversify.BindingOnSyntax = BindingOnSyntax;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var BindingToSyntax = (function () {
        function BindingToSyntax(binding) {
            this._binding = binding;
        }
        BindingToSyntax.prototype.to = function (constructor) {
            this._binding.type = inversify.BindingTypeEnum.Instance;
            this._binding.implementationType = constructor;
            return new inversify.BindingInWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toSelf = function () {
            if (typeof this._binding.serviceIdentifier !== "function") {
                throw new Error("" + inversify.INVALID_TO_SELF_VALUE);
            }
            var self = this._binding.serviceIdentifier;
            return this.to(self);
        };
        BindingToSyntax.prototype.toConstantValue = function (value) {
            this._binding.type = inversify.BindingTypeEnum.ConstantValue;
            this._binding.cache = value;
            this._binding.dynamicValue = null;
            this._binding.implementationType = null;
            this._binding.scope = inversify.BindingScopeEnum.Singleton;
            return new inversify.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toDynamicValue = function (func) {
            this._binding.type = inversify.BindingTypeEnum.DynamicValue;
            this._binding.cache = null;
            this._binding.dynamicValue = func;
            this._binding.implementationType = null;
            return new inversify.BindingInWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toConstructor = function (constructor) {
            this._binding.type = inversify.BindingTypeEnum.Constructor;
            this._binding.implementationType = constructor;
            this._binding.scope = inversify.BindingScopeEnum.Singleton;
            return new inversify.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toFactory = function (factory) {
            this._binding.type = inversify.BindingTypeEnum.Factory;
            this._binding.factory = factory;
            this._binding.scope = inversify.BindingScopeEnum.Singleton;
            return new inversify.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toFunction = function (func) {
            // toFunction is an alias of toConstantValue
            if (typeof func !== "function") {
                throw new Error(inversify.INVALID_FUNCTION_BINDING);
            }
            var bindingWhenOnSyntax = this.toConstantValue(func);
            this._binding.type = inversify.BindingTypeEnum.Function;
            this._binding.scope = inversify.BindingScopeEnum.Singleton;
            return bindingWhenOnSyntax;
        };
        BindingToSyntax.prototype.toAutoFactory = function (serviceIdentifier) {
            this._binding.type = inversify.BindingTypeEnum.Factory;
            this._binding.factory = function (context) {
                var autofactory = function () { return context.container.get(serviceIdentifier); };
                return autofactory;
            };
            this._binding.scope = inversify.BindingScopeEnum.Singleton;
            return new inversify.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toProvider = function (provider) {
            this._binding.type = inversify.BindingTypeEnum.Provider;
            this._binding.provider = provider;
            this._binding.scope = inversify.BindingScopeEnum.Singleton;
            return new inversify.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toService = function (service) {
            this.toDynamicValue(function (context) { return context.container.get(service); });
        };
        return BindingToSyntax;
    }());
    inversify.BindingToSyntax = BindingToSyntax;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var BindingWhenOnSyntax = (function () {
        function BindingWhenOnSyntax(binding) {
            this._binding = binding;
            this._bindingWhenSyntax = new inversify.BindingWhenSyntax(this._binding);
            this._bindingOnSyntax = new inversify.BindingOnSyntax(this._binding);
        }
        BindingWhenOnSyntax.prototype.when = function (constraint) {
            return this._bindingWhenSyntax.when(constraint);
        };
        BindingWhenOnSyntax.prototype.whenTargetNamed = function (name) {
            return this._bindingWhenSyntax.whenTargetNamed(name);
        };
        BindingWhenOnSyntax.prototype.whenTargetIsDefault = function () {
            return this._bindingWhenSyntax.whenTargetIsDefault();
        };
        BindingWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
            return this._bindingWhenSyntax.whenTargetTagged(tag, value);
        };
        BindingWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
            return this._bindingWhenSyntax.whenInjectedInto(parent);
        };
        BindingWhenOnSyntax.prototype.whenParentNamed = function (name) {
            return this._bindingWhenSyntax.whenParentNamed(name);
        };
        BindingWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
            return this._bindingWhenSyntax.whenParentTagged(tag, value);
        };
        BindingWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
            return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
        };
        BindingWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
            return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
        };
        BindingWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
            return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
        };
        BindingWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
            return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
        };
        BindingWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
            return this._bindingWhenSyntax.whenNoAncestorNamed(name);
        };
        BindingWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
            return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
        };
        BindingWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
            return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
        };
        BindingWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
            return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
        };
        BindingWhenOnSyntax.prototype.onActivation = function (handler) {
            return this._bindingOnSyntax.onActivation(handler);
        };
        return BindingWhenOnSyntax;
    }());
    inversify.BindingWhenOnSyntax = BindingWhenOnSyntax;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var BindingWhenSyntax = (function () {
        function BindingWhenSyntax(binding) {
            this._binding = binding;
        }
        BindingWhenSyntax.prototype.when = function (constraint) {
            this._binding.constraint = constraint;
            return new inversify.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenTargetNamed = function (name) {
            this._binding.constraint = inversify.namedConstraint(name);
            return new inversify.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenTargetIsDefault = function () {
            this._binding.constraint = function (request) {
                var targetIsDefault = (request.target !== null) &&
                    (!request.target.isNamed()) &&
                    (!request.target.isTagged());
                return targetIsDefault;
            };
            return new inversify.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenTargetTagged = function (tag, value) {
            this._binding.constraint = inversify.taggedConstraint(tag)(value);
            return new inversify.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenInjectedInto = function (parent) {
            this._binding.constraint = function (request) {
                return inversify.typeConstraint(parent)(request.parentRequest);
            };
            return new inversify.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenParentNamed = function (name) {
            this._binding.constraint = function (request) {
                return inversify.namedConstraint(name)(request.parentRequest);
            };
            return new inversify.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenParentTagged = function (tag, value) {
            this._binding.constraint = function (request) {
                return inversify.taggedConstraint(tag)(value)(request.parentRequest);
            };
            return new inversify.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
            this._binding.constraint = function (request) {
                return inversify.traverseAncerstors(request, inversify.typeConstraint(ancestor));
            };
            return new inversify.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenNoAncestorIs = function (ancestor) {
            this._binding.constraint = function (request) {
                return !inversify.traverseAncerstors(request, inversify.typeConstraint(ancestor));
            };
            return new inversify.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenAnyAncestorNamed = function (name) {
            this._binding.constraint = function (request) {
                return inversify.traverseAncerstors(request, inversify.namedConstraint(name));
            };
            return new inversify.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenNoAncestorNamed = function (name) {
            this._binding.constraint = function (request) {
                return !inversify.traverseAncerstors(request, inversify.namedConstraint(name));
            };
            return new inversify.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
            this._binding.constraint = function (request) {
                return inversify.traverseAncerstors(request, inversify.taggedConstraint(tag)(value));
            };
            return new inversify.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
            this._binding.constraint = function (request) {
                return !inversify.traverseAncerstors(request, inversify.taggedConstraint(tag)(value));
            };
            return new inversify.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
            this._binding.constraint = function (request) {
                return inversify.traverseAncerstors(request, constraint);
            };
            return new inversify.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenNoAncestorMatches = function (constraint) {
            this._binding.constraint = function (request) {
                return !inversify.traverseAncerstors(request, constraint);
            };
            return new inversify.BindingOnSyntax(this._binding);
        };
        return BindingWhenSyntax;
    }());
    inversify.BindingWhenSyntax = BindingWhenSyntax;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    inversify.traverseAncerstors = function (request, constraint) {
        var parent = request.parentRequest;
        if (parent !== null) {
            return constraint(parent) ? true : inversify.traverseAncerstors(parent, constraint);
        }
        else {
            return false;
        }
    };
    // This helpers use currying to help you to generate constraints
    inversify.taggedConstraint = function (key) { return function (value) {
        var constraint = function (request) {
            return request !== null && request.target !== null && request.target.matchesTag(key)(value);
        };
        constraint.metaData = new inversify.Metadata(key, value);
        return constraint;
    }; };
    inversify.namedConstraint = inversify.taggedConstraint(inversify.NAMED_TAG);
    inversify.typeConstraint = function (type) { return function (request) {
        // Using index 0 because constraints are applied
        // to one binding at a time (see Planner class)
        var binding = null;
        if (request !== null) {
            binding = request.bindings[0];
            if (typeof type === "string") {
                var serviceIdentifier = binding.serviceIdentifier;
                return serviceIdentifier === type;
            }
            else {
                var constructor = request.bindings[0].implementationType;
                return type === constructor;
            }
        }
        return false;
    }; };
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    inversify.multiBindToService = function (container) {
        return function (service) {
            return function () {
                var types = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    types[_i] = arguments[_i];
                }
                return types.forEach(function (t) { return container.bind(t).toService(service); });
            };
        };
    };
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    function isStackOverflowExeption(error) {
        return (error instanceof RangeError ||
            error.message === inversify.STACK_OVERFLOW);
    }
    inversify.isStackOverflowExeption = isStackOverflowExeption;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    var idCounter = 0;
    function id() {
        return idCounter++;
    }
    inversify.id = id;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/

(function (inversify) {
    function getServiceIdentifierAsString(serviceIdentifier) {
        if (typeof serviceIdentifier === "function") {
            var _serviceIdentifier = serviceIdentifier;
            return _serviceIdentifier.name;
        }
        else if (typeof serviceIdentifier === "symbol") {
            return serviceIdentifier.toString();
        }
        else {
            var _serviceIdentifier = serviceIdentifier;
            return _serviceIdentifier;
        }
    }
    inversify.getServiceIdentifierAsString = getServiceIdentifierAsString;
    function listRegisteredBindingsForServiceIdentifier(container, serviceIdentifier, getBindings) {
        var registeredBindingsList = "";
        var registeredBindings = getBindings(container, serviceIdentifier);
        if (registeredBindings.length !== 0) {
            registeredBindingsList = "\nRegistered bindings:";
            registeredBindings.forEach(function (binding) {
                // Use "Object as name of constant value injections"
                var name = "Object";
                // Use function name if available
                if (binding.implementationType !== null) {
                    name = getFunctionName(binding.implementationType);
                }
                registeredBindingsList = registeredBindingsList + "\n " + name;
                if (binding.constraint.metaData) {
                    registeredBindingsList = registeredBindingsList + " - " + binding.constraint.metaData;
                }
            });
        }
        return registeredBindingsList;
    }
    inversify.listRegisteredBindingsForServiceIdentifier = listRegisteredBindingsForServiceIdentifier;
    function alreadyDependencyChain(request, serviceIdentifier) {
        if (request.parentRequest === null) {
            return false;
        }
        else if (request.parentRequest.serviceIdentifier === serviceIdentifier) {
            return true;
        }
        else {
            return alreadyDependencyChain(request.parentRequest, serviceIdentifier);
        }
    }
    function dependencyChainToString(request) {
        function _createStringArr(req, result) {
            if (result === void 0) { result = []; }
            var serviceIdentifier = getServiceIdentifierAsString(req.serviceIdentifier);
            result.push(serviceIdentifier);
            if (req.parentRequest !== null) {
                return _createStringArr(req.parentRequest, result);
            }
            return result;
        }
        var stringArr = _createStringArr(request);
        return stringArr.reverse().join(" --> ");
    }
    function circularDependencyToException(request) {
        request.childRequests.forEach(function (childRequest) {
            if (alreadyDependencyChain(childRequest, childRequest.serviceIdentifier)) {
                var services = dependencyChainToString(childRequest);
                throw new Error(inversify.CIRCULAR_DEPENDENCY + " " + services);
            }
            else {
                circularDependencyToException(childRequest);
            }
        });
    }
    inversify.circularDependencyToException = circularDependencyToException;
    function listMetadataForTarget(serviceIdentifierString, target) {
        if (target.isTagged() || target.isNamed()) {
            var m_1 = "";
            var namedTag = target.getNamedTag();
            var otherTags = target.getCustomTags();
            if (namedTag !== null) {
                m_1 += namedTag.toString() + "\n";
            }
            if (otherTags !== null) {
                otherTags.forEach(function (tag) {
                    m_1 += tag.toString() + "\n";
                });
            }
            return " " + serviceIdentifierString + "\n " + serviceIdentifierString + " - " + m_1;
        }
        else {
            return " " + serviceIdentifierString;
        }
    }
    inversify.listMetadataForTarget = listMetadataForTarget;
    function getFunctionName(v) {
        if (v.name) {
            return v.name;
        }
        else {
            var name_1 = v.toString();
            var match = name_1.match(/^function\s*([^\s(]+)/);
            return match ? match[1] : "Anonymous function: " + name_1;
        }
    }
    inversify.getFunctionName = getFunctionName;
})(inversify || (inversify = {}));
