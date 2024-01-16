import { Scene } from "phaser";

export const drawImageBase64 = (
  base64Url: string,
  imageName: string,
  scene: Scene,
  width: number,
  height: number
): void => {
  const dynamicTexture = scene.textures.createCanvas(imageName, width, height);

  const context = dynamicTexture?.getContext();
  const image = new Image();

  image.onload = () => {
    context && context.drawImage(image, 0, 0);
    dynamicTexture && dynamicTexture.refresh();
  };

  image.src = base64Url;
};
