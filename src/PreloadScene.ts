import { Scene } from "phaser";
import { assetsCollection } from "./data";
import { drawImageBase64 } from "./utils";

type ArcadeSprite = Phaser.Physics.Arcade.Sprite;

//Mintegral requirements
export function gameStart() {}
export function gameClose() {}

export class PreloadScene extends Scene {
  //finger
  private finger: ArcadeSprite = {} as ArcadeSprite;

  constructor() {
    super({
      key: "PreloadScene",
    });
  }

  preload() {
    drawImageBase64(assetsCollection.playField, "playField", this, 370, 248);
    drawImageBase64(assetsCollection.finger, "finger", this, 30, 35);

    //Mintegral requirements
    //@ts-ignore
    window.gameReady && window.gameReady();
  }

  create() {
    const field = this.add.image(0, 0, "playField");
    field.setOrigin(0, 0);

    this.finger = this.physics.add.sprite(185, 170, "finger");
    this.resize(1.2);

    const startButton = document.getElementById("play");
    const infoMessage = document.getElementById("infoMessage");

    if (startButton && infoMessage) {
      startButton.addEventListener("click", () => {
        this.scene.start("MainScene");
        startButton.classList.add("disabled");
        infoMessage.classList.add("disabled");
      });
    }
  }

  resize(value: number) {
    this.tweens.add({
      key: "resize",
      targets: this.finger,
      ease: "Linear",
      scaleX: value,
      scaleY: value,
      duration: 300,
      repeat: -1,
      yoyo: true,
    });
  }
}
