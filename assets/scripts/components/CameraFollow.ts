const { ccclass, property } = cc._decorator;

/**
 * 相機跟隨組件
 * 讓相機平滑跟隨目標物件移動
 */
@ccclass('CameraFollow')
export class CameraFollow extends cc.Component {
    @property(cc.Node)
    target: cc.Node = null;

    @property(cc.Camera)
    camera: cc.Camera = null;

    @property
    followSpeed: number = 5;

    @property
    offsetX: number = 0;

    @property
    offsetY: number = 0;

    @property
    smoothFollow: boolean = true;

    @property
    followX: boolean = true;

    @property
    followY: boolean = true;

    private initialPosition: cc.Vec3 = null;

    onLoad() {
        this.initializeCamera();
    }

    start() {
        if (this.camera && this.camera.node) {
            this.initialPosition = this.camera.node.position.clone();
        }
    }

    update(deltaTime: number) {
        if (this.target && this.camera) {
            this.followTarget(deltaTime);
        }
    }

    /**
     * 初始化相機
     */
    private initializeCamera(): void {
        if (!this.camera) {
            this.camera = this.getComponent(cc.Camera);
        }

        if (!this.camera) {
            console.error('CameraFollow: 找不到相機組件');
            return;
        }

        console.log('相機跟隨系統初始化完成');
    }

    /**
     * 跟隨目標
     */
    private followTarget(deltaTime: number): void {
        const targetPosition = this.target.position.clone();
        const currentPosition = this.camera.node.position.clone();

        // 計算目標位置
        let targetX = currentPosition.x;
        let targetY = currentPosition.y;

        if (this.followX) {
            targetX = targetPosition.x + this.offsetX;
        }

        if (this.followY) {
            targetY = targetPosition.y + this.offsetY;
        }

        // 計算新位置
        let newPosition: cc.Vec3;

        if (this.smoothFollow) {
            // 平滑跟隨
            const lerpFactor = this.followSpeed * deltaTime;
            newPosition = cc.v3(
                cc.lerp(currentPosition.x, targetX, lerpFactor),
                cc.lerp(currentPosition.y, targetY, lerpFactor),
                currentPosition.z
            );
        } else {
            // 直接跟隨
            newPosition = cc.v3(targetX, targetY, currentPosition.z);
        }

        // 更新相機位置
        this.camera.node.position = newPosition;
    }

    /**
     * 設定跟隨目標
     */
    public setTarget(target: cc.Node): void {
        this.target = target;
        console.log('相機跟隨目標已設定');
    }

    /**
     * 設定跟隨偏移
     */
    public setOffset(x: number, y: number): void {
        this.offsetX = x;
        this.offsetY = y;
    }

    /**
     * 設定跟隨速度
     */
    public setFollowSpeed(speed: number): void {
        this.followSpeed = speed;
    }
}