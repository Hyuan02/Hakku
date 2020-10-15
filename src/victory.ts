
export default class Victory extends Phaser.Scene {
    private restart: Phaser.GameObjects.Image;
    private menu: Phaser.GameObjects.Image;

    constructor(){
        super('victory');
    }

    create(){
        this.cameras.main.setBackgroundColor('rgb(0,0,0)');
        this.add.bitmapText(this.cameras.main.centerX - 150, this.cameras.main.centerY - 150, 'vcr','Victory!',64);
        this.addInteractiveImages();
        this.listenToMenu();
    }

    addInteractiveImages() {
        const atlasTexture = this.textures.get('ui')
        const frames = atlasTexture.getFrameNames();
        // X
        
        this.menu = this.add.image(this.cameras.main.centerX - 20, this.cameras.main.centerY, 'ui', frames[30]);
        this.menu.setInteractive();
        this.menu.input.cursor = 'pointer';

    }

    listenToMenu(){
        this.menu.on('pointerdown', () => {
            //this.mainSound.stop();
            this.cameras.main.fadeOut(1000,0,0,0); 
            this.cameras.main
            .once( Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam,effect) => {
                this.scene.start('menu');
            });
        });
    }
}