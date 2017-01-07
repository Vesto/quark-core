export interface LoggerBacking {
    qk_output(message: any[]): void;
}

export class Logger {
    // TODO: Rename to Log or create a standard Output class and have an Output for the console

    private static backing: LoggerBacking;

    /// Prints text to the console with a new line.
    public static print(...messages: any[]) {
        this.output(messages);
    }

    /// Outputs raw text to the console.
    public static output(messages: any[]) {
        this.backing.qk_output(messages);
    }
}
