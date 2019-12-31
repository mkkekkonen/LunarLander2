import { Matrix4x4 } from './matrix4x4';
import { Vector3 } from './vector3';

it('multiplies correctly 1', () => {
  const A = new Matrix4x4([
    [1, 2, 3, 0],
    [2, 3, 1, 0],
    [3, 1, 2, 0],
    [0, 0, 0, 0],
  ]);

  const B = new Matrix4x4([
    [-1, 2, -3, 0],
    [2, -3, 1, 0],
    [-3, 1, 2, 0],
    [0, 0, 0, 0],
  ]);

  const expectedResult = new Matrix4x4([
    [-6, -1, 5, 0],
    [1, -4, -1, 0],
    [-7, 5, -4, 0],
    [0, 0, 0, 0],
  ]);

  expect(A.multiply(B)).toEqual(expectedResult);
});

it('multiplies vectors correctly', () => {
  const A = new Matrix4x4([
    [1, 9, 0, 9],
    [9, 0, 0, 7],
    [4, 4, 3, 3],
    [5, 5, 3, 7],
  ]);

  const v = new Vector3(2, 5, 5);
  const u = A.multiplyVector(v);

  const expectedResult = new Vector3(72, 43, 18);
  expect(u).toEqual(expectedResult);
});

it('scales vector correctly', () => {
  const v = new Vector3(1, 2, 3);
  const u = Matrix4x4.scale(2, 10, 100).multiplyVector(v);
  const expectedResult = new Vector3(2, 20, 300);
  expect(u).toEqual(expectedResult);
});

it('translates vector correctly', () => {
  const v = new Vector3(1, 2, 3);
  const u = Matrix4x4.translate(-3, 2, 1).multiplyVector(v);
  const expectedResult = new Vector3(-2, 4, 4);
  expect(u).toEqual(expectedResult);
});
