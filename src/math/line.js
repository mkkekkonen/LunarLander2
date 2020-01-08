import { LineEquation } from './lineEquation';
import { Vector3 } from './vector3';

export class Line {
  constructor(startPoint, endPoint) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  static from2DCoords(x1, y1, x2, y2) {
    const startPoint = new Vector3(x1, y1);
    const endPoint = new Vector3(x2, y2);

    return new Line(startPoint, endPoint);
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

    if (!Number.isFinite(equation2.slope) && !Number.isFinite(equation2.yIntercept)) {
      return new Vector3(line.startPoint.x, equation1.getY(line.startPoint.x));
    }

    return LineEquation.solveSystem(equation1, equation2);
  }

  lineSegmentIntersects(line) {
    const intersects = this.intersects(line);

    if (intersects === true) {
      return intersects;
    }

    if (intersects === Infinity) {
      return false;
    }

    const xCoords1 = [this.startPoint.x, this.endPoint.x];
    xCoords1.sort();

    const yCoords1 = [this.startPoint.y, this.endPoint.y];
    yCoords1.sort();

    const xCoords2 = [line.startPoint.x, line.endPoint.x];
    xCoords2.sort();

    const yCoords2 = [line.startPoint.y, line.endPoint.y];
    yCoords2.sort();

    const [x1_1, x2_1] = xCoords1;
    const [y1_1, y2_1] = yCoords1;

    const [x1_2, x2_2] = xCoords2;
    const [y1_2, y2_2] = yCoords2;

    if (intersects.x >= x1_1 && intersects.x <= x2_1
        && intersects.y >= y1_1 && intersects.y <= y2_1
        && intersects.x >= x1_2 && intersects.x <= x2_2
        && intersects.y >= y1_2 && intersects.y <= y2_2) {
      return intersects;
    }

    return false;
  }
}
