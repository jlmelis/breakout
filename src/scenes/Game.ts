import Phaser, { Scenes } from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import SceneKeys from '../consts/SceneKeys';

export default class Demo extends Phaser.Scene {
  private background!: Phaser.GameObjects.Image;
  private paddle!: Phaser.Physics.Arcade.Sprite;
  private ball!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super(SceneKeys.Game);
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    const { width, height } = this.scale;

    this.background = this.add.image(0, 0, TextureKeys.Background)
    .setOrigin(0, 0);

    // Create Paddle
    this.paddle = this.physics.add.sprite(width * 0.5, height - 30, TextureKeys.Paddle)
    this.paddle.setScale (.25);
    this.paddle.setCollideWorldBounds(true);

    // Create Ball
    this.ball = this.physics.add.sprite(width * 0.5, height *0.5, TextureKeys.Ball);
    this.ball.setScale(.25);
    this.ball.setCollideWorldBounds(true);

    this.physics.world.setBounds(
      0,
      0,
      width,
      height - 30
    );

    
  }

  update(t: Number, dt: Number) {
    if(this.cursors.left.isDown) {
      this.paddle.setVelocityX(-500);
    }
    else if (this.cursors.right.isDown) {
      this.paddle.setVelocityX(500);
    }
    else {
      this.paddle.setVelocityX(0);
    }
  }
}
