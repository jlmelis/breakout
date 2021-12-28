import Phaser, { Scene } from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import TextureKeys from '../consts/TextureKeys';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Preloader);
    }

    preload() {
        this.load.image(TextureKeys.Background, 'assets/bg_single_800x600.png');
        this.load.image(TextureKeys.Paddle, 'assets/paddle_12.png');
    }

    create() {
        this.scene.start(SceneKeys.Game);
    }
}