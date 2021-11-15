/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
namespace inversify {
    export class BindingInSyntax<T> implements interfaces.BindingInSyntax<T> {

        private _binding: interfaces.Binding<T>;

        public constructor(binding: interfaces.Binding<T>) {
            this._binding = binding;
        }

        public inSingletonScope(): interfaces.BindingWhenOnSyntax<T> {
            this._binding.scope = BindingScope.Singleton;
            return new BindingWhenOnSyntax<T>(this._binding);
        }

        public inTransientScope(): interfaces.BindingWhenOnSyntax<T> {
            this._binding.scope = BindingScope.Transient;
            return new BindingWhenOnSyntax<T>(this._binding);
        }

    }
}
