import 'phaser';
import {IceGroup} from './magic';
import {skillKeys, Direction} from './utils';


export default class Player extends Phaser.Physics.Arcade.Sprite{

    private cursor: Phaser.Types.Input.Keyboard.CursorKeys;
    private skillKeys: skillKeys = {keyQ: null, keyE: null, keyR: null, keyW: null};
    private iceMagic: IceGroup;
    private shootDirection: Direction = Direction.Down;
    private onSkill: boolean = false;

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
    }

    verifyInput(){
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
            if(!this.onSkill){
                this.iceMagic.shootIce(this.x, this.y, this.shootDirection);
                this.onSkill = true;
            }  
        }

        if(this.skillKeys.keyQ.isUp){
            this.onSkill = false;
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

        this.scene.anims.create(configWalkDown);
        this.scene.anims.create(configWalkLeft);
        this.scene.anims.create(configWalkRight);
        this.scene.anims.create(configWalkUp);
        

    }





}