import 'phaser';


export class WaterEnemyGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene: Phaser.Scene, tiles: Phaser.Tilemaps.ObjectLayer){
        super(scene.physics.world, scene);
        for(let i = 0; i<tiles.objects.length; i++){
            this.createFromConfig({
                classType: WaterEnemy,
                "setXY.x": tiles.objects[i].x,
                "setXY.y": tiles.objects[i].y,
                active: true,
                key: 'water-monster'
            });
        }
        this.scene.anims.create({
                key:'waterEnemyAnim',
                frames: this.scene.anims.generateFrameNumbers('water-monster', {start: 0}),
                frameRate: 12,
                repeat: -1       
            }
        );
        this.playAnimation('waterEnemyAnim');
    }
}

class WaterEnemy extends Phaser.Physics.Arcade.Sprite{

    private velocityX: number =150;
    private velocityY: number =150;
    private timeLimit: number = 2.0;
    private timeMovingLimit: number = 0.25;
    private actualTime: number = 0.0;

    private moving : boolean = false;
    constructor(scene: Phaser.Scene, x, y){
        super(scene, x,y, 'water-monster');
        scene.physics.add.existing(this);
        this.type = "Water"
    }


    movement(){
        this.setVelocity(5, 0);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        if(!this.moving){
            if(this.actualTime < this.timeLimit){
                this.actualTime+=delta/1000;
            }
            else{
                this.moving = true;
                this.setVelocity(this.velocityX * (Phaser.Math.Between(-1,1) >= 0? 1 : -1),
                this.velocityY * (Phaser.Math.Between(-1,1) >= 0? 1: -1));
                this.actualTime = 0;
            }
        }
        else{
            if(this.actualTime < this.timeMovingLimit){
                this.actualTime+=delta/1000;
            }
            else{
                this.setVelocity(0,0);
                this.actualTime = 0;
                this.moving = false;
            }
        }
    }

    destroyEnemy(){
        this.disableBody(true, true);
    }
}



export class FireEnemyGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene: Phaser.Scene, tiles: Phaser.Tilemaps.ObjectLayer, player: Phaser.Physics.Arcade.Sprite){
        super(scene.physics.world, scene);
        this.scene.anims.create({
            key: 'fireBallEnemyAnim',
            frames: this.scene.anims.generateFrameNumbers('fireBall', { start: 0 }),
            frameRate: 20,
            repeat: -1
        });
        for(let i = 0; i<tiles.objects.length; i++){
            this.createFromConfig({
                classType: FireEnemy,
                "setXY.x": tiles.objects[i].x,
                "setXY.y": tiles.objects[i].y,
                active: true,
                key: 'fire-monster'
            });
        }
        this.scene.anims.create({
                key:'fireEnemyAnim',
                frames: this.scene.anims.generateFrameNumbers('fire-monster', {start: 0}),
                frameRate: 12,
                repeat: -1       
            }
        );
        this.playAnimation('fireEnemyAnim');
        this.updatePlayerCollider(player);
    }


    updatePlayerX(x: number){
        this.propertyValueSet('playerX', x);
    }

    updatePlayerCollider(player){
        this.getChildren().forEach((e: FireEnemy)=>{
            //@ts-ignore
            this.scene.physics.add.overlap(e.fireBall, player, (object1, object2)=>{player.onEnemyHit(object1, object2); this.scene.playEnemyHit(object1,object2)},null, player);
        });
    }
}


class FireEnemy extends Phaser.Physics.Arcade.Sprite{
    private timeToMove: number = 2.0;
    private timeToShoot: number = 5.0;
    private actualTimeMoving: number = 0;
    private actualTimeShoot: number = 0;
    private velocityY: number = 30;
    public playerX: number = 1;
    public fireBall: FireBallEnemy;

    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, 'fire-monster');
        scene.physics.add.existing(this);
        this.type = "Fire";
        this.fireBall = new FireBallEnemy(scene, x,y);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if(this.actualTimeMoving < this.timeToMove){
            this.actualTimeMoving += delta/1000;
        }
        else{
            this.actualTimeMoving = 0;
            this.velocityY = -this.velocityY;
            this.setVelocityY(this.velocityY);
        }

        if(this.actualTimeShoot < this.timeToShoot){
            this.actualTimeShoot += delta/1000;
        }
        else{
            this.actualTimeShoot = 0;
            this.fireBall.setFire(this.x,this.y, Math.sign(this.playerX - this.x));
        }
    }

    destroyEnemy(){
        this.disableBody(true, true);
    }
}


