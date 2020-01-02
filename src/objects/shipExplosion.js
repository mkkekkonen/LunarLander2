import Konva from 'konva';

import { ShipParticle } from './shipParticle';

export class ShipExplosion {
  constructor() {
    this.particles = undefined;
  }

  init(layer, location) {
    this.particles = [];

    for(let i = 0; i < 10; i++) {
      const particle = new ShipParticle();
      particle.init(layer, location);
      this.particles.push(particle);
    }
  }

  update(timeDiff) {
    if (this.particles) {
      this.particles.forEach(particle => particle.update(timeDiff));
    }
  }
}
