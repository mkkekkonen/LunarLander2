import Konva from 'konva';

import * as util from '../util';
import * as constants from '../util/constants';
import { Vector3 } from '../math';

const MIN_Y = -20;
const MAX_Y = 10;
const N_POINTS = 51;

export const getXCoord = index => {
  const interval = constants.WORLD_WIDTH / 2 / (N_POINTS - 1);
  return -(constants.WORLD_WIDTH / 4) + (index * interval);
};

export class Ground {
  constructor() {
    this.polygon = undefined;
    this.landingPlatformLine = undefined;
    this.points = undefined;
    this.landingPlatformIndex = 0;
  }

  init(layer) {
    this.points = [];

    this.landingPlatformIndex = util.getRandomInt(0, N_POINTS - 1);

    let lastY = undefined;

    for (let i = 0; i < N_POINTS; i++) {
      const y = util.getRandomInt(MIN_Y, MAX_Y);
      this.points.push(new Vector3(getXCoord(i), i !== this.landingPlatformIndex + 1 ? y : lastY));
      lastY = y;
    }

    this.polygon = new Konva.Line({
      points: util.mapPoints(this.points),
      stroke: constants.FOREGROUND_COLOR,
    });

    const firstLandingPlatformPoint = util.defaultViewportMatrix.multiplyVector(this.points[this.landingPlatformIndex]);
    const secondLandingPlatformPoint = util.defaultViewportMatrix.multiplyVector(this.points[this.landingPlatformIndex + 1]);

    this.landingPlatformLine = new Konva.Line({
      points: [
        firstLandingPlatformPoint.x, firstLandingPlatformPoint.y + 5,
        secondLandingPlatformPoint.x, secondLandingPlatformPoint.y + 5,
      ],
      stroke: constants.FOREGROUND_COLOR,
    });

    layer.add(this.polygon);
    layer.add(this.landingPlatformLine);
  }
}
