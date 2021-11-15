/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-15
*************************************************/
namespace inversify {
    export let traverseAncerstors = (
        request: interfaces.Request,
        constraint: interfaces.ConstraintFunction
    ): boolean => {

        let parent = request.parentRequest;
        if (parent !== null) {
            return constraint(parent) ? true : traverseAncerstors(parent, constraint);
        } else {
            return false;
        }
    };

    // This helpers use currying to help you to generate constraints

    export let taggedConstraint = (key: string) => (value: any) => {
        // TODO: This can be refactor with TypeScript 2.x 
        // `(this: interfaces.ContstraintFunction, request: interfaces.Request) =>`

        let constraint: interfaces.ConstraintFunction = (request: interfaces.Request) => {
            return request.target.matchesTag(key)(value);
        };

        constraint.metaData = new Metadata(key, value);

        return constraint;
    };


    export let namedConstraint = taggedConstraint(NAMED_TAG);

    export let typeConstraint = (type: (Function | string)) => (request: interfaces.Request) => {

        // Using index 0 because constraints are applied 
        // to one binding at a time (see Planner class)
        let binding = request.bindings[0];

        if (typeof type === "string") {
            let serviceIdentifier = binding.serviceIdentifier;
            return serviceIdentifier === type;
        } else {
            let constructor = request.bindings[0].implementationType;
            return type === constructor;
        }
    };
}