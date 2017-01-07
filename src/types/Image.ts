export enum ImageDataType {
    PNG, JPEG, BMP
}

export class Image {
    // public backingConstructor: ImageBackingConstructor;
    // public backing: ImageBacking;

    // Use ArrayBuffer since it's loaded from memory
    public data: Uint8Array;

    public dataType: ImageDataType;

    public get mime(): string {
        switch (this.dataType) {
            case ImageDataType.PNG:
                return "image/png";
            case ImageDataType.JPEG:
                return "image/jpeg";
            case ImageDataType.BMP:
                return "image/bmp";
            default:
                return "";
        }
    }

    public constructor(data: Uint8Array, dataType: ImageDataType) {
        this.data = data;
        this.dataType = dataType;
    }
}

