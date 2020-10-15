export default class Menu extends Phaser.Scene {
    title: Phaser.GameObjects.BitmapText;
    start: Phaser.GameObjects.Image;
    soundBtn: Phaser.GameObjects.Image;
    muteBtn: Phaser.GameObjects.Image;
    enabledsoundBtn: boolean = true;
    mainSound: Phaser.Sound.BaseSound;
    constructor(){
        super('menu')
    }

    create(){
        this.addBackgroundImages();
        this.addInteractiveImages();
        this.setGameTitle();
        this.listenSoundBtnGame();
        this.listenMuteBtnGame();
        this.listenStartGame();
        this.mainSound = this.game.sound.add("Sunstrider");
    }

    addBackgroundImages(){

        const positionX = this.cameras.main.centerX; 
        const positionY = this.cameras.main.centerY - 25;
        const scaleSizeX = 1.5;
        const scaleSizeY = 1;
        this.add.image(positionX,positionY,"bg10").setScale(scaleSizeX,scaleSizeY);
        this.add.image(positionX,positionY,"bg9").setScale(scaleSizeX,scaleSizeY);
        this.add.image(positionX,positionY,"bg8").setScale(scaleSizeX,scaleSizeY);
        this.add.image(positionX,positionY,"bg7").setScale(scaleSizeX,scaleSizeY);
        this.add.image(positionX,positionY,"bg6").setScale(scaleSizeX,scaleSizeY);
        this.add.image(positionX,positionY,"bg5").setScale(scaleSizeX,scaleSizeY);
        this.add.image(positionX,positionY,"bg4").setScale(scaleSizeX,scaleSizeY);
        this.add.image(positionX,positionY,"bg3").setScale(scaleSizeX,scaleSizeY);
        this.add.image(positionX,positionY,"bg2").setScale(scaleSizeX,scaleSizeY);
        this.add.image(positionX,positionY,"bg1").setScale(scaleSizeX,scaleSizeY);
        this.add.sprite(650, 660, "playerWalk", 0).setScale(2.5);
        this.add.sprite(640,665, "weapon",7).setScale(1.5);
    }

    addInteractiveImages() {
        const atlasTexture = this.textures.get('ui')
        const frames = atlasTexture.getFrameNames();
        // Start
        this.start = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'ui', frames[20]);
        this.start.setInteractive();
        this.start.input.cursor = 'pointer';
        // No sound icon
        this.muteBtn = this.add.image(1200, 650, 'ui', frames[4]);
        this.muteBtn.setInteractive();
        this.muteBtn.setVisible(false);
        this.muteBtn.input.cursor = 'pointer';
        // Sound icon
        this.soundBtn = this.add.image(1200, 650, 'ui', frames[5]);
        this.soundBtn.setInteractive();
        this.soundBtn.input.cursor = 'pointer';
    }

    

    setGameTitle(){
        this.title =  this.add.bitmapText(this.cameras.main.centerX - 90, this.cameras.main.centerY - 150, 'vcr','Hakku',64);
    }

    listenStartGame(){
        this.start.on('pointerdown', () => {
            this.mainSound.stop();
            this.cameras.main.fadeOut(1000,0,0,0); 
            this.cameras.main
            .once( Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam,effect) => {
                    this.scene.start('phase1');
            });
        });
    }

    listenSoundBtnGame(){

        this.soundBtn.on('pointerdown', () => {
            this.soundBtn.setVisible(false);
            this.sound.mute = true;
            this.muteBtn.setVisible(true);
        });
    }

    listenMuteBtnGame(){

        this.muteBtn.on('pointerdown', () => {
            this.muteBtn.setVisible(false);
            this.soundBtn.setVisible(true);
            this.sound.mute = false;
            if(!this.mainSound.isPlaying)
                this.mainSound.play({loop: true});
            
        });
    }

    listenAnyKeyBoardInput(){

        // this.input.keyboard.on('keydown',() => {
        //     this.scene.start('phase1');
        // });
    }
    
}