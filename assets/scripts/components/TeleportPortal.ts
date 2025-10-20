const { ccclass, property } = cc._decorator;

/**
 * 傳送門組件
 * 實現楓之谷風格的傳送點功能
 */
@ccclass('TeleportPortal')
export class TeleportPortal extends cc.Component {
    @property(cc.Node)
    targetScene: string = '';

    @property(cc.Vec2)
    targetPosition: cc.Vec2 = cc.v2(0, 0);

    @property
    teleportDelay: number = 1.0;

    @property
    teleportEffect: boolean = true;

    @property
    portalName: string = '傳送點';

    @property
    requiredLevel: number = 1;

    @property
    requiredItem: string = '';

    private isTeleporting: boolean = false;
    private playerInRange: boolean = false;
    private teleportTimer: number = 0;

    onLoad() {
        this.initializePortal();
    }

    start() {
        this.setupPortal();
    }

    update(deltaTime: number) {
        if (this.isTeleporting) {
            this.updateTeleportTimer(deltaTime);
        }
    }

    /**
     * 初始化傳送門
     */
    private initializePortal(): void {
        // 添加碰撞檢測
        const collider = this.node.getComponent(cc.BoxCollider);
        if (!collider) {
            const newCollider = this.node.addComponent(cc.BoxCollider);
            newCollider.size = cc.size(100, 150);
            newCollider.isTrigger = true;
        }

        // 添加剛體
        const rigidBody = this.node.getComponent(cc.RigidBody2D);
        if (!rigidBody) {
            const newRigidBody = this.node.addComponent(cc.RigidBody2D);
            newRigidBody.type = cc.RigidBody2D.Type.Static;
        }

        console.log(`傳送門 "${this.portalName}" 初始化完成`);
    }

    /**
     * 設定傳送門
     */
    private setupPortal(): void {
        // 建立傳送門視覺效果
        this.createPortalEffect();
        
        // 添加提示文字
        this.createPortalLabel();
    }

    /**
     * 建立傳送門特效
     */
    private createPortalEffect(): void {
        // 建立傳送門精靈
        const sprite = this.node.addComponent(cc.Sprite);
        sprite.spriteFrame = this.createPortalSpriteFrame();
        
        // 設定動畫效果
        this.startPortalAnimation();
    }

    /**
     * 建立傳送門標籤
     */
    private createPortalLabel(): void {
        const labelNode = new cc.Node('PortalLabel');
        labelNode.addComponent(cc.Label);
        labelNode.getComponent(cc.Label).string = this.portalName;
        labelNode.getComponent(cc.Label).fontSize = 20;
        labelNode.setPosition(0, 80);
        this.node.addChild(labelNode);
    }

    /**
     * 開始傳送門動畫
     */
    private startPortalAnimation(): void {
        // 旋轉動畫
        const rotateAction = cc.rotateBy(2.0, 360);
        const repeatAction = cc.repeatForever(rotateAction);
        this.node.runAction(repeatAction);

        // 縮放動畫
        const scaleUp = cc.scaleTo(1.0, 1.2);
        const scaleDown = cc.scaleTo(1.0, 0.8);
        const scaleSequence = cc.sequence(scaleUp, scaleDown);
        const scaleRepeat = cc.repeatForever(scaleSequence);
        this.node.runAction(scaleRepeat);
    }

    /**
     * 更新傳送計時器
     */
    private updateTeleportTimer(deltaTime: number): void {
        this.teleportTimer += deltaTime;
        
        if (this.teleportTimer >= this.teleportDelay) {
            this.executeTeleport();
        }
    }

    /**
     * 執行傳送
     */
    private executeTeleport(): void {
        if (this.teleportEffect) {
            this.playTeleportEffect();
        }

        // 載入目標場景
        cc.director.loadScene(this.targetScene, () => {
            console.log(`成功傳送到場景: ${this.targetScene}`);
            this.isTeleporting = false;
            this.teleportTimer = 0;
        });
    }

    /**
     * 播放傳送特效
     */
    private playTeleportEffect(): void {
        // 建立傳送特效
        const effectNode = new cc.Node('TeleportEffect');
        effectNode.setPosition(this.node.position);
        
        // 添加粒子效果
        this.createParticleEffect(effectNode);
        
        // 添加閃光效果
        this.createFlashEffect(effectNode);
        
        this.node.parent.addChild(effectNode);
        
        // 3秒後移除特效
        setTimeout(() => {
            effectNode.destroy();
        }, 3000);
    }

