export class InvalidInterpolatableDestination extends Error {
    public constructor(from: Interpolatable, to: Interpolatable) {
        super(`Could not interpolate from ${from.constructor.name} to ${to.constructor.name}.`);
    }
}

export interface Interpolatable {
    interpolate(to: Interpolatable, time: number): Interpolatable;
}

/* Extensions */
declare global {
    export interface Number extends Interpolatable {

    }
}

Number.prototype.interpolate = function(to: Interpolatable, time: number): Interpolatable {
    if (typeof to === "number") {
        return (to - this) * time + this;
    } else {
        throw new InvalidInterpolatableDestination(this, to);
    }
};
