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

  distanceFrom(vector) {
    return Math.sqrt(((vector.x - this.x) ** 2)
      + ((vector.y - this.y) ** 2));
  }
}
