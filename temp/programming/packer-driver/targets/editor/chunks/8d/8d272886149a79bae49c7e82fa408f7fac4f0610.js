System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, GameScene;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "24b88rjb2JNGKNU8BfHJdNU", "GameScene", undefined);

      ({
        ccclass,
        property
      } = cc._decorator);
      /**
       * 遊戲場景管理器
       * 負責管理楓之谷風格的橫向捲軸場景
       */

      _export("GameScene", GameScene = (_dec = ccclass('GameScene'), _dec2 = property(cc.Node), _dec3 = property(cc.Node), _dec4 = property(cc.Node), _dec5 = property(cc.Node), _dec6 = property(cc.Prefab), _dec7 = property(cc.Prefab), _dec8 = property(cc.Prefab), _dec(_class = (_class2 = class GameScene extends cc.Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "backgroundLayer", _descriptor, this);

          _initializerDefineProperty(this, "platformLayer", _descriptor2, this);

          _initializerDefineProperty(this, "playerLayer", _descriptor3, this);

          _initializerDefineProperty(this, "uiLayer", _descriptor4, this);

          _initializerDefineProperty(this, "playerPrefab", _descriptor5, this);

          _initializerDefineProperty(this, "platformPrefab", _descriptor6, this);

          _initializerDefineProperty(this, "backgroundPrefab", _descriptor7, this);

          // 場景設定
          this.sceneWidth = 2000;
          this.sceneHeight = 600;
          this.platformCount = 10;
        }

        onLoad() {
          this.initializeScene();
        }

        start() {
          this.setupScene();
        }
        /**
         * 初始化場景
         */


        initializeScene() {
          console.log('遊戲場景初始化開始');
          this.createBackground();
          this.createPlatforms();
          this.createPlayer();
          this.setupCamera();
        }
        /**
         * 建立背景
         */


        createBackground() {
          if (!this.backgroundLayer) {
            this.backgroundLayer = new cc.Node('BackgroundLayer');
            this.node.addChild(this.backgroundLayer);
          } // 建立多層背景以實現視差滾動


          this.createParallaxBackground();
        }
        /**
         * 建立視差滾動背景
         */


        createParallaxBackground() {
          // 遠景層
          const farLayer = new cc.Node('FarLayer');
          farLayer.addComponent(cc.Sprite);
          farLayer.getComponent(cc.Sprite).spriteFrame = this.createGradientSpriteFrame('#87CEEB', '#E0F6FF');
          farLayer.setScale(2, 1);
          this.backgroundLayer.addChild(farLayer); // 中景層 (山脈)

          const mountainLayer = new cc.Node('MountainLayer');
          mountainLayer.addComponent(cc.Sprite);
          mountainLayer.getComponent(cc.Sprite).spriteFrame = this.createMountainSpriteFrame();
          mountainLayer.setPosition(0, -100);
          this.backgroundLayer.addChild(mountainLayer); // 近景層 (樹木)

          this.createTreeLayer();
        }
        /**
         * 建立樹木層
         */


        createTreeLayer() {
          const treeLayer = new cc.Node('TreeLayer');
          this.backgroundLayer.addChild(treeLayer); // 建立多棵樹木

          for (let i = 0; i < 5; i++) {
            const tree = new cc.Node(`Tree_${i}`);
            tree.addComponent(cc.Sprite);
            tree.getComponent(cc.Sprite).spriteFrame = this.createTreeSpriteFrame();
            tree.setPosition(i * 400 - 800, -200);
            tree.setScale(0.8 + Math.random() * 0.4);
            treeLayer.addChild(tree);
          }
        }
        /**
         * 建立平台
         */


        createPlatforms() {
          if (!this.platformLayer) {
            this.platformLayer = new cc.Node('PlatformLayer');
            this.node.addChild(this.platformLayer);
          } // 建立地面


          this.createGround(); // 建立浮空平台

          this.createFloatingPlatforms();
        }
        /**
         * 建立地面
         */


        createGround() {
          const ground = new cc.Node('Ground');
          ground.addComponent(cc.Sprite);
          ground.getComponent(cc.Sprite).spriteFrame = this.createGroundSpriteFrame();
          ground.setPosition(0, -300);
          ground.setScale(this.sceneWidth / 100, 1); // 添加物理碰撞

          const collider = ground.addComponent(cc.BoxCollider);
          collider.size = cc.size(this.sceneWidth, 100);
          collider.offset = cc.v2(0, 0);
          this.platformLayer.addChild(ground);
        }
        /**
         * 建立浮空平台
         */


        createFloatingPlatforms() {
          for (let i = 0; i < this.platformCount; i++) {
            const platform = new cc.Node(`Platform_${i}`);
            platform.addComponent(cc.Sprite);
            platform.getComponent(cc.Sprite).spriteFrame = this.createPlatformSpriteFrame();
            const x = (i - this.platformCount / 2) * 200;
            const y = -200 + Math.sin(i) * 100;
            platform.setPosition(x, y);
            platform.setScale(1 + Math.random() * 0.5); // 添加物理碰撞

            const collider = platform.addComponent(cc.BoxCollider);
            collider.size = cc.size(150, 30);
            this.platformLayer.addChild(platform);
          }
        }
        /**
         * 建立玩家
         */


        createPlayer() {
          if (!this.playerLayer) {
            this.playerLayer = new cc.Node('PlayerLayer');
            this.node.addChild(this.playerLayer);
          }

          const player = new cc.Node('Player');
          player.addComponent(cc.Sprite);
          player.getComponent(cc.Sprite).spriteFrame = this.createPlayerSpriteFrame();
          player.setPosition(0, 0); // 添加物理組件

          const rigidBody = player.addComponent(cc.RigidBody2D);
          rigidBody.type = cc.RigidBody2D.Type.Dynamic;
          rigidBody.gravityScale = 1;
          const collider = player.addComponent(cc.BoxCollider);
          collider.size = cc.size(50, 80); // 添加玩家控制器

          const playerController = player.addComponent(cc.Component); // 這裡需要導入 PlayerController 類別

          this.playerLayer.addChild(player);
        }
        /**
         * 設定相機
         */


        setupCamera() {
          const camera = cc.Camera.main;

          if (camera) {
            // 設定相機為 2D 模式
            camera.projection = cc.Camera.ProjectionType.ORTHO;
            camera.orthoHeight = 600; // 添加相機跟隨組件

            const cameraFollow = camera.node.addComponent(cc.Component); // 這裡需要導入 CameraFollow 類別
          }
        }
        /**
         * 設定場景
         */


        setupScene() {
          console.log('場景設定完成');
        }
        /**
         * 建立漸層精靈框架
         */


        createGradientSpriteFrame(color1, color2) {
          const texture = new cc.Texture2D();
          const canvas = document.createElement('canvas');
          canvas.width = 100;
          canvas.height = 100;
          const ctx = canvas.getContext('2d');
          const gradient = ctx.createLinearGradient(0, 0, 0, 100);
          gradient.addColorStop(0, color1);
          gradient.addColorStop(1, color2);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 100, 100);
          texture.initWithElement(canvas);
          const spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(texture);
          return spriteFrame;
        }
        /**
         * 建立山脈精靈框架
         */


        createMountainSpriteFrame() {
          const texture = new cc.Texture2D();
          const canvas = document.createElement('canvas');
          canvas.width = 400;
          canvas.height = 200;
          const ctx = canvas.getContext('2d'); // 繪製山脈

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
          const spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(texture);
          return spriteFrame;
        }
        /**
         * 建立樹木精靈框架
         */


        createTreeSpriteFrame() {
          const texture = new cc.Texture2D();
          const canvas = document.createElement('canvas');
          canvas.width = 100;
          canvas.height = 200;
          const ctx = canvas.getContext('2d'); // 繪製樹幹

          ctx.fillStyle = '#8B4513';
          ctx.fillRect(45, 100, 10, 100); // 繪製樹葉

          ctx.fillStyle = '#228B22';
          ctx.beginPath();
          ctx.arc(50, 100, 40, 0, Math.PI * 2);
          ctx.fill();
          texture.initWithElement(canvas);
          const spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(texture);
          return spriteFrame;
        }
        /**
         * 建立地面精靈框架
         */


        createGroundSpriteFrame() {
          const texture = new cc.Texture2D();
          const canvas = document.createElement('canvas');
          canvas.width = 100;
          canvas.height = 100;
          const ctx = canvas.getContext('2d'); // 繪製草地

          ctx.fillStyle = '#90EE90';
          ctx.fillRect(0, 0, 100, 100); // 添加草地紋理

          ctx.fillStyle = '#7CCD7C';

          for (let i = 0; i < 20; i++) {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            ctx.fillRect(x, y, 2, 2);
          }

          texture.initWithElement(canvas);
          const spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(texture);
          return spriteFrame;
        }
        /**
         * 建立平台精靈框架
         */


        createPlatformSpriteFrame() {
          const texture = new cc.Texture2D();
          const canvas = document.createElement('canvas');
          canvas.width = 150;
          canvas.height = 30;
          const ctx = canvas.getContext('2d'); // 繪製木質平台

          ctx.fillStyle = '#8B4513';
          ctx.fillRect(0, 0, 150, 30); // 添加木紋

          ctx.strokeStyle = '#654321';
          ctx.lineWidth = 2;

          for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(i * 30, 0);
            ctx.lineTo(i * 30, 30);
            ctx.stroke();
          }

          texture.initWithElement(canvas);
          const spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(texture);
          return spriteFrame;
        }
        /**
         * 建立玩家精靈框架
         */


        createPlayerSpriteFrame() {
          const texture = new cc.Texture2D();
          const canvas = document.createElement('canvas');
          canvas.width = 50;
          canvas.height = 80;
          const ctx = canvas.getContext('2d'); // 繪製簡單的玩家角色
          // 頭部

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
          const spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(texture);
          return spriteFrame;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backgroundLayer", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "platformLayer", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "playerLayer", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "uiLayer", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "playerPrefab", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "platformPrefab", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "backgroundPrefab", [_dec8], {
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
//# sourceMappingURL=8d272886149a79bae49c7e82fa408f7fac4f0610.js.map