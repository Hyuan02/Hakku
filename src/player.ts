import 'phaser'

export default class Player{

    private scene: Phaser.Scene;
    private sprite: Phaser.Physics.Arcade.Sprite;
    private cursor: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene){
        this.scene = scene;
    }

    preload(){
        this.scene.load.spritesheet("playerWalk", "assets/Spritesheets/Player/player-move.png", {frameWidth: 64, frameHeight: 64});
        this.scene.load.spritesheet("playerStrafe", "assets/Spritesheets/Player/player-strafe.png", {frameWidth: 64, frameHeight: 64});
        this.scene.load.spritesheet("playerDie", "assets/Spritesheets/Player/player-die.png", {frameWidth: 64, frameHeight: 64});
        this.scene.load.spritesheet("playerCast", "assets/Spritesheets/Player/player-cast.png", {frameWidth: 64, frameHeight: 64});
        this.scene.load.spritesheet("playerWobble", "assets/Spritesheets/Player/player-wobble.png", {frameWidth: 64, frameHeight: 64});
    }

    create(){
        this.animsRoutine();
        this.sprite = this.scene.physics.add.sprite(200,200, 'playerStrafe');
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

        this.sprite.setFlip(false, false);
        if(this.cursor.left.isDown){
            this.sprite.anims.play('player_walk');
            this.sprite.setFlip(false, true);
        }
        // else if(this.cursor.)
    }

    private animsRoutine(){
        const configWalk = {
            key: 'player_walk',
            frames: this.scene.anims.generateFrameNumbers('playerWalk', {start: 0, first: 0}),
            frameRate: 20,
            repeat: -1,
        }
        const configStrafe = {
            key: 'player_strafe',
            frames: this.scene.anims.generateFrameNumbers('playerStrafe', {start: 0, first: 0}),
            frameRate: 20,
            repeat: -1,
        }
        const configDie = {
            key: 'player_die',
            frames: this.scene.anims.generateFrameNumbers('playerDie', {start: 0, first: 0}),
            frameRate: 20,
            repeat: -1,
        }
        const configCast = {
            key: 'player_cast',
            frames: this.scene.anims.generateFrameNumbers('playerCast', {start: 0, first: 0}),
            frameRate: 20,
            repeat: -1,
        }
        const configWobble = {
            key: 'player_wobble',
            frames: this.scene.anims.generateFrameNumbers('playerWobble', {start: 0, first: 0}),
            frameRate: 20,
            repeat: -1,
        }
        this.scene.anims.create(configWalk);
        this.scene.anims.create(configStrafe);
        this.scene.anims.create(configDie);
        this.scene.anims.create(configCast);
        this.scene.anims.create(configWobble);
    }





}