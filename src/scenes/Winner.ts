import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import TextureKeys from '../consts/TextureKeys';
import SceneData from '../gameTypes/SceneData';
import Levels from '../gameTypes/Levels';

export default class Winner extends Phaser.Scene {
    private sceneData!: SceneData;
    private levels = new Levels();

    constructor() {
        super(SceneKeys.Winner);
    }

    // TODO: Add to scene data?
    init(data) {

        if (this.levels.gameLevels.length > data.level){
            this.sceneData = this.levels.gameLevels[data.level];
            this.sceneData.level = data.level;
        }
    }

    create() {
        const { width, height } = this.scale;

        const x = width * 0.5;
        const y = height * 0.5;

        this.add.image(x, y, TextureKeys.YouWon)
        .setOrigin(0.5);

        this.input.once('pointerdown', this.resetGame, this);

        this.input.keyboard.once('keydown-SPACE', this.resetGame, this);
    }

    resetGame() {
        this.scene.stop(SceneKeys.Winner)

        // TODO: look into to moving this logic to the main scene
        this.scene.stop(SceneKeys.Game);
        this.scene.start(SceneKeys.Game, this.sceneData);
    }
}