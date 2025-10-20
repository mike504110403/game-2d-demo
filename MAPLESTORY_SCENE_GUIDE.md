# 楓之谷風格橫向捲軸遊戲場景設定指南

## 概述
這個指南將幫助你在 Cocos Creator 中建立一個楓之谷風格的橫向捲軸遊戲場景。

## 已建立的檔案

### 1. 場景腳本
- `assets/scripts/scenes/GameScene.ts` - 基本遊戲場景管理器
- `assets/scripts/scenes/MapleStoryScene.ts` - 完整的楓之谷風格場景
- `assets/scripts/utils/SceneLoader.ts` - 場景載入工具

### 2. 組件腳本
- `assets/scripts/components/ParallaxBackground.ts` - 視差滾動背景系統
- `assets/scripts/components/PlatformGenerator.ts` - 平台生成器
- `assets/scripts/components/PlayerController.ts` - 玩家控制器 (已存在)
- `assets/scripts/components/CameraFollow.ts` - 相機跟隨系統 (已存在)

## 在 Cocos Creator 中設定場景

### 步驟 1: 建立場景
1. 在 Cocos Creator 中，右鍵點擊 `assets/scenes` 資料夾
2. 選擇 "新建" -> "場景"
3. 命名為 "GamePlay"

### 步驟 2: 設定場景結構
在場景中建立以下節點層級：

```
Scene (GamePlay)
├── BackgroundLayer
│   ├── SkyLayer
│   ├── MountainLayer
│   ├── TreeLayer
│   └── CloudLayer
├── PlatformLayer
│   ├── Ground
│   └── Platforms (動態生成)
├── PlayerLayer
│   └── Player
└── UILayer
```

### 步驟 3: 添加腳本組件

#### 3.1 背景層設定
1. 選擇 `BackgroundLayer` 節點
2. 添加 `ParallaxBackground` 組件
3. 設定參數：
   - `parallaxSpeed`: 0.5
   - `layerSpeed`: [0.1, 0.3, 0.6, 1.0]
   - `layerOffset`: [0, 0, 0, 0]

#### 3.2 平台層設定
1. 選擇 `PlatformLayer` 節點
2. 添加 `PlatformGenerator` 組件
3. 設定參數：
   - `platformWidth`: 150
   - `platformHeight`: 30
   - `minPlatformDistance`: 200
   - `maxPlatformDistance`: 400

#### 3.3 玩家設定
1. 選擇 `Player` 節點
2. 添加 `PlayerController` 組件
3. 添加 `RigidBody2D` 組件 (Dynamic)
4. 添加 `BoxCollider` 組件
5. 設定參數：
   - `speed`: 200
   - `jumpForce`: 500

#### 3.4 相機設定
1. 選擇 `Main Camera` 節點
2. 添加 `CameraFollow` 組件
3. 設定參數：
   - `followSpeed`: 5
   - `offsetX`: 0
   - `offsetY`: 0
   - `followX`: true
   - `followY`: false

### 步驟 4: 物理設定
1. 在專案設定中啟用物理系統
2. 設定重力：Y = -980
3. 確保所有平台和地面都有 `RigidBody2D` 和 `Collider` 組件

### 步驟 5: 場景腳本設定
1. 選擇場景根節點
2. 添加 `MapleStoryScene` 組件
3. 設定容器引用：
   - `backgroundContainer`: BackgroundLayer
   - `platformContainer`: PlatformLayer
   - `playerContainer`: PlayerLayer
   - `uiContainer`: UILayer

## 快速開始腳本

你也可以使用 `SceneLoader` 工具快速建立場景：

```typescript
// 在場景腳本中使用
import { SceneLoader } from '../utils/SceneLoader';

export class QuickStartScene extends cc.Component {
    onLoad() {
        // 建立基本場景結構
        const scene = SceneLoader.createBasicSceneStructure();
        
        // 建立楓之谷背景
        SceneLoader.createMapleStoryBackground(scene.getChildByName('BackgroundLayer'));
        
        // 建立平台
        SceneLoader.createBasicPlatforms(scene.getChildByName('PlatformLayer'));
        
        // 建立玩家
        const player = SceneLoader.createPlayer(scene.getChildByName('PlayerLayer'));
        
        // 設定相機跟隨
        SceneLoader.setupCameraFollow(player);
    }
}
```

## 場景特色

### 視差滾動背景
- 多層背景實現深度感
- 不同層級以不同速度移動
- 包含天空、山脈、樹木、雲朵

### 動態平台生成
- 自動生成平台和障礙物
- 可調整平台間距和高度
- 自動清理螢幕外的物件

### 物理系統
- 真實的重力和碰撞
- 玩家可以跳躍和移動
- 平台提供支撐

### 相機跟隨
- 平滑跟隨玩家移動
- 可設定跟隨速度和偏移
- 支援 X 軸和 Y 軸跟隨

## 自訂選項

### 背景自訂
- 修改 `ParallaxBackground` 組件的 `layerSpeed` 陣列
- 調整各層的移動速度比例

### 平台自訂
- 修改 `PlatformGenerator` 的參數
- 調整平台大小、間距、高度範圍

### 玩家自訂
- 修改 `PlayerController` 的移動速度和跳躍力度
- 添加更多動作和技能

## 故障排除

### 常見問題
1. **相機不跟隨玩家**
   - 檢查 `CameraFollow` 組件的 `target` 是否設定
   - 確認玩家節點名稱正確

2. **背景不滾動**
   - 檢查 `ParallaxBackground` 組件是否正確添加
   - 確認 `target` 設定為玩家節點

3. **平台不生成**
   - 檢查 `PlatformGenerator` 組件設定
   - 確認相機位置正確

4. **物理碰撞問題**
   - 檢查所有物件都有 `RigidBody2D` 和 `Collider`
   - 確認物理系統已啟用

## 下一步
1. 添加更多遊戲機制（敵人、道具、技能）
2. 優化視覺效果（粒子系統、動畫）
3. 添加音效和背景音樂
4. 建立更多關卡和場景

祝你開發愉快！🎮
