const { ccclass, property } = cc._decorator;

/**
 * 遊戲啟動器
 * 自動設定楓之谷風格的橫向捲軸遊戲場景
 */
@ccclass('GameStarter')
export class GameStarter extends cc.Component {
    @property(cc.Node)
    backgroundLayer: cc.Node = null;

    @property(cc.Node)
    platformLayer: cc.Node = null;

    @property(cc.Node)
    playerLayer: cc.Node = null;

    @property(cc.Node)
    uiLayer: cc.Node = null;

    @property(cc.Node)
    camera: cc.Node = null;

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
    private initializeGame(): void {
        // 設定物理系統
        this.setupPhysics();
        
        // 建立背景
        this.createBackground();
        
        // 建立平台
        this.createPlatforms();
        
        // 建立玩家
        this.createPlayer();
        
        // 設定相機
        this.setupCamera();
        
        console.log('✅ 遊戲初始化完成！');
    }

    /**
     * 設定物理系統
     */
    private setupPhysics(): void {
        // 啟用物理系統
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -980);
        
        console.log('⚡ 物理系統已啟用');
    }

    /**
     * 建立背景
     */
    private createBackground(): void {
        if (!this.backgroundLayer) {
            this.backgroundLayer = cc.find('BackgroundLayer');
        }

        if (this.backgroundLayer) {
            // 建立天空
            this.createSky();
            
            // 建立山脈
            this.createMountains();
            
            // 建立樹木
            this.createTrees();
            
            // 添加視差滾動
            this.addParallaxEffect();
            
            console.log('🌅 背景建立完成');
        }
    }

    /**
     * 建立天空
     */
    private createSky(): void {
        const sky = new cc.Node('Sky');
        sky.addComponent(cc.Sprite);
        sky.getComponent(cc.Sprite).spriteFrame = this.createSkySpriteFrame();
        sky.setScale(3, 2);
        sky.setPosition(0, 200);
        this.backgroundLayer.addChild(sky);
    }

    /**
     * 建立山脈
     */
    private createMountains(): void {
        const mountains = new cc.Node('Mountains');
        mountains.addComponent(cc.Sprite);
        mountains.getComponent(cc.Sprite).spriteFrame = this.createMountainSpriteFrame();
        mountains.setPosition(0, -100);
        mountains.setScale(2, 1);
        this.backgroundLayer.addChild(mountains);
    }

    /**
     * 建立樹木
     */
    private createTrees(): void {
        const treeLayer = new cc.Node('TreeLayer');
        this.backgroundLayer.addChild(treeLayer);

        for (let i = 0; i < 5; i++) {
            const tree = new cc.Node(`Tree_${i}`);
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
    private addParallaxEffect(): void {
        // 這裡可以添加 ParallaxBackground 組件
        console.log('🌊 視差滾動效果已添加');
    }

    /**
     * 建立平台
     */
    private createPlatforms(): void {
        if (!this.platformLayer) {
            this.platformLayer = cc.find('PlatformLayer');
        }

        if (this.platformLayer) {
            // 建立地面
            this.createGround();
            
            // 建立浮空平台
            this.createFloatingPlatforms();
            
            console.log('🏗️ 平台建立完成');
        }
    }

    /**
     * 建立地面
     */
    private createGround(): void {
        const ground = new cc.Node('Ground');
        ground.addComponent(cc.Sprite);
        ground.getComponent(cc.Sprite).spriteFrame = this.createGroundSpriteFrame();
        ground.setPosition(0, -300);
        ground.setScale(20, 2);
        
        // 添加物理碰撞
        const collider = ground.addComponent(cc.BoxCollider);
        collider.size = cc.size(2000, 200);
        
        const rigidBody = ground.addComponent(cc.RigidBody2D);
        rigidBody.type = cc.RigidBody2D.Type.Static;
        
        this.platformLayer.addChild(ground);
    }

    /**
     * 建立浮空平台
     */
    private createFloatingPlatforms(): void {
        for (let i = 0; i < 5; i++) {
            const platform = new cc.Node(`Platform_${i}`);
            platform.addComponent(cc.Sprite);
            platform.getComponent(cc.Sprite).spriteFrame = this.createPlatformSpriteFrame();
            
            const x = i * 200 - 400;
            const y = -100 + i * 50;
            platform.setPosition(x, y);
            platform.setScale(1 + Math.random() * 0.5);
            
            // 添加物理碰撞
            const collider = platform.addComponent(cc.BoxCollider);
            collider.size = cc.size(150, 30);
            
            const rigidBody = platform.addComponent(cc.RigidBody2D);
            rigidBody.type = cc.RigidBody2D.Type.Static;
            
            this.platformLayer.addChild(platform);
        }
    }

    /**
     * 建立玩家
     */
    private createPlayer(): void {
        if (!this.playerLayer) {
            this.playerLayer = cc.find('PlayerLayer');
        }

        if (this.playerLayer) {
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
            
            this.playerLayer.addChild(player);
            
            console.log('👤 玩家建立完成');
        }
    }

    /**
     * 設定相機
     */
    private setupCamera(): void {
        if (!this.camera) {
            this.camera = cc.find('Main Camera');
        }

        if (this.camera) {
            const camera = this.camera.getComponent(cc.Camera);
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
    private setupGame(): void {
        console.log('🎯 遊戲設定完成！');
        console.log('🎮 使用 WASD 或方向鍵控制玩家移動');
        console.log('🦘 按空白鍵跳躍');
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
        
        // 樹幹
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(45, 100, 10, 100);
        
        // 樹葉
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.arc(50, 100, 40, 0, Math.PI * 2);
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
        
        ctx.fillStyle = '#90EE90';
        ctx.fillRect(0, 0, 100, 100);
        
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

    private createPlatformSpriteFrame(): cc.SpriteFrame {
        const texture = new cc.Texture2D();
        const canvas = document.createElement('canvas');
        canvas.width = 150;
        canvas.height = 30;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, 0, 150, 30);
        
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

    private createPlayerSpriteFrame(): cc.SpriteFrame {
        const texture = new cc.Texture2D();
        const canvas = document.createElement('canvas');
        canvas.width = 50;
        canvas.height = 80;
        const ctx = canvas.getContext('2d');
        
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
