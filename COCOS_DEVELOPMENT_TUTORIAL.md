# Cocos Creator 開發完整教程

## 🎯 開發流程概覽

### 1. 專案開啟
1. **開啟 Cocos Creator 3.8.x**
2. **選擇「開啟專案」**
3. **瀏覽到專案資料夾**: `/Users/mike/Documents/self/game-2d-demo`
4. **點擊「開啟」**

## 🎮 建立基本遊戲場景

### 第一步：建立新場景
1. **File → New Scene** (或 Ctrl+N)
2. **儲存場景**: File → Save Scene As → 命名為 `MainScene`
3. **場景會出現在 assets/scenes/ 資料夾中**

### 第二步：建立玩家角色
1. **在層級面板中右鍵 → Create → 2D → Sprite**
2. **重新命名為 "Player"**
3. **設定玩家屬性**:
   - 位置: (0, 0, 0)
   - 縮放: (1, 1, 1)
   - 錨點: (0.5, 0.5)

4. **附加物理組件**:
   - 選擇 Player 節點
   - 在屬性面板點擊「Add Component」
   - 選擇「Physics 2D → RigidBody2D」
   - 設定 Type: Dynamic
   - 再次點擊「Add Component」
   - 選擇「Physics 2D → Collider2D」
   - 設定 Shape: Box

5. **附加玩家控制器腳本**:
   - 選擇 Player 節點
   - 在屬性面板點擊「Add Component」
   - 選擇「Custom Script → PlayerController」
   - 設定腳本屬性:
     - Speed: 200
     - Jump Force: 500

### 第三步：設定相機跟隨
1. **選擇 Main Camera**
2. **附加相機跟隨腳本**:
   - 點擊「Add Component」
   - 選擇「Custom Script → CameraFollow」
   - 設定腳本屬性:
     - Target: 拖拽 Player 節點到 Target 欄位
     - Follow Speed: 5
     - Follow X: true
     - Follow Y: true

### 第四步：建立地面
1. **建立地面節點**:
   - 右鍵 → Create → 2D → Sprite
   - 重新命名為 "Ground"
   - 設定位置: (0, -300, 0)
   - 設定縮放: (10, 1, 1)

2. **附加地面物理組件**:
   - 選擇 Ground 節點
   - Add Component → Physics 2D → Collider2D
   - 設定 Type: Static
   - 設定 Shape: Box

### 第五步：建立管理器節點
1. **建立遊戲管理器**:
   - 右鍵 → Create → Empty Node
   - 重新命名為 "GameManager"
   - Add Component → Custom Script → GameManager

2. **建立輸入管理器**:
   - 右鍵 → Create → Empty Node
   - 重新命名為 "InputManager"
   - Add Component → Custom Script → InputManager

## 🎨 設定遊戲資源

### 第一步：準備圖片資源
1. **建立資源資料夾**:
   - 在 assets 資料夾中建立 `textures` 資料夾
   - 將玩家圖片拖拽到 textures 資料夾
   - 將地面圖片拖拽到 textures 資料夾

2. **設定玩家精靈**:
   - 選擇 Player 節點
   - 在 Sprite 組件的 Sprite Frame 欄位
   - 拖拽玩家圖片到該欄位

3. **設定地面精靈**:
   - 選擇 Ground 節點
   - 在 Sprite 組件的 Sprite Frame 欄位
   - 拖拽地面圖片到該欄位

### 第二步：設定物理系統
1. **啟用物理系統**:
   - 選擇 Project → Project Settings
   - 找到 Physics 2D 設定
   - 勾選 Enable Physics 2D
   - 設定 Gravity: (0, -980)

## 🎮 測試遊戲功能

### 第一步：預覽遊戲
1. **點擊預覽按鈕** (播放按鈕)
2. **測試玩家控制**:
   - A/D 鍵或左右箭頭鍵: 移動
   - 空格鍵或 W 鍵: 跳躍
3. **觀察相機跟隨效果**

### 第二步：除錯和調整
1. **調整玩家移動速度**:
   - 選擇 Player 節點
   - 修改 PlayerController 的 Speed 屬性

2. **調整跳躍力度**:
   - 修改 PlayerController 的 Jump Force 屬性

3. **調整相機跟隨**:
   - 選擇 Main Camera
   - 修改 CameraFollow 的 Follow Speed 屬性

## 🎯 進階功能開發

### 第一步：加入動畫系統
1. **建立動畫資源**:
   - 將角色動畫圖片放入 assets/animations 資料夾
   - 建立 Animation Clip

2. **設定角色動畫**:
   - 選擇 Player 節點
   - Add Component → Animation
   - 設定動畫 Clip

### 第二步：建立 UI 系統
1. **建立 Canvas**:
   - 右鍵 → Create → UI → Canvas
   - 設定 Canvas 屬性

2. **建立 UI 元素**:
   - 血量條 (ProgressBar)
   - 分數顯示 (Label)
   - 按鈕 (Button)

### 第三步：建立關卡設計
1. **建立多個平台**:
   - 複製 Ground 節點
   - 調整位置和大小
   - 建立不同高度的平台

2. **加入障礙物**:
   - 建立障礙物精靈
   - 附加 Collider2D 組件
   - 設定碰撞檢測

## 🔧 常見問題解決

### 問題：玩家無法移動
**解決方案**:
1. 檢查 RigidBody2D 組件是否正確設定
2. 確認物理系統已啟用
3. 檢查 PlayerController 腳本是否正確附加

### 問題：相機不跟隨
**解決方案**:
1. 確認 CameraFollow 腳本已附加到相機
2. 檢查 Target 是否設定為 Player 節點
3. 確認 Follow X 和 Follow Y 已啟用

### 問題：碰撞檢測不工作
**解決方案**:
1. 確認 Collider2D 組件已附加
2. 檢查物理系統是否啟用
3. 確認碰撞層級設定正確

## 💡 開發技巧

1. **使用預製體**: 將常用的遊戲物件製作成預製體
2. **分層管理**: 使用不同的層級來組織場景
3. **資源優化**: 使用圖集來優化圖片資源
4. **除錯工具**: 使用 Console 來輸出除錯資訊

## 🚀 下一步

1. **完善基本功能**: 確保玩家控制和相機跟隨正常
2. **加入更多內容**: 動畫、UI、音效
3. **設計關卡**: 建立有趣的遊戲關卡
4. **優化效能**: 使用物件池和視窗剔除

現在您已經知道如何在 Cocos Creator 中操作了！開始建立您的 2D 橫向捲軸遊戲吧！
