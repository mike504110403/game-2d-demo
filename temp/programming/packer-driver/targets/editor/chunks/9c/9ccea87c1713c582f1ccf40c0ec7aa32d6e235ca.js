System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, PlayerState, InputAction;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5adc9GlpMZDlKTOEZBvJ191", "PlayerData", undefined);
      /**
       * 玩家資料結構
       */


      /**
       * 玩家狀態枚舉
       */
      _export("PlayerState", PlayerState = /*#__PURE__*/function (PlayerState) {
        PlayerState["IDLE"] = "idle";
        PlayerState["WALKING"] = "walking";
        PlayerState["JUMPING"] = "jumping";
        PlayerState["FALLING"] = "falling";
        PlayerState["ATTACKING"] = "attacking";
        return PlayerState;
      }({}));
      /**
       * 輸入動作枚舉
       */


      _export("InputAction", InputAction = /*#__PURE__*/function (InputAction) {
        InputAction["MOVE_LEFT"] = "move_left";
        InputAction["MOVE_RIGHT"] = "move_right";
        InputAction["JUMP"] = "jump";
        InputAction["ATTACK"] = "attack";
        InputAction["SKILL"] = "skill";
        return InputAction;
      }({}));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9ccea87c1713c582f1ccf40c0ec7aa32d6e235ca.js.map