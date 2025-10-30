const { ccclass, property } = cc._decorator;

/**
 * 平台生成器
 * 動態生成楓之谷風格的平台和障礙物
 */
@ccclass('PlatformGenerator')
export class PlatformGenerator extends cc.Component {
    @property(cc.Prefab)
    platformPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    obstaclePrefab: cc.Prefab = null;

    @property
    platformWidth: number = 150;

    @property
    platformHeight: number = 30;

    @property
    minPlatformDistance: number = 200;

    @property
    maxPlatformDistance: number = 400;

    @property
    minPlatformHeight: number = -200;

    @property
    maxPlatformHeight: number = 200;

    @property
    obstacleChance: number = 0.3;

    private platforms: cc.Node[] = [];
    private obstacles: cc.Node[] = [];
    private lastPlatformX: number = 0;
    private lastPlatformY: number = 0;

    onLoad() {
        this.initializeGenerator();
    }

    start() {
        this.generateInitialPlatforms();
    }

    update(deltaTime: number) {
        this.cleanupOffscreenPlatforms();
        this.generateNewPlatforms();
    }

    /**
     * 初始化生成器
     */
    private initializeGenerator(): void {
        console.log('平台生成器初始化完成');
    }

    /**
     * 生成初始平台
     */
    private generateInitialPlatforms(): void {
        // 生成起始平台
        this.createPlatform(0, -300, 300, 100); // 地面
        
        // 生成一些初始平台
        for (let i = 0; i < 5; i++) {
            this.generateRandomPlatform();
        }
    }

    /**
     * 生成隨機平台
     */
    private generateRandomPlatform(): void {
        const distance = this.minPlatformDistance + 
            Math.random() * (this.maxPlatformDistance - this.minPlatformDistance);
        
        const height = this.lastPlatformY + 
            (Math.random() - 0.5) * 200;
        
        const clampedHeight = Math.max(this.minPlatformHeight, 
            Math.min(this.maxPlatformHeight, height));
        
        const x = this.lastPlatformX + distance;
        const y = clampedHeight;
        
        this.createPlatform(x, y, this.platformWidth, this.platformHeight);
        
        // 隨機添加障礙物
        if (Math.random() < this.obstacleChance) {
            this.createObstacle(x, y + this.platformHeight / 2 + 50);
        }
        
        this.lastPlatformX = x;
        this.lastPlatformY = y;
    }

    /**
     * 建立平台
     */
    private createPlatform(x: number, y: number, width: number, height: number): cc.Node {
        const platform = new cc.Node('Platform');
        
        // 添加精靈組件
        const sprite = platform.addComponent(cc.Sprite);
        sprite.spriteFrame = this.createPlatformSpriteFrame(width, height);
        
        // 設定位置和大小
        platform.setPosition(x, y);
        platform.setScale(1, 1);
        
        // 添加物理碰撞
        const collider = platform.addComponent(cc.BoxCollider);
        collider.size = cc.size(width, height);
        collider.offset = cc.v2(0, 0);
        
        // 添加剛體
        const rigidBody = platform.addComponent(cc.RigidBody2D);
        rigidBody.type = cc.RigidBody2D.Type.Static;
        
        this.node.addChild(platform);
        this.platforms.push(platform);
        
        return platform;
    }

    /**
     * 建立障礙物
     */
    private createObstacle(x: number, y: number): cc.Node {
        const obstacle = new cc.Node('Obstacle');
        
        // 添加精靈組件
        const sprite = obstacle.addComponent(cc.Sprite);
        sprite.spriteFrame = this.createObstacleSpriteFrame();
        
        // 設定位置
        obstacle.setPosition(x, y);
        
        // 添加物理碰撞
        const collider = obstacle.addComponent(cc.BoxCollider);
        collider.size = cc.size(30, 50);
        
        // 添加剛體
        const rigidBody = obstacle.addComponent(cc.RigidBody2D);
        rigidBody.type = cc.RigidBody2D.Type.Static;
        
        this.node.addChild(obstacle);
        this.obstacles.push(obstacle);
        
        return obstacle;
    }

    /**
     * 清理螢幕外的平台
     */
    private cleanupOffscreenPlatforms(): void {
        const camera = cc.Camera.main;
        if (!camera) return;
        
        const cameraX = camera.node.position.x;
        const cleanupDistance = 1000; // 清理距離
        
        // 清理平台
        for (let i = this.platforms.length - 1; i >= 0; i--) {
            const platform = this.platforms[i];
            if (platform && platform.position.x < cameraX - cleanupDistance) {
                platform.destroy();
                this.platforms.splice(i, 1);
            }
        }
        
        // 清理障礙物
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obstacle = this.obstacles[i];
            if (obstacle && obstacle.position.x < cameraX - cleanupDistance) {
                obstacle.destroy();
                this.obstacles.splice(i, 1);
            }
        }
    }

    /**
     * 生成新平台
     */
    private generateNewPlatforms(): void {
        const camera = cc.Camera.main;
        if (!camera) return;
        
        const cameraX = camera.node.position.x;
        const generateDistance = 800; // 生成距離
        
        // 如果最後一個平台距離相機太遠，生成新平台
        if (this.lastPlatformX < cameraX + generateDistance) {
            this.generateRandomPlatform();
        }
    }

    /**
     * 建立平台精靈框架
     */
    private createPlatformSpriteFrame(width: number, height: number): cc.SpriteFrame {
        const texture = new cc.Texture2D();
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // 繪製木質平台
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, 0, width, height);
        
        // 添加木紋
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        for (let i = 0; i < Math.floor(width / 30); i++) {
            ctx.beginPath();
            ctx.moveTo(i * 30, 0);
            ctx.lineTo(i * 30, height);
            ctx.stroke();
        }
        
        // 添加邊框
        ctx.strokeStyle = '#4A2C2A';
        ctx.lineWidth = 3;
        ctx.strokeRect(0, 0, width, height);
        
        texture.initWithElement(canvas);
        const spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        return spriteFrame;
    }

    /**
     * 建立障礙物精靈框架
     */
    private createObstacleSpriteFrame(): cc.SpriteFrame {
        const texture = new cc.Texture2D();
        const canvas = document.createElement('canvas');
        canvas.width = 30;
        canvas.height = 50;
        const ctx = canvas.getContext('2d');
        
        // 繪製尖刺障礙物
        ctx.fillStyle = '#8B0000';
        ctx.beginPath();
        ctx.moveTo(15, 0);
        ctx.lineTo(0, 50);
        ctx.lineTo(30, 50);
        ctx.closePath();
        ctx.fill();
        
        // 添加高光
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.moveTo(15, 0);
        ctx.lineTo(5, 40);
        ctx.lineTo(25, 40);
        ctx.closePath();
        ctx.fill();
        
        texture.initWithElement(canvas);
        const spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        return spriteFrame;
    }

    /**
     * 重置生成器
     */
    public reset(): void {
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
    public setPlatformParameters(width: number, height: number, minDist: number, maxDist: number): void {
        this.platformWidth = width;
        this.platformHeight = height;
        this.minPlatformDistance = minDist;
        this.maxPlatformDistance = maxDist;
    }
}
