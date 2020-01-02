import Konva from 'konva';

import * as constants from '../util/constants';
import { defaultViewportMatrix } from '../util';
import { Vector3 } from '../math';
import { Steering } from '../steering';

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
    this.location = location || new Vector3();
    this.polygon = new Konva.Line({
      points: mapPoints(),
      stroke: constants.SHIP_COLOR,
      closed: true,
    });
    this.velocity = new Vector3();
    this.acceleration = new Vector3();

    this.steering = new Steering();
  }

  init(layer) {
    layer.add(this.polygon);
  }

  update(timeDiff) {
    const x = this.steering.xAxis;
    const y = this.steering.yAxis;

    this.acceleration = new Vector3(x, y).add(constants.accelerationGravity);
    const timeSeconds = timeDiff / 1000;

    const velocityDelta = this.acceleration.multiplyScalar(timeSeconds);
    this.velocity = this.velocity.add(velocityDelta);

    const locationDelta = this.velocity.multiplyScalar(timeSeconds);
    this.location = this.location.add(locationDelta);

    const transformedLocation = defaultViewportMatrix.multiplyVector(this.location);

    this.polygon.x(transformedLocation.x);
    this.polygon.y(transformedLocation.y);
  }
}
