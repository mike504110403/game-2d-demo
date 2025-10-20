/**
 * 玩家資料結構
 */
export interface PlayerData {
    id: string;
    name: string;
    level: number;
    experience: number;
    position: {
        x: number;
        y: number;
    };
    isGrounded: boolean;
    isMoving: boolean;
    isJumping: boolean;
    facingRight: boolean;
    speed: number;
    jumpForce: number;
    maxHealth: number;
    currentHealth: number;
}

/**
 * 玩家狀態枚舉
 */
export enum PlayerState {
    IDLE = 'idle',
    WALKING = 'walking',
    JUMPING = 'jumping',
    FALLING = 'falling',
    ATTACKING = 'attacking'
}

/**
 * 輸入動作枚舉
 */
export enum InputAction {
    MOVE_LEFT = 'move_left',
    MOVE_RIGHT = 'move_right',
    JUMP = 'jump',
    ATTACK = 'attack',
    SKILL = 'skill'
}