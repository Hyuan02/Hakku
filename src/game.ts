import 'phaser';
import Player from './player';
import {WaterEnemyGroup, FireEnemyGroup, AirEnemyGroup, GroundEnemyGroup} from './Enemies';
import SoundManager from './SoundManager';

export default class PhaseOne extends Phaser.Scene{
    private player: Player;
    private map: Phaser.Tilemaps.Tilemap;
    public layers: Array<Phaser.Tilemaps.StaticTilemapLayer> = [];
    private maskImage: Phaser.GameObjects.Image;
    private renderTexture : Phaser.GameObjects.RenderTexture;
    private waterEnemies: WaterEnemyGroup;
    private fireEnemies: FireEnemyGroup;
    private airEnemies: AirEnemyGroup;
    private groundEnemies: GroundEnemyGroup;
    private soundManager: SoundManager;
    private ready: boolean = false;
    constructor(){
        super('phase1')
        
    }

    //#region PHASER_ROUTINES
    create() {
        this.game.events.on("GameOver", this.onGameOver, this);
        this.layers = new Array<Phaser.Tilemaps.StaticTilemapLayer>();
        this.scene.launch("UIScene");
        this.createTileWorld();
        this.player = new Player(this, 200, 1800);
        this.instatiateEnemies();
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.createFogEffect();
        this.addColliders();
        this.ready = true;
        this.cameras.main.visible = true;
        this.soundManager = new SoundManager(this.game);
        

        
    }

    update(time, delta){
        if(!this.ready)
            return;
        this.player.verifyInput();
        this.updatePlayerDataToEnemy();
        this.updateFog();
       
    }
    //#endregion "END_PHASER ROUTINES"


    createTileWorld(){
        this.map = this.add.tilemap('phase1map');
        const tileset = this.map.addTilesetImage('nature_tileset');
        this.layers.push(this.map.createStaticLayer('Ground', tileset));
        this.layers.push(this.map.createStaticLayer('Walls', tileset)); 
        this.layers.push(this.map.createStaticLayer('Rocks', tileset));
        this.layers.push(this.map.createStaticLayer('Props', tileset));
        this.layers.push(this.map.createStaticLayer('Water', tileset));



        
    }

    instatiateEnemies(){
        const waterLayer = this.map.getObjectLayer('water_enemy');
        const fireLayer = this.map.getObjectLayer('fire_enemy');
        const airLayer = this.map.getObjectLayer('wind_enemy');
        const groundLayer = this.map.getObjectLayer('ground_enemy');
        this.waterEnemies = new WaterEnemyGroup(this, waterLayer);
        this.fireEnemies = new FireEnemyGroup(this, fireLayer, this.player);
        this.airEnemies = new AirEnemyGroup(this, airLayer);
        this.groundEnemies = new GroundEnemyGroup(this, groundLayer);
    }

    createFogEffect(){
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


    updateFog(){
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


    addColliders(){

        console.log("Layers: " , this.layers);
        for(let i = 1; i< this.layers.length; i++){
            this.layers[i].setCollisionByExclusion([-1]);
            this.physics.add.collider(this.player, this.layers[i]);
            if(this.layers[i].layer.name != "Water")
                this.physics.add.collider(this.waterEnemies, this.layers[i]);
         }
         this.player.atributeWeaponsToEnemies(
            this.waterEnemies,
            this.fireEnemies,
            this.groundEnemies,
            this.airEnemies
         );


         this.physics.add.overlap([this.waterEnemies,
            this.fireEnemies,
            this.groundEnemies,
            this.airEnemies
        ], this.player, (object1, object2) => {
            this.playEnemyHit(object1, object2);
            this.player.onEnemyHit(object1, object2); 
        }, null, this);

    }


    updatePlayerDataToEnemy(){
        this.fireEnemies.updatePlayerX(this.player.x);
        this.airEnemies.updatePlayerData(this.player.x, this.player.y);
        this.groundEnemies.updatePlayerData(this.player.x, this.player.y);
    }


    playEnemyHit(object1, object2){
        let enemy = object1 instanceof Player? object2: object1;
        if (!this.player.dead)
        this.game.events.emit("soundEnemy", enemy.type);
    }



    onGameOver(){
        this.ready= false;
        this.soundManager?.onGameOver();
        this.soundManager = null;
        this.scene.stop("UIScene");
        this.scene.start("gameOver");
        
    }

}

