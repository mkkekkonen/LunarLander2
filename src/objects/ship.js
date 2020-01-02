import Konva from 'konva';

import * as constants from '../util/constants';
import { defaultViewportMatrix, mapPoints } from '../util';
import { Vector3 } from '../math';
import { Steering } from '../steering';
import { ShipExplosion } from './shipExplosion';

const SHIP_WIDTH_HALVED = 0.5;
const WORLD_WIDTH_HALVED = constants.WORLD_WIDTH / 2;
const WORLD_HEIGHT_HALVED = constants.WORLD_HEIGHT / 2;

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

export class Ship {
  constructor(location) {
    this.location = location || new Vector3();
    this.polygon = new Konva.Line({
      points: mapPoints(points),
      stroke: constants.FOREGROUND_COLOR,
      closed: true,
    });
    this.velocity = new Vector3();
    this.acceleration = new Vector3();

    this.steering = new Steering();

    this.shipExplosion = new ShipExplosion();
    this.destroyed = false;
  }

  init(layer) {
    layer.add(this.polygon);
  }

  update(timeDiff) {
    if (this.destroyed) {
      return;
    }

    const x = this.steering.xAxis;
    const y = this.steering.yAxis;

    const timeSeconds = timeDiff / 1000;

    this.acceleration = new Vector3(x, y).add(constants.accelerationGravity);

    const velocityDelta = this.acceleration.multiplyScalar(timeSeconds);
    this.velocity = this.velocity.add(velocityDelta);

    const locationDelta = this.velocity.multiplyScalar(timeSeconds);
    this.location = this.location.add(locationDelta);

    if (this.location.x > WORLD_WIDTH_HALVED - SHIP_WIDTH_HALVED) {
      this.acceleration.x = 0;
      this.velocity.x = 0;
      this.location.x = WORLD_WIDTH_HALVED - SHIP_WIDTH_HALVED;
    } else if (this.location.x < -WORLD_WIDTH_HALVED + SHIP_WIDTH_HALVED) {
      this.acceleration.x = 0;
      this.velocity.x = 0;
      this.location.x = -WORLD_WIDTH_HALVED + SHIP_WIDTH_HALVED;
    }

    if (this.location.y > WORLD_HEIGHT_HALVED - SHIP_WIDTH_HALVED) {
      this.acceleration.y = 0;
      this.velocity.y = 0;
      this.location.y = WORLD_HEIGHT_HALVED - SHIP_WIDTH_HALVED;
    }

    const transformedLocation = defaultViewportMatrix.multiplyVector(this.location);

    this.polygon.x(transformedLocation.x - (constants.SCREEN_WIDTH / 2));
    this.polygon.y(transformedLocation.y - (constants.SCREEN_HEIGHT / 2));

    this.shipExplosion.update(timeSeconds);
  }

  destroy() {
    this.shipExplosion.init(this.location);
    this.polygon.remove();
    this.destroyed = true;
  }
}
