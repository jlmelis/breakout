import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import TextureKeys from '../consts/TextureKeys';
import BrickConfig from '../gameTypes/BrickConfig';
import Levels from '../gameTypes/Levels';
import SceneData from '../gameTypes/Levels';

export default class GameOver extends Phaser.Scene {
    private levels = new Levels();
    private sceneData!: SceneData;

    constructor() {
        super(SceneKeys.GameOver);
        //this.sceneData = this.levels.gameLevels[0];
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
        this.scene.start(SceneKeys.Game, this.levels.gameLevels[0]);
    }
}