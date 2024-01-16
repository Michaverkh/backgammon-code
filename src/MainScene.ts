import { Scene } from "phaser";
import { drawImageBase64 } from "./utils";
import { assetsCollection } from "./data";

type ArcadeSprite = Phaser.Physics.Arcade.Sprite;
type Rectangle = Phaser.GameObjects.Rectangle;

export class MainScene extends Scene {
  //checker
  private checker: ArcadeSprite = {} as ArcadeSprite;

  //finger
  private finger: ArcadeSprite = {} as ArcadeSprite;
  private fingerAnimation: any;

  //targetField
  private targetField: Rectangle = {} as Rectangle;

  //other
  private currentTween: any;
  private isOverlap: boolean = false;

  constructor() {
    super({
      key: "MainScene",
    });
  }

  preload() {
    drawImageBase64(assetsCollection.whiteChecker, "checker", this, 20, 20);
  }

  create() {
    //field
    const field = this.add.image(0, 0, "playField");
    field.setOrigin(0, 0);

    //checker
    this.checker = this.physics.add.sprite(325, 18, "checker");
    this.checker.setCollideWorldBounds(true);
    this.checker.setInteractive({ draggable: true });
    this.resize(1.2);

    //finger
    this.finger = this.physics.add.sprite(325, 50, "finger");
    this.move(230, 180);

    //targetField
    this.targetField = this.add.rectangle(231, 205, 27, 80);
    this.targetField.setFillStyle(0x00ff00, 0.3);
    this.physics.add.existing(this.targetField);
  }

  update() {
    // dragging checker
    this.checker.on("drag", (_pointer: any, dragX: number, dragY: number) => {
      this.checker.setPosition(dragX, dragY);
      this.isOverlap = false;
      this.stopScaleAnimation();

      //remove finger after starting dragging
      this.fingerAnimation.stop();
      this.finger.destroy();
    });

    //check collide checker and target
    this.physics.add.overlap(
      this.checker,
      this.targetField,
      this.reachTarget,
      //@ts-ignore
      null,
      this
    );
  }

  reachTarget(_checker: any, target: any) {
    !this.isOverlap &&
      this.tweens.add({
        targets: this.checker,
        x: target.x,
        y: 230,
        duration: 500,
        ease: "Linear",
        onComplete: () => {
          this.scene.start("FinishScene");
          this.isOverlap = true;
        },
      });
  }

  resize(value: number) {
    this.currentTween = this.tweens.add({
      key: "resize",
      targets: this.checker,
      ease: "Linear",
      scaleX: value,
      scaleY: value,
      duration: 300,
      repeat: -1,
      yoyo: true,
    });
  }

  move(x: number, y: number) {
    this.fingerAnimation = this.tweens.add({
      key: "fingerAnimation",
      targets: this.finger,
      ease: "Linear",
      x,
      y,
      duration: 1000,
      repeat: -1,
    });
  }

  stopScaleAnimation() {
    this.currentTween.stop();
    this.checker.setScale(1);
  }
}
