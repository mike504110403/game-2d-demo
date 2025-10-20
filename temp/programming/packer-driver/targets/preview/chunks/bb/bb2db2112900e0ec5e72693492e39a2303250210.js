System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, CameraFollow;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5777cGXPTlGYodX7fPpXDW4", "CameraFollow", undefined);

      ({
        ccclass,
        property
      } = cc._decorator);
      /**
       * 相機跟隨組件
       * 讓相機平滑跟隨目標物件移動
       */

      _export("CameraFollow", CameraFollow = (_dec = ccclass('CameraFollow'), _dec2 = property(cc.Node), _dec3 = property(cc.Camera), _dec(_class = (_class2 = class CameraFollow extends cc.Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "target", _descriptor, this);

          _initializerDefineProperty(this, "camera", _descriptor2, this);

          _initializerDefineProperty(this, "followSpeed", _descriptor3, this);

          _initializerDefineProperty(this, "offsetX", _descriptor4, this);

          _initializerDefineProperty(this, "offsetY", _descriptor5, this);

          _initializerDefineProperty(this, "smoothFollow", _descriptor6, this);

          _initializerDefineProperty(this, "followX", _descriptor7, this);

          _initializerDefineProperty(this, "followY", _descriptor8, this);

          this.initialPosition = null;
        }

        onLoad() {
          this.initializeCamera();
        }

        start() {
          if (this.camera && this.camera.node) {
            this.initialPosition = this.camera.node.position.clone();
          }
        }

        update(deltaTime) {
          if (this.target && this.camera) {
            this.followTarget(deltaTime);
          }
        }
        /**
         * 初始化相機
         */


        initializeCamera() {
          if (!this.camera) {
            this.camera = this.getComponent(cc.Camera);
          }

          if (!this.camera) {
            console.error('CameraFollow: 找不到相機組件');
            return;
          }

          console.log('相機跟隨系統初始化完成');
        }
        /**
         * 跟隨目標
         */


        followTarget(deltaTime) {
          var targetPosition = this.target.position.clone();
          var currentPosition = this.camera.node.position.clone(); // 計算目標位置

          var targetX = currentPosition.x;
          var targetY = currentPosition.y;

          if (this.followX) {
            targetX = targetPosition.x + this.offsetX;
          }

          if (this.followY) {
            targetY = targetPosition.y + this.offsetY;
          } // 計算新位置


          var newPosition;

          if (this.smoothFollow) {
            // 平滑跟隨
            var lerpFactor = this.followSpeed * deltaTime;
            newPosition = cc.v3(cc.lerp(currentPosition.x, targetX, lerpFactor), cc.lerp(currentPosition.y, targetY, lerpFactor), currentPosition.z);
          } else {
            // 直接跟隨
            newPosition = cc.v3(targetX, targetY, currentPosition.z);
          } // 更新相機位置


          this.camera.node.position = newPosition;
        }
        /**
         * 設定跟隨目標
         */


        setTarget(target) {
          this.target = target;
          console.log('相機跟隨目標已設定');
        }
        /**
         * 設定跟隨偏移
         */


        setOffset(x, y) {
          this.offsetX = x;
          this.offsetY = y;
        }
        /**
         * 設定跟隨速度
         */


        setFollowSpeed(speed) {
          this.followSpeed = speed;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "followSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "offsetX", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "offsetY", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "smoothFollow", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "followX", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "followY", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=bb2db2112900e0ec5e72693492e39a2303250210.js.map