import "./style.css";
import { Game, AUTO } from "phaser";
import { MainScene } from "./MainScene";
import { PreloadScene } from "./PreloadScene";
import { FinishScene } from "./FinishScene";

const parentElement = document.getElementById("game-wrapper");

var config = {
  type: AUTO,
  width: 370,
  height: 248,
  parent: parentElement || undefined,
  scene: [PreloadScene, MainScene, FinishScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

new Game(config);
