System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        cc.Class({
          extends: cc.Component,
          statics: {
            _instance: null
          },
          properties: {
            // 輸入狀態
            inputStates: {
              default: {},
              type: cc.Object
            }
          },

          onLoad() {
            InputManager._instance = this;
            this.initializeInput();
          },

          /**
           * 取得輸入管理器實例
           */
          getInstance() {
            return InputManager._instance;
          },

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
          },

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
          },

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
          },

          /**
           * 檢查輸入狀態
           */
          isInputPressed(inputName) {
            return this.inputStates[inputName] || false;
          }

        }); // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, {});
    }
  };
});
//# sourceMappingURL=a3385c529709c73ffd6f3dbffbfee9cc4799496c.js.map