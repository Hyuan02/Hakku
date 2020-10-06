import 'phaser';
import Player from './player';

export default class Fog extends Phaser.Scene{
    private player: Player = new Player(this);

    constructor(){
        super('fog')
        
    }

    
    preload(){
        this.player.preload();
        this.load.image('tiles', 'assets/Maps/roguelikeDungeon_transparent.png');
        this.load.image('libs', 'assets/libs.png');
        this.load.tilemapTiledJSON('map', 'assets/Maps/Cave.json');
    }

    create(){
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('roguelikeDungeon_transparent','tiles');
        const floor = map.createStaticLayer('FLOOR', tileset, 0,0);
        const walls = map.createStaticLayer('WALLS', tileset, 0,0);
        const walkable = map.createStaticLayer('WALKABLE', tileset,0,0);
        this.player.create();
        // this.add.image(400, 300, 'libs');
    }

    update(time, delta){
        this.player.input();
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