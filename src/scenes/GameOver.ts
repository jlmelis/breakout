import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import TextureKeys from '../consts/TextureKeys';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super(SceneKeys.GameOver);
    }

    create() {
        const { width, height } = this.scale;

        const x = width * 0.5;
        const y = height * 0.5;

        this.add.image(x, y, TextureKeys.GameOver)
        .setOrigin(0.5);

        this.input.once('pointerdown', this.resetGame, this);

        this.input.keyboard.once('keydown-SPACE', this.resetGame, this);
    }

    resetGame() {
        this.scene.stop(SceneKeys.GameOver)

        // TODO: look into to moving this logic to the main scene
        this.scene.stop(SceneKeys.Game);
        this.scene.start(SceneKeys.Game);
    }
}