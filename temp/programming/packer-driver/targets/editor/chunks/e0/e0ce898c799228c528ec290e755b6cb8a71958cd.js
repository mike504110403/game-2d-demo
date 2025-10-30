System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _dec, _class, _class2, _crd, ccclass, property, InputManager;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7b59fWQzUNEdKnlTEpPZbtr", "InputManager", undefined);

      ({
        ccclass,
        property
      } = cc._decorator);
      /**
       * 輸入管理器
       * 負責處理所有輸入事件，包括鍵盤和觸控
       */

      _export("InputManager", InputManager = (_dec = ccclass('InputManager'), _dec(_class = (_class2 = class InputManager extends cc.Component {
        constructor(...args) {
          super(...args);
          // 輸入狀態
          this.inputStates = {};
        }

        /**
         * 取得輸入管理器實例
         */
        static getInstance() {
          return InputManager._instance;
        }

        onLoad() {
          InputManager._instance = this;
          this.initializeInput();
        }
        /**
         * 初始化輸入系統
         */


        initializeInput() {
          // 初始化輸入狀態
          this.inputStates = {
            moveLeft: false,
            moveRight: false,
            jump: false,
            attack: false
          }; // 註冊鍵盤事件

          cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
          cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
          console.log('輸入管理器初始化完成');
        }
        /**
         * 鍵盤按下事件
         */


        onKeyDown(event) {
          switch (event.keyCode) {
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
              this.inputStates.moveLeft = true;
              break;

            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
              this.inputStates.moveRight = true;
              break;

            case cc.macro.KEY.space:
            case cc.macro.KEY.up:
            case cc.macro.KEY.w:
              this.inputStates.jump = true;
              break;

            case cc.macro.KEY.j:
              this.inputStates.attack = true;
              break;
          }
        }
        /**
         * 鍵盤釋放事件
         */


        onKeyUp(event) {
          switch (event.keyCode) {
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
              this.inputStates.moveLeft = false;
              break;

            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
              this.inputStates.moveRight = false;
              break;

            case cc.macro.KEY.space:
            case cc.macro.KEY.up:
            case cc.macro.KEY.w:
              this.inputStates.jump = false;
              break;

            case cc.macro.KEY.j:
              this.inputStates.attack = false;
              break;
          }
        }
        /**
         * 檢查輸入狀態
         */


        isInputPressed(inputName) {
          return this.inputStates[inputName] || false;
        }

      }, _class2._instance = null, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e0ce898c799228c528ec290e755b6cb8a71958cd.js.map