System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, SceneLoader, _crd;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  _export("SceneLoader", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "846307G9HdKe67CNHSk675s", "SceneLoader", undefined);

      /**
       * 場景載入器
       * 幫助快速載入和設定楓之谷風格的遊戲場景
       */
      _export("SceneLoader", SceneLoader = class SceneLoader {
        /**
         * 載入遊戲場景
         */
        static loadGameScene() {
          return _asyncToGenerator(function* () {
            try {
              // 載入場景
              yield cc.director.loadScene('GamePlay');
              console.log('遊戲場景載入成功');
            } catch (error) {
              console.error('載入場景失敗:', error);
            }
          })();
        }
        /**
         * 建立基本場景結構
         */


        static createBasicSceneStructure() {
          var scene = new cc.Node('GameScene'); // 建立背景層

          var backgroundLayer = new cc.Node('BackgroundLayer');
          scene.addChild(backgroundLayer); // 建立平台層

          var platformLayer = new cc.Node('PlatformLayer');
          scene.addChild(platformLayer); // 建立玩家層

          var playerLayer = new cc.Node('PlayerLayer');
          scene.addChild(playerLayer); // 建立UI層

          var uiLayer = new cc.Node('UILayer');
          scene.addChild(uiLayer);
          return scene;
        }
        /**
         * 建立楓之谷風格的背景
         */


        static createMapleStoryBackground(parent) {
          // 天空背景
          var sky = new cc.Node('Sky');
          sky.addComponent(cc.Sprite);
          sky.getComponent(cc.Sprite).spriteFrame = this.createSkySpriteFrame();
          sky.setScale(3, 2);
          sky.setPosition(0, 200);
          parent.addChild(sky); // 山脈背景

          var mountains = new cc.Node('Mountains');
          mountains.addComponent(cc.Sprite);
          mountains.getComponent(cc.Sprite).spriteFrame = this.createMountainSpriteFrame();
          mountains.setPosition(0, -100);
          mountains.setScale(2, 1);
          parent.addChild(mountains); // 樹木背景

          var trees = new cc.Node('Trees');
          parent.addChild(trees);

          for (var i = 0; i < 5; i++) {
            var tree = new cc.Node("Tree_" + i);
            tree.addComponent(cc.Sprite);
            tree.getComponent(cc.Sprite).spriteFrame = this.createTreeSpriteFrame();
            tree.setPosition(i * 300 - 600, -200);
            tree.setScale(0.8 + Math.random() * 0.4);
            trees.addChild(tree);
          }
        }
        /**
         * 建立基本平台
         */


        static createBasicPlatforms(parent) {
          // 地面
          var ground = new cc.Node('Ground');
          ground.addComponent(cc.Sprite);
          ground.getComponent(cc.Sprite).spriteFrame = this.createGroundSpriteFrame();
          ground.setPosition(0, -300);
          ground.setScale(20, 2); // 添加物理碰撞

          var groundCollider = ground.addComponent(cc.BoxCollider);
          groundCollider.size = cc.size(2000, 200);
          var groundRigidBody = ground.addComponent(cc.RigidBody2D);
          groundRigidBody.type = cc.RigidBody2D.Type.Static;
          parent.addChild(ground); // 浮空平台

          for (var i = 0; i < 5; i++) {
            var platform = new cc.Node("Platform_" + i);
            platform.addComponent(cc.Sprite);
            platform.getComponent(cc.Sprite).spriteFrame = this.createPlatformSpriteFrame();
            platform.setPosition(i * 200 - 400, -100 + i * 50);
            platform.setScale(1 + Math.random() * 0.5); // 添加物理碰撞

            var platformCollider = platform.addComponent(cc.BoxCollider);
            platformCollider.size = cc.size(150, 30);
            var platformRigidBody = platform.addComponent(cc.RigidBody2D);
            platformRigidBody.type = cc.RigidBody2D.Type.Static;
            parent.addChild(platform);
          }
        }
        /**
         * 建立玩家角色
         */


        static createPlayer(parent) {
          var player = new cc.Node('Player');
          player.addComponent(cc.Sprite);
          player.getComponent(cc.Sprite).spriteFrame = this.createPlayerSpriteFrame();
          player.setPosition(0, 0); // 添加物理組件

          var rigidBody = player.addComponent(cc.RigidBody2D);
          rigidBody.type = cc.RigidBody2D.Type.Dynamic;
          rigidBody.gravityScale = 1;
          var collider = player.addComponent(cc.BoxCollider);
          collider.size = cc.size(50, 80);
          parent.addChild(player);
          return player;
        }
        /**
         * 設定相機跟隨
         */


        static setupCameraFollow(target) {
          var camera = cc.Camera.main;

          if (camera && target) {
            // 設定相機為 2D 模式
            camera.projection = cc.Camera.ProjectionType.ORTHO;
            camera.orthoHeight = 600; // 添加相機跟隨腳本
            // 這裡需要添加 CameraFollow 組件

            console.log('相機跟隨設定完成');
          }
        } // 精靈框架建立方法


        static createSkySpriteFrame() {
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

        static createMountainSpriteFrame() {
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

        static createTreeSpriteFrame() {
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

        static createGroundSpriteFrame() {
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

        static createPlatformSpriteFrame() {
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

        static createPlayerSpriteFrame() {
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

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=574eb85ca0ddd30b5b5e79069765cb6c898c8376.js.map