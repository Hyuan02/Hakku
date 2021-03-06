import 'phaser';
import {Direction, HALF_PI} from './utils';

export class IceGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene);
        this.scene.anims.create({
            key: 'iceAnim',
            frames: this.scene.anims.generateFrameNumbers('ice', {start: 0}),
            frameRate: 20,
            repeat: -1,
        });
        this.createMultiple({
            classType: Ice,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'ice'
        });
    }

    shootIce(x: number,y: number, direction: Direction){
        const ice = this.getFirstDead(false);
        if(ice){
            ice.shoot(x,y, direction);
        }
    }

}

class Ice extends Phaser.Physics.Arcade.Sprite{
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, 'ice');
    }

    shoot(x: number,y: number, direction: Direction){
        this.enableBody(true, x,y, true, true);
        this.play('iceAnim', true);
        switch(direction){
            case Direction.Up:
                this.setRotation(-HALF_PI);
                this.setVelocity(0,-400);
            break;
            case Direction.Down:
                this.setRotation(HALF_PI);
                this.setVelocity(0,400);
            break;
            case Direction.Left:
                this.setRotation(Math.PI);
                this.setVelocity(-400, 0);
            break;
            case Direction.Right:
                this.setRotation(0);
                this.setVelocity(400, 0);
            break;
        }
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        if(this.y <= (this.scene.cameras.main.worldView.top) || this.x <= (this.scene.cameras.main.worldView.left) || this.y >= (this.scene.cameras.main.worldView.bottom) || this.x >= (this.scene.cameras.main.worldView.right)){
            this.disableBody(true, true);
        }
    }
}


export class FireGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene: Phaser.Scene){
        super(scene.physics.world, scene);
        this.scene.anims.create({
            key: 'fireAnim',
            frames: this.scene.anims.generateFrameNumbers('fire', {start: 0, end: 4}),
            frameRate: 20,
            repeat: -1,
        });
        this.createMultiple({
            classType: Fire,
            frameQuantity: 15,
            visible: false,
            key: 'fire'
        });
        this.active = false;
        this.children.each((e)=>{
            const body = e.body as Phaser.Physics.Arcade.Body;
            body.enable = false; 
        });
    }
    shootFire(x: number, y: number, direction: Direction){
        let incrementX = 0;
        let incrementY = 0;
        this.active = true;
        this.setXY(x, y);
        switch(direction){
            case Direction.Up:
                this.setXY(x,y-20,0,-20);
                this.setVisible(true);
            break;
            case Direction.Down:
                this.setXY(x,y+20,0,20);
                this.setVisible(true);
            break;
            case Direction.Left:
                this.setXY(x-20,y,-20,0);
                this.setVisible(true);
            break;
            case Direction.Right:
                this.setXY(x+20,y,20,0);
                this.setVisible(true);
            break;
        }
        this.children.each((e)=>{
            const body = e.body as Phaser.Physics.Arcade.Body;
            body.enable = true; 
        });
    }

    hideFire(){
        this.active = false;
        this.setVisible(false);
        this.children.each((e)=>{
            const body = e.body as Phaser.Physics.Arcade.Body;
            body.enable = false; 
        })
    }

}

class Fire extends Phaser.Physics.Arcade.Sprite{
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, 'fire');
        this.play('fireAnim', true);
    }


}



export class Wind extends Phaser.Physics.Arcade.Sprite{
    growing: boolean = false;
    onTrajectory: boolean = false;
    growingRatio = 0.01;
    constructor(scene: Phaser.Scene){
        super(scene, 0, 0, 'windIdle');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.disableBody(true, true);
        this.scene.anims.create({
            key: 'windIdleAnim',
            frames: this.scene.anims.generateFrameNumbers('windIdle', {start: 0, end: 6}),
            frameRate: 20,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'windMovingAnim',
            frames: this.scene.anims.generateFrameNumbers('windMoving', {start: 0}),
            frameRate: 20,
            repeat: -1,
        });
    }
    preUpdate(time, delta){
        super.preUpdate(time, delta);
        // console.log("updating");
        if(this.growing){
            this.setScale(this.scaleX + this.growingRatio, this.scaleY + this.growingRatio);
            this.y-=this.growingRatio * 10;
        }

        if(this.onTrajectory){
            if(this.y <= (this.scene.cameras.main.worldView.top) || this.x <= (this.scene.cameras.main.worldView.left) || this.y >= (this.scene.cameras.main.worldView.bottom) || this.x >= (this.scene.cameras.main.worldView.right)){
                this.onTrajectory = false;
                this.disableBody(true, true);
                this.setVelocity(0);
            }
        }
    }

    fireWind(x: number, y: number, direction: Direction){
        if(!this.onTrajectory){
            if(!this.growing){
                this.enableBody(true, x, y, true, true);
                this.setScale(1,1);
                this.anims.play('windIdleAnim', true);
                this.growing = true;
            }
            else{
                this.growing = false;
                this.onTrajectory = true;
                this.anims.play('windMovingAnim', true);
                this.defineVelocity(direction);
            }
        }
    }

    private defineVelocity(direction: Direction){
        switch(direction){
            case Direction.Up:
                this.setVelocity(0, -200);
            break;
            case Direction.Down:
                this.setVelocity(0, 200);
            break;
            case Direction.Left:
                this.setVelocity(-200,0);
            break;
            case Direction.Right:
                this.setVelocity(200,0)
            break;
        }
    }
}

export class Ground extends Phaser.Physics.Arcade.Sprite{
    active: boolean = false;
    private growingRatio: number = 0.01;
    constructor(scene, x,y){
        super(scene, x,y, 'mageBarrier');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.disableBody(true, true);
        this.scene.anims.create({
            key: 'barrierAnim',
            frames: this.scene.anims.generateFrameNumbers('mageBarrier', {start: 12, end: 18}),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.play('barrierAnim', true);
    }

    updatePosition(x,y){
        this.setPosition(x,y);
    }

    activateBarrier(){
        this.enableBody(true, this.x, this.y, true, true);
    }

    disableBarrier(){
        this.setScale(1,1);
        this.disableBody(true, true);
    }
    preUpdate(time, delta){
        super.preUpdate(time,delta);
        if(this.active){
            this.setScale(this.scaleX + this.growingRatio, this.scaleY + this.growingRatio);
        }
    }

}