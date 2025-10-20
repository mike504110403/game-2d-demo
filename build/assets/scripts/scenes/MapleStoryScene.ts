const { ccclass, property } = cc._decorator;

/**
 * 楓之谷風格場景設定
 * 完整的橫向捲軸遊戲場景管理
 */
@ccclass('MapleStoryScene')
export class MapleStoryScene extends cc.Component {
    @property(cc.Node)
    backgroundContainer: cc.Node = null;

    @property(cc.Node)
    platformContainer: cc.Node = null;

    @property(cc.Node)
    playerContainer: cc.Node = null;

    @property(cc.Node)
    uiContainer: cc.Node = null;

    @property(cc.Prefab)
    playerPrefab: cc.Prefab = null;

    // 場景設定
    private sceneWidth: number = 3000;
    private sceneHeight: number = 800;
    private isInitialized: boolean = false;

    onLoad() {
        this.initializeScene();
    }

    start() {
        this.setupScene();
    }

    /**
     * 初始化場景
     */
    private initializeScene(): void {
        if (this.isInitialized) return;
        
        console.log('楓之谷場景初始化開始');
        
        // 建立容器節點
        this.createContainers();
        
        // 建立背景系統
        this.createBackgroundSystem();
        
        // 建立平台系統
        this.createPlatformSystem();
        
        // 建立玩家
        this.createPlayer();
        
        // 設定相機
        this.setupCamera();
        
        this.isInitialized = true;
        console.log('楓之谷場景初始化完成');
    }

    /**
     * 建立容器節點
     */
    private createContainers(): void {
        // 背景容器
        if (!this.backgroundContainer) {
            this.backgroundContainer = new cc.Node('BackgroundContainer');
            this.node.addChild(this.backgroundContainer);
        }

        // 平台容器
        if (!this.platformContainer) {
            this.platformContainer = new cc.Node('PlatformContainer');
            this.node.addChild(this.platformContainer);
        }

        // 玩家容器
        if (!this.playerContainer) {
            this.playerContainer = new cc.Node('PlayerContainer');
            this.node.addChild(this.playerContainer);
        }

        // UI容器
        if (!this.uiContainer) {
            this.uiContainer = new cc.Node('UIContainer');
            this.node.addChild(this.uiContainer);
        }
    }

    /**
     * 建立背景系統
     */
    private createBackgroundSystem(): void {
        // 建立多層背景
        this.createSkyLayer();
        this.createMountainLayer();
        this.createTreeLayer();
        this.createCloudLayer();
        
        // 添加視差滾動組件
        const parallaxComponent = this.backgroundContainer.addComponent(cc.Component);
        // 這裡需要導入 ParallaxBackground 類別
    }

    /**
     * 建立天空層
     */
    private createSkyLayer(): void {
        const skyLayer = new cc.Node('SkyLayer');
        skyLayer.addComponent(cc.Sprite);
        skyLayer.getComponent(cc.Sprite).spriteFrame = this.createSkySpriteFrame();
        skyLayer.setScale(3, 2);
        skyLayer.setPosition(0, 200);
        this.backgroundContainer.addChild(skyLayer);
    }

    /**
     * 建立山脈層
     */
    private createMountainLayer(): void {
        const mountainLayer = new cc.Node('MountainLayer');
        mountainLayer.addComponent(cc.Sprite);
        mountainLayer.getComponent(cc.Sprite).spriteFrame = this.createMountainSpriteFrame();
        mountainLayer.setPosition(0, -100);
        mountainLayer.setScale(2, 1);
        this.backgroundContainer.addChild(mountainLayer);
    }

    /**
     * 建立樹木層
     */
    private createTreeLayer(): void {
        const treeLayer = new cc.Node('TreeLayer');
        this.backgroundContainer.addChild(treeLayer);

        // 建立多棵樹木
        for (let i = 0; i < 8; i++) {
            const tree = new cc.Node(`Tree_${i}`);
            tree.addComponent(cc.Sprite);
            tree.getComponent(cc.Sprite).spriteFrame = this.createTreeSpriteFrame();
            
            const x = (i - 4) * 300;
            const y = -200 + Math.sin(i) * 50;
            tree.setPosition(x, y);
            tree.setScale(0.8 + Math.random() * 0.4);
            
            treeLayer.addChild(tree);
        }
    }

    /**
     * 建立雲層
     */
    private createCloudLayer(): void {
        const cloudLayer = new cc.Node('CloudLayer');
        this.backgroundContainer.addChild(cloudLayer);

        // 建立多朵雲
        for (let i = 0; i < 6; i++) {
            const cloud = new cc.Node(`Cloud_${i}`);
            cloud.addComponent(cc.Sprite);
            cloud.getComponent(cc.Sprite).spriteFrame = this.createCloudSpriteFrame();
            
            const x = (i - 3) * 400;
            const y = 100 + Math.random() * 100;
            cloud.setPosition(x, y);
            cloud.setScale(0.5 + Math.random() * 0.5);
            
            cloudLayer.addChild(cloud);
        }
    }

