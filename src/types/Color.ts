import { Interpolatable, InvalidInterpolatableDestination } from "../utils/Interpolatable";
import { Cloneable } from "../utils/Cloneable";
import { Equatable } from "../utils/Equatable";

export class Color implements Interpolatable, Cloneable, Equatable {
    // Constructors
    public constructor(public red: number, public green: number, public blue: number, public alpha: number) {

    }

    public static fromHex(hex: string): Color {
        // Calculate the number
        let bigInt = parseInt(hex, 16);

        // Get the character count to determine what color format it's in. Can't determine by number because
        // something like 0x0000FF would make it think that it's using the shorthand 0xFF format.
        let characterCount = hex.length;

        // Calculate the RGBA values for the different color modes
        let r: number;
        let g: number;
        let b: number;
        let a: number;
        if (characterCount <= 2) { // RGB single component
            r = g = b = bigInt & 0xFF;
            a = 0xFF;
        } else if (characterCount <= 6) { // RGB
            r = (bigInt >> 16) & 0xFF;
            g = (bigInt >> 8) & 0xFF;
            b = bigInt & 0xFF;
            a = 255;
        } else { // RGBA
            r = (bigInt >> 24) & 0xFF;
            g = (bigInt >> 16) & 0xFF;
            b = (bigInt >> 8) & 0xFF;
            a = bigInt & 0xFF;
        }

        return new Color(r / 255, g / 255, b / 255, a / 255);
    }

    // Presets
    public static get white(): Color { return new Color(1, 1, 1, 1); }
    public static get black(): Color { return new Color(0, 0, 0, 1); }
    public static get clear(): Color { return new Color(0, 0, 0, 0); }

    public static get red(): Color { return new Color(1, 0, 0, 1); }
    public static get green(): Color { return new Color(0, 1, 0, 1); }
    public static get blue(): Color { return new Color(0, 0, 1, 1); }

    public static get yellow(): Color { return new Color(1, 1, 0, 1); }
    public static get cyan(): Color { return new Color(0, 1, 1, 1); }
    public static get purple(): Color { return new Color(1, 0, 1, 1); }

    // Color info
    public get isDark(): boolean {
        let darknessScore = this.red * 0.299 + this.green * 0.587 + this.blue * 0.114;
        return darknessScore < 0.5;
    }

    public toHex(): number {
        let r = Math.round(this.red * 255) & 0xFF;
        let g = Math.round(this.green * 255) & 0xFF;
        let b = Math.round(this.blue * 255) & 0xFF;
        let a = Math.round(this.alpha * 255) & 0xFF;

        return (r << 24) | (g << 16) | (b << 8) | (a);
    }

    public withAlpha(alpha: number): Color {
        return new Color(this.red, this.green, this.blue, alpha);
    }

    // Interfaces
    public interpolate(to: Interpolatable, time: number): Color {
        if (to instanceof Color) {
            return new Color(
                this.red.interpolate(to.red, time) as number,
                this.green.interpolate(to.green, time) as number,
                this.blue.interpolate(to.blue, time) as number,
                this.alpha.interpolate(to.alpha, time) as number
            );
        } else {
            throw new InvalidInterpolatableDestination(this, to);
        }
    }

    public clone(): Color {
        return new Color(this.red, this.green, this.blue, this.alpha);
    }

    public equals(other: Equatable): boolean {
        return other instanceof Color &&
            other.red === this.red &&
            other.green === this.green &&
            other.blue === this.blue &&
            other.alpha === this.alpha;
    }
}
