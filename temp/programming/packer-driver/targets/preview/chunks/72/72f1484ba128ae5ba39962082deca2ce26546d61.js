System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, PlayerController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "10e7eHfCGhObJoEvG4t7Z1E", "PlayerController", undefined);

      ({
        ccclass,
        property
      } = cc._decorator);
      /**
       * 玩家控制器
       * 負責處理玩家角色的移動、跳躍、攻擊等行為
       */

      _export("PlayerController", PlayerController = (_dec = ccclass('PlayerController'), _dec2 = property(cc.RigidBody2D), _dec3 = property(cc.Sprite), _dec(_class = (_class2 = class PlayerController extends cc.Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "rigidBody", _descriptor, this);

          _initializerDefineProperty(this, "sprite", _descriptor2, this);

          _initializerDefineProperty(this, "speed", _descriptor3, this);

          _initializerDefineProperty(this, "jumpForce", _descriptor4, this);

          // 玩家狀態
          this.isGrounded = false;
          this.isMoving = false;
          this.facingRight = true;
        }

        onLoad() {
          this.initializePlayer();
        }

        start() {
          this.setupInput();
        }

        update(deltaTime) {
          this.handleInput();
          this.updatePlayerState();
        }
        /**
         * 初始化玩家
         */


        initializePlayer() {
          console.log('玩家控制器初始化完成');
        }
        /**
         * 設定輸入系統
         */


        setupInput() {
          // 註冊鍵盤事件
          cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
          cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        }
        /**
         * 鍵盤按下事件
         */


        onKeyDown(event) {
          switch (event.keyCode) {
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
              this.moveLeft();
              break;

            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
              this.moveRight();
              break;

            case cc.macro.KEY.space:
            case cc.macro.KEY.up:
            case cc.macro.KEY.w:
              this.jump();
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
            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
              this.stopMoving();
              break;
          }
        }
        /**
         * 處理輸入
         */


        handleInput() {// 輸入處理邏輯
        }
        /**
         * 向左移動
         */


        moveLeft() {
          if (this.rigidBody) {
            this.rigidBody.linearVelocity = cc.v2(-this.speed, this.rigidBody.linearVelocity.y);
            this.facingRight = false;
            this.isMoving = true;
          }
        }
        /**
         * 向右移動
         */


        moveRight() {
          if (this.rigidBody) {
            this.rigidBody.linearVelocity = cc.v2(this.speed, this.rigidBody.linearVelocity.y);
            this.facingRight = true;
            this.isMoving = true;
          }
        }
        /**
         * 停止移動
         */


        stopMoving() {
          if (this.rigidBody) {
            this.rigidBody.linearVelocity = cc.v2(0, this.rigidBody.linearVelocity.y);
            this.isMoving = false;
          }
        }
        /**
         * 跳躍
         */


        jump() {
          if (this.isGrounded && this.rigidBody) {
            this.rigidBody.linearVelocity = cc.v2(this.rigidBody.linearVelocity.x, this.jumpForce);
            this.isGrounded = false;
          }
        }
        /**
         * 更新玩家狀態
         */


        updatePlayerState() {
          if (this.rigidBody) {
            var velocity = this.rigidBody.linearVelocity; // 檢查是否在地面上

            if (velocity.y === 0) {
              this.isGrounded = true;
            } else if (velocity.y < -50) {
              this.isGrounded = false;
            } // 更新精靈圖片


            this.updateSprite();
          }
        }
        /**
         * 更新精靈圖片
         */


        updateSprite() {
          if (this.sprite && this.sprite.node) {
            // 根據面向方向翻轉圖片
            this.sprite.node.scaleX = this.facingRight ? 1 : -1;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rigidBody", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sprite", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 200;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "jumpForce", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 500;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=72f1484ba128ae5ba39962082deca2ce26546d61.js.map