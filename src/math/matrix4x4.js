import { matrix, zeros, transpose, multiply } from 'mathjs';

import { Vector3 } from './vector3';

export class Matrix4x4 {
  constructor(initialMatrix) {
    if (!initialMatrix) {
      this.matrix = zeros(4, 4);
    } else {
      this.matrix = transpose(matrix(initialMatrix));
    }
  }

  static scale(x = 1, y = 1, z = 1) {
    return new Matrix4x4([
      [x, 0, 0, 0],
      [0, y, 0, 0],
      [0, 0, z, 0],
      [0, 0, 0, 1],
    ])
  }

  static translate(x = 0, y = 0, z = 0) {
    return new Matrix4x4([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [x, y, z, 1],
    ]);
  }

  multiply(matrix) {
    const result = multiply(this.matrix, transpose(matrix.matrix));
    return new Matrix4x4(result.toArray());
  }

  multiplyVector(vector) {
    const vectorArr = vector.asArray();
    const result = multiply(this.matrix, vectorArr);
    const x = result.get([0]);
    const y = result.get([1]);
    const z = result.get([2]);
    return new Vector3(x, y, z);
  }

  transpose() {
    return new Matrix4x4(this.matrix.toArray());
  }
}

