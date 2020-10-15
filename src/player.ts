import 'phaser';
import {IceGroup, FireGroup, Wind, Ground} from './magic';
import {skillKeys, Direction} from './utils';


export default class Player extends Phaser.Physics.Arcade.Sprite{

    private cursor: Phaser.Types.Input.Keyboard.CursorKeys;
    private skillKeys: skillKeys = {keyQ: null, keyE: null, keyR: null, keyW: null};
    private iceMagic: IceGroup;
    private fireMagic: FireGroup;
    private windMagic: Wind;
    private shootDirection: Direction = Direction.Down;
    private onSkillQ: boolean = false;
    private onSkillE: boolean = false;
    private onSkillR: boolean = false;
    private groundMagic: Ground;
    
    private hp: number = 4;
    public damaged: boolean = false;
    public dead: boolean = false;
    private readonly timeOnDamage: number = 0.5;
    private timeSpent: number = 0.0;
    private readonly bounceVelocity = 70;
    


    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x,y, 'playerWalk');
        this.setScale(2,2);
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.skillKeys.keyQ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.skillKeys.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.skillKeys.keyE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.skillKeys.keyR = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.createAnims();
        this.iceMagic = new IceGroup(scene);
        this.fireMagic = new FireGroup(scene);
        this.windMagic = new Wind(scene);
        this.groundMagic = new Ground(scene, this.x, this.y);
    }

    verifyInput(){
        if(this.damaged || this.dead)
            return;
        
        this.setVelocity(0);
        if(this.cursor.left.isDown){
            this.setVelocityX(-100);
            
        }
        else if(this.cursor.right.isDown){
            this.setVelocityX(100);
           
        }
        if(this.cursor.up.isDown){
            this.setVelocityY(-100);
            
        }
        else if(this.cursor.down.isDown){
            this.setVelocityY(100);
            
        }
        if(this.skillKeys.keyQ.isDown){
            if(!this.onSkillQ){
                this.iceMagic.shootIce(this.x, this.y, this.shootDirection);
                this.scene.game.events.emit('playMagic', 'ice');
                this.onSkillQ = true;
            }  
        }
        if(this.skillKeys.keyW.isDown){
            this.fireMagic.shootFire(this.x,this.y,this.shootDirection);
            this.scene.game.events.emit('playMagic', 'fire');

        }
        if(this.skillKeys.keyE.isDown){
            if(!this.onSkillE){
                this.windMagic.fireWind(this.x,this.y,this.shootDirection);
                this.scene.game.events.emit('playMagic', 'wind');

                this.onSkillE = true;
            }
        }
        if(this.skillKeys.keyR.isDown){
            if(!this.onSkillR){
                this.groundMagic.activateBarrier();
                this.scene.game.events.emit('playMagic', 'ground');
            }
        }
        if(this.skillKeys.keyQ.isUp){
            this.onSkillQ = false;
        }
        if(this.skillKeys.keyW.isUp){
            this.fireMagic.hideFire();
        }
        if(this.skillKeys.keyE.isUp){
            this.onSkillE = false;
        }
        if(this.skillKeys.keyR.isUp){
            this.onSkillR = false;
            this.groundMagic.disableBarrier();
        }

        if(this.cursor.left.isDown){
            this.anims.play('player_walk_left', true);
            this.shootDirection = Direction.Left;
        }
        else if(this.cursor.right.isDown){
            this.anims.play('player_walk_right', true);
            this.shootDirection = Direction.Right;
        }
        else if(this.cursor.up.isDown){
            this.anims.play('player_walk_up', true);
            this.shootDirection = Direction.Up;
        }
        else if(this.cursor.down.isDown){
            this.anims.play('player_walk_down', true);
            this.shootDirection = Direction.Down;
        }
        else{
            this.anims.stop();
        }
    }

    private createAnims(){
        const configWalkDown = {
            key: 'player_walk_down',
            frames: this.scene.anims.generateFrameNumbers('playerWalk', {start: 0, end: 2}),
            frameRate: 20,
            repeat: -1,
        }
        const configWalkLeft = {
            key: 'player_walk_left',
            frames: this.scene.anims.generateFrameNumbers('playerWalk', {start: 3, end: 5}),
            frameRate: 20,
            repeat: -1,
        }
        const configWalkRight = {
            key: 'player_walk_right',
            frames: this.scene.anims.generateFrameNumbers('playerWalk', {start: 6, end: 8}),
            frameRate: 20,
            repeat: -1,
        }
        const configWalkUp = {
            key: 'player_walk_up',
            frames: this.scene.anims.generateFrameNumbers('playerWalk', {start: 9, end: 11}),
            frameRate: 20,
            repeat: -1,
        }

        const configDead = {
            key: 'player_dead',
            frames: this.scene.anims.generateFrameNumbers('playerOthers', {start: 51, end: 53}),
            frameRate: 20,
            repeat: -1,
        }

        this.scene.anims.create(configWalkDown);
        this.scene.anims.create(configWalkLeft);
        this.scene.anims.create(configWalkRight);
        this.scene.anims.create(configWalkUp);
        this.scene.anims.create(configDead);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if(this.damaged){
            if(this.timeSpent < this.timeOnDamage){
                this.timeSpent += delta/1000;
            }
            else{
                if (!this.dead) {
                    this.timeSpent = 0;
                    this.damaged = false;
                    this.setTexture('playerWalk');
                }
            }
        }
        this.groundMagic.updatePosition(this.x,this.y);
    }


    atributeWeaponsToEnemies(waterGroup: Phaser.Physics.Arcade.Group,fireGroup: Phaser.Physics.Arcade.Group,
        earthGroup: Phaser.Physics.Arcade.Group,windGroup: Phaser.Physics.Arcade.Group){
            this.scene.physics.add.overlap(waterGroup, this.fireMagic, this.onSkillRight);
            this.scene.physics.add.overlap(fireGroup, this.iceMagic, this.onSkillRight);
            this.scene.physics.add.overlap(earthGroup, this.windMagic, this.onSkillRight);
            this.scene.physics.add.overlap(windGroup, this.groundMagic, this.onSkillRight);
    }



    onSkillRight(object1, enemy): void{
        if(enemy?.destroyEnemy){
            enemy.destroyEnemy();
            return;
        }
        else if(object1?.destroyEnemy){
            object1?.destroyEnemy();
        }
    }



    onEnemyHit(object1, object2){
        if(!this.damaged){
            if (this.dead)
                return;
            let signX, signY;
            if(object1 instanceof Player){
                signX = Math.sign(object1.x - object2.x);
                signY = Math.sign(object1.y - object2.y);
            }
            else{
                signX = Math.sign(object2.x - object1.x);
                signY = Math.sign(object2.y - object1.y);
            }
            this.hp -= 1; 
            this.damaged = true;
            this.setVelocity(this.bounceVelocity * signX, this.bounceVelocity * signY);
            if (this.hp <= 0) {
                this.goToGameOver();
            } else {
                this.anims.stop();
                this.setTexture('playerDamage');
            }
            this.scene.game.events.emit("updateLife", this.hp);

            
        }
    }
    goToGameOver() {
        this.dead = true;
        this.anims.play('player_dead');
        this.setVelocity(0);
        this.scene.cameras.main.fadeOut(3000,0,0,0,(camera, complete) => {
                if (complete === 1){
                    this.scene.game.events.emit('GameOver');
                }

        });
        
    }


}