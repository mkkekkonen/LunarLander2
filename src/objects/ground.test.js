import { getXCoord } from './ground';

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
