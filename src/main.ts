import 'phaser';
import './game';
import PhaseOne from './game';
import GameOver from './gameOver';
import Menu from './menu';
import UIScene from './UIScene';
import Preloader from './preloader';

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 1280,
    height: 720,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    pixelArt: true,
    scene: [Preloader,Menu,PhaseOne,GameOver, UIScene]
};

const game = new Phaser.Game(config);