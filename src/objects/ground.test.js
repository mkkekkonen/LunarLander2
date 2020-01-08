import { getXCoord, Ground } from './ground';
import { Ship } from './ship';
import { Vector3 } from '../math';

describe('getXCoord', () => {
  test('first', () => {
    expect(getXCoord(0)).toEqual(-25);
  });

  test('1/4', () => {
    expect(getXCoord(12.5)).toEqual(-12.5);
  });

  test('1/2', () => {
    expect(getXCoord(25)).toEqual(0);
  });

  test('3/4', () => {
    expect(getXCoord(37.5)).toEqual(12.5);
  });

  test('last', () => {
    expect(getXCoord(50)).toEqual(25);
  });
});

describe('intersection with ship', () => {
  const ground = new Ground();

  ground.points = [
    new Vector3(-1, -1),
    new Vector3(2, 2),
  ];

  it('does not intersect', () => {
    const ship = new Ship();

    ship.location = new Vector3(-1, 2);

    expect(ground.intersectsObject(ship.lines)).toBe(false);
  });

  it('intersects', () => {
    const ship = new Ship();

    ship.location = new Vector3();

    expect(ground.intersectsObject(ship.lines)).toBe(true);
  });
});
