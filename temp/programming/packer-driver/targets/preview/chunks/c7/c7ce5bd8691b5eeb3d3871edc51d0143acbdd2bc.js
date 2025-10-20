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
            rigidBody: {
              default: null,
              type: cc.RigidBody2D
            },
            sprite: {
              default: null,
              type: cc.Sprite
            },
            speed: {
              default: 200,
              type: cc.Float
            },
            jumpForce: {
              default: 500,
              type: cc.Float
            }
          },

          onLoad() {
            this.isGrounded = false;
            this.isMoving = false;
            this.facingRight = true;
            this.initializePlayer();
          },

          start() {
            this.setupInput();
          },

          update(deltaTime) {
            this.handleInput();
            this.updatePlayerState();
          },

          /**
           * 初始化玩家
           */
          initializePlayer() {
            console.log('玩家控制器初始化完成');
          },

          /**
           * 設定輸入系統
           */
          setupInput() {
            // 註冊鍵盤事件
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
          },

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
          },

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
          },

          /**
           * 處理輸入
           */
          handleInput() {// 輸入處理邏輯
          },

          /**
           * 向左移動
           */
          moveLeft() {
            if (this.rigidBody) {
              this.rigidBody.linearVelocity = cc.v2(-this.speed, this.rigidBody.linearVelocity.y);
              this.facingRight = false;
              this.isMoving = true;
            }
          },

          /**
           * 向右移動
           */
          moveRight() {
            if (this.rigidBody) {
              this.rigidBody.linearVelocity = cc.v2(this.speed, this.rigidBody.linearVelocity.y);
              this.facingRight = true;
              this.isMoving = true;
            }
          },

          /**
           * 停止移動
           */
          stopMoving() {
            if (this.rigidBody) {
              this.rigidBody.linearVelocity = cc.v2(0, this.rigidBody.linearVelocity.y);
              this.isMoving = false;
            }
          },

          /**
           * 跳躍
           */
          jump() {
            if (this.isGrounded && this.rigidBody) {
              this.rigidBody.linearVelocity = cc.v2(this.rigidBody.linearVelocity.x, this.jumpForce);
              this.isGrounded = false;
            }
          },

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
          },

          /**
           * 更新精靈圖片
           */
          updateSprite() {
            if (this.sprite && this.sprite.node) {
              // 根據面向方向翻轉圖片
              this.sprite.node.scaleX = this.facingRight ? 1 : -1;
            }
          }

        }); // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, {});
    }
  };
});
//# sourceMappingURL=c7ce5bd8691b5eeb3d3871edc51d0143acbdd2bc.js.map