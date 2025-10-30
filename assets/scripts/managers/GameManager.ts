const { ccclass, property } = cc._decorator;

/**
 * 遊戲管理器
 * 這是遊戲的核心管理器，負責協調各個子系統
 */
@ccclass('GameManager')
export class GameManager extends cc.Component {
    @property(cc.Node)
    playerNode: cc.Node = null;

    private static _instance: GameManager | null = null;

    /**
     * 取得遊戲管理器實例
     */
    public static getInstance(): GameManager | null {
        return GameManager._instance;
    }

    onLoad() {
        // 設定單例實例
        GameManager._instance = this;
        console.log('遊戲管理器初始化完成');
    }

    start() {
        // 遊戲開始時的初始化邏輯
        this.initializeGame();
    }

    /**
     * 初始化遊戲
     */
    private initializeGame(): void {
        console.log('開始初始化遊戲...');
        console.log('遊戲初始化完成');
    }

    /**
     * 遊戲暫停
     */
    public pauseGame(): void {
        console.log('遊戲暫停');
    }

    /**
     * 遊戲恢復
     */
    public resumeGame(): void {
        console.log('遊戲恢復');
    }

    /**
     * 遊戲結束
     */
    public endGame(): void {
        console.log('遊戲結束');
    }
}