    /**
     * 建立粒子特效
     */
    private createParticleEffect(parent: cc.Node): void {
        // 這裡可以添加粒子系統
        console.log('傳送粒子特效播放');
    }

    /**
     * 建立閃光特效
     */
    private createFlashEffect(parent: cc.Node): void {
        const flashNode = new cc.Node('Flash');
        flashNode.addComponent(cc.Sprite);
        flashNode.getComponent(cc.Sprite).spriteFrame = this.createFlashSpriteFrame();
        flashNode.setScale(2, 2);
        
        const fadeOut = cc.fadeOut(0.5);
        const remove = cc.removeSelf();
        const sequence = cc.sequence(fadeOut, remove);
        
        parent.addChild(flashNode);
        flashNode.runAction(sequence);
    }

    /**
     * 碰撞檢測
     */
    onTriggerEnter(other: cc.Collider, self: cc.Collider): void {
        if (other.node.name === 'Player') {
            this.playerInRange = true;
            this.showTeleportPrompt();
        }
    }

    onTriggerExit(other: cc.Collider, self: cc.Collider): void {
        if (other.node.name === 'Player') {
            this.playerInRange = false;
            this.hideTeleportPrompt();
        }
    }

    /**
     * 顯示傳送提示
     */
    private showTeleportPrompt(): void {
        console.log(`按 E 鍵傳送到 ${this.portalName}`);
        // 這裡可以顯示UI提示
    }

    /**
     * 隱藏傳送提示
     */
    private hideTeleportPrompt(): void {
        console.log('離開傳送門範圍');
        // 隱藏UI提示
    }

    /**
     * 檢查傳送條件
     */
    private checkTeleportConditions(): boolean {
        // 檢查等級要求
        if (this.requiredLevel > 1) {
            // 這裡可以檢查玩家等級
            console.log(`需要等級 ${this.requiredLevel}`);
        }

        // 檢查道具要求
        if (this.requiredItem) {
            // 這裡可以檢查玩家是否擁有特定道具
            console.log(`需要道具: ${this.requiredItem}`);
        }

        return true; // 暫時總是返回true
    }

    /**
     * 開始傳送
     */
    public startTeleport(): void {
        if (this.isTeleporting || !this.playerInRange) {
            return;
        }

        if (!this.checkTeleportConditions()) {
            return;
        }

        this.isTeleporting = true;
        this.teleportTimer = 0;
        console.log(`開始傳送到 ${this.targetScene}`);
    }

    /**
     * 建立傳送門精靈框架
     */
    private createPortalSpriteFrame(): cc.SpriteFrame {
        const texture = new cc.Texture2D();
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 150;
        const ctx = canvas.getContext('2d');
        
        // 繪製傳送門
        const gradient = ctx.createRadialGradient(50, 75, 0, 50, 75, 50);
        gradient.addColorStop(0, '#00FFFF');
        gradient.addColorStop(0.5, '#0080FF');
        gradient.addColorStop(1, '#0040FF');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(50, 75, 40, 0, Math.PI * 2);
        ctx.fill();
        
        // 添加邊框
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        texture.initWithElement(canvas);
        const spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        return spriteFrame;
    }

    /**
     * 建立閃光精靈框架
     */
    private createFlashSpriteFrame(): cc.SpriteFrame {
        const texture = new cc.Texture2D();
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        
        // 繪製閃光
        const gradient = ctx.createRadialGradient(100, 100, 0, 100, 100, 100);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.3, '#FFFF00');
        gradient.addColorStop(1, '#FF8000');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(100, 100, 100, 0, Math.PI * 2);
        ctx.fill();
        
        texture.initWithElement(canvas);
        const spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        return spriteFrame;
    }

    /**
     * 設定傳送目標
     */
    public setTarget(sceneName: string, position: cc.Vec2): void {
        this.targetScene = sceneName;
        this.targetPosition = position;
    }

    /**
     * 設定傳送門名稱
     */
    public setPortalName(name: string): void {
        this.portalName = name;
    }
}
