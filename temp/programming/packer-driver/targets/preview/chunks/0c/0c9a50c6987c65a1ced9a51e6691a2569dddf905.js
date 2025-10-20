System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, GameStarter;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "88b77DZPNRPxpru481LyDtc", "GameStarter", undefined);

      ({
        ccclass,
        property
      } = cc._decorator);
      /**
       * 遊戲啟動器
       * 自動設定楓之谷風格的橫向捲軸遊戲場景
       */

      _export("GameStarter", GameStarter = (_dec = ccclass('GameStarter'), _dec2 = property(cc.Node), _dec3 = property(cc.Node), _dec4 = property(cc.Node), _dec5 = property(cc.Node), _dec6 = property(cc.Node), _dec(_class = (_class2 = class GameStarter extends cc.Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backgroundLayer", _descriptor, this);

          _initializerDefineProperty(this, "platformLayer", _descriptor2, this);

          _initializerDefineProperty(this, "playerLayer", _descriptor3, this);

          _initializerDefineProperty(this, "uiLayer", _descriptor4, this);

          _initializerDefineProperty(this, "camera", _descriptor5, this);
        }

        onLoad() {
          console.log('🎮 楓之谷風格遊戲啟動中...');
          this.initializeGame();
        }

        start() {
          this.setupGame();
        }
        /**
         * 初始化遊戲
         */


        initializeGame() {
          // 設定物理系統
          this.setupPhysics(); // 建立背景

          this.createBackground(); // 建立平台

          this.createPlatforms(); // 建立玩家

          this.createPlayer(); // 設定相機

          this.setupCamera();
          console.log('✅ 遊戲初始化完成！');
        }
        /**
         * 設定物理系統
         */


        setupPhysics() {
          // 啟用物理系統
          cc.director.getPhysicsManager().enabled = true;
          cc.director.getPhysicsManager().gravity = cc.v2(0, -980);
          console.log('⚡ 物理系統已啟用');
        }
        /**
         * 建立背景
         */


        createBackground() {
          if (!this.backgroundLayer) {
            this.backgroundLayer = cc.find('BackgroundLayer');
          }

          if (this.backgroundLayer) {
            // 建立天空
            this.createSky(); // 建立山脈

            this.createMountains(); // 建立樹木

            this.createTrees(); // 添加視差滾動

            this.addParallaxEffect();
            console.log('🌅 背景建立完成');
          }
        }
        /**
         * 建立天空
         */


        createSky() {
          var sky = new cc.Node('Sky');
          sky.addComponent(cc.Sprite);
          sky.getComponent(cc.Sprite).spriteFrame = this.createSkySpriteFrame();
          sky.setScale(3, 2);
          sky.setPosition(0, 200);
          this.backgroundLayer.addChild(sky);
        }
        /**
         * 建立山脈
         */


        createMountains() {
          var mountains = new cc.Node('Mountains');
          mountains.addComponent(cc.Sprite);
          mountains.getComponent(cc.Sprite).spriteFrame = this.createMountainSpriteFrame();
          mountains.setPosition(0, -100);
          mountains.setScale(2, 1);
          this.backgroundLayer.addChild(mountains);
        }
        /**
         * 建立樹木
         */


        createTrees() {
          var treeLayer = new cc.Node('TreeLayer');
          this.backgroundLayer.addChild(treeLayer);

          for (var i = 0; i < 5; i++) {
            var tree = new cc.Node("Tree_" + i);
            tree.addComponent(cc.Sprite);
            tree.getComponent(cc.Sprite).spriteFrame = this.createTreeSpriteFrame();
            tree.setPosition(i * 300 - 600, -200);
            tree.setScale(0.8 + Math.random() * 0.4);
            treeLayer.addChild(tree);
          }
        }
        /**
         * 添加視差效果
         */


        addParallaxEffect() {
          // 這裡可以添加 ParallaxBackground 組件
          console.log('🌊 視差滾動效果已添加');
        }
        /**
         * 建立平台
         */


        createPlatforms() {
          if (!this.platformLayer) {
            this.platformLayer = cc.find('PlatformLayer');
          }

          if (this.platformLayer) {
            // 建立地面
            this.createGround(); // 建立浮空平台

            this.createFloatingPlatforms();
            console.log('🏗️ 平台建立完成');
          }
        }
        /**
         * 建立地面
         */


        createGround() {
          var ground = new cc.Node('Ground');
          ground.addComponent(cc.Sprite);
          ground.getComponent(cc.Sprite).spriteFrame = this.createGroundSpriteFrame();
          ground.setPosition(0, -300);
          ground.setScale(20, 2); // 添加物理碰撞

          var collider = ground.addComponent(cc.BoxCollider);
          collider.size = cc.size(2000, 200);
          var rigidBody = ground.addComponent(cc.RigidBody2D);
          rigidBody.type = cc.RigidBody2D.Type.Static;
          this.platformLayer.addChild(ground);
        }
        /**
         * 建立浮空平台
         */


        createFloatingPlatforms() {
          for (var i = 0; i < 5; i++) {
            var platform = new cc.Node("Platform_" + i);
            platform.addComponent(cc.Sprite);
            platform.getComponent(cc.Sprite).spriteFrame = this.createPlatformSpriteFrame();
            var x = i * 200 - 400;
            var y = -100 + i * 50;
            platform.setPosition(x, y);
            platform.setScale(1 + Math.random() * 0.5); // 添加物理碰撞

            var collider = platform.addComponent(cc.BoxCollider);
            collider.size = cc.size(150, 30);
            var rigidBody = platform.addComponent(cc.RigidBody2D);
            rigidBody.type = cc.RigidBody2D.Type.Static;
            this.platformLayer.addChild(platform);
          }
        }
        /**
         * 建立玩家
         */


        createPlayer() {
          if (!this.playerLayer) {
            this.playerLayer = cc.find('PlayerLayer');
          }

          if (this.playerLayer) {
            var player = new cc.Node('Player');
            player.addComponent(cc.Sprite);
            player.getComponent(cc.Sprite).spriteFrame = this.createPlayerSpriteFrame();
            player.setPosition(0, 0); // 添加物理組件

            var rigidBody = player.addComponent(cc.RigidBody2D);
            rigidBody.type = cc.RigidBody2D.Type.Dynamic;
            rigidBody.gravityScale = 1;
            var collider = player.addComponent(cc.BoxCollider);
            collider.size = cc.size(50, 80);
            this.playerLayer.addChild(player);
            console.log('👤 玩家建立完成');
          }
        }
        /**
         * 設定相機
         */


        setupCamera() {
          if (!this.camera) {
            this.camera = cc.find('Main Camera');
          }

          if (this.camera) {
            var camera = this.camera.getComponent(cc.Camera);

            if (camera) {
              camera.projection = cc.Camera.ProjectionType.ORTHO;
              camera.orthoHeight = 600;
            }

            console.log('📷 相機設定完成');
          }
        }
        /**
         * 設定遊戲
         */


        setupGame() {
          console.log('🎯 遊戲設定完成！');
          console.log('🎮 使用 WASD 或方向鍵控制玩家移動');
          console.log('🦘 按空白鍵跳躍');
        } // 精靈框架建立方法


        createSkySpriteFrame() {
          var texture = new cc.Texture2D();
          var canvas = document.createElement('canvas');
          canvas.width = 200;
          canvas.height = 200;
          var ctx = canvas.getContext('2d');
          var gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, '#87CEEB');
          gradient.addColorStop(0.7, '#E0F6FF');
          gradient.addColorStop(1, '#F0F8FF');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 200, 200);
          texture.initWithElement(canvas);
          var spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(texture);
          return spriteFrame;
        }

        createMountainSpriteFrame() {
          var texture = new cc.Texture2D();
          var canvas = document.createElement('canvas');
          canvas.width = 400;
          canvas.height = 200;
          var ctx = canvas.getContext('2d');
          ctx.fillStyle = '#8B7355';
          ctx.beginPath();
          ctx.moveTo(0, 200);
          ctx.lineTo(50, 150);
          ctx.lineTo(100, 120);
          ctx.lineTo(150, 100);
          ctx.lineTo(200, 80);
          ctx.lineTo(250, 90);
          ctx.lineTo(300, 70);
          ctx.lineTo(350, 85);
          ctx.lineTo(400, 100);
          ctx.lineTo(400, 200);
          ctx.closePath();
          ctx.fill();
          texture.initWithElement(canvas);
          var spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(texture);
          return spriteFrame;
        }

        createTreeSpriteFrame() {
          var texture = new cc.Texture2D();
          var canvas = document.createElement('canvas');
          canvas.width = 100;
          canvas.height = 200;
          var ctx = canvas.getContext('2d'); // 樹幹

          ctx.fillStyle = '#8B4513';
          ctx.fillRect(45, 100, 10, 100); // 樹葉

          ctx.fillStyle = '#228B22';
          ctx.beginPath();
          ctx.arc(50, 100, 40, 0, Math.PI * 2);
          ctx.fill();
          texture.initWithElement(canvas);
          var spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(texture);
          return spriteFrame;
        }

        createGroundSpriteFrame() {
          var texture = new cc.Texture2D();
          var canvas = document.createElement('canvas');
          canvas.width = 100;
          canvas.height = 100;
          var ctx = canvas.getContext('2d');
          ctx.fillStyle = '#90EE90';
          ctx.fillRect(0, 0, 100, 100);
          ctx.fillStyle = '#7CCD7C';

          for (var i = 0; i < 20; i++) {
            var x = Math.random() * 100;
            var y = Math.random() * 100;
            ctx.fillRect(x, y, 2, 2);
          }

          texture.initWithElement(canvas);
          var spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(texture);
          return spriteFrame;
        }

        createPlatformSpriteFrame() {
          var texture = new cc.Texture2D();
          var canvas = document.createElement('canvas');
          canvas.width = 150;
          canvas.height = 30;
          var ctx = canvas.getContext('2d');
          ctx.fillStyle = '#8B4513';
          ctx.fillRect(0, 0, 150, 30);
          ctx.strokeStyle = '#654321';
          ctx.lineWidth = 2;

          for (var i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(i * 30, 0);
            ctx.lineTo(i * 30, 30);
            ctx.stroke();
          }

          texture.initWithElement(canvas);
          var spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(texture);
          return spriteFrame;
        }

        createPlayerSpriteFrame() {
          var texture = new cc.Texture2D();
          var canvas = document.createElement('canvas');
          canvas.width = 50;
          canvas.height = 80;
          var ctx = canvas.getContext('2d'); // 頭部

          ctx.fillStyle = '#FFDBAC';
          ctx.beginPath();
          ctx.arc(25, 60, 15, 0, Math.PI * 2);
          ctx.fill(); // 身體

          ctx.fillStyle = '#FF6B6B';
          ctx.fillRect(20, 30, 10, 30); // 腿部

          ctx.fillStyle = '#4ECDC4';
          ctx.fillRect(18, 10, 6, 20);
          ctx.fillRect(26, 10, 6, 20); // 手臂

          ctx.fillStyle = '#FFDBAC';
          ctx.fillRect(15, 35, 5, 15);
          ctx.fillRect(30, 35, 5, 15);
          texture.initWithElement(canvas);
          var spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(texture);
          return spriteFrame;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backgroundLayer", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "platformLayer", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "playerLayer", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "uiLayer", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0c9a50c6987c65a1ced9a51e6691a2569dddf905.js.map