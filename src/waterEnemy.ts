import 'phaser';


export default class WaterEnemyGroup extends Phaser.Physics.Arcade.Group{
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
    // preUpdate(time, delta){
    //     super.preUpdate(time, delta);
    //     console.log("I'm a water!");
    // }
}