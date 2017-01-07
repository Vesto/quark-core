export interface AnimationLoopBacking {
    qk_addHook(hook: () => void): void;
    qk_removeHook(hook: () => void): void;
}

export type AnimationHook = (deltaTime: number) => void;
export class AnimationLoop {
    public static backing: AnimationLoopBacking;

    private static previousUpdate: number = -1;
    private static hooks: AnimationHook[] = [];

    // If this instance has been added as hook to the backing
    private static addedBackingHook: boolean = false;

    public static addHook(hook: AnimationHook): void {
        // Add the hook if needed
        if (!this.addedBackingHook) {
            this.backing.qk_addHook(() => AnimationLoop.triggerUpdate());
            this.addedBackingHook = true;
        }

        // Add the hooks if not there already
        if (this.hooks.indexOf(hook) === -1) {
            this.hooks.push(hook);
        }
    }

    public static removeHook(hook: AnimationHook): void {
        // Remove the hook if it exists
        let index = this.hooks.indexOf(hook);
        if (index >= 0) {
            this.hooks.splice(index, 1);
        }
    }

    public static triggerUpdate(): void { // Called by the internal animation stuff
        // Calculate delta time
        let now = Date.now();
        if (this.previousUpdate === -1) { // Make delta time 0 if no previous time
            this.previousUpdate = Date.now();
        }
        let deltaTime = (now - this.previousUpdate) / 1000; // Convert to seconds
        this.previousUpdate = now;

        // Call all of the hooks
        for (let hook of this.hooks) {
            hook(deltaTime);
        }
    }
}
