const { ccclass, property } = cc._decorator;

/**
 * 場景管理器
 * 處理楓之谷風格的地圖切換和傳送系統
 */
@ccclass('SceneManager')
export class SceneManager extends cc.Component {
    @property
    currentScene: string = 'GamePlay';

    @property
    playerData: any = null;

    @property
    teleportHistory: string[] = [];

    // 場景配置
    private sceneConfigs = {
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
    private teleportConfigs = {
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

    onLoad() {
        this.initializeSceneManager();
    }

    start() {
        this.setupCurrentScene();
    }

    /**
     * 初始化場景管理器
     */
    private initializeSceneManager(): void {
        console.log('場景管理器初始化完成');
        this.loadPlayerData();
    }

    /**
     * 設定當前場景
     */
    private setupCurrentScene(): void {
        const sceneConfig = this.sceneConfigs[this.currentScene];
        if (sceneConfig) {
            console.log(`當前場景: ${sceneConfig.name} - ${sceneConfig.description}`);
        }
    }

    /**
     * 載入玩家資料
     */
    private loadPlayerData(): void {
        // 從本地儲存載入玩家資料
        const savedData = cc.sys.localStorage.getItem('playerData');
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
    private savePlayerData(): void {
        cc.sys.localStorage.setItem('playerData', JSON.stringify(this.playerData));
    }

    /**
     * 傳送到指定場景
     */
    public teleportToScene(sceneName: string, position?: cc.Vec2): void {
        if (!this.sceneConfigs[sceneName]) {
            console.error(`場景 ${sceneName} 不存在`);
            return;
        }

        const sceneConfig = this.sceneConfigs[sceneName];
        const targetPosition = position || sceneConfig.spawnPoint;

        // 檢查傳送條件
        if (!this.checkTeleportRequirements(sceneName)) {
            return;
        }

        // 更新玩家位置
        this.playerData.position = targetPosition;
        this.savePlayerData();

        // 記錄傳送歷史
        this.teleportHistory.push(this.currentScene);
        if (this.teleportHistory.length > 10) {
            this.teleportHistory.shift();
        }

        console.log(`傳送到場景: ${sceneConfig.name}`);
        
        // 載入場景
        cc.director.loadScene(sceneName, () => {
            this.currentScene = sceneName;
            this.onSceneLoaded(sceneName, targetPosition);
        });
    }

    /**
     * 檢查傳送條件
     */
    private checkTeleportRequirements(sceneName: string): boolean {
        const sceneConfig = this.sceneConfigs[sceneName];
        
        // 檢查等級要求
        if (this.playerData.level < sceneConfig.level) {
            console.log(`需要等級 ${sceneConfig.level} 才能進入 ${sceneConfig.name}`);
            return false;
        }

        return true;
    }

    /**
     * 場景載入完成
     */
    private onSceneLoaded(sceneName: string, position: cc.Vec2): void {
        console.log(`場景 ${sceneName} 載入完成`);
        
        // 設定玩家位置
        this.setPlayerPosition(position);
        
        // 顯示場景資訊
        this.showSceneInfo(sceneName);
    }

    /**
     * 設定玩家位置
     */
    private setPlayerPosition(position: cc.Vec2): void {
        const player = cc.find('PlayerLayer/Player');
        if (player) {
            player.setPosition(position);
            console.log(`玩家位置設定為: ${position.x}, ${position.y}`);
        }
    }

    /**
     * 顯示場景資訊
     */
    private showSceneInfo(sceneName: string): void {
        const sceneConfig = this.sceneConfigs[sceneName];
        console.log(`=== ${sceneConfig.name} ===`);
        console.log(`描述: ${sceneConfig.description}`);
        console.log(`推薦等級: ${sceneConfig.level}`);
    }

    /**
     * 建立傳送點
     */
    public createTeleportPoint(sceneName: string, position: cc.Vec2, portalName: string): cc.Node {
        const teleportNode = new cc.Node(portalName);
        
        // 添加傳送門組件
        const teleportPortal = teleportNode.addComponent(cc.Component);
        // 這裡需要導入 TeleportPortal 類別
        
        // 設定傳送目標
        // teleportPortal.setTarget(sceneName, position);
        // teleportPortal.setPortalName(portalName);
        
        teleportNode.setPosition(position);
        
        return teleportNode;
    }

    /**
     * 獲取場景配置
     */
    public getSceneConfig(sceneName: string): any {
        return this.sceneConfigs[sceneName];
    }

    /**
     * 獲取所有可用場景
     */
    public getAvailableScenes(): string[] {
        return Object.keys(this.sceneConfigs);
    }

    /**
     * 檢查場景是否可用
     */
    public isSceneAvailable(sceneName: string): boolean {
        const sceneConfig = this.sceneConfigs[sceneName];
        if (!sceneConfig) return false;
        
        return this.playerData.level >= sceneConfig.level;
    }

    /**
     * 獲取傳送歷史
     */
    public getTeleportHistory(): string[] {
        return this.teleportHistory;
    }

    /**
     * 返回上一個場景
     */
    public goBackToPreviousScene(): void {
        if (this.teleportHistory.length > 0) {
            const previousScene = this.teleportHistory.pop();
            this.teleportToScene(previousScene);
        }
    }

    /**
     * 更新玩家資料
     */
    public updatePlayerData(data: any): void {
        this.playerData = { ...this.playerData, ...data };
        this.savePlayerData();
    }

    /**
     * 獲取玩家資料
     */
    public getPlayerData(): any {
        return this.playerData;
    }

    /**
     * 重置玩家資料
     */
    public resetPlayerData(): void {
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
    public getCurrentScene(): string {
        return this.currentScene;
    }

    /**
     * 獲取當前場景配置
     */
    public getCurrentSceneConfig(): any {
        return this.sceneConfigs[this.currentScene];
    }
}
