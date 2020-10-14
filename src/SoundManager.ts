import 'phaser';
import {Subject} from 'rxjs';

export default class SoundManager{
    private playMagicSounds: Subject<string>; 
    private playEnemySounds: Subject<string>;

    private magicSounds: Array<Phaser.Sound.BaseSound> = new Array<Phaser.Sound.BaseSound>();
    private enemySounds: Array<Phaser.Sound.BaseSound> = new Array<Phaser.Sound.BaseSound>();
    private mainTrack : Phaser.Sound.BaseSound;
    private game: Phaser.Game;
    constructor(playerFX: Subject<string>, playEnemySounds: Subject<string>,  game: Phaser.Game){
        this.playMagicSounds = playerFX;
        this.playEnemySounds = playEnemySounds;
        this.game = game;
        this.initRoutine();
        
    }


    initRoutine(){
        if(this.playMagicSounds){
            this.playMagicSounds.subscribe(magic=>{
                this.playMagicSound(magic);
            });
        }

        if(this.playEnemySounds){
            this.playEnemySounds.subscribe(enemy=>{
                this.playEnemySound(enemy);
            });
        }

        this.magicSounds.push(this.game.sound.add('Magic1'));
        this.magicSounds.push(this.game.sound.add('Magic2'));
        this.magicSounds.push(this.game.sound.add('Magic3'));
        this.magicSounds.push(this.game.sound.add('Magic4'));
        this.enemySounds.push(this.game.sound.add('Monster1'));
        this.enemySounds.push(this.game.sound.add('Monster2'));
        this.enemySounds.push(this.game.sound.add('Monster3'));
        this.enemySounds.push(this.game.sound.add('Monster4'));
        this.mainTrack = this.game.sound.add("ForMe");
        this.mainTrack.play({
            loop: true           
        });
    }

    playMagicSound(magic){
        switch(magic){
            case 'ice':
                this.magicSounds[1].play();
            break;
            case 'fire':
            if(!this.magicSounds[0].isPlaying){
                this.magicSounds[0].play();
            }
            break;
            case 'wind':
                if(!this.magicSounds[2].isPlaying){
                    this.magicSounds[2].play();
                }
            break;
            case 'ground':
                if(!this.magicSounds[3].isPlaying){
                    this.magicSounds[3].play();
                }
            break;
        }

    }

    playEnemySound(enemy){
        // console.log("Playing enemy: " + enemy);
        switch(enemy){
            case 'Water':
                if(!this.enemySounds[0].isPlaying)
                    this.enemySounds[0].play();
            break;
            case 'Fire':
            if(!this.enemySounds[1].isPlaying){
                this.enemySounds[1].play();
            }
            break;
            case 'Air':
                if(!this.enemySounds[2].isPlaying){
                    this.enemySounds[2].play();
                }
            break;
            case 'Ground':
                if(!this.enemySounds[3].isPlaying){
                    this.enemySounds[3].play();
                }
            break;
        }
    }
}