import Phaser, { Scene } from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import TextureKeys from '../consts/TextureKeys';
import Levels from '../gameTypes/Levels';

export default class Preloader extends Phaser.Scene {
    private levels = new Levels();


    constructor() {
        super(SceneKeys.Preloader);
    }

    preload() {
        this.load.image(TextureKeys.Background, 'assets/bg@2x.png');
        this.load.image(TextureKeys.Paddle, 'assets/paddle@2x.png');
        this.load.image(TextureKeys.Ball, 'assets/ball@2x.png');
        this.load.image(TextureKeys.Brick, 'assets/block@2x.png');
        this.load.image(TextureKeys.GameOver, 'assets/GameOver@2x.png');
        this.load.image(TextureKeys.YouWon, 'assets/YouWon@2x.png');
        this.load.image(TextureKeys.BrickPiece, 'assets/block_break01@2x.png');
        this.load.image(TextureKeys.Star, 'assets/Star@2x.png');
        this.load.image(TextureKeys.HeartOutline, 'assets/heartOutline.png');
        this.load.image(TextureKeys.HeartFilled, 'assets/heartFilled.png');
    }

    create() {
        this.scene.start(SceneKeys.Game, this.levels.gameLevels[0]);
    }
}