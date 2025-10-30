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
          properties: {
            playerNode: {
              default: null,
              type: cc.Node
            }
          },
          statics: {
            _instance: null
          },

          onLoad() {
            // 設定單例實例
            GameManager._instance = this;
            console.log('遊戲管理器初始化完成');
          },

          start() {
            // 遊戲開始時的初始化邏輯
            this.initializeGame();
          },

          /**
           * 初始化遊戲
           */
          initializeGame() {
            console.log('開始初始化遊戲...');
            console.log('遊戲初始化完成');
          },

          /**
           * 遊戲暫停
           */
          pauseGame() {
            console.log('遊戲暫停');
          },

          /**
           * 遊戲恢復
           */
          resumeGame() {
            console.log('遊戲恢復');
          },

          /**
           * 遊戲結束
           */
          endGame() {
            console.log('遊戲結束');
          }

        }); // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, {});
    }
  };
});
//# sourceMappingURL=5577dc5b310b3b08ba6001ea141ba52f95960660.js.map