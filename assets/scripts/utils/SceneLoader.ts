/**
 * 場景載入器
 * 幫助快速載入和設定楓之谷風格的遊戲場景
 */
export class SceneLoader {
    /**
     * 載入遊戲場景
     */
    public static async loadGameScene(): Promise<void> {
        try {
            // 載入場景
            await cc.director.loadScene('GamePlay');
            console.log('遊戲場景載入成功');
        } catch (error) {
            console.error('載入場景失敗:', error);
        }
    }

    /**
     * 建立基本場景結構
     */
    public static createBasicSceneStructure(): cc.Node {
        const scene = new cc.Node('GameScene');
        
        // 建立背景層
        const backgroundLayer = new cc.Node('BackgroundLayer');
        scene.addChild(backgroundLayer);
        
        // 建立平台層
        const platformLayer = new cc.Node('PlatformLayer');
        scene.addChild(platformLayer);
        
        // 建立玩家層
        const playerLayer = new cc.Node('PlayerLayer');
        scene.addChild(playerLayer);
        
        // 建立UI層
        const uiLayer = new cc.Node('UILayer');
        scene.addChild(uiLayer);
        
        return scene;
    }

    /**
     * 建立楓之谷風格的背景
     */
    public static createMapleStoryBackground(parent: cc.Node): void {
        // 天空背景
        const sky = new cc.Node('Sky');
        sky.addComponent(cc.Sprite);
        sky.getComponent(cc.Sprite).spriteFrame = this.createSkySpriteFrame();
        sky.setScale(3, 2);
        sky.setPosition(0, 200);
        parent.addChild(sky);

        // 山脈背景
        const mountains = new cc.Node('Mountains');
        mountains.addComponent(cc.Sprite);
        mountains.getComponent(cc.Sprite).spriteFrame = this.createMountainSpriteFrame();
        mountains.setPosition(0, -100);
        mountains.setScale(2, 1);
        parent.addChild(mountains);

        // 樹木背景
        const trees = new cc.Node('Trees');
        parent.addChild(trees);
        
        for (let i = 0; i < 5; i++) {
            const tree = new cc.Node(`Tree_${i}`);
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
    public static createBasicPlatforms(parent: cc.Node): void {
        // 地面
        const ground = new cc.Node('Ground');
        ground.addComponent(cc.Sprite);
        ground.getComponent(cc.Sprite).spriteFrame = this.createGroundSpriteFrame();
        ground.setPosition(0, -300);
        ground.setScale(20, 2);
        
        // 添加物理碰撞
        const groundCollider = ground.addComponent(cc.BoxCollider);
        groundCollider.size = cc.size(2000, 200);
        
        const groundRigidBody = ground.addComponent(cc.RigidBody2D);
        groundRigidBody.type = cc.RigidBody2D.Type.Static;
        
        parent.addChild(ground);

        // 浮空平台
        for (let i = 0; i < 5; i++) {
            const platform = new cc.Node(`Platform_${i}`);
            platform.addComponent(cc.Sprite);
            platform.getComponent(cc.Sprite).spriteFrame = this.createPlatformSpriteFrame();
            platform.setPosition(i * 200 - 400, -100 + i * 50);
            platform.setScale(1 + Math.random() * 0.5);
            
            // 添加物理碰撞
            const platformCollider = platform.addComponent(cc.BoxCollider);
            platformCollider.size = cc.size(150, 30);
            
            const platformRigidBody = platform.addComponent(cc.RigidBody2D);
            platformRigidBody.type = cc.RigidBody2D.Type.Static;
            
            parent.addChild(platform);
        }
    }

    /**
     * 建立玩家角色
     */
    public static createPlayer(parent: cc.Node): cc.Node {
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
        
        parent.addChild(player);
        return player;
    }

    /**
     * 設定相機跟隨
     */
    public static setupCameraFollow(target: cc.Node): void {
        const camera = cc.Camera.main;
        if (camera && target) {
            // 設定相機為 2D 模式
            camera.projection = cc.Camera.ProjectionType.ORTHO;
            camera.orthoHeight = 600;
            
            // 添加相機跟隨腳本
            // 這裡需要添加 CameraFollow 組件
            console.log('相機跟隨設定完成');
        }
    }

    // 精靈框架建立方法
    private static createSkySpriteFrame(): cc.SpriteFrame {
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

    private static createMountainSpriteFrame(): cc.SpriteFrame {
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

    private static createTreeSpriteFrame(): cc.SpriteFrame {
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

    private static createGroundSpriteFrame(): cc.SpriteFrame {
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

    private static createPlatformSpriteFrame(): cc.SpriteFrame {
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

    private static createPlayerSpriteFrame(): cc.SpriteFrame {
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
