cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Node
        },
        camera: {
            default: null,
            type: cc.Camera
        },
        followSpeed: {
            default: 5,
            type: cc.Float
        },
        offsetX: {
            default: 0,
            type: cc.Float
        },
        offsetY: {
            default: 0,
            type: cc.Float
        },
        smoothFollow: {
            default: true,
            type: cc.Boolean
        },
        followX: {
            default: true,
            type: cc.Boolean
        },
        followY: {
            default: true,
            type: cc.Boolean
        }
    },

    onLoad() {
        this.initializeCamera();
    },

    start() {
        if (this.camera && this.camera.node) {
            this.initialPosition = this.camera.node.position.clone();
        }
    },

    update(deltaTime) {
        if (this.target && this.camera) {
            this.followTarget(deltaTime);
        }
    },

    /**
     * 初始化相機
     */
    initializeCamera() {
        if (!this.camera) {
            this.camera = this.getComponent(cc.Camera);
        }

        if (!this.camera) {
            console.error('CameraFollow: 找不到相機組件');
            return;
        }

        console.log('相機跟隨系統初始化完成');
    },

    /**
     * 跟隨目標
     */
    followTarget(deltaTime) {
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
        let newPosition;

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
    },

    /**
     * 設定跟隨目標
     */
    setTarget(target) {
        this.target = target;
        console.log('相機跟隨目標已設定');
    },

    /**
     * 設定跟隨偏移
     */
    setOffset(x, y) {
        this.offsetX = x;
        this.offsetY = y;
    },

    /**
     * 設定跟隨速度
     */
    setFollowSpeed(speed) {
        this.followSpeed = speed;
    }
});