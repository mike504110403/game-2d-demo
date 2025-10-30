# 2D橫向捲軸遊戲開發指南

## 專案架構概覽

這個專案建立了一個完整的2D橫向捲軸遊戲架構，類似新楓之谷的遊戲體驗。以下是各個系統的詳細說明：

### 📁 專案結構

```
assets/
├── scripts/
│   ├── managers/          # 管理器腳本
│   │   ├── GameManager.ts      # 遊戲核心管理器
│   │   ├── SceneManager.ts     # 場景管理器
│   │   ├── InputManager.ts     # 輸入管理器
│   │   ├── PhysicsManager.ts   # 物理管理器
│   │   ├── UIManager.ts        # UI管理器
│   │   └── AnimationManager.ts # 動畫管理器
│   ├── components/        # 組件腳本
│   │   ├── PlayerController.ts # 玩家控制器
│   │   ├── CameraFollow.ts     # 相機跟隨
│   │   ├── CollisionHandler.ts # 碰撞處理器
│   │   ├── GameHUD.ts          # 遊戲HUD
│   │   └── PlayerAnimator.ts   # 玩家動畫控制器
│   ├── data/             # 資料結構
│   │   ├── GameConstants.ts    # 遊戲常數
│   │   ├── PlayerData.ts       # 玩家資料
│   │   ├── PhysicsData.ts      # 物理資料
│   │   ├── UIData.ts           # UI資料
│   │   └── AnimationData.ts    # 動畫資料
│   └── utils/            # 工具類
├── scenes/               # 遊戲場景
├── textures/             # 圖片資源
├── animations/           # 動畫資源
├── prefabs/              # 預製體
├── audio/                # 音效資源
└── fonts/                # 字體資源
```

## 🎮 核心系統說明

### 1. 遊戲管理器 (GameManager)
- **作用**: 遊戲的核心管理器，協調各個子系統
- **功能**: 初始化遊戲、管理遊戲狀態、協調各管理器
- **使用方式**: 在場景中建立一個空物件，附加GameManager組件

### 2. 場景管理器 (SceneManager)
- **作用**: 管理遊戲場景的切換和載入
- **功能**: 場景切換、場景載入、場景狀態管理
- **使用方式**: 
```typescript
const sceneManager = SceneManager.getInstance();
sceneManager.goToGamePlay(); // 切換到遊戲場景
```

### 3. 輸入管理器 (InputManager)
- **作用**: 處理所有輸入事件，包括鍵盤和觸控
- **功能**: 輸入狀態管理、輸入事件分發、虛擬按鈕支援
- **使用方式**:
```typescript
const inputManager = InputManager.getInstance();
const isMovingLeft = inputManager.isInputPressed(InputAction.MOVE_LEFT);
```

### 4. 物理管理器 (PhysicsManager)
- **作用**: 管理物理系統的初始化和碰撞事件處理
- **功能**: 物理系統設定、碰撞檢測、物理材質管理
- **使用方式**:
```typescript
const physicsManager = PhysicsManager.getInstance();
physicsManager.setupPlayerPhysics(playerNode);
```

### 5. UI管理器 (UIManager)
- **作用**: 管理所有UI面板的顯示、隱藏和動畫
- **功能**: UI面板管理、UI動畫、UI事件處理
- **使用方式**:
```typescript
const uiManager = UIManager.getInstance();
uiManager.showPanel(UIPanelType.GAME_HUD);
```

### 6. 動畫管理器 (AnimationManager)
- **作用**: 管理所有動畫的播放、停止和事件處理
- **功能**: 精靈動畫、補間動畫、動畫序列管理
- **使用方式**:
```typescript
const animationManager = AnimationManager.getInstance();
animationManager.playSpriteAnimation(sprite, 'walk');
```

## 🎯 開發流程

### 第一步：建立基本場景
1. 在Cocos Creator中建立新場景
2. 設定場景的基本結構（背景、地面、玩家等）
3. 在場景中建立GameManager物件並附加GameManager組件

### 第二步：設定玩家角色
1. 建立玩家節點
2. 附加PlayerController組件
3. 設定RigidBody2D和Collider2D組件
4. 附加PlayerAnimator組件處理動畫

### 第三步：設定相機系統
1. 在相機節點上附加CameraFollow組件
2. 設定跟隨目標為玩家節點
3. 調整相機參數（跟隨速度、偏移等）

### 第四步：建立UI系統
1. 建立Canvas節點
2. 建立GameHUD節點並附加GameHUD組件
3. 在UIManager中註冊UI面板

### 第五步：設定物理系統
1. 在場景中建立PhysicsManager物件
2. 為需要物理互動的物件設定碰撞器
3. 使用PhysicsManager設定物理屬性

## 🔧 常用操作

### 建立新的管理器
1. 在`assets/scripts/managers/`中建立新的管理器腳本
2. 使用單例模式確保全局唯一
3. 在GameManager中初始化新管理器

### 建立新的組件
1. 在`assets/scripts/components/`中建立新的組件腳本
2. 繼承Component類別
3. 定義必要的屬性和方法

### 新增遊戲常數
1. 在`assets/scripts/data/GameConstants.ts`中新增常數
2. 使用靜態唯讀屬性定義常數
3. 在需要的地方引用這些常數

## 🎨 資源管理

### 圖片資源
- 將圖片放在`assets/textures/`資料夾中
- 使用圖集優化效能
- 設定適當的過濾模式

### 動畫資源
- 將動畫資料放在`assets/animations/`資料夾中
- 使用AnimationManager管理動畫播放
- 設定適當的播放模式和持續時間

### 音效資源
- 將音效檔案放在`assets/audio/`資料夾中
- 使用AudioSource組件播放音效
- 管理音效的播放和停止

## 🚀 下一步開發

1. **建立遊戲場景**: 設計關卡地圖和障礙物
2. **實作敵人系統**: 建立敵人AI和行為
3. **加入收集品**: 實作金幣、道具等收集品
4. **建立關卡系統**: 實作關卡切換和進度保存
5. **優化效能**: 實作物件池、視窗剔除等優化技術
6. **加入音效**: 實作背景音樂和音效系統
7. **建立存檔系統**: 實作玩家進度保存和載入

## 📝 注意事項

1. **單例模式**: 所有管理器都使用單例模式，確保全局唯一
2. **事件系統**: 使用事件回調機制進行組件間通訊
3. **資源管理**: 合理管理資源的載入和釋放
4. **效能優化**: 注意記憶體使用和渲染效能
5. **錯誤處理**: 加入適當的錯誤處理和日誌記錄

這個架構為您提供了一個完整的2D橫向捲軸遊戲開發基礎，您可以根據具體需求進行擴展和修改。
