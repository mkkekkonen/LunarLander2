import Konva from 'konva';

import * as constants from './util/constants';
import { Ship } from './objects/ship';
import { Ground } from './objects/ground';
import { Vector3 } from './math';

const stage = new Konva.Stage({
  container: 'game',
  width: constants.SCREEN_WIDTH,
  height: constants.SCREEN_HEIGHT,
});

const layer = new Konva.Layer();

const ship = new Ship(new Vector3(0, 20));
ship.init(layer);

const ground = new Ground();
ground.init(layer);

stage.add(layer);

const animation = new Konva.Animation(function(frame) {
  ship.update(frame.timeDiff);
  if (ground.intersectsObject(ship.lines)) {
    ship.destroy();
  }
}, layer);

animation.start();
