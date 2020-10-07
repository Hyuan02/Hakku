import 'phaser'

export default class Player{

    private scene: Phaser.Scene;
    private sprite: Phaser.Physics.Arcade.Sprite;
    private cursor: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene){
        this.scene = scene;
    }

    preload(){
        this.scene.load.spritesheet("playerWalk", "assets/Spritesheets/Player/sage_walk.png", {frameWidth: 24, frameHeight: 24});
    }

    create(){
        this.animsRoutine();
        this.sprite = this.scene.physics.add.sprite(200,200, 'playerWalk');
        this.sprite.setScale(2,2);
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        
    }

    input(){
        this.sprite.setVelocity(0);
        if(this.cursor.left.isDown){
            this.sprite.setVelocityX(-100);
        }
        else if(this.cursor.right.isDown){
            this.sprite.setVelocityX(100);
        }
        if(this.cursor.up.isDown){
            this.sprite.setVelocityY(-100);
        }
        else if(this.cursor.down.isDown){
            this.sprite.setVelocityY(100);
        }

        if(this.cursor.left.isDown){
            this.sprite.anims.play('player_walk_left', true);
        }
        else if(this.cursor.right.isDown){
            this.sprite.anims.play('player_walk_right', true);
        }
        else if(this.cursor.up.isDown){
            this.sprite.anims.play('player_walk_up', true);
        }
        else if(this.cursor.down.isDown){
            this.sprite.anims.play('player_walk_down', true);
        }
        else{
            this.sprite.anims.stop();
        }
        // else if(this.cursor.)
    }

    private animsRoutine(){
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