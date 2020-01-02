export class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = 1;
  }

  asArray() {
    return [this.x, this.y, this.z, this.w];
  }

  add(v) {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  multiplyScalar(scalar) {
    return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  distanceFrom(vector) {
    return Math.sqrt(((vector.x - this.x) ** 2)
      + ((vector.y - this.y) ** 2));
  }
}
