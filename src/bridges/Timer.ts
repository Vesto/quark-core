export interface TimerBacking {
    qk_executeAfter(milliseconds: number, callback: () => void): () => void; // Returns cancel function
}

export type TimerCallback = (timer: Timer) => void;
export class Timer {
    public static backing: TimerBacking;

    public readonly duration: number = 0;
    public repeats: boolean = false;

    private cancelCallback?: () => void;
    public get running(): boolean { return typeof this.cancelCallback !== "undefined"; }

    public callback: (timer: Timer) => void;

    public constructor(duration: number, callback: TimerCallback, autoStart: boolean = false) {
        this.duration = duration;
        this.callback = callback;
        if (autoStart) {
            this.start();
        }
    }

    public start() {
        // Cancel previous timer if already running
        if (this.cancelCallback) {
            this.cancelCallback();
            this.cancelCallback = undefined;
        }

        // Start the timer (convert to milliseconds)
        this.cancelCallback = Timer.backing.qk_executeAfter(this.duration * 1000, () => this.timerFinished());
    }

    public stop() {
        // Stop repeating
        this.repeats = false;

        // Cancel the timer if exists
        if (this.cancelCallback) {
            this.cancelCallback();
            this.cancelCallback = undefined;
        }
    }

    private timerFinished() {
        // Remove backing callback
        this.cancelCallback = undefined;

        // Trigger the callback
        this.callback(this);

        // If repeat, run again
        if (this.repeats) {
            this.start();
        }
    }
}
