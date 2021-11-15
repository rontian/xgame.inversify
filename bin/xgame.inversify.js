window.inversify = {};
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    function tagParameter(annotationTarget, propertyName, parameterIndex, metadata) {
        var metadataKey = inversify.TAGGED;
        return _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex);
    }
    inversify.tagParameter = tagParameter;
    function tagProperty(annotationTarget, propertyName, metadata) {
        var metadataKey = inversify.TAGGED_PROP;
        return _tagParameterOrProperty(metadataKey, annotationTarget.constructor, propertyName, metadata);
    }
    inversify.tagProperty = tagProperty;
    function _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex) {
        var paramsOrPropertiesMetadata = {};
        var isParameterDecorator = (typeof parameterIndex === "number");
        var key = (parameterIndex !== undefined && isParameterDecorator) ? parameterIndex.toString() : propertyName;
        // If the decorator is used as a parameter decorator property name must be provided
        if (isParameterDecorator === true && propertyName !== undefined) {
            throw new Error(inversify.INVALID_DECORATOR_OPERATION);
        }
        // read metadata if avalible
        if (Reflect.hasOwnMetadata(metadataKey, annotationTarget) === true) {
            paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
        }
        // get metadata for the decorated parameter by its index
        var paramOrPropertyMetadata = paramsOrPropertiesMetadata[key];
        if (Array.isArray(paramOrPropertyMetadata) !== true) {
            paramOrPropertyMetadata = [];
        }
        else {
            for (var i = 0; i < paramOrPropertyMetadata.length; i++) {
                var m = paramOrPropertyMetadata[i];
                if (m.key === metadata.key) {
                    throw new Error(inversify.DUPLICATED_METADATA + " " + m.key);
                }
            }
        }
        // set metadata
        paramOrPropertyMetadata.push(metadata);
        paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
        Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);
        return annotationTarget;
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
        else {
            _decorate([decorator], target);
        }
    }
    inversify.decorate = decorate;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    function inject(serviceIdentifier) {
        return function (target, targetKey, index) {
            var metadata = new inversify.Metadata(inversify.INJECT_TAG, serviceIdentifier);
            if (typeof index === "number") {
                return inversify.tagParameter(target, targetKey, index, metadata);
            }
            else {
                return inversify.tagProperty(target, targetKey, metadata);
            }
        };
    }
    inversify.inject = inject;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    function injectable() {
        return function (target) {
            if (Reflect.hasOwnMetadata(inversify.PARAM_TYPES, target) === true) {
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
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    function multiInject(serviceIdentifier) {
        return function (target, targetKey, index) {
            var metadata = new inversify.Metadata(inversify.MULTI_INJECT_TAG, serviceIdentifier);
            if (typeof index === "number") {
                return inversify.tagParameter(target, targetKey, index, metadata);
            }
            else {
                return inversify.tagProperty(target, targetKey, metadata);
            }
        };
    }
    inversify.multiInject = multiInject;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    // Used to add named metadata which is used to resolve name-based contextual bindings.
    function named(name) {
        return function (target, targetKey, index) {
            var metadata = new inversify.Metadata(inversify.NAMED_TAG, name);
            if (typeof index === "number") {
                return inversify.tagParameter(target, targetKey, index, metadata);
            }
            else {
                return inversify.tagProperty(target, targetKey, metadata);
            }
        };
    }
    inversify.named = named;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    // Used to add custom metadata which is used to resolve metadata-based contextual bindings.
    function tagged(metadataKey, metadataValue) {
        return function (target, targetKey, index) {
            var metadata = new inversify.Metadata(metadataKey, metadataValue);
            if (typeof index === "number") {
                return inversify.tagParameter(target, targetKey, index, metadata);
            }
            else {
                return inversify.tagProperty(target, targetKey, metadata);
            }
        };
    }
    inversify.tagged = tagged;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    function targetName(name) {
        return function (target, targetKey, index) {
            var metadata = new inversify.Metadata(inversify.NAME_TAG, name);
            return inversify.tagParameter(target, targetKey, index, metadata);
        };
    }
    inversify.targetName = targetName;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    function unmanaged() {
        return function (target, targetKey, index) {
            var metadata = new inversify.Metadata(inversify.UNMANAGED_TAG, true);
            return inversify.tagParameter(target, targetKey, index, metadata);
        };
    }
    inversify.unmanaged = unmanaged;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var BindingCount;
    (function (BindingCount) {
        BindingCount[BindingCount["NoBindingsAvailable"] = 0] = "NoBindingsAvailable";
        BindingCount[BindingCount["OnlyOneBindingAvailable"] = 1] = "OnlyOneBindingAvailable";
        BindingCount[BindingCount["MultipleBindingsAvailable"] = 2] = "MultipleBindingsAvailable";
    })(BindingCount = inversify.BindingCount || (inversify.BindingCount = {}));
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var BindingScope;
    (function (BindingScope) {
        BindingScope[BindingScope["Transient"] = 0] = "Transient";
        BindingScope[BindingScope["Singleton"] = 1] = "Singleton";
    })(BindingScope = inversify.BindingScope || (inversify.BindingScope = {}));
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var BindingType;
    (function (BindingType) {
        BindingType[BindingType["Invalid"] = 0] = "Invalid";
        BindingType[BindingType["Instance"] = 1] = "Instance";
        BindingType[BindingType["ConstantValue"] = 2] = "ConstantValue";
        BindingType[BindingType["DynamicValue"] = 3] = "DynamicValue";
        BindingType[BindingType["Constructor"] = 4] = "Constructor";
        BindingType[BindingType["Factory"] = 5] = "Factory";
        BindingType[BindingType["Function"] = 6] = "Function";
        BindingType[BindingType["Provider"] = 7] = "Provider";
    })(BindingType = inversify.BindingType || (inversify.BindingType = {}));
})(inversify || (inversify = {}));
// Binding
// -----------
// A type binding (or just a binding) is a mapping between a service type
// (an interface), and an implementation type to be used to satisfy such
// a service requirement.
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var Binding = (function () {
        function Binding(serviceIdentifier) {
            this.guid = inversify.guid();
            this.activated = false;
            this.serviceIdentifier = serviceIdentifier;
            this.scope = inversify.BindingScope.Transient;
            this.type = inversify.BindingType.Invalid;
            this.constraint = function (request) { return true; };
            this.implementationType = null;
            this.cache = null;
            this.factory = null;
            this.provider = null;
            this.onActivation = null;
        }
        Binding.prototype.clone = function () {
            var clone = new Binding(this.serviceIdentifier);
            clone.activated = false;
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

(function (inversify) {
    inversify.DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
    inversify.DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
    inversify.NULL_ARGUMENT = "NULL argument";
    inversify.KEY_NOT_FOUND = "Key Not Found";
    inversify.AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
    inversify.CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
    inversify.NOT_REGISTERED = "No bindings found for serviceIdentifier:";
    inversify.MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
    inversify.MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
    inversify.CIRCULAR_DEPENDENCY = "Circular dependency found:";
    inversify.NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
    inversify.INVALID_BINDING_TYPE = "Invalid binding type:";
    inversify.NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
    inversify.INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Return must be an Array!";
    inversify.INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
    inversify.INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators " +
        "must be applied to the parameters of a class constructor or a class property.";
    inversify.ARGUMENTS_LENGTH_MISMATCH_1 = "The number of constructor arguments in the derived class ";
    inversify.ARGUMENTS_LENGTH_MISMATCH_2 = " must be >= than the number of constructor arguments of its base class.";
})(inversify || (inversify = {}));

(function (inversify) {
    // Used for named bindings
    inversify.NAMED_TAG = "named";
    // The name of the target at design time
    inversify.NAME_TAG = "name";
    // The for unmanaged injections (in base classes when using inheritance)
    inversify.UNMANAGED_TAG = "unmanaged";
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
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var KernelModule = (function () {
        function KernelModule(registry) {
            this.guid = inversify.guid();
            this.registry = registry;
        }
        return KernelModule;
    }());
    inversify.KernelModule = KernelModule;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var KernelSnapshot = (function () {
        function KernelSnapshot() {
        }
        KernelSnapshot.of = function (bindings, middleware) {
            var snapshot = new KernelSnapshot();
            snapshot.bindings = bindings;
            snapshot.middleware = middleware;
            return snapshot;
        };
        return KernelSnapshot;
    }());
    inversify.KernelSnapshot = KernelSnapshot;
})(inversify || (inversify = {}));
// Kernel
// ------
// Inversify is a lightweight pico container for TypeScript
// and JavaScript apps.
// A pico container uses a class constructor to identify and
// inject its dependencies. For this to work, the class needs
// to declare a constructor that includes everything it
// needs injected.
// In order to resolve a dependency, the pico container needs
// to be told which implementation type (classes) to associate
// with each service type (interfaces).
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var Kernel = (function () {
        // Initialize private properties
        function Kernel() {
            this.guid = inversify.guid();
            this._planner = new inversify.Planner();
            this._resolver = new inversify.Resolver();
            this._bindingDictionary = new inversify.Lookup();
            this._middleware = null;
            this._snapshots = [];
        }
        Kernel.prototype.load = function () {
            var _this = this;
            var modules = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                modules[_i] = arguments[_i];
            }
            var getBindFunction = function (moduleId) {
                return function (serviceIdentifier) {
                    var _bind = _this.bind.bind(_this);
                    var bindingToSyntax = _bind(serviceIdentifier);
                    bindingToSyntax._binding.moduleId = moduleId;
                    return bindingToSyntax;
                };
            };
            modules.forEach(function (module) {
                var bindFunction = getBindFunction(module.guid);
                module.registry(bindFunction);
            });
        };
        Kernel.prototype.unload = function () {
            var _this = this;
            var modules = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                modules[_i] = arguments[_i];
            }
            modules.forEach(function (module) {
                _this._bindingDictionary.removeByModuleId(module.guid);
            });
        };
        // Regiters a type binding
        Kernel.prototype.bind = function (serviceIdentifier) {
            var binding = new inversify.Binding(serviceIdentifier);
            this._bindingDictionary.add(serviceIdentifier, binding);
            return new inversify.BindingToSyntax(binding);
        };
        // Removes a type binding from the registry by its key
        Kernel.prototype.unbind = function (serviceIdentifier) {
            try {
                this._bindingDictionary.remove(serviceIdentifier);
            }
            catch (e) {
                throw new Error(inversify.CANNOT_UNBIND + " " + this.getServiceIdentifierAsString(serviceIdentifier));
            }
        };
        // Removes all the type bindings from the registry
        Kernel.prototype.unbindAll = function () {
            this._bindingDictionary = new inversify.Lookup();
        };
        // Allows to check if there are bindings available for serviceIdentifier
        Kernel.prototype.isBound = function (serviceIdentifier) {
            var bindings = this._planner.getBindings(this, serviceIdentifier);
            return bindings.length > 0;
        };
        // Resolves a dependency by its runtime identifier
        // The runtime identifier must be associated with only one binding
        // use getAll when the runtime identifier is associated with multiple bindings
        Kernel.prototype.get = function (serviceIdentifier) {
            return this._get({
                contextInterceptor: function (context) { return context; },
                multiInject: false,
                serviceIdentifier: serviceIdentifier,
                target: null
            })[0];
        };
        Kernel.prototype.getNamed = function (serviceIdentifier, named) {
            return this.getTagged(serviceIdentifier, inversify.NAMED_TAG, named);
        };
        Kernel.prototype.getTagged = function (serviceIdentifier, key, value) {
            var metadata = new inversify.Metadata(key, value);
            var target = new inversify.Target(inversify.TargetType.ConstructorArgument, null, serviceIdentifier, metadata);
            return this._get({
                contextInterceptor: function (context) { return context; },
                multiInject: false,
                serviceIdentifier: serviceIdentifier,
                target: target
            })[0];
        };
        Kernel.prototype.snapshot = function () {
            this._snapshots.push(inversify.KernelSnapshot.of(this._bindingDictionary.clone(), this._middleware));
        };
        Kernel.prototype.restore = function () {
            if (this._snapshots.length === 0) {
                throw new Error(inversify.NO_MORE_SNAPSHOTS_AVAILABLE);
            }
            var snapshot = this._snapshots.pop();
            this._bindingDictionary = snapshot.bindings;
            this._middleware = snapshot.middleware;
        };
        Kernel.prototype.getServiceIdentifierAsString = function (serviceIdentifier) {
            var type = typeof serviceIdentifier;
            if (type === "function") {
                var _serviceIdentifier = serviceIdentifier;
                return _serviceIdentifier.name;
            }
            else if (type === "symbol") {
                return serviceIdentifier.toString();
            }
            else {
                var _serviceIdentifier = serviceIdentifier;
                return _serviceIdentifier;
            }
        };
        Kernel.prototype.applyMiddleware = function () {
            var middlewares = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                middlewares[_i] = arguments[_i];
            }
            var previous = (this._middleware) ? this._middleware : this._planAndResolve.bind(this);
            this._middleware = middlewares.reduce(function (prev, curr) {
                return curr(prev);
            }, previous);
        };
        // Resolves a dependency by its runtime identifier
        // The runtime identifier can be associated with one or multiple bindings
        Kernel.prototype.getAll = function (serviceIdentifier) {
            return this._get({
                contextInterceptor: function (context) { return context; },
                multiInject: true,
                serviceIdentifier: serviceIdentifier,
                target: null
            });
        };
        Kernel.prototype.getAllNamed = function (serviceIdentifier, named) {
            return this.getAllTagged(serviceIdentifier, inversify.NAMED_TAG, named);
        };
        Kernel.prototype.getAllTagged = function (serviceIdentifier, key, value) {
            var metadata = new inversify.Metadata(key, value);
            var target = new inversify.Target(null, null, serviceIdentifier, metadata);
            return this._get({
                contextInterceptor: function (context) { return context; },
                multiInject: true,
                serviceIdentifier: serviceIdentifier,
                target: target
            });
        };
        Object.defineProperty(Kernel.prototype, "parent", {
            set: function (kernel) {
                this._parentKernel = kernel;
            },
            enumerable: true,
            configurable: true
        });
        Kernel.prototype._get = function (args) {
            var result = null;
            if (this._middleware) {
                result = this._middleware(args);
            }
            else {
                result = this._planAndResolve(args);
            }
            if (Array.isArray(result) === false) {
                throw new Error(inversify.INVALID_MIDDLEWARE_RETURN);
            }
            return result;
        };
        Kernel.prototype._planAndResolve = function (args) {
            var contexts = this._plan(args.multiInject, args.serviceIdentifier, args.target);
            var results = this._resolve(contexts, args.contextInterceptor);
            return results;
        };
        Kernel.prototype._getActiveBindings = function (multiInject, serviceIdentifier, target) {
            var bindings = this._planner.getBindings(this, serviceIdentifier);
            // Filter bindings using the target and the binding constraints
            if (target !== null) {
                var request = new inversify.Request(serviceIdentifier, this._planner.createContext(this), null, bindings, target);
                bindings = this._planner.getActiveBindings(request, target);
            }
            switch (bindings.length) {
                case inversify.BindingCount.NoBindingsAvailable:
                    var serviceIdentifierString = this.getServiceIdentifierAsString(serviceIdentifier), msg = inversify.NOT_REGISTERED;
                    if (target !== null) {
                        msg = msg + " " + serviceIdentifierString + "\n " + serviceIdentifierString + " - " + target.metadata[0].toString();
                        msg += this._listRegisteredBindingsForServiceIdentifier(serviceIdentifierString);
                    }
                    else {
                        msg = msg + " " + serviceIdentifierString;
                    }
                    throw new Error(msg);
                case inversify.BindingCount.OnlyOneBindingAvailable:
                    if (multiInject === false) {
                        return bindings;
                    }
                case inversify.BindingCount.MultipleBindingsAvailable:
                default:
                    if (multiInject === false) {
                        var serviceIdentifierString_1 = this.getServiceIdentifierAsString(serviceIdentifier), msg_1 = inversify.AMBIGUOUS_MATCH + " " + serviceIdentifierString_1;
                        msg_1 += this._listRegisteredBindingsForServiceIdentifier(serviceIdentifierString_1);
                        throw new Error(msg_1);
                    }
                    else {
                        return bindings;
                    }
            }
        };
        Kernel.prototype._plan = function (multiInject, serviceIdentifier, target) {
            var _this = this;
            var bindings = this._getActiveBindings(multiInject, serviceIdentifier, target);
            var contexts = bindings.map(function (binding) {
                return _this._createContext(binding, target);
            });
            return contexts;
        };
        Kernel.prototype._createContext = function (binding, target) {
            var context = this._planner.createContext(this);
            this._planner.createPlan(context, binding, target);
            return context;
        };
        Kernel.prototype._resolve = function (contexts, contextInterceptor) {
            var _this = this;
            var results = contexts.map(function (context) {
                return _this._resolver.resolve(contextInterceptor(context));
            });
            return results;
        };
        Kernel.prototype._listRegisteredBindingsForServiceIdentifier = function (serviceIdentifier) {
            var registeredBindingsList = "", registeredBindings = this._planner.getBindings(this, serviceIdentifier);
            if (registeredBindings.length !== 0) {
                registeredBindingsList = "\nRegistered bindings:";
                registeredBindings.forEach(function (binding) {
                    // Use "Object as name of constant value injections"
                    var name = "Object";
                    // Use function name if available
                    if (binding.implementationType !== null) {
                        name = inversify.getFunctionName(binding.implementationType);
                    }
                    registeredBindingsList = registeredBindingsList + "\n " + name;
                    if (binding.constraint.metaData) {
                        registeredBindingsList = registeredBindingsList + " - " + binding.constraint.metaData;
                    }
                });
            }
            return registeredBindingsList;
        };
        return Kernel;
    }());
    inversify.Kernel = Kernel;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var KeyValuePair = (function () {
        function KeyValuePair(serviceIdentifier, value) {
            this.serviceIdentifier = serviceIdentifier;
            this.value = new Array();
            this.value.push(value);
            this.guid = inversify.guid();
        }
        return KeyValuePair;
    }());
    inversify.KeyValuePair = KeyValuePair;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var Lookup = (function () {
        function Lookup() {
            this._dictionary = [];
        }
        // adds a new KeyValuePair to _dictionary
        Lookup.prototype.add = function (serviceIdentifier, value) {
            if (serviceIdentifier === null || serviceIdentifier === undefined) {
                throw new Error(inversify.NULL_ARGUMENT);
            }
            ;
            if (value === null || value === undefined) {
                throw new Error(inversify.NULL_ARGUMENT);
            }
            ;
            var index = this.getIndexByKey(serviceIdentifier);
            if (index !== -1) {
                this._dictionary[index].value.push(value);
            }
            else {
                this._dictionary.push(new inversify.KeyValuePair(serviceIdentifier, value));
            }
        };
        // gets the value of a KeyValuePair by its serviceIdentifier
        Lookup.prototype.get = function (serviceIdentifier) {
            if (serviceIdentifier === null || serviceIdentifier === undefined) {
                throw new Error(inversify.NULL_ARGUMENT);
            }
            var index = this.getIndexByKey(serviceIdentifier);
            if (index !== -1) {
                return this._dictionary[index].value;
            }
            else {
                throw new Error(inversify.KEY_NOT_FOUND);
            }
        };
        // removes a KeyValuePair from _dictionary by its serviceIdentifier
        Lookup.prototype.remove = function (serviceIdentifier) {
            if (serviceIdentifier === null || serviceIdentifier === undefined) {
                throw new Error(inversify.NULL_ARGUMENT);
            }
            var index = this.getIndexByKey(serviceIdentifier);
            if (index !== -1) {
                this._dictionary.splice(index, 1);
            }
            else {
                throw new Error(inversify.KEY_NOT_FOUND);
            }
        };
        Lookup.prototype.removeByModuleId = function (moduleId) {
            this._dictionary.forEach(function (keyValuePair) {
                keyValuePair.value = keyValuePair.value.filter(function (binding) {
                    return binding.moduleId !== moduleId;
                });
            });
            this._dictionary = this._dictionary.filter(function (keyValuePair) {
                return keyValuePair.value.length > 0;
            });
        };
        // returns true if _dictionary contains serviceIdentifier
        Lookup.prototype.hasKey = function (serviceIdentifier) {
            if (serviceIdentifier === null || serviceIdentifier === undefined) {
                throw new Error(inversify.NULL_ARGUMENT);
            }
            var index = this.getIndexByKey(serviceIdentifier);
            if (index !== -1) {
                return true;
            }
            else {
                return false;
            }
        };
        // returns a new Lookup instance; note: this is not a deep clone, only Lookup related data structure (dictionary) is
        // cloned, content remains the same
        Lookup.prototype.clone = function () {
            var l = new Lookup();
            for (var _i = 0, _a = this._dictionary; _i < _a.length; _i++) {
                var entry = _a[_i];
                for (var _b = 0, _c = entry.value; _b < _c.length; _b++) {
                    var binding = _c[_b];
                    l.add(entry.serviceIdentifier, binding.clone());
                }
            }
            return l;
        };
        // finds the location of a KeyValuePair pair in _dictionary by its serviceIdentifier
        Lookup.prototype.getIndexByKey = function (serviceIdentifier) {
            var index = -1;
            for (var i = 0; i < this._dictionary.length; i++) {
                var keyValuePair = this._dictionary[i];
                if (keyValuePair.serviceIdentifier === serviceIdentifier) {
                    index = i;
                }
            }
            return index;
        };
        return Lookup;
    }());
    inversify.Lookup = Lookup;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var Context = (function () {
        function Context(kernel) {
            this.guid = inversify.guid();
            this.kernel = kernel;
        }
        Context.prototype.addPlan = function (plan) {
            this.plan = plan;
        };
        return Context;
    }());
    inversify.Context = Context;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var Metadata = (function () {
        function Metadata(key, value) {
            this.key = key;
            this.value = value;
        }
        Metadata.prototype.toString = function () {
            if (this.key === inversify.NAMED_TAG) {
                return "named: " + this.value + " ";
            }
            else {
                return "tagged: { key:" + this.key + ", value: " + this.value + " }";
            }
        };
        return Metadata;
    }());
    inversify.Metadata = Metadata;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
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
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var Planner = (function () {
        function Planner() {
        }
        Planner.prototype.createContext = function (kernel) {
            return new inversify.Context(kernel);
        };
        Planner.prototype.createPlan = function (context, binding, target) {
            var _this = this;
            var rootRequest = new inversify.Request(binding.serviceIdentifier, context, null, binding, target);
            var plan = new inversify.Plan(context, rootRequest);
            // Plan and Context are duable linked
            context.addPlan(plan);
            if (binding.type === inversify.BindingType.Instance) {
                var dependencies = this._getDependencies(binding.implementationType);
                dependencies.forEach(function (dependency) { _this._createSubRequest(rootRequest, dependency); });
            }
            return plan;
        };
        Planner.prototype.getBindings = function (kernel, serviceIdentifier) {
            var bindings = [];
            var _kernel = kernel;
            var _bindingDictionary = _kernel._bindingDictionary;
            if (_bindingDictionary.hasKey(serviceIdentifier)) {
                bindings = _bindingDictionary.get(serviceIdentifier);
            }
            else if (_kernel._parentKernel !== undefined) {
                // recursively try to get bindings from parent kernel
                bindings = this.getBindings(_kernel._parentKernel, serviceIdentifier);
            }
            return bindings;
        };
        Planner.prototype.getActiveBindings = function (parentRequest, target) {
            var bindings = this.getBindings(parentRequest.parentContext.kernel, target.serviceIdentifier);
            var activeBindings = [];
            if (bindings.length > 1 && target.isArray() === false) {
                // apply constraints if available to reduce the number of active bindings
                activeBindings = bindings.filter(function (binding) {
                    var request = new inversify.Request(binding.serviceIdentifier, parentRequest.parentContext, parentRequest, binding, target);
                    return binding.constraint(request);
                });
            }
            else {
                activeBindings = bindings;
            }
            return activeBindings;
        };
        Planner.prototype._createSubRequest = function (parentRequest, target) {
            try {
                var activeBindings = this.getActiveBindings(parentRequest, target);
                if (activeBindings.length === 0) {
                    // no matching bindings found
                    var serviceIdentifier = parentRequest.parentContext.kernel.getServiceIdentifierAsString(target.serviceIdentifier);
                    throw new Error(inversify.NOT_REGISTERED + " " + serviceIdentifier);
                }
                else if (activeBindings.length > 1 && target.isArray() === false) {
                    // more than one matching binding found but target is not an array
                    var serviceIdentifier = parentRequest.parentContext.kernel.getServiceIdentifierAsString(target.serviceIdentifier);
                    throw new Error(inversify.AMBIGUOUS_MATCH + " " + serviceIdentifier);
                }
                else {
                    // one ore more than one matching bindings found
                    // when more than 1 matching bindings found target is an array
                    this._createChildRequest(parentRequest, target, activeBindings);
                }
            }
            catch (error) {
                if (error instanceof RangeError) {
                    this._throwWhenCircularDependenciesFound(parentRequest.parentContext.plan.rootRequest);
                }
                else {
                    throw new Error(error.message);
                }
            }
        };
        Planner.prototype._createChildRequest = function (parentRequest, target, bindings) {
            var _this = this;
            // Use the only active binding to create a child request
            var childRequest = parentRequest.addChildRequest(target.serviceIdentifier, bindings, target);
            var subChildRequest = childRequest;
            bindings.forEach(function (binding) {
                if (target.isArray()) {
                    subChildRequest = childRequest.addChildRequest(binding.serviceIdentifier, binding, target);
                }
                // Only try to plan sub-dependencies when binding type is BindingType.Instance
                if (binding.type === inversify.BindingType.Instance) {
                    // Create child requests for sub-dependencies if any
                    var subDependencies = _this._getDependencies(binding.implementationType);
                    subDependencies.forEach(function (d, index) {
                        _this._createSubRequest(subChildRequest, d);
                    });
                }
            });
        };
        Planner.prototype._throwWhenCircularDependenciesFound = function (request, previousServiceIdentifiers) {
            var _this = this;
            if (previousServiceIdentifiers === void 0) { previousServiceIdentifiers = []; }
            // Add to list so we know that we have already visit this node in the request tree
            var parentServiceIdentifier = request.parentContext.kernel.getServiceIdentifierAsString(request.serviceIdentifier);
            previousServiceIdentifiers.push(parentServiceIdentifier);
            // iterate child requests
            request.childRequests.forEach(function (childRequest) {
                // the service identifier of a child request
                var childServiceIdentifier = request.parentContext.kernel.getServiceIdentifierAsString(childRequest.serviceIdentifier);
                // check if the child request has been already visited
                if (previousServiceIdentifiers.indexOf(childServiceIdentifier) === -1) {
                    if (childRequest.childRequests.length > 0) {
                        // use recursion to continue traversing the request tree
                        _this._throwWhenCircularDependenciesFound(childRequest, previousServiceIdentifiers);
                    }
                    else {
                        // the node has no child so we add it to list to know that we have already visit this node
                        previousServiceIdentifiers.push(childServiceIdentifier);
                    }
                }
                else {
                    // create description of circular dependency
                    previousServiceIdentifiers.push(childServiceIdentifier);
                    var services = previousServiceIdentifiers.reduce(function (prev, curr) {
                        return (prev !== "") ? prev + " -> " + curr : "" + curr;
                    }, "");
                    // throw when we have already visit this node in the request tree
                    throw new Error(inversify.CIRCULAR_DEPENDENCY + " " + services);
                }
            });
        };
        Planner.prototype._formatTargetMetadata = function (targetMetadata) {
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
        };
        Planner.prototype._getTargets = function (func, isBaseClass) {
            var constructorName = inversify.getFunctionName(func);
            // TypeScript compiler generated annotations
            var serviceIdentifiers = Reflect.getMetadata(inversify.PARAM_TYPES, func);
            // All types resolved bust be annotated with @injectable
            if (serviceIdentifiers === undefined) {
                var msg = inversify.MISSING_INJECTABLE_ANNOTATION + " " + constructorName + ".";
                throw new Error(msg);
            }
            // User generated annotations
            var constructorArgsMetadata = Reflect.getMetadata(inversify.TAGGED, func) || [];
            var targets = (this._constructorArgsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, func.length)).concat((this._getClassPropsTargets(func)));
            return targets;
        };
        Planner.prototype._constructorArgsTargets = function (isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, constructorLength) {
            var targets = [];
            for (var i = 0; i < constructorLength; i++) {
                // Create map from array of metadata for faster access to metadata
                var targetMetadata = constructorArgsMetadata[i.toString()] || [];
                var metadata = this._formatTargetMetadata(targetMetadata);
                // Take types to be injected from user-generated metadata
                // if not available use compiler-generated metadata
                var serviceIndentifier = serviceIdentifiers[i];
                serviceIndentifier = (metadata.inject || metadata.multiInject) ? (metadata.inject || metadata.multiInject) : serviceIndentifier;
                // Types Object and Function are too ambiguous to be resolved
                // user needs to generate metadata manually for those
                var isUnknownType = (serviceIndentifier === Object || serviceIndentifier === Function || serviceIndentifier === undefined);
                if (isBaseClass === false && isUnknownType) {
                    var msg = inversify.MISSING_INJECT_ANNOTATION + " argument " + i + " in class " + constructorName + ".";
                    throw new Error(msg);
                }
                // Create target
                var target = new inversify.Target(inversify.TargetType.ConstructorArgument, metadata.targetName, serviceIndentifier);
                target.metadata = targetMetadata;
                targets.push(target);
            }
            return targets;
        };
        Planner.prototype._getClassPropsTargets = function (func) {
            var classPropsMetadata = Reflect.getMetadata(inversify.TAGGED_PROP, func) || [];
            var targets = [];
            var keys = Object.keys(classPropsMetadata);
            for (var i = 0; i < keys.length; i++) {
                // the key of the property being injected
                var key = keys[i];
                // the metadata for the property being injected
                var targetMetadata = classPropsMetadata[key];
                // the metadata formatted for easier access
                var metadata = this._formatTargetMetadata(classPropsMetadata[key]);
                // the name of the property being injected
                var targetName_1 = metadata.targetName || key;
                // Take types to be injected from user-generated metadata
                var serviceIndentifier = (metadata.inject || metadata.multiInject);
                // The property target
                var target = new inversify.Target(inversify.TargetType.ClassProperty, targetName_1, serviceIndentifier);
                target.metadata = targetMetadata;
                targets.push(target);
            }
            // Check if base class has injected properties
            var baseConstructor = Object.getPrototypeOf(func.prototype).constructor;
            if (baseConstructor !== Object) {
                var baseTargets = this._getClassPropsTargets(baseConstructor);
                targets = targets.concat(baseTargets);
            }
            return targets;
        };
        Planner.prototype._getDependencies = function (func) {
            var constructorName = inversify.getFunctionName(func);
            var targets = this._getTargets(func, false);
            // Throw if a derived class does not implement its constructor explicitly
            // We do this to prevent errors when a base class (parent) has dependencies
            // and one of the derived classes (children) has no dependencies
            var baseClassDepencencyCount = this._baseClassDepencencyCount(func);
            if (targets.length < baseClassDepencencyCount) {
                var error = inversify.ARGUMENTS_LENGTH_MISMATCH_1 + constructorName + inversify.ARGUMENTS_LENGTH_MISMATCH_2;
                throw new Error(error);
            }
            return targets;
        };
        Planner.prototype._baseClassDepencencyCount = function (func) {
            var baseConstructor = Object.getPrototypeOf(func.prototype).constructor;
            if (baseConstructor !== Object) {
                var targets = this._getTargets(baseConstructor, true);
                var metadata = targets.map(function (t) {
                    return t.metadata.filter(function (m) {
                        return m.key === inversify.UNMANAGED_TAG;
                    });
                });
                var unmanagedCount = [].concat.apply([], metadata).length;
                var dependencyCount = targets.length - unmanagedCount;
                if (dependencyCount > 0) {
                    return dependencyCount;
                }
                else {
                    return this._baseClassDepencencyCount(baseConstructor);
                }
            }
            else {
                return 0;
            }
        };
        return Planner;
    }());
    inversify.Planner = Planner;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
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
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var Request = (function () {
        function Request(serviceIdentifier, parentContext, parentRequest, bindings, target) {
            if (target === void 0) { target = null; }
            this.guid = inversify.guid();
            this.serviceIdentifier = serviceIdentifier;
            this.parentContext = parentContext;
            this.parentRequest = parentRequest;
            this.target = target;
            this.childRequests = [];
            this.bindings = (Array.isArray(bindings) ? bindings : ((bindings) ? [bindings] : []));
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
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var TargetType;
    (function (TargetType) {
        TargetType[TargetType["ConstructorArgument"] = 0] = "ConstructorArgument";
        TargetType[TargetType["ClassProperty"] = 1] = "ClassProperty";
    })(TargetType = inversify.TargetType || (inversify.TargetType = {}));
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var Target = (function () {
        function Target(type, name, serviceIdentifier, namedOrTagged) {
            this.guid = inversify.guid();
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
            for (var i = 0; i < this.metadata.length; i++) {
                var m = this.metadata[i];
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
            if (this.metadata.length > 1) {
                return true;
            }
            else if (this.metadata.length === 1) {
                // NAMED_TAG is not considered a tagged binding
                return !this.hasTag(inversify.NAMED_TAG);
            }
            else {
                return false;
            }
        };
        Target.prototype.matchesNamedTag = function (name) {
            return this.matchesTag(inversify.NAMED_TAG)(name);
        };
        Target.prototype.matchesTag = function (key) {
            var _this = this;
            return function (value) {
                for (var i = 0; i < _this.metadata.length; i++) {
                    var m = _this.metadata[i];
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
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var Resolver = (function () {
        function Resolver() {
        }
        Resolver.prototype.resolve = function (context) {
            var rootRequest = context.plan.rootRequest;
            return this._resolve(rootRequest);
        };
        Resolver.prototype._resolve = function (request) {
            var _this = this;
            var bindings = request.bindings;
            var childRequests = request.childRequests;
            if (request.target && request.target.isArray() &&
                (!request.parentRequest.target || !request.parentRequest.target.matchesArray(request.target.serviceIdentifier))) {
                // Create an array instead of creating an instance
                return childRequests.map(function (childRequest) { return _this._resolve(childRequest); });
            }
            else {
                var result = null;
                var binding = bindings[0];
                var isSingleton = binding.scope === inversify.BindingScope.Singleton;
                if (isSingleton && binding.activated === true) {
                    return binding.cache;
                }
                switch (binding.type) {
                    case inversify.BindingType.ConstantValue:
                        result = binding.cache;
                        break;
                    case inversify.BindingType.DynamicValue:
                        result = binding.dynamicValue(request.parentContext);
                        break;
                    case inversify.BindingType.Constructor:
                        result = binding.implementationType;
                        break;
                    case inversify.BindingType.Factory:
                        result = binding.factory(request.parentContext);
                        break;
                    case inversify.BindingType.Function:
                        result = binding.cache;
                        break;
                    case inversify.BindingType.Provider:
                        result = binding.provider(request.parentContext);
                        break;
                    case inversify.BindingType.Instance:
                        var constr = binding.implementationType;
                        if (childRequests.length > 0) {
                            var constructorInjectionsRequests = childRequests.filter(function (childRequest) {
                                return childRequest.target.type === inversify.TargetType.ConstructorArgument;
                            });
                            var constructorInjections = constructorInjectionsRequests.map(function (childRequest) {
                                return _this._resolve(childRequest);
                            });
                            result = this._createInstance(constr, constructorInjections);
                            result = this._injectProperties(result, childRequests);
                        }
                        else {
                            result = new constr();
                        }
                        break;
                    case inversify.BindingType.Invalid:
                    default:
                        // The user probably created a binding but didn't finish it
                        // e.g. kernel.bind<T>("Something"); missing BindingToSyntax
                        var serviceIdentifier = request.parentContext.kernel.getServiceIdentifierAsString(request.serviceIdentifier);
                        throw new Error(inversify.INVALID_BINDING_TYPE + " " + serviceIdentifier);
                }
                // use activation handler if available
                if (typeof binding.onActivation === "function") {
                    result = binding.onActivation(request.parentContext, result);
                }
                // store in cache if scope is singleton
                if (isSingleton) {
                    binding.cache = result;
                    binding.activated = true;
                }
                return result;
            }
        };
        Resolver.prototype._injectProperties = function (instance, childRequests) {
            var _this = this;
            var propertyInjectionsRequests = childRequests.filter(function (childRequest) {
                return childRequest.target.type === inversify.TargetType.ClassProperty;
            });
            var propertyInjections = propertyInjectionsRequests.map(function (childRequest) {
                return _this._resolve(childRequest);
            });
            propertyInjectionsRequests.forEach(function (r, index) {
                var injection = propertyInjections[index];
                instance[r.target.name.value()] = injection;
            });
            return instance;
        };
        Resolver.prototype._createInstance = function (Func, injections) {
            return new (Func.bind.apply(Func, [void 0].concat(injections)))();
        };
        return Resolver;
    }());
    inversify.Resolver = Resolver;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var BindingInSyntax = (function () {
        function BindingInSyntax(binding) {
            this._binding = binding;
        }
        BindingInSyntax.prototype.inSingletonScope = function () {
            this._binding.scope = inversify.BindingScope.Singleton;
            return new inversify.BindingWhenOnSyntax(this._binding);
        };
        BindingInSyntax.prototype.inTransientScope = function () {
            this._binding.scope = inversify.BindingScope.Transient;
            return new inversify.BindingWhenOnSyntax(this._binding);
        };
        return BindingInSyntax;
    }());
    inversify.BindingInSyntax = BindingInSyntax;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var BindingInWhenOnSyntax = (function () {
        function BindingInWhenOnSyntax(binding) {
            this._binding = binding;
            this._bindingWhenSyntax = new inversify.BindingWhenSyntax(this._binding);
            this._bindingOnSyntax = new inversify.BindingOnSyntax(this._binding);
            this._bindingInSyntax = new inversify.BindingInSyntax(binding);
        }
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
/* @date   : 2021-11-15
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
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    var BindingToSyntax = (function () {
        function BindingToSyntax(binding) {
            this._binding = binding;
        }
        BindingToSyntax.prototype.to = function (constructor) {
            this._binding.type = inversify.BindingType.Instance;
            this._binding.implementationType = constructor;
            return new inversify.BindingInWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toSelf = function () {
            return this.to(this._binding.serviceIdentifier);
        };
        BindingToSyntax.prototype.toConstantValue = function (value) {
            this._binding.type = inversify.BindingType.ConstantValue;
            this._binding.cache = value;
            this._binding.dynamicValue = null;
            this._binding.implementationType = null;
            return new inversify.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toDynamicValue = function (func) {
            this._binding.type = inversify.BindingType.DynamicValue;
            this._binding.cache = null;
            this._binding.dynamicValue = func;
            this._binding.implementationType = null;
            return new inversify.BindingInWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toConstructor = function (constructor) {
            this._binding.type = inversify.BindingType.Constructor;
            this._binding.implementationType = constructor;
            return new inversify.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toFactory = function (factory) {
            this._binding.type = inversify.BindingType.Factory;
            this._binding.factory = factory;
            return new inversify.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toFunction = function (func) {
            // toFunction is an alias of toConstantValue
            if (typeof func !== "function") {
                throw new Error(inversify.INVALID_FUNCTION_BINDING);
            }
            ;
            var bindingWhenOnSyntax = this.toConstantValue(func);
            this._binding.type = inversify.BindingType.Function;
            return bindingWhenOnSyntax;
        };
        BindingToSyntax.prototype.toAutoFactory = function (serviceIdentifier) {
            this._binding.type = inversify.BindingType.Factory;
            this._binding.factory = function (context) {
                return function () {
                    return context.kernel.get(serviceIdentifier);
                };
            };
            return new inversify.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toProvider = function (provider) {
            this._binding.type = inversify.BindingType.Provider;
            this._binding.provider = provider;
            return new inversify.BindingWhenOnSyntax(this._binding);
        };
        return BindingToSyntax;
    }());
    inversify.BindingToSyntax = BindingToSyntax;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
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
/* @date   : 2021-11-15
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
/* @date   : 2021-11-15
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
        // TODO: This can be refactor with TypeScript 2.x 
        // `(this: interfaces.ContstraintFunction, request: interfaces.Request) =>`
        var constraint = function (request) {
            return request.target.matchesTag(key)(value);
        };
        constraint.metaData = new inversify.Metadata(key, value);
        return constraint;
    }; };
    inversify.namedConstraint = inversify.taggedConstraint(inversify.NAMED_TAG);
    inversify.typeConstraint = function (type) { return function (request) {
        // Using index 0 because constraints are applied 
        // to one binding at a time (see Planner class)
        var binding = request.bindings[0];
        if (typeof type === "string") {
            var serviceIdentifier = binding.serviceIdentifier;
            return serviceIdentifier === type;
        }
        else {
            var constructor = request.bindings[0].implementationType;
            return type === constructor;
        }
    }; };
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
            s4() + "-" + s4() + s4() + s4();
    }
    inversify.guid = guid;
})(inversify || (inversify = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/

(function (inversify) {
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
