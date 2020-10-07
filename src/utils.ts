export enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

export interface skillKeys{
    keyQ: Phaser.Input.Keyboard.Key,
    keyW: Phaser.Input.Keyboard.Key,
    keyE: Phaser.Input.Keyboard.Key,
    keyR: Phaser.Input.Keyboard.Key,
}

export const HALF_PI = Math.PI/2;