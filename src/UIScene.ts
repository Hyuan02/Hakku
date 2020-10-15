export default class UIScene extends Phaser.Scene{

    private lifeQuantity
    private lifeSprite: Phaser.GameObjects.Sprite;
    private lifeText: Phaser.GameObjects.BitmapText;

    constructor(){
        super({key: "UIScene"});
        
    }


    create(){
        // this.game.events.on()
        this.lifeSprite = this.add.sprite(50, 50, "playerLife", 0);
        this.lifeSprite.scale = 3;
        this.lifeText = this.add.bitmapText(90, 50, 'vcr',": 2", 30);

        this.game.events.on("updateLife", this.updateLife, this);
    }

    updateLife(quantity: number){
        switch(quantity){
            case 2:
                this.lifeSprite.setFrame(0);
            break;
            case 1:
                this.lifeSprite.setFrame(1);
            break;
        }

        this.lifeText.text = " : " + quantity;
    }
}