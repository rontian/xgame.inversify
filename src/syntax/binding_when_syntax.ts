/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
namespace inversify {

    export class BindingWhenSyntax<T> implements interfaces.BindingWhenSyntax<T> {

        private _binding: interfaces.Binding<T>;

        public constructor(binding: interfaces.Binding<T>) {
            this._binding = binding;
        }

        public when(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T> {
            this._binding.constraint = constraint;
            return new BindingOnSyntax<T>(this._binding);
        }

        public whenTargetNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T> {
            this._binding.constraint = namedConstraint(name);
            return new BindingOnSyntax<T>(this._binding);
        }

        public whenTargetIsDefault(): interfaces.BindingOnSyntax<T> {

            this._binding.constraint = (request: interfaces.Request) => {

                const targetIsDefault = (request.target !== null) &&
                    (!request.target.isNamed()) &&
                    (!request.target.isTagged());

                return targetIsDefault;
            };

            return new BindingOnSyntax<T>(this._binding);
        }

        public whenTargetTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T> {
            this._binding.constraint = taggedConstraint(tag)(value);
            return new BindingOnSyntax<T>(this._binding);
        }

        public whenInjectedInto(parent: (Function | string)): interfaces.BindingOnSyntax<T> {
            this._binding.constraint = (request: interfaces.Request) =>
                typeConstraint(parent)(request.parentRequest);
            return new BindingOnSyntax<T>(this._binding);
        }

        public whenParentNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T> {
            this._binding.constraint = (request: interfaces.Request) =>
                namedConstraint(name)(request.parentRequest);
            return new BindingOnSyntax<T>(this._binding);
        }

        public whenParentTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T> {
            this._binding.constraint = (request: interfaces.Request) =>
                taggedConstraint(tag)(value)(request.parentRequest);
            return new BindingOnSyntax<T>(this._binding);
        }

        public whenAnyAncestorIs(ancestor: (Function | string)): interfaces.BindingOnSyntax<T> {
            this._binding.constraint = (request: interfaces.Request) =>
                traverseAncerstors(request, typeConstraint(ancestor));
            return new BindingOnSyntax<T>(this._binding);
        }

        public whenNoAncestorIs(ancestor: (Function | string)): interfaces.BindingOnSyntax<T> {
            this._binding.constraint = (request: interfaces.Request) =>
                !traverseAncerstors(request, typeConstraint(ancestor));
            return new BindingOnSyntax<T>(this._binding);
        }

        public whenAnyAncestorNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T> {

            this._binding.constraint = (request: interfaces.Request) =>
                traverseAncerstors(request, namedConstraint(name));

            return new BindingOnSyntax<T>(this._binding);
        }

        public whenNoAncestorNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T> {

            this._binding.constraint = (request: interfaces.Request) =>
                !traverseAncerstors(request, namedConstraint(name));

            return new BindingOnSyntax<T>(this._binding);
        }

        public whenAnyAncestorTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T> {

            this._binding.constraint = (request: interfaces.Request) =>
                traverseAncerstors(request, taggedConstraint(tag)(value));

            return new BindingOnSyntax<T>(this._binding);
        }

        public whenNoAncestorTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T> {

            this._binding.constraint = (request: interfaces.Request) =>
                !traverseAncerstors(request, taggedConstraint(tag)(value));

            return new BindingOnSyntax<T>(this._binding);
        }

        public whenAnyAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T> {

            this._binding.constraint = (request: interfaces.Request) =>
                traverseAncerstors(request, constraint);

            return new BindingOnSyntax<T>(this._binding);
        }

        public whenNoAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T> {

            this._binding.constraint = (request: interfaces.Request) =>
                !traverseAncerstors(request, constraint);

            return new BindingOnSyntax<T>(this._binding);
        }

    }

}
