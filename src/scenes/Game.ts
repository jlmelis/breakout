import Phaser, { Scenes } from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import SceneKeys from '../consts/SceneKeys';
import BrickConfig from '../gameTypes/BrickConfig';
import SceneData from '../gameTypes/SceneData';

export default class Game extends Phaser.Scene {
  private background!: Phaser.GameObjects.Image;
  private paddle!: Phaser.Physics.Arcade.Sprite;
  private ball!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private bricks!: Phaser.Physics.Arcade.StaticGroup;
  private brickPieceEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;
  private starEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;
  private brickConfig!: BrickConfig;

  // score properties
  private scoreLabel!: Phaser.GameObjects.Text;
  private score = 0;

  // Hack to get to ball start on paddle
  private gameStarted = false;

  private levelLabel!: Phaser.GameObjects.Text;
  private level = 0;


  constructor() {
    super(SceneKeys.Game);
  }

  // TODO create brick config type
  init(data: SceneData) {
    this.score = 0;
    this.level = data.level;
    this.gameStarted = false;

    this.brickConfig = data.brickConfig as BrickConfig;
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    const { width, height } = this.scale;

    this.background = this.add.image(0, 0, TextureKeys.Background)
    .setOrigin(0, 0);
    
    this.scoreLabel = this.add.text(10, 10, this.getScoreText(), {
			fontSize: '36px',
			color: '#F4F1F1',
			fontStyle: 'normal',
			stroke: '#000000',
			strokeThickness: 2,
      
    });

    this.levelLabel = this.add.text(width - 200, 10, this.getLevelText(), {
			fontSize: '36px',
			color: '#F4F1F1',
			fontStyle: 'normal',
			stroke: '#000000',
			strokeThickness: 2,
      
    });

    // Create Paddle
    this.paddle = this.physics.add.sprite(
      width * 0.5, height - 50, 
      TextureKeys.Paddle);
    this.paddle.setImmovable(true);
    this.paddle.setCollideWorldBounds(true);
    
    // Create Ball
    this.ball = this.physics.add.sprite(
      this.paddle.x, 
      height - (50 + this.paddle.height), 
      TextureKeys.Ball
    );
    
    this.ball.setCollideWorldBounds(true);
    this.ball.setVelocityY(-500);
    this.ball.setBounce(1);
    //this.ball.body.setCircle(this.ball.body.width * 0.5);
    
    this.physics.add.collider(this.ball, this.paddle, this.ballHitPaddle, undefined, this );
    

    this.bricks = this.physics.add.staticGroup();
    this.spawnBricks();
    this.physics.add.collider(this.ball, this.bricks, this.ballHitBricks, undefined, this );

    // emmitters for block explosion
    this.brickPieceEmitter = this.add.particles(TextureKeys.BrickPiece).createEmitter({
      speed: { min: -800, max: 800 },
      angle: { min: 0, max: 360 },
      scale: { start: 1, end: 0 },
      blendMode: 'SCREEN',
      visible: false,
      active: false,
      lifespan: 600,
      gravityY: 800
    });
    this.starEmitter = this.add.particles(TextureKeys.Star).createEmitter({
      speed: { min: -800, max: 800 },
      angle: { min: 0, max: 360 },
      scale: { start: .5, end: 0 },
      blendMode: 'SCREEN',
      visible: false,
      active: false,
      lifespan: 600,
      gravityY: 800
    });

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

    let pointer = this.input.activePointer;
    if (pointer.isDown && this.gameStarted) {
      this.paddle.setX(pointer.x);
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
    //probably a better way to do this
      if (!this.gameStarted) {
        this.gameStarted = true;
      }

      const brick = obj2 as Phaser.Physics.Arcade.Sprite;
      this.bricks.killAndHide(brick);
      brick.body.enable = false;

      this.ball.setVelocityX(-1 * 5 * (brick.x - this.ball.x));

      this.score += 10;
      this.scoreLabel.text = this.getScoreText();

      this.brickPieceEmitter.active = true;
      this.brickPieceEmitter.visible = true;
      this.brickPieceEmitter.explode(5, brick.x, brick.y);

      this.starEmitter.active = true;
      this.starEmitter.visible = true;
      this.starEmitter.explode(5, brick.x, brick.y);

      if (this.score == this.bricks.children.size * 10) {
        this.level ++;
        
        this.scene.run(SceneKeys.Winner, {level: this.level});

        this.ball.setVisible(false);
        this.ball.body.enable = false;
      }
  }

  getScoreText() {
    return `Score: ${this.score}`;
  }

  getLevelText() {
    return `Level: ${this.level}`;
  }

  spawnBricks() {
    this.bricks.children.each(child => {
      const brick = child as Phaser.Physics.Arcade.Sprite;
      this.bricks.killAndHide(brick);
      brick.body.enable = false;
    });

   for (let row = 0; row < this.brickConfig.rows.length; row++) {
     let brickRow = this.brickConfig.rows[row];
     for (let col = 0; col < brickRow.length; col++) {

       let placeBrick = brickRow[col] == 1;

       if (placeBrick) {
          let brickX = (col * (this.brickConfig.width)) + this.brickConfig.offsetLeft;
          let brickY = (row * (this.brickConfig.height + this.brickConfig.padding)) + this.brickConfig.offsetTop;
          this.bricks.get(
            brickX,
            brickY,
            TextureKeys.Brick
          ) as Phaser.Physics.Arcade.Sprite;
        }
     }
     
   }

  }

}
