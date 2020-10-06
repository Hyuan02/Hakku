import 'phaser';


export default class Fog extends Phaser.Scene{
    constructor(){
        super('fog')
    }

    preload(){
        
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
        // this.add.image(400, 300, 'libs');
    }

    
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: Fog
};

const game = new Phaser.Game(config);