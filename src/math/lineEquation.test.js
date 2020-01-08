import { LineEquation } from './lineEquation';
import { Vector3 } from './vector3';
import { Line } from './line';

import { round } from '../util';

it('solves system correctly', () => {
  const equation1 = new LineEquation(1, 1);
  const equation2 = new LineEquation(-2, -3);

  const expectedX = round(-4/3);
  const expectedY = round(-1/3);
  const expectedResult = new Vector3(expectedX, expectedY);

  expect(LineEquation.solveSystem(equation1, equation2)).toEqual(expectedResult);
});

it('solves system correctly 2', () => {
  const equation1 = new LineEquation(1.5, 1);
  const equation2 = new LineEquation(1.5, 2);

  const result = LineEquation.solveSystem(equation1, equation2);

  expect(result).toBe(Infinity);
});

it('converts line correctly', () => {
  const startPoint = new Vector3(1, 2);
  const endPoint = new Vector3(3, 4);
  const line = new Line(startPoint, endPoint);

  const expectedResult = new LineEquation(1, 1);

  expect(LineEquation.convertLine(line)).toEqual(expectedResult);
});

test('test', () => {
  const verticalLine = new Line(new Vector3(1, -0.5), new Vector3(1, -1.5));
  const intersectingLine = new Line(new Vector3(0, -2), new Vector3(2, 0));

  const expectedResult = new Vector3(1, -1);

  expect(intersectingLine.intersects(verticalLine)).toEqual(expectedResult);
})
