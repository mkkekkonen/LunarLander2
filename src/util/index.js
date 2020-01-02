import { createViewportMatrix, createReverseViewportMatrix } from '../math';

export const defaultViewportMatrix = createViewportMatrix();
export const defaultReverseViewportMatrix = createReverseViewportMatrix();

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const mapPoints = points => {
  const mappedPoints = [];
  points.forEach(point => {
    const transformedPoint = defaultViewportMatrix.multiplyVector(point);
    mappedPoints.push(transformedPoint.x);
    mappedPoints.push(transformedPoint.y);
  });
  return mappedPoints;
};
