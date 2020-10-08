import 'phaser';
import Player from './player';

export default class Fog extends Phaser.Scene{
    private player: Player;

    constructor(){
        super('fog')
        
    }

    preload(){
        this.load.image('tiles', 'assets/Maps/roguelikeDungeon_transparent.png');
        this.load.spritesheet("ice", "assets/Spritesheets/Magic/IcePick_64x64.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("fire", "assets/Spritesheets/Magic/FireCast_96x96.png", {frameWidth: 96, frameHeight: 96});
        this.load.spritesheet('windIdle', "assets/Spritesheets/Magic/TornadoLoop_96x96.png", {frameWidth: 96, frameHeight: 96});
        this.load.spritesheet('windMoving', "assets/Spritesheets/Magic/TornadoMoving_96x96.png", {frameWidth: 96, frameHeight: 96});
        this.load.spritesheet("playerWalk", "assets/Spritesheets/Player/sage_walk.png", {frameWidth: 24, frameHeight: 24});
        this.load.tilemapTiledJSON('map', 'assets/Maps/Cave.json');
    }

    create(){
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('roguelikeDungeon_transparent','tiles');
        const floor = map.createStaticLayer('FLOOR', tileset, 0,0);
        const walls = map.createStaticLayer('WALLS', tileset, 0,0);
        const walkable = map.createStaticLayer('WALKABLE', tileset,0,0);
        this.player = new Player(this, 200,200); 
    }

    update(time, delta){
        this.player.verifyInput();
    }
    
}

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
    scene: Fog
};

const game = new Phaser.Game(config);