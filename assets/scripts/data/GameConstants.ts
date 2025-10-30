/**
 * 遊戲常數定義
 */
export class GameConstants {
    // 場景名稱
    static readonly SCENES = {
        MAIN_MENU: 'MainMenu',
        GAME_PLAY: 'GamePlay',
        SETTINGS: 'Settings'
    };

    // 層級設定
    static readonly LAYERS = {
        BACKGROUND: 'Background',
        GAME_OBJECTS: 'GameObjects',
        PLAYER: 'Player',
        UI: 'UI'
    };

    // 物理參數
    static readonly PHYSICS = {
        GRAVITY: -980,
        PLAYER_SPEED: 200,
        JUMP_FORCE: 500
    };

    // 相機設定
    static readonly CAMERA = {
        FOLLOW_SPEED: 5,
        OFFSET_X: 0,
        OFFSET_Y: 0
    };
}
