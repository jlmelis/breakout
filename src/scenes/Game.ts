import Phaser, { Scenes } from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import SceneKeys from '../consts/SceneKeys';

export default class Game extends Phaser.Scene {
  private background!: Phaser.GameObjects.Image;
  private paddle!: Phaser.Physics.Arcade.Sprite;
  private ball!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private bricks!: Phaser.Physics.Arcade.StaticGroup;

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
    this.paddle = this.physics.add.sprite(
      width * 0.5, height - 50, 
      TextureKeys.Paddle);
    this.paddle.setImmovable(true);
    this.paddle.setCollideWorldBounds(true);
    this.paddle.setScale (.25);
    
    
    // Create Ball
    this.ball = this.physics.add.sprite(width * 0.5, height *0.5, TextureKeys.Ball);
    this.ball.setScale(.25);
    this.ball.setCollideWorldBounds(true);

    this.ball.setVelocityY(500);
    this.ball.setBounce(1);
    
    this.ball.on('worldBounds', () => {console.log('out of bounds')});
    this.physics.add.collider(this.ball, this.paddle, this.ballHitPaddle, undefined, this );
    

    this.bricks = this.physics.add.staticGroup();
    this.spawnBricks();
    this.physics.add.collider(this.ball, this.bricks, this.ballHitBricks, undefined, this );

    this.physics.world.setBounds(
      0,
      0,
      width,
      height
    );
    this.physics.world.checkCollision.down = false;
    
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

    // Out of bounds check. if the ball bounds are still within the world this returns true
    // if false that means the ball has lefft the screen and we need to end the game.
    if (!Phaser.Geom.Rectangle.Overlaps(this.physics.world.bounds, this.ball.getBounds())) {
      //console.log('world bounds');
      this.scene.run(SceneKeys.GameOver);
    }
  }

  private ballHitPaddle(
    obj1: Phaser.GameObjects.GameObject, 
    obj2: Phaser.GameObjects.GameObject
  ) {
      this.ball.setVelocityX(-1 * 5 * (this.paddle.x - this.ball.x));
  }

  private ballHitBricks(
    obj1: Phaser.GameObjects.GameObject, 
    obj2: Phaser.GameObjects.GameObject
  ) {
      const brick = obj2 as Phaser.Physics.Arcade.Sprite;
      this.bricks.killAndHide(brick);
      brick.body.enable = false;
  }

  spawnBricks() {
    // TODO: make this configurable for different levels
    const brickInfo = {
      width: 50,
      height: 20,
      count: {
          row: 3,
          col: 8
      },
      offset: {
          top: 60,
          left: 90
      },
      padding: 40
    };

    this.bricks.children.each(child => {
      const brick = child as Phaser.Physics.Arcade.Sprite;
      this.bricks.killAndHide(brick);
      brick.body.enable = false;
    });

    let x = 20;
    for (let col = 0; col < brickInfo.count.col; col++) {
      for (let row = 0; row < brickInfo.count.row; row++) {
          let brickX = (col * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.left;
          let brickY = (row * (brickInfo.height + brickInfo.padding)) + brickInfo.offset.top;

          const brick  = this.bricks.get(
            brickX,
            brickY,
            TextureKeys.Brick
          ) as Phaser.Physics.Arcade.Sprite;

          // brick.setActive(true);
          // const body = brick.body as Phaser.Physics.Arcade.StaticBody;
          // body.enable = true;
      }
    }

  }

}
