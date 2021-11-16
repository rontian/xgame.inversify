/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {
    export class BindingInSyntax<T> implements interfaces.BindingInSyntax<T> {

        private _binding: interfaces.Binding<T>;

        public constructor(binding: interfaces.Binding<T>) {
            this._binding = binding;
        }

        public inRequestScope(): interfaces.BindingWhenOnSyntax<T> {
            this._binding.scope = BindingScopeEnum.Request;
            return new BindingWhenOnSyntax<T>(this._binding);
        }

        public inSingletonScope(): interfaces.BindingWhenOnSyntax<T> {
            this._binding.scope = BindingScopeEnum.Singleton;
            return new BindingWhenOnSyntax<T>(this._binding);
        }

        public inTransientScope(): interfaces.BindingWhenOnSyntax<T> {
            this._binding.scope = BindingScopeEnum.Transient;
            return new BindingWhenOnSyntax<T>(this._binding);
        }

    }

}
