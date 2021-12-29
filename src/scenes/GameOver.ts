import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super(SceneKeys.GameOver);
    }

    create() {
        const { width, height } = this.scale;

        const x = width * 0.5;
        const y = height * 0.5;

        this.add.text(x, y, 'Press SPACE to Play Again', {
			fontFamily: 'Quicksand',
			fontSize: '48px',
			color: '#E30F0F',
			fontStyle: 'italic',
			stroke: '#F2EDED',
		})
        .setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.stop(SceneKeys.GameOver);

            // TODO: look into to moving this logic to the main scene
            this.scene.stop(SceneKeys.Game);
            this.scene.start(SceneKeys.Game);
        })
    }
}