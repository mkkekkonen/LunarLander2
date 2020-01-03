import { Vector3 } from './vector3';

import { round } from '../util';

export class LineEquation {
  constructor(slope, yIntercept) {
    this.slope = slope;
    this.yIntercept = yIntercept;
  }

  static solveSystem(equation1, equation2) {
    const leftSideConstant = equation1.slope - equation2.slope;
    const rightSide = equation2.yIntercept - equation1.yIntercept;

    if (leftSideConstant === 0) {
      return Infinity;
    }

    const x = round(rightSide / leftSideConstant);
    const y = round(equation1.slope * x + equation1.yIntercept);

    return new Vector3(x, y, 0);
  }

  static convertLine(line) {
    return new LineEquation(line.slope, (line.slope * (-line.startPoint.x)) + line.startPoint.y);
  }
}
