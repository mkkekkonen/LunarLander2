import { LineEquation } from './lineEquation';

export class Line {
  constructor(startPoint, endPoint) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  get slope() {
    return (this.endPoint.y - this.startPoint.y) / (this.endPoint.x - this.startPoint.x);
  }

  intersects(line) {
    if (this.startPoint.equals(line.startPoint) && this.endPoint.equals(line.endPoint)) {
      return true;
    }

    const equation1 = LineEquation.convertLine(this);
    const equation2 = LineEquation.convertLine(line);

    return LineEquation.solveSystem(equation1, equation2);
  }

  lineSegmentIntersects(line) {
    const intersects = this.intersects(line);

    if (intersects === true || intersects === Infinity) {
      return intersects;
    }

    const xCoords = [this.startPoint.x, this.endPoint.x];
    xCoords.sort();

    const [x1, x2] = xCoords;

    if (intersects.x >= x1 && intersects.x <= x2) {
      return intersects;
    }

    return false;
  }
}
