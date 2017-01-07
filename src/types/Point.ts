import { Interpolatable, InvalidInterpolatableDestination } from "../utils/Interpolatable";
import { Cloneable } from "../utils/Cloneable";
import { Equatable } from "../utils/Equatable";

export class Point implements Interpolatable, Cloneable, Equatable {
    constructor(public x: number, public y: number) {

    }

    public static get zero(): Point {
        return new Point(0, 0);
    }

    public inverse(): Point {
        return new Point(-this.x, -this.y);
    }

    public add(point: Point): Point {
        return new Point(this.x + point.x, this.y + point.y);
    }

    public subtract(point: Point): Point {
        return new Point(this.x - point.x, this.y - point.y);
    }

    public multiply(point: Point): Point;
    public multiply(magnitude: number): Point;
    public multiply(pointOrMagnitude: Point | number): Point {
        if (pointOrMagnitude instanceof Point) {
            return new Point(this.x * pointOrMagnitude.x, this.y * pointOrMagnitude.y);
        } else {
            return new Point(this.x * pointOrMagnitude, this.y * pointOrMagnitude);
        }
    }

    public interpolate(to: Interpolatable, time: number): Point {
        if (to instanceof Point) {
            return new Point(this.x.interpolate(to.x, time) as number, this.y.interpolate(to.y, time) as number);
        } else {
            throw new InvalidInterpolatableDestination(this, to);
        }
    }

    public clone(): Point {
        return new Point(this.x, this.y);
    }

    public equals(other: Equatable): boolean {
        return other instanceof Point &&
            other.x === this.x &&
            other.y === this.y;
    }
}
