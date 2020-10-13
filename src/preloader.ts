import 'phaser';

export default class Preloader extends Phaser.Scene{

    constructor(){
        super('Preloader');
    }
    preload(){
        this.load.bitmapFont('vcr', 'assets/fonts/vcr_osd.png', 'assets/fonts/vcr_osd.xml');
        this.load.atlasXML('ui', 'assets/Spritesheets/UI/sheet_white2x.png', 'assets/Spritesheets/UI/sheet_white2x.xml');
        this.load.image("bg10", "assets/Spritesheets/SplashScreen/Layer_0010_1.png");
        this.load.image("bg9", "assets/Spritesheets/SplashScreen/Layer_0009_2.png");
        this.load.image("bg8", "assets/Spritesheets/SplashScreen/Layer_0008_3.png");
        this.load.image("bg7", "assets/Spritesheets/SplashScreen/Layer_0007_Lights.png");
        this.load.image("bg6", "assets/Spritesheets/SplashScreen/Layer_0006_4.png");
        this.load.image("bg5", "assets/Spritesheets/SplashScreen/Layer_0005_5.png");
        this.load.image("bg4", "assets/Spritesheets/SplashScreen/Layer_0004_Lights.png");
        this.load.image("bg3", "assets/Spritesheets/SplashScreen/Layer_0003_6.png");
        this.load.image("bg2", "assets/Spritesheets/SplashScreen/Layer_0002_7.png");
        this.load.image("bg1", "assets/Spritesheets/SplashScreen/Layer_0001_8.png");
        this.load.spritesheet("ice", "assets/Spritesheets/Magic/IcePick_64x64.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("fire", "assets/Spritesheets/Magic/FireCast_96x96.png", {frameWidth: 96, frameHeight: 96});
        this.load.spritesheet("fireBall", "assets/Spritesheets/Magic/FireBall_2_64x64.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('windIdle', "assets/Spritesheets/Magic/TornadoLoop_96x96.png", {frameWidth: 96, frameHeight: 96});
        this.load.spritesheet('windMoving', "assets/Spritesheets/Magic/TornadoMoving_96x96.png", {frameWidth: 96, frameHeight: 96});
        this.load.spritesheet('mageBarrier', 'assets/Spritesheets/Magic/LightCast_96.png', {frameWidth: 96, frameHeight: 96});
        this.load.spritesheet("playerWalk", "assets/Spritesheets/Player/sage_walk.png", {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet("playerDamage", "assets/Spritesheets/Player/sage_other.png", {frameWidth: 24, frameHeight: 24, startFrame: 1, endFrame: 1})
        this.load.spritesheet("weapon", "assets/Spritesheets/Weapon/weapons.png", {frameWidth: 32, frameHeight: 32});
        this.load.tilemapTiledJSON('phase1map', 'assets/cavemapexport/cavemap.json');
        this.load.image('nature_tileset', 'assets/cavemapexport/nature_tileset.png');
        this.load.image('soft-mask', 'assets/soft-mask.png');
        this.load.spritesheet('air-monster', 'assets/Monsters/air-grunt.png', {frameWidth: 74, frameHeight: 64});
        this.load.spritesheet('earth-monster', 'assets/Monsters/earth-support.png', {frameWidth: 76, frameHeight: 37});
        this.load.spritesheet('fire-monster', 'assets/Monsters/fire-miniboss.png', {frameWidth: 88, frameHeight: 49});
        this.load.spritesheet('water-monster', 'assets/Monsters/neutral.png', {frameWidth: 32, frameHeight: 30});
        

    }

    create(){
        this.scene.start('menu');
    }
}