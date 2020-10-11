import 'phaser';
import './game';
import PhaseOne from './game';
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
    scene: [Preloader,PhaseOne]
};

const game = new Phaser.Game(config);