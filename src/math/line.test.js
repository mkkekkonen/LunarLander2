import { Line } from './line';
import { Vector3 } from './vector3';

describe('lineSegmentIntersects', () => {
  const startPoint = new Vector3(0, 0);
  const endPoint = new Vector3(3, 2);
  const lineSegment = new Line(startPoint, endPoint);

  it('intersects', () => {
    const iStartPoint = new Vector3(0, 2);
    const iEndPoint = new Vector3(2, 0);
    const intersectingLine = new Line(iStartPoint, iEndPoint);

    expect(lineSegment.lineSegmentIntersects(intersectingLine)).toBeTruthy();
  });

  it('does not intersect', () => {
    const iStartPoint = new Vector3(-1, 0);
    const iEndPoint = new Vector3(0, -1);
    const notIntersectingLine = new Line(iStartPoint, iEndPoint);

    expect(lineSegment.lineSegmentIntersects(notIntersectingLine)).toBeFalsy();
  });
});

