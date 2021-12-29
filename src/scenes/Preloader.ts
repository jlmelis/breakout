import Phaser, { Scene } from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import TextureKeys from '../consts/TextureKeys';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Preloader);
    }

    preload() {
        this.load.image(TextureKeys.Background, 'assets/bg@2x.png');
        this.load.image(TextureKeys.Paddle, 'assets/paddle@2x.png');
        this.load.image(TextureKeys.Ball, 'assets/ball@2x.png');
        this.load.image(TextureKeys.Brick, 'assets/block@2x.png');
        this.load.image(TextureKeys.GameOver, 'assets/GameOver@2x.png');
    }

    create() {
        this.scene.start(SceneKeys.Game);
    }
}