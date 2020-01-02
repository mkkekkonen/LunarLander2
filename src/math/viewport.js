import { Matrix4x4 } from './matrix4x4';

export const createViewportMatrix = (
  worldWidth = 50,
  worldHeight = 50,
  screenWidth = 480,
  screenHeight = 480,
) => {
  const scaleX = screenWidth / worldWidth;
  const scaleY = screenHeight / worldHeight;
  const translateX = screenWidth / 4;
  const translateY = screenHeight / 4;

  const scalingMatrix = Matrix4x4.scale(scaleX, -scaleY, 1);
  const translationMatrix = Matrix4x4.translate(translateX, translateY, 0);
  return scalingMatrix.multiply(translationMatrix);
};

export const createReverseViewportMatrix = (
  worldWidth = 50,
  worldHeight = 50,
  screenWidth = 480,
  screenHeight = 480,
) => {
  const scaleX = worldWidth / screenWidth;
  const scaleY = worldHeight / screenHeight;
  const translateX = screenWidth / 4;
  const translateY = screenHeight / 4;

  const translationMatrix = Matrix4x4.translate(-translateX, -translateY, 0);
  const scalingMatrix = Matrix4x4.scale(scaleX, -scaleY, 1);
  return translationMatrix.transpose().multiply(scalingMatrix);
};
