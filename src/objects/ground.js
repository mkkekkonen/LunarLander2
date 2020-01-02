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
    this.points = undefined;
  }

  init(layer) {
    this.yCoords = [];

    for (let i = 0; i < N_POINTS; i++) {
      this.yCoords.push(new Vector3(getXCoord(i), util.getRandomInt(MIN_Y, MAX_Y)));
    }

    this.polygon = new Konva.Line({
      points: util.mapPoints(this.yCoords),
      stroke: constants.FOREGROUND_COLOR,
    });

    layer.add(this.polygon);
  }
}
