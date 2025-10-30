System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, ParallaxBackground;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b4381a+ZqZIhYlL8nLDh7pi", "ParallaxBackground", undefined);

      ({
        ccclass,
        property
      } = cc._decorator);
      /**
       * 視差滾動背景組件
       * 實現楓之谷風格的多層背景視差效果
       */

      _export("ParallaxBackground", ParallaxBackground = (_dec = ccclass('ParallaxBackground'), _dec2 = property(cc.Node), _dec(_class = (_class2 = class ParallaxBackground extends cc.Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "target", _descriptor, this);

          _initializerDefineProperty(this, "parallaxSpeed", _descriptor2, this);

          _initializerDefineProperty(this, "layerSpeed", _descriptor3, this);

          _initializerDefineProperty(this, "layerOffset", _descriptor4, this);

          this.layers = [];
          this.initialPositions = [];
        }

        onLoad() {
          this.initializeLayers();
        }

        start() {
          if (!this.target) {
            // 嘗試找到玩家節點
            this.target = cc.find('PlayerLayer/Player');
          }
        }

        update(deltaTime) {
          if (this.target && this.layers.length > 0) {
            this.updateParallax();
          }
        }
        /**
         * 初始化背景層
         */


        initializeLayers() {
          this.layers = [];
          this.initialPositions = []; // 收集所有子節點作為背景層

          for (let i = 0; i < this.node.children.length; i++) {
            const child = this.node.children[i];
            this.layers.push(child);
            this.initialPositions.push(child.position.clone());
          }

          console.log(`視差背景初始化完成，共 ${this.layers.length} 層`);
        }
        /**
         * 更新視差效果
         */


        updateParallax() {
          const targetX = this.target.position.x;

          for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            const speed = this.layerSpeed[i] || 0.5;
            const offset = this.layerOffset[i] || 0; // 計算視差位置

            const parallaxX = this.initialPositions[i].x + targetX * speed * this.parallaxSpeed + offset; // 更新層位置

            layer.setPosition(parallaxX, layer.position.y);
          }
        }
        /**
         * 設定目標
         */


        setTarget(target) {
          this.target = target;
        }
        /**
         * 設定視差速度
         */


        setParallaxSpeed(speed) {
          this.parallaxSpeed = speed;
        }
        /**
         * 設定層速度
         */


        setLayerSpeed(speeds) {
          this.layerSpeed = speeds;
        }
        /**
         * 重置背景位置
         */


        resetPositions() {
          for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].setPosition(this.initialPositions[i]);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "parallaxSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.5;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "layerSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [0.1, 0.3, 0.6, 1.0];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "layerOffset", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [0, 0, 0, 0];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6c09d1fd871347373337db1632bd8c1fc992b70f.js.map