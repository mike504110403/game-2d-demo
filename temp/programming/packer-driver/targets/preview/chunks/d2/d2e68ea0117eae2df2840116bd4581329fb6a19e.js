System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, SceneManager;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d98b6l5rdZHOI0K3PieSVCp", "SceneManager", undefined);

      ({
        ccclass,
        property
      } = cc._decorator);
      /**
       * 場景管理器
       * 處理楓之谷風格的地圖切換和傳送系統
       */

      _export("SceneManager", SceneManager = (_dec = ccclass('SceneManager'), _dec(_class = (_class2 = class SceneManager extends cc.Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "currentScene", _descriptor, this);

          _initializerDefineProperty(this, "playerData", _descriptor2, this);

          _initializerDefineProperty(this, "teleportHistory", _descriptor3, this);

          // 場景配置
          this.sceneConfigs = {
            'GamePlay': {
              name: '新手村',
              type: 'village',
              spawnPoint: cc.v2(0, 0),
              level: 1,
              description: '新手冒險者的起點'
            },
            'ForestMap': {
              name: '神秘森林',
              type: 'forest',
              spawnPoint: cc.v2(0, 0),
              level: 5,
              description: '充滿魔法的神秘森林'
            }
          };
          // 傳送點配置
          this.teleportConfigs = {
            'village_to_forest': {
              from: 'GamePlay',
              to: 'ForestMap',
              fromPos: cc.v2(800, -200),
              toPos: cc.v2(-800, -200),
              requirements: {
                level: 1,
                items: []
              }
            },
            'forest_to_village': {
              from: 'ForestMap',
              to: 'GamePlay',
              fromPos: cc.v2(-800, -200),
              toPos: cc.v2(800, -200),
              requirements: {
                level: 1,
                items: []
              }
            }
          };
        }

        onLoad() {
          this.initializeSceneManager();
        }

        start() {
          this.setupCurrentScene();
        }
        /**
         * 初始化場景管理器
         */


        initializeSceneManager() {
          console.log('場景管理器初始化完成');
          this.loadPlayerData();
        }
        /**
         * 設定當前場景
         */


        setupCurrentScene() {
          var sceneConfig = this.sceneConfigs[this.currentScene];

          if (sceneConfig) {
            console.log("\u7576\u524D\u5834\u666F: " + sceneConfig.name + " - " + sceneConfig.description);
          }
        }
        /**
         * 載入玩家資料
         */


        loadPlayerData() {
          // 從本地儲存載入玩家資料
          var savedData = cc.sys.localStorage.getItem('playerData');

          if (savedData) {
            this.playerData = JSON.parse(savedData);
          } else {
            // 建立預設玩家資料
            this.playerData = {
              level: 1,
              experience: 0,
              position: cc.v2(0, 0),
              inventory: [],
              stats: {
                health: 100,
                mana: 50,
                attack: 10,
                defense: 5
              }
            };
          }
        }
        /**
         * 儲存玩家資料
         */


        savePlayerData() {
          cc.sys.localStorage.setItem('playerData', JSON.stringify(this.playerData));
        }
        /**
         * 傳送到指定場景
         */


        teleportToScene(sceneName, position) {
          if (!this.sceneConfigs[sceneName]) {
            console.error("\u5834\u666F " + sceneName + " \u4E0D\u5B58\u5728");
            return;
          }

          var sceneConfig = this.sceneConfigs[sceneName];
          var targetPosition = position || sceneConfig.spawnPoint; // 檢查傳送條件

          if (!this.checkTeleportRequirements(sceneName)) {
            return;
          } // 更新玩家位置


          this.playerData.position = targetPosition;
          this.savePlayerData(); // 記錄傳送歷史

          this.teleportHistory.push(this.currentScene);

          if (this.teleportHistory.length > 10) {
            this.teleportHistory.shift();
          }

          console.log("\u50B3\u9001\u5230\u5834\u666F: " + sceneConfig.name); // 載入場景

          cc.director.loadScene(sceneName, () => {
            this.currentScene = sceneName;
            this.onSceneLoaded(sceneName, targetPosition);
          });
        }
        /**
         * 檢查傳送條件
         */


        checkTeleportRequirements(sceneName) {
          var sceneConfig = this.sceneConfigs[sceneName]; // 檢查等級要求

          if (this.playerData.level < sceneConfig.level) {
            console.log("\u9700\u8981\u7B49\u7D1A " + sceneConfig.level + " \u624D\u80FD\u9032\u5165 " + sceneConfig.name);
            return false;
          }

          return true;
        }
        /**
         * 場景載入完成
         */


        onSceneLoaded(sceneName, position) {
          console.log("\u5834\u666F " + sceneName + " \u8F09\u5165\u5B8C\u6210"); // 設定玩家位置

          this.setPlayerPosition(position); // 顯示場景資訊

          this.showSceneInfo(sceneName);
        }
        /**
         * 設定玩家位置
         */


        setPlayerPosition(position) {
          var player = cc.find('PlayerLayer/Player');

          if (player) {
            player.setPosition(position);
            console.log("\u73A9\u5BB6\u4F4D\u7F6E\u8A2D\u5B9A\u70BA: " + position.x + ", " + position.y);
          }
        }
        /**
         * 顯示場景資訊
         */


        showSceneInfo(sceneName) {
          var sceneConfig = this.sceneConfigs[sceneName];
          console.log("=== " + sceneConfig.name + " ===");
          console.log("\u63CF\u8FF0: " + sceneConfig.description);
          console.log("\u63A8\u85A6\u7B49\u7D1A: " + sceneConfig.level);
        }
        /**
         * 建立傳送點
         */


        createTeleportPoint(sceneName, position, portalName) {
          var teleportNode = new cc.Node(portalName); // 添加傳送門組件

          var teleportPortal = teleportNode.addComponent(cc.Component); // 這裡需要導入 TeleportPortal 類別
          // 設定傳送目標
          // teleportPortal.setTarget(sceneName, position);
          // teleportPortal.setPortalName(portalName);

          teleportNode.setPosition(position);
          return teleportNode;
        }
        /**
         * 獲取場景配置
         */


        getSceneConfig(sceneName) {
          return this.sceneConfigs[sceneName];
        }
        /**
         * 獲取所有可用場景
         */


        getAvailableScenes() {
          return Object.keys(this.sceneConfigs);
        }
        /**
         * 檢查場景是否可用
         */


        isSceneAvailable(sceneName) {
          var sceneConfig = this.sceneConfigs[sceneName];
          if (!sceneConfig) return false;
          return this.playerData.level >= sceneConfig.level;
        }
        /**
         * 獲取傳送歷史
         */


        getTeleportHistory() {
          return this.teleportHistory;
        }
        /**
         * 返回上一個場景
         */


        goBackToPreviousScene() {
          if (this.teleportHistory.length > 0) {
            var previousScene = this.teleportHistory.pop();
            this.teleportToScene(previousScene);
          }
        }
        /**
         * 更新玩家資料
         */


        updatePlayerData(data) {
          this.playerData = _extends({}, this.playerData, data);
          this.savePlayerData();
        }
        /**
         * 獲取玩家資料
         */


        getPlayerData() {
          return this.playerData;
        }
        /**
         * 重置玩家資料
         */


        resetPlayerData() {
          this.playerData = {
            level: 1,
            experience: 0,
            position: cc.v2(0, 0),
            inventory: [],
            stats: {
              health: 100,
              mana: 50,
              attack: 10,
              defense: 5
            }
          };
          this.savePlayerData();
        }
        /**
         * 獲取當前場景
         */


        getCurrentScene() {
          return this.currentScene;
        }
        /**
         * 獲取當前場景配置
         */


        getCurrentSceneConfig() {
          return this.sceneConfigs[this.currentScene];
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "currentScene", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'GamePlay';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "playerData", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "teleportHistory", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d2e68ea0117eae2df2840116bd4581329fb6a19e.js.map