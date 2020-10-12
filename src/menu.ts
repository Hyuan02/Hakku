export default class Menu extends Phaser.Scene {
    title: Phaser.GameObjects.BitmapText;
    start: Phaser.GameObjects.Image;
    soundBtn: Phaser.GameObjects.Image;
    muteBtn: Phaser.GameObjects.Image;
    enabledsoundBtn: boolean = true;
    constructor(){
        super('menu')
    }

    preload(){
        this.load.bitmapFont('vcr', 'assets/fonts/vcr_osd.png', 'assets/fonts/vcr_osd.xml');
        this.load.atlasXML('ui', 'assets/Spritesheets/UI/sheet_white2x.png', 'assets/Spritesheets/UI/sheet_white2x.xml');
        this.load.image("bg10", "assets/Spritesheets/SplashScreen/Layer_0010_1.png");
        this.load.image("bg9", "assets/Spritesheets/SplashScreen/Layer_0009_2.png");
        this.load.image("bg8", "assets/Spritesheets/SplashScreen/Layer_0008_3.png");
        this.load.image("bg7", "assets/Spritesheets/SplashScreen/Layer_0007_Lights.png");
        this.load.image("bg6", "assets/Spritesheets/SplashScreen/Layer_0006_4.png");
        this.load.image("bg5", "assets/Spritesheets/SplashScreen/Layer_0005_5.png");
        this.load.image("bg4", "assets/Spritesheets/SplashScreen/Layer_0004_Lights.png");
        this.load.image("bg3", "assets/Spritesheets/SplashScreen/Layer_0003_6.png");
        this.load.image("bg2", "assets/Spritesheets/SplashScreen/Layer_0002_7.png");
        this.load.image("bg1", "assets/Spritesheets/SplashScreen/Layer_0001_8.png");
    }

    create(){

        this.addBackgroundImages();
        this.addInteractiveImages();
        this.setGameTitle();
        this.listenSoundBtnGame();
        this.listenMuteBtnGame();
        this.listenStartGame();
       
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
            this.scene.start('phase1');
        });
    }

    listenSoundBtnGame(){

        this.soundBtn.on('pointerdown', () => {
            this.soundBtn.setVisible(false);
            this.muteBtn.setVisible(true);
        });
    }

    listenMuteBtnGame(){

        this.muteBtn.on('pointerdown', () => {
            this.muteBtn.setVisible(false);
            this.soundBtn.setVisible(true);
        });
    }

    listenAnyKeyBoardInput(){

        // this.input.keyboard.on('keydown',() => {
        //     this.scene.start('phase1');
        // });
    }
    
}