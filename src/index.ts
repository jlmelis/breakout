import Phaser from 'phaser';
import config from './config';
import Game from './scenes/Game';
import GameOver from './scenes/GameOver';
import Preloader from './scenes/Preloader'

new Phaser.Game(
  Object.assign(config, {
    scene: [Preloader, Game, GameOver]
  })
);
