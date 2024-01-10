import { Scene } from "phaser";

type ArcadeSprite = Phaser.Physics.Arcade.Sprite;

export class PreloadScene extends Scene {
  //finger
  private finger: ArcadeSprite = {} as ArcadeSprite;

  constructor() {
    super({
      key: "PreloadScene",
    });
  }

  preload() {
    this.load.image("playField", "playField.png");
    this.load.image("finger", "finger.png");
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
