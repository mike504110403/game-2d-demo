const { ccclass, property } = cc._decorator;

/**
 * 輸入管理器
 * 負責處理所有輸入事件，包括鍵盤和觸控
 */
@ccclass('InputManager')
export class InputManager extends cc.Component {
    private static _instance: InputManager | null = null;
    
    // 輸入狀態
    private inputStates: { [key: string]: boolean } = {};

    /**
     * 取得輸入管理器實例
     */
    public static getInstance(): InputManager | null {
        return InputManager._instance;
    }

    onLoad() {
        InputManager._instance = this;
        this.initializeInput();
    }

    /**
     * 初始化輸入系統
     */
    private initializeInput(): void {
        // 初始化輸入狀態
        this.inputStates = {
            moveLeft: false,
            moveRight: false,
            jump: false,
            attack: false
        };

        // 註冊鍵盤事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        console.log('輸入管理器初始化完成');
    }

    /**
     * 鍵盤按下事件
     */
    private onKeyDown(event: cc.Event.EventKeyboard): void {
        switch(event.keyCode) {
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
                this.inputStates.moveLeft = true;
                break;
            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                this.inputStates.moveRight = true;
                break;
            case cc.macro.KEY.space:
            case cc.macro.KEY.up:
            case cc.macro.KEY.w:
                this.inputStates.jump = true;
                break;
            case cc.macro.KEY.j:
                this.inputStates.attack = true;
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
                this.inputStates.moveLeft = false;
                break;
            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                this.inputStates.moveRight = false;
                break;
            case cc.macro.KEY.space:
            case cc.macro.KEY.up:
            case cc.macro.KEY.w:
                this.inputStates.jump = false;
                break;
            case cc.macro.KEY.j:
                this.inputStates.attack = false;
                break;
        }
    }

    /**
     * 檢查輸入狀態
     */
    public isInputPressed(inputName: string): boolean {
        return this.inputStates[inputName] || false;
    }
}