System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _dec, _dec2, _class, _class2, _descriptor, _class3, _crd, ccclass, property, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d9ad4uj9Q5NZa25yjz+K8Dj", "GameManager", undefined);

      ({
        ccclass,
        property
      } = cc._decorator);
      /**
       * 遊戲管理器
       * 這是遊戲的核心管理器，負責協調各個子系統
       */

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(cc.Node), _dec(_class = (_class2 = (_class3 = class GameManager extends cc.Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "playerNode", _descriptor, this);
        }

        /**
         * 取得遊戲管理器實例
         */
        static getInstance() {
          return GameManager._instance;
        }

        onLoad() {
          // 設定單例實例
          GameManager._instance = this;
          console.log('遊戲管理器初始化完成');
        }

        start() {
          // 遊戲開始時的初始化邏輯
          this.initializeGame();
        }
        /**
         * 初始化遊戲
         */


        initializeGame() {
          console.log('開始初始化遊戲...');
          console.log('遊戲初始化完成');
        }
        /**
         * 遊戲暫停
         */


        pauseGame() {
          console.log('遊戲暫停');
        }
        /**
         * 遊戲恢復
         */


        resumeGame() {
          console.log('遊戲恢復');
        }
        /**
         * 遊戲結束
         */


        endGame() {
          console.log('遊戲結束');
        }

      }, _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ae01fd16968458c49cceb0116816d5563558ecbc.js.map