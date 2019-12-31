import Konva from 'konva';

import * as constants from '../util/constants';
import { defaultViewportMatrix } from '../util';
import { Vector3 } from '../math/vector3';

const points = [
  new Vector3(0, 0.5),
  new Vector3(-0.5, 0.5),
  new Vector3(-0.5, -0.5),
  new Vector3(0.5, -0.5),
  new Vector3(0.5, 0.5),
  new Vector3(0, 0.5),
  new Vector3(0.25, 0.75),
  new Vector3(-0.25, 0.75),
];

const mapPoints = () => {
  const mappedPoints = [];
  points.forEach(point => {
    const transformedPoint = defaultViewportMatrix.multiplyVector(point);
    mappedPoints.push(transformedPoint.x);
    mappedPoints.push(transformedPoint.y);
  });
  return mappedPoints;
};

export class Ship {
  constructor(location) {
    this.location = location;
    this.polygon = new Konva.Line({
      points: mapPoints(),
      stroke: constants.SHIP_COLOR,
      closed: true,
    });
  }

  init(layer) {
    layer.add(this.polygon);
  }
}
