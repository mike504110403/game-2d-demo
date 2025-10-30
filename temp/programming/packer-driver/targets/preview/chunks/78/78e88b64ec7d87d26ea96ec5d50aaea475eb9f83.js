System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _crd, ccclass, property, PlatformGenerator;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "74304S0jAlGhab1p4SM7jMR", "PlatformGenerator", undefined);

      ({
        ccclass,
        property
      } = cc._decorator);
      /**
       * 平台生成器
       * 動態生成楓之谷風格的平台和障礙物
       */

      _export("PlatformGenerator", PlatformGenerator = (_dec = ccclass('PlatformGenerator'), _dec2 = property(cc.Prefab), _dec3 = property(cc.Prefab), _dec(_class = (_class2 = class PlatformGenerator extends cc.Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "platformPrefab", _descriptor, this);

          _initializerDefineProperty(this, "obstaclePrefab", _descriptor2, this);

          _initializerDefineProperty(this, "platformWidth", _descriptor3, this);

          _initializerDefineProperty(this, "platformHeight", _descriptor4, this);

          _initializerDefineProperty(this, "minPlatformDistance", _descriptor5, this);

          _initializerDefineProperty(this, "maxPlatformDistance", _descriptor6, this);

          _initializerDefineProperty(this, "minPlatformHeight", _descriptor7, this);

          _initializerDefineProperty(this, "maxPlatformHeight", _descriptor8, this);

          _initializerDefineProperty(this, "obstacleChance", _descriptor9, this);

          this.platforms = [];
          this.obstacles = [];
          this.lastPlatformX = 0;
          this.lastPlatformY = 0;
        }

        onLoad() {
          this.initializeGenerator();
        }

        start() {
          this.generateInitialPlatforms();
        }

        update(deltaTime) {
          this.cleanupOffscreenPlatforms();
          this.generateNewPlatforms();
        }
        /**
         * 初始化生成器
         */


        initializeGenerator() {
          console.log('平台生成器初始化完成');
        }
        /**
         * 生成初始平台
         */


        generateInitialPlatforms() {
          // 生成起始平台
          this.createPlatform(0, -300, 300, 100); // 地面
          // 生成一些初始平台

          for (var i = 0; i < 5; i++) {
            this.generateRandomPlatform();
          }
        }
        /**
         * 生成隨機平台
         */


        generateRandomPlatform() {
          var distance = this.minPlatformDistance + Math.random() * (this.maxPlatformDistance - this.minPlatformDistance);
          var height = this.lastPlatformY + (Math.random() - 0.5) * 200;
          var clampedHeight = Math.max(this.minPlatformHeight, Math.min(this.maxPlatformHeight, height));
          var x = this.lastPlatformX + distance;
          var y = clampedHeight;
          this.createPlatform(x, y, this.platformWidth, this.platformHeight); // 隨機添加障礙物

          if (Math.random() < this.obstacleChance) {
            this.createObstacle(x, y + this.platformHeight / 2 + 50);
          }

          this.lastPlatformX = x;
          this.lastPlatformY = y;
        }
        /**
         * 建立平台
         */


        createPlatform(x, y, width, height) {
          var platform = new cc.Node('Platform'); // 添加精靈組件

          var sprite = platform.addComponent(cc.Sprite);
          sprite.spriteFrame = this.createPlatformSpriteFrame(width, height); // 設定位置和大小

          platform.setPosition(x, y);
          platform.setScale(1, 1); // 添加物理碰撞

          var collider = platform.addComponent(cc.BoxCollider);
          collider.size = cc.size(width, height);
          collider.offset = cc.v2(0, 0); // 添加剛體

          var rigidBody = platform.addComponent(cc.RigidBody2D);
          rigidBody.type = cc.RigidBody2D.Type.Static;
          this.node.addChild(platform);
          this.platforms.push(platform);
          return platform;
        }
        /**
         * 建立障礙物
         */


        createObstacle(x, y) {
          var obstacle = new cc.Node('Obstacle'); // 添加精靈組件

          var sprite = obstacle.addComponent(cc.Sprite);
          sprite.spriteFrame = this.createObstacleSpriteFrame(); // 設定位置

          obstacle.setPosition(x, y); // 添加物理碰撞

          var collider = obstacle.addComponent(cc.BoxCollider);
          collider.size = cc.size(30, 50); // 添加剛體

          var rigidBody = obstacle.addComponent(cc.RigidBody2D);
          rigidBody.type = cc.RigidBody2D.Type.Static;
          this.node.addChild(obstacle);
          this.obstacles.push(obstacle);
          return obstacle;
        }
        /**
         * 清理螢幕外的平台
         */


        cleanupOffscreenPlatforms() {
          var camera = cc.Camera.main;
          if (!camera) return;
          var cameraX = camera.node.position.x;
          var cleanupDistance = 1000; // 清理距離
          // 清理平台

          for (var i = this.platforms.length - 1; i >= 0; i--) {
            var platform = this.platforms[i];

            if (platform && platform.position.x < cameraX - cleanupDistance) {
              platform.destroy();
              this.platforms.splice(i, 1);
            }
          } // 清理障礙物


          for (var _i = this.obstacles.length - 1; _i >= 0; _i--) {
            var obstacle = this.obstacles[_i];

            if (obstacle && obstacle.position.x < cameraX - cleanupDistance) {
              obstacle.destroy();
              this.obstacles.splice(_i, 1);
            }
          }
        }
        /**
         * 生成新平台
         */


        generateNewPlatforms() {
          var camera = cc.Camera.main;
          if (!camera) return;
          var cameraX = camera.node.position.x;
          var generateDistance = 800; // 生成距離
          // 如果最後一個平台距離相機太遠，生成新平台

          if (this.lastPlatformX < cameraX + generateDistance) {
            this.generateRandomPlatform();
          }
        }
        /**
         * 建立平台精靈框架
         */


        createPlatformSpriteFrame(width, height) {
          var texture = new cc.Texture2D();
          var canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext('2d'); // 繪製木質平台

          ctx.fillStyle = '#8B4513';
          ctx.fillRect(0, 0, width, height); // 添加木紋

          ctx.strokeStyle = '#654321';
          ctx.lineWidth = 2;

          for (var i = 0; i < Math.floor(width / 30); i++) {
            ctx.beginPath();
            ctx.moveTo(i * 30, 0);
            ctx.lineTo(i * 30, height);
            ctx.stroke();
          } // 添加邊框


          ctx.strokeStyle = '#4A2C2A';
          ctx.lineWidth = 3;
          ctx.strokeRect(0, 0, width, height);
          texture.initWithElement(canvas);
          var spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(texture);
          return spriteFrame;
        }
        /**
         * 建立障礙物精靈框架
         */


        createObstacleSpriteFrame() {
          var texture = new cc.Texture2D();
          var canvas = document.createElement('canvas');
          canvas.width = 30;
          canvas.height = 50;
          var ctx = canvas.getContext('2d'); // 繪製尖刺障礙物

          ctx.fillStyle = '#8B0000';
          ctx.beginPath();
          ctx.moveTo(15, 0);
          ctx.lineTo(0, 50);
          ctx.lineTo(30, 50);
          ctx.closePath();
          ctx.fill(); // 添加高光

          ctx.fillStyle = '#FF0000';
          ctx.beginPath();
          ctx.moveTo(15, 0);
          ctx.lineTo(5, 40);
          ctx.lineTo(25, 40);
          ctx.closePath();
          ctx.fill();
          texture.initWithElement(canvas);
          var spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(texture);
          return spriteFrame;
        }
        /**
         * 重置生成器
         */


        reset() {
          // 清理所有平台和障礙物
          this.platforms.forEach(platform => platform.destroy());
          this.obstacles.forEach(obstacle => obstacle.destroy());
          this.platforms = [];
          this.obstacles = [];
          this.lastPlatformX = 0;
          this.lastPlatformY = 0;
          this.generateInitialPlatforms();
        }
        /**
         * 設定平台參數
         */


        setPlatformParameters(width, height, minDist, maxDist) {
          this.platformWidth = width;
          this.platformHeight = height;
          this.minPlatformDistance = minDist;
          this.maxPlatformDistance = maxDist;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "platformPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "obstaclePrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "platformWidth", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 150;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "platformHeight", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 30;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "minPlatformDistance", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 200;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "maxPlatformDistance", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 400;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "minPlatformHeight", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -200;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "maxPlatformHeight", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 200;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "obstacleChance", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.3;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=78e88b64ec7d87d26ea96ec5d50aaea475eb9f83.js.map