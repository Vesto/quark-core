export interface WebSocketBacking {
    qk_onOpen: () => void;
    qk_onError: (error: Error) => void;
    qk_onClose: (code: number, reason: string) => void;
    qk_onMessage: (data: WebSocket.Data) => void;

    readonly qk_state: WebSocket.State;

    qk_close(code?: number, data?: WebSocket.Data): void;
    qk_pause(): void;
    qk_resume(): void;
    qk_terminate(): void;

    qk_send(data: WebSocket.Data): void;
}

export class WebSocket {
    public static createBacking: (url: string, protocols: string[]) => WebSocketBacking;
    private backing: WebSocketBacking;

    public onOpen: (socket: WebSocket) => void;
    public onError: (socket: WebSocket, error: Error) => void;
    public onClose: (socket: WebSocket, code: number, reason: string) => void;
    public onMessage: (socket: WebSocket, data: WebSocket.Data) => void;

    public get state(): WebSocket.State { return this.backing.qk_state; }

    public constructor(url: string, protocols?: string | string[]) {
        // Get the list of protocols
        let p: string[];
        if (protocols instanceof Array) {
            p = protocols;
        } else if (typeof protocols === "string") {
            p = [ protocols ];
        } else {
            p = [];
        }

        // Create the backing
        this.backing = WebSocket.createBacking(url, p);

        // Set the callbacks
        this.backing.qk_onOpen = () => { if (this.onOpen) this.onOpen(this) };
        this.backing.qk_onError = (error) => { if (this.onError) this.onError(this, error) };
        this.backing.qk_onClose = (code, reason) => { if (this.onClose) this.onClose(this, code, reason) };
        this.backing.qk_onMessage = (data) => { if (this.onMessage) this.onMessage(this, data) };
    }

    public close(code?: number, data?: any): void {
        this.backing.qk_close(code, data);
    }

    public pause(): void {
        this.backing.qk_pause();
    }

    public resume(): void {
        this.backing.qk_resume();
    }

    public terminate(): void {
        this.backing.qk_terminate();
    }

    public send(data: WebSocket.Data): void {
        this.backing.qk_send(data);
    }
}

export namespace WebSocket {
    export enum State {
        Connecting, Open, Closing, Closed
    }

    export type Data = string | Uint8Array;
}
