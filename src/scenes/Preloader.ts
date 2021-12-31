import Phaser, { Scene } from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import TextureKeys from '../consts/TextureKeys';
import Levels from '../gameTypes/Levels';

export default class Preloader extends Phaser.Scene {
    private levels = new Levels();
    private begginer!: Phaser.GameObjects.Text;


    constructor() {
        super(SceneKeys.Preloader);
    }
    init() {
        
    }

    preload() {

        // preload progress
        let progressBox = this.add.graphics();
        let progressBar = this.add.graphics();
        
        progressBox.fillStyle(0x222222 , 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        this.load.image(TextureKeys.Background, 'assets/bg@2x.png')
        this.load.image(TextureKeys.Paddle, 'assets/paddle@2x.png');
        this.load.image(TextureKeys.LargePanda, 'assets/paddle@3x.png');
        this.load.image(TextureKeys.Ball, 'assets/ball@2x.png');
        this.load.image(TextureKeys.Brick, 'assets/block@2x.png');
        this.load.image(TextureKeys.ButtonBackground, 'assets/block@3x.png')
        this.load.image(TextureKeys.GameOver, 'assets/GameOver@2x.png');
        this.load.image(TextureKeys.YouWon, 'assets/YouWon@2x.png');
        this.load.image(TextureKeys.BrickPiece, 'assets/block_break01@2x.png');
        this.load.image(TextureKeys.Star, 'assets/Star@2x.png');
        this.load.image(TextureKeys.HeartOutline, 'assets/heartOutline.png');
        this.load.image(TextureKeys.HeartFilled, 'assets/heartFilled.png');

        this.load.on('progress', function(value: number) {
            progressBar.clear();
            progressBar.fillStyle(0x5cb434, 1);
            progressBar.fillRect(250, 280, 300 * value, 30)
        });

        // this.load.on('fileprogress', function(file: Phaser.Loader.File) {
        //     console.log(file.src);
        // });

        this.load.on('complete', function() {
            progressBar.destroy();
            progressBox.destroy();
        })
    }

    create() {
        const {width, height} = this.scale;

        this.add.image(0, 0, TextureKeys.Background)
        .setOrigin(0, 0);
        this.add.image(width * 0.5, height * 0.25, TextureKeys.LargePanda);

        this.add.text(width * 0.5, height * 0.4, 'Start Game', {
			fontSize: '60px',
			color: '#5CB434',
            stroke: '#060606',
			strokeThickness: 5

		})
        .setOrigin(0.5, 0.5);

        this.add.image(width * 0.5, height * 0.5, TextureKeys.ButtonBackground);
        this.begginer = this.add.text(width * 0.5, height * 0.5, 'Beginner', {
			fontSize: '36px',
            color: '#5CB434',
            stroke: '#060606',
			strokeThickness: 3
		})
        .setOrigin(0.5, 0.5);

        this.begginer.setInteractive({ useHandCursor: true });
        this.begginer.on('pointerdown', () =>{
            this.scene.start(SceneKeys.Game, this.levels.gameLevels[0]);
        });
        //this.scene.start(SceneKeys.Game, this.levels.gameLevels[0]);
    }

}