    /**
     * 建立平台系統
     */
    private createPlatformSystem(): void {
        // 添加平台生成器組件
        const platformGenerator = this.platformContainer.addComponent(cc.Component);
        // 這裡需要導入 PlatformGenerator 類別
        
        // 建立初始地面
        this.createInitialGround();
    }

    /**
     * 建立初始地面
     */
    private createInitialGround(): void {
        const ground = new cc.Node('Ground');
        ground.addComponent(cc.Sprite);
        ground.getComponent(cc.Sprite).spriteFrame = this.createGroundSpriteFrame();
        ground.setPosition(0, -350);
        ground.setScale(this.sceneWidth / 100, 2);
        
        // 添加物理碰撞
        const collider = ground.addComponent(cc.BoxCollider);
        collider.size = cc.size(this.sceneWidth, 200);
        
        const rigidBody = ground.addComponent(cc.RigidBody2D);
        rigidBody.type = cc.RigidBody2D.Type.Static;
        
        this.platformContainer.addChild(ground);
    }

    /**
     * 建立玩家
     */
    private createPlayer(): void {
        const player = new cc.Node('Player');
        player.addComponent(cc.Sprite);
        player.getComponent(cc.Sprite).spriteFrame = this.createPlayerSpriteFrame();
        player.setPosition(0, 0);
        
        // 添加物理組件
        const rigidBody = player.addComponent(cc.RigidBody2D);
        rigidBody.type = cc.RigidBody2D.Type.Dynamic;
        rigidBody.gravityScale = 1;
        
        const collider = player.addComponent(cc.BoxCollider);
        collider.size = cc.size(50, 80);
        
        // 添加玩家控制器
        const playerController = player.addComponent(cc.Component);
        // 這裡需要導入 PlayerController 類別
        
        this.playerContainer.addChild(player);
    }

    /**
     * 設定相機
     */
    private setupCamera(): void {
        const camera = cc.Camera.main;
        if (camera) {
            // 設定相機為 2D 模式
            camera.projection = cc.Camera.ProjectionType.ORTHO;
            camera.orthoHeight = 600;
            
            // 添加相機跟隨組件
            const cameraFollow = camera.node.addComponent(cc.Component);
            // 這裡需要導入 CameraFollow 類別
        }
    }

    /**
     * 設定場景
     */
    private setupScene(): void {
        console.log('楓之谷場景設定完成');
    }

    // 精靈框架建立方法
    private createSkySpriteFrame(): cc.SpriteFrame {
        const texture = new cc.Texture2D();
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.7, '#E0F6FF');
        gradient.addColorStop(1, '#F0F8FF');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 200, 200);
        
        texture.initWithElement(canvas);
        const spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        return spriteFrame;
    }

    private createMountainSpriteFrame(): cc.SpriteFrame {
        const texture = new cc.Texture2D();
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        
        // 繪製山脈
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

    private createTreeSpriteFrame(): cc.SpriteFrame {
        const texture = new cc.Texture2D();
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        
        // 繪製樹幹
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(45, 100, 10, 100);
        
        // 繪製樹葉
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.arc(50, 100, 40, 0, Math.PI * 2);
        ctx.fill();
        
        texture.initWithElement(canvas);
        const spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        return spriteFrame;
    }

    private createCloudSpriteFrame(): cc.SpriteFrame {
        const texture = new cc.Texture2D();
        const canvas = document.createElement('canvas');
        canvas.width = 120;
        canvas.height = 60;
        const ctx = canvas.getContext('2d');
        
        // 繪製雲朵
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(30, 30, 20, 0, Math.PI * 2);
        ctx.arc(50, 30, 25, 0, Math.PI * 2);
        ctx.arc(70, 30, 20, 0, Math.PI * 2);
        ctx.arc(50, 20, 15, 0, Math.PI * 2);
        ctx.fill();
        
        texture.initWithElement(canvas);
        const spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        return spriteFrame;
    }

    private createGroundSpriteFrame(): cc.SpriteFrame {
        const texture = new cc.Texture2D();
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        
        // 繪製草地
        ctx.fillStyle = '#90EE90';
        ctx.fillRect(0, 0, 100, 100);
        
        // 添加草地紋理
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

    private createPlayerSpriteFrame(): cc.SpriteFrame {
        const texture = new cc.Texture2D();
        const canvas = document.createElement('canvas');
        canvas.width = 50;
        canvas.height = 80;
        const ctx = canvas.getContext('2d');
        
        // 繪製簡單的玩家角色
        // 頭部
        ctx.fillStyle = '#FFDBAC';
        ctx.beginPath();
        ctx.arc(25, 60, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // 身體
        ctx.fillStyle = '#FF6B6B';
        ctx.fillRect(20, 30, 10, 30);
        
        // 腿部
        ctx.fillStyle = '#4ECDC4';
        ctx.fillRect(18, 10, 6, 20);
        ctx.fillRect(26, 10, 6, 20);
        
        // 手臂
        ctx.fillStyle = '#FFDBAC';
        ctx.fillRect(15, 35, 5, 15);
        ctx.fillRect(30, 35, 5, 15);
        
        texture.initWithElement(canvas);
        const spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        return spriteFrame;
    }
}
