import { Scene } from "phaser";

export class FinishScene extends Scene {
  constructor() {
    super({
      key: "FinishScene",
    });
  }

  preload() {}

  create() {
    const field = this.add.image(0, 0, "playField");
    field.setOrigin(0, 0);

    const playAgainButton = document.getElementById("play-again");
    const downloadButton = document.getElementById("download");
    const infoMessage = document.getElementById("infoMessage");

    if (playAgainButton && infoMessage && downloadButton) {
      playAgainButton.classList.remove("disabled");
      downloadButton.classList.remove("disabled");
      infoMessage.classList.remove("disabled");
      infoMessage.textContent =
        "Отличный ход! Узнайте больше стратегий и играйте полную версию!";

      playAgainButton.addEventListener("click", () => {
        this.scene.start("MainScene");

        playAgainButton.classList.add("disabled");
        downloadButton.classList.add("disabled");
        infoMessage.classList.add("disabled");
      });
    }
  }
}
