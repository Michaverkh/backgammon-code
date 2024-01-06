import { Scene } from "phaser";

export class PreloadScene extends Scene {
  constructor() {
    super({
      key: "PreloadScene",
    });
  }

  preload() {
    this.load.image("playField", "playField.png");
  }

  create() {
    const field = this.add.image(0, 0, "playField");
    field.setOrigin(0, 0);

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
}
