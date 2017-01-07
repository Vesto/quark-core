export interface FontBacking {
    qk_fontVariations(descriptor: FontDescriptor): FontDescriptor[];
    qk_listFonts(): FontDescriptor[];
}

export interface FontDescriptor {
    family: string;
    italic?: boolean;
    weight?: number;
    width?: number;
}

export class FontLoadError extends Error {
    public constructor(descriptor: FontDescriptor) {
        super(`Could not load font with descriptor: ${JSON.stringify(descriptor)}}`);
    }
}

export class Font {
    public static backing: FontBacking;

    public size: number;
    public readonly family: string;
    public readonly italic: boolean;
    public readonly weight: number;
    public readonly width: number;

    public constructor(size: number, descriptor: FontDescriptor
    ) {
        // Save the size
        this.size = size;

        // Load the variations of the font and validate it. This will fill in the italic, weight, width, etc.
        let variations = Font.backing.qk_fontVariations(descriptor);
        if (variations.length > 0) {
            // Read and validate the variation
            let d = variations[0];
            if (
                typeof d.italic === "undefined" ||
                typeof d.weight === "undefined" ||
                typeof d.width === "undefined"
            ) { throw new FontLoadError(descriptor); }

            // Save the variation
            this.family = d.family;
            this.italic = d.italic;
            this.weight = d.weight;
            this.width = d.width;
        } else {
            throw new FontLoadError(descriptor);
        }
    }

    public static fontVariations(descriptor: FontDescriptor): FontDescriptor[] {
        return this.backing.qk_fontVariations(descriptor);
    }

    public static listFonts(): FontDescriptor[] {
        return this.backing.qk_listFonts();
    }
}
