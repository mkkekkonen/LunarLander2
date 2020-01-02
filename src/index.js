import Konva from 'konva';

import * as constants from './util/constants';
import { Ship } from './objects/ship';

const stage = new Konva.Stage({
  container: 'game',
  width: constants.SCREEN_WIDTH,
  height: constants.SCREEN_HEIGHT,
});

const layer = new Konva.Layer();

const ship = new Ship();
ship.init(layer);

stage.add(layer);

const animation = new Konva.Animation(function(frame) {
  ship.update(frame.timeDiff);
}, layer);

animation.start();
