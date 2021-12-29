import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import TextureKeys from '../consts/TextureKeys';

export default class Winner extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Winner)
    }

    create() {
        const { width, height } = this.scale;

        const x = width * 0.5;
        const y = height * 0.5;

        this.add.image(x, y, TextureKeys.YouWon)
        .setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.stop(SceneKeys.Winner);

            // TODO: look into to moving this logic to the main scene
            this.scene.stop(SceneKeys.Game);
            this.scene.start(SceneKeys.Game);
        });
    }
}