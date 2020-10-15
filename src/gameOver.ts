
export default class GameOver extends Phaser.Scene {
    private restart: Phaser.GameObjects.Image;
    private menu: Phaser.GameObjects.Image;

    constructor(){
        super('gameOver');
    }

    create(){
        console.log('Executou no game over');
        this.cameras.main.setBackgroundColor('rgb(0,0,0)');
        this.add.bitmapText(this.cameras.main.centerX - 150, this.cameras.main.centerY - 150, 'vcr','Game Over',64);
        this.addInteractiveImages();
        this.listenRestartGame();
        this.listenToMenu();
    }

    addInteractiveImages() {
        const atlasTexture = this.textures.get('ui')
        const frames = atlasTexture.getFrameNames();
        // X
        frames.forEach((e,i) => console.log(e + ''+ i));
        this.restart = this.add.image(this.cameras.main.centerX - 80, this.cameras.main.centerY, 'ui', frames[72]);
        this.restart.setInteractive();
        this.restart.input.cursor = 'pointer';
        this.menu = this.add.image(this.cameras.main.centerX + 80, this.cameras.main.centerY, 'ui', frames[30]);
        this.menu.setInteractive();
        this.menu.input.cursor = 'pointer';

    }

    listenRestartGame(){
        this.restart.on('pointerdown', () => {
            //this.mainSound.stop();
            this.cameras.main.fadeOut(1000,0,0,0); 
            this.cameras.main
            .once( Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam,effect) => {
                this.scene.start("phase1", new Object());
                // const phase1 = this.scene.get('phase1')
                // phase1.registry.destroy();
                // phase1.scene.restart();
                
            });
        });
       
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