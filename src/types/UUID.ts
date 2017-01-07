import { } from "uuid";

export enum UUIDVersion {
    V1, V4
}

export class UUID { // TODO: Implement UUID stuff
    public readonly version: UUIDVersion;

    constructor(version: UUIDVersion) {
        this.version = version;
    }
}
