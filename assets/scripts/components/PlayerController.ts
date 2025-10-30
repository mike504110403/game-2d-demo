const { ccclass, property } = cc._decorator;

/**
 * 玩家控制器
 * 負責處理玩家角色的移動、跳躍、攻擊等行為
 */
@ccclass('PlayerController')
export class PlayerController extends cc.Component {
    @property(cc.RigidBody2D)
    rigidBody: cc.RigidBody2D = null;

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    @property
    speed: number = 200;

    @property
    jumpForce: number = 500;

    // 玩家狀態
    private isGrounded: boolean = false;
    private isMoving: boolean = false;
    private facingRight: boolean = true;

    onLoad() {
        this.initializePlayer();
    }

    start() {
        this.setupInput();
    }

    update(deltaTime: number) {
        this.handleInput();
        this.updatePlayerState();
    }

    /**
     * 初始化玩家
     */
    private initializePlayer(): void {
        console.log('玩家控制器初始化完成');
    }

    /**
     * 設定輸入系統
     */
    private setupInput(): void {
        // 註冊鍵盤事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    /**
     * 鍵盤按下事件
     */
    private onKeyDown(event: cc.Event.EventKeyboard): void {
        switch(event.keyCode) {
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
                this.moveLeft();
                break;
            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                this.moveRight();
                break;
            case cc.macro.KEY.space:
            case cc.macro.KEY.up:
            case cc.macro.KEY.w:
                this.jump();
                break;
        }
    }

    /**
     * 鍵盤釋放事件
     */
    private onKeyUp(event: cc.Event.EventKeyboard): void {
        switch(event.keyCode) {
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                this.stopMoving();
                break;
        }
    }

    /**
     * 處理輸入
     */
    private handleInput(): void {
        // 輸入處理邏輯
    }

    /**
     * 向左移動
     */
    private moveLeft(): void {
        if (this.rigidBody) {
            this.rigidBody.linearVelocity = cc.v2(-this.speed, this.rigidBody.linearVelocity.y);
            this.facingRight = false;
            this.isMoving = true;
        }
    }

    /**
     * 向右移動
     */
    private moveRight(): void {
        if (this.rigidBody) {
            this.rigidBody.linearVelocity = cc.v2(this.speed, this.rigidBody.linearVelocity.y);
            this.facingRight = true;
            this.isMoving = true;
        }
    }

    /**
     * 停止移動
     */
    private stopMoving(): void {
        if (this.rigidBody) {
            this.rigidBody.linearVelocity = cc.v2(0, this.rigidBody.linearVelocity.y);
            this.isMoving = false;
        }
    }

    /**
     * 跳躍
     */
    private jump(): void {
        if (this.isGrounded && this.rigidBody) {
            this.rigidBody.linearVelocity = cc.v2(this.rigidBody.linearVelocity.x, this.jumpForce);
            this.isGrounded = false;
        }
    }

    /**
     * 更新玩家狀態
     */
    private updatePlayerState(): void {
        if (this.rigidBody) {
            const velocity = this.rigidBody.linearVelocity;
            
            // 檢查是否在地面上
            if (velocity.y === 0) {
                this.isGrounded = true;
            } else if (velocity.y < -50) {
                this.isGrounded = false;
            }

            // 更新精靈圖片
            this.updateSprite();
        }
    }

    /**
     * 更新精靈圖片
     */
    private updateSprite(): void {
        if (this.sprite && this.sprite.node) {
            // 根據面向方向翻轉圖片
            this.sprite.node.scaleX = this.facingRight ? 1 : -1;
        }
    }
}