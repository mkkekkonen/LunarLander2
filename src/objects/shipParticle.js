import Konva from 'konva';

import * as util from '../util';
import * as constants from '../util/constants';
import { Vector3 } from '../math';

export class ShipParticle {
  constructor() {
    this.lifetime = 0;
    this.shape = undefined;
    this.velocity = undefined;
  }

  init(layer, location) {
    const transformedLocation = util.defaultViewportMatrix.multiplyVector(location);

    this.lifetime = util.getRandomInt(500, 2000);

    this.shape = new Konva.Circle({
      x: transformedLocation.x,
      y: transformedLocation.y,
      radius: 2.5,
      stroke: constants.PARTICLE_COLOR,
    });

    layer.add(this.shape);

    const velocityX = util.getRandomInt(-50, 50);
    const velocityY = util.getRandomInt(-50, 50);

    this.velocity = new Vector3(velocityX, velocityY);

    this.location = location;

    setTimeout(() => {
      this.shape.remove();
    }, this.lifetime);
  }

  update(timeDiff) {
    const locationDelta = this.velocity.multiplyScalar(timeDiff);
    this.location = this.location.add(locationDelta);

    const transformedLocation = util.defaultViewportMatrix.multiplyVector(this.location);

    this.shape.x(transformedLocation.x);
    this.shape.y(transformedLocation.y);
  }
}
