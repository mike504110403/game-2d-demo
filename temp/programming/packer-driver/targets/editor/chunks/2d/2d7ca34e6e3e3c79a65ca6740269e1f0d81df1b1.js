System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, TeleportPortal;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b6172i9ggtBX75FW/QqgUYh", "TeleportPortal", undefined);

      ({
        ccclass,
        property
      } = cc._decorator);
      /**
       * 傳送門組件
       * 實現楓之谷風格的傳送點功能
       */

      _export("TeleportPortal", TeleportPortal = (_dec = ccclass('TeleportPortal'), _dec2 = property(cc.Node), _dec3 = property(cc.Vec2), _dec(_class = (_class2 = class TeleportPortal extends cc.Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "targetScene", _descriptor, this);

          _initializerDefineProperty(this, "targetPosition", _descriptor2, this);

          _initializerDefineProperty(this, "teleportDelay", _descriptor3, this);

          _initializerDefineProperty(this, "teleportEffect", _descriptor4, this);

          _initializerDefineProperty(this, "portalName", _descriptor5, this);

          _initializerDefineProperty(this, "requiredLevel", _descriptor6, this);

          _initializerDefineProperty(this, "requiredItem", _descriptor7, this);

          this.isTeleporting = false;
          this.playerInRange = false;
          this.teleportTimer = 0;
        }

        onLoad() {
          this.initializePortal();
        }

        start() {
          this.setupPortal();
        }

        update(deltaTime) {
          if (this.isTeleporting) {
            this.updateTeleportTimer(deltaTime);
          }
        }
        /**
         * 初始化傳送門
         */


        initializePortal() {
          // 添加碰撞檢測
          const collider = this.node.getComponent(cc.BoxCollider);

          if (!collider) {
            const newCollider = this.node.addComponent(cc.BoxCollider);
            newCollider.size = cc.size(100, 150);
            newCollider.isTrigger = true;
          } // 添加剛體


          const rigidBody = this.node.getComponent(cc.RigidBody2D);

          if (!rigidBody) {
            const newRigidBody = this.node.addComponent(cc.RigidBody2D);
            newRigidBody.type = cc.RigidBody2D.Type.Static;
          }

          console.log(`傳送門 "${this.portalName}" 初始化完成`);
        }
        /**
         * 設定傳送門
         */


        setupPortal() {
          // 建立傳送門視覺效果
          this.createPortalEffect(); // 添加提示文字

          this.createPortalLabel();
        }
        /**
         * 建立傳送門特效
         */


        createPortalEffect() {
          // 建立傳送門精靈
          const sprite = this.node.addComponent(cc.Sprite);
          sprite.spriteFrame = this.createPortalSpriteFrame(); // 設定動畫效果

          this.startPortalAnimation();
        }
        /**
         * 建立傳送門標籤
         */


        createPortalLabel() {
          const labelNode = new cc.Node('PortalLabel');
          labelNode.addComponent(cc.Label);
          labelNode.getComponent(cc.Label).string = this.portalName;
          labelNode.getComponent(cc.Label).fontSize = 20;
          labelNode.setPosition(0, 80);
          this.node.addChild(labelNode);
        }
        /**
         * 開始傳送門動畫
         */


        startPortalAnimation() {
          // 旋轉動畫
          const rotateAction = cc.rotateBy(2.0, 360);
          const repeatAction = cc.repeatForever(rotateAction);
          this.node.runAction(repeatAction); // 縮放動畫

          const scaleUp = cc.scaleTo(1.0, 1.2);
          const scaleDown = cc.scaleTo(1.0, 0.8);
          const scaleSequence = cc.sequence(scaleUp, scaleDown);
          const scaleRepeat = cc.repeatForever(scaleSequence);
          this.node.runAction(scaleRepeat);
        }
        /**
         * 更新傳送計時器
         */


        updateTeleportTimer(deltaTime) {
          this.teleportTimer += deltaTime;

          if (this.teleportTimer >= this.teleportDelay) {
            this.executeTeleport();
          }
        }
        /**
         * 執行傳送
         */


        executeTeleport() {
          if (this.teleportEffect) {
            this.playTeleportEffect();
          } // 載入目標場景


          cc.director.loadScene(this.targetScene, () => {
            console.log(`成功傳送到場景: ${this.targetScene}`);
            this.isTeleporting = false;
            this.teleportTimer = 0;
          });
        }
        /**
         * 播放傳送特效
         */


        playTeleportEffect() {
          // 建立傳送特效
          const effectNode = new cc.Node('TeleportEffect');
          effectNode.setPosition(this.node.position); // 添加粒子效果

          this.createParticleEffect(effectNode); // 添加閃光效果

          this.createFlashEffect(effectNode);
          this.node.parent.addChild(effectNode); // 3秒後移除特效

          setTimeout(() => {
            effectNode.destroy();
          }, 3000);
        }
        /**
         * 建立粒子特效
         */


        createParticleEffect(parent) {
          // 這裡可以添加粒子系統
          console.log('傳送粒子特效播放');
        }
        /**
         * 建立閃光特效
         */


        createFlashEffect(parent) {
          const flashNode = new cc.Node('Flash');
          flashNode.addComponent(cc.Sprite);
          flashNode.getComponent(cc.Sprite).spriteFrame = this.createFlashSpriteFrame();
          flashNode.setScale(2, 2);
          const fadeOut = cc.fadeOut(0.5);
          const remove = cc.removeSelf();
          const sequence = cc.sequence(fadeOut, remove);
          parent.addChild(flashNode);
          flashNode.runAction(sequence);
        }
        /**
         * 碰撞檢測
         */


        onTriggerEnter(other, self) {
          if (other.node.name === 'Player') {
            this.playerInRange = true;
            this.showTeleportPrompt();
          }
        }

        onTriggerExit(other, self) {
          if (other.node.name === 'Player') {
            this.playerInRange = false;
            this.hideTeleportPrompt();
          }
        }
        /**
         * 顯示傳送提示
         */


        showTeleportPrompt() {
          console.log(`按 E 鍵傳送到 ${this.portalName}`); // 這裡可以顯示UI提示
        }
        /**
         * 隱藏傳送提示
         */


        hideTeleportPrompt() {
          console.log('離開傳送門範圍'); // 隱藏UI提示
        }
        /**
         * 檢查傳送條件
         */


        checkTeleportConditions() {
          // 檢查等級要求
          if (this.requiredLevel > 1) {
            // 這裡可以檢查玩家等級
            console.log(`需要等級 ${this.requiredLevel}`);
          } // 檢查道具要求


          if (this.requiredItem) {
            // 這裡可以檢查玩家是否擁有特定道具
            console.log(`需要道具: ${this.requiredItem}`);
          }

          return true; // 暫時總是返回true
        }
        /**
         * 開始傳送
         */


        startTeleport() {
          if (this.isTeleporting || !this.playerInRange) {
            return;
          }

          if (!this.checkTeleportConditions()) {
            return;
          }

          this.isTeleporting = true;
          this.teleportTimer = 0;
          console.log(`開始傳送到 ${this.targetScene}`);
        }
        /**
         * 建立傳送門精靈框架
         */


        createPortalSpriteFrame() {
          const texture = new cc.Texture2D();
          const canvas = document.createElement('canvas');
          canvas.width = 100;
          canvas.height = 150;
          const ctx = canvas.getContext('2d'); // 繪製傳送門

          const gradient = ctx.createRadialGradient(50, 75, 0, 50, 75, 50);
          gradient.addColorStop(0, '#00FFFF');
          gradient.addColorStop(0.5, '#0080FF');
          gradient.addColorStop(1, '#0040FF');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(50, 75, 40, 0, Math.PI * 2);
          ctx.fill(); // 添加邊框

          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 3;
          ctx.stroke();
          texture.initWithElement(canvas);
          const spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(texture);
          return spriteFrame;
        }
        /**
         * 建立閃光精靈框架
         */


        createFlashSpriteFrame() {
          const texture = new cc.Texture2D();
          const canvas = document.createElement('canvas');
          canvas.width = 200;
          canvas.height = 200;
          const ctx = canvas.getContext('2d'); // 繪製閃光

          const gradient = ctx.createRadialGradient(100, 100, 0, 100, 100, 100);
          gradient.addColorStop(0, '#FFFFFF');
          gradient.addColorStop(0.3, '#FFFF00');
          gradient.addColorStop(1, '#FF8000');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(100, 100, 100, 0, Math.PI * 2);
          ctx.fill();
          texture.initWithElement(canvas);
          const spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(texture);
          return spriteFrame;
        }
        /**
         * 設定傳送目標
         */


        setTarget(sceneName, position) {
          this.targetScene = sceneName;
          this.targetPosition = position;
        }
        /**
         * 設定傳送門名稱
         */


        setPortalName(name) {
          this.portalName = name;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "targetScene", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "targetPosition", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return cc.v2(0, 0);
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "teleportDelay", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1.0;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "teleportEffect", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "portalName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return '傳送點';
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "requiredLevel", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "requiredItem", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return '';
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2d7ca34e6e3e3c79a65ca6740269e1f0d81df1b1.js.map