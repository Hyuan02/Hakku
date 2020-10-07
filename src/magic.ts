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
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
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

        if(this.y <= 0 || this.x <= 0 || this.y >= 720 || this.x >= 1280){
            this.setActive(false);
            this.setVisible(false);
        }
    }
}