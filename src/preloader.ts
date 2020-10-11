import 'phaser';

export default class Preloader extends Phaser.Scene{

    constructor(){
        super('Preloader');
    }

    preload(){
        this.load.spritesheet("ice", "assets/Spritesheets/Magic/IcePick_64x64.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("fire", "assets/Spritesheets/Magic/FireCast_96x96.png", {frameWidth: 96, frameHeight: 96});
        this.load.spritesheet('windIdle', "assets/Spritesheets/Magic/TornadoLoop_96x96.png", {frameWidth: 96, frameHeight: 96});
        this.load.spritesheet('windMoving', "assets/Spritesheets/Magic/TornadoMoving_96x96.png", {frameWidth: 96, frameHeight: 96});
        this.load.spritesheet('mageBarrier', 'assets/Spritesheets/Magic/LightCast_96.png', {frameWidth: 96, frameHeight: 96});
        this.load.spritesheet("playerWalk", "assets/Spritesheets/Player/sage_walk.png", {frameWidth: 24, frameHeight: 24});
        this.load.tilemapTiledJSON('phase1map', 'assets/cavemapexport/cavemap.json');
        this.load.image('nature_tileset', 'assets/cavemapexport/nature_tileset.png');
        this.load.image('soft-mask', 'assets/soft-mask.png');
        this.load.spritesheet('air-monster', 'assets/Monsters/air-miniboss.png', {frameWidth: 72, frameHeight: 109});
        this.load.spritesheet('earth-monster', 'assets/Monsters/earth-common.png', {frameWidth: 42, frameHeight: 29});
        this.load.spritesheet('fire-monster', 'assets/Monsters/fire-miniboss.png', {frameWidth: 88, frameHeight: 49});
        this.load.spritesheet('water-monster', 'assets/Monsters/neutral.png', {frameWidth: 32, frameHeight: 30});
        

    }

    create(){
        this.scene.start('phase1');
    }
}