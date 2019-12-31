import { createViewportMatrix, createReverseViewportMatrix } from './viewport';
import { Matrix4x4 } from './matrix4x4';
import { Vector3 } from './vector3';

it('creates correct viewport matrix', () => {
  const A = createViewportMatrix(10, 10, 640, 480);
  const expectedResult = new Matrix4x4([
    [64, 0, 0, 0],
    [0, -48, 0, 0],
    [0, 0, 1, 0],
    [320, 240, 0, 1],
  ]);
  expect(A).toEqual(expectedResult);
});

it('creates correct reverse viewport matrix', () => {
  const A = createReverseViewportMatrix(10, 10, 640, 480);
  const expectedResult = new Matrix4x4([
    [10/640, 0, 0, 0],
    [0, -10/480, 0, 0],
    [0, 0, 1, 0],
    [-5, 5, 0, 1]
  ]);
  expect(A).toEqual(expectedResult);
});

describe('vector transform', () => {
  it('transforms vector correctly', () => {
    const A = createViewportMatrix(10, 10, 640, 480);
    const v = new Vector3(2, 2, 0);
    const resultant = A.multiplyVector(v);
    const expectedResult = new Vector3(448, 144, 0);
    expect(resultant).toEqual(expectedResult);
  });

  it('transforms vector correctly (reverse)', () => {
    const A = createReverseViewportMatrix(10, 10, 640, 480);
    const v = new Vector3(448, 144, 0);
    const resultant = A.multiplyVector(v);
    const expectedResult = new Vector3(2, 2, 0);
    expect(resultant).toEqual(expectedResult);
  });
});
