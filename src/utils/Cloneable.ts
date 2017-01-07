export interface Cloneable {
    clone(): Cloneable;
}

/* Extensions */
declare global {
    export interface Number extends Cloneable {

    }
}

Number.prototype.clone = function(): Cloneable {
    return this;
};

// Force this module to be exported
export let _ = undefined;
