import { Scene } from "phaser";

type ArcadeSprite = Phaser.Physics.Arcade.Sprite;

export class FinishScene extends Scene {
  //finger
  private finger: ArcadeSprite = {} as ArcadeSprite;

  constructor() {
    super({
      key: "FinishScene",
    });
  }

  preload() {}

  create() {
    const field = this.add.image(0, 0, "playField");
    field.setOrigin(0, 0);

    this.finger = this.physics.add.sprite(185, 170, "finger");
    this.resize(1.2);

    const downloadButton = document.getElementById("download");
    const infoMessage = document.getElementById("infoMessage");

    if (infoMessage && downloadButton) {
      downloadButton.classList.remove("disabled");
      infoMessage.classList.remove("disabled");
      infoMessage.textContent =
        "Отличный ход! Узнайте больше стратегий и играйте полную версию!";
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