class FireBallEnemy extends Phaser.Physics.Arcade.Sprite{
    private actualXDistance: number; 
    private readonly xVelocity: number = 100;
    private readonly xRange: number = 600;
    private isMoving: boolean = false;
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, 'fireBall');
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.active = false;
        this.visible = false;
        this.type = "Fire";
        this.anims.play('fireBallEnemyAnim', true);
    }

    setFire(x: number, y: number, sign: number){
        if (!this.isMoving) {
            this.setFlipX(sign>0? false: true);
            this.enableBody(true, x,y, true, true);
            this.actualXDistance = x;
            this.setVelocityX(this.xVelocity * sign)
            this.isMoving = true;
        }
        
    }


    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if(Math.abs(this.actualXDistance - this.x) > this.xRange){
            this.disableBody(true, true);
            this.isMoving = false;
            this.setVelocity(0);
        }
    }

    destroyEnemy(){
        this.disableBody(true, true);
    }

}


export class AirEnemyGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene: Phaser.Scene, tiles: Phaser.Tilemaps.ObjectLayer){
        super(scene.physics.world, scene);
        for(let i = 0; i<tiles.objects.length; i++){
            this.createFromConfig({
                classType: AirEnemy,
                "setXY.x": tiles.objects[i].x,
                "setXY.y": tiles.objects[i].y,
                active: true,
                key: 'air-monster'
            });
        }
        this.scene.anims.create({
                key:'airEnemyAnim',
                frames: this.scene.anims.generateFrameNumbers('air-monster', {start: 0}),
                frameRate: 12,
                repeat: -1       
            }
        );
        this.playAnimation('airEnemyAnim');
    }

    updatePlayerData(x: number, y: number){
        this.propertyValueSet('playerX', x);
        this.propertyValueSet('playerY', y);
    }

}

class AirEnemy extends Phaser.Physics.Arcade.Sprite{
    public playerX: number = 1;
    public playerY: number = 1;
    private readonly velocityX: number = 300;
    private readonly timeToStop: number = 3.0;
    private actualTime: number = 0;
    private moving: boolean = false;
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x,y, 'air-monster');
        scene.physics.add.existing(this);
        this.type = "Air";
    }


    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.moving) {
            if (this.actualTime < this.timeToStop) {
                this.actualTime+=delta/1000;
            }
            else{
                this.actualTime = 0;
                this.setVelocity(0);
                this.moving = false;
            }
        }

        else if(!this.moving){
            if(this.actualTime < this.timeToStop){
                this.actualTime+=delta/1000;
            }
            else{
                this.actualTime = 0;
                this.fly();
            }
        }
    }

    fly() {
        if (!this.moving) {
            this.setVelocityX(this.velocityX * (this.playerX > this.x ? 1 : -1));
            this.moving = true;
        }
    }

    destroyEnemy(){
        this.disableBody(true, true);
    }
}


export class GroundEnemyGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene: Phaser.Scene, tiles: Phaser.Tilemaps.ObjectLayer){
        super(scene.physics.world, scene);
        this.scene.anims.create({
            key:'groundEnemyAnim',
            frames: this.scene.anims.generateFrameNumbers('earth-monster', {start: 0}),
            frameRate: 12,
            repeat: -1       
        });
        for(let i = 0; i<tiles.objects.length; i++){
            this.createFromConfig({
                classType: GroundEnemy,
                "setXY.x": tiles.objects[i].x,
                "setXY.y": tiles.objects[i].y,
                active: true,
                key: 'earth-monster'
            });
        }
        this.playAnimation('groundEnemyAnim');
    }

    updatePlayerData(x: number, y:number){
        this.propertyValueSet('playerX', x);
        this.propertyValueSet('playerY', y);
    }
}

class GroundEnemy extends Phaser.Physics.Arcade.Sprite{
    private maxScale: number = 3.0;
    private playerX: number = Number.MIN_SAFE_INTEGER;
    private playerY: number = Number.MIN_SAFE_INTEGER;
    private scaleFactor: number = 0.1;

    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x,y, 'earth-monster');
        this.type = "Ground";
        this.setScale(0.05);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if(Math.abs(this.playerX - this.x) < 100  && Math.abs(this.playerY - this.y) < 100){
            if(this.scale < this.maxScale)
                this.setScale(this.scale + this.scaleFactor);
        }
    }

    destroyEnemy(){
        this.disableBody(true, true);
    }

}