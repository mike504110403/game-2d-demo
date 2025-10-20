const { ccclass, property } = cc._decorator;

/**
 * 視差滾動背景組件
 * 實現楓之谷風格的多層背景視差效果
 */
@ccclass('ParallaxBackground')
export class ParallaxBackground extends cc.Component {
    @property(cc.Node)
    target: cc.Node = null;

    @property
    parallaxSpeed: number = 0.5;

    @property
    layerSpeed: number[] = [0.1, 0.3, 0.6, 1.0];

    @property
    layerOffset: number[] = [0, 0, 0, 0];

    private layers: cc.Node[] = [];
    private initialPositions: cc.Vec3[] = [];

    onLoad() {
        this.initializeLayers();
    }

    start() {
        if (!this.target) {
            // 嘗試找到玩家節點
            this.target = cc.find('PlayerLayer/Player');
        }
    }

    update(deltaTime: number) {
        if (this.target && this.layers.length > 0) {
            this.updateParallax();
        }
    }

    /**
     * 初始化背景層
     */
    private initializeLayers(): void {
        this.layers = [];
        this.initialPositions = [];

        // 收集所有子節點作為背景層
        for (let i = 0; i < this.node.children.length; i++) {
            const child = this.node.children[i];
            this.layers.push(child);
            this.initialPositions.push(child.position.clone());
        }

        console.log(`視差背景初始化完成，共 ${this.layers.length} 層`);
    }

    /**
     * 更新視差效果
     */
    private updateParallax(): void {
        const targetX = this.target.position.x;
        
        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            const speed = this.layerSpeed[i] || 0.5;
            const offset = this.layerOffset[i] || 0;
            
            // 計算視差位置
            const parallaxX = this.initialPositions[i].x + (targetX * speed * this.parallaxSpeed) + offset;
            
            // 更新層位置
            layer.setPosition(parallaxX, layer.position.y);
        }
    }

    /**
     * 設定目標
     */
    public setTarget(target: cc.Node): void {
        this.target = target;
    }

    /**
     * 設定視差速度
     */
    public setParallaxSpeed(speed: number): void {
        this.parallaxSpeed = speed;
    }

    /**
     * 設定層速度
     */
    public setLayerSpeed(speeds: number[]): void {
        this.layerSpeed = speeds;
    }

    /**
     * 重置背景位置
     */
    public resetPositions(): void {
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].setPosition(this.initialPositions[i]);
        }
    }
}
