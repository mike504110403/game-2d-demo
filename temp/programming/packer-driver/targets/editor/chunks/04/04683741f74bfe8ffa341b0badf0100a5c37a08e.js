System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, GameConstants, _crd;

  _export("GameConstants", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "deb8dNEC6BDm6EPpBKn58Ii", "GameConstants", undefined);

      /**
       * 遊戲常數定義
       */
      _export("GameConstants", GameConstants = class GameConstants {});

      // 場景名稱
      GameConstants.SCENES = {
        MAIN_MENU: 'MainMenu',
        GAME_PLAY: 'GamePlay',
        SETTINGS: 'Settings'
      };
      // 層級設定
      GameConstants.LAYERS = {
        BACKGROUND: 'Background',
        GAME_OBJECTS: 'GameObjects',
        PLAYER: 'Player',
        UI: 'UI'
      };
      // 物理參數
      GameConstants.PHYSICS = {
        GRAVITY: -980,
        PLAYER_SPEED: 200,
        JUMP_FORCE: 500
      };
      // 相機設定
      GameConstants.CAMERA = {
        FOLLOW_SPEED: 5,
        OFFSET_X: 0,
        OFFSET_Y: 0
      };

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=04683741f74bfe8ffa341b0badf0100a5c37a08e.js.map