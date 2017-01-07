import { Color } from "./Color";
import { Point } from "./Point";
import { Interpolatable, InvalidInterpolatableDestination } from "../utils/Interpolatable";
import { Cloneable } from "../utils/Cloneable";
import { Equatable } from "../utils/Equatable";

export class Shadow implements Interpolatable, Cloneable, Equatable {
    constructor(public offset: Point, public blurRadius: number, public color: Color) {

    }

    public interpolate(to: Interpolatable, time: number): Shadow {
        if (to instanceof Shadow) {
            return new Shadow(
                this.offset.interpolate(to.offset, time) as Point,
                this.blurRadius.interpolate(to.blurRadius, time) as number,
                this.color.interpolate(to.color, time) as Color
            );
        } else {
            throw new InvalidInterpolatableDestination(this, to);
        }
    }

    public clone(): Shadow {
        return new Shadow(this.offset.clone(), this.blurRadius, this.color.clone());
    }

    public equals(other: Equatable): boolean {
        return other instanceof Shadow &&
            other.offset.equals(this.offset) &&
            other.blurRadius === this.blurRadius &&
            other.color.equals(this.color);
    }
}
