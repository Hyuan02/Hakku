import 'phaser';
import Player from './player';

export default class PhaseOne extends Phaser.Scene{
    private player: Player;
    private map: Phaser.Tilemaps.Tilemap;
    public layers: Array<Phaser.Tilemaps.StaticTilemapLayer> = [];
    private maskImage: Phaser.GameObjects.Image;
    private renderTexture : Phaser.GameObjects.RenderTexture;
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
        this.layers.push(this.map.createStaticLayer('Water', tileset));
        this.player = new Player(this, 200,200); 
        for(let i = 1; i< this.layers.length; i++){
            console.log("adding collider");
            this.layers[i].setCollisionByExclusion([-1]);

            this.physics.add.collider(this.player, this.layers[i]);
         }

         this.cameras.main.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
         this.cameras.main.startFollow(this.player);

         const width = this.scale.width;
         const height = this.scale.height;

         this.renderTexture = this.make.renderTexture({
            width,
            height,
         }, true);

         this.renderTexture.fill(0x000000, 1);
         this.renderTexture.draw(this.layers[0]);
         this.renderTexture.draw(this.layers[1]);
         this.renderTexture.setTint(0x246a9c);

         this.maskImage = this.make.image({
            x: this.player.x,
            y: this.player.y,
            key: 'soft-mask',
            add: false
         });

         this.maskImage.scale = 0.5;

         this.renderTexture.mask = new Phaser.Display.Masks.BitmapMask(this, this.maskImage);
         this.renderTexture.mask.invertAlpha = true;

    }

    update(time, delta){
        this.player.verifyInput();

        if(this.maskImage){
            this.maskImage.x = this.player.x;
            this.maskImage.y = this.player.y;
        }

        if(this.renderTexture){
            this.renderTexture.x = this.cameras.main.scrollX;
            this.renderTexture.y = this.cameras.main.scrollY;
            this.renderTexture.draw(this.layers[0], -this.cameras.main.scrollX, -this.cameras.main.scrollY);
            this.renderTexture.draw(this.layers[1], -this.cameras.main.scrollX, -this.cameras.main.scrollY);
        }
    }




}

