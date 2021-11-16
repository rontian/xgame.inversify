/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {
    export class BindingOnSyntax<T> implements interfaces.BindingOnSyntax<T> {

        private _binding: interfaces.Binding<T>;

        public constructor(binding: interfaces.Binding<T>) {
            this._binding = binding;
        }

        public onActivation(handler: (context: interfaces.Context, injectable: T) => T): interfaces.BindingWhenSyntax<T> {
            this._binding.onActivation = handler;
            return new BindingWhenSyntax<T>(this._binding);
        }

    }
}