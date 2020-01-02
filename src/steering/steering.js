import Mousetrap from 'mousetrap';

export class Steering {
  constructor() {
    this.xAxis = 0;
    this.yAxis = 0;

    Mousetrap.bind('up', () => this.yAxis = 1);
    Mousetrap.bind('up', () => this.yAxis = 0, 'keyup')
    Mousetrap.bind('down', () => this.yAxis = -1);
    Mousetrap.bind('down', () => this.yAxis = 0, 'keyup');

    Mousetrap.bind('right', () => this.xAxis = 1);
    Mousetrap.bind('right', () => this.xAxis = 0, 'keyup');
    Mousetrap.bind('left', () => this.xAxis = -1);
    Mousetrap.bind('left', () => this.yAxis = 0, 'keyup');
  }
}
