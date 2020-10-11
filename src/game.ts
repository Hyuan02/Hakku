import 'phaser';
import Player from './player';

export default class PhaseOne extends Phaser.Scene{
    private player: Player;
    private map: Phaser.Tilemaps.Tilemap;
    public layers: Array<Phaser.Tilemaps.StaticTilemapLayer> = [];

    private debugGraphics;
    constructor(){
        super('phase1')
        
    }


    create(){
        this.map = this.make.tilemap({key: 'phase1map'});
        const tileset = this.map.addTilesetImage('nature_tileset');
        this.layers.push(this.map.createStaticLayer('Ground', tileset));
        this.layers.push(this.map.createStaticLayer('Walls', tileset)); 
        this.layers.push(this.map.createStaticLayer('Rocks', tileset));
        this.layers.push(this.map.createStaticLayer('Props', tileset));
        this.layers.push(this.map.createStaticLayer('Water', tileset))
        this.debugGraphics = this.add.graphics();
        this.player = new Player(this, 200,200); 
        for(let i = 1; i< this.layers.length; i++){
            console.log("adding collider");
            this.layers[i].setCollisionByExclusion([-1]);

            this.physics.add.collider(this.player, this.layers[i], this.onCollide);
         }

         this.cameras.main.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
         this.cameras.main.startFollow(this.player);
    }

    update(time, delta){
        this.player.verifyInput();
        // for(let i = 1; i< this.layers.length; i++){
        //     this.physics.world.collide(this.player, this.layers[i]);
        // }
    }

    onCollide(){
        console.log("Colliding!");
    }


    drawDebug() {
        this.debugGraphics.clear();
        console.log("Debuggando")
        // Pass in null for any of the style options to disable drawing that component
        this.map.renderDebug(this.debugGraphics, {
            tileColor: null, // Non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
        });

    }

